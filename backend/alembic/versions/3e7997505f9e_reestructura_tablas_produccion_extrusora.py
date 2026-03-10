"""reestructura tablas produccion extrusora

Revision ID: 3e7997505f9e
Revises: 6239f5bfc336
Create Date: 2026-03-03 00:00:14.986689

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '3e7997505f9e'
down_revision: Union[str, None] = '6239f5bfc336'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.add_column('ordenes_produccion', sa.Column('fecha', sa.Date(), nullable=True))
    op.add_column('ordenes_produccion', sa.Column('densidad', sa.Enum('alta', 'baja'), nullable=True))
    op.add_column('ordenes_produccion', sa.Column('color_id', sa.Integer(), nullable=True))
    op.add_column('ordenes_produccion', sa.Column('ancho', sa.Integer(), nullable=True))
    op.add_column('ordenes_produccion', sa.Column('espesor', sa.Integer(), nullable=True))
    op.add_column('ordenes_produccion', sa.Column('kilos', sa.Float(), nullable=True))

    op.execute("UPDATE ordenes_produccion SET fecha = '2025-01-01', densidad = 'alta', color_id = 1, ancho = 0, espesor = 0, kilos = 0 WHERE fecha IS NULL")

    op.alter_column('ordenes_produccion', 'fecha',
        existing_type=sa.Date(), nullable=False)
    op.alter_column('ordenes_produccion', 'densidad',
        existing_type=sa.Enum('alta', 'baja'), nullable=False)
    op.alter_column('ordenes_produccion', 'kilos',
        existing_type=sa.Float(), nullable=False)

    op.create_foreign_key(None, 'ordenes_produccion', 'colores', ['color_id'], ['id'])

    op.drop_column('ordenes_produccion', 'kilos_a_producir')
    op.drop_column('ordenes_produccion', 'lote')
    op.drop_column('ordenes_produccion', 'calibre')
    op.drop_column('ordenes_produccion', 'tipo_producto_id')

    op.add_column('produccion_extrusora', sa.Column('maquina_id', sa.Integer(), nullable=True))
    op.add_column('produccion_extrusora', sa.Column('lote', sa.String(100), nullable=True))
    op.add_column('produccion_extrusora', sa.Column('usuario_id', sa.Integer(), nullable=True))

    op.execute("UPDATE produccion_extrusora SET maquina_id = 1, lote = 'L-000', usuario_id = 1 WHERE maquina_id IS NULL")

    op.alter_column('produccion_extrusora', 'maquina_id',
        existing_type=sa.Integer(), nullable=False)
    op.alter_column('produccion_extrusora', 'lote',
        existing_type=sa.String(100), nullable=False)
    op.alter_column('produccion_extrusora', 'usuario_id',
        existing_type=sa.Integer(), nullable=False)

    op.create_foreign_key(None, 'produccion_extrusora', 'maquinas', ['maquina_id'], ['id'])
    op.create_foreign_key(None, 'produccion_extrusora', 'usuarios', ['usuario_id'], ['id'])

    op.alter_column('produccion_extrusora', 'turno',
        existing_type=sa.Enum('mañana', 'tarde', 'noche'),
        type_=sa.Enum('dia', 'noche'),
        nullable=False)

    op.drop_column('detalle_produccion_extrusora', 'producto_id')
    op.drop_column('detalle_produccion_extrusora', 'ancho')
    op.drop_column('detalle_produccion_extrusora', 'espesor')
    # colores ya existe, omitir creación

    # agregar columnas nuevas a ordenes_produccion como nullable primero
    op.add_column('ordenes_produccion', sa.Column('fecha', sa.Date(), nullable=True))
    op.add_column('ordenes_produccion', sa.Column('densidad', sa.Enum('alta', 'baja'), nullable=True))
    op.add_column('ordenes_produccion', sa.Column('color_id', sa.Integer(), nullable=True))
    op.add_column('ordenes_produccion', sa.Column('ancho', sa.Integer(), nullable=True))
    op.add_column('ordenes_produccion', sa.Column('espesor', sa.Integer(), nullable=True))
    op.add_column('ordenes_produccion', sa.Column('kilos', sa.Float(), nullable=True))

    # rellenar datos existentes con valores por defecto
    op.execute("UPDATE ordenes_produccion SET fecha = '2025-01-01', densidad = 'alta', color_id = 1, ancho = 0, espesor = 0, kilos = 0 WHERE fecha IS NULL")

    # ahora hacerlas not null
    op.alter_column('ordenes_produccion', 'fecha', nullable=False)
    op.alter_column('ordenes_produccion', 'densidad', nullable=False)
    op.alter_column('ordenes_produccion', 'kilos', nullable=False)

    # agregar FK de color
    op.create_foreign_key(None, 'ordenes_produccion', 'colores', ['color_id'], ['id'])

    # eliminar columnas viejas de ordenes_produccion
    op.drop_column('ordenes_produccion', 'kilos_a_producir')
    op.drop_column('ordenes_produccion', 'lote')
    op.drop_column('ordenes_produccion', 'calibre')
    op.drop_column('ordenes_produccion', 'tipo_producto_id')

    # agregar columnas nuevas a produccion_extrusora
    op.add_column('produccion_extrusora', sa.Column('maquina_id', sa.Integer(), nullable=True))
    op.add_column('produccion_extrusora', sa.Column('lote', sa.String(100), nullable=True))
    op.add_column('produccion_extrusora', sa.Column('usuario_id', sa.Integer(), nullable=True))

    op.execute("UPDATE produccion_extrusora SET maquina_id = 1, lote = 'L-000', usuario_id = 1 WHERE maquina_id IS NULL")

    op.alter_column('produccion_extrusora', 'maquina_id', nullable=False)
    op.alter_column('produccion_extrusora', 'lote', nullable=False)
    op.alter_column('produccion_extrusora', 'usuario_id', nullable=False)

    op.create_foreign_key(None, 'produccion_extrusora', 'maquinas', ['maquina_id'], ['id'])
    op.create_foreign_key(None, 'produccion_extrusora', 'usuarios', ['usuario_id'], ['id'])

    # actualizar enum turno
    op.alter_column('produccion_extrusora', 'turno',
        existing_type=sa.Enum('mañana', 'tarde', 'noche'),
        type_=sa.Enum('dia', 'noche'),
        nullable=False)

    # detalle: eliminar columnas viejas
    op.drop_column('detalle_produccion_extrusora', 'producto_id')
    op.drop_column('detalle_produccion_extrusora', 'ancho')
    op.drop_column('detalle_produccion_extrusora', 'espesor')

    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('colores',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('nombre')
    )
    op.create_index(op.f('ix_colores_id'), 'colores', ['id'], unique=False)
    op.drop_constraint('detalle_produccion_extrusora_ibfk_2', 'detalle_produccion_extrusora', type_='foreignkey')
    op.drop_column('detalle_produccion_extrusora', 'espesor')
    op.drop_column('detalle_produccion_extrusora', 'ancho')
    op.drop_column('detalle_produccion_extrusora', 'producto_id')
    op.add_column('ordenes_produccion', sa.Column('fecha', sa.Date(), nullable=True))
    op.execute("UPDATE ordenes_produccion SET fecha = '2025-01-01' WHERE fecha IS NULL")
    op.alter_column('ordenes_produccion', 'fecha', nullable=False)
    op.add_column('ordenes_produccion', sa.Column('producto_id', sa.Integer(), nullable=False))
    op.add_column('ordenes_produccion', sa.Column('densidad', sa.Enum('alta', 'baja', name='calibreenum'), nullable=False))
    op.add_column('ordenes_produccion', sa.Column('color_id', sa.Integer(), nullable=False))
    op.add_column('ordenes_produccion', sa.Column('ancho', sa.Integer(), nullable=False))
    op.add_column('ordenes_produccion', sa.Column('espesor', sa.Integer(), nullable=False))
    op.add_column('ordenes_produccion', sa.Column('kilos', sa.Float(), nullable=False))
    op.create_foreign_key(None, 'ordenes_produccion', 'productos', ['producto_id'], ['id'])
    op.create_foreign_key(None, 'ordenes_produccion', 'colores', ['color_id'], ['id'])
    op.add_column('produccion_extrusora', sa.Column('maquina_id', sa.Integer(), nullable=False))
    op.add_column('produccion_extrusora', sa.Column('lote', sa.String(length=100), nullable=False))
    op.add_column('produccion_extrusora', sa.Column('usuario_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'produccion_extrusora', 'maquinas', ['maquina_id'], ['id'])
    op.create_foreign_key(None, 'produccion_extrusora', 'usuarios', ['usuario_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'produccion_extrusora', type_='foreignkey')
    op.drop_constraint(None, 'produccion_extrusora', type_='foreignkey')
    op.drop_column('produccion_extrusora', 'usuario_id')
    op.drop_column('produccion_extrusora', 'lote')
    op.drop_column('produccion_extrusora', 'maquina_id')
    op.drop_constraint(None, 'ordenes_produccion', type_='foreignkey')
    op.drop_constraint(None, 'ordenes_produccion', type_='foreignkey')
    op.drop_column('ordenes_produccion', 'kilos')
    op.drop_column('ordenes_produccion', 'espesor')
    op.drop_column('ordenes_produccion', 'ancho')
    op.drop_column('ordenes_produccion', 'color_id')
    op.drop_column('ordenes_produccion', 'densidad')
    op.drop_column('ordenes_produccion', 'producto_id')
    op.drop_column('ordenes_produccion', 'fecha')
    op.add_column('detalle_produccion_extrusora', sa.Column('producto_id', mysql.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('detalle_produccion_extrusora', sa.Column('ancho', mysql.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('detalle_produccion_extrusora', sa.Column('espesor', mysql.INTEGER(), autoincrement=False, nullable=False))
    op.create_foreign_key('detalle_produccion_extrusora_ibfk_2', 'detalle_produccion_extrusora', 'productos', ['producto_id'], ['id'])
    op.drop_index(op.f('ix_colores_id'), table_name='colores')
    op.drop_table('colores')
    # ### end Alembic commands ###
