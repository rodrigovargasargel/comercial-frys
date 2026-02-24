from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.user import UsuarioCreate, UsuarioUpdate, UsuarioOut
from app.services import user_service
from typing import List

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.get("/", response_model=List[UsuarioOut])
def listar(db: Session = Depends(get_db)):
    return user_service.get_all(db)

@router.get("/{user_id}", response_model=UsuarioOut)
def obtener(user_id: int, db: Session = Depends(get_db)):
    usuario = user_service.get_by_id(db, user_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@router.post("/", response_model=UsuarioOut, status_code=201)
def crear(data: UsuarioCreate, db: Session = Depends(get_db)):
    existe = user_service.get_by_email(db, data.email)
    if existe:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    return user_service.create(db, data)

@router.put("/{user_id}", response_model=UsuarioOut)
def actualizar(user_id: int, data: UsuarioUpdate, db: Session = Depends(get_db)):
    usuario = user_service.update(db, user_id, data)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@router.delete("/{user_id}", status_code=204)
def eliminar(user_id: int, db: Session = Depends(get_db)):
    resultado = user_service.delete(db, user_id)
    if not resultado:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")