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
    
    dia = "dia"
    noche = "noche"

class CalibreEnum(str, enum.Enum):
    alta = "alta"
    baja = "baja"

class Color(Base):
    __tablename__ = "colores"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True, nullable=False)

    ordenes = relationship("OrdenProduccion", back_populates="color")    

class OrdenProduccion(Base):
    __tablename__ = "ordenes_produccion"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=False)
    densidad = Column(Enum(CalibreEnum), nullable=False)
    color_id = Column(Integer, ForeignKey("colores.id"), nullable=False)
    ancho = Column(Integer, nullable=False)
    espesor = Column(Integer, nullable=False)
    kilos = Column(Float, nullable=False)
    estado = Column(Enum(EstadoOPEnum), default=EstadoOPEnum.pendiente, nullable=False)
    empresa_id = Column(Integer, ForeignKey("empresas.id"), nullable=True)
    oc_cliente = Column(String(100), nullable=True)

    
    color = relationship("Color", back_populates="ordenes")
      
    empresa = relationship("Empresa")
    producciones = relationship("ProduccionExtrusora", back_populates="op")    
    producto = relationship("Producto")


class ProduccionExtrusora(Base):
    __tablename__ = "produccion_extrusora"

    id = Column(Integer, primary_key=True, index=True)
    op_id = Column(Integer, ForeignKey("ordenes_produccion.id"), nullable=False)
    fecha = Column(Date, nullable=False)
    turno = Column(Enum(TurnoEnum), nullable=False)
    maquina_id = Column(Integer, ForeignKey("maquinas.id"), nullable=False)
    lote = Column(String(100), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)

    op = relationship("OrdenProduccion", back_populates="producciones")
    maquina = relationship("Maquina")
    usuario = relationship("Usuario")
    detalles = relationship("DetalleProduccionExtrusora", back_populates="produccion")

class DetalleProduccionExtrusora(Base):
    __tablename__ = "detalle_produccion_extrusora"

    id = Column(Integer, primary_key=True, index=True)
    produccion_extrusora_id = Column(Integer, ForeignKey("produccion_extrusora.id"), nullable=False)
    numero_rollo = Column(Integer, nullable=False)
    kg = Column(Float, nullable=False)

    produccion = relationship("ProduccionExtrusora", back_populates="detalles")   