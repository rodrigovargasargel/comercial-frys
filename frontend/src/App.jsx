import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import LoginPage from './components/auth/LoginPage'
import UsuariosPage from './components/usuarios/UsuariosPage'
import ProductosPage from './components/productos/ProductosPage'
import EmpresasPage from './components/empresas/EmpresasPage'
import ProduccionPage from './components/produccion/ProduccionPage'
import MaquinasPage from './components/maquinas/MaquinasPage'
import MateriaPrimaPage from './components/materia_prima/MateriaPrimaPage'
import SelladoraPage from './components/selladora/SelladoraPage'
import ColoresPage from './components/colores/ColoresPage'
import ReporteSemanaPage from './components/reportes/ReporteSemanaPage'

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
        <Route index element={<Navigate to="/produccion-extrusora" replace />} />

        <Route path="produccion-extrusora" element={
          <RutaProtegida perfilesPermitidos={[1, 2, 3]}>
            <ProduccionPage />
          </RutaProtegida>
        } />

        <Route path="produccion-selladora" element={
          <RutaProtegida perfilesPermitidos={[1, 2, 3]}>
            <SelladoraPage />
          </RutaProtegida>
        } />

        <Route path="materia-prima" element={
          <RutaProtegida perfilesPermitidos={[1, 2, 3]}>
            <MateriaPrimaPage />
          </RutaProtegida>
        } />

        <Route path="colores" element={
          <RutaProtegida perfilesPermitidos={[1, 2]}>
            <ColoresPage />
          </RutaProtegida>
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

        <Route path="informe-produccion" element={
          <RutaProtegida perfilesPermitidos={[1, 2]}>
            <ReporteSemanaPage />
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