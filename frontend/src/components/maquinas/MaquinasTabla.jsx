import { Button, Badge, Table } from 'react-bootstrap'

export default function MaquinasTabla({ maquinas, onEditar, onEliminar }) {
  return (
    <Table hover responsive className="align-middle">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {maquinas.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center text-muted py-4">
              <i className="fas fa-cogs fa-2x mb-2 d-block"></i>
              No hay máquinas registradas
            </td>
          </tr>
        ) : (
          maquinas.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>
                {m.url_foto
                  ? <img src={m.url_foto} alt={m.nombre} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }}
                      onError={e => e.target.style.display = 'none'} />
                  : <i className="fas fa-image text-muted fa-lg"></i>
                }
              </td>
              <td><i className="fas fa-cog me-2 text-secondary"></i>{m.nombre}</td>
              <td><Badge bg="dark">{m.tipo_maquina.nombre}</Badge></td>
              <td>
                <Button size="sm" variant="outline-dark" className="me-2" onClick={() => onEditar(m)}>
                  <i className="fas fa-edit"></i>
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => onEliminar(m.id)}>
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  )
}