from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class PerfilOut(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True

class UsuarioBase(BaseModel):
    nombre: str
    email: EmailStr
    perfil_id: int

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    email: Optional[EmailStr] = None
    perfil_id: Optional[int] = None
    activo: Optional[bool] = None

class UsuarioOut(UsuarioBase):
    id: int
    activo: bool
    created_at: datetime
    perfil: PerfilOut

    class Config:
        from_attributes = True