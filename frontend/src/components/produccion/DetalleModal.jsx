import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'

const initialForm = { producto_id: '', kg: '', numero_rollo: '', ancho: '', espesor: '' }

export default function DetalleModal({ show, onHide, onSave, produccionId, productos, kgPedidosOP, kgActualesOP }) {
  const [form, setForm] = useState(initialForm)
  const [errorLocal, setErrorLocal] = useState(null)

  useEffect(() => {
    if (show) {
      setForm({ ...initialForm, producto_id: productos[0]?.id || '' })
      setErrorLocal(null)
    }
  }, [show, productos])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrorLocal(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const kgNuevo = parseFloat(form.kg) || 0
    const limite = kgPedidosOP + 50

    if ((kgActualesOP + kgNuevo) > limite) {
      setErrorLocal(
        `No se puede agregar este rollo. Los kg totales (${(kgActualesOP + kgNuevo).toFixed(2)} kg) superarían en más de 50 kg los kilos pedidos en la OP (${kgPedidosOP} kg).`
      )
      return
    }

    onSave({
      produccion_extrusora_id: produccionId,
      producto_id: parseInt(form.producto_id),
      kg: kgNuevo,
      numero_rollo: parseInt(form.numero_rollo),
      ancho: parseInt(form.ancho),
      espesor: parseInt(form.espesor)
    })
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-plus me-2"></i>
          Agregar Rollo
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {errorLocal && <Alert variant="danger"><i className="fas fa-exclamation-triangle me-2"></i>{errorLocal}</Alert>}

          <div className="mb-3 p-2 bg-light rounded small">
            <i className="fas fa-info-circle me-1 text-info"></i>
            <strong>Faltan :</strong> <span >{Math.max(kgPedidosOP + 50 - kgActualesOP, 0).toFixed(2)} kg</span>&nbsp;
          
            <strong> Ingresados:</strong> <span className="text-success">{kgActualesOP} kg</span> &nbsp;&nbsp;
            
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Producto <span className="text-danger">*</span></Form.Label>
            <Form.Select name="producto_id" value={form.producto_id} onChange={handleChange} required>
              <option value="">Seleccionar...</option>
              {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </Form.Select>
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>N° Rollo <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" name="numero_rollo" value={form.numero_rollo} onChange={handleChange} required placeholder="001" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Kg <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" step="0.01" name="kg" value={form.kg} onChange={handleChange} required placeholder="0.00" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ancho (mm) <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" name="ancho" value={form.ancho} onChange={handleChange} required placeholder="0" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Espesor (mm) <span className="text-danger">*</span></Form.Label>
                <Form.Control type="number" name="espesor" value={form.espesor} onChange={handleChange} required placeholder="0" />
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