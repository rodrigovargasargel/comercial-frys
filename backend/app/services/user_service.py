import bcrypt
from sqlalchemy.orm import Session
from app.models.user import Usuario
from app.schemas.user import UsuarioCreate, UsuarioUpdate

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode('utf-8'), hashed.encode('utf-8'))

def get_all(db: Session):
    return db.query(Usuario).all()

def get_by_id(db: Session, user_id: int):
    return db.query(Usuario).filter(Usuario.id == user_id).first()

def get_by_email(db: Session, email: str):
    return db.query(Usuario).filter(Usuario.email == email).first()

def create(db: Session, data: UsuarioCreate):
    usuario = Usuario(
        nombre=data.nombre,
        email=data.email,
        password=hash_password(data.password),
        perfil_id=data.perfil_id
    )
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario

def update(db: Session, user_id: int, data: UsuarioUpdate):
    usuario = get_by_id(db, user_id)
    if not usuario:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(usuario, field, value)
    db.commit()
    db.refresh(usuario)
    return usuario

def delete(db: Session, user_id: int):
    usuario = get_by_id(db, user_id)
    if not usuario:
        return None
    db.delete(usuario)
    db.commit()
    return True