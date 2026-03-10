from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class MateriaPrimaTipo(Base):
    __tablename__ = "materia_prima_tipo"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True, nullable=False)
    detalles = relationship("MateriaPrimaDetalle", back_populates="tipo")

class MateriaPrima(Base):
    __tablename__ = "materia_prima"
    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, nullable=False)
    empresa_id = Column(Integer, ForeignKey("empresas.id"), nullable=False)
    oc = Column(String(100), nullable=True)
    factura = Column(String(100), nullable=True)
    empresa = relationship("Empresa")
    detalles = relationship("MateriaPrimaDetalle", back_populates="mp", cascade="all, delete-orphan")

class MateriaPrimaDetalle(Base):
    __tablename__ = "materia_prima_detalle"
    id = Column(Integer, primary_key=True, index=True)
    mp_id = Column(Integer, ForeignKey("materia_prima.id"), nullable=False)
    mp_tipo_id = Column(Integer, ForeignKey("materia_prima_tipo.id"), nullable=False)
    color_id = Column(Integer, ForeignKey("colores.id"), nullable=False)
    kg = Column(Float, nullable=False)
    mp = relationship("MateriaPrima", back_populates="detalles")
    tipo = relationship("MateriaPrimaTipo", back_populates="detalles")
    color = relationship("Color")