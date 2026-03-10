import { useState, useEffect } from 'react'
import { Container, Button, Alert, Spinner, Table, Badge } from 'react-bootstrap'
import MPModal from './MPModal'
import { getMPs, createMP, updateMP, deleteMP, getTiposMP } from '../../api/materia_prima'
import { getEmpresas } from '../../api/selects'
import { getColores } from '../../api/produccion'


const formatFecha = (fecha) => {
  if (!fecha) return ''
  const [y, m, d] = fecha.split('-')
  return `${d}-${m}-${y}`
}

export default function MateriaPrimaPage() {
  const [mps, setMps] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [tiposMP, setTiposMP] = useState([])
  const [colores, setColores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [mpSeleccionada, setMpSeleccionada] = useState(null)
  const [expandida, setExpandida] = useState(null)

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [mpsRes, empRes, tiposRes, colRes] = await Promise.all([
        getMPs(), getEmpresas(), getTiposMP(), getColores()
      ])
      setMps(mpsRes.data)
      setEmpresas(empRes.data)
      setTiposMP(tiposRes.data)
      setColores(colRes.data)
    } catch {
      setError('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarDatos() }, [])

  const handleGuardar = async (data) => {
    try {
      if (mpSeleccionada) {
        await updateMP(mpSeleccionada.id, data)
      } else {
        await createMP(data)
      }
      setShowModal(false)
      setMpSeleccionada(null)
      cargarDatos()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar')
    }
  }

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar este registro de materia prima?')) return
    try {
      await deleteMP(id)
      cargarDatos()
    } catch {
      setError('Error al eliminar')
    }
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-boxes me-2"></i>
          Materia Prima
        </h2>
        <Button variant="dark" onClick={() => { setMpSeleccionada(null); setShowModal(true) }}>
          <i className="fas fa-plus me-2"></i>Nueva Entrada
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="dark" /></div>
      ) : (
        <Table hover responsive className="align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: 40 }}></th>
              <th>#</th>
              <th>Fecha</th>
              <th>Proveedor</th>
              <th>OC</th>
              <th>Factura</th>
              <th>KG Total</th>
              <th>Materiales</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mps.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-muted py-5">
                  <i className="fas fa-boxes fa-2x mb-2 d-block"></i>
                  No hay registros de materia prima
                </td>
              </tr>
            ) : mps.map(mp => (
              <>
                <tr key={mp.id} style={{ cursor: 'pointer' }}>
                  <td onClick={() => setExpandida(expandida === mp.id ? null : mp.id)}>
                    <i className={`fas fa-chevron-${expandida === mp.id ? 'down' : 'right'} text-muted`}></i>
                  </td>
                  <td onClick={() => setExpandida(expandida === mp.id ? null : mp.id)}>{mp.id}</td>
                  <td onClick={() => setExpandida(expandida === mp.id ? null : mp.id)}>{formatFecha(mp.fecha)}</td>
                  <td onClick={() => setExpandida(expandida === mp.id ? null : mp.id)}>{mp.empresa?.nombre}</td>
                  <td onClick={() => setExpandida(expandida === mp.id ? null : mp.id)}>{mp.oc || <span className="text-muted">—</span>}</td>
                  <td onClick={() => setExpandida(expandida === mp.id ? null : mp.id)}>{mp.factura || <span className="text-muted">—</span>}</td>
                  <td onClick={() => setExpandida(expandida === mp.id ? null : mp.id)}>
                    <strong>{mp.kg_total} kg</strong>
                  </td>
                  <td onClick={() => setExpandida(expandida === mp.id ? null : mp.id)}>
                    <Badge bg="secondary">{mp.detalles?.length || 0} items</Badge>
                  </td>
                  <td>
                    <Button size="sm" variant="outline-dark" className="me-1"
                      onClick={() => { setMpSeleccionada(mp); setShowModal(true) }}>
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button size="sm" variant="outline-danger"
                      onClick={() => handleEliminar(mp.id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>

                {/* Detalle expandido */}
                {expandida === mp.id && (
                  <tr key={`det-${mp.id}`}>
                    <td colSpan={9} className="p-0">
                      <div className="bg-light px-4 py-3 border-start border-4 border-secondary">
                        <Table size="sm" hover className="mb-0 bg-white">
                          <thead className="table-secondary">
                            <tr>
                              <th>Tipo MP</th>
                              <th>Color</th>
                              <th>KG</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(mp.detalles || []).map(d => (
                              <tr key={d.id}>
                                <td><Badge bg="dark">{d.tipo?.nombre}</Badge></td>
                                <td>{d.color?.nombre}</td>
                                <td><strong>{d.kg} kg</strong></td>
                              </tr>
                            ))}
                            <tr className="table-secondary fw-bold">
                              <td colSpan={2} className="text-end">Total:</td>
                              <td>{mp.kg_total} kg</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </Table>
      )}

      <MPModal
        show={showModal}
        onHide={() => { setShowModal(false); setMpSeleccionada(null) }}
        onSave={handleGuardar}
        mp={mpSeleccionada}
        empresas={empresas}
        tiposMP={tiposMP}
        colores={colores}
      />
    </Container>
  )
}