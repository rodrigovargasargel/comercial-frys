import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Sidebar() {
  const { usuario, doLogout } = useAuth()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState(null)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const handleLogout = () => {
    doLogout()
    navigate('/login')
  }

  const menuItems = [
    { path: '/produccion-extrusora', icon: 'fa-industry', label: 'Producción Extrusora', perfiles: [1,2,3] },
    { path: '/produccion-selladora', icon: 'fa-cut', label: 'Producción Selladora', perfiles: [1,2,3] },
    { path: '/materia-prima', icon: 'fa-boxes', label: 'Materia Prima', perfiles: [1,2,3] },
    { path: '/empresas', icon: 'fa-building', label: 'Empresas', perfiles: [1,2] },
    { path: '/informe-produccion', icon: 'fa-chart-bar', label: 'Informe Producción', perfiles: [1,2] },
    { path: '/informe-mp', icon: 'fa-boxes', label: 'Informe de MP', perfiles: [1,2] },
    { path: '/stock', icon: 'fa-warehouse', label: 'Stock', perfiles: [1,2] },
    { path: '/oc-ventas', icon: 'fa-tv', label: 'OC Ventas', perfiles: [1,2] },
    {
      label: 'Mantenedores', icon: 'fa-cogs', perfiles: [1,2],
      submenu: [
        { path: '/maquinas', icon: 'fa-cog', label: 'Máquinas' },
        { path: '/colores', icon: 'fa-palette', label: 'Colores' },
        { path: '/usuarios', icon: 'fa-users', label: 'Usuarios' },
        { path: '/productos', icon: 'fa-box', label: 'Productos' },
      ]
    },
  ]

  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    textDecoration: 'none',
    fontSize: 13,
    color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
    background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
    transition: 'all 0.2s',
  })

  return (
    <div style={{
      width: 240,
      minHeight: '100vh',
      background: 'rgb(26, 26, 46)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo / Título */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase' }}>Sistema</div>
        <div style={{ fontSize: 20, color: 'white', fontWeight: 700, letterSpacing: 1 }}>FRYS PRO</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Producción</div>
      </div>

      {/* Usuario logueado */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Conectado como</div>
        <div style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>{usuario?.nombre}</div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <span style={{ fontSize: 11, color: '#e94560' }}>{usuario?.perfil}</span>
          <div className="form-check form-switch mb-0" title="Modo oscuro">
            <input
              className="form-check-input"
              type="checkbox"
              checked={darkMode}
              onChange={e => setDarkMode(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* Menú */}
      <nav style={{ flex: '1 1 0%', padding: '16px 0px' }}>
        {menuItems
          .filter(item => !item.perfiles || item.perfiles.includes(usuario?.perfil_id))
          .map((item, idx) => {
            if (item.submenu) {
              const isExpanded = expandedMenu === item.label
              return (
                <div key={idx}>
                  <div
                    onClick={() => setExpandedMenu(isExpanded ? null : item.label)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 20px', cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
                      fontSize: 13, transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    <span>
                      <i className={`fas ${item.icon}`} style={{ width: 20, marginRight: 10 }}></i>
                      {item.label}
                    </span>
                    <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'}`} style={{ fontSize: 10 }}></i>
                  </div>
                  {isExpanded && item.submenu.map((sub, sidx) => (
                    <NavLink key={sidx} to={sub.path}
                      style={({ isActive }) => ({
                        display: 'flex', alignItems: 'center',
                        padding: '8px 20px 8px 44px', textDecoration: 'none',
                        fontSize: 12,
                        color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                        background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                      })}>
                      <i className={`fas ${sub.icon}`} style={{ width: 18, marginRight: 8 }}></i>
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )
            }
            return (
              <NavLink key={idx} to={item.path} style={navLinkStyle}>
                <i className={`fas ${item.icon}`} style={{ width: 20, marginRight: 10 }}></i>
                {item.label}
              </NavLink>
            )
          })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', padding: '8px', background: 'rgba(233,69,96,0.2)',
            border: '1px solid rgba(233,69,96,0.3)', borderRadius: 6,
            color: '#e94560', cursor: 'pointer', fontSize: 13,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(233,69,96,0.4)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(233,69,96,0.2)'}
        >
          <i className="fas fa-sign-out-alt me-2"></i>
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}