from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class EmpresaSimple(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class OCVentaCreate(BaseModel):
    fecha: date
    empresa_id: Optional[int] = None
    oc: Optional[str] = None
    envio: str = 'Despachar'
    estado: str = 'Pendiente'
    observaciones: Optional[str] = None

class OCVentaOut(BaseModel):
    id: int
    fecha: date
    empresa_id: Optional[int] = None
    empresa: Optional[EmpresaSimple] = None
    oc: Optional[str] = None
    envio: str
    estado: str
    observaciones: Optional[str] = None
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True