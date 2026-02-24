import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const getUsuarios = () => API.get('/usuarios/')
export const getUsuario = (id) => API.get(`/usuarios/${id}`)
export const createUsuario = (data) => API.post('/usuarios/', data)
export const updateUsuario = (id, data) => API.put(`/usuarios/${id}`, data)
export const deleteUsuario = (id) => API.delete(`/usuarios/${id}`)