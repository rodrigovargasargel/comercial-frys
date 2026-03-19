import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, Alert, Spinner, Badge } from 'react-bootstrap'
import { getRollosDisponibles } from '../../api/selladora'

export default function DetalleSelladoraModal({ show, onHide, onSave, produccionId, op }) {
  const [rollos, setRollos] = useState([])
  const [loadingRollos, setLoadingRollos] = useState(false)
  const [form, setForm] = useState({ detalle_extrusora_id: '', q_paquetes: '', q_unidades_por_paquete: '' })
  const [error, setError] = useState(null)

  useEffect(() => {
    if (show && op) {
      setForm({ detalle_extrusora_id: '', q_paquetes: '', q_unidades_por_paquete: '' })
      setError(null)
      cargarRollos()
    }
  }, [show, op])

  const cargarRollos = async () => {
    try {
      setLoadingRollos(true)
      const { data } = await getRollosDisponibles(op.color?.id, op.ancho, op.espesor)
      setRollos(data)
    } catch {
      setError('Error al cargar rollos disponibles')
    } finally {
      setLoadingRollos(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const rolloSeleccionado = rollos.find(r => r.id === parseInt(form.detalle_extrusora_id))
  const unidadesCalculadas = (parseInt(form.q_paquetes) || 0) * (parseInt(form.q_unidades_por_paquete) || 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.detalle_extrusora_id || !form.q_paquetes || !form.q_unidades_por_paquete) {
      setError('Todos los campos son obligatorios')
      return
    }
    onSave({
      produccion_selladora_id: produccionId,
      detalle_extrusora_id: parseInt(form.detalle_extrusora_id),
      q_paquetes: parseInt(form.q_paquetes),
      q_unidades_por_paquete: parseInt(form.q_unidades_por_paquete)
    })
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-plus me-2"></i>
          Agregar Rollo a Producción
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Info de la OP */}
          <div className="mb-3 p-2 bg-light rounded small">
            <i className="fas fa-info-circle me-1 text-info"></i>
            Buscando rollos con: <strong>{op?.color?.nombre}</strong> —
            Ancho <strong>{op?.ancho} cm</strong> —
            Espesor <strong>{op?.espesor} micras</strong>
          </div>

          {/* Combo rollos */}
          <Form.Group className="mb-3">
            <Form.Label>Rollo de Extrusora <span className="text-danger">*</span></Form.Label>
            {loadingRollos ? (
              <div className="text-center py-2"><Spinner size="sm" /> Buscando rollos...</div>
            ) : rollos.length === 0 ? (
              <Alert variant="warning" className="mb-0">
                <i className="fas fa-exclamation-triangle me-2"></i>
                No hay rollos disponibles con estas medidas y color
              </Alert>
            ) : (
              <Form.Select name="detalle_extrusora_id" value={form.detalle_extrusora_id} onChange={handleChange} required>
                <option value="">Seleccionar rollo...</option>
                {rollos.map(r => (
                  <option key={r.id} value={r.id}>
                    Rollo #{String(r.numero_rollo).padStart(3, '0')} — {r.kg} kg — Lote {r.lote} — {r.fecha_produccion}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          {/* Info rollo seleccionado */}
          {rolloSeleccionado && (
            <div className="mb-3 p-2 bg-light rounded small">
              <strong>Rollo #{String(rolloSeleccionado.numero_rollo).padStart(3, '0')}</strong> —
              <span className="text-success ms-1">{rolloSeleccionado.kg} kg</span> —
              Lote {rolloSeleccionado.lote}
            </div>
          )}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad de paquetes <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number" name="q_paquetes"
                  value={form.q_paquetes} onChange={handleChange}
                  required placeholder="0" min="1"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Unidades por paquete <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number" name="q_unidades_por_paquete"
                  value={form.q_unidades_por_paquete} onChange={handleChange}
                  required placeholder="0" min="1"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Cálculo unidades */}
          {unidadesCalculadas > 0 && (
            <div className="p-2 bg-dark text-white rounded text-center">
              <strong>Total unidades: {unidadesCalculadas.toLocaleString()}</strong>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            <i className="fas fa-times me-1"></i> Cancelar
          </Button>
          <Button variant="dark" type="submit" disabled={loadingRollos || rollos.length === 0}>
            <i className="fas fa-save me-1"></i> Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}