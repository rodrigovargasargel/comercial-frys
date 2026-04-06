import React, { useState, useEffect } from 'react'
import { Container, Button, Alert, Spinner, Badge, Table } from 'react-bootstrap'
import { getReporteSemana, getExcelSemana } from '../../api/reportes'

const diasNombres = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie']

const formatFecha = (iso) => {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}`
}

const getLunesISO = (offset = 0) => {
  const hoy = new Date()
  const dia = hoy.getDay()
  const diff = dia === 0 ? -6 : 1 - dia
  const lunes = new Date(hoy)
  lunes.setDate(hoy.getDate() + diff + offset * 7)
  return lunes.toISOString().split('T')[0]
}

export default function ReporteSemanaPage() {
  const [semanaOffset, setSemanaOffset] = useState(0)
  const [fechaBase, setFechaBase] = useState(getLunesISO(0))
  const [reporte, setReporte] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [descargando, setDescargando] = useState(false)

  const cargar = async (fecha) => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await getReporteSemana(fecha)
      setReporte(data)
    } catch {
      setError('Error al cargar el reporte')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fecha = getLunesISO(semanaOffset)
    setFechaBase(fecha)
    cargar(fecha)
  }, [semanaOffset])

  const handleDescargar = async () => {
    setDescargando(true)
    try {
      await getExcelSemana(fechaBase)
    } catch {
      setError('Error al descargar Excel')
    } finally {
      setDescargando(false)
    }
  }

  const thBase = { fontSize: 'clamp(10px,1.1vw,12px)', padding: '4px 6px', whiteSpace: 'nowrap', textAlign: 'center' }
  const tdBase = { fontSize: 'clamp(10px,1.1vw,12px)', padding: '3px 6px', whiteSpace: 'nowrap' }

  const renderSeccion = (rows, titulo, colorFila, unidad) => {
    if (!rows || rows.length === 0) return (
      <tr>
        <td colSpan={12} className="text-center text-muted py-2 small">Sin datos de {titulo}</td>
      </tr>
    )
    return rows.map((row, idx) => (
      <tr key={idx} style={{ background: idx % 2 === 0 ? colorFila : '#fafafa' }}>
        <td style={{ ...tdBase, fontSize: 'clamp(9px,1vw,11px)', color: '#777' }}></td>
        <td style={{ ...tdBase, textAlign: 'left' }}>{row.label}</td>
        {reporte.dias.map((dia, i) => (
          <td key={`d-${i}`} style={{ ...tdBase, color: row.dia[dia] ? '#1a6b3a' : '#ccc', fontWeight: row.dia[dia] ? 'bold' : 'normal' }}>
            {row.dia[dia] || '—'}
          </td>
        ))}
        {reporte.dias.map((dia, i) => (
          <td key={`n-${i}`} style={{ ...tdBase, color: row.noche[dia] ? '#0d4f7a' : '#ccc', fontWeight: row.noche[dia] ? 'bold' : 'normal' }}>
            {row.noche[dia] || '—'}
          </td>
        ))}
      </tr>
    ))
  }

  return (
    <Container fluid className="py-3 px-2 px-md-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h5 className="mb-0 fw-bold">
          <i className="fas fa-chart-bar me-2"></i>
          Informe de Producción Semanal
        </h5>
        <div className="d-flex gap-2 align-items-center">
          <Button variant="outline-dark" size="sm" onClick={() => setSemanaOffset(o => o - 1)}>
            <i className="fas fa-chevron-left"></i>
          </Button>
          <Badge bg="dark" style={{ fontSize: 13, padding: '6px 12px' }}>
            {reporte ? `${formatFecha(reporte.lunes)} — ${formatFecha(reporte.viernes)}/${reporte.viernes?.split('-')[0]?.slice(2)}` : '...'}
          </Badge>
          <Button variant="outline-dark" size="sm"
            onClick={() => setSemanaOffset(o => o + 1)}
            disabled={semanaOffset >= 0}>
            <i className="fas fa-chevron-right"></i>
          </Button>
          <Button variant="outline-dark" size="sm" onClick={() => setSemanaOffset(0)}>
            Hoy
          </Button>
          <Button variant="success" size="sm" onClick={handleDescargar} disabled={descargando}>
            {descargando
              ? <><i className="fas fa-spinner fa-spin me-1"></i>Descargando...</>
              : <><i className="fas fa-file-excel me-1"></i>Excel</>
            }
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="dark" /></div>
      ) : reporte && (
        <div style={{ overflowX: 'auto' }}>
          <Table bordered className="mb-0" style={{ minWidth: 900, tableLayout: 'fixed' }}>
            <thead>
              {/* Fila turno */}
              <tr>
                <th style={{ ...thBase, width: 60, background: '#f0f3f8', color: 'white' }}></th>
                <th style={{ ...thBase, width: 220, background: '#eff1f5', color: 'white', textAlign: 'left' }}></th>
                <th colSpan={5} style={{ ...thBase, background: '#2E75B6', color: 'white' }}>
                   <i className="fas fa-sun me-1"></i>TURNO DIA
                </th>
                <th colSpan={5} style={{ ...thBase, background: '#1F3864', color: 'white' }}>
                  <i className="fas fa-moon me-1"></i>TURNO NOCHE
                </th>
              </tr>
              {/* Fila fechas */}
              <tr>
                <th style={{ ...thBase, background: '#f0f0f0' }}></th>
                <th style={{ ...thBase, background: '#f0f0f0' }}></th>
                {reporte.dias.map((dia, i) => (
                  <th key={`fd-${i}`} style={{ ...thBase, background: '#dce9f7', color: '#1F3864' }}>
                    {diasNombres[i]}<br/><span style={{ fontSize: 10 }}>{formatFecha(dia)}</span>
                  </th>
                ))}
                {reporte.dias.map((dia, i) => (
                  <th key={`fn-${i}`} style={{ ...thBase, background: '#c5d8ed', color: '#1F3864' }}>
                    {diasNombres[i]}<br/><span style={{ fontSize: 10 }}>{formatFecha(dia)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Sección Extrusora */}
              <tr>
                <td colSpan={2} style={{ background: '#1F3864', color: 'white', fontWeight: 'bold', fontSize: 11, padding: '4px 8px' }}>
                  <i className="fas fa-industry me-2"></i>EXTRUSORA (KG)
                </td>
                <td colSpan={5} style={{ ...thBase, background: '#2E75B6', color: 'white' }}>                 
                </td>
                <td colSpan={5} style={{ ...thBase, background: '#1F3864', color: 'white' }}>                  
                </td>
              </tr>
              {renderSeccion(reporte.extrusora, 'Extrusora', '#EBF3FB', 'kg')}

              {/* Sección Selladora */}
              <tr>
                <td colSpan={2} style={{ background: '#1F3864', color: 'white', fontWeight: 'bold', fontSize: 11, padding: '4px 8px' }}>
                  <i className="fas fa-cut me-2"></i>SELLADORA (UNIDADES)
                </td>
                <td colSpan={5} style={{ ...thBase, background: '#2E75B6', color: 'white' }}>                 
                </td>
                <td colSpan={5} style={{ ...thBase, background: '#1F3864', color: 'white' }}>                  
                </td>
              </tr>
              {renderSeccion(reporte.selladora, 'Selladora', '#FFF8E1', 'unidades')}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  )
}