import { useState } from 'react'
import { Link } from 'react-router-dom'

const empty = { nama: '', kategori: '', harga: '', stok: '', deskripsi: '' }

export default function TambahMenu() {
  const [form, setForm] = useState(empty)
  const [validated, setValidated] = useState(false)
  const [saved, setSaved] = useState(false)
  const [preview, setPreview] = useState(null)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onFile = (e) => {
    const file = e.target.files[0]
    setPreview(file ? URL.createObjectURL(file) : null)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (e.currentTarget.checkValidity()) {
      setSaved(true); setForm(empty); setPreview(null); setValidated(false)
    } else {
      setSaved(false); setValidated(true)
    }
  }

  return (
    <>
      <Link to="/menu" className="text-decoration-none small"><i className="bi bi-arrow-left"></i> Kembali</Link>
      <h1 className="h3 fw-bold mb-0 mt-1">Tambah Menu Baru</h1>
      <p className="text-muted">Isi detail menu yang ingin ditambahkan.</p>

      {saved && <div className="alert alert-success">Menu berhasil disimpan (simulasi — belum terhubung ke backend).</div>}

      <form className={`card-soft p-3 p-md-4 ${validated ? 'was-validated' : ''}`} noValidate onSubmit={onSubmit}>
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">Upload Gambar</label>
            <label className="upload w-100" style={{ cursor: 'pointer' }}>
              <input type="file" accept="image/png,image/jpeg" hidden onChange={onFile} />
              {preview ? (
                <img src={preview} alt="Preview" className="img-fluid rounded-3" style={{ maxHeight: 180 }} />
              ) : (
                <div>
                  <i className="bi bi-image fs-1 text-primary"></i>
                  <div className="small">Klik untuk upload gambar<br />atau drag &amp; drop</div>
                  <div className="small opacity-75">Format: JPG, PNG (Max 2MB)</div>
                </div>
              )}
            </label>
          </div>

          <div className="col-12 col-md-8">
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <label className="form-label fw-semibold">Nama Menu *</label>
                <input name="nama" value={form.nama} onChange={onChange} className="form-control" placeholder="Contoh: Nasi Goreng Spesial" required />
                <div className="invalid-feedback">Nama menu wajib diisi.</div>
              </div>
              <div className="col-12 col-sm-6">
                <label className="form-label fw-semibold">Kategori *</label>
                <select name="kategori" value={form.kategori} onChange={onChange} className="form-select" required>
                  <option value="">Pilih kategori</option>
                  <option>Makanan</option><option>Minuman</option><option>Snack</option>
                </select>
                <div className="invalid-feedback">Pilih kategori.</div>
              </div>
              <div className="col-12 col-sm-6">
                <label className="form-label fw-semibold">Harga *</label>
                <div className="input-group">
                  <span className="input-group-text">Rp</span>
                  <input name="harga" type="number" min="0" value={form.harga} onChange={onChange} className="form-control" placeholder="35000" required />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <label className="form-label fw-semibold">Stok *</label>
                <input name="stok" type="number" min="0" value={form.stok} onChange={onChange} className="form-control" placeholder="10" required />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Deskripsi *</label>
                <textarea name="deskripsi" value={form.deskripsi} onChange={onChange} className="form-control" rows="4" placeholder="Masukkan deskripsi menu..." required />
              </div>
            </div>
          </div>

          <div className="col-12 d-flex justify-content-end gap-2">
            <Link to="/menu" className="btn btn-outline-secondary px-4">Batal</Link>
            <button type="submit" className="btn btn-primary px-4">Simpan Menu</button>
          </div>
        </div>
      </form>
    </>
  )
}
