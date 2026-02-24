import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Sidebar() {
  const { usuario, doLogout } = useAuth()
  const navigate = useNavigate()

  const menuCompleto = [
    { path: '/produccion-extrusora', icon: 'fa-industry', label: 'Producción Extrusora' },
     { path: '/maquinas', icon: 'fa-robot', label: 'Maquinas' },
    { path: '/usuarios', icon: 'fa-users', label: 'Usuarios' },
    { path: '/productos', icon: 'fa-boxes', label: 'Productos' },
    { path: '/empresas', icon: 'fa-building', label: 'Empresas' },
    
  ]

  const menuOperario = [
    { path: '/produccion-extrusora', icon: 'fa-industry', label: 'Producción Extrusora' },
  ]

  const menu = usuario?.perfil_id === 3 ? menuOperario : menuCompleto

  const handleLogout = () => {
    doLogout()
    navigate('/login')
  }

  return (
    <div style={{
      width: 240, minHeight: '100vh', background: '#1a1a2e',
      display: 'flex', flexDirection: 'column', position: 'fixed', left: 0, top: 0, zIndex: 100
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: 3, marginBottom: 4 }}>SISTEMA</div>
        <div style={{ fontSize: 18, color: 'white', fontWeight: 'bold', letterSpacing: 2 }}> FRYS PRO</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Producción</div>
      </div>

      {/* Usuario logueado */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Conectado como</div>
        <div style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>{usuario?.nombre}</div>
        <div style={{ fontSize: 11, color: '#e94560' }}>{usuario?.perfil}</div>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: '16px 0' }}>
        {menu.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 24px',
              color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
              background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderLeft: isActive ? '3px solid #e94560' : '3px solid transparent',
              textDecoration: 'none', fontSize: 14, transition: 'all 0.2s'
            })}
          >
            <i className={`fas ${item.icon}`} style={{ width: 18, textAlign: 'center' }}></i>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={handleLogout} style={{
          width: '100%', padding: '10px', background: 'rgba(233,69,96,0.15)',
          color: '#e94560', border: '1px solid rgba(233,69,96,0.3)',
          borderRadius: 6, fontSize: 13, cursor: 'pointer', fontWeight: 600
        }}>
          <i className="fas fa-sign-out-alt me-2"></i>Cerrar sesión
        </button>
      </div>
    </div>
  )
}