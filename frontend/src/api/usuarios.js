import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000'
})

export const getUsuarios = () => API.get('/usuarios/')
export const getUsuario = (id) => API.get(`/usuarios/${id}`)
export const createUsuario = (data) => API.post('/usuarios/', data)
export const updateUsuario = (id, data) => API.put(`/usuarios/${id}`, data)
export const deleteUsuario = (id) => API.delete(`/usuarios/${id}`)