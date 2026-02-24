from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from enum import Enum

class EstadoOPEnum(str, Enum):
    pendiente = "pendiente"
    en_produccion = "en_produccion"
    completada = "completada"
    cancelada = "cancelada"

class TurnoEnum(str, Enum):
    manana = "mañana"
    tarde = "tarde"
    noche = "noche"

class CalibreEnum(str, Enum):
    alta = "alta"
    baja = "baja"

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

class TipoProductoSimple(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class ProductoConTipo(BaseModel):
    id: int
    nombre: str
    tipo_producto: TipoProductoSimple
    class Config:
        from_attributes = True

class EmpresaSimple(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

# --- Orden de Producción ---
class OrdenProduccionCreate(BaseModel):
    maquina_id: int
    kilos_a_producir: float
    lote: str
    calibre: CalibreEnum
    producto_id: Optional[int] = None
    empresa_id: Optional[int] = None
    oc_cliente: Optional[str] = None

class OrdenProduccionUpdate(BaseModel):
    maquina_id: Optional[int] = None
    kilos_a_producir: Optional[float] = None
    lote: Optional[str] = None
    calibre: Optional[CalibreEnum] = None
    estado: Optional[EstadoOPEnum] = None
    producto_id: Optional[int] = None
    empresa_id: Optional[int] = None
    oc_cliente: Optional[str] = None

class OrdenProduccionOut(BaseModel):
    id: int
    lote: str
    kilos_a_producir: float
    calibre: CalibreEnum
    estado: EstadoOPEnum
    oc_cliente: Optional[str]
    maquina: MaquinaSimple
    producto: Optional[ProductoConTipo]
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

class ProduccionExtrusoraOut(BaseModel):
    id: int
    op_id: int
    fecha: date
    turno: TurnoEnum
    kg_producidos: float = 0
    kg_faltantes: float = 0

    class Config:
        from_attributes = True

# --- Detalle ---
class DetalleCreate(BaseModel):
    produccion_extrusora_id: int
    producto_id: int
    kg: float
    numero_rollo: int
    ancho: int
    espesor: int

class DetalleOut(BaseModel):
    id: int
    producto: ProductoSimple
    kg: float
    numero_rollo: int
    ancho: int
    espesor: int

    class Config:
        from_attributes = True