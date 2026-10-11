import { useState } from 'react'

export const orders = [
  { id: '0012', pelanggan: 'Budi', menu: 'Nasi Goreng Spesial', total: 35000, status: 'Diproses', waktu: '10:24' },
  { id: '0011', pelanggan: 'Sari', menu: 'Chicken Burger', total: 28000, status: 'Dikirim', waktu: '09:50' },
  { id: '0010', pelanggan: 'Andi', menu: 'Es Kopi Susu', total: 15000, status: 'Selesai', waktu: '09:20' },
  { id: '0009', pelanggan: 'Rina', menu: 'Mie Ayam', total: 18000, status: 'Diproses', waktu: '08:45' },
  { id: '0008', pelanggan: 'Dewi', menu: 'French Fries', total: 12000, status: 'Selesai', waktu: '08:10' },
  { id: '0007', pelanggan: 'Fajar', menu: 'Chicken Burger', total: 28000, status: 'Selesai', waktu: '07:55' },
]

export const statusClass = { Diproses: 'st-proses', Dikirim: 'st-kirim', Selesai: 'st-selesai' }
export const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

export default function Pesanan() {
  const [filter, setFilter] = useState('Semua')
  const tabs = ['Semua', 'Diproses', 'Dikirim', 'Selesai']
  const rows = filter === 'Semua' ? orders : orders.filter((o) => o.status === filter)

  return (
    <>
      <h1 className="h3 fw-bold mb-0">Daftar Pesanan</h1>
      <p className="text-muted">Pantau semua pesanan yang masuk.</p>

      <div className="nav nav-pills gap-2 mb-3">
        {tabs.map((t) => (
          <button key={t} className={`nav-link btn-filter ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>

      <div className="card-soft overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>No.</th><th>Pelanggan</th><th className="d-none d-md-table-cell">Menu</th>
                <th>Total</th><th>Status</th><th className="d-none d-sm-table-cell">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
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
    </>
  )
}
