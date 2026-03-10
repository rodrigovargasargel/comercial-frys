from app.db.database import SessionLocal
from app.models.user import Perfil

def seed_perfiles():
    db = SessionLocal()
    perfiles = [
        Perfil(nombre="admin", descripcion="Administrador del sistema"),
        Perfil(nombre="jefe", descripcion="Jefe de producción"),
        Perfil(nombre="operario", descripcion="Operario de planta"),
    ]
    for perfil in perfiles:
        existe = db.query(Perfil).filter(Perfil.nombre == perfil.nombre).first()
        if not existe:
            db.add(perfil)
    db.commit()
    db.close()
    print("✅ Perfiles creados correctamente")

if __name__ == "__main__":
    seed_perfiles()

from app.models.maquina import TipoMaquina

def seed_tipo_maquinas():
    db = SessionLocal()
    tipos = [
        TipoMaquina(nombre="Extrusora"),
        TipoMaquina(nombre="Selladora"),
    ]
    for tipo in tipos:
        existe = db.query(TipoMaquina).filter(TipoMaquina.nombre == tipo.nombre).first()
        if not existe:
            db.add(tipo)
    db.commit()
    db.close()
    print("✅ Tipos de máquina creados correctamente")

if __name__ == "__main__":
    seed_perfiles()
    seed_tipo_maquinas()    

from app.models.producto import TipoProducto, UMedida, Color

def seed_tipo_productos():
    db = SessionLocal()
    tipos = [
        TipoProducto(nombre="Rollos"),
        TipoProducto(nombre="Mangas"),
        TipoProducto(nombre="Laminas"),
        TipoProducto(nombre="Pecheras"),
        TipoProducto(nombre="Bolsas"),
        TipoProducto(nombre="Fundas"),
    ]
    for tipo in tipos:
        existe = db.query(TipoProducto).filter(TipoProducto.nombre == tipo.nombre).first()
        if not existe:
            db.add(tipo)
    db.commit()
    db.close()
    print("✅ Tipos de producto creados")

def seed_u_medidas():
    db = SessionLocal()
    medidas = [
        UMedida(nombre="Kilogramo"),
        UMedida(nombre="Unidad"),
        UMedida(nombre="Metro"),
    ]
    for medida in medidas:
        existe = db.query(UMedida).filter(UMedida.nombre == medida.nombre).first()
        if not existe:
            db.add(medida)
    db.commit()
    db.close()
    print("✅ Unidades de medida creadas")

def seed_colores():
    db = SessionLocal()
    colores = [
        Color(nombre="Transparente"),
        Color(nombre="Blanco"),
        Color(nombre="Amarillo"),
        Color(nombre="Verde"),
        Color(nombre="Rojo"),
        Color(nombre="Azul"),
         Color(nombre="Cafe"),
          Color(nombre="Gris"),
           Color(nombre="Morado"),
    ]
    for color in colores:
        existe = db.query(Color).filter(Color.nombre == color.nombre).first()
        if not existe:
            db.add(color)
    db.commit()
    db.close()
    print("✅ Colores creados")    

if __name__ == "__main__":
    seed_perfiles()
    seed_tipo_maquinas()
    seed_tipo_productos()
    seed_u_medidas() 
    seed_colores()   


from app.models.materia_prima import MateriaPrimaTipo

def seed_mp_tipos():
    db = SessionLocal()
    tipos = ['Baja', 'Lineal', 'Alta', 'Uso Pesado', 'Recli BCO', 'Recl Natural']
    for nombre in tipos:
        if not db.query(MateriaPrimaTipo).filter(MateriaPrimaTipo.nombre == nombre).first():
            db.add(MateriaPrimaTipo(nombre=nombre))
    db.commit()
    db.close()
    print("✅ Tipos MP creados")

if __name__ == "__main__":
    seed_perfiles()
    seed_tipo_maquinas()
    seed_tipo_productos()
    seed_u_medidas()
    seed_colores()
    seed_mp_tipos()    