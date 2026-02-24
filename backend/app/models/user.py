from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class Perfil(Base):
    __tablename__ = "perfiles"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), unique=True, nullable=False)  # admin, jefe, operario
    descripcion = Column(String(200), nullable=True)

    usuarios = relationship("Usuario", back_populates="perfil")


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    activo = Column(Boolean, default=True)
    perfil_id = Column(Integer, ForeignKey("perfiles.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    perfil = relationship("Perfil", back_populates="usuarios")