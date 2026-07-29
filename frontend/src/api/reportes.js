import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const getReporteSemana = (fecha) =>
  API.get('/reportes/semana', { params: fecha ? { fecha } : {} })


export const getStock = () => API.get('/reportes/stock')
export const getTrazabilidadExtrusora = (params) => API.get('/reportes/stock/trazabilidad-extrusora', { params })
export const getTrazabilidadSelladora = (op_id) => API.get('/reportes/stock/trazabilidad-selladora', { params: { op_id } })

export const getExcelSemana = async (fecha) => {
  const API_URL = import.meta.env.VITE_API_URL
  const url = `${API_URL}/reportes/semana/excel${fecha ? `?fecha=${fecha}` : ''}`
  const response = await fetch(url)
  const blob = await response.blob()
  const xlsxBlob = new Blob([blob], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(xlsxBlob)
  link.download = `Produccion-${fecha || 'semana'}.xlsx`
  link.click()
  window.URL.revokeObjectURL(link.href)
}

export const getReporteMP = (mes, anio) => API.get('/reportes/mp', { params: { mes, anio } })

export const getExcelMP = async (mes, anio) => {
  const API_URL = import.meta.env.VITE_API_URL
  const params = new URLSearchParams()
  if (mes) params.append('mes', mes)
  if (anio) params.append('anio', anio)
  const response = await fetch(`${API_URL}/reportes/mp/excel?${params}`)
  const blob = await response.blob()
  const xlsxBlob = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(xlsxBlob)
  link.download = `Informe_MP.xlsx`
  link.click()
  window.URL.revokeObjectURL(link.href)
}