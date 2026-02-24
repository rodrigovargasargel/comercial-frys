import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const initialForm = { nombre: '',codigo: '', tipo_maquina_id: '', tipo_producto_id: '', u_medida_id: '', activo: true }

export default function ProductoModal({ show, onHide, onSave, producto, tiposMaquina, tiposProducto, uMedidas }) {
  const [form, setForm] = useState(initialForm)
  const esEdicion = !!producto

  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre,
        codigo: producto.codigo,
        tipo_maquina_id: producto.tipo_maquina_id,
        tipo_producto_id: producto.tipo_producto_id,
        u_medida_id: producto.u_medida_id,
        activo: producto.activo
      })
    } else {
      setForm({
        ...initialForm,
        tipo_maquina_id: tiposMaquina[0]?.id || '',
        tipo_producto_id: tiposProducto[0]?.id || '',
        u_medida_id: uMedidas[0]?.id || ''
      })
    }
  }, [producto, tiposMaquina, tiposProducto, uMedidas])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      tipo_maquina_id: parseInt(form.tipo_maquina_id),
      tipo_producto_id: parseInt(form.tipo_producto_id),
      u_medida_id: parseInt(form.u_medida_id)
    })
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className={`fas ${esEdicion ? 'fa-edit' : 'fa-plus'} me-2`}></i>
          {esEdicion ? 'Editar Producto' : 'Nuevo Producto'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Nombre del producto" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Codigo</Form.Label>
            <Form.Control name="codigo" value={form.codigo} onChange={handleChange} required placeholder="Codigo del producto" />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Máquina</Form.Label>
                <Form.Select name="tipo_maquina_id" value={form.tipo_maquina_id} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {tiposMaquina.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Producto</Form.Label>
                <Form.Select name="tipo_producto_id" value={form.tipo_producto_id} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {tiposProducto.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Unidad de Medida</Form.Label>
                <Form.Select name="u_medida_id" value={form.u_medida_id} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {uMedidas.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {esEdicion && (
            <Form.Check type="switch" name="activo" label="Producto activo" checked={form.activo} onChange={handleChange} />
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