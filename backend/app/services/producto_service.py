from sqlalchemy.orm import Session
from app.models.producto import Producto, TipoProducto, UMedida
from app.models.maquina import TipoMaquina
from app.schemas.producto import ProductoCreate, ProductoUpdate

def get_all(db: Session):
    return db.query(Producto).all()

def get_by_id(db: Session, producto_id: int):
    return db.query(Producto).filter(Producto.id == producto_id).first()

def create(db: Session, data: ProductoCreate):
    producto = Producto(**data.model_dump())
    db.add(producto)
    db.commit()
    db.refresh(producto)
    return producto

def update(db: Session, producto_id: int, data: ProductoUpdate):
    producto = get_by_id(db, producto_id)
    if not producto:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(producto, field, value)
    db.commit()
    db.refresh(producto)
    return producto

def delete(db: Session, producto_id: int):
    producto = get_by_id(db, producto_id)
    if not producto:
        return None
    db.delete(producto)
    db.commit()
    return True

def get_tipos_producto(db: Session):
    return db.query(TipoProducto).all()

def get_u_medidas(db: Session):
    return db.query(UMedida).all()

def get_tipos_maquina(db: Session):
    return db.query(TipoMaquina).all()