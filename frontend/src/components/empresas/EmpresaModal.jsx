import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const initialForm = {
  tipo_empresa: 'cliente',
  nombre: '',
  rut: '',
  razon_social: '',
  direccion: '',
  telefono: '',
  activo: true
}

export default function EmpresaModal({ show, onHide, onSave, empresa }) {
  const [form, setForm] = useState(initialForm)
  const esEdicion = !!empresa

  useEffect(() => {
    if (empresa) {
      setForm({
        tipo_empresa: empresa.tipo_empresa,
        nombre: empresa.nombre,
        rut: empresa.rut || '',
        razon_social: empresa.razon_social || '',
        direccion: empresa.direccion || '',
        telefono: empresa.telefono || '',
        activo: empresa.activo
      })
    } else {
      setForm(initialForm)
    }
  }, [empresa])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...form }
    // Enviar null en lugar de string vacío para campos opcionales
    if (!data.rut) data.rut = null
    if (!data.razon_social) data.razon_social = null
    if (!data.direccion) data.direccion = null
    if (!data.telefono) data.telefono = null
    onSave(data)
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className={`fas ${esEdicion ? 'fa-edit' : 'fa-plus'} me-2`}></i>
          {esEdicion ? 'Editar Empresa' : 'Nueva Empresa'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre <span className="text-danger">*</span></Form.Label>
                <Form.Control name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Nombre de la empresa" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo <span className="text-danger">*</span></Form.Label>
                <Form.Select name="tipo_empresa" value={form.tipo_empresa} onChange={handleChange} required>
                  <option value="cliente">Cliente</option>
                  <option value="proveedor">Proveedor</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>RUT</Form.Label>
                <Form.Control name="rut" value={form.rut} onChange={handleChange} placeholder="12.345.678-9" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control name="telefono" value={form.telefono} onChange={handleChange} placeholder="+56 9 1234 5678" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Razón Social</Form.Label>
            <Form.Control name="razon_social" value={form.razon_social} onChange={handleChange} placeholder="Razón social" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección completa" />
          </Form.Group>

          {esEdicion && (
            <Form.Check type="switch" name="activo" label="Empresa activa" checked={form.activo} onChange={handleChange} />
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