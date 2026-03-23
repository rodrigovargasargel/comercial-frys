import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const getColores = () => API.get('/colores/')
export const createColor = (data) => API.post('/colores/', data)
export const updateColor = (id, data) => API.put(`/colores/${id}`, data)
export const deleteColor = (id) => API.delete(`/colores/${id}`)