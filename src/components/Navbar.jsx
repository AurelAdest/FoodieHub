import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar topbar navbar-dark sticky-top">
      <div className="container-fluid gap-3">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-egg-fried"></i> FoodieHub
        </Link>
        <div className="d-flex align-items-center gap-3 ms-auto">
          <div className="search">
            <i className="bi bi-search"></i>
            <input
              className="form-control form-control-sm py-2"
              placeholder="Cari menu, pesanan, atau pelanggan..."
            />
          </div>
          <div className="d-flex align-items-center gap-2 text-white">
            <span className="avatar text-primary">
              <i className="bi bi-person-fill"></i>
            </span>
            <span className="d-none d-sm-inline small">Admin</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
