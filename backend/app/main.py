import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import users, maquinas, productos, empresas, produccion, auth, materia_prima
from app.core.config import settings

app = FastAPI(title="Comercial Frys - Sistema de Producción", version="1.0.0")
origins = settings.ALLOWED_ORIGINS.split(",")

#origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")  #estas son variables de entorno porque en prodiccion no funciona el localhost

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(maquinas.router)
app.include_router(productos.router)
app.include_router(empresas.router)
app.include_router(produccion.router)
app.include_router(auth.router)
app.include_router(materia_prima.router)

@app.get("/")
def root():
    return {"message": "Comercial Frys API funcionando 🏭"}