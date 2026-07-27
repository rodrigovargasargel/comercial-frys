import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const getOCVentas = () => API.get('/oc-ventas/')
export const createOCVenta = (data) => API.post('/oc-ventas/', data)
export const updateOCVenta = (id, data) => API.put(`/oc-ventas/${id}`, data)
export const deleteOCVenta = (id) => API.delete(`/oc-ventas/${id}`)
export const exportarExcel = async () => {
  const API_URL = import.meta.env.VITE_API_URL
  const response = await fetch(`${API_URL}/oc-ventas/excel`)
  const blob = await response.blob()
  const xlsxBlob = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(xlsxBlob)
  link.download = 'OC_Ventas.xlsx'
  link.click()
  window.URL.revokeObjectURL(link.href)
}