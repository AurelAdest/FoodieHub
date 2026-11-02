
import { useEffect, useState } from 'react'

const defaultProfile = {
  nama: '',
  username: '',
  email: '',
  telepon: '',
}

const defaultPreferences = {
  notifikasi: true,
  tema: 'light',
}

export default function PengaturanAkun() {
  const [profile, setProfile] = useState(defaultProfile)
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [message, setMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const [password, setPassword] = useState({
    lama: '',
    baru: '',
    konfirmasi: '',
  })

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('foodiehub-profile')
      const savedPreferences = localStorage.getItem(
        'foodiehub-preferences'
      )

      if (savedProfile) {
        setProfile({
          ...defaultProfile,
          ...JSON.parse(savedProfile),
        })
      }

      if (savedPreferences) {
        setPreferences({
          ...defaultPreferences,
          ...JSON.parse(savedPreferences),
        })
      }
    } catch {
      setMessage('Data pengaturan tidak dapat dibaca.')
    }
  }, [])

  function handleProfileChange(event) {
    const { name, value } = event.target

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleSaveProfile(event) {
    event.preventDefault()

    try {
      localStorage.setItem(
        'foodiehub-profile',
        JSON.stringify(profile)
      )

      setMessage('Profil berhasil disimpan.')
    } catch {
      setMessage('Profil gagal disimpan.')
    }
  }

  function handlePreferencesChange(event) {
    const { name, value, type, checked } = event.target

    setPreferences((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleSavePreferences(event) {
    event.preventDefault()

    try {
      localStorage.setItem(
        'foodiehub-preferences',
        JSON.stringify(preferences)
      )

      setMessage('Preferensi berhasil disimpan.')
    } catch {
      setMessage('Preferensi gagal disimpan.')
    }
  }

  function handlePasswordChange(event) {
    event.preventDefault()
    setPasswordMessage('')

    if (!password.lama || !password.baru || !password.konfirmasi) {
      setPasswordMessage('Semua kolom password wajib diisi.')
      return
    }

    if (password.baru.length < 6) {
      setPasswordMessage('Password baru minimal 6 karakter.')
      return
    }

    if (password.baru !== password.konfirmasi) {
      setPasswordMessage('Konfirmasi password tidak cocok.')
      return
    }

    setPasswordMessage(
      'Validasi berhasil. Penggantian password perlu dihubungkan ke backend.'
    )

    setPassword({
      lama: '',
      baru: '',
      konfirmasi: '',
    })
  }

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h2 className="fw-bold">Pengaturan Akun</h2>
        <p className="text-secondary">
          Kelola informasi profil dan preferensi FoodieHub kamu.
        </p>
      </div>

      {message && (
        <div className="alert alert-info" role="status">
          {message}
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Tutup"
            onClick={() => setMessage('')}
          />
        </div>
      )}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">Profil Saya</h5>

          <form onSubmit={handleSaveProfile}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  className="form-control"
                  placeholder="Masukkan nama lengkap"
                  value={profile.nama}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Masukkan username"
                  value={profile.username}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="nama@email.com"
                  value={profile.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Nomor Telepon</label>
                <input
                  type="tel"
                  name="telepon"
                  className="form-control"
                  placeholder="Masukkan nomor telepon"
                  value={profile.telepon}
                  onChange={handleProfileChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Simpan Profil
            </button>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">Keamanan Akun</h5>

          <form onSubmit={handlePasswordChange}>
            <div className="mb-3">
              <label className="form-label">Password Lama</label>
              <input
                type="password"
                className="form-control"
                autoComplete="current-password"
                value={password.lama}
                onChange={(event) =>
                  setPassword({
                    ...password,
                    lama: event.target.value,
                  })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password Baru</label>
              <input
                type="password"
                className="form-control"
                autoComplete="new-password"
                value={password.baru}
                onChange={(event) =>
                  setPassword({
                    ...password,
                    baru: event.target.value,
                  })
                }
                minLength={6}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                className="form-control"
                autoComplete="new-password"
                value={password.konfirmasi}
                onChange={(event) =>
                  setPassword({
                    ...password,
                    konfirmasi: event.target.value,
                  })
                }
                minLength={6}
                required
              />
            </div>

            {passwordMessage && (
              <div className="alert alert-info" role="status">
                {passwordMessage}
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              Ubah Password
            </button>
          </form>
        </div>
      </div>

     
    </div>
  )
}
