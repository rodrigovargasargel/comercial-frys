from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class TipoMaquina(Base):
    __tablename__ = "tipo_maquinas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True, nullable=False)

    maquinas = relationship("Maquina", back_populates="tipo_maquina")


class Maquina(Base):
    __tablename__ = "maquinas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    url_foto = Column(String(255), nullable=True)
    tipo_maquina_id = Column(Integer, ForeignKey("tipo_maquinas.id"), nullable=False)

    tipo_maquina = relationship("TipoMaquina", back_populates="maquinas")