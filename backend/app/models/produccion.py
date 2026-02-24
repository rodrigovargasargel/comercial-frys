from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum

class EstadoOPEnum(str, enum.Enum):
    pendiente = "pendiente"
    en_produccion = "en_produccion"
    completada = "completada"
    cancelada = "cancelada"

class TurnoEnum(str, enum.Enum):
    manana = "mañana"
    tarde = "tarde"
    noche = "noche"

class CalibreEnum(str, enum.Enum):
    alta = "alta"
    baja = "baja"

class OrdenProduccion(Base):
    __tablename__ = "ordenes_produccion"

    id = Column(Integer, primary_key=True, index=True)
    maquina_id = Column(Integer, ForeignKey("maquinas.id"), nullable=False)
    kilos_a_producir = Column(Float, nullable=False)
    lote = Column(String(100), nullable=False)
    calibre = Column(Enum(CalibreEnum), nullable=False)
    estado = Column(Enum(EstadoOPEnum), default=EstadoOPEnum.pendiente, nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=True)
    empresa_id = Column(Integer, ForeignKey("empresas.id"), nullable=True)
    oc_cliente = Column(String(100), nullable=True)

    maquina = relationship("Maquina")
    producto = relationship("Producto")
    empresa = relationship("Empresa")
    producciones = relationship("ProduccionExtrusora", back_populates="op")


class ProduccionExtrusora(Base):
    __tablename__ = "produccion_extrusora"

    id = Column(Integer, primary_key=True, index=True)
    op_id = Column(Integer, ForeignKey("ordenes_produccion.id"), nullable=False)
    fecha = Column(Date, nullable=False)
    turno = Column(Enum(TurnoEnum), nullable=False)

    op = relationship("OrdenProduccion", back_populates="producciones")
    detalles = relationship("DetalleProduccionExtrusora", back_populates="produccion")


class DetalleProduccionExtrusora(Base):
    __tablename__ = "detalle_produccion_extrusora"

    id = Column(Integer, primary_key=True, index=True)
    produccion_extrusora_id = Column(Integer, ForeignKey("produccion_extrusora.id"), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=False)
    kg = Column(Float, nullable=False)
    numero_rollo = Column(Integer, nullable=False)
    ancho = Column(Integer, nullable=False)
    espesor = Column(Integer, nullable=False)

    produccion = relationship("ProduccionExtrusora", back_populates="detalles")
    producto = relationship("Producto")