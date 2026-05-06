import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function EditarDetalleModal({ show, onHide, onSave, detalle }) {
  const [kg, setKg] = useState('')

  useEffect(() => {
    if (show && detalle) {
      setKg(detalle.kg)
    }
  }, [show, detalle])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(detalle.id, parseFloat(kg))
  }

  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-edit me-2"></i>
          Editar Rollo #{String(detalle?.numero_rollo || 0).padStart(3, '0')}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Kg del rollo <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={kg}
              onChange={e => setKg(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>
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