from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.empresa import EmpresaCreate, EmpresaUpdate, EmpresaOut
from app.services import empresa_service

router = APIRouter(prefix="/empresas", tags=["Empresas"])

@router.get("/", response_model=List[EmpresaOut])
def listar(db: Session = Depends(get_db)):
    return empresa_service.get_all(db)

@router.get("/{empresa_id}", response_model=EmpresaOut)
def obtener(empresa_id: int, db: Session = Depends(get_db)):
    empresa = empresa_service.get_by_id(db, empresa_id)
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa no encontrada")
    return empresa

@router.post("/", response_model=EmpresaOut, status_code=201)
def crear(data: EmpresaCreate, db: Session = Depends(get_db)):
    return empresa_service.create(db, data)

@router.put("/{empresa_id}", response_model=EmpresaOut)
def actualizar(empresa_id: int, data: EmpresaUpdate, db: Session = Depends(get_db)):
    empresa = empresa_service.update(db, empresa_id, data)
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa no encontrada")
    return empresa

@router.delete("/{empresa_id}", status_code=204)
def eliminar(empresa_id: int, db: Session = Depends(get_db)):
    resultado = empresa_service.delete(db, empresa_id)
    if not resultado:
        raise HTTPException(status_code=404, detail="Empresa no encontrada")