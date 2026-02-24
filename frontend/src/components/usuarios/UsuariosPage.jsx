import { useState, useEffect } from 'react'
import { Container, Button, Alert, Spinner } from 'react-bootstrap'
import UsuariosTabla from './UsuariosTabla'
import UsuarioModal from './UsuarioModal'
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../../api/usuarios'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)

  const cargarUsuarios = async () => {
    try {
      setLoading(true)
      const { data } = await getUsuarios()
      setUsuarios(data)
    } catch (e) {
      setError('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarUsuarios() }, [])

  const handleNuevo = () => {
    setUsuarioSeleccionado(null)
    setShowModal(true)
  }

  const handleEditar = (usuario) => {
    setUsuarioSeleccionado(usuario)
    setShowModal(true)
  }

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return
    await deleteUsuario(id)
    cargarUsuarios()
  }

  const handleGuardar = async (data) => {
    try {
      if (usuarioSeleccionado) {
        await updateUsuario(usuarioSeleccionado.id, data)
      } else {
        await createUsuario(data)
      }
      setShowModal(false)
      cargarUsuarios()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar usuario')
    }
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-users me-2"></i>
          Gestión de Usuarios
        </h2>
        <Button variant="dark" onClick={handleNuevo}>
          <i className="fas fa-plus me-2"></i>
          Nuevo Usuario
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <UsuariosTabla
          usuarios={usuarios}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      )}

      <UsuarioModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleGuardar}
        usuario={usuarioSeleccionado}
      />
    </Container>
  )
}