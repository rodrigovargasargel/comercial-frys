from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.produccion import (
    OrdenProduccionCreate, OrdenProduccionUpdate, OrdenProduccionOut,
    ProduccionExtrusoraCreate, ProduccionExtrusoraOut,
    DetalleCreate, DetalleOut
)
from app.services import produccion_service

router = APIRouter(prefix="/produccion", tags=["Produccion"])

@router.post("/detalles", response_model=DetalleOut, status_code=201)
def crear_detalle(data: DetalleCreate, db: Session = Depends(get_db)):
    try:
        return produccion_service.create_detalle(db, data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- Órdenes de Producción ---
@router.get("/ops", response_model=List[OrdenProduccionOut])
def listar_ops(db: Session = Depends(get_db)):
    return produccion_service.get_all_ops(db)

@router.get("/ops/{op_id}", response_model=OrdenProduccionOut)
def obtener_op(op_id: int, db: Session = Depends(get_db)):
    op = produccion_service.get_op_by_id(db, op_id)
    if not op:
        raise HTTPException(status_code=404, detail="OP no encontrada")
    return op

@router.post("/ops", response_model=OrdenProduccionOut, status_code=201)
def crear_op(data: OrdenProduccionCreate, db: Session = Depends(get_db)):
    return produccion_service.create_op(db, data)

@router.put("/ops/{op_id}", response_model=OrdenProduccionOut)
def actualizar_op(op_id: int, data: OrdenProduccionUpdate, db: Session = Depends(get_db)):
    op = produccion_service.update_op(db, op_id, data)
    if not op:
        raise HTTPException(status_code=404, detail="OP no encontrada")
    return op

@router.delete("/ops/{op_id}", status_code=204)
def eliminar_op(op_id: int, db: Session = Depends(get_db)):
    if not produccion_service.delete_op(db, op_id):
        raise HTTPException(status_code=404, detail="OP no encontrada")

# --- Produccion Extrusora ---
@router.get("/ops/{op_id}/producciones", response_model=List[ProduccionExtrusoraOut])
def listar_producciones(op_id: int, db: Session = Depends(get_db)):
    return produccion_service.get_producciones_by_op(db, op_id)

@router.post("/producciones", response_model=ProduccionExtrusoraOut, status_code=201)
def crear_produccion(data: ProduccionExtrusoraCreate, db: Session = Depends(get_db)):
    return produccion_service.create_produccion(db, data)

@router.delete("/producciones/{produccion_id}", status_code=204)
def eliminar_produccion(produccion_id: int, db: Session = Depends(get_db)):
    if not produccion_service.delete_produccion(db, produccion_id):
        raise HTTPException(status_code=404, detail="Producción no encontrada")

# --- Detalle ---
@router.get("/producciones/{produccion_id}/detalles", response_model=List[DetalleOut])
def listar_detalles(produccion_id: int, db: Session = Depends(get_db)):
    return produccion_service.get_detalles_by_produccion(db, produccion_id)

@router.post("/detalles", response_model=DetalleOut, status_code=201)
def crear_detalle(data: DetalleCreate, db: Session = Depends(get_db)):
    return produccion_service.create_detalle(db, data)

@router.delete("/detalles/{detalle_id}", status_code=204)
def eliminar_detalle(detalle_id: int, db: Session = Depends(get_db)):
    if not produccion_service.delete_detalle(db, detalle_id):
        raise HTTPException(status_code=404, detail="Detalle no encontrado")