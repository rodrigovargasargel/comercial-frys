import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import Select from 'react-select'

const initialForm = {
  fecha: '',
  empresa_id: '',
  oc: '',
  envio: 'Despachar',
  estado: 'Pendiente',
  observaciones: ''
}

export default function OCVentasModal({ show, onHide, onSave, registro, empresas }) {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (show) {
      if (registro) {
        setForm({
          fecha: registro.fecha || '',
          empresa_id: registro.empresa_id || '',
          oc: registro.oc || '',
          envio: registro.envio || 'Despachar',
          estado: registro.estado || 'Pendiente',
          observaciones: registro.observaciones || ''
        })
      } else {
        const hoy = new Date().toISOString().split('T')[0]
        setForm({ ...initialForm, fecha: hoy })
      }
    }
  }, [show, registro])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      empresa_id: form.empresa_id ? parseInt(form.empresa_id) : null
    })
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-file-invoice me-2"></i>
          {registro ? 'Editar OC Venta' : 'Nueva OC Venta'}
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
                <Form.Label>OC</Form.Label>
                <Form.Control name="oc" value={form.oc} onChange={handleChange} placeholder="N° orden de compra" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Envío <span className="text-danger">*</span></Form.Label>
                <Form.Select name="envio" value={form.envio} onChange={handleChange} required>
                  <option value="Despachar">Despachar</option>
                  <option value="Retiro Oficina">Retiro Oficina</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cliente</Form.Label>
                <Select
                  options={empresas.filter(e => e.tipo_empresa === 'cliente').map(e => ({ value: e.id, label: e.nombre }))}
                  value={form.empresa_id ? { value: form.empresa_id, label: empresas.find(e => e.id === parseInt(form.empresa_id))?.nombre || '' } : null}
                  onChange={opt => setForm(prev => ({ ...prev, empresa_id: opt ? opt.value : '' }))}
                  isClearable
                  placeholder="Buscar cliente..."
                  noOptionsMessage={() => 'Sin resultados'}
                  styles={{ control: (base) => ({ ...base, minHeight: 38, fontSize: 14 }), menu: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Estado <span className="text-danger">*</span></Form.Label>
                <Form.Select name="estado" value={form.estado} onChange={handleChange} required>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Con Saldo a despachar">Con Saldo a despachar</option>
                  <option value="Despachado">Despachado</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Observaciones</Form.Label>
            <Form.Control as="textarea" rows={3} name="observaciones" value={form.observaciones} onChange={handleChange} placeholder="Observaciones opcionales..." />
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