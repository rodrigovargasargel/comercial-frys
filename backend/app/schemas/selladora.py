from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime

class SimpleOut(BaseModel):
    id: int
    nombre: str
    class Config:
        from_attributes = True

class OPSelladoraCreate(BaseModel):
    fecha: date
    empresa_id: Optional[int] = None
    producto_id: int
    color_id: int
    ancho: float
    espesor: float
    largo: float
    unidades: int
    kilos: float

class OPSelladoraUpdate(BaseModel):
    fecha: Optional[date] = None
    empresa_id: Optional[int] = None
    producto_id: Optional[int] = None
    color_id: Optional[int] = None
    ancho: Optional[float] = None
    espesor: Optional[float] = None
    largo: Optional[float] = None
    unidades: Optional[int] = None
    kilos: Optional[float] = None
    estado: Optional[str] = None

class OPSelladoraOut(BaseModel):
    id: int
    fecha: date
    empresa: Optional[SimpleOut] = None
    producto: Optional[SimpleOut] = None
    color: Optional[SimpleOut] = None
    ancho: float
    espesor: float
    largo: float
    unidades: int
    kilos: float
    estado: str
    unidades_producidas: int = 0
    unidades_faltantes: int = 0
    class Config:
        from_attributes = True

class ProduccionSelladoraCreate(BaseModel):
    op_id: int
    maquina_id: int
    turno: str
    fecha: date

class ProduccionSelladoraOut(BaseModel):
    id: int
    op_id: int
    fecha: date
    turno: str
    maquina: Optional[SimpleOut] = None
    unidades_producidas: int = 0
    class Config:
        from_attributes = True

class DetalleExtrusoraDisponible(BaseModel):
    id: int
    numero_rollo: int
    kg: float
    lote: str
    fecha_produccion: date
    class Config:
        from_attributes = True

class ProduccionSelladoraDetalleCreate(BaseModel):
    produccion_selladora_id: int
    detalle_extrusora_id: int
    q_paquetes: int
    q_unidades_por_paquete: int
    kilos_producidos: Optional[float] = None 

class ProduccionSelladoraDetalleOut(BaseModel):
    id: int
    detalle_extrusora_id: int
    q_paquetes: int
    q_unidades_por_paquete: int
    unidades: int
    kilos: float
    numero_rollo: int = 0
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class ProduccionSelladoraDetalleOut(BaseModel):
    id: int
    detalle_extrusora_id: int
    q_paquetes: int
    q_unidades_por_paquete: int
    unidades: int
    kilos: float
    numero_rollo: int = 0
    lote_extrusora: Optional[str] = None
    fecha_extrusora: Optional[date] = None
    densidad_extrusora: Optional[str] = None
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True   

             