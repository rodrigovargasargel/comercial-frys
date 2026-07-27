from sqlalchemy import Column, Integer, String, Date, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class OCVenta(Base):
    __tablename__ = "oc_ventas"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, nullable=False)
    empresa_id = Column(Integer, ForeignKey("empresas.id"), nullable=True)
    oc = Column(String(100), nullable=True)
    envio = Column(String(50), nullable=False, default='Despachar')
    estado = Column(String(50), nullable=False, default='Pendiente')
    observaciones = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    empresa = relationship("Empresa")