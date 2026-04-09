import { useState, useEffect } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { getOCs } from '../../api/produccion'

export default function GuiaSelladoraModal({ show, onHide, op, empresas }) {
  const [form, setForm] = useState({ empresa_id: '', nro_guia: '', oc_cliente: '' })
  const [ocs, setOcs] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  if (show && op) {
    setForm({
      empresa_id: op.empresa?.id || '',
      nro_guia: '',
      oc_cliente: ''
    })
    setError(null)
    cargarOCs(op.empresa?.id || null)
  }
}, [show, op])

// Agrega este nuevo useEffect
useEffect(() => {
  if (form.empresa_id) {
    cargarOCs(parseInt(form.empresa_id))
  } else {
    setOcs([])
    setForm(prev => ({ ...prev, oc_cliente: '' }))
  }
}, [form.empresa_id])

  const cargarOCs = async (empresa_id = null) => {
  try {
    const { data } = await getOCs(empresa_id)
    setOcs(data)
    setForm(prev => ({ ...prev, oc_cliente: '' }))
  } catch {
    setOcs([])
  }
}

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleGenerar = async () => {
    if (!form.empresa_id || !form.nro_guia) {
      setError('Cliente y N° Guía son obligatorios')
      return
    }
    setLoading(true)
    try {
      const clienteNombre = empresas.find(e => e.id === parseInt(form.empresa_id))?.nombre || ''
      const API_URL = import.meta.env.VITE_API_URL

      const response = await fetch(`${API_URL}/selladora/ops/${op.id}/trazabilidad`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cliente: clienteNombre, 
          nro_guia: form.nro_guia,
          oc_cliente: form.oc_cliente
        })
      })

      if (!response.ok) throw new Error('Error al generar')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Trazabilidad-OP${op.id}-${clienteNombre}.xlsx`
      a.click()
      window.URL.revokeObjectURL(url)
      onHide()
    } catch {
      setError('Error al generar el documento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-truck me-2"></i>
          Generar Trazabilidad — OP #{op?.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Cliente <span className="text-danger">*</span></Form.Label>
          <Form.Select name="empresa_id" value={form.empresa_id} onChange={handleChange}>
            <option value="">Seleccionar cliente...</option>
            {empresas.filter(e => e.tipo_empresa === 'cliente').map(e => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>OC Cliente <span className="text-muted">(opcional)</span></Form.Label>
          <Form.Select name="oc_cliente" value={form.oc_cliente} onChange={handleChange}>
            <option value="">Sin OC</option>
            {ocs.map((oc, i) => (
              <option key={i} value={oc}>{oc}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>N° Guía / N° Fact <span className="text-danger">*</span></Form.Label>
          <Form.Control
            name="nro_guia"
            value={form.nro_guia}
            onChange={handleChange}
            placeholder="Ej: 1478"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <i className="fas fa-times me-1"></i> Cancelar
        </Button>
        <Button variant="success" onClick={handleGenerar} disabled={loading}>
          {loading
            ? <><i className="fas fa-spinner fa-spin me-2"></i>Generando...</>
            : <><i className="fas fa-file-excel me-2"></i>Generar Trazabilidad</>
          }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}