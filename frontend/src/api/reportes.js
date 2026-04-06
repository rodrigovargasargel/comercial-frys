import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const getReporteSemana = (fecha) =>
  API.get('/reportes/semana', { params: fecha ? { fecha } : {} })

export const getExcelSemana = async (fecha) => {
  const API_URL = import.meta.env.VITE_API_URL
  const url = `${API_URL}/reportes/semana/excel${fecha ? `?fecha=${fecha}` : ''}`
  const response = await fetch(url)
  const blob = await response.blob()
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = `Produccion-${fecha || 'semana'}.xlsx`
  link.click()
  window.URL.revokeObjectURL(link.href)
}