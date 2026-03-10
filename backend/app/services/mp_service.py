from sqlalchemy.orm import Session
from app.models.materia_prima import MateriaPrima, MateriaPrimaDetalle, MateriaPrimaTipo
from app.schemas.materia_prima import MateriaPrimaCreate, MateriaPrimaUpdate, MPDetalleCreate

def _enrich(mp: MateriaPrima):
    mp.kg_total = round(sum(d.kg for d in mp.detalles), 2)
    return mp

def get_all(db: Session):
    return [_enrich(mp) for mp in db.query(MateriaPrima).order_by(MateriaPrima.fecha.desc()).all()]

def get_by_id(db: Session, mp_id: int):
    mp = db.query(MateriaPrima).filter(MateriaPrima.id == mp_id).first()
    return _enrich(mp) if mp else None

def create(db: Session, data: MateriaPrimaCreate):
    mp = MateriaPrima(
        fecha=data.fecha,
        empresa_id=data.empresa_id,
        oc=data.oc,
        factura=data.factura
    )
    db.add(mp)
    db.flush()
    for det in data.detalles:
        db.add(MateriaPrimaDetalle(mp_id=mp.id, **det.model_dump()))
    db.commit()
    db.refresh(mp)
    return _enrich(mp)

def update(db: Session, mp_id: int, data: MateriaPrimaUpdate):
    mp = db.query(MateriaPrima).filter(MateriaPrima.id == mp_id).first()
    if not mp:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(mp, field, value)
    db.commit()
    db.refresh(mp)
    return _enrich(mp)

def delete(db: Session, mp_id: int):
    mp = db.query(MateriaPrima).filter(MateriaPrima.id == mp_id).first()
    if not mp:
        return None
    db.delete(mp)
    db.commit()
    return True

def get_tipos(db: Session):
    return db.query(MateriaPrimaTipo).all()

def create_tipo(db: Session, nombre: str):
    tipo = MateriaPrimaTipo(nombre=nombre)
    db.add(tipo)
    db.commit()
    db.refresh(tipo)
    return tipo

def add_detalle(db: Session, mp_id: int, data: MPDetalleCreate):
    mp = db.query(MateriaPrima).filter(MateriaPrima.id == mp_id).first()
    if not mp:
        raise ValueError("Materia prima no encontrada")
    det = MateriaPrimaDetalle(mp_id=mp_id, **data.model_dump())
    db.add(det)
    db.commit()
    db.refresh(det)
    return det

def delete_detalle(db: Session, detalle_id: int):
    det = db.query(MateriaPrimaDetalle).filter(MateriaPrimaDetalle.id == detalle_id).first()
    if not det:
        return None
    db.delete(det)
    db.commit()
    return True