
import { useState } from 'react'

const STORAGE_KEY = 'foodiehub_orders'

const daftarMenu = [
  { nama: 'Nasi Goreng Spesial', harga: 35000 },
  { nama: 'Chicken Burger', harga: 28000 },
  { nama: 'Es Kopi Susu', harga: 15000 },
  { nama: 'Mie Ayam', harga: 18000 },
  { nama: 'French Fries', harga: 12000 },
]

const rupiah = (angka) =>
  'Rp ' + Number(angka || 0).toLocaleString('id-ID')

export default function TambahPesanan() {
  const [pelanggan, setPelanggan] = useState('')
  const [menu, setMenu] = useState('')
  const [jumlah, setJumlah] = useState(1)
  const [status, setStatus] = useState('Diproses')

  const menuDipilih = daftarMenu.find(
    (item) => item.nama === menu
  )

  const total = menuDipilih
    ? menuDipilih.harga * jumlah
    : 0

  function simpanPesanan(e) {
    e.preventDefault()

    if (!pelanggan.trim() || !menuDipilih || jumlah < 1) {
      alert('Mohon lengkapi semua data pesanan!')
      return
    }

    try {
      const dataLama = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
      )

      if (!Array.isArray(dataLama)) {
        throw new Error('Data pesanan tidak valid')
      }

      // Cari nomor terbesar dari pesanan contoh dan pesanan tersimpan.
      const semuaId = [
        12, 11, 10, 9, 8, 7,
        ...dataLama.map((item) => Number(item.id) || 0),
      ]

      const nomorBaru = Math.max(...semuaId) + 1

      const waktuSekarang = new Date().toLocaleTimeString(
        'id-ID',
        {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }
      )

      const pesananBaru = {
        id: String(nomorBaru).padStart(4, '0'),
        pelanggan: pelanggan.trim(),
        menu: menuDipilih.nama,
        jumlah: Number(jumlah),
        total,
        status,
        waktu: waktuSekarang,
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([pesananBaru, ...dataLama])
      )

      alert('Pesanan berhasil ditambahkan!')

      // Kembali ke halaman Daftar Pesanan.
      window.location.href = '/pesanan'
    } catch (error) {
      console.error('Gagal menyimpan pesanan:', error)
      alert('Pesanan gagal disimpan. Silakan coba lagi.')
    }
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">
            Tambah Pesanan
          </h1>
          <p className="text-muted mb-0">
            Masukkan informasi pesanan pelanggan.
          </p>
        </div>
      </div>

      <div className="card-soft p-3 p-md-4">
        <h2 className="h5 fw-bold mb-4">
          Informasi Pesanan
        </h2>

        <form onSubmit={simpanPesanan}>
          <div className="mb-3">
            <label
              htmlFor="pelanggan"
              className="form-label fw-semibold"
            >
              Nama Pelanggan
            </label>

            <input
              id="pelanggan"
              type="text"
              className="form-control"
              placeholder="Masukkan nama pelanggan"
              value={pelanggan}
              onChange={(e) => setPelanggan(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="menu"
              className="form-label fw-semibold"
            >
              Pilih Menu
            </label>

            <select
              id="menu"
              className="form-select"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
              required
            >
              <option value="">Pilih makanan atau minuman</option>

              {daftarMenu.map((item) => (
                <option key={item.nama} value={item.nama}>
                  {item.nama} — {rupiah(item.harga)}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label
                htmlFor="jumlah"
                className="form-label fw-semibold"
              >
                Jumlah
              </label>

              <input
                id="jumlah"
                type="number"
                className="form-control"
                min="1"
                value={jumlah}
                onChange={(e) =>
                  setJumlah(Math.max(1, Number(e.target.value) || 1))
                }
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label
                htmlFor="status"
                className="form-label fw-semibold"
              >
                Status Pesanan
              </label>

              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Diproses">Diproses</option>
                <option value="Dikirim">Dikirim</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
          </div>

          <div
            className="p-3 rounded-3 mb-4 d-flex justify-content-between align-items-center"
            style={{ backgroundColor: '#edf4ff' }}
          >
            <span className="fw-semibold">Total Harga</span>
            <strong
              className="fs-4"
              style={{ color: '#1765d1' }}
            >
              {rupiah(total)}
            </strong>
          </div>

          <div className="d-flex justify-content-end gap-2 flex-wrap">
            <button
              type="button"
              className="btn btn-light border rounded-3"
              onClick={() => {
                window.location.href = '/pesanan'
              }}
            >
              Batal
            </button>

            <button
              type="submit"
              className="btn btn-primary rounded-3"
            >
              <i className="bi bi-check-lg me-2"></i>
              Simpan Pesanan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
