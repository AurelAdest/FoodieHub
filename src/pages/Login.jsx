import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Harap mengisi email dan password Anda.')
      return
    }

    const berhasil = onLogin(email.trim(), password)

    if (!berhasil) {    
      setError('Email atau password Anda salah.')
    }
  }

  return (
  <div
  className="min-vh-100 d-flex align-items-center justify-content-center p-3"
  style={{ backgroundColor: '#EDF4FF' }}
  >
      <div
        className="card border-0 shadow-sm w-100"
        style={{ maxWidth: '420px', borderRadius: '18px' }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-5">
            <div className="mb-3" style={{ color: '#1554A5' }}>
              <i className="bi bi-egg-fried" style={{ fontSize: '3rem' }}></i>
            </div>

            <h2 className="fw-bold">FoodieHub</h2>

        </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control py-2"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control py-2"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}
            
            <button
            type="submit"
            className="btn w-100 py-2 fw-semibold text-white mt-4"
            style={{
                backgroundColor: '#1554A5', 
                borderColor: '#1554A5', 
                borderRadius: '10px',
                }}
            >
              Login
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}