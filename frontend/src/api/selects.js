import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const getMaquinas = () => API.get('/maquinas/')
export const getProductos = () => API.get('/productos/')
export const getEmpresas = () => API.get('/empresas/')