import { useState } from 'react'
import { Link } from 'react-router-dom'
import { rupiah } from './Pesanan'

const menus = [
  { id: 1, nama: 'Nasi Goreng Spesial', kategori: 'Makanan', harga: 35000, stok: 20 },
  { id: 2, nama: 'Chicken Burger', kategori: 'Makanan', harga: 28000, stok: 15 },
  { id: 3, nama: 'Mie Ayam', kategori: 'Makanan', harga: 18000, stok: 10 },
  { id: 4, nama: 'Es Kopi Susu', kategori: 'Minuman', harga: 15000, stok: 25 },
  { id: 5, nama: 'French Fries', kategori: 'Snack', harga: 12000, stok: 30 },
]

export default function Menu() {
  const [filter, setFilter] = useState('Semua')
  const tabs = ['Semua', 'Makanan', 'Minuman', 'Snack']
  const rows = filter === 'Semua' ? menus : menus.filter((m) => m.kategori === filter)

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
        <div>
          <h1 className="h3 fw-bold mb-0">Daftar Menu</h1>
          <p className="text-muted mb-0">Kelola menu makanan dan minuman di restoran Anda.</p>
        </div>
        <Link to="/menu/tambah" className="btn btn-primary rounded-3 px-3"><i className="bi bi-plus-lg"></i> Tambah Menu</Link>
      </div>

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
                <th className="d-none d-md-table-cell">No.</th><th>Gambar</th><th>Nama Menu</th>
                <th className="d-none d-md-table-cell">Kategori</th><th>Harga</th>
                <th className="d-none d-md-table-cell">Stok</th><th>Status</th><th className="text-end">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m, i) => (
                <tr key={m.id}>
                  <td className="d-none d-md-table-cell">{i + 1}</td>
                  <td><span className="thumb">{m.emoji}</span></td>
                  <td className="fw-semibold">{m.nama}</td>
                  <td className="d-none d-md-table-cell"><span className="badge rounded-pill st-cat">{m.kategori}</span></td>
                  <td className="text-nowrap">{rupiah(m.harga)}</td>
                  <td className="d-none d-md-table-cell">{m.stok}</td>
                  <td><span className="badge rounded-pill st-selesai">Tersedia</span></td>
                  <td className="text-end text-nowrap">
                    <button className="btn btn-sm btn-primary"><i className="bi bi-pencil-square"></i></button>{' '}
                    <button className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
