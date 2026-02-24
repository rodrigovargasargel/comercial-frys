import { useState, useEffect } from 'react'
import { Container, Button, Alert, Spinner } from 'react-bootstrap'
import MaquinasTabla from './MaquinasTabla'
import MaquinaModal from './MaquinaModal'
import { getMaquinas, getTiposMaquina, createMaquina, updateMaquina, deleteMaquina } from '../../api/maquinas'

export default function MaquinasPage() {
  const [maquinas, setMaquinas] = useState([])
  const [tipos, setTipos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null)

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [maqRes, tiposRes] = await Promise.all([getMaquinas(), getTiposMaquina()])
      setMaquinas(maqRes.data)
      setTipos(tiposRes.data)
    } catch {
      setError('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarDatos() }, [])

  const handleNuevo = () => { setMaquinaSeleccionada(null); setShowModal(true) }
  const handleEditar = (m) => { setMaquinaSeleccionada(m); setShowModal(true) }

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar esta máquina?')) return
    await deleteMaquina(id)
    cargarDatos()
  }

  const handleGuardar = async (data) => {
    try {
      if (maquinaSeleccionada) {
        await updateMaquina(maquinaSeleccionada.id, data)
      } else {
        await createMaquina(data)
      }
      setShowModal(false)
      cargarDatos()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar')
    }
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-cogs me-2"></i>
          Gestión de Máquinas
        </h2>
        <Button variant="dark" onClick={handleNuevo}>
          <i className="fas fa-plus me-2"></i>
          Nueva Máquina
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <MaquinasTabla maquinas={maquinas} onEditar={handleEditar} onEliminar={handleEliminar} />
      )}

      <MaquinaModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleGuardar}
        maquina={maquinaSeleccionada}
        tipos={tipos}
      />
    </Container>
  )
}