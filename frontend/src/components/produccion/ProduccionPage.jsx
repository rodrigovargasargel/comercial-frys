

import React, { useState, useEffect } from 'react'
import { Container, Button, Alert, Spinner, Table, Badge } from 'react-bootstrap'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import OPModal from './OPModal'
import ProduccionModal from './ProduccionModal'
import DetalleModal from './DetalleModal'
import EtiquetaModal from './EtiquetaModal'
import PackingModal from './PackingModal'
import {
  getOPs, createOP, updateOP, deleteOP,
  getProducciones, createProduccion, deleteProduccion,
  getDetalles, createDetalle, deleteDetalle,
  getColores, getProductosExtrusora
} from '../../api/produccion'
import { getMaquinas, getEmpresas, getUsuarios } from '../../api/selects'

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

const formatFecha = (fecha) => {
  if (!fecha) return ''
  const [y, m, d] = fecha.split('-')
  return `${d}-${m}-${y}`
}

export default function ProduccionPage() {
  const [showPacking, setShowPacking] = useState(false)
  const [opParaPacking, setOpParaPacking] = useState(null)
  const [ops, setOps] = useState([])
  const [maquinas, setMaquinas] = useState([])
  const [productos, setProductos] = useState([])
  const [colores, setColores] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [opExpandida, setOpExpandida] = useState(null)
  const [producciones, setProducciones] = useState({})
  const [produccionExpandida, setProduccionExpandida] = useState(null)
  const [detalles, setDetalles] = useState({})
  const [hoveredProd, setHoveredProd] = useState(null)
  const [showOPModal, setShowOPModal] = useState(false)
  const [opSeleccionada, setOpSeleccionada] = useState(null)
  const [showProduccionModal, setShowProduccionModal] = useState(false)
  const [opIdParaProduccion, setOpIdParaProduccion] = useState(null)
  const [showDetalleModal, setShowDetalleModal] = useState(false)
  const [produccionIdParaDetalle, setProduccionIdParaDetalle] = useState(null)
  const [showEtiqueta, setShowEtiqueta] = useState(false)
  const [etiquetaData, setEtiquetaData] = useState({ detalle: null, produccion: null, op: null })

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [opsRes, maqRes, prodRes, colRes, empRes, usrRes] = await Promise.all([
        getOPs(), getMaquinas(), getProductosExtrusora(), getColores(), getEmpresas(), getUsuarios()
      ])
      setOps(opsRes.data)
      setMaquinas(maqRes.data)
      setProductos(prodRes.data)
      setColores(colRes.data)
      setEmpresas(empRes.data)
      setUsuarios(usrRes.data)
    } catch {
      setError('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarDatos() }, [])

  const getProximoRollo = (opId) => {
    const prods = producciones[opId] || []
    let max = 0
    for (const prod of prods) {
      const dets = detalles[prod.id] || []
      for (const det of dets) {
        if (det.numero_rollo > max) max = det.numero_rollo
      }
    }
    return max + 1
  }

  const toggleOP = async (opId) => {
    if (opExpandida === opId) { setOpExpandida(null); return }
    setOpExpandida(opId)
    setProduccionExpandida(null)
    if (!producciones[opId]) {
      const { data } = await getProducciones(opId)
      setProducciones(prev => ({ ...prev, [opId]: data }))
      for (const prod of data) {
        if (!detalles[prod.id]) {
          const { data: dets } = await getDetalles(prod.id)
          setDetalles(prev => ({ ...prev, [prod.id]: dets }))
        }
      }
    }
  }

  const toggleProduccion = async (produccionId) => {
    if (produccionExpandida === produccionId) { setProduccionExpandida(null); return }
    setProduccionExpandida(produccionId)
    if (!detalles[produccionId]) {
      const { data } = await getDetalles(produccionId)
      setDetalles(prev => ({ ...prev, [produccionId]: data }))
    }
  }

  const handleGuardarOP = async (data) => {
    try {
      if (opSeleccionada) await updateOP(opSeleccionada.id, data)
      else await createOP(data)
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
    if (!confirm('¿Eliminar este turno?')) return
    await deleteProduccion(produccionId)
    const { data } = await getProducciones(opId)
    setProducciones(prev => ({ ...prev, [opId]: data }))
    cargarDatos()
  }

  const handleGuardarDetalle = async (data) => {
    try {
      await createDetalle(data)
      setShowDetalleModal(false)
      const { data: updatedDets } = await getDetalles(data.produccion_extrusora_id)
      setDetalles(prev => ({ ...prev, [data.produccion_extrusora_id]: updatedDets }))
      const { data: updatedProd } = await getProducciones(opExpandida)
      setProducciones(prev => ({ ...prev, [opExpandida]: updatedProd }))
      cargarDatos()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al guardar rollo')
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

  const handleVerEtiqueta = (detalle, produccion, op) => {
    setEtiquetaData({ detalle, produccion, op })
    setShowEtiqueta(true)
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
      const wb = XLSX.utils.book_new()
      const wsData = []
      wsData.push(['FECHA','MAQUINA','TURNO','PRODUCTO (nombre + color + ancho x espesor + densidad)','CANT (kilos pedidos en OP)','LOTE','ROLLO','PESO','PENDIENTE'])
      wsData.push([formatFecha(op.fecha),'','',`${op.producto?.nombre} ${op.color?.nombre} ${op.ancho}x${op.espesor} ${op.densidad}`,op.kilos,'','','',op.kilos])
      let kgAcumulado = 0
      for (const prod of prods) {
        const dets = detallesCompletos[prod.id] || []
        wsData.push([formatFecha(prod.fecha),prod.maquina?.nombre,prod.turno,'','',prod.lote,'','',''])
        for (const det of dets) {
          kgAcumulado += det.kg
          wsData.push(['','','','','','',det.numero_rollo,det.kg,op.kilos - kgAcumulado])
        }
      }
      const ws = XLSX.utils.aoa_to_sheet(wsData)
      ws['!cols'] = [{wch:14},{wch:14},{wch:10},{wch:45},{wch:22},{wch:10},{wch:8},{wch:8},{wch:12}]
      XLSX.utils.book_append_sheet(wb, ws, 'Producción')
      const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      saveAs(new Blob([buf], { type: 'application/octet-stream' }), `OP-${op.id}-${op.producto?.nombre || ''}.xlsx`)
    } catch {
      setError('Error al exportar Excel')
    }
  }

  // Estilos responsivos
  const thStyle = { fontSize: 'clamp(11px, 1.2vw, 13px)', whiteSpace: 'nowrap', padding: '6px 8px' }
  const tdStyle = { fontSize: 'clamp(11px, 1.2vw, 13px)', padding: '5px 8px', whiteSpace: 'nowrap' }
  const btnStyle = { padding: '2px 6px', fontSize: 'clamp(10px, 1vw, 12px)' }

  return (
    <Container fluid className="py-3 px-2 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold">
          <i className="fas fa-industry me-2"></i>
          Notas de Pedido — Extrusora
        </h5>
        <Button variant="dark" size="sm" onClick={() => { setOpSeleccionada(null); setShowOPModal(true) }}>
          <i className="fas fa-plus me-1"></i>Nueva NP
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)} className="py-2 small">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="dark" /></div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <Table hover className="align-middle mb-0" style={{ minWidth: 900 }}>
            <thead className="table-dark">
              <tr>
                <th style={{ ...thStyle, width: 32 }}></th>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Fecha</th>
                <th style={thStyle}>Producto</th>
                <th style={thStyle}>Dens.</th>
                <th style={thStyle}>Color</th>
                <th style={thStyle}>Ancho</th>
                <th style={thStyle}>Esp.</th>
                <th style={thStyle}>Kg Ped.</th>
                <th style={thStyle}>Kg Prod.</th>
                <th style={thStyle}>Kg Falt.</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Cliente</th>
                <th style={thStyle}>Acc.</th>
              </tr>
            </thead>
            <tbody>
              {ops.length === 0 ? (
                <tr>
                  <td colSpan={14} className="text-center text-muted py-4">
                    <i className="fas fa-industry fa-2x mb-2 d-block"></i>
                    No hay órdenes de producción
                  </td>
                </tr>
              ) : ops.map(op => (
                <React.Fragment key={op.id}>
                  <tr style={{ cursor: 'pointer' }}>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>
                      <i className={`fas fa-chevron-${opExpandida === op.id ? 'down' : 'right'} text-muted`}></i>
                    </td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.id}</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{formatFecha(op.fecha)}</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.producto?.nombre}</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>
                      <Badge bg={op.densidad === 'alta' ? 'dark' : 'secondary'} style={{ fontSize: 'clamp(9px,1vw,11px)' }}>{op.densidad}</Badge>
                    </td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.color?.nombre}</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.ancho}mm</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.espesor}µ</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}><strong>{op.kilos}kg</strong></td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>
                      <span className="text-success fw-bold">{op.kg_producidos_total}kg</span>
                    </td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>
                      <span className={op.kg_faltantes > 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                        {op.kg_faltantes}kg
                      </span>
                    </td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>
                      <Badge bg={estadoBadge[op.estado]} style={{ fontSize: 'clamp(9px,1vw,11px)' }}>{estadoLabel[op.estado]}</Badge>
                    </td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.empresa?.nombre || '—'}</td>
                    <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                      <Button size="sm" title="Informe Excel" variant="outline-success" className="me-1" style={btnStyle} onClick={() => exportarExcelOP(op)}>
                        <i className="fas fa-file-excel"></i>
                      </Button>
                      <Button size="sm" title="Packing" variant="outline-primary" className="me-1" style={btnStyle} onClick={() => { setOpParaPacking(op); setShowPacking(true) }}>
                        <i className="fas fa-truck"></i>
                      </Button>
                      <Button size="sm"  title="Editar" variant="outline-dark" className="me-1" style={btnStyle} onClick={() => { setOpSeleccionada(op); setShowOPModal(true) }}>
                        <i className="fas fa-edit"></i>
                      </Button>
                      {op.estado === 'pendiente' && (
                        <Button size="sm" variant="outline-danger" style={btnStyle} onClick={() => handleEliminarOP(op.id)}>
                          <i className="fas fa-trash"></i>
                        </Button>
                      )}
                    </td>
                  </tr>

                  {/* Nivel 2: Turnos */}
                  {opExpandida === op.id && (
                    <tr>
                      <td colSpan={14} className="p-0">
                        <div className="bg-light px-3 py-2 border-start border-4 border-warning">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong style={{ fontSize: 'clamp(11px,1.2vw,13px)' }}>
                              <i className="fas fa-calendar-alt me-2 text-warning"></i>Turnos NP #{op.id}
                            </strong>
                            <Button size="sm" variant="warning" style={btnStyle}
                              onClick={() => { setOpIdParaProduccion(op.id); setShowProduccionModal(true) }}>
                              <i className="fas fa-plus me-1"></i>Agregar Extrusora
                            </Button>
                          </div>
                          <div style={{ overflowX: 'auto' }}>
                            <Table size="sm" hover className="mb-0 bg-white" style={{ minWidth: 700 }}>
                              <thead className="table-warning">
                                <tr>
                                  <th style={thStyle}></th>
                                  <th style={thStyle}>Máquina</th>
                                  <th style={thStyle}>Fecha</th>
                                  <th style={thStyle}>Turno</th>
                                  <th style={thStyle}>Lote</th>
                                  <th style={thStyle}>Operador</th>
                                  <th style={thStyle}>Kg Prod.</th>
                                  <th style={thStyle}>Kg Falt.</th>
                                  <th style={thStyle}>Rollos</th>
                                  <th style={thStyle}>Acc.</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(producciones[op.id] || []).length === 0 ? (
                                  <tr><td colSpan={10} className="text-center text-muted py-2 small">Sin turnos registrados</td></tr>
                                ) : (() => {
                                  let kgAcumulado = 0
                                  return (producciones[op.id] || []).map(prod => {
                                    kgAcumulado += prod.kg_producidos
                                    const kgFaltantes = Math.max(op.kilos - kgAcumulado, 0)
                                    return (
                                      <React.Fragment key={prod.id}>
                                        <tr style={{ cursor: 'pointer' }}
                                          onMouseEnter={() => setHoveredProd(prod.id)}
                                          onMouseLeave={() => setHoveredProd(null)}>
                                          <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>
                                            <i className={`fas fa-chevron-${produccionExpandida === prod.id ? 'down' : 'right'} text-muted`}></i>
                                          </td>
                                          <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>{prod.maquina?.nombre || '—'}</td>
                                          <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>{formatFecha(prod.fecha)}</td>
                                          <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>
                                            <Badge bg="secondary" style={{ fontSize: 'clamp(9px,1vw,11px)' }}>{prod.turno}</Badge>
                                          </td>
                                          <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>{prod.lote}</td>
                                          <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>{prod.usuario?.nombre || '—'}</td>
                                          <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>
                                            <span className="text-success fw-bold">{prod.kg_producidos}kg</span>
                                          </td>
                                          <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>
                                            <span className={kgFaltantes > 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}>{kgFaltantes}kg</span>
                                          </td>
                                          <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>
                                            <Badge bg="info" text="dark" style={{ fontSize: 'clamp(9px,1vw,11px)' }}>
                                              {(detalles[prod.id] || []).length}
                                            </Badge>
                                          </td>
                                          <td style={tdStyle}>
                                            <Button size="sm" variant="outline-danger" style={{ ...btnStyle, visibility: hoveredProd === prod.id ? 'visible' : 'hidden' }}
                                              onClick={() => handleEliminarProduccion(prod.id, op.id)}>
                                              <i className="fas fa-trash"></i>
                                            </Button>
                                          </td>
                                        </tr>

                                        {/* Nivel 3: Rollos */}
                                        {produccionExpandida === prod.id && (
                                          <tr>
                                            <td colSpan={10} className="p-0">
                                              <div className="bg-white px-3 py-2 border-start border-4 border-info">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                  <strong style={{ fontSize: 'clamp(11px,1.2vw,13px)' }}>
                                                    <i className="fas fa-list me-2 text-info"></i>
                                                    Rollos — próximo #{String(getProximoRollo(op.id)).padStart(3, '0')}
                                                  </strong>
                                                  <Button size="sm" variant="info" style={btnStyle}
                                                    onClick={() => { setProduccionIdParaDetalle(prod.id); setShowDetalleModal(true) }}>
                                                    <i className="fas fa-plus me-1"></i>Agregar rollo
                                                  </Button>
                                                </div>
                                                <Table size="sm" hover className="mb-0" style={{ maxWidth: 400 }}>
                                                  <thead className="table-info">
                                                    <tr>
                                                      <th style={thStyle}>N° Rollo</th>
                                                      <th style={thStyle}>Kg</th>
                                                      <th style={thStyle}>Acc.</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {(detalles[prod.id] || []).length === 0 ? (
                                                      <tr><td colSpan={3} className="text-center text-muted py-2 small">Sin rollos</td></tr>
                                                    ) : (detalles[prod.id] || []).map(det => (
                                                      <tr key={det.id}>
                                                        <td style={tdStyle}>
                                                          <Badge bg="info" text="dark" style={{ fontSize: 'clamp(9px,1vw,11px)' }}>
                                                            #{String(det.numero_rollo).padStart(3, '0')}
                                                          </Badge>
                                                        </td>
                                                        <td style={tdStyle}><strong>{det.kg}kg</strong></td>
                                                        <td style={tdStyle}>
                                                          <Button size="sm" variant="outline-info" className="me-1" style={btnStyle}
                                                            onClick={() => handleVerEtiqueta(det, prod, op)}>
                                                            <i className="fas fa-tag"></i>
                                                          </Button>
                                                          <Button size="sm" variant="outline-danger" style={btnStyle}
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
                                    )
                                  })
                                })()}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <OPModal
        show={showOPModal}
        onHide={() => { setShowOPModal(false); setOpSeleccionada(null) }}
        onSave={handleGuardarOP}
        op={opSeleccionada}
        productos={productos}
        colores={colores}
        empresas={empresas}
      />

      <ProduccionModal
        show={showProduccionModal}
        onHide={() => setShowProduccionModal(false)}
        onSave={handleGuardarProduccion}
        opId={opIdParaProduccion}
        maquinas={maquinas}
        usuarios={usuarios}
      />

      <DetalleModal
        show={showDetalleModal}
        onHide={() => setShowDetalleModal(false)}
        onSave={handleGuardarDetalle}
        produccionId={produccionIdParaDetalle}
        kgPedidosOP={ops.find(o => o.id === opExpandida)?.kilos || 0}
        kgActualesOP={ops.find(o => o.id === opExpandida)?.kg_producidos_total || 0}
        proximoRollo={getProximoRollo(opExpandida)}
      />

      <EtiquetaModal
        show={showEtiqueta}
        onHide={() => setShowEtiqueta(false)}
        detalle={etiquetaData.detalle}
        produccion={etiquetaData.produccion}
        op={etiquetaData.op}
      />

      {opParaPacking && (
        <PackingModal
          show={showPacking}
          onHide={() => { setShowPacking(false); setOpParaPacking(null) }}
          op={opParaPacking}
          empresas={empresas}
          producciones={producciones}
          detalles={detalles}
          getProducciones={getProducciones}
          getDetalles={getDetalles}
        />
      )}
    </Container>
  )
}