import axios from 'axios'
const API = axios.create({ baseURL: 'http://54.145.58.161:8000' })

export const login = (data) => API.post('/auth/login', data)