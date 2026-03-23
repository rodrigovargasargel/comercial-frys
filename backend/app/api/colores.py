from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from app.db.database import get_db
from app.models.produccion import Color

router = APIRouter(prefix="/colores", tags=["Colores"])

class ColorCreate(BaseModel):
    nombre: str

class ColorOut(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

@router.get("/", response_model=List[ColorOut])
def listar(db: Session = Depends(get_db)):
    return db.query(Color).order_by(Color.nombre).all()

@router.post("/", response_model=ColorOut, status_code=201)
def crear(data: ColorCreate, db: Session = Depends(get_db)):
    existe = db.query(Color).filter(Color.nombre == data.nombre).first()
    if existe:
        raise HTTPException(status_code=400, detail="El color ya existe")
    color = Color(nombre=data.nombre)
    db.add(color)
    db.commit()
    db.refresh(color)
    return color

@router.put("/{color_id}", response_model=ColorOut)
def actualizar(color_id: int, data: ColorCreate, db: Session = Depends(get_db)):
    color = db.query(Color).filter(Color.id == color_id).first()
    if not color:
        raise HTTPException(status_code=404, detail="No encontrado")
    color.nombre = data.nombre
    db.commit()
    db.refresh(color)
    return color

@router.delete("/{color_id}", status_code=204)
def eliminar(color_id: int, db: Session = Depends(get_db)):
    color = db.query(Color).filter(Color.id == color_id).first()
    if not color:
        raise HTTPException(status_code=404, detail="No encontrado")
    db.delete(color)
    db.commit()
    