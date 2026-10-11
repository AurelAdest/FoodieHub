import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar topbar navbar-dark sticky-top">
      <div className="container-fluid gap-3">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-egg-fried"></i> FoodieHub
        </Link>
        <div className="search d-none d-md-block me-auto">
          <i className="bi bi-search"></i>
          <input className="form-control form-control-sm py-2" placeholder="Cari menu, pesanan, atau pelanggan..." />
        </div>
        <div className="d-flex align-items-center gap-3 text-white ms-auto">
          <i className="bi bi-bell fs-5"></i>
          <span className="d-flex align-items-center gap-2">
            <span className="avatar text-primary"><i className="bi bi-person-fill"></i></span>
            <span className="d-none d-sm-inline small">Admin</span>
          </span>
        </div>
      </div>
    </nav>
  )
}
