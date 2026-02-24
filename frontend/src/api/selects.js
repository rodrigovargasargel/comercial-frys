import axios from 'axios'
const API = axios.create({ baseURL: 'http://localhost:8000' })

export const getMaquinas = () => API.get('/maquinas/')
export const getProductos = () => API.get('/productos/')
export const getEmpresas = () => API.get('/empresas/')