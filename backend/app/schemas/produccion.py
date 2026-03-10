from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from enum import Enum

class EstadoOPEnum(str, Enum):
    pendiente = "pendiente"
    en_produccion = "en_produccion"
    completada = "completada"
    cancelada = "cancelada"

class DensidadEnum(str, Enum):
    alta = "alta"
    baja = "baja"

class TurnoEnum(str, Enum):
    dia = "dia"
    noche = "noche"

class MaquinaSimple(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class ProductoSimple(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class ColorSimple(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class EmpresaSimple(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class UsuarioSimple(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class TipoProductoSimple(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

# --- Orden de Producción ---
class OrdenProduccionCreate(BaseModel):
    fecha: date
    producto_id: int
    densidad: DensidadEnum
    color_id: int
    ancho: int
    espesor: int
    kilos: float
    empresa_id: Optional[int] = None
    oc_cliente: Optional[str] = None

class OrdenProduccionUpdate(BaseModel):
    fecha: Optional[date] = None
    producto_id: Optional[int] = None
    densidad: Optional[DensidadEnum] = None
    color_id: Optional[int] = None
    ancho: Optional[int] = None
    espesor: Optional[int] = None
    kilos: Optional[float] = None
    estado: Optional[EstadoOPEnum] = None
    empresa_id: Optional[int] = None
    oc_cliente: Optional[str] = None

class OrdenProduccionOut(BaseModel):
    id: int
    fecha: date
    densidad: DensidadEnum
    ancho: int
    espesor: int
    kilos: float
    estado: EstadoOPEnum
    oc_cliente: Optional[str]
    producto: Optional[ProductoSimple]
    color: Optional[ColorSimple]
    empresa: Optional[EmpresaSimple]
    kg_producidos_total: float = 0
    kg_faltantes: float = 0

    class Config:
        from_attributes = True

# --- Produccion Extrusora ---
class ProduccionExtrusoraCreate(BaseModel):
    op_id: int
    fecha: date
    turno: TurnoEnum
    maquina_id: int
    lote: str
    usuario_id: int

class ProduccionExtrusoraOut(BaseModel):
    id: int
    op_id: int
    fecha: date
    turno: TurnoEnum
    lote: str
    maquina: MaquinaSimple
    usuario: UsuarioSimple
    kg_producidos: float = 0
    kg_faltantes: float = 0

    class Config:
        from_attributes = True

# --- Detalle ---
class DetalleCreate(BaseModel):
    produccion_extrusora_id: int
    numero_rollo: int
    kg: float

class DetalleOut(BaseModel):
    id: int
    numero_rollo: int
    kg: float

    class Config:
        from_attributes = True

class ProductoSimpleOut(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True