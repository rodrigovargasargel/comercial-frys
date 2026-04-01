import React, { useState, useEffect } from 'react'
import { Container, Button, Alert, Spinner, Table, Badge } from 'react-bootstrap'
import OPSelladoraModal from './OPSelladoraModal'
import ProduccionSelladoraModal from './ProduccionSelladoraModal'
import DetalleSelladoraModal from './DetalleSelladoraModal'
import EtiquetaSelladoraModal from './EtiquetaSelladoraModal'
import {
  getOPsSelladora, createOPSelladora, updateOPSelladora, deleteOPSelladora,
  getProduccionesSelladora, createProduccionSelladora, deleteProduccionSelladora,
  getDetallesSelladora, createDetalleSelladora, deleteDetalleSelladora,
  getMaquinasSelladoras,getProductosSelladora 
} from '../../api/selladora'
import { getEmpresas } from '../../api/selects'
import { getColores } from '../../api/produccion'

const estadoBadge = {
  pendiente: 'secondary', en_produccion: 'warning',
  completada: 'success', cancelada: 'danger'
}
const estadoLabel = {
  pendiente: 'Pendiente', en_produccion: 'En producción',
  completada: 'Completada', cancelada: 'Cancelada'
}

const formatFecha = (fecha) => {
  if (!fecha) return ''
  const [y, m, d] = fecha.split('-')
  return `${d}-${m}-${y}`
}


export default function SelladoraPage() {
  const [ops, setOps] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [productos, setProductos] = useState([])
  const [colores, setColores] = useState([])
  const [maquinas, setMaquinas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [opExpandida, setOpExpandida] = useState(null)
  const [producciones, setProducciones] = useState({})
  const [produccionExpandida, setProduccionExpandida] = useState(null)
  const [detalles, setDetalles] = useState({})
  const [hoveredProd, setHoveredProd] = useState(null)

  const [showOPModal, setShowOPModal] = useState(false)
  const [opSeleccionada, setOpSeleccionada] = useState(null)
  const [showProdModal, setShowProdModal] = useState(false)
  const [opIdParaProd, setOpIdParaProd] = useState(null)
  const [showDetalleModal, setShowDetalleModal] = useState(false)
  const [prodIdParaDetalle, setProdIdParaDetalle] = useState(null)
  const [opParaDetalle, setOpParaDetalle] = useState(null)
  const [showEtiquetaSelladora, setShowEtiquetaSelladora] = useState(false)
const [etiquetaSelladoraData, setEtiquetaSelladoraData] = useState({ detalle: null, produccion: null, op: null })

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [opsRes, empRes, colRes, maqRes, prodRes] = await Promise.all([
          getOPsSelladora(), getEmpresas(), getColores(), getMaquinasSelladoras(), getProductosSelladora()
        ])
        setOps(opsRes.data)
        setEmpresas(empRes.data)
        setColores(colRes.data)
        setMaquinas(maqRes.data)
        setProductos(prodRes.data)

      // Cargar productos para el modal
      
    } catch {
      setError('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarDatos() }, [])

  const toggleOP = async (opId) => {
    if (opExpandida === opId) { setOpExpandida(null); return }
    setOpExpandida(opId)
    setProduccionExpandida(null)
    if (!producciones[opId]) {
      const { data } = await getProduccionesSelladora(opId)
      setProducciones(prev => ({ ...prev, [opId]: data }))
    }
  }

  const toggleProduccion = async (prodId) => {
    if (produccionExpandida === prodId) { setProduccionExpandida(null); return }
    setProduccionExpandida(prodId)
    if (!detalles[prodId]) {
      const { data } = await getDetallesSelladora(prodId)
      setDetalles(prev => ({ ...prev, [prodId]: data }))
    }
  }

  const handleGuardarOP = async (data) => {
    try {
      if (opSeleccionada) await updateOPSelladora(opSeleccionada.id, data)
      else await createOPSelladora(data)
      setShowOPModal(false)
      setOpSeleccionada(null)
      cargarDatos()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar OP')
    }
  }

  const handleEliminarOP = async (id) => {
    if (!confirm('¿Eliminar esta OP?')) return
    await deleteOPSelladora(id)
    cargarDatos()
  }

  const handleGuardarProduccion = async (data) => {
    try {
      await createProduccionSelladora(data)
      setShowProdModal(false)
      const { data: updated } = await getProduccionesSelladora(data.op_id)
      setProducciones(prev => ({ ...prev, [data.op_id]: updated }))
      cargarDatos()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar turno')
    }
  }

  const handleEliminarProduccion = async (prodId, opId) => {
    if (!confirm('¿Eliminar este turno?')) return
    await deleteProduccionSelladora(prodId)
    const { data } = await getProduccionesSelladora(opId)
    setProducciones(prev => ({ ...prev, [opId]: data }))
    cargarDatos()
  }

  const handleGuardarDetalle = async (data) => {
    try {
      await createDetalleSelladora(data)
      setShowDetalleModal(false)
      const { data: updatedDets } = await getDetallesSelladora(data.produccion_selladora_id)
      setDetalles(prev => ({ ...prev, [data.produccion_selladora_id]: updatedDets }))
      const { data: updatedProd } = await getProduccionesSelladora(opExpandida)
      setProducciones(prev => ({ ...prev, [opExpandida]: updatedProd }))
      cargarDatos()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar detalle')
    }
  }

  const handleEliminarDetalle = async (detId, prodId) => {
    if (!confirm('¿Eliminar este rollo?')) return
    await deleteDetalleSelladora(detId)
    const { data } = await getDetallesSelladora(prodId)
    setDetalles(prev => ({ ...prev, [prodId]: data }))
    const { data: updatedProd } = await getProduccionesSelladora(opExpandida)
    setProducciones(prev => ({ ...prev, [opExpandida]: updatedProd }))
    cargarDatos()
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-cut me-2"></i>
          Órdenes de Producción — Selladora
        </h2>
        <Button variant="dark" onClick={() => { setOpSeleccionada(null); setShowOPModal(true) }}>
          <i className="fas fa-plus me-2"></i>Nueva OP
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="dark" /></div>
      ) : (
        <Table hover responsive className="align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: 40 }}></th>
              <th>#</th>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Color</th>
              <th>Ancho</th>
              <th>Espesor</th>
              <th>Largo</th>
              <th>Unid. Pedidas</th>
              <th>Unid. Producidas</th>
              <th>Unid. Faltantes</th>
              <th>Estado</th>
              <th>Cliente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ops.length === 0 ? (
              <tr>
                <td colSpan={14} className="text-center text-muted py-5">
                  <i className="fas fa-cut fa-2x mb-2 d-block"></i>
                  No hay órdenes de producción
                </td>
              </tr>
            ) : ops.map(op => (
              <React.Fragment key={op.id}>
                <tr style={{ cursor: 'pointer' }}>
                  <td onClick={() => toggleOP(op.id)}>
                    <i className={`fas fa-chevron-${opExpandida === op.id ? 'down' : 'right'} text-muted`}></i>
                  </td>
                  <td onClick={() => toggleOP(op.id)}>{op.id}</td>
                  <td onClick={() => toggleOP(op.id)}>{formatFecha(op.fecha)}</td>
                  <td onClick={() => toggleOP(op.id)}>{op.producto?.nombre}</td>
                  <td onClick={() => toggleOP(op.id)}>{op.color?.nombre}</td>
                  <td onClick={() => toggleOP(op.id)}>{op.ancho} cm</td>
                  <td onClick={() => toggleOP(op.id)}>{op.espesor} µ</td>
                  <td onClick={() => toggleOP(op.id)}>{op.largo} cm</td>
                  <td onClick={() => toggleOP(op.id)}><strong>{op.unidades.toLocaleString()}</strong></td>
                  <td onClick={() => toggleOP(op.id)}>
                    <span className="text-success fw-bold">{op.unidades_producidas.toLocaleString()}</span>
                  </td>
                  <td onClick={() => toggleOP(op.id)}>
                    <span className={op.unidades_faltantes > 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                      {op.unidades_faltantes.toLocaleString()}
                    </span>
                  </td>
                  <td onClick={() => toggleOP(op.id)}>
                    <Badge bg={estadoBadge[op.estado]}>{estadoLabel[op.estado]}</Badge>
                  </td>
                  <td onClick={() => toggleOP(op.id)}>{op.empresa?.nombre || <span className="text-muted">—</span>}</td>
                  <td>
                    <Button size="sm" variant="outline-dark" className="me-1"
                      onClick={() => { setOpSeleccionada(op); setShowOPModal(true) }}>
                      <i className="fas fa-edit"></i>
                    </Button>
                    {op.estado === 'pendiente' && (
                      <Button size="sm" variant="outline-danger" onClick={() => handleEliminarOP(op.id)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
                  </td>
                </tr>

                {/* Nivel 2: Turnos */}
                {opExpandida === op.id && (
                  <tr>
                    <td colSpan={14} className="p-0">
                      <div className="bg-light px-4 py-3 border-start border-4 border-warning">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong><i className="fas fa-calendar-alt me-2 text-warning"></i>Turnos OP #{op.id}</strong>
                          <Button size="sm" variant="warning"
                            onClick={() => { setOpIdParaProd(op.id); setShowProdModal(true) }}>
                            <i className="fas fa-plus me-1"></i>Agregar turno
                          </Button>
                        </div>
                        <Table size="sm" hover className="mb-0 bg-white">
                          <thead className="table-warning">
                            <tr>
                              <th style={{ width: 40 }}></th>
                              <th>Fecha</th>
                              <th>Turno</th>
                              <th>Máquina</th>
                              <th>Unidades Producidas</th>
                              <th>Rollos</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(producciones[op.id] || []).length === 0 ? (
                              <tr><td colSpan={7} className="text-center text-muted py-2">Sin turnos</td></tr>
                            ) : (producciones[op.id] || []).map(prod => (
                              <React.Fragment key={prod.id}>
                                <tr style={{ cursor: 'pointer' }}
                                  onMouseEnter={() => setHoveredProd(prod.id)}
                                  onMouseLeave={() => setHoveredProd(null)}>
                                  <td onClick={() => toggleProduccion(prod.id)}>
                                    <i className={`fas fa-chevron-${produccionExpandida === prod.id ? 'down' : 'right'} text-muted`}></i>
                                  </td>
                                  <td onClick={() => toggleProduccion(prod.id)}>{formatFecha(prod.fecha)}</td>
                                  <td onClick={() => toggleProduccion(prod.id)}>
                                    <Badge bg="secondary">{prod.turno}</Badge>
                                  </td>
                                  <td onClick={() => toggleProduccion(prod.id)}>{prod.maquina?.nombre || '—'}</td>
                                  <td onClick={() => toggleProduccion(prod.id)}>
                                    <span className="text-success fw-bold">{prod.unidades_producidas.toLocaleString()}</span>
                                  </td>
                                  <td onClick={() => toggleProduccion(prod.id)}>
                                    <Badge bg="info" text="dark">{(detalles[prod.id] || []).length} rollos</Badge>
                                  </td>
                                  <td>
                                    <Button size="sm" variant="outline-danger"
                                      style={{ visibility: hoveredProd === prod.id ? 'visible' : 'hidden' }}
                                      onClick={() => handleEliminarProduccion(prod.id, op.id)}>
                                      <i className="fas fa-trash"></i>
                                    </Button>
                                  </td>
                                </tr>

                                {/* Nivel 3: Detalles */}
                                {produccionExpandida === prod.id && (
                                  <tr>
                                    <td colSpan={7} className="p-0">
                                      <div className="bg-white px-4 py-3 border-start border-4 border-info">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                          <strong><i className="fas fa-list me-2 text-info"></i>Rollos procesados</strong>
                                          <Button size="sm" variant="info"
                                            onClick={() => {
                                              setProdIdParaDetalle(prod.id)
                                              setOpParaDetalle(op)
                                              setShowDetalleModal(true)
                                            }}>
                                            <i className="fas fa-plus me-1"></i>Agregar rollo
                                          </Button>
                                        </div>
                                        <Table size="sm" hover className="mb-0">
                                          <thead className="table-info">
                                            <tr>
                                              <th>Rollo Extrusora</th>
                                              <th>KG Rollo</th>
                                              <th>Paquetes</th>
                                              <th>Unid/Paquete</th>
                                              <th>Total Unidades</th>
                                              <th>Acciones</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {(detalles[prod.id] || []).length === 0 ? (
                                              <tr><td colSpan={6} className="text-center text-muted py-2">Sin rollos</td></tr>
                                            ) : (detalles[prod.id] || []).map(det => (
                                              <tr key={det.id}>
                                                <td><Badge bg="info" text="dark">#{String(det.numero_rollo).padStart(3, '0')}</Badge></td>
                                                <td>{det.kilos} kg</td>
                                                <td>{det.q_paquetes}</td>
                                                <td>{det.q_unidades_por_paquete}</td>
                                                <td><strong>{det.unidades.toLocaleString()}</strong></td>
                                                <td>
                                                  <Button size="sm" variant="outline-info" className="me-1"
                                                onClick={() => {
                                                  setEtiquetaSelladoraData({ detalle: det, produccion: prod, op })
                                                  setShowEtiquetaSelladora(true)
                                                }}>
                                                <i className="fas fa-tag"></i>
                                              </Button>
                                                  <Button size="sm" variant="outline-danger"
                                                    onClick={() => handleEliminarDetalle(det.id, prod.id)}>
                                                    <i className="fas fa-trash"></i>
                                                  </Button>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </Table>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      )}

      <OPSelladoraModal
        show={showOPModal}
        onHide={() => { setShowOPModal(false); setOpSeleccionada(null) }}
        onSave={handleGuardarOP}
        op={opSeleccionada}
        empresas={empresas}
        productos={productos}
        colores={colores}
      />

      <ProduccionSelladoraModal
        show={showProdModal}
        onHide={() => setShowProdModal(false)}
        onSave={handleGuardarProduccion}
        opId={opIdParaProd}
        maquinas={maquinas}
      />

      {opParaDetalle && (
        <DetalleSelladoraModal
          show={showDetalleModal}
          onHide={() => { setShowDetalleModal(false); setOpParaDetalle(null) }}
          onSave={handleGuardarDetalle}
          produccionId={prodIdParaDetalle}
          op={opParaDetalle}
        />
      )}

      {etiquetaSelladoraData.detalle && (
          <EtiquetaSelladoraModal
            show={showEtiquetaSelladora}
            onHide={() => { setShowEtiquetaSelladora(false) }}
            detalle={etiquetaSelladoraData.detalle}
            produccion={etiquetaSelladoraData.produccion}
            op={etiquetaSelladoraData.op}
          />
        )}
    </Container>
  )
}