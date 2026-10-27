          import { useState, useEffect } from 'react'

          const STORAGE_KEY = 'foodiehub_orders'

          export const orders = [
            { id: '0012', pelanggan: 'Budi', menu: 'Nasi Goreng Spesial', total: 35000, status: 'Diproses', waktu: '10:24' },
            { id: '0011', pelanggan: 'Sari', menu: 'Chicken Burger', total: 28000, status: 'Dikirim', waktu: '09:50' },
            { id: '0010', pelanggan: 'Andi', menu: 'Es Kopi Susu', total: 15000, status: 'Selesai', waktu: '09:20' },
            { id: '0009', pelanggan: 'Rina', menu: 'Mie Ayam', total: 18000, status: 'Diproses', waktu: '08:45' },
            { id: '0008', pelanggan: 'Dewi', menu: 'French Fries', total: 12000, status: 'Selesai', waktu: '08:10' },
            { id: '0007', pelanggan: 'Fajar', menu: 'Chicken Burger', total: 28000, status: 'Selesai', waktu: '07:55' },
          ]

          export const statusClass = {
            Diproses: 'st-proses',
            Dikirim: 'st-kirim',
            Selesai: 'st-selesai',
          }

          export const rupiah = (n) =>
            'Rp ' + Number(n || 0).toLocaleString('id-ID')

          export default function Pesanan() {
            const [filter, setFilter] = useState('Semua')

            // Mengambil pesanan baru dari localStorage
            const [pesananBaru, setPesananBaru] = useState(() => {
              try {
                return JSON.parse(
                  localStorage.getItem(STORAGE_KEY) || '[]'
                )
              } catch {
                return []
              }
            })

            const tabs = ['Semua', 'Diproses', 'Dikirim', 'Selesai']

            // Memperbarui data saat halaman menerima perubahan storage
            useEffect(() => {
              const muatPesanan = () => {
                try {
                  setPesananBaru(
                    JSON.parse(
                      localStorage.getItem(STORAGE_KEY) || '[]'
                    )
                  )
                } catch {
                  setPesananBaru([])
                }
              }

              window.addEventListener('storage', muatPesanan)

              return () => {
                window.removeEventListener('storage', muatPesanan)
              }
            }, [])

            // Menggabungkan pesanan baru dan data contoh
            const semuaPesanan = [
              ...pesananBaru,
              ...orders.filter(
                (contoh) =>
                  !pesananBaru.some(
                    (p) => String(p.id) === String(contoh.id)
                  )
              ),
            ]

            // Memfilter pesanan berdasarkan status
            const rows =
              filter === 'Semua'
                ? semuaPesanan
                : semuaPesanan.filter((o) => o.status === filter)

            
          // Mengubah status dan menyimpannya
          const ubahStatus = (id, status) => {
            const dataLama = JSON.parse(
              localStorage.getItem(STORAGE_KEY) || '[]'
            )

            // Cari pesanan dari data baru atau data contoh
            const pesanan = [
              ...dataLama,
              ...orders.filter(
                (contoh) =>
                  !dataLama.some(
                    (p) => String(p.id) === String(contoh.id)
                  )
              ),
            ].find((o) => String(o.id) === String(id))

            // Jika pesanan sudah selesai, status tidak boleh diubah
            if (!pesanan || pesanan.status === 'Selesai') {
              return
            }

            // Jika status baru adalah Selesai, perubahan hanya boleh satu arah
            const dataTerbaru = dataLama.some(
              (o) => String(o.id) === String(id)
            )
              ? dataLama.map((o) =>
                  String(o.id) === String(id)
                    ? { ...o, status }
                    : o
                )
              : [...dataLama, { ...pesanan, status }]

            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(dataTerbaru)
            )

            setPesananBaru(dataTerbaru)
          }

            return (
              <>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                  <div>
                    <h1 className="h3 fw-bold mb-0">
                      Daftar Pesanan
                    </h1>
                    <p className="text-muted">
                      Pantau semua pesanan yang masuk.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary rounded-3"
                    onClick={() => {
                      window.location.href = '/pesan'
                    }}
                  >
                    <i className="bi bi-plus-lg me-2"></i>
                    Tambah Pesanan
                  </button>
                </div>

                <div className="nav nav-pills gap-2 mb-3">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      className={`nav-link btn-filter ${filter === t ? 'active' : ''
                        }`}
                      onClick={() => setFilter(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="card-soft overflow-hidden">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Pelanggan</th>
                          <th className="d-none d-md-table-cell">
                            Menu
                          </th>
                          <th>Total</th>
                          <th>Status</th>
                          <th className="d-none d-sm-table-cell">
                            Waktu
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {rows.map((o) => (
                          <tr key={o.id}>
                            <td className="fw-semibold">
                              #{o.id}
                            </td>

                            <td>{o.pelanggan}</td>

                            <td className="d-none d-md-table-cell">
                              {o.menu ||
                                (o.items || [])
                                  .map(
                                    (item) =>
                                      `${item.nama} x${item.jumlah}`
                                  )
                                  .join(', ')}
                            </td>

                            <td className="text-nowrap">
                              {rupiah(o.total)}
                            </td>

                            <td>
                              <select
                                className="form-select form-select-sm"
                                style={{ minWidth: 120 }}
                                value={o.status}
                                disabled={o.status === 'Selesai'}
                                onChange={(e) =>
                                  ubahStatus(o.id, e.target.value)
                                }
                                aria-label={`Ubah status pesanan ${o.id}`}
                              >
                                <option value="Diproses">
                                  Diproses
                                </option>
                                <option value="Dikirim">
                                  Dikirim
                                </option>
                                <option value="Selesai">
                                  Selesai
                                </option>
                              </select>
                            </td>

                            <td className="d-none d-sm-table-cell text-muted">
                              {o.waktu || '-'}
                            </td>
                          </tr>
                        ))}

                        {rows.length === 0 && (
                          <tr>
                            <td colSpan="6" className="text-center p-4">
                              Belum ada pesanan.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )
          }