import axios from 'axios'
const API = axios.create({ baseURL: 'http://54.145.58.161:8000' })

export const getProductos = () => API.get('/productos/')
export const getTiposProducto = () => API.get('/productos/tipos-producto')
export const getUMedidas = () => API.get('/productos/u-medidas')
export const getTiposMaquina = () => API.get('/productos/tipos-maquina')
export const createProducto = (data) => API.post('/productos/', data)
export const updateProducto = (id, data) => API.put(`/productos/${id}`, data)
export const deleteProducto = (id) => API.delete(`/productos/${id}`)