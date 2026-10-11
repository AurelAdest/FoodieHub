import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip,
} from 'chart.js'
import { orders, statusClass, rupiah } from './Pesanan'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const stats = [
  { label: 'Total Menu', value: '12', note: '+2 baru', icon: 'journal-text', green: false },
  { label: 'Total Pesanan', value: '48', note: '+12% dari kemarin', icon: 'cart', green: true },
  { label: 'Total Pendapatan', value: 'Rp 4.850.000', note: '+15% dari kemarin', icon: 'cash-stack', green: true },
  { label: 'Pelanggan Aktif', value: '32', note: '+5% dari kemarin', icon: 'person', green: false },
]

const chartData = {
  labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
  datasets: [{
    data: [18, 16, 26, 24, 33, 37, 40],
    borderColor: '#1d6fe0', backgroundColor: 'rgba(29,111,224,.12)',
    fill: true, tension: 0.35, pointBackgroundColor: '#1d6fe0',
  }],
}
const chartOptions = {
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true, grid: { color: '#edf2f9' } }, x: { grid: { display: false } } },
}

export default function Dashboard() {
  return (
    <>
      <h1 className="h3 fw-bold">Dashboard</h1>
      <p className="text-muted mb-4">Rekap penjualan restoran Anda.</p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3 mb-4">
        {stats.map((s) => (
          <div className="col" key={s.label}>
            <div className="card-soft p-3 h-100 d-flex justify-content-between align-items-start">
              <div>
                <small className="text-muted">{s.label}</small>
                <div className="h4 fw-bold my-1">{s.value}</div>
                <small className="text-success">{s.note}</small>
              </div>
              <div className={`stat-ico ${s.green ? 'g' : ''}`}><i className={`bi bi-${s.icon}`}></i></div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-6">
          <div className="card-soft p-3 p-md-4 h-100">
            <h6 className="fw-bold">Statistik Pesanan (7 Hari Terakhir)</h6>
            <div style={{ height: 260 }}><Line data={chartData} options={chartOptions} /></div>
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className="card-soft p-3 p-md-4 h-100">
            <div className="d-flex justify-content-between">
              <h6 className="fw-bold">Pesanan Terbaru</h6>
              <Link to="/pesanan" className="small text-decoration-none">Lihat Semua →</Link>
            </div>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>No.</th><th>Pelanggan</th><th className="d-none d-md-table-cell">Menu</th>
                    <th>Total</th><th>Status</th><th className="d-none d-sm-table-cell">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id}>
                      <td className="fw-semibold">#{o.id}</td>
                      <td>{o.pelanggan}</td>
                      <td className="d-none d-md-table-cell">{o.menu}</td>
                      <td className="text-nowrap">{rupiah(o.total)}</td>
                      <td><span className={`badge rounded-pill ${statusClass[o.status]}`}>{o.status}</span></td>
                      <td className="d-none d-sm-table-cell text-muted">{o.waktu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
