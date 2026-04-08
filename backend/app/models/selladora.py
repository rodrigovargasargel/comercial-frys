from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey, func, Boolean
from sqlalchemy.orm import relationship
from app.db.database import Base

class OPSelladora(Base):
    __tablename__ = "op_selladora"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, nullable=False)
    empresa_id = Column(Integer, ForeignKey("empresas.id"), nullable=True)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=False)
    color_id = Column(Integer, ForeignKey("colores.id"), nullable=False)
    ancho = Column(Float, nullable=False)
    espesor = Column(Float, nullable=False)
    largo = Column(Float, nullable=False)
    unidades = Column(Integer, nullable=False)
    kilos = Column(Float, nullable=False)
    estado = Column(String(20), default="pendiente", nullable=False)

    empresa = relationship("Empresa")
    producto = relationship("Producto")
    color = relationship("Color")
    producciones = relationship("ProduccionSelladora", back_populates="op", cascade="all, delete-orphan")


class ProduccionSelladora(Base):
    __tablename__ = "produccion_selladora"

    id = Column(Integer, primary_key=True, index=True)
    op_id = Column(Integer, ForeignKey("op_selladora.id"), nullable=False)
    maquina_id = Column(Integer, ForeignKey("maquinas.id"), nullable=False)
    turno = Column(String(10), nullable=False)
    fecha = Column(Date, nullable=False)

    op = relationship("OPSelladora", back_populates="producciones")
    maquina = relationship("Maquina")
    detalles = relationship("ProduccionSelladoraDetalle", back_populates="produccion", cascade="all, delete-orphan")


class ProduccionSelladoraDetalle(Base):
    __tablename__ = "produccion_selladora_detalle"

    id = Column(Integer, primary_key=True, index=True)
    produccion_selladora_id = Column(Integer, ForeignKey("produccion_selladora.id"), nullable=False)
    detalle_extrusora_id = Column(Integer, ForeignKey("detalle_produccion_extrusora.id"), nullable=False, unique=True)
    q_paquetes = Column(Integer, nullable=False)
    q_unidades_por_paquete = Column(Integer, nullable=False)
    unidades = Column(Integer, nullable=False)
    kilos = Column(Float, nullable=False)
    imprimir_kg = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    produccion = relationship("ProduccionSelladora", back_populates="detalles")
    detalle_extrusora = relationship("DetalleProduccionExtrusora")