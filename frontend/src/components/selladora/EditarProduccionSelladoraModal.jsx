import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

export default function EditarProduccionSelladoraModal({ show, onHide, onSave, produccion, maquinas, usuarios }) {
  const [form, setForm] = useState({ fecha: '', turno: 'dia', maquina_id: '', usuario_id: '' })

  useEffect(() => {
    if (show && produccion) {
      setForm({
        fecha: produccion.fecha || '',
        turno: produccion.turno || 'dia',
        maquina_id: produccion.maquina?.id || '',
        usuario_id: produccion.usuario?.id || ''
      })
    }
  }, [show, produccion])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(produccion.id, {
      fecha: form.fecha,
      turno: form.turno,
      maquina_id: parseInt(form.maquina_id),
      usuario_id: form.usuario_id ? parseInt(form.usuario_id) : null
    })
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-edit me-2"></i>
          Editar Turno
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
                  <option value="dia">Día</option>
                  <option value="noche">Noche</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Máquina <span className="text-danger">*</span></Form.Label>
                <Form.Select name="maquina_id" value={form.maquina_id} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {maquinas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Operador</Form.Label>
                <Form.Select name="usuario_id" value={form.usuario_id} onChange={handleChange}>
                  <option value="">Seleccionar...</option>
                  {usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
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