import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const initialForm = { nombre: '', tipo_maquina_id: '', url_foto: '' }

export default function MaquinaModal({ show, onHide, onSave, maquina, tipos }) {
  const [form, setForm] = useState(initialForm)
  const esEdicion = !!maquina

  useEffect(() => {
    if (maquina) {
      setForm({
        nombre: maquina.nombre,
        tipo_maquina_id: maquina.tipo_maquina_id,
        url_foto: maquina.url_foto || ''
      })
    } else {
      setForm({ ...initialForm, tipo_maquina_id: tipos[0]?.id || '' })
    }
  }, [maquina, tipos])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...form, tipo_maquina_id: parseInt(form.tipo_maquina_id) })
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className={`fas ${esEdicion ? 'fa-edit' : 'fa-plus'} me-2`}></i>
          {esEdicion ? 'Editar Máquina' : 'Nueva Máquina'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              placeholder="Nombre de la máquina"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de Máquina</Form.Label>
            <Form.Select name="tipo_maquina_id" value={form.tipo_maquina_id} onChange={handleChange} required>
              <option value="">Seleccionar tipo...</option>
              {tipos.map(t => (
                <option key={t.id} value={t.id}>{t.nombre}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL Foto <span className="text-muted">(opcional)</span></Form.Label>
            <Form.Control
              name="url_foto"
              value={form.url_foto}
              onChange={handleChange}
              placeholder="https://..."
            />
            {form.url_foto && (
              <div className="mt-2 text-center">
                <img src={form.url_foto} alt="preview" style={{ maxHeight: 120, borderRadius: 8 }}
                  onError={e => e.target.style.display = 'none'} />
              </div>
            )}
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