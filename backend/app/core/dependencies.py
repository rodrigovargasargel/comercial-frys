from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import verificar_token
from app.models.user import Usuario

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Usuario:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No autenticado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = verificar_token(token)
    if not payload:
        raise credentials_exception
    user_id = payload.get("sub")
    if not user_id:
        raise credentials_exception
    usuario = db.query(Usuario).filter(Usuario.id == int(user_id)).first()
    if not usuario or not usuario.activo:
        raise credentials_exception
    return usuario

def require_perfiles(*perfil_ids: int):
    def dependency(current_user: Usuario = Depends(get_current_user)):
        if current_user.perfil_id not in perfil_ids:
            raise HTTPException(status_code=403, detail="No tienes permisos para esta acción")
        return current_user
    return dependency