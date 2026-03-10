import { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, Table, Badge } from 'react-bootstrap'

const initialForm = { fecha: '', empresa_id: '', oc: '', factura: '' }
const initialDetalle = { mp_tipo_id: '', color_id: '', kg: '' }

export default function MPModal({ show, onHide, onSave, mp, empresas, tiposMP, colores }) {
  const [form, setForm] = useState(initialForm)
  const [detalles, setDetalles] = useState([])
  const [detalle, setDetalle] = useState(initialDetalle)
  const esEdicion = !!mp

  useEffect(() => {
    if (show) {
      if (mp) {
        setForm({
          fecha: mp.fecha,
          empresa_id: mp.empresa.id,
          oc: mp.oc || '',
          factura: mp.factura || ''
        })
        setDetalles(mp.detalles || [])
      } else {
        const hoy = new Date().toISOString().split('T')[0]
        setForm({ ...initialForm, fecha: hoy })
        setDetalles([])
      }
      setDetalle(initialDetalle)
    }
  }, [show, mp])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDetalleChange = (e) => {
    const { name, value } = e.target
    setDetalle(prev => ({ ...prev, [name]: value }))
  }

  const handleAgregarDetalle = () => {
    if (!detalle.mp_tipo_id || !detalle.color_id || !detalle.kg) return
    const tipo = tiposMP.find(t => t.id === parseInt(detalle.mp_tipo_id))
    const color = colores.find(c => c.id === parseInt(detalle.color_id))
    setDetalles(prev => [...prev, {
      _temp: true,
      mp_tipo_id: parseInt(detalle.mp_tipo_id),
      color_id: parseInt(detalle.color_id),
      kg: parseFloat(detalle.kg),
      tipo,
      color
    }])
    setDetalle(initialDetalle)
  }

  const handleEliminarDetalle = (index) => {
    setDetalles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      fecha: form.fecha,
      empresa_id: parseInt(form.empresa_id),
      oc: form.oc || null,
      factura: form.factura || null,
      detalles: detalles.map(d => ({
        mp_tipo_id: d.mp_tipo_id,
        color_id: d.color_id,
        kg: d.kg
      }))
    })
  }

  const kgTotal = detalles.reduce((sum, d) => sum + d.kg, 0)

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className={`fas ${esEdicion ? 'fa-edit' : 'fa-plus'} me-2`}></i>
          {esEdicion ? 'Editar Materia Prima' : 'Nueva Materia Prima'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Datos cabecera */}
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha <span className="text-danger">*</span></Form.Label>
                <Form.Control type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Proveedor <span className="text-danger">*</span></Form.Label>
                <Form.Select name="empresa_id" value={form.empresa_id} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {empresas.filter(e => e.tipo_empresa === 'proveedor').map(e => (
                    <option key={e.id} value={e.id}>{e.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>OC</Form.Label>
                <Form.Control name="oc" value={form.oc} onChange={handleChange} placeholder="OC-001" />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Factura</Form.Label>
                <Form.Control name="factura" value={form.factura} onChange={handleChange} placeholder="F-001" />
              </Form.Group>
            </Col>
          </Row>

          <hr />

          {/* Agregar detalle */}
          <p className="fw-bold mb-2"><i className="fas fa-boxes me-2 text-secondary"></i>Detalle de materiales</p>
          <Row className="align-items-end mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Tipo MP</Form.Label>
                <Form.Select name="mp_tipo_id" value={detalle.mp_tipo_id} onChange={handleDetalleChange}>
                  <option value="">Seleccionar...</option>
                  {tiposMP.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Color</Form.Label>
                <Form.Select name="color_id" value={detalle.color_id} onChange={handleDetalleChange}>
                  <option value="">Seleccionar...</option>
                  {colores.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>KG</Form.Label>
                <Form.Control
                  type="number" step="0.01" name="kg"
                  value={detalle.kg} onChange={handleDetalleChange}
                  placeholder="0.00"
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button
                variant="dark" className="w-100"
                onClick={handleAgregarDetalle}
                disabled={!detalle.mp_tipo_id || !detalle.color_id || !detalle.kg}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </Col>
          </Row>

          {/* Tabla detalles */}
          {detalles.length > 0 && (
            <Table size="sm" hover className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Tipo MP</th>
                  <th>Color</th>
                  <th>KG</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((d, i) => (
                  <tr key={i}>
                    <td><Badge bg="secondary">{d.tipo?.nombre}</Badge></td>
                    <td>{d.color?.nombre}</td>
                    <td><strong>{d.kg} kg</strong></td>
                    <td>
                      <Button size="sm" variant="outline-danger" onClick={() => handleEliminarDetalle(i)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr className="table-secondary fw-bold">
                  <td colSpan={2} className="text-end">Total:</td>
                  <td>{kgTotal.toFixed(2)} kg</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            <i className="fas fa-times me-1"></i> Cancelar
          </Button>
          <Button variant="dark" type="submit" disabled={detalles.length === 0}>
            <i className="fas fa-save me-1"></i> Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}