import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', icon: 'house-door', label: 'Beranda', end: true },
  { to: '/dashboard', icon: 'bar-chart-line', label: 'Dashboard' },
  { to: '/menu', icon: 'cup-hot', label: 'Menu' },
  { to: '/pesanan', icon: 'receipt', label: 'Pesanan' },
]

export default function Sidebar() {
  const [beranda, dashboard, menu, pesanan] = links
  const bottom = (l) => (
    <NavLink key={l.to} to={l.to} end={l.end}>
      <i className={`bi bi-${l.icon}`}></i>{l.label}
    </NavLink>
  )

  return (
    <>
      {/* Desktop: sidebar */}
      <aside className="col-lg-2 d-none d-lg-block p-3" id="side">
        <ul className="nav flex-column gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className="nav-link">
                <i className={`bi bi-${l.icon} me-2`}></i>{l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/menu/tambah" className="btn btn-primary w-100 mt-4 rounded-3">
          <i className="bi bi-plus-lg"></i> Tambah Menu
        </Link>
      </aside>

      {/* Mobile: bottom navigation */}
      <nav className="bnav d-lg-none">
        {bottom(beranda)}
        {bottom(dashboard)}
        <Link className="fab" to="/menu/tambah" aria-label="Tambah menu"><i className="bi bi-plus"></i></Link>
        {bottom(menu)}
        {bottom(pesanan)}
      </nav>
    </>
  )
}
