import { useState, useEffect } from 'react'
import { Container, Button, Alert, Spinner } from 'react-bootstrap'
import ProductosTabla from './ProductosTabla'
import ProductoModal from './ProductoModal'
import { getProductos, getTiposProducto, getUMedidas, getTiposMaquina, createProducto, updateProducto, deleteProducto } from '../../api/productos'

export default function ProductosPage() {
  const [productos, setProductos] = useState([])
  const [tiposMaquina, setTiposMaquina] = useState([])
  const [tiposProducto, setTiposProducto] = useState([])
  const [uMedidas, setUMedidas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [prodRes, tiposMaqRes, tiposProdRes, uMedRes] = await Promise.all([
        getProductos(), getTiposMaquina(), getTiposProducto(), getUMedidas()
      ])
      setProductos(prodRes.data)
      setTiposMaquina(tiposMaqRes.data)
      setTiposProducto(tiposProdRes.data)
      setUMedidas(uMedRes.data)
    } catch {
      setError('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarDatos() }, [])

  const handleNuevo = () => { setProductoSeleccionado(null); setShowModal(true) }
  const handleEditar = (p) => { setProductoSeleccionado(p); setShowModal(true) }

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return
    await deleteProducto(id)
    cargarDatos()
  }

  const handleGuardar = async (data) => {
    try {
      if (productoSeleccionado) {
        await updateProducto(productoSeleccionado.id, data)
      } else {
        await createProducto(data)
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
          <i className="fas fa-boxes me-2"></i>
          Gestión de Productos
        </h2>
        <Button variant="dark" onClick={handleNuevo}>
          <i className="fas fa-plus me-2"></i>
          Nuevo Producto
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <ProductosTabla productos={productos} onEditar={handleEditar} onEliminar={handleEliminar} />
      )}

      <ProductoModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleGuardar}
        producto={productoSeleccionado}
        tiposMaquina={tiposMaquina}
        tiposProducto={tiposProducto}
        uMedidas={uMedidas}
      />
    </Container>
  )
}