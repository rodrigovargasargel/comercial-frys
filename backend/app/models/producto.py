from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class TipoProducto(Base):
    __tablename__ = "tipo_productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True, nullable=False)

    productos = relationship("Producto", back_populates="tipo_producto")


class UMedida(Base):
    __tablename__ = "u_medidas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), unique=True, nullable=False)

    productos = relationship("Producto", back_populates="u_medida")


class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(150), nullable=False)
    nombre = Column(String(150), nullable=False)
    activo = Column(Boolean, default=True)
    tipo_maquina_id = Column(Integer, ForeignKey("tipo_maquinas.id"), nullable=False)
    tipo_producto_id = Column(Integer, ForeignKey("tipo_productos.id"), nullable=False)
    u_medida_id = Column(Integer, ForeignKey("u_medidas.id"), nullable=False)

    tipo_maquina = relationship("TipoMaquina")
    tipo_producto = relationship("TipoProducto", back_populates="productos")
    u_medida = relationship("UMedida", back_populates="productos")