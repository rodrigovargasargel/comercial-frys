from sqlalchemy.orm import Session
from app.models.maquina import Maquina, TipoMaquina
from app.schemas.maquina import MaquinaCreate, MaquinaUpdate

def get_all(db: Session):
    return db.query(Maquina).all()

def get_by_id(db: Session, maquina_id: int):
    return db.query(Maquina).filter(Maquina.id == maquina_id).first()

def create(db: Session, data: MaquinaCreate):
    maquina = Maquina(**data.model_dump())
    db.add(maquina)
    db.commit()
    db.refresh(maquina)
    return maquina

def update(db: Session, maquina_id: int, data: MaquinaUpdate):
    maquina = get_by_id(db, maquina_id)
    if not maquina:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(maquina, field, value)
    db.commit()
    db.refresh(maquina)
    return maquina

def delete(db: Session, maquina_id: int):
    maquina = get_by_id(db, maquina_id)
    if not maquina:
        return None
    db.delete(maquina)
    db.commit()
    return True

def get_tipos(db: Session):
    return db.query(TipoMaquina).all()