import { Button, Badge, Table } from 'react-bootstrap'

export default function UsuariosTabla({ usuarios, onEditar, onEliminar }) {
  return (
    <Table hover responsive className="align-middle">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Perfil</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center text-muted py-4">
              <i className="fas fa-users fa-2x mb-2 d-block"></i>
              No hay usuarios registrados
            </td>
          </tr>
        ) : (
          usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                <i className="fas fa-user-circle me-2 text-secondary"></i>
                {u.nombre}
              </td>
              <td>{u.email}</td>
              <td>
                <Badge bg={u.perfil.nombre === 'admin' ? 'danger' : u.perfil.nombre === 'jefe' ? 'warning' : 'secondary'}>
                  {u.perfil.nombre}
                </Badge>
              </td>
              <td>
                <Badge bg={u.activo ? 'success' : 'secondary'}>
                  {u.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </td>
              <td>
                <Button size="sm" variant="outline-dark" className="me-2" onClick={() => onEditar(u)}>
                  <i className="fas fa-edit"></i>
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => onEliminar(u.id)}>
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