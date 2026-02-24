import { useState, useEffect } from 'react'
import { Container, Button, Alert, Spinner } from 'react-bootstrap'
import EmpresasTabla from './EmpresasTabla'
import EmpresaModal from './EmpresaModal'
import { getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa } from '../../api/empresas'

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null)

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const { data } = await getEmpresas()
      setEmpresas(data)
    } catch {
      setError('Error al cargar empresas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarDatos() }, [])

  const handleNuevo = () => { setEmpresaSeleccionada(null); setShowModal(true) }
  const handleEditar = (e) => { setEmpresaSeleccionada(e); setShowModal(true) }

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar esta empresa?')) return
    await deleteEmpresa(id)
    cargarDatos()
  }

  const handleGuardar = async (data) => {
    try {
      if (empresaSeleccionada) {
        await updateEmpresa(empresaSeleccionada.id, data)
      } else {
        await createEmpresa(data)
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
          <i className="fas fa-building me-2"></i>
          Gestión de Empresas
        </h2>
        <Button variant="dark" onClick={handleNuevo}>
          <i className="fas fa-plus me-2"></i>
          Nueva Empresa
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <EmpresasTabla empresas={empresas} onEditar={handleEditar} onEliminar={handleEliminar} />
      )}

      <EmpresaModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleGuardar}
        empresa={empresaSeleccionada}
      />
    </Container>
  )
}