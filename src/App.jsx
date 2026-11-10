import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Menu from './pages/Menu'
import Pesanan from './pages/Pesanan'
import TambahMenu from './pages/TambahMenu'
import Login from './pages/Login'

const DEMO_EMAIL = 'admin123@gmail.com'
const DEMO_PASSWORD = 'admin123'

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('foodiehub_user')) || null
    } catch {
      return null
    }
  })

  function handleLogin(email, password) {
    if (
      email.toLowerCase() === DEMO_EMAIL &&
      password === DEMO_PASSWORD
    ) {
      const admin = {
        email: DEMO_EMAIL,
        name: 'Admin',
      }

      localStorage.setItem('foodiehub_user', JSON.stringify(admin))
      setUser(admin)

      return true
    }

    return false
  }

  function handleLogout() {
    localStorage.removeItem('foodiehub_user')
    setUser(null)
  }

  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    )
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <main className="col-lg-10 p-3 p-md-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/tambah" element={<TambahMenu />} />
              <Route path="/pesanan" element={<Pesanan />} />

              <Route
                path="/login"
                element={<Navigate to="/" replace />}
              />

              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}