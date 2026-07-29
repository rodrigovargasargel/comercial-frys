import { useState, useEffect } from 'react'
import { Container, Button, Spinner, Alert, Table, Form, Row, Col, Badge } from 'react-bootstrap'
import { getReporteMP, getExcelMP } from '../../api/reportes'

export default function ReporteMPPage() {
  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mes, setMes] = useState('')
  const [anio, setAnio] = useState('')

  const meses = [
    { value: 1, label: 'Enero' }, { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' }, { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' }, { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' }, { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' }, { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' }, { value: 12, label: 'Diciembre' },
  ]

  const anios = [2026, 2027, 2028, 2029, 2030]

  const thStyle = { fontSize: 'clamp(11px,1.2vw,13px)', padding: '6px 12px', whiteSpace: 'nowrap' }
  const tdStyle = { fontSize: 'clamp(11px,1.2vw,13px)', padding: '5px 12px', whiteSpace: 'nowrap' }

  const cargar = async () => {
    try {
      setLoading(true)
      const { data } = await getReporteMP(mes || null, anio || null)
      setDatos(data)
    } catch {
      setError('Error al cargar informe')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  const totalKg = datos.reduce((sum, r) => sum + r.total_kg, 0)

  // Agrupar por tipo
  const agrupado = datos.reduce((acc, r) => {
    if (!acc[r.tipo]) acc[r.tipo] = []
    acc[r.tipo].push(r)
    return acc
  }, {})

  return (
    <Container fluid className="py-3 px-2 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold">
          <i className="fas fa-boxes me-2"></i>
          Informe de Materia Prima
        </h5>
        <Button variant="success" size="sm" onClick={() => getExcelMP(mes || null, anio || null)}>
          <i className="fas fa-file-excel me-1"></i>Excel
        </Button>
      </div>

      {/* Filtros */}
      <div className="card shadow-sm mb-3">
        <div className="card-body py-2">
          <Row className="align-items-end g-2">
            <Col md={3}>
              <Form.Label className="small mb-1">Mes</Form.Label>
              <Form.Select size="sm" value={mes} onChange={e => setMes(e.target.value)}>
                <option value="">Todos los meses</option>
                {meses.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label className="small mb-1">Año</Form.Label>
              <Form.Select size="sm" value={anio} onChange={e => setAnio(e.target.value)}>
                <option value="">Todos los años</option>
                {anios.map(a => <option key={a} value={a}>{a}</option>)}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button variant="dark" size="sm" onClick={cargar} className="w-100">
                <i className="fas fa-search me-1"></i>Filtrar
              </Button>
            </Col>
            <Col md={2}>
              <Button variant="outline-secondary" size="sm" className="w-100"
                onClick={() => { setMes(''); setAnio(''); setTimeout(cargar, 100) }}>
                <i className="fas fa-times me-1"></i>Limpiar
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="dark" /></div>
      ) : datos.length === 0 ? (
        <div className="text-center text-muted py-5">Sin datos para el período seleccionado</div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <Table hover className="mb-0 align-middle">
              <thead style={{ background: '#1F3864', color: 'white' }}>
                <tr>
                  <th style={thStyle}>Tipo MP</th>
                  <th style={thStyle}>Color</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Total KG</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(agrupado).map(([tipo, items]) => (
                  <>
                    {items.map((r, i) => (
                      <tr key={`${tipo}-${i}`} style={{ background: i % 2 === 0 ? 'white' : '#f0f4f8' }}>
                        {i === 0 && (
                          <td style={{ ...tdStyle, fontWeight: 'bold' }} rowSpan={items.length}>
                            <Badge bg="dark">{tipo}</Badge>
                          </td>
                        )}
                        <td style={tdStyle}>{r.color}</td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                          <span className="text-primary fw-bold">{r.total_kg.toLocaleString()} kg</span>
                        </td>
                      </tr>
                    ))}
                    <tr style={{ background: '#EBF3FB' }}>
                      <td colSpan={2} style={{ ...tdStyle, textAlign: 'right', fontWeight: 'bold', color: '#1F3864' }}>
                        Subtotal {tipo}:
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 'bold', color: '#1F3864' }}>
                        {items.reduce((s, r) => s + r.total_kg, 0).toLocaleString()} kg
                      </td>
                    </tr>
                  </>
                ))}
                <tr style={{ background: '#1F3864' }}>
                  <td colSpan={2} style={{ ...tdStyle, textAlign: 'right', fontWeight: 'bold', color: 'white' }}>
                    TOTAL GENERAL:
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
                    {totalKg.toLocaleString()} kg
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  )
}