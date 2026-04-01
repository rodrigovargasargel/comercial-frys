from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.selladora import (
    OPSelladoraCreate, OPSelladoraUpdate, OPSelladoraOut,
    ProduccionSelladoraCreate, ProduccionSelladoraOut,
    ProduccionSelladoraDetalleCreate, ProduccionSelladoraDetalleOut,
    DetalleExtrusoraDisponible
)
from app.services import selladora_service
from app.models.maquina import Maquina, TipoMaquina
from app.schemas.materia_prima import MPTipoOut

router = APIRouter(prefix="/selladora", tags=["Selladora"])

@router.get("/maquinas-selladoras")
def listar_maquinas_selladoras(db: Session = Depends(get_db)):
    tipo = db.query(TipoMaquina).filter(TipoMaquina.nombre == "Selladora").first()
    if not tipo:
        return []
    return db.query(Maquina).filter(Maquina.tipo_maquina_id == tipo.id).all()

@router.get("/ops", response_model=List[OPSelladoraOut])
def listar_ops(db: Session = Depends(get_db)):
    return selladora_service.get_all_ops(db)

@router.post("/ops", response_model=OPSelladoraOut, status_code=201)
def crear_op(data: OPSelladoraCreate, db: Session = Depends(get_db)):
    return selladora_service.create_op(db, data)

@router.put("/ops/{op_id}", response_model=OPSelladoraOut)
def actualizar_op(op_id: int, data: OPSelladoraUpdate, db: Session = Depends(get_db)):
    op = selladora_service.update_op(db, op_id, data)
    if not op:
        raise HTTPException(status_code=404, detail="OP no encontrada")
    return op

@router.delete("/ops/{op_id}", status_code=204)
def eliminar_op(op_id: int, db: Session = Depends(get_db)):
    if not selladora_service.delete_op(db, op_id):
        raise HTTPException(status_code=404, detail="OP no encontrada")

@router.get("/ops/{op_id}/producciones", response_model=List[ProduccionSelladoraOut])
def listar_producciones(op_id: int, db: Session = Depends(get_db)):
    return selladora_service.get_producciones_by_op(db, op_id)

@router.post("/producciones", response_model=ProduccionSelladoraOut, status_code=201)
def crear_produccion(data: ProduccionSelladoraCreate, db: Session = Depends(get_db)):
    return selladora_service.create_produccion(db, data)

@router.delete("/producciones/{prod_id}", status_code=204)
def eliminar_produccion(prod_id: int, db: Session = Depends(get_db)):
    if not selladora_service.delete_produccion(db, prod_id):
        raise HTTPException(status_code=404, detail="No encontrado")

@router.get("/producciones/{prod_id}/detalles", response_model=List[ProduccionSelladoraDetalleOut])
def listar_detalles(prod_id: int, db: Session = Depends(get_db)):
    from app.models.produccion import OrdenProduccion
    detalles = selladora_service.get_detalles_by_produccion(db, prod_id)
    result = []
    for d in detalles:
        lote = None
        fecha = None
        densidad = None
        if d.detalle_extrusora and d.detalle_extrusora.produccion:
            lote = d.detalle_extrusora.produccion.lote
            fecha = d.detalle_extrusora.produccion.fecha
            op_ext = db.query(OrdenProduccion).filter(
                OrdenProduccion.id == d.detalle_extrusora.produccion.op_id
            ).first()
            if op_ext:
                densidad = op_ext.densidad
        result.append(ProduccionSelladoraDetalleOut(
            id=d.id,
            detalle_extrusora_id=d.detalle_extrusora_id,
            q_paquetes=d.q_paquetes,
            q_unidades_por_paquete=d.q_unidades_por_paquete,
            unidades=d.unidades,
            kilos=d.kilos,
            numero_rollo=d.detalle_extrusora.numero_rollo if d.detalle_extrusora else 0,
            lote_extrusora=lote,
            fecha_extrusora=fecha,
            densidad_extrusora=densidad,
            created_at=d.created_at
        ))
    return result

@router.get("/rollos-disponibles", response_model=List[DetalleExtrusoraDisponible])
def rollos_disponibles(color_id: int, ancho: float, espesor: float, db: Session = Depends(get_db)):
    rollos = selladora_service.get_rollos_disponibles(db, color_id, ancho, espesor)
    return [
        DetalleExtrusoraDisponible(
            id=r.id,
            numero_rollo=r.numero_rollo,
            kg=r.kg,
            lote=r.produccion.lote if r.produccion else '',
            fecha_produccion=r.produccion.fecha if r.produccion else None
        ) for r in rollos
    ]

@router.post("/detalles", response_model=ProduccionSelladoraDetalleOut, status_code=201)
def crear_detalle(data: ProduccionSelladoraDetalleCreate, db: Session = Depends(get_db)):
    try:
        return selladora_service.create_detalle(db, data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/detalles/{detalle_id}", status_code=204)
def eliminar_detalle(detalle_id: int, db: Session = Depends(get_db)):
    if not selladora_service.delete_detalle(db, detalle_id):
        raise HTTPException(status_code=404, detail="No encontrado")