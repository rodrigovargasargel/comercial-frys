import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const getMPs = () => API.get('/materia-prima/')
export const createMP = (data) => API.post('/materia-prima/', data)
export const updateMP = (id, data) => API.put(`/materia-prima/${id}`, data)
export const deleteMP = (id) => API.delete(`/materia-prima/${id}`)
export const getTiposMP = () => API.get('/materia-prima/tipos')
export const createTipoMP = (nombre) => API.post('/materia-prima/tipos', { nombre })
export const addDetalle = (mp_id, data) => API.post(`/materia-prima/${mp_id}/detalles`, data)
export const deleteDetalle = (detalle_id) => API.delete(`/materia-prima/detalles/${detalle_id}`)