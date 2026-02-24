from pydantic import BaseModel
from typing import Optional
from enum import Enum

class TipoEmpresaEnum(str, Enum):
    cliente = "cliente"
    proveedor = "proveedor"

class EmpresaBase(BaseModel):
    tipo_empresa: TipoEmpresaEnum
    nombre: str
    rut: Optional[str] = None
    razon_social: Optional[str] = None
    direccion: Optional[str] = None
    telefono: Optional[str] = None
    activo: bool = True

class EmpresaCreate(EmpresaBase):
    pass

class EmpresaUpdate(BaseModel):
    tipo_empresa: Optional[TipoEmpresaEnum] = None
    nombre: Optional[str] = None
    rut: Optional[str] = None
    razon_social: Optional[str] = None
    direccion: Optional[str] = None
    telefono: Optional[str] = None
    activo: Optional[bool] = None

class EmpresaOut(EmpresaBase):
    id: int

    class Config:
        from_attributes = True