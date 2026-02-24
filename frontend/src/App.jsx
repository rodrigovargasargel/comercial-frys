import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import LoginPage from './components/auth/LoginPage'
import UsuariosPage from './components/usuarios/UsuariosPage'
import ProductosPage from './components/productos/ProductosPage'
import EmpresasPage from './components/empresas/EmpresasPage'
import ProduccionPage from './components/produccion/ProduccionPage'
import MaquinasPage from './components/maquinas/MaquinasPage'


function RutaProtegida({ children, perfilesPermitidos }) {
  const { usuario } = useAuth()
  if (!usuario) return <Navigate to="/login" replace />
  if (perfilesPermitidos && !perfilesPermitidos.includes(usuario.perfil_id)) {
    return <Navigate to="/" replace />
  }
  return children
}

function AppRoutes() {
  const { usuario } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={!usuario ? <LoginPage /> : <Navigate to="/" replace />} />
      <Route path="/" element={
        <RutaProtegida>
          <Layout />
        </RutaProtegida>
      }>
        <Route index element={
          usuario?.perfil_id === 3
            ? <Navigate to="/produccion-extrusora" replace />
            : <Navigate to="/usuarios" replace />
        } />
        <Route path="usuarios" element={
          <RutaProtegida perfilesPermitidos={[1, 2]}>
            <UsuariosPage />
          </RutaProtegida>
        } />
        <Route path="productos" element={
          <RutaProtegida perfilesPermitidos={[1, 2]}>
            <ProductosPage />
          </RutaProtegida>
        } />
        <Route path="empresas" element={
          <RutaProtegida perfilesPermitidos={[1, 2]}>
            <EmpresasPage />
          </RutaProtegida>
        } />
        <Route path="maquinas" element={
          <RutaProtegida perfilesPermitidos={[1, 2]}>
            <MaquinasPage />
          </RutaProtegida>
        } />
        <Route path="produccion-extrusora" element={
          <RutaProtegida perfilesPermitidos={[1, 2, 3]}>
            <ProduccionPage />
          </RutaProtegida>
        } />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App