import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

export default function EditarProduccionModal({ show, onHide, onSave, produccion, maquinas, usuarios }) {
  const [form, setForm] = useState({ maquina_id: '', turno: 'dia', lote: '', usuario_id: '' })

  useEffect(() => {
    if (show && produccion) {
      setForm({
        maquina_id: produccion.maquina?.id || '',
        turno: produccion.turno || 'dia',
        lote: produccion.lote || '',
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
      maquina_id: parseInt(form.maquina_id),
      turno: form.turno,
      lote: form.lote,
      usuario_id: parseInt(form.usuario_id)
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
                <Form.Label>Máquina</Form.Label>
                <Form.Select name="maquina_id" value={form.maquina_id} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {maquinas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Turno</Form.Label>
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
                <Form.Label>Lote</Form.Label>
                <Form.Control name="lote" value={form.lote} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Operador</Form.Label>
                <Form.Select name="usuario_id" value={form.usuario_id} onChange={handleChange} required>
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