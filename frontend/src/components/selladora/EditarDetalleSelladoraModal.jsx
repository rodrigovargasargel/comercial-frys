import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'

export default function EditarDetalleSelladoraModal({ show, onHide, onSave, detalle, op }) {
  const [form, setForm] = useState({ q_paquetes: '', q_unidades_por_paquete: '', kilos_producidos: '', imprimir_kg: false, mostrar_titulo: true})
  const [error, setError] = useState(null)

  useEffect(() => {
    if (show && detalle) {
      setForm({
        q_paquetes: detalle.q_paquetes,
        q_unidades_por_paquete: detalle.q_unidades_por_paquete,
        kilos_producidos: detalle.kilos,
        imprimir_kg: detalle.imprimir_kg || false,
        mostrar_titulo: detalle.mostrar_titulo !== false,
        kilos_imp: detalle.kilos_imp || ''
      })
      setError(null)
    }
  }, [show, detalle])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const unidadesCalculadas = (parseInt(form.q_paquetes) || 0) * (parseInt(form.q_unidades_por_paquete) || 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.q_paquetes || !form.q_unidades_por_paquete || !form.kilos_producidos) {
      setError('Todos los campos son obligatorios')
      return
    }
    onSave(detalle.id, {
      q_paquetes: parseInt(form.q_paquetes),
      q_unidades_por_paquete: parseInt(form.q_unidades_por_paquete),
      kilos_producidos: parseFloat(form.kilos_producidos),
      imprimir_kg: form.imprimir_kg,
      mostrar_titulo: form.mostrar_titulo,
      kilos_imp: form.kilos_imp ? parseFloat(form.kilos_imp) : null,
    })
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-edit me-2"></i>
          Editar Rollo #{String(detalle?.numero_rollo || 0).padStart(3, '0')}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Info rollo */}
          <div className="mb-3 p-2 bg-light rounded small">
            <i className="fas fa-info-circle me-1 text-info"></i>
            Rollo #{String(detalle?.numero_rollo || 0).padStart(3, '0')} —
            <strong className="ms-1">{detalle?.kg_rollo_original} kg originales</strong>
          </div>

          <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Kilos x PACK <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="kilos_producidos"
                    value={form.kilos_producidos}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-center pt-3">
              <Col md={6}>
                <Form.Check
                  type="checkbox"
                  label="KG en la etiqueta"
                  checked={form.imprimir_kg}
                  onChange={e => setForm(prev => ({ ...prev, imprimir_kg: e.target.checked }))}
                />
              </Col>
              <Col md={6}>
                <Form.Check
                      type="checkbox"
                      label="Título en etiqueta"
                      checked={form.mostrar_titulo}
                      onChange={e => setForm(prev => ({ ...prev, mostrar_titulo: e.target.checked }))}
                      className="mt-2"
                      />
              </Col>        
            </Col>
          </Row>

          <hr />

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad de paquetes <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  name="q_paquetes"
                  value={form.q_paquetes}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Unidades por paquete <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  name="q_unidades_por_paquete"
                  value={form.q_unidades_por_paquete}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </Form.Group>
            </Col>
          </Row>

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
          <Button variant="dark" type="submit">
            <i className="fas fa-save me-1"></i> Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}