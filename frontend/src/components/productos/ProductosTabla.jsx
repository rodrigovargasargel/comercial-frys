import { Button, Badge, Table } from 'react-bootstrap'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function ProductosTabla({ productos, onEditar, onEliminar }) {

  const exportarExcel = () => {
    const datos = productos.map(p => ({
      ID: p.id,
      Nombre: p.nombre,
      'Tipo Máquina': p.tipo_maquina.nombre,
      'Tipo Producto': p.tipo_producto.nombre,
      'Unidad Medida': p.u_medida.nombre,
      Estado: p.activo ? 'Activo' : 'Inactivo'
    }))
    const ws = XLSX.utils.json_to_sheet(datos)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Productos')
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'productos.xlsx')
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
            <th>ID</th>
            <th>Codigo</th>
             <th>Nombre</th>
            <th>Tipo Máquina</th>
            <th>Tipo Producto</th>
            <th>U. Medida</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-muted py-4">
                <i className="fas fa-box-open fa-2x mb-2 d-block"></i>
                No hay productos registrados
              </td>
            </tr>
          ) : (
            productos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.codigo}</td>
                <td><i className="fas fa-box me-2 text-secondary"></i>{p.nombre}</td>
                <td>{p.tipo_maquina.nombre}</td>
                <td>{p.tipo_producto.nombre}</td>
                <td>{p.u_medida.nombre}</td>
                <td>
                  <Badge bg={p.activo ? 'success' : 'secondary'}>
                    {p.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </td>
                <td>
                  <Button size="sm" variant="outline-dark" className="me-2" onClick={() => onEditar(p)}>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => onEliminar(p.id)}>
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