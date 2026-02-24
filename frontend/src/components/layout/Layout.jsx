import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{
        marginLeft: 240,
        flex: 1,
        minHeight: '100vh',
        background: '#f5f6fa',
        padding: 24
      }}>
        <Outlet />
      </main>
    </div>
  )
}