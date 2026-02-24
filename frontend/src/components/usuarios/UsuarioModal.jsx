import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const perfiles = [
  { id: 1, nombre: 'admin' },
  { id: 2, nombre: 'jefe' },
  { id: 3, nombre: 'operario' },
]

const initialForm = {
  nombre: '',
  email: '',
  password: '',
  perfil_id: 1,
  activo: true,
}

export default function UsuarioModal({ show, onHide, onSave, usuario }) {
  const [form, setForm] = useState(initialForm)
  const esEdicion = !!usuario

  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre,
        email: usuario.email,
        password: '',
        perfil_id: usuario.perfil_id,
        activo: usuario.activo,
      })
    } else {
      setForm(initialForm)
    }
  }, [usuario])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...form, perfil_id: parseInt(form.perfil_id) }
    if (esEdicion && !data.password) delete data.password
    onSave(data)
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className={`fas ${esEdicion ? 'fa-user-edit' : 'fa-user-plus'} me-2`}></i>
          {esEdicion ? 'Editar Usuario' : 'Nuevo Usuario'}
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
              placeholder="Nombre completo"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="correo@ejemplo.com"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{esEdicion ? 'Nueva Contraseña (dejar vacío para no cambiar)' : 'Contraseña'}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!esEdicion}
              placeholder="••••••••"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Perfil</Form.Label>
            <Form.Select name="perfil_id" value={form.perfil_id} onChange={handleChange}>
              {perfiles.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {esEdicion && (
            <Form.Check
              type="switch"
              name="activo"
              label="Usuario activo"
              checked={form.activo}
              onChange={handleChange}
            />
          )}
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