import axios from 'axios'
const API = axios.create({ baseURL: 'http://54.145.58.161:8000' })

export const getOPs = () => API.get('/produccion/ops')
export const createOP = (data) => API.post('/produccion/ops', data)
export const updateOP = (id, data) => API.put(`/produccion/ops/${id}`, data)
export const deleteOP = (id) => API.delete(`/produccion/ops/${id}`)

export const getProducciones = (opId) => API.get(`/produccion/ops/${opId}/producciones`)
export const createProduccion = (data) => API.post('/produccion/producciones', data)
export const deleteProduccion = (id) => API.delete(`/produccion/producciones/${id}`)

export const getDetalles = (produccionId) => API.get(`/produccion/producciones/${produccionId}/detalles`)
export const createDetalle = (data) => API.post('/produccion/detalles', data)
export const deleteDetalle = (id) => API.delete(`/produccion/detalles/${id}`)