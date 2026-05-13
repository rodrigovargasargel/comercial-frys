import { useState, useEffect } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'

export default function PackParcialModal({ show, onHide, onSave, detalle, produccionId }) {
  const [form, setForm] = useState({ unidades: '', kilos: '', imprimir_kg: false, mostrar_titulo: true })
  const [error, setError] = useState(null)

  useEffect(() => {
    if (show) {
      setForm({ unidades: '', kilos: '', imprimir_kg: false, mostrar_titulo: true })
      setError(null)
    }
  }, [show])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.unidades || !form.kilos) {
      setError('Todos los campos son obligatorios')
      return
    }
    onSave({
      produccion_selladora_id: produccionId,
      detalle_extrusora_id: detalle.detalle_extrusora_id,
      q_paquetes: 1,
      q_unidades_por_paquete: parseInt(form.unidades),
      kilos_producidos: parseFloat(form.kilos),
      imprimir_kg: form.imprimir_kg,
      mostrar_titulo: form.mostrar_titulo,
      es_pack_parcial: true
    })
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-warning">
        <Modal.Title>
          <i className="fas fa-box-open me-2"></i>
          Pack Saldo — Rollo #{String(detalle?.numero_rollo || 0).padStart(3, '0')}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <div className="mb-3 p-2 bg-light rounded small">
            <i className="fas fa-info-circle me-1 text-info"></i>
            Pack  adicional del rollo #{String(detalle?.numero_rollo || 0).padStart(3, '0')}
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Unidades del pack Saldo <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="number"
              name="unidades"
              value={form.unidades}
              onChange={handleChange}
              required
              min="1"
              placeholder="Ej: 1500"
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kg del pack Saldo <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="kilos"
              value={form.kilos}
              onChange={handleChange}
              required
              placeholder="0.00"
            />
          </Form.Group>

          <div className="d-flex gap-3">
            <Form.Check
              type="checkbox"
              label="Imprimir KG en etiqueta"
              checked={form.imprimir_kg}
              onChange={e => setForm(prev => ({ ...prev, imprimir_kg: e.target.checked }))}
            />
            <Form.Check
              type="checkbox"
              label="Título en etiqueta"
              checked={form.mostrar_titulo}
              onChange={e => setForm(prev => ({ ...prev, mostrar_titulo: e.target.checked }))}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            <i className="fas fa-times me-1"></i> Cancelar
          </Button>
          <Button variant="warning" type="submit">
            <i className="fas fa-save me-1"></i> Guardar Pack Adicional
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}