import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const initialForm = {
  maquina_id: '',
  kilos_a_producir: '',
  lote: '',
  calibre: 'alta',
  estado: 'pendiente',
  producto_id: '',
  empresa_id: '',
  oc_cliente: ''
}

export default function OPModal({ show, onHide, onSave, op, maquinas, productos, empresas }) {
  const [form, setForm] = useState(initialForm)
  const esEdicion = !!op

  useEffect(() => {
    if (op) {
      setForm({
        maquina_id: op.maquina.id,
        kilos_a_producir: op.kilos_a_producir,
        lote: op.lote,
        calibre: op.calibre,
        estado: op.estado,
        producto_id: op.producto?.id || '',
        empresa_id: op.empresa?.id || '',
        oc_cliente: op.oc_cliente || ''
      })
    } else {
      setForm({ ...initialForm, maquina_id: maquinas[0]?.id || '' })
    }
  }, [op, maquinas])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      ...form,
      maquina_id: parseInt(form.maquina_id),
      kilos_a_producir: parseFloat(form.kilos_a_producir),
      producto_id: form.producto_id ? parseInt(form.producto_id) : null,
      empresa_id: form.empresa_id ? parseInt(form.empresa_id) : null,
      oc_cliente: form.oc_cliente || null
    }
    onSave(data)
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
                <Form.Label>Lote <span className="text-danger">*</span></Form.Label>
                <Form.Control name="lote" value={form.lote} onChange={handleChange} required placeholder="Ej: L-001" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Máquina <span className="text-danger">*</span></Form.Label>
                <Form.Select name="maquina_id" value={form.maquina_id} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {maquinas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Kilos a producir <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" step="0.01" name="kilos_a_producir" value={form.kilos_a_producir} onChange={handleChange} required placeholder="0.00" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Calibre <span className="text-danger">*</span></Form.Label>
                <Form.Select name="calibre" value={form.calibre} onChange={handleChange} required>
                  <option value="alta">Alta</option>
                  <option value="baja">Baja</option>
                </Form.Select>
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
                <Form.Label>Producto <span className="text-muted">(opcional)</span></Form.Label>
                <Form.Select name="producto_id" value={form.producto_id} onChange={handleChange}>
                  <option value="">Sin producto</option>
                  {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
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
            <Col md={6}>
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
}