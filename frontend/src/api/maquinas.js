import axios from 'axios'

const API = axios.create({ baseURL: 'http://54.145.58.161:8000' })

export const getMaquinas = () => API.get('/maquinas/')
export const getTiposMaquina = () => API.get('/maquinas/tipos')
export const createMaquina = (data) => API.post('/maquinas/', data)
export const updateMaquina = (id, data) => API.put(`/maquinas/${id}`, data)
export const deleteMaquina = (id) => API.delete(`/maquinas/${id}`)