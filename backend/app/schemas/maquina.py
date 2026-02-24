from pydantic import BaseModel
from typing import Optional

class TipoMaquinaOut(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True

class MaquinaBase(BaseModel):
    nombre: str
    tipo_maquina_id: int
    url_foto: Optional[str] = None

class MaquinaCreate(MaquinaBase):
    pass

class MaquinaUpdate(BaseModel):
    nombre: Optional[str] = None
    tipo_maquina_id: Optional[int] = None
    url_foto: Optional[str] = None

class MaquinaOut(MaquinaBase):
    id: int
    tipo_maquina: TipoMaquinaOut

    class Config:
        from_attributes = True