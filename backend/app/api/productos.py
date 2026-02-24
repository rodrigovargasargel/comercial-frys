from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.producto import ProductoCreate, ProductoUpdate, ProductoOut, TipoProductoOut, UMedidaOut, TipoMaquinaOut
from app.services import producto_service

router = APIRouter(prefix="/productos", tags=["Productos"])

@router.get("/tipos-producto", response_model=List[TipoProductoOut])
def listar_tipos_producto(db: Session = Depends(get_db)):
    return producto_service.get_tipos_producto(db)

@router.get("/u-medidas", response_model=List[UMedidaOut])
def listar_u_medidas(db: Session = Depends(get_db)):
    return producto_service.get_u_medidas(db)

@router.get("/tipos-maquina", response_model=List[TipoMaquinaOut])
def listar_tipos_maquina(db: Session = Depends(get_db)):
    return producto_service.get_tipos_maquina(db)

@router.get("/", response_model=List[ProductoOut])
def listar(db: Session = Depends(get_db)):
    return producto_service.get_all(db)

@router.get("/{producto_id}", response_model=ProductoOut)
def obtener(producto_id: int, db: Session = Depends(get_db)):
    producto = producto_service.get_by_id(db, producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto

@router.post("/", response_model=ProductoOut, status_code=201)
def crear(data: ProductoCreate, db: Session = Depends(get_db)):
    return producto_service.create(db, data)

@router.put("/{producto_id}", response_model=ProductoOut)
def actualizar(producto_id: int, data: ProductoUpdate, db: Session = Depends(get_db)):
    producto = producto_service.update(db, producto_id, data)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto

@router.delete("/{producto_id}", status_code=204)
def eliminar(producto_id: int, db: Session = Depends(get_db)):
    resultado = producto_service.delete(db, producto_id)
    if not resultado:
        raise HTTPException(status_code=404, detail="Producto no encontrado")