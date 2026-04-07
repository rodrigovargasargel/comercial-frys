from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.selladora import OPSelladora, ProduccionSelladora, ProduccionSelladoraDetalle
from app.models.produccion import ProduccionExtrusora, DetalleProduccionExtrusora
from app.schemas.selladora import (
    OPSelladoraCreate, OPSelladoraUpdate,
    ProduccionSelladoraCreate, ProduccionSelladoraDetalleCreate
)

def _unidades_producidas_op(db: Session, op_id: int) -> int:
    total = db.query(func.sum(ProduccionSelladoraDetalle.unidades))\
        .join(ProduccionSelladora)\
        .filter(ProduccionSelladora.op_id == op_id).scalar()
    return total or 0

def _enrich_op(db: Session, op: OPSelladora):
    u = _unidades_producidas_op(db, op.id)
    op.unidades_producidas = u
    op.unidades_faltantes = max(op.unidades - u, 0)
    return op

def _unidades_producidas_produccion(db: Session, prod_id: int) -> int:
    total = db.query(func.sum(ProduccionSelladoraDetalle.unidades))\
        .filter(ProduccionSelladoraDetalle.produccion_selladora_id == prod_id).scalar()
    return total or 0

def _enrich_produccion(db: Session, prod: ProduccionSelladora):
    prod.unidades_producidas = _unidades_producidas_produccion(db, prod.id)
    return prod

# --- OPs ---
def get_all_ops(db: Session):
    return [_enrich_op(db, op) for op in db.query(OPSelladora).order_by(OPSelladora.fecha.desc()).all()]

def get_op_by_id(db: Session, op_id: int):
    op = db.query(OPSelladora).filter(OPSelladora.id == op_id).first()
    return _enrich_op(db, op) if op else None

def create_op(db: Session, data: OPSelladoraCreate):
    op = OPSelladora(**data.model_dump())
    db.add(op)
    db.commit()
    db.refresh(op)
    return _enrich_op(db, op)

def update_op(db: Session, op_id: int, data: OPSelladoraUpdate):
    op = db.query(OPSelladora).filter(OPSelladora.id == op_id).first()
    if not op:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(op, field, value)
    db.commit()
    db.refresh(op)
    return _enrich_op(db, op)

def delete_op(db: Session, op_id: int):
    op = db.query(OPSelladora).filter(OPSelladora.id == op_id).first()
    if not op:
        return None
    db.delete(op)
    db.commit()
    return True

# --- Producciones ---
def get_producciones_by_op(db: Session, op_id: int):
    return [_enrich_produccion(db, p) for p in
            db.query(ProduccionSelladora).filter(ProduccionSelladora.op_id == op_id).all()]

def create_produccion(db: Session, data: ProduccionSelladoraCreate):
    prod = ProduccionSelladora(**data.model_dump())
    db.add(prod)
    db.commit()
    db.refresh(prod)
    op = db.query(OPSelladora).filter(OPSelladora.id == data.op_id).first()
    if op and op.estado == "pendiente":
        op.estado = "en_produccion"
        db.commit()
    return _enrich_produccion(db, prod)

def delete_produccion(db: Session, prod_id: int):
    prod = db.query(ProduccionSelladora).filter(ProduccionSelladora.id == prod_id).first()
    if not prod:
        return None
    db.delete(prod)
    db.commit()
    return True

# --- Detalles ---
def get_detalles_by_produccion(db: Session, prod_id: int):
    detalles = db.query(ProduccionSelladoraDetalle)\
        .filter(ProduccionSelladoraDetalle.produccion_selladora_id == prod_id).all()
    for d in detalles:
        d.numero_rollo = d.detalle_extrusora.numero_rollo if d.detalle_extrusora else 0
    return detalles

def get_rollos_disponibles(db: Session, color_id: int, ancho: float, espesor: float):
    # Buscar detalles extrusora que coincidan y no estén usados en selladora
    usados = db.query(ProduccionSelladoraDetalle.detalle_extrusora_id).subquery()
    rollos = db.query(DetalleProduccionExtrusora)\
        .join(ProduccionExtrusora)\
        .join(OPSelladora.__table__,
              (OPSelladora.color_id == color_id) &
              (OPSelladora.ancho == ancho) &
              (OPSelladora.espesor == espesor),
              isouter=True)\
        .filter(
            DetalleProduccionExtrusora.id.notin_(usados)
        ).all()

    # Filtrar por OP extrusora que tenga mismo color, ancho, espesor
    from app.models.produccion import OrdenProduccion
    ops_match = db.query(OrdenProduccion.id).filter(
        OrdenProduccion.color_id == color_id,
        OrdenProduccion.ancho == ancho,
        OrdenProduccion.espesor == espesor
    ).subquery()

    rollos = db.query(DetalleProduccionExtrusora)\
        .join(ProduccionExtrusora, DetalleProduccionExtrusora.produccion_extrusora_id == ProduccionExtrusora.id)\
        .filter(
            ProduccionExtrusora.op_id.in_(ops_match),
            DetalleProduccionExtrusora.id.notin_(usados)
        ).all()

    return rollos

def create_detalle(db: Session, data: ProduccionSelladoraDetalleCreate):
    usado = db.query(ProduccionSelladoraDetalle)\
        .filter(ProduccionSelladoraDetalle.detalle_extrusora_id == data.detalle_extrusora_id).first()
    if usado:
        raise ValueError("Este rollo ya fue usado en otra producción")

    rollo = db.query(DetalleProduccionExtrusora)\
        .filter(DetalleProduccionExtrusora.id == data.detalle_extrusora_id).first()
    if not rollo:
        raise ValueError("Rollo no encontrado")

    unidades = data.q_paquetes * data.q_unidades_por_paquete
    # Usar kilos_producidos si fue editado, sino usar los kg del rollo
    kilos = data.kilos_producidos if data.kilos_producidos is not None else rollo.kg

    detalle = ProduccionSelladoraDetalle(
        produccion_selladora_id=data.produccion_selladora_id,
        detalle_extrusora_id=data.detalle_extrusora_id,
        q_paquetes=data.q_paquetes,
        q_unidades_por_paquete=data.q_unidades_por_paquete,
        unidades=unidades,
        kilos=kilos
    )
    db.add(detalle)
    db.commit()
    db.refresh(detalle)

    prod = db.query(ProduccionSelladora)\
        .filter(ProduccionSelladora.id == data.produccion_selladora_id).first()
    if prod:
        op = db.query(OPSelladora).filter(OPSelladora.id == prod.op_id).first()
        if op:
            total = _unidades_producidas_op(db, op.id)
            if total >= op.unidades:
                op.estado = "completada"
                db.commit()

    detalle.numero_rollo = rollo.numero_rollo
    return detalle    
    # Verificar que el rollo no esté usado
    usado = db.query(ProduccionSelladoraDetalle)\
        .filter(ProduccionSelladoraDetalle.detalle_extrusora_id == data.detalle_extrusora_id).first()
    if usado:
        raise ValueError("Este rollo ya fue usado en otra producción")

    rollo = db.query(DetalleProduccionExtrusora)\
        .filter(DetalleProduccionExtrusora.id == data.detalle_extrusora_id).first()
    if not rollo:
        raise ValueError("Rollo no encontrado")

    unidades = data.q_paquetes * data.q_unidades_por_paquete
    detalle = ProduccionSelladoraDetalle(
        produccion_selladora_id=data.produccion_selladora_id,
        detalle_extrusora_id=data.detalle_extrusora_id,
        q_paquetes=data.q_paquetes,
        q_unidades_por_paquete=data.q_unidades_por_paquete,
        unidades=unidades,
        kilos=rollo.kg
    )
    db.add(detalle)
    db.commit()
    db.refresh(detalle)

    # Verificar si OP quedó completada
    prod = db.query(ProduccionSelladora)\
        .filter(ProduccionSelladora.id == data.produccion_selladora_id).first()
    if prod:
        op = db.query(OPSelladora).filter(OPSelladora.id == prod.op_id).first()
        if op:
            total = _unidades_producidas_op(db, op.id)
            if total >= op.unidades:
                op.estado = "completada"
                db.commit()

    detalle.numero_rollo = rollo.numero_rollo
    return detalle

def delete_detalle(db: Session, detalle_id: int):
    det = db.query(ProduccionSelladoraDetalle)\
        .filter(ProduccionSelladoraDetalle.id == detalle_id).first()
    if not det:
        return None
    db.delete(det)
    db.commit()
    return True

def get_detalles_by_produccion(db: Session, prod_id: int):
    detalles = db.query(ProduccionSelladoraDetalle)\
        .filter(ProduccionSelladoraDetalle.produccion_selladora_id == prod_id).all()
    for d in detalles:
        d.numero_rollo = d.detalle_extrusora.numero_rollo if d.detalle_extrusora else 0
        # Adjuntar lote del rollo de extrusora
        if d.detalle_extrusora and d.detalle_extrusora.produccion:
            d.lote_extrusora = d.detalle_extrusora.produccion.lote
        else:
            d.lote_extrusora = None
    return detalles    

   