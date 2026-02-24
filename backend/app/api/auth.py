from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.auth import LoginRequest, TokenResponse
from app.services.user_service import get_by_email, verify_password
from app.core.security import crear_token
from app.core.dependencies import get_current_user
from app.models.user import Usuario

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    usuario = get_by_email(db, data.email)
    if not usuario or not verify_password(data.password, usuario.password):
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")
    if not usuario.activo:
        raise HTTPException(status_code=403, detail="Usuario inactivo")

    token = crear_token({"sub": str(usuario.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "usuario": {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "email": usuario.email,
            "perfil_id": usuario.perfil_id,
            "perfil": usuario.perfil.nombre
        }
    }

@router.get("/me")
def me(current_user: Usuario = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "nombre": current_user.nombre,
        "email": current_user.email,
        "perfil_id": current_user.perfil_id,
        "perfil": current_user.perfil.nombre
    }