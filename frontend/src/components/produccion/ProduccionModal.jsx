import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const initialForm = { fecha: '', turno: 'mañana' }

export default function ProduccionModal({ show, onHide, onSave, opId }) {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (show) {
      const hoy = new Date().toISOString().split('T')[0]
      setForm({ fecha: hoy, turno: 'mañana' })
    }
  }, [show])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...form, op_id: opId })
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-industry me-2"></i>
          Agregar Turno de Producción
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha <span className="text-danger">*</span></Form.Label>
                <Form.Control type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Turno <span className="text-danger">*</span></Form.Label>
                <Form.Select name="turno" value={form.turno} onChange={handleChange} required>
                  <option value="mañana">Mañana</option>
                  <option value="tarde">Tarde</option>
                  <option value="noche">Noche</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
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