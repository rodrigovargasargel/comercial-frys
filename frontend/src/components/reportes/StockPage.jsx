import React, { useState, useEffect } from 'react'
import { Container, Button, Spinner, Alert, Badge, Table } from 'react-bootstrap'
import { getStock, getTrazabilidadExtrusora, getTrazabilidadSelladora } from '../../api/reportes'

const formatFecha = (fecha) => {
  if (!fecha) return ''
  const [y, m, d] = fecha.split('-')
  return `${d}-${m}-${y}`
}

export default function StockPage() {
  const [stock, setStock] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [trazExt, setTrazExt] = useState({})
  const [trazSell, setTrazSell] = useState({})
  const [expandedExt, setExpandedExt] = useState(null)
  const [expandedSell, setExpandedSell] = useState(null)
  const [loadingTraz, setLoadingTraz] = useState(null)
  const [sortExt, setSortExt] = useState({ col: 'label', dir: 'asc' })
  const [sortSell, setSortSell] = useState({ col: 'label', dir: 'asc' })

  const thStyle = { fontSize: 'clamp(10px,1.1vw,12px)', padding: '5px 8px', whiteSpace: 'nowrap' }
  const tdStyle = { fontSize: 'clamp(10px,1.1vw,12px)', padding: '4px 8px', whiteSpace: 'nowrap' }

  const [busquedaExt, setBusquedaExt] = useState('') //buscador extrusion

  useEffect(() => { cargar() }, [])

  const cargar = async () => {
    try {
      setLoading(true)
      const { data } = await getStock()
      setStock(data)
    } catch {
      setError('Error al cargar stock')
    } finally {
      setLoading(false)
    }
  }

  const toggleTrazExt = async (item, key) => {
    if (expandedExt === key) { setExpandedExt(null); return }
    setExpandedExt(key)
    if (!trazExt[key]) {
      setLoadingTraz(`ext-${key}`)
      try {
        const { data } = await getTrazabilidadExtrusora({
          producto_id: item.producto_id,
          color_id: item.color_id,
          ancho: item.ancho,
          espesor: item.espesor,
          densidad: item.densidad
        })
        setTrazExt(prev => ({ ...prev, [key]: data }))
      } catch {
        setError('Error al cargar trazabilidad')
      } finally {
        setLoadingTraz(null)
      }
    }
  }

  const toggleTrazSell = async (item, key) => {
    if (expandedSell === key) { setExpandedSell(null); return }
    setExpandedSell(key)
    if (!trazSell[key]) {
      setLoadingTraz(`sell-${key}`)
      try {
        const { data } = await getTrazabilidadSelladora(item.op_id)
        setTrazSell(prev => ({ ...prev, [key]: data }))
      } catch {
        setError('Error al cargar trazabilidad')
      } finally {
        setLoadingTraz(null)
      }
    }
  }

  const sortData = (data, sort) => {
    return [...data].sort((a, b) => {
      const va = a[sort.col]
      const vb = b[sort.col]
      if (va < vb) return sort.dir === 'asc' ? -1 : 1
      if (va > vb) return sort.dir === 'asc' ? 1 : -1
      return 0
    })
  }

  const SortTh = ({ label, col, sort, setSort }) => {
    const active = sort.col === col
    return (
      <th style={{ ...thStyle, cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setSort({ col, dir: active && sort.dir === 'asc' ? 'desc' : 'asc' })}>
        {label} {active ? (sort.dir === 'asc' ? '↑' : '↓') : <span style={{ opacity: 0.3 }}>↕</span>}
      </th>
    )
  }
  // filtro buscador E
  const extFiltrada = (stock?.extrusora || []).filter(item => {
  if (!busquedaExt.trim()) return true
  return item.label.toLowerCase().includes(busquedaExt.toLowerCase())
  })

  return (
    <Container fluid className="py-3 px-2 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold">
          <i className="fas fa-warehouse me-2"></i>
          Stock Actual
        </h5>
        <Button variant="outline-dark" size="sm" onClick={cargar}>
          <i className="fas fa-sync me-1"></i>Actualizar
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="dark" /></div>
      ) : stock && (
        <div className="row g-3">

          {/* EXTRUSORA */}
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white py-2 d-flex justify-content-between align-items-center">
                  <span>
                    <i className="fas fa-industry me-2"></i>
                    <strong>EXTRUSORA (KG)</strong>
                  </span>
                    <input
                      type="text"
                      className="form-control form-control-sm w-auto"
                      placeholder="Buscar producto..."
                      value={busquedaExt}
                      onChange={e => setBusquedaExt(e.target.value)}
                      style={{ minWidth: 200, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
                    />
                </div>
              <div className="card-body p-0">
                <Table hover className="mb-0">
                  <thead style={{ background: '#2E75B6', color: 'white' }}>
                    <tr>
                      <th style={{ ...thStyle, width: 32 }}></th>
                      <SortTh label="Producto" col="label" sort={sortExt} setSort={setSortExt} />
                      <SortTh label="KG Total" col="kg_total" sort={sortExt} setSort={setSortExt} />
                      <SortTh label="Rollos Disp." col="rollos_disponibles" sort={sortExt} setSort={setSortExt} />
                      <SortTh label="Saldo KG" col="kg_saldo" sort={sortExt} setSort={setSortExt} />
                    </tr>
                  </thead>
                  <tbody>
                    {stock.extrusora.length === 0 ? (
                      <tr><td colSpan={5} className="text-center text-muted py-3">Sin registros</td></tr>
                    ) : sortData(extFiltrada, sortExt).map((item) => {
                      const key = `${item.producto_id}-${item.color_id}-${item.ancho}-${item.espesor}-${item.densidad}`
                      return (
                        <React.Fragment key={key}>
                          <tr style={{ cursor: 'pointer' }} onClick={() => toggleTrazExt(item, key)}>
                            <td style={tdStyle}>
                              <i className={`fas fa-chevron-${expandedExt === key ? 'down' : 'right'} text-muted`}></i>
                            </td>
                            <td style={tdStyle}>
                              <span className="text-primary fw-bold">{item.label}</span>
                            </td>
                            <td style={tdStyle}>
                              <Badge bg="info" text="dark">{item.kg_total} kg</Badge>
                            </td>
                            <td style={tdStyle}>
                              <Badge bg={item.rollos_disponibles > 0 ? 'success' : 'secondary'}>
                                {item.rollos_disponibles} rollos
                              </Badge>
                            </td>
                            <td style={tdStyle}>
                              <span className={item.kg_saldo > 0 ? 'text-success fw-bold' : 'text-muted'}>
                                {item.kg_saldo} kg
                              </span>
                            </td>
                          </tr>
                          {expandedExt === key && (
                            <tr>
                              <td colSpan={5} className="p-0">
                                <div style={{ margin: '4px 16px', border: '1px solid #0dcaf0', borderRadius: 6 }}>
                                  {loadingTraz === `ext-${key}` ? (
                                    <div className="text-center py-2"><Spinner size="sm" /></div>
                                  ) : (
                                    <Table size="sm" className="mb-0">
                                      <thead style={{ background: '#EBF3FB' }}>
                                        <tr>
                                          <th style={thStyle}>Fecha</th>
                                          <th style={thStyle}>E/S</th>
                                           <th style={thStyle}>#Rollo</th>
                                           <th style={thStyle}>KG</th>
                                            <th style={thStyle}>KG Usados</th>
                                            <th style={thStyle}>Cliente</th>
                                          <th style={thStyle}>Lote</th>
                                          <th style={thStyle}>NP Ext</th>
                                          <th style={thStyle}>NP SelL</th>                                        
                                         
                                          
                                          <th style={thStyle}>Prod. Sellado</th>
                                          
                                          <th style={thStyle}>Unidades</th>
                                         
                                          <th style={thStyle}>Saldo KG</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(trazExt[key] || []).length === 0 ? (
                                          <tr><td colSpan={12} className="text-center text-muted py-2 small">Sin movimientos</td></tr>
                                        ) : (trazExt[key] || []).map((t, i) => (
                                          <tr key={i} style={{ 
                                                background: t.es === 'S' 
                                                  ? 'rgba(220, 53, 69, 0.08)' 
                                                  : i % 2 === 0 ? 'white' : '#f8f9fa' 
                                              }}>
                                            <td style={tdStyle}>{formatFecha(t.fecha)}</td>
                                            <td style={tdStyle}>
                                              <Badge bg={t.es === 'E' ? 'success' : 'danger'}>{t.es}</Badge>
                                              {t.es === 'E' && t.kg_disponible_rollo > 0 && (
                                                <Badge bg="warning" text="dark" className="ms-1" style={{ fontSize: 'clamp(8px,0.9vw,10px)' }}>
                                                  Disp. {t.kg_disponible_rollo} kg
                                                </Badge>
                                              )}
                                            </td>

                                            <td style={tdStyle}>#{String(t.numero_rollo).padStart(3, '0')}</td>
                                            <td style={tdStyle}>{t.es === 'S' ? '—' : <strong>{t.kg} kg</strong>}</td>
                                            <td style={tdStyle}>
                                              {t.kg_ocupados !== null 
                                                ? <strong>{t.kg_ocupados} kg</strong> 
                                                : '—'}
                                            </td>
                                            <td style={tdStyle}>{t.cliente || '—'}</td>
                                            <td style={tdStyle}>{t.lote}</td>
                                            <td style={tdStyle}>{t.es === 'S' ? '—' : t.op_id}</td>
                                            <td style={tdStyle}>{t.op_sell_id || '—'}</td>                                         
                                            <td style={tdStyle}>{t.producto_sellado || '—'}</td>                                         
                                            
                                            <td style={tdStyle}>{t.unidades_producidas !== null ? t.unidades_producidas.toLocaleString() : '—'}</td>                                           
                                            <td style={tdStyle}>
                                              <span className={t.saldo_kg > 0 ? 'text-success fw-bold' : t.saldo_kg === 0 ? 'text-muted' : 'text-danger fw-bold'}>
                                                {t.saldo_kg} kg
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>

          {/* SELLADORA */}
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white py-2">
                <i className="fas fa-cut me-2"></i>
                <strong>SELLADORA (UNIDADES)</strong>
              </div>
              <div className="card-body p-0">
                <Table hover className="mb-0">
                  <thead style={{ background: '#2E75B6', color: 'white' }}>
                    <tr>
                      <th style={{ ...thStyle, width: 32 }}></th>
                      <SortTh label="Producto" col="label" sort={sortSell} setSort={setSortSell} />
                      <SortTh label="Unidades" col="unidades_total" sort={sortSell} setSort={setSortSell} />
                    </tr>
                  </thead>
                  <tbody>
                    {stock.selladora.length === 0 ? (
                      <tr><td colSpan={3} className="text-center text-muted py-3">Sin registros</td></tr>
                    ) : sortData(stock.selladora, sortSell).map((item) => {
                      const key = `sell-${item.op_id}`
                      return (
                        <React.Fragment key={key}>
                          <tr style={{ cursor: 'pointer' }} onClick={() => toggleTrazSell(item, key)}>
                            <td style={tdStyle}>
                              <i className={`fas fa-chevron-${expandedSell === key ? 'down' : 'right'} text-muted`}></i>
                            </td>
                            <td style={tdStyle}>
                              <span className="text-primary fw-bold">{item.label}</span>
                            </td>
                            <td style={tdStyle}>
                              <Badge bg="warning" text="dark">{item.unidades_total.toLocaleString()} unid</Badge>
                            </td>
                          </tr>
                          {expandedSell === key && (
                            <tr>
                              <td colSpan={3} className="p-0">
                                <div style={{ margin: '4px 16px', border: '1px solid #ffc107', borderRadius: 6 }}>
                                  {loadingTraz === `sell-${key}` ? (
                                    <div className="text-center py-2"><Spinner size="sm" /></div>
                                  ) : (
                                    <Table size="sm" className="mb-0">
                                      <thead style={{ background: '#fff8e1' }}>
                                        <tr>
                                          <th style={thStyle}>Fecha</th>
                                          <th style={thStyle}>Lote</th>
                                          <th style={thStyle}>E/S</th>
                                          <th style={thStyle}>Cantidad</th>
                                          <th style={thStyle}>Cliente</th>
                                          <th style={thStyle}>Saldo</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(trazSell[key] || []).length === 0 ? (
                                          <tr><td colSpan={6} className="text-center text-muted py-2 small">Sin movimientos</td></tr>
                                        ) : (trazSell[key] || []).map((t, i) => (
                                          <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#fffdf0' }}>
                                            <td style={tdStyle}>{formatFecha(t.fecha)}</td>
                                            <td style={tdStyle}>{t.lote}</td>
                                            <td style={tdStyle}><Badge bg="success">{t.es}</Badge></td>
                                            <td style={tdStyle}><strong>{t.cantidad.toLocaleString()}</strong></td>
                                            <td style={tdStyle}>{t.cliente || '—'}</td>
                                            <td style={tdStyle}>
                                              <span className="text-success fw-bold">{t.saldo.toLocaleString()}</span>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>

        </div>
      )}
    </Container>
  )
}
