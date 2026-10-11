import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Menu from './pages/Menu'
import Pesanan from './pages/Pesanan'
import TambahMenu from './pages/TambahMenu'

export default function App() {
  return (
    <>
      <Navbar />
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
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}
