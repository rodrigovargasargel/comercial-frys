from sqlalchemy import Column, Integer, String, Boolean, Enum
from app.db.database import Base
import enum

class TipoEmpresaEnum(str, enum.Enum):
    cliente = "cliente"
    proveedor = "proveedor"

class Empresa(Base):
    __tablename__ = "empresas"

    id = Column(Integer, primary_key=True, index=True)
    tipo_empresa = Column(Enum(TipoEmpresaEnum), nullable=False)
    nombre = Column(String(150), nullable=False)
    rut = Column(String(20), nullable=True)
    razon_social = Column(String(200), nullable=True)
    direccion = Column(String(255), nullable=True)
    telefono = Column(String(20), nullable=True)
    activo = Column(Boolean, default=True)