import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useState, useEffect } from 'react'

export default function Layout() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark-mode'))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ 
        marginLeft: 240, 
        flex: '1 1 0%', 
        minHeight: '100vh', 
        background: isDark ? '#0f1117' : 'rgb(245, 246, 250)',
        color: isDark ? '#e2e8f0' : 'inherit',
        padding: 24 
      }}>
        <Outlet />
      </main>
    </div>
  )
}
