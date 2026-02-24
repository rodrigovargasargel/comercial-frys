from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import users, maquinas, productos, empresas, produccion, auth

app = FastAPI(title="Comercial Frys - Sistema de Producción", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://54.145.58.161:5173"],
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

@app.get("/")
def root():
    return {"message": "Comercial Frys API funcionando 🏭"}