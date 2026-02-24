import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const getEmpresas = () => API.get('/empresas/')
export const createEmpresa = (data) => API.post('/empresas/', data)
export const updateEmpresa = (id, data) => API.put(`/empresas/${id}`, data)
export const deleteEmpresa = (id) => API.delete(`/empresas/${id}`)