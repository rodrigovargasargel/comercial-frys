from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from datetime import date, timedelta
import io
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter

from app.db.database import get_db
from app.models.produccion import (
    OrdenProduccion, ProduccionExtrusora, DetalleProduccionExtrusora
)
from app.models.selladora import (
    OPSelladora, ProduccionSelladora, ProduccionSelladoraDetalle
)

router = APIRouter(prefix="/reportes", tags=["Reportes"])


def get_lunes(fecha: date) -> date:
    return fecha - timedelta(days=fecha.weekday())


def get_semana_datos(db: Session, lunes: date):
    viernes = lunes + timedelta(days=4)
    dias = [lunes + timedelta(days=i) for i in range(5)]

    # --- EXTRUSORA: kg por producto/color/ancho/espesor/densidad por fecha y turno ---
    ext_rows = db.query(
        OrdenProduccion.producto_id,
        OrdenProduccion.color_id,
        OrdenProduccion.ancho,
        OrdenProduccion.espesor,
        OrdenProduccion.densidad,
        ProduccionExtrusora.fecha,
        ProduccionExtrusora.turno,
        func.sum(DetalleProduccionExtrusora.kg).label('total_kg')
    ).join(ProduccionExtrusora, ProduccionExtrusora.op_id == OrdenProduccion.id)\
     .join(DetalleProduccionExtrusora, DetalleProduccionExtrusora.produccion_extrusora_id == ProduccionExtrusora.id)\
     .filter(ProduccionExtrusora.fecha >= lunes, ProduccionExtrusora.fecha <= viernes)\
     .group_by(
         OrdenProduccion.producto_id, OrdenProduccion.color_id,
         OrdenProduccion.ancho, OrdenProduccion.espesor, OrdenProduccion.densidad,
         ProduccionExtrusora.fecha, ProduccionExtrusora.turno
     ).all()

    # --- SELLADORA: unidades por producto/color/ancho/espesor por fecha y turno ---
    sell_rows = db.query(
        OPSelladora.producto_id,
        OPSelladora.color_id,
        OPSelladora.ancho,
        OPSelladora.espesor,
        ProduccionSelladora.fecha,
        ProduccionSelladora.turno,
        func.sum(ProduccionSelladoraDetalle.unidades).label('total_unidades')
    ).join(ProduccionSelladora, ProduccionSelladora.op_id == OPSelladora.id)\
     .join(ProduccionSelladoraDetalle, ProduccionSelladoraDetalle.produccion_selladora_id == ProduccionSelladora.id)\
     .filter(ProduccionSelladora.fecha >= lunes, ProduccionSelladora.fecha <= viernes)\
     .group_by(
         OPSelladora.producto_id, OPSelladora.color_id,
         OPSelladora.ancho, OPSelladora.espesor,
         ProduccionSelladora.fecha, ProduccionSelladora.turno
     ).all()

    return dias, ext_rows, sell_rows


@router.get("/semana")
def get_reporte_semana(fecha: Optional[str] = None, db: Session = Depends(get_db)):
    from app.models.producto import Producto
    from app.models.produccion import Color

    hoy = date.today()
    base = date.fromisoformat(fecha) if fecha else hoy
    lunes = get_lunes(base)
    dias, ext_rows, sell_rows = get_semana_datos(db, lunes)

    # Construir estructura de filas
    productos_cache = {}
    colores_cache = {}

    def get_producto(pid):
        if pid not in productos_cache:
            p = db.query(Producto).filter(Producto.id == pid).first()
            productos_cache[pid] = p.nombre if p else str(pid)
        return productos_cache[pid]

    def get_color(cid):
        if cid not in colores_cache:
            c = db.query(Color).filter(Color.id == cid).first()
            colores_cache[cid] = c.nombre if c else str(cid)
        return colores_cache[cid]

    # Agrupar extrusora
    ext_data = {}
    for r in ext_rows:
        dens = 'AD' if r.densidad == 'alta' else 'BD'
        key = f"EXT|{get_producto(r.producto_id)}|{get_color(r.color_id)}|{r.ancho}x{r.espesor}|{dens}"
        if key not in ext_data:
            ext_data[key] = {'label': f"KG {get_producto(r.producto_id)} {get_color(r.color_id)} {r.ancho}x{r.espesor} {dens}", 'dia': {}, 'noche': {}}
        fecha_str = r.fecha.isoformat()
        ext_data[key][r.turno][fecha_str] = round(float(r.total_kg), 2)

    # Agrupar selladora
    sell_data = {}
    for r in sell_rows:
        key = f"SELL|{get_producto(r.producto_id)}|{get_color(r.color_id)}|{r.ancho}x{r.espesor}"
        if key not in sell_data:
            sell_data[key] = {'label': f"UNID {get_producto(r.producto_id)} {get_color(r.color_id)} {r.ancho}x{r.espesor}", 'dia': {}, 'noche': {}}
        fecha_str = r.fecha.isoformat()
        sell_data[key][r.turno][fecha_str] = int(r.total_unidades)

    return {
        'lunes': lunes.isoformat(),
        'viernes': (lunes + timedelta(days=4)).isoformat(),
        'dias': [d.isoformat() for d in dias],
        'extrusora': list(ext_data.values()),
        'selladora': list(sell_data.values())
    }


@router.get("/semana/excel")
def descargar_excel_semana(fecha: Optional[str] = None, db: Session = Depends(get_db)):
    hoy = date.today()
    base = date.fromisoformat(fecha) if fecha else hoy
    lunes = get_lunes(base)
    dias, ext_rows, sell_rows = get_semana_datos(db, lunes)

    from app.models.producto import Producto
    from app.models.produccion import Color

    productos_cache = {}
    colores_cache = {}

    def get_producto(pid):
        if pid not in productos_cache:
            p = db.query(Producto).filter(Producto.id == pid).first()
            productos_cache[pid] = p.nombre if p else str(pid)
        return productos_cache[pid]

    def get_color(cid):
        if cid not in colores_cache:
            c = db.query(Color).filter(Color.id == cid).first()
            colores_cache[cid] = c.nombre if c else str(cid)
        return colores_cache[cid]

    wb = Workbook()
    ws = wb.active
    ws.title = f"Semana {lunes.strftime('%d-%m-%Y')}"

    thin = Side(style='thin')
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    header_fill = PatternFill('solid', fgColor='1F3864')
    dia_fill = PatternFill('solid', fgColor='2E75B6')
    noche_fill = PatternFill('solid', fgColor='1F3864')