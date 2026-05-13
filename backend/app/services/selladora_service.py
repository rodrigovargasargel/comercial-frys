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
    from app.models.produccion import OrdenProduccion
    from sqlalchemy import func

    ops_match = db.query(OrdenProduccion.id).filter(
        OrdenProduccion.color_id == color_id,
        OrdenProduccion.ancho == ancho,
        OrdenProduccion.espesor == espesor
    ).subquery()

    kg_usados = db.query(
        ProduccionSelladoraDetalle.detalle_extrusora_id,
        func.sum(ProduccionSelladoraDetalle.kilos).label('total_usado')
    ).filter(
        ProduccionSelladoraDetalle.es_pack_parcial == False
    ).group_by(
        ProduccionSelladoraDetalle.detalle_extrusora_id
    ).subquery()

    rollos = db.query(
        DetalleProduccionExtrusora,
        (DetalleProduccionExtrusora.kg - func.coalesce(kg_usados.c.total_usado, 0)).label('kg_disponibles')
    ).join(
        ProduccionExtrusora,
        DetalleProduccionExtrusora.produccion_extrusora_id == ProduccionExtrusora.id
    ).outerjoin(
        kg_usados,
        DetalleProduccionExtrusora.id == kg_usados.c.detalle_extrusora_id
    ).filter(
        ProduccionExtrusora.op_id.in_(ops_match),
        (DetalleProduccionExtrusora.kg - func.coalesce(kg_usados.c.total_usado, 0)) > 0
    ).all()

    print(f"Rollos encontrados: {len(rollos)}")
    for rollo, kg_disp in rollos:
        print(f"  Rollo {rollo.id}: kg_original={rollo.kg}, kg_disponibles={kg_disp}")

    result = []
    for rollo, kg_disponibles in rollos:
        rollo.kg_disponibles = round(float(kg_disponibles), 2)
        result.append(rollo)

    return result

def create_detalle(db: Session, data: ProduccionSelladoraDetalleCreate):
    if not data.es_pack_parcial:
        # Calcular kg disponibles del rollo
        kg_usados = db.query(func.sum(ProduccionSelladoraDetalle.kilos))\
            .filter(ProduccionSelladoraDetalle.detalle_extrusora_id == data.detalle_extrusora_id)\
            .filter(ProduccionSelladoraDetalle.es_pack_parcial == False).scalar() or 0

        rollo = db.query(DetalleProduccionExtrusora)\
            .filter(DetalleProduccionExtrusora.id == data.detalle_extrusora_id).first()
        if not rollo:
            raise ValueError("Rollo no encontrado")

        kg_disponibles = rollo.kg - kg_usados
        if kg_disponibles <= 0:
            raise ValueError("Este rollo no tiene kg disponibles")

        if data.kilos_producidos and data.kilos_producidos > kg_disponibles:
            raise ValueError(f"Los kg ingresados ({data.kilos_producidos}) superan los disponibles ({round(kg_disponibles, 2)} kg)")
    else:
        pack_parcial_existente = db.query(ProduccionSelladoraDetalle)\
            .filter(ProduccionSelladoraDetalle.detalle_extrusora_id == data.detalle_extrusora_id)\
            .filter(ProduccionSelladoraDetalle.es_pack_parcial == True).first()
        if pack_parcial_existente:
            raise ValueError("Este rollo ya tiene un pack parcial registrado")

        rollo = db.query(DetalleProduccionExtrusora)\
            .filter(DetalleProduccionExtrusora.id == data.detalle_extrusora_id).first()
        if not rollo:
            raise ValueError("Rollo no encontrado")

    unidades = data.q_paquetes * data.q_unidades_por_paquete
    kilos = data.kilos_producidos if data.kilos_producidos is not None else rollo.kg

    detalle = ProduccionSelladoraDetalle(
        produccion_selladora_id=data.produccion_selladora_id,
        detalle_extrusora_id=data.detalle_extrusora_id,
        q_paquetes=data.q_paquetes,
        q_unidades_por_paquete=data.q_unidades_por_paquete,
        unidades=unidades,
        kilos=kilos,
        kilos_imp=data.kilos_imp,
        imprimir_kg=data.imprimir_kg,
        mostrar_titulo=data.mostrar_titulo,
        es_pack_parcial=data.es_pack_parcial
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

   