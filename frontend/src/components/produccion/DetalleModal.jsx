import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'

export default function DetalleModal({ show, onHide, onSave, produccionId, kgPedidosOP, kgActualesOP, proximoRollo }) {
  const [kg, setKg] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (show) {
      setKg('')
      setError(null)
    }
  }, [show])

  const handleSubmit = (e) => {
    e.preventDefault()
    const kgNuevo = parseFloat(kg) || 0
    const limite = kgPedidosOP + 50

    if ((kgActualesOP + kgNuevo) > limite) {
      setError(`Excede del total de kg definidos en la OP. Máximo permitido: ${(kgPedidosOP + 50).toFixed(2)} kg, actualmente: ${kgActualesOP} kg, intentando agregar: ${kgNuevo} kg.`)
      return
    }

    onSave({
      produccion_extrusora_id: produccionId,
      numero_rollo: proximoRollo,
      kg: kgNuevo
    })
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-plus me-2"></i>
          Agregar Rollo #{String(proximoRollo).padStart(3, '0')}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger"><i className="fas fa-exclamation-triangle me-2"></i>{error}</Alert>}

          <div className="mb-3 p-2 bg-light rounded small">
            <i className="fas fa-info-circle me-1 text-info"></i>
            <strong>Kg pedidos:</strong> {kgPedidosOP} kg &nbsp;|&nbsp;
            <strong>Kg ingresados:</strong> <span className="text-success">{kgActualesOP} kg</span> &nbsp;|&nbsp;
            <strong>Disponible:</strong> <span className="text-warning">{Math.max(kgPedidosOP + 50 - kgActualesOP, 0).toFixed(2)} kg</span>
          </div>

          <Form.Group>
            <Form.Label>Kg del rollo <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={kg}
              onChange={(e) => { setKg(e.target.value); setError(null) }}
              required
              placeholder="0.00"
              autoFocus
            />
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