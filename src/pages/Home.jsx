import { Link } from 'react-router-dom'

const features = [
  { to: '/menu', icon: 'cup-hot', title: 'Kelola Menu', text: 'Tambah, ubah, dan atur stok makanan serta minuman.', cls: '' },
  { to: '/pesanan', icon: 'receipt', title: 'Pantau Pesanan', text: 'Lihat status pesanan: diproses, dikirim, atau selesai.', cls: 'g' },
  { to: '/dashboard', icon: 'bar-chart-line', title: 'Rekap Penjualan', text: 'Statistik pesanan dan pendapatan 7 hari terakhir.', cls: '' },
]

export default function Home() {
  return (
    <>
      <section className="hero mb-4">
        <div className="row align-items-center g-3">
          <div className="col-8">
            <div className="tagline">Good Food, Good Mood</div>
            <h1 className="fw-bold display-6 my-2">Selamat Datang di FoodieHub 👋</h1>
            <p className="mb-3 opacity-75">Kelola menu, pantau pesanan, dan lihat rekap penjualan restoran Anda dalam satu tempat.</p>
            <Link to="/dashboard" className="btn btn-light text-primary fw-semibold rounded-pill px-4 me-1">Lihat Dashboard</Link>
            <Link to="/menu/tambah" className="btn btn-outline-light rounded-pill px-4 mt-2 mt-sm-0">+ Tambah Menu</Link>
          </div>
          <div className="col-4 text-center emoji">🍲</div>
        </div>
      </section>

      <div className="row row-cols-1 row-cols-md-3 g-3">
        {features.map((f) => (
          <div className="col" key={f.to}>
            <Link to={f.to} className="text-decoration-none text-reset">
              <div className="card-soft feature p-4 h-100">
                <div className={`stat-ico ${f.cls} mb-3`}><i className={`bi bi-${f.icon}`}></i></div>
                <h5 className="fw-bold">{f.title}</h5>
                <p className="text-muted mb-0">{f.text}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
