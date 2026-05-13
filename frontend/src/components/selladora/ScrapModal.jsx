import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function ScrapModal({ show, onHide, onSave, produccion }) {
  const [scrap, setScrap] = useState(0)

  useEffect(() => {
    if (show && produccion) {
      setScrap(produccion.scrap || 0)
    }
  }, [show, produccion])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(produccion.id, parseFloat(scrap) || 0)
  }

  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-recycle me-2"></i>
          Scrap — {produccion?.fecha}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Kilos de scrap</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={scrap}
              onChange={e => setScrap(e.target.value)}
              autoFocus
              min="0"
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