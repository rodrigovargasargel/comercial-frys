from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.maquina import MaquinaCreate, MaquinaUpdate, MaquinaOut, TipoMaquinaOut
from app.services import maquina_service

router = APIRouter(prefix="/maquinas", tags=["Maquinas"])

@router.get("/tipos", response_model=List[TipoMaquinaOut])
def listar_tipos(db: Session = Depends(get_db)):
    return maquina_service.get_tipos(db)

@router.get("/", response_model=List[MaquinaOut])
def listar(db: Session = Depends(get_db)):
    return maquina_service.get_all(db)

@router.get("/{maquina_id}", response_model=MaquinaOut)
def obtener(maquina_id: int, db: Session = Depends(get_db)):
    maquina = maquina_service.get_by_id(db, maquina_id)
    if not maquina:
        raise HTTPException(status_code=404, detail="Máquina no encontrada")
    return maquina

@router.post("/", response_model=MaquinaOut, status_code=201)
def crear(data: MaquinaCreate, db: Session = Depends(get_db)):
    return maquina_service.create(db, data)

@router.put("/{maquina_id}", response_model=MaquinaOut)
def actualizar(maquina_id: int, data: MaquinaUpdate, db: Session = Depends(get_db)):
    maquina = maquina_service.update(db, maquina_id, data)
    if not maquina:
        raise HTTPException(status_code=404, detail="Máquina no encontrada")
    return maquina

@router.delete("/{maquina_id}", status_code=204)
def eliminar(maquina_id: int, db: Session = Depends(get_db)):
    resultado = maquina_service.delete(db, maquina_id)
    if not resultado:
        raise HTTPException(status_code=404, detail="Máquina no encontrada")