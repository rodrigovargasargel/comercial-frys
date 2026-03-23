import React, { useState, useEffect, useRef } from 'react'
import { Container, Button, Alert, Spinner, Form, InputGroup, Badge, Modal } from 'react-bootstrap'
import { getColores, createColor, updateColor, deleteColor } from '../../api/colores'

export default function ColoresPage() {
  const [colores, setColores] = useState([])
  const [filtro, setFiltro] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [colorSeleccionado, setColorSeleccionado] = useState(null)
  const [nombre, setNombre] = useState('')
  const [saving, setSaving] = useState(false)
  const inputRef = useRef()

  const cargar = async () => {
    try {
      setLoading(true)
      const { data } = await getColores()
      setColores(data)
    } catch {
      setError('Error al cargar colores')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  const abrirModal = (color = null) => {
    setColorSeleccionado(color)
    setNombre(color?.nombre || '')
    setShowModal(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleGuardar = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) return
    setSaving(true)
    try {
      if (colorSeleccionado) {
        await updateColor(colorSeleccionado.id, { nombre: nombre.trim() })
      } else {
        await createColor({ nombre: nombre.trim() })
      }
      setShowModal(false)
      cargar()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar este color?')) return
    try {
      await deleteColor(id)
      cargar()
    } catch {
      setError('No se puede eliminar, está siendo usado')
    }
  }

  const coloresFiltrados = colores.filter(c =>
    c.nombre.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-palette me-2"></i>
          Colores
        </h2>
        <Button variant="dark" onClick={() => abrirModal()}>
          <i className="fas fa-plus me-2"></i>Nuevo Color
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      {/* Buscador */}
      <div className="mb-3" style={{ maxWidth: 320 }}>
        <InputGroup>
          <InputGroup.Text><i className="fas fa-search"></i></InputGroup.Text>
          <Form.Control
            placeholder="Buscar color..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
          />
          {filtro && (
            <Button variant="outline-secondary" onClick={() => setFiltro('')}>
              <i className="fas fa-times"></i>
            </Button>
          )}
        </InputGroup>
      </div>

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="dark" /></div>
      ) : (
        <>
          {/* Stats */}
          <div className="mb-3 text-muted small">
            Mostrando <strong>{coloresFiltrados.length}</strong> de <strong>{colores.length}</strong> colores
          </div>

          {/* DataTable */}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: 60 }}>#</th>
                    <th>Nombre</th>
                    <th style={{ width: 120 }} className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {coloresFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center text-muted py-5">
                        <i className="fas fa-palette fa-2x mb-2 d-block"></i>
                        {filtro ? 'No se encontraron colores' : 'No hay colores registrados'}
                      </td>
                    </tr>
                  ) : coloresFiltrados.map((color, index) => (
                    <tr key={color.id}>
                      <td className="text-muted">{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div style={{
                            width: 16, height: 16, borderRadius: '50%',
                            background: getColorHex(color.nombre),
                            border: '1px solid #ccc', flexShrink: 0
                          }}></div>
                          <strong>{color.nombre}</strong>
                        </div>
                      </td>
                      <td className="text-center">
                        <Button size="sm" variant="outline-dark" className="me-1"
                          onClick={() => abrirModal(color)}>
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button size="sm" variant="outline-danger"
                          onClick={() => handleEliminar(color.id)}>
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>
            <i className={`fas ${colorSeleccionado ? 'fa-edit' : 'fa-plus'} me-2`}></i>
            {colorSeleccionado ? 'Editar Color' : 'Nuevo Color'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleGuardar}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nombre del color <span className="text-danger">*</span></Form.Label>
              <Form.Control
                ref={inputRef}
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Ej: Natural, Negro, Azul..."
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              <i className="fas fa-times me-1"></i> Cancelar
            </Button>
            <Button variant="dark" type="submit" disabled={saving || !nombre.trim()}>
              {saving
                ? <><i className="fas fa-spinner fa-spin me-1"></i> Guardando...</>
                : <><i className="fas fa-save me-1"></i> Guardar</>
              }
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

// Colores comunes con su hex aproximado
function getColorHex(nombre) {
  const mapa = {
    'natural': '#f5f0e8',
    'negro': '#222222',
    'blanco': '#ffffff',
    'rojo': '#e53935',
    'azul': '#1e88e5',
    'verde': '#43a047',
    'amarillo': '#fdd835',
    'naranja': '#fb8c00',
    'celeste': '#29b6f6',
    'transparente': '#e8f4f8',
    'gris': '#9e9e9e',
    'rosado': '#f48fb1',
    'morado': '#8e24aa',
  }
  return mapa[nombre.toLowerCase()] || '#cccccc'
}