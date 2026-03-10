from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.materia_prima import (
    MateriaPrimaCreate, MateriaPrimaUpdate, MateriaPrimaOut,
    MPDetalleCreate, MPDetalleOut, MPTipoOut
)
from app.services import mp_service

router = APIRouter(prefix="/materia-prima", tags=["MateriaPrima"])

@router.get("/tipos", response_model=List[MPTipoOut])
def listar_tipos(db: Session = Depends(get_db)):
    return mp_service.get_tipos(db)

@router.post("/tipos", response_model=MPTipoOut, status_code=201)
def crear_tipo(body: dict, db: Session = Depends(get_db)):
    nombre = body.get("nombre", "").strip()
    if not nombre:
        raise HTTPException(status_code=400, detail="Nombre requerido")
    return mp_service.create_tipo(db, nombre)

@router.get("/", response_model=List[MateriaPrimaOut])
def listar(db: Session = Depends(get_db)):
    return mp_service.get_all(db)

@router.get("/{mp_id}", response_model=MateriaPrimaOut)
def obtener(mp_id: int, db: Session = Depends(get_db)):
    mp = mp_service.get_by_id(db, mp_id)
    if not mp:
        raise HTTPException(status_code=404, detail="No encontrado")
    return mp

@router.post("/", response_model=MateriaPrimaOut, status_code=201)
def crear(data: MateriaPrimaCreate, db: Session = Depends(get_db)):
    return mp_service.create(db, data)

@router.put("/{mp_id}", response_model=MateriaPrimaOut)
def actualizar(mp_id: int, data: MateriaPrimaUpdate, db: Session = Depends(get_db)):
    mp = mp_service.update(db, mp_id, data)
    if not mp:
        raise HTTPException(status_code=404, detail="No encontrado")
    return mp

@router.delete("/{mp_id}", status_code=204)
def eliminar(mp_id: int, db: Session = Depends(get_db)):
    if not mp_service.delete(db, mp_id):
        raise HTTPException(status_code=404, detail="No encontrado")

@router.post("/{mp_id}/detalles", response_model=MPDetalleOut, status_code=201)
def agregar_detalle(mp_id: int, data: MPDetalleCreate, db: Session = Depends(get_db)):
    try:
        return mp_service.add_detalle(db, mp_id, data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/detalles/{detalle_id}", status_code=204)
def eliminar_detalle(detalle_id: int, db: Session = Depends(get_db)):
    if not mp_service.delete_detalle(db, detalle_id):
        raise HTTPException(status_code=404, detail="No encontrado")