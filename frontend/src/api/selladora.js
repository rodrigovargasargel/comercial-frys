import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const getOPsSelladora = () => API.get('/selladora/ops')
export const createOPSelladora = (data) => API.post('/selladora/ops', data)
export const updateOPSelladora = (id, data) => API.put(`/selladora/ops/${id}`, data)
export const deleteOPSelladora = (id) => API.delete(`/selladora/ops/${id}`)

export const getProduccionesSelladora = (opId) => API.get(`/selladora/ops/${opId}/producciones`)
export const createProduccionSelladora = (data) => API.post('/selladora/producciones', data)
export const deleteProduccionSelladora = (id) => API.delete(`/selladora/producciones/${id}`)

export const getDetallesSelladora = (prodId) => API.get(`/selladora/producciones/${prodId}/detalles`)
export const createDetalleSelladora = (data) => API.post('/selladora/detalles', data)
export const deleteDetalleSelladora = (id) => API.delete(`/selladora/detalles/${id}`)

export const getMaquinasSelladoras = () => API.get('/selladora/maquinas-selladoras')
export const getRollosDisponibles = (color_id, ancho, espesor) =>
  API.get('/selladora/rollos-disponibles', { params: { color_id, ancho, espesor } })

export const getProductosSelladora = () => API.get('/selladora/productos-selladora')
