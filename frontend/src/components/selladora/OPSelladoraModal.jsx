import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const initialForm = {
  fecha: '', empresa_id: '', producto_id: '', color_id: '',
  ancho: '', espesor: '', largo: '', unidades: '', kilos: '', estado: 'pendiente'
}

export default function OPSelladoraModal({ show, onHide, onSave, op, empresas, productos, colores }) {
  const [form, setForm] = useState(initialForm)
  const esEdicion = !!op

  useEffect(() => {
    if (show) {
      if (op) {
        setForm({
          fecha: op.fecha,
          empresa_id: op.empresa?.id || '',
          producto_id: op.producto?.id || '',
          color_id: op.color?.id || '',
          ancho: op.ancho,
          espesor: op.espesor,
          largo: op.largo,
          unidades: op.unidades,
          kilos: op.kilos,
          estado: op.estado
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
      empresa_id: form.empresa_id ? parseInt(form.empresa_id) : null,
      producto_id: parseInt(form.producto_id),
      color_id: parseInt(form.color_id),
      ancho: parseFloat(form.ancho),
      espesor: parseFloat(form.espesor),
      largo: parseFloat(form.largo),
      unidades: parseInt(form.unidades),
      kilos: parseFloat(form.kilos)
    })
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className={`fas ${esEdicion ? 'fa-edit' : 'fa-plus'} me-2`}></i>
          {esEdicion ? 'Editar OP Selladora' : 'Nueva OP Selladora'}
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
                <Form.Label>Cliente</Form.Label>
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
                <Form.Label>Producto <span className="text-danger">*</span></Form.Label>
                <Form.Select name="producto_id" value={form.producto_id} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {productos.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Color <span className="text-danger">*</span></Form.Label>
                <Form.Select name="color_id" value={form.color_id} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {colores.map(c => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Ancho (cm) <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" step="0.1" name="ancho" value={form.ancho} onChange={handleChange} required placeholder="0.0" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Espesor (micras) <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" step="0.1" name="espesor" value={form.espesor} onChange={handleChange} required placeholder="0.0" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Largo (cm) <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" step="0.1" name="largo" value={form.largo} onChange={handleChange} required placeholder="0.0" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Unidades pedidas <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" name="unidades" value={form.unidades} onChange={handleChange} required placeholder="0" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Kilos <span className="text-danger">*</span></Form.Label>
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