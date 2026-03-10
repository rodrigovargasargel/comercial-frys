import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import * as XLSX from 'xlsx'

export default function PackingModal({ show, onHide, op, empresas, producciones, detalles, getProducciones, getDetalles }) {
  const [form, setForm] = useState({ empresa_id: '', ref: '', fact: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (show && op) {
      setForm({
        empresa_id: op.empresa?.id || '',
        ref: op.oc_cliente || '',
        fact: ''
      })
      setError(null)
    }
  }, [show, op])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleGenerar = async () => {
  if (!form.empresa_id || !form.ref || !form.fact) {
    setError('Todos los campos son obligatorios')
    return
  }
  setLoading(true)
  try {
    const clienteNombre = empresas.find(e => e.id === parseInt(form.empresa_id))?.nombre || ''
    const API_URL = import.meta.env.VITE_API_URL

    const response = await fetch(`${API_URL}/produccion/ops/${op.id}/packing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cliente: clienteNombre,
        ref: form.ref,
        fact: form.fact
      })
    })

    if (!response.ok) throw new Error('Error al generar')

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Packing-${form.fact}-${clienteNombre}.xlsx`
    a.click()
    window.URL.revokeObjectURL(url)
    onHide()
  } catch {
    setError('Error al generar el packing')
  } finally {
    setLoading(false)
  }
}

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-truck me-2"></i>
          Generar Packing List — OP #{op?.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger"><i className="fas fa-exclamation-triangle me-2"></i>{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Cliente <span className="text-danger">*</span></Form.Label>
          <Form.Select name="empresa_id" value={form.empresa_id} onChange={handleChange}>
            <option value="">Seleccionar cliente...</option>
            {empresas.filter(e => e.tipo_empresa === 'cliente').map(e => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>REF <span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="ref"
                value={form.ref}
                onChange={handleChange}
                placeholder="Ej: OC 2532 02/01/25"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>FACT <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                name="fact"
                value={form.fact}
                onChange={handleChange}
                placeholder="41064"
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <i className="fas fa-times me-1"></i> Cancelar
        </Button>
        <Button variant="success" onClick={handleGenerar} disabled={loading}>
          {loading
            ? <><i className="fas fa-spinner fa-spin me-2"></i>Generando...</>
            : <><i className="fas fa-file-excel me-2"></i>Generar Packing</>
          }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

