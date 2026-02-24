from sqlalchemy.orm import Session
from app.models.empresa import Empresa
from app.schemas.empresa import EmpresaCreate, EmpresaUpdate

def get_all(db: Session):
    return db.query(Empresa).all()

def get_by_id(db: Session, empresa_id: int):
    return db.query(Empresa).filter(Empresa.id == empresa_id).first()

def create(db: Session, data: EmpresaCreate):
    empresa = Empresa(**data.model_dump())
    db.add(empresa)
    db.commit()
    db.refresh(empresa)
    return empresa

def update(db: Session, empresa_id: int, data: EmpresaUpdate):
    empresa = get_by_id(db, empresa_id)
    if not empresa:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(empresa, field, value)
    db.commit()
    db.refresh(empresa)
    return empresa

def delete(db: Session, empresa_id: int):
    empresa = get_by_id(db, empresa_id)
    if not empresa:
        return None
    db.delete(empresa)
    db.commit()
    return True