import { useState, useEffect } from 'react'
import { Container, Button, Alert, Spinner, Badge, Table } from 'react-bootstrap'
import OCVentasModal from './OCVentasModal'
import { getOCVentas, createOCVenta, updateOCVenta, deleteOCVenta, exportarExcel } from '../../api/oc_ventas'
import { getEmpresas } from '../../api/selects'

import { useNavigate } from 'react-router-dom'


 

const formatFecha = (fecha) => {
  if (!fecha) return ''
  const [y, m, d] = fecha.split('-')
  return `${d}-${m}-${y}`
}

const estadoBadge = (estado) => {
  if (estado === 'Pendiente') return <Badge bg="warning" text="dark">Pendiente</Badge>
  if (estado === 'Con Saldo a despachar') return <Badge bg="info" text="dark">Con Saldo</Badge>
  if (estado === 'Despachado') return <Badge bg="success">Despachado</Badge>
  return <Badge bg="secondary">{estado}</Badge>
}

export default function OCVentasPage() {
  const [registros, setRegistros] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null)
  const [hoveredRow, setHoveredRow] = useState(null)

   const navigate = useNavigate()

  const thStyle = { fontSize: 'clamp(16px,1.8vw,22px)', padding: '10px 14px', whiteSpace: 'nowrap' }
  const tdStyle = { fontSize: 'clamp(16px,1.8vw,22px)', padding: '8px 14px', whiteSpace: 'nowrap' }

  const cargar = async () => {
    try {
      setLoading(true)
      const [ocRes, empRes] = await Promise.all([getOCVentas(), getEmpresas()])
      setRegistros(ocRes.data)
      setEmpresas(empRes.data)
    } catch {
      setError('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  const handleGuardar = async (data) => {
    try {
      if (registroSeleccionado) {
        await updateOCVenta(registroSeleccionado.id, data)
      } else {
        await createOCVenta(data)
      }
      setShowModal(false)
      setRegistroSeleccionado(null)
      cargar()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar')
    }
  }

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar este registro?')) return
    await deleteOCVenta(id)
    cargar()
  }

  return (
   <Container fluid className="py-3 px-2 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold">
          <i className="fas fa-tv me-2"></i>
          OC Ventas
         
        </h5>
        <div className="d-flex gap-2 align-items-center">
        <Button variant="outline-secondary" size="sm" onClick={() => navigate('/informe-produccion')}>
            <i className="fas fa-arrow-left me-1"></i>Volver
        </Button>
        <Button variant="success" size="sm" onClick={exportarExcel}>
            <i className="fas fa-file-excel me-1"></i>Excel
        </Button>
        <Button variant="dark" size="sm" onClick={() => { setRegistroSeleccionado(null); setShowModal(true) }}>
            <i className="fas fa-plus me-1"></i>Nuevo Registro
        </Button>
        </div>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="dark" /></div>
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle mb-0" style={{ minWidth: 900 }}>
            <thead className="table-dark">
              <tr>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Fecha</th>
                <th style={thStyle}>Cliente</th>
                <th style={thStyle}>OC</th>
                <th style={thStyle}>Envío</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Observaciones</th>
                <th style={thStyle}>Acc.</th>
              </tr>
            </thead>
            <tbody>
              {registros.length === 0 ? (
                <tr><td colSpan={8} className="text-center text-muted py-4">Sin registros</td></tr>
              ) : registros.map(r => (
                <tr key={r.id}
                  onMouseEnter={() => setHoveredRow(r.id)}
                  onMouseLeave={() => setHoveredRow(null)}>
                  <td style={tdStyle}>{r.id}</td>
                  <td style={tdStyle}>{formatFecha(r.fecha)}</td>
                  <td style={tdStyle}>{r.empresa?.nombre || '—'}</td>
                  <td style={tdStyle}>{r.oc || '—'}</td>
                  <td style={tdStyle}>
                    <Badge bg={r.envio === 'Despachar' ? 'primary' : 'secondary'}>
                      {r.envio}
                    </Badge>
                  </td>
                  <td style={tdStyle}>{estadoBadge(r.estado)}</td>
                  <td style={{ ...tdStyle, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.observaciones || '—'}
                  </td>
                  <td style={tdStyle}>
                    <Button size="sm" variant="outline-dark" className="me-1"
                      style={{ visibility: hoveredRow === r.id ? 'visible' : 'hidden' }}
                      onClick={() => { setRegistroSeleccionado(r); setShowModal(true) }}>
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button size="sm" variant="outline-danger"
                      style={{ visibility: hoveredRow === r.id ? 'visible' : 'hidden' }}
                      onClick={() => handleEliminar(r.id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <OCVentasModal
        show={showModal}
        onHide={() => { setShowModal(false); setRegistroSeleccionado(null) }}
        onSave={handleGuardar}
        registro={registroSeleccionado}
        empresas={empresas}
      />
    </Container>
  )
}