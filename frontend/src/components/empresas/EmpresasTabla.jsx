import { Button, Badge, Table } from 'react-bootstrap'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function EmpresasTabla({ empresas, onEditar, onEliminar }) {

  const exportarExcel = () => {
    const datos = empresas.map(e => ({
      ID: e.id,
      Tipo: e.tipo_empresa,
      Nombre: e.nombre,
      RUT: e.rut || '',
      'Razón Social': e.razon_social || '',
      Dirección: e.direccion || '',
      Teléfono: e.telefono || '',
      Estado: e.activo ? 'Activo' : 'Inactivo'
    }))
    const ws = XLSX.utils.json_to_sheet(datos)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Empresas')
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'empresas.xlsx')
  }

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <Button variant="success" size="sm" onClick={exportarExcel}>
          <i className="fas fa-file-excel me-2"></i>Exportar Excel
        </Button>
      </div>
      <Table hover responsive className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Tipo</th>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empresas.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-muted py-4">
                <i className="fas fa-building fa-2x mb-2 d-block"></i>
                No hay empresas registradas
              </td>
            </tr>
          ) : (
            empresas.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>
                  <Badge bg={e.tipo_empresa === 'cliente' ? 'primary' : 'warning'}>
                    {e.tipo_empresa}
                  </Badge>
                </td>
                <td><i className="fas fa-building me-2 text-secondary"></i>{e.nombre}</td>
                <td>{e.rut || <span className="text-muted">—</span>}</td>
                <td>{e.telefono || <span className="text-muted">—</span>}</td>
                <td>
                  <Badge bg={e.activo ? 'success' : 'secondary'}>
                    {e.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </td>
                <td>
                  <Button size="sm" variant="outline-dark" className="me-2" onClick={() => onEditar(e)}>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => onEliminar(e.id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  )
}