import axios from 'axios'
const API = axios.create({ baseURL: 'http://54.145.58.161:8000' })

export const getEmpresas = () => API.get('/empresas/')
export const createEmpresa = (data) => API.post('/empresas/', data)
export const updateEmpresa = (id, data) => API.put(`/empresas/${id}`, data)
export const deleteEmpresa = (id) => API.delete(`/empresas/${id}`)