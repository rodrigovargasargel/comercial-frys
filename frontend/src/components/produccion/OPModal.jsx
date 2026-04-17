import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const initialForm = {
  fecha: '',
  producto_id: '',
  densidad: 'alta',
  color_id: '',
  ancho: '',
  espesor: '',
  kilos: '',
  estado: 'pendiente',
  empresa_id: '',
  oc_cliente: ''
}

export default function OPModal({ show, onHide, onSave, op, productos, colores, empresas }) {
  const [form, setForm] = useState(initialForm)
  const esEdicion = !!op

  useEffect(() => {
    if (show) {
      if (op) {
        setForm({
          fecha: op.fecha,
          producto_id: op.producto.id,
          densidad: op.densidad,
          color_id: op.color.id,
          ancho: op.ancho,
          espesor: op.espesor,
          kilos: op.kilos,
          estado: op.estado,
          empresa_id: op.empresa?.id || '',
          oc_cliente: op.oc_cliente || ''
        })
      } else {
        const hoy = new Date().toISOString().split('T')[0]
        setForm({ ...initialForm, fecha: hoy })
      }
    }
  }, [show, op])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      producto_id: parseInt(form.producto_id),
      color_id: parseInt(form.color_id),
      ancho: parseInt(form.ancho),
      espesor: parseInt(form.espesor),
      kilos: parseFloat(form.kilos),
      empresa_id: form.empresa_id ? parseInt(form.empresa_id) : null,
      oc_cliente: form.oc_cliente || null
    })
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className={`fas ${esEdicion ? 'fa-edit' : 'fa-plus'} me-2`}></i>
          {esEdicion ? 'Editar Orden de Producción' : 'Nueva Orden de Producción'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha <span className="text-danger">*</span></Form.Label>
                <Form.Control type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Producto <span className="text-danger">*</span></Form.Label>
                <Form.Select name="producto_id" value={form.producto_id} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Densidad <span className="text-danger">*</span></Form.Label>
                <Form.Select name="densidad" value={form.densidad} onChange={handleChange} required>
                  <option value="alta">Alta</option>
                  <option value="baja">Baja</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Color <span className="text-danger">*</span></Form.Label>
                <Form.Select name="color_id" value={form.color_id} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {colores.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Ancho (cm) <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" name="ancho" value={form.ancho} onChange={handleChange} required placeholder="0" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Espesor (µ) <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" name="espesor" value={form.espesor} onChange={handleChange} required placeholder="0" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Kilos a producir <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" step="0.01" name="kilos" value={form.kilos} onChange={handleChange} required placeholder="0.00" />
              </Form.Group>
            </Col>
            {esEdicion && (
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select name="estado" value={form.estado} onChange={handleChange}>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_produccion">En producción</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Cliente <span className="text-muted">(opcional)</span></Form.Label>
                <Form.Select name="empresa_id" value={form.empresa_id} onChange={handleChange}>
                  <option value="">Sin cliente</option>
                  {empresas.filter(e => e.tipo_empresa === 'cliente').map(e => (
                    <option key={e.id} value={e.id}>{e.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>OC Cliente <span className="text-muted">(opcional)</span></Form.Label>
                <Form.Control name="oc_cliente" value={form.oc_cliente} onChange={handleChange} placeholder="N° orden de compra" />
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


  console.log('productos:', productos)
console.log('colores:', colores)
console.log('empresas:', empresas)
}