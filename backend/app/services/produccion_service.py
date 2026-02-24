from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.produccion import OrdenProduccion, ProduccionExtrusora, DetalleProduccionExtrusora
from app.schemas.produccion import OrdenProduccionCreate, OrdenProduccionUpdate, ProduccionExtrusoraCreate, DetalleCreate

# --- Helpers ---
def _kg_producidos_op(db: Session, op_id: int) -> float:
    total = db.query(func.sum(DetalleProduccionExtrusora.kg))\
        .join(ProduccionExtrusora)\
        .filter(ProduccionExtrusora.op_id == op_id).scalar()
    return round(total or 0, 2)

def _kg_producidos_produccion(db: Session, produccion_id: int) -> float:
    total = db.query(func.sum(DetalleProduccionExtrusora.kg))\
        .filter(DetalleProduccionExtrusora.produccion_extrusora_id == produccion_id).scalar()
    return round(total or 0, 2)

def _enrich_op(db: Session, op: OrdenProduccion):
    kg_total = _kg_producidos_op(db, op.id)
    op.kg_producidos_total = kg_total
    op.kg_faltantes = round(max(op.kilos_a_producir - kg_total, 0), 2)
    return op

def _enrich_produccion(db: Session, produccion: ProduccionExtrusora):
    kg = _kg_producidos_produccion(db, produccion.id)
    produccion.kg_producidos = kg
    produccion.kg_faltantes = round(
        max(produccion.op.kilos_a_producir - _kg_producidos_op(db, produccion.op_id), 0), 2
    )
    return produccion

# --- Ordenes de Producción ---
def get_all_ops(db: Session):
    ops = db.query(OrdenProduccion).all()
    return [_enrich_op(db, op) for op in ops]

def get_op_by_id(db: Session, op_id: int):
    op = db.query(OrdenProduccion).filter(OrdenProduccion.id == op_id).first()
    if not op:
        return None
    return _enrich_op(db, op)

def create_op(db: Session, data: OrdenProduccionCreate):
    op = OrdenProduccion(**data.model_dump())
    db.add(op)
    db.commit()
    db.refresh(op)
    return _enrich_op(db, op)

def update_op(db: Session, op_id: int, data: OrdenProduccionUpdate):
    op = db.query(OrdenProduccion).filter(OrdenProduccion.id == op_id).first()
    if not op:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(op, field, value)
    db.commit()
    db.refresh(op)
    return _enrich_op(db, op)

def delete_op(db: Session, op_id: int):
    op = db.query(OrdenProduccion).filter(OrdenProduccion.id == op_id).first()
    if not op:
        return None
    db.delete(op)
    db.commit()
    return True

# --- Produccion Extrusora ---
def get_producciones_by_op(db: Session, op_id: int):
    producciones = db.query(ProduccionExtrusora)\
        .filter(ProduccionExtrusora.op_id == op_id).all()
    return [_enrich_produccion(db, p) for p in producciones]

def create_produccion(db: Session, data: ProduccionExtrusoraCreate):
    produccion = ProduccionExtrusora(**data.model_dump())
    db.add(produccion)
    db.commit()
    db.refresh(produccion)
    op = db.query(OrdenProduccion).filter(OrdenProduccion.id == data.op_id).first()
    if op and op.estado == "pendiente":
        op.estado = "en_produccion"
        db.commit()
    return _enrich_produccion(db, produccion)

def delete_produccion(db: Session, produccion_id: int):
    produccion = db.query(ProduccionExtrusora)\
        .filter(ProduccionExtrusora.id == produccion_id).first()
    if not produccion:
        return None
    db.delete(produccion)
    db.commit()
    return True

# --- Detalle ---
def get_detalles_by_produccion(db: Session, produccion_id: int):
    return db.query(DetalleProduccionExtrusora)\
        .filter(DetalleProduccionExtrusora.produccion_extrusora_id == produccion_id).all()

def create_detalle(db: Session, data: DetalleCreate):
    detalle = DetalleProduccionExtrusora(**data.model_dump())
    db.add(detalle)
    db.commit()
    db.refresh(detalle)
    return detalle

def delete_detalle(db: Session, detalle_id: int):
    detalle = db.query(DetalleProduccionExtrusora)\
        .filter(DetalleProduccionExtrusora.id == detalle_id).first()
    if not detalle:
        return None
    db.delete(detalle)
    db.commit()
    return True

def create_detalle(db: Session, data: DetalleCreate):
    # Obtener la OP desde la produccion
    produccion = db.query(ProduccionExtrusora)\
        .filter(ProduccionExtrusora.id == data.produccion_extrusora_id).first()
    if not produccion:
        raise ValueError("Producción no encontrada")

    # Calcular kg ya ingresados en toda la OP
    kg_actuales = _kg_producidos_op(db, produccion.op_id)
    op = db.query(OrdenProduccion).filter(OrdenProduccion.id == produccion.op_id).first()

    if (kg_actuales + data.kg) > (op.kilos_a_producir + 50):
        raise ValueError(f"Los kg ingresados superan en más de 50 kg los kilos pedidos en la OP ({op.kilos_a_producir} kg)")

    detalle = DetalleProduccionExtrusora(**data.model_dump())
    db.add(detalle)
    db.commit()
    db.refresh(detalle)
    return detalle    