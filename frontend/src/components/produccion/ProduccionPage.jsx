import { useState, useEffect } from 'react'
import { Container, Button, Alert, Spinner, Table, Badge, Collapse, Card } from 'react-bootstrap'
import OPModal from './OPModal'
import ProduccionModal from './ProduccionModal'
import DetalleModal from './DetalleModal'
import { getOPs, createOP, updateOP, deleteOP, getProducciones, createProduccion, deleteProduccion, getDetalles, createDetalle, deleteDetalle } from '../../api/produccion'
import { getMaquinas, getProductos, getEmpresas } from '../../api/selects'
import EtiquetaModal from './EtiquetaModal'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'




const estadoBadge = {
  pendiente: 'secondary',
  en_produccion: 'warning',
  completada: 'success',
  cancelada: 'danger'
}

const estadoLabel = {
  pendiente: 'Pendiente',
  en_produccion: 'En producción',
  completada: 'Completada',
  cancelada: 'Cancelada'
}

export default function ProduccionPage() {
  const [ops, setOps] = useState([])
  const [maquinas, setMaquinas] = useState([])
  const [productos, setProductos] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showEtiqueta, setShowEtiqueta] = useState(false)
  const [etiquetaData, setEtiquetaData] = useState({ detalle: null, produccion: null, op: null })

  // Estado expandido por OP
  const [opExpandida, setOpExpandida] = useState(null)
  const [producciones, setProducciones] = useState({})
  const [produccionExpandida, setProduccionExpandida] = useState(null)
  const [detalles, setDetalles] = useState({})

  // Modals
  const [showOPModal, setShowOPModal] = useState(false)
  const [opSeleccionada, setOpSeleccionada] = useState(null)
  const [showProduccionModal, setShowProduccionModal] = useState(false)
  const [opIdParaProduccion, setOpIdParaProduccion] = useState(null)
  const [showDetalleModal, setShowDetalleModal] = useState(false)
  const [produccionIdParaDetalle, setProduccionIdParaDetalle] = useState(null)
  const [hoveredProd, setHoveredProd] = useState(null)
  

    const handleVerEtiqueta = (detalle, produccion, op) => {
    setEtiquetaData({ detalle, produccion, op })
    setShowEtiqueta(true)
}
  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [opsRes, maqRes, prodRes, empRes] = await Promise.all([
        getOPs(), getMaquinas(), getProductos(), getEmpresas()
      ])
      setOps(opsRes.data)
      setMaquinas(maqRes.data)
      setProductos(prodRes.data)
      setEmpresas(empRes.data)
    } catch {
      setError('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarDatos() }, [])

  // --- OP expandible ---
  const toggleOP = async (opId) => {
    if (opExpandida === opId) {
      setOpExpandida(null)
      return
    }
    setOpExpandida(opId)
    setProduccionExpandida(null)
    if (!producciones[opId]) {
      const { data } = await getProducciones(opId)
      setProducciones(prev => ({ ...prev, [opId]: data }))
    }
  }

  // --- Produccion expandible ---
  const toggleProduccion = async (produccionId) => {
    if (produccionExpandida === produccionId) {
      setProduccionExpandida(null)
      return
    }
    setProduccionExpandida(produccionId)
    if (!detalles[produccionId]) {
      const { data } = await getDetalles(produccionId)
      setDetalles(prev => ({ ...prev, [produccionId]: data }))
    }
  }

  // --- Handlers OP ---
  const handleGuardarOP = async (data) => {
    try {
      if (opSeleccionada) {
        await updateOP(opSeleccionada.id, data)
      } else {
        await createOP(data)
      }
      setShowOPModal(false)
      setOpSeleccionada(null)
      cargarDatos()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar OP')
    }
  }

  const handleEliminarOP = async (id) => {
    if (!confirm('¿Eliminar esta orden de producción?')) return
    await deleteOP(id)
    cargarDatos()
  }

  // --- Handlers Produccion ---
  const handleGuardarProduccion = async (data) => {
    try {
      await createProduccion(data)
      setShowProduccionModal(false)
      const { data: updated } = await getProducciones(data.op_id)
      setProducciones(prev => ({ ...prev, [data.op_id]: updated }))
      cargarDatos()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar producción')
    }
  }

  const handleEliminarProduccion = async (produccionId, opId) => {
    if (!confirm('¿Eliminar este turno de producción?')) return
    await deleteProduccion(produccionId)
    const { data } = await getProducciones(opId)
    setProducciones(prev => ({ ...prev, [opId]: data }))
    cargarDatos()
  }

  // --- Handlers Detalle ---
  const handleGuardarDetalle = async (data) => {
    try {
      await createDetalle(data)
      setShowDetalleModal(false)
      const { data: updated } = await getDetalles(data.produccion_extrusora_id)
      setDetalles(prev => ({ ...prev, [data.produccion_extrusora_id]: updated }))
      // Refrescar producciones para actualizar kg
      const opId = opExpandida
      const { data: updatedProd } = await getProducciones(opId)
      setProducciones(prev => ({ ...prev, [opId]: updatedProd }))
      cargarDatos()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar detalle')
    }
  }

  const handleEliminarDetalle = async (detalleId, produccionId) => {
    if (!confirm('¿Eliminar este rollo?')) return
    await deleteDetalle(detalleId)
    const { data } = await getDetalles(produccionId)
    setDetalles(prev => ({ ...prev, [produccionId]: data }))
    const { data: updatedProd } = await getProducciones(opExpandida)
    setProducciones(prev => ({ ...prev, [opExpandida]: updatedProd }))
    cargarDatos()
  }

  const formatFecha = (fecha) => {
  if (!fecha) return ''
  const [y, m, d] = fecha.split('-')
  return `${d}-${m}-${y}`
}

  const exportarExcelOP = async (op) => {
  try {
    let prods = producciones[op.id]
    if (!prods) {
      const { data } = await getProducciones(op.id)
      prods = data
    }

    const detallesCompletos = {}
    for (const prod of prods) {
      let dets = detalles[prod.id]
      if (!dets) {
        const { data } = await getDetalles(prod.id)
        dets = data
      }
      detallesCompletos[prod.id] = dets
    }

    // Helper para formatear fecha dd-mm-yyyy
    const formatFecha = (fecha) => {
      if (!fecha) return ''
      const [y, m, d] = fecha.split('-')
      return `${d}-${m}-${y}`
    }

    const wb = XLSX.utils.book_new()

    // --- Hoja 1: Resumen OP ---
    const resumen = [
      { Campo: 'OP ID', Valor: op.id },
      { Campo: 'Lote', Valor: op.lote },
      { Campo: 'Máquina', Valor: op.maquina.nombre },
      { Campo: 'Calibre', Valor: op.calibre },
      { Campo: 'Producto', Valor: op.producto?.nombre || '—' },
      { Campo: 'Tipo Producto', Valor: op.producto?.tipo_producto?.nombre || '—' },
      { Campo: 'Cliente', Valor: op.empresa?.nombre || '—' },
      { Campo: 'OC Cliente', Valor: op.oc_cliente || '—' },
      { Campo: 'Estado', Valor: op.estado },
      { Campo: 'Kg Pedidos', Valor: op.kilos_a_producir },
      { Campo: 'Kg Producidos', Valor: op.kg_producidos_total },
      { Campo: 'Kg Faltantes', Valor: op.kilos_a_producir - op.kg_producidos_total },
    ]
    const ws1 = XLSX.utils.json_to_sheet(resumen)
    ws1['!cols'] = [{ wch: 20 }, { wch: 30 }]
    XLSX.utils.book_append_sheet(wb, ws1, 'Resumen OP')

    // --- Hoja 2: Turnos ---
    let kgAcumulado = 0
    const turnosData = prods.map(prod => {
      kgAcumulado += prod.kg_producidos
      return {
        'Producción ID': prod.id,
        'Fecha': formatFecha(prod.fecha),
        'Turno': prod.turno,
        'Kg Producidos': prod.kg_producidos,
        'Kg Faltantes': Math.max(op.kilos_a_producir - kgAcumulado, 0),
        'N° Rollos': detallesCompletos[prod.id]?.length || 0
      }
    })
    const ws2 = XLSX.utils.json_to_sheet(turnosData)
    ws2['!cols'] = [{ wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 16 }, { wch: 14 }, { wch: 12 }]
    XLSX.utils.book_append_sheet(wb, ws2, 'Turnos')

    // --- Hoja 3: Rollos ---
    let kgRollosAcumulado = 0
    const rollosData = []
    for (const prod of prods) {
      const dets = detallesCompletos[prod.id] || []
      for (const det of dets) {
        kgRollosAcumulado += det.kg
        rollosData.push({
          'Fecha': formatFecha(prod.fecha),
          'Turno': prod.turno,
          'N° Rollo': det.numero_rollo,
          'Producto': det.producto.nombre,
          'Ancho (mm)': det.ancho,
          'Espesor (mm)': det.espesor,
          'Kg Rollo': det.kg,
          'Kg Faltantes': Math.max(op.kilos_a_producir - kgRollosAcumulado, 0)
        })
      }
    }
    const ws3 = XLSX.utils.json_to_sheet(rollosData.length > 0 ? rollosData : [{ Mensaje: 'Sin rollos registrados' }])
    ws3['!cols'] = [{ wch: 14 }, { wch: 10 }, { wch: 10 }, { wch: 25 }, { wch: 12 }, { wch: 14 }, { wch: 10 }, { wch: 14 }]
    XLSX.utils.book_append_sheet(wb, ws3, 'Rollos')

    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), `OP-${op.lote}.xlsx`)

  } catch {
    setError('Error al exportar Excel')
  }
}

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-industry me-2"></i>
          Órdenes de Producción — Extrusora
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
              <th>Lote</th>
              <th>Máquina</th>
              <th>Calibre</th>
              <th>Tipo Producto</th>
              <th>Cliente</th>
              <th>OC Cliente</th>
              <th>Kg Pedido</th>
              <th>Kg Producido</th>
              <th>Kg Faltante</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ops.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center text-muted py-4">
                  <i className="fas fa-industry fa-2x mb-2 d-block"></i>
                  No hay órdenes de producción
                </td>
              </tr>
            ) : ops.map(op => (
              <>
                <tr key={op.id} style={{ cursor: 'pointer' }}>
                  <td onClick={() => toggleOP(op.id)}>
                    <i className={`fas fa-chevron-${opExpandida === op.id ? 'down' : 'right'} text-muted`}></i>
                  </td>
                  <td onClick={() => toggleOP(op.id)}>{op.id}</td>
                  <td onClick={() => toggleOP(op.id)}><strong>{op.lote}</strong></td>
                  <td onClick={() => toggleOP(op.id)}>{op.maquina.nombre}</td>
                  <td onClick={() => toggleOP(op.id)}>
                    <Badge bg={op.calibre === 'alta' ? 'dark' : 'secondary'}>{op.calibre}</Badge>
                  </td>
                  <td onClick={() => toggleOP(op.id)}>{op.producto?.tipo_producto?.nombre || <span className="text-muted">—</span>}</td>
                  <td onClick={() => toggleOP(op.id)}>{op.empresa?.nombre || <span className="text-muted">—</span>}</td>
                  <td onClick={() => toggleOP(op.id)}>{op.oc_cliente || <span className="text-muted">—</span>}</td>
                  <td onClick={() => toggleOP(op.id)}><strong>{op.kilos_a_producir} kg</strong></td>
                  <td onClick={() => toggleOP(op.id)}>
                    <span className="text-success fw-bold">{op.kg_producidos_total} kg</span>
                  </td>
                  <td onClick={() => toggleOP(op.id)}>
                    <span className={op.kg_faltantes > 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                      {op.kg_faltantes} kg
                    </span>
                  </td>
                  <td onClick={() => toggleOP(op.id)}>
                    <Badge bg={estadoBadge[op.estado]}>{estadoLabel[op.estado]}</Badge>
                  </td>
                  <td>
                    <Button size="sm" variant="outline-dark" className="me-1"
                      onClick={() => { setOpSeleccionada(op); setShowOPModal(true) }}>
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button size="sm" variant="outline-danger"
                      onClick={() => handleEliminarOP(op.id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                    <Button size="sm" variant="outline-success" className="me-1"
                        onClick={() => exportarExcelOP(op)}>
                        <i className="fas fa-file-excel"></i>
                    </Button>
                  </td>
                </tr>

                {/* Nivel 2: Producciones */}
                {opExpandida === op.id && (
                  <tr key={`prod-${op.id}`}>
                    <td colSpan={13} className="p-0">
                      <div className="bg-light px-4 py-3 border-start border-4 border-warning">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong><i className="fas fa-calendar-alt me-2 text-warning"></i>Turnos de {op.maquina.nombre}</strong>
                          <Button size="sm" variant="warning" onClick={() => { setOpIdParaProduccion(op.id); setShowProduccionModal(true) }}>
                            <i className="fas fa-plus me-1"></i>Agregar turno
                          </Button>
                        </div>
                        <Table size="sm" hover className="mb-0 bg-white">
                          <thead className="table-warning">
                            <tr>
                              <th style={{ width: 40 }}></th>
                              <th>Fecha</th>
                              <th>Turno</th>
                              <th>Kg Producidos</th>
                              <th>Kg Faltantes</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {(producciones[op.id] || []).length === 0 ? (
                              <tr>
                                <td colSpan={6} className="text-center text-muted py-2">Sin producciones registradas</td>
                              </tr>
                               ) : (() => {
                                            let kgAcumulado = 0
                                           
                                            return (producciones[op.id] || []).map(prod => {
                                                kgAcumulado += prod.kg_producidos
                                                const kgFaltantes = Math.max(op.kilos_a_producir - kgAcumulado, 0)
                                                return (
                              <>
                                <tr key={prod.id} style={{ cursor: 'pointer' }} onMouseEnter={() => setHoveredProd(prod.id)}
  onMouseLeave={() => setHoveredProd(null)} className="fila-produccion">
                                  <td onClick={() => toggleProduccion(prod.id)}>
                                    <i className={`fas fa-chevron-${produccionExpandida === prod.id ? 'down' : 'right'} text-muted`}></i>
                                  </td>
                                  <td onClick={() => toggleProduccion(prod.id)}>{formatFecha(prod.fecha)}</td>
                                  <td onClick={() => toggleProduccion(prod.id)}>
                                    <Badge bg="secondary">{prod.turno}</Badge>
                                  </td>
                                  <td onClick={() => toggleProduccion(prod.id)}>
                                    <span className="text-success fw-bold">{prod.kg_producidos} kg</span>
                                  </td>
                                  <td onClick={() => toggleProduccion(prod.id)}>
                                    <span className={kgFaltantes > 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                                      {kgFaltantes} kg
                                    </span>
                                  </td>
                                  <td  >
                                   <Button
                                        size="sm"
                                        variant="outline-danger"
                                        style={{ visibility: hoveredProd === prod.id ? 'visible' : 'hidden' }}
                                        onClick={() => handleEliminarProduccion(prod.id, op.id)}>
                                        <i className="fas fa-trash"></i>
                                        </Button>
                                  </td>
                                </tr>

                                {/* Nivel 3: Detalle */}
                                {produccionExpandida === prod.id && (
                                  <tr key={`det-${prod.id}`}>
                                    <td colSpan={6} className="p-0">
                                      <div className="bg-white px-4 py-3 border-start border-4 border-info">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                          <strong><i className="fas fa-list me-2 text-info"></i>Detalle de producción {formatFecha(prod.fecha)} <Badge bg="secondary">{prod.turno}</Badge> |  {op.maquina.nombre}  </strong> 
                                          <Button size="sm" variant="info" onClick={() => { setProduccionIdParaDetalle(prod.id); setShowDetalleModal(true) }}>
                                            <i className="fas fa-plus me-1"></i>Agregar rollo
                                          </Button>
                                        </div>
                                        <Table size="sm" hover className="mb-0">
                                          <thead className="table-info">
                                            <tr>
                                              <th>N° Rollo</th>
                                              <th>Producto</th>                                              
                                              <th>Ancho (cm)</th>
                                              <th>Espesor (mcr)</th>
                                              <th>Kg</th>
                                              <th>Acciones</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {(detalles[prod.id] || []).length === 0 ? (
                                              <tr>
                                                <td colSpan={6} className="text-center text-muted py-2">Sin rollos registrados</td>
                                              </tr>
                                            ) : (detalles[prod.id] || []).map(det => (
                                              <tr key={det.id}>
                                                <td><Badge bg="info" text="dark">#{det.numero_rollo}</Badge></td>
                                                <td>{det.producto.nombre}</td>
                                                
                                                <td>{det.ancho}</td>
                                                <td>{det.espesor}</td>
                                                <td><strong>{det.kg} kg</strong></td>
                                                <td>
                                                  <Button size="sm" variant="outline-danger"
                                                    onClick={() => handleEliminarDetalle(det.id, prod.id)}>
                                                    <i className="fas fa-trash"></i>
                                                  </Button>

                                                  <Button size="sm" variant="outline-success" className="me-1"
                                                        onClick={() => handleVerEtiqueta(det, prod, op)}>
                                                        <i className="fas fa-tag"></i>
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
                              </>
                                                        )
                                })
                                })()}
                                        </tbody>
                        </Table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </Table>
      )}

      <OPModal
        show={showOPModal}
        onHide={() => { setShowOPModal(false); setOpSeleccionada(null) }}
        onSave={handleGuardarOP}
        op={opSeleccionada}
        maquinas={maquinas}
        productos={productos}
        empresas={empresas}
      />

      <ProduccionModal
        show={showProduccionModal}
        onHide={() => setShowProduccionModal(false)}
        onSave={handleGuardarProduccion}
        opId={opIdParaProduccion}
      />

      <DetalleModal
        show={showDetalleModal}
        onHide={() => setShowDetalleModal(false)}
        onSave={handleGuardarDetalle}
        produccionId={produccionIdParaDetalle}
        productos={productos}
        kgPedidosOP={ops.find(o => o.id === opExpandida)?.kilos_a_producir || 0}
        kgActualesOP={ops.find(o => o.id === opExpandida)?.kg_producidos_total || 0}
        />

        <EtiquetaModal
            show={showEtiqueta}
            onHide={() => setShowEtiqueta(false)}
            detalle={etiquetaData.detalle}
            produccion={etiquetaData.produccion}
            op={etiquetaData.op}
        />
    </Container>
  )
}