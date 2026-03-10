from pydantic import BaseModel
from typing import Optional, List
from datetime import date

class MPTipoOut(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class EmpresaSimple(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class ColorSimple(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class MPDetalleCreate(BaseModel):
    mp_tipo_id: int
    color_id: int
    kg: float

class MPDetalleOut(BaseModel):
    id: int
    mp_tipo_id: int
    color_id: int
    kg: float
    tipo: MPTipoOut
    color: ColorSimple
    class Config:
        from_attributes = True

class MateriaPrimaCreate(BaseModel):
    fecha: date
    empresa_id: int
    oc: Optional[str] = None
    factura: Optional[str] = None
    detalles: List[MPDetalleCreate] = []

class MateriaPrimaUpdate(BaseModel):
    fecha: Optional[date] = None
    empresa_id: Optional[int] = None
    oc: Optional[str] = None
    factura: Optional[str] = None

class MateriaPrimaOut(BaseModel):
    id: int
    fecha: date
    oc: Optional[str]
    factura: Optional[str]
    empresa: EmpresaSimple
    detalles: List[MPDetalleOut] = []
    kg_total: float = 0
    class Config:
        from_attributes = True