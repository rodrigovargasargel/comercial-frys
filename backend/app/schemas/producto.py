from pydantic import BaseModel
from typing import Optional

class TipoProductoOut(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class UMedidaOut(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class TipoMaquinaOut(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class ProductoBase(BaseModel):
    nombre: str
    codigo: str
    tipo_maquina_id: int
    tipo_producto_id: int
    u_medida_id: int
    activo: bool = True

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    codigo: Optional[str] = None
    tipo_maquina_id: Optional[int] = None
    tipo_producto_id: Optional[int] = None
    u_medida_id: Optional[int] = None
    activo: Optional[bool] = None

class ProductoOut(ProductoBase):
    id: int
    tipo_maquina: TipoMaquinaOut
    tipo_producto: TipoProductoOut
    u_medida: UMedidaOut
    class Config:
        from_attributes = True