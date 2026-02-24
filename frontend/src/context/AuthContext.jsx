import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const stored = localStorage.getItem('usuario')
    return stored ? JSON.parse(stored) : null
  })

  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  const doLogin = (tokenValue, usuarioData) => {
    localStorage.setItem('token', tokenValue)
    localStorage.setItem('usuario', JSON.stringify(usuarioData))
    setToken(tokenValue)
    setUsuario(usuarioData)
  }

  const doLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setToken(null)
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, token, doLogin, doLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)