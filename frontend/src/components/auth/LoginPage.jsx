import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { login } from '../../api/auth'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { doLogin } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await login(form)
      doLogin(data.access_token, data.usuario)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a2e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: 12,
        padding: 40,
        width: 380,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#999', letterSpacing: 3, marginBottom: 4 }}>SISTEMA DE</div>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1a1a2e', letterSpacing: 2 }}>COMERCIAL FRYS</div>
          <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Producción</div>
        </div>

        {error && (
          <div style={{ background: '#fee', border: '1px solid #fcc', borderRadius: 6, padding: '10px 14px', marginBottom: 16, color: '#c00', fontSize: 13 }}>
            <i className="fas fa-exclamation-circle me-2"></i>{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="correo@ejemplo.com"
              style={{
                width: '100%', padding: '10px 14px', border: '1px solid #ddd',
                borderRadius: 6, fontSize: 14, outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              style={{
                width: '100%', padding: '10px 14px', border: '1px solid #ddd',
                borderRadius: 6, fontSize: 14, outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px', background: '#1a1a2e', color: 'white',
              border: 'none', borderRadius: 6, fontSize: 15, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? <><i className="fas fa-spinner fa-spin me-2"></i>Entrando...</> : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}