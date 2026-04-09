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
  getMaquinasSelladoras, getProductosSelladora
} from '../../api/selladora'
import { getEmpresas,getUsuarios } from '../../api/selects'
import { getColores } from '../../api/produccion'


import GuiaSelladoraModal from './GuiaSelladoraModal'

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
  const [showProdModal, setShowProdModal] = useState(false)
  const [opIdParaProd, setOpIdParaProd] = useState(null)
  const [showDetalleModal, setShowDetalleModal] = useState(false)
  const [prodIdParaDetalle, setProdIdParaDetalle] = useState(null)
  const [opParaDetalle, setOpParaDetalle] = useState(null)
  const [showEtiqueta, setShowEtiqueta] = useState(false)
  const [etiquetaData, setEtiquetaData] = useState({ detalle: null, produccion: null, op: null })

  const [showGuia, setShowGuia] = useState(false)
  const [opParaGuia, setOpParaGuia] = useState(null)

  const thStyle = { fontSize: 'clamp(11px, 1.2vw, 13px)', whiteSpace: 'nowrap', padding: '6px 8px' }
  const tdStyle = { fontSize: 'clamp(11px, 1.2vw, 13px)', padding: '5px 8px', whiteSpace: 'nowrap' }
  const btnStyle = { padding: '2px 6px', fontSize: 'clamp(10px, 1vw, 12px)' }

  const [busqueda, setBusqueda] = useState('')

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [opsRes, empRes, colRes, maqRes, prodRes,usrRes] = await Promise.all([
        getOPsSelladora(), getEmpresas(), getColores(), getMaquinasSelladoras(), getProductosSelladora(),getUsuarios()
      ])
      
      setOps(opsRes.data)
      setEmpresas(empRes.data)
      setColores(colRes.data)
      setMaquinas(maqRes.data)
      setProductos(prodRes.data)
      setUsuarios(usrRes.data)
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

  const opsFiltradas = ops.filter(op => {
  if (!busqueda.trim()) return true
  const q = busqueda.toLowerCase()
  return (
    op.producto?.nombre?.toLowerCase().includes(q) ||
    op.color?.nombre?.toLowerCase().includes(q) ||
    op.empresa?.nombre?.toLowerCase().includes(q) ||
    op.estado?.toLowerCase().includes(q) ||
    String(op.id).includes(q) ||
    String(op.ancho).includes(q) ||
    String(op.espesor).includes(q)
  )
})

  return (
    <Container fluid className="py-3 px-2 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 fw-bold">
            <i className="fas fa-cut me-2"></i>
            Órdenes de Producción — Selladora
          </h5>
          <div className="d-flex gap-2 align-items-center">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar por cliente, producto, color..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{ width: 260 }}
            />
            <Button variant="dark" size="sm" onClick={() => { setOpSeleccionada(null); setShowOPModal(true) }}>
              <i className="fas fa-plus me-1"></i>Nueva OP
            </Button>
          </div>
        </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)} className="py-2 small">{error}</Alert>}

      {opExpandida && (
        <div className="op-overlay" onClick={() => setOpExpandida(null)} />
      )}

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="dark" /></div>
      ) : (
        <div style={{ overflowX: 'auto', position: 'relative' }}>
          <Table hover className="align-middle mb-0" style={{ minWidth: 900 }}>
            <thead className="table-dark">
              <tr>
                <th style={{ ...thStyle, width: 32 }}></th>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Fecha</th>
                <th style={thStyle}>Producto</th>
                <th style={thStyle}>Color</th>
                <th style={thStyle}>Ancho</th>
                <th style={thStyle}>Esp.</th>
                <th style={thStyle}>Largo</th>
                <th style={thStyle}>Unid. Ped.</th>
                <th style={thStyle}>Unid. Prod.</th>
                <th style={thStyle}>Unid. Falt.</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Cliente</th>
                <th style={thStyle}>Acc.</th>
              </tr>
            </thead>
            <tbody>
              {opsFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={14} className="text-center text-muted py-5">
                    <i className="fas fa-search fa-2x mb-2 d-block"></i>
                    No se encontraron resultados para "{busqueda}"
                  </td>
                </tr>
              ) : opsFiltradas.map(op => (
                <React.Fragment key={op.id}>
                  <tr style={{ cursor: 'pointer' }}
                    className={opExpandida === op.id ? 'op-row-activa' : ''}>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>
                      <i className={`fas fa-chevron-${opExpandida === op.id ? 'down' : 'right'} text-muted`}></i>
                    </td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.id}</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{formatFecha(op.fecha)}</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.producto?.nombre}</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.color?.nombre}</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.ancho} cm</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.espesor} µ</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.largo} cm</td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}><strong>{op.unidades.toLocaleString()}</strong></td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>
                      <span className="text-success fw-bold">{op.unidades_producidas.toLocaleString()}</span>
                    </td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>
                      <span className={op.unidades_faltantes > 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                        {op.unidades_faltantes.toLocaleString()}
                      </span>
                    </td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>
                      <Badge bg={estadoBadge[op.estado]} style={{ fontSize: 'clamp(9px,1vw,11px)' }}>{estadoLabel[op.estado]}</Badge>
                    </td>
                    <td style={tdStyle} onClick={() => toggleOP(op.id)}>{op.empresa?.nombre || '—'}</td>
                    <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>

                      {op.estado === 'pendiente' && (
                        <Button size="sm" variant="outline-danger" style={btnStyle}
                          onClick={() => handleEliminarOP(op.id)}>
                          <i className="fas fa-trash"></i>
                        </Button>
                      )}
                      <Button size="sm" variant="outline-dark" className="me-1" style={btnStyle}
                        onClick={() => { setOpSeleccionada(op); setShowOPModal(true) }}>
                        <i className="fas fa-edit"></i>
                      </Button>
                      

                      <Button size="sm" variant="outline-primary" className="me-1" style={btnStyle}
                          onClick={() => { setOpParaGuia(op); setShowGuia(true) }}>
                          <i className="fas fa-truck"></i>
                        </Button>
                    </td>
                    
                  </tr>

                  {/* Nivel 2: Turnos */}
                  {opExpandida === op.id && (
                    <tr className="op-expansion">
                      <td colSpan={14} className="p-0">
                        <div style={{
                          margin: '8px 12px',
                          background: '#fffdf0',
                          border: '2px solid #ffc107',
                          borderRadius: 8,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                          position: 'relative',
                          zIndex: 20,
                          maxWidth: '70%'
                        }}>
                          <div className="px-3 py-2 border-bottom border-warning d-flex justify-content-between align-items-center"
                            style={{ background: '#fff8e1', borderRadius: '6px 6px 0 0' }}>
                            <div className="d-flex gap-2 align-items-center">
                              <Button size="sm" variant="warning" style={btnStyle}
                                onClick={() => { setOpIdParaProd(op.id); setShowProdModal(true) }}>
                                <i className="fas fa-plus me-1"></i>Agregar turno
                              </Button>
                              <Button size="sm" variant="outline-secondary" style={btnStyle}
                                onClick={() => setOpExpandida(null)}>
                                <i className="fas fa-times"></i>
                              </Button>
                            </div>
                            <span style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: '#555' }}>
                              Turnos OP #{op.id}
                            </span>
                          </div>

                          <div className="px-3 py-2" style={{ overflowX: 'auto' }}>
                            {(producciones[op.id] || []).length === 0 ? (
                              <div className="text-center text-muted py-3 small">
                                <i className="fas fa-inbox me-2"></i>Sin turnos registrados
                              </div>
                            ) : (
                              <Table size="sm" hover className="mb-0 bg-white" style={{ minWidth: 500 }}>
                                <tbody>
                                  {(producciones[op.id] || []).map(prod => (
                                    <React.Fragment key={prod.id}>
                                      
                                      <tr style={{
                                        cursor: 'pointer',
                                        display: produccionExpandida && produccionExpandida !== prod.id ? 'none' : ''
                                      }}
                                        onMouseEnter={() => setHoveredProd(prod.id)}
                                        onMouseLeave={() => setHoveredProd(null)}>
                                        <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>
                                          <i className={`fas fa-chevron-${produccionExpandida === prod.id ? 'down' : 'right'} text-muted`}></i>
                                        </td>
                                        <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>{formatFecha(prod.fecha)}</td>
                                        <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>
                                          <Badge bg="secondary" style={{ fontSize: 'clamp(9px,1vw,11px)' }}>{prod.turno}</Badge>
                                        </td>
                                        <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>{prod.maquina?.nombre || '—'}</td>
                                        
                                        <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>
                                          <Badge bg="info" text="dark" style={{ fontSize: 'clamp(9px,1vw,11px)' }}>
                                            {(detalles[prod.id] || []).length} rollos
                                          </Badge>
                                        </td>

                                        <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>
                                          <span className="text-success fw-bold">{prod.unidades_producidas.toLocaleString()} unid.</span>
                                        </td>

                                        <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}>
                                          <span className="text-secondary fw-bold">
                                            {(detalles[prod.id] || []).reduce((sum, d) => sum + (d.q_paquetes || 0), 0).toLocaleString()} packs
                                          </span>
                                        </td>

                                        <td style={tdStyle} onClick={() => toggleProduccion(prod.id)}> <i className="fa fa-user"></i>
                                              {prod.usuario?.nombre || '—'}
                                        </td>
                                        <td style={tdStyle}>
                                          <Button size="sm" variant="outline-danger"
                                            style={{ ...btnStyle, visibility: hoveredProd === prod.id ? 'visible' : 'hidden' }}
                                            onClick={() => handleEliminarProduccion(prod.id, op.id)}>
                                            <i className="fas fa-trash"></i>
                                          </Button>
                                        </td>
                                      </tr>

                                      {/* Nivel 3: Detalles */}
                                      {produccionExpandida === prod.id && (
                                        <tr>
                                          <td colSpan={7} className="p-0">
                                            <div style={{
                                              margin: '8px 16px',
                                              background: 'white',
                                              border: '2px solid #0dcaf0',
                                              borderRadius: 8,
                                              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                              position: 'relative',
                                              zIndex: 30,
                                              display: 'inline-block',
                                              minWidth: 360,
                                              maxWidth: 680
                                            }}>
                                              <div className="px-3 py-2 border-bottom border-info d-flex justify-content-between align-items-center"
                                                style={{ background: '#f0fbff', borderRadius: '6px 6px 0 0' }}>
                                                <Button size="sm" variant="info" style={btnStyle}
                                                  onClick={() => {
                                                    setProdIdParaDetalle(prod.id)
                                                    setOpParaDetalle(op)
                                                    setShowDetalleModal(true)
                                                  }}>
                                                  <i className="fas fa-plus me-1"></i>Agregar rollo
                                                </Button>
                                                <span style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: '#555' }}>
                                                  {(detalles[prod.id] || []).length} rollos procesados
                                                </span>
                                              </div>

                                              <div className="px-3 py-2">
                                                {(detalles[prod.id] || []).length === 0 ? (
                                                  <div className="text-center text-muted py-2 small">
                                                    <i className="fas fa-inbox me-2"></i>Sin rollos
                                                  </div>
                                                ) : (
                                                  <Table size="sm" hover className="mb-0">
                                                    
                                                    <tbody>
                                                      {(detalles[prod.id] || []).map(det => (
                                                        <tr key={det.id}>
                                                          <td style={tdStyle}>
                                                            <Badge bg="info" text="dark" style={{ fontSize: 'clamp(9px,1vw,11px)' }}>
                                                              #{String(det.numero_rollo).padStart(3, '0')}
                                                            </Badge>
                                                          </td>
                                                          <td style={tdStyle}>{det.kilos}kg</td>
                                                          <td style={tdStyle}>{det.q_paquetes} Packs</td>
                                                          <td style={tdStyle}>{det.q_unidades_por_paquete} u. p/p</td>
                                                          <td style={tdStyle}><strong>{det.unidades.toLocaleString()} Unid.</strong></td>
                                                          <td style={tdStyle}>
                                                            <Button size="sm" variant="outline-info" className="me-1" style={btnStyle}
                                                              onClick={() => {
                                                                console.log(det)
                                                                setEtiquetaData({ detalle: det, produccion: prod, op, imprimir_kg: det.imprimir_kg })
                                                                setShowEtiqueta(true)
                                                              }}>
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
                                                )}
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </tbody>
                              </Table>
                            )}
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

      {etiquetaData.detalle && (
        <EtiquetaSelladoraModal
          show={showEtiqueta}
          onHide={() => setShowEtiqueta(false)}
          detalle={etiquetaData.detalle}
          produccion={etiquetaData.produccion}
          op={etiquetaData.op}
        />
      )}

      <style>{`
        .op-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 10;
          transition: opacity 0.3s;
        }
        .op-row-activa {
          position: relative;
          z-index: 20;
          background: white !important;
        }
        .op-row-activa td {
          background: white !important;
        }
        .op-expansion {
          position: relative;
          z-index: 20;
          background: white !important;
        }
        .op-expansion > td {
          background: white !important;
        }
      `}</style>


      {opParaGuia && (
  <GuiaSelladoraModal
    show={showGuia}
    onHide={() => { setShowGuia(false); setOpParaGuia(null) }}
    op={opParaGuia}
    empresas={empresas}
  />
    )}  

    <ProduccionSelladoraModal
      show={showProdModal}
      onHide={() => setShowProdModal(false)}
      onSave={handleGuardarProduccion}
      opId={opIdParaProd}
      maquinas={maquinas}
      usuarios={usuarios}
    />
    </Container>
  )
}