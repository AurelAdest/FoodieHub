
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  function handleLogout() {
    onLogout()
    setShowLogoutModal(false)
    navigate('/login', { replace: true })
  }

  return (
    <>
      <nav className="navbar topbar navbar-dark sticky-top">
        <div className="container-fluid gap-3">
          <Link className="navbar-brand fw-bold" to="/">
            <i className="bi bi-egg-fried"></i> FoodieHub
          </Link>

          <div className="d-flex align-items-center gap-3 ms-auto">
            <div className="search">
              <i className="bi bi-search"></i>
              <input
                className="form-control form-control-sm py-2"
                placeholder="Cari menu, pesanan, atau pelanggan..."
              />
            </div>

            <div className="d-flex align-items-center gap-2 text-white">
              <span className="avatar text-primary">
                <i className="bi bi-person-fill"></i>
              </span>

              <span className="d-none d-sm-inline small">
                {user?.name || 'Admin'}
              </span>
            </div>

            <button
            type="button"
            className="btn btn-sm"
            style={{
            borderRadius: '8px',
            border: '1px solid #FFFFFF',
            color: '#FFFFFF',
            backgroundColor: 'transparent',
            transition: 'all 0.2s ease',
           }}
           onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF'
            e.currentTarget.style.color = '#1554A5'
            e.currentTarget.style.borderColor = '#FFFFFF'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.borderColor = '#FFFFFF'
          }}
          onClick={() => setShowLogoutModal(true)}
          >
            Logout
            </button>

          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          style={{
            backgroundColor: 'rgba(10, 30, 60, 0.5)',
            zIndex: 2000,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content border-0 shadow"
              style={{ borderRadius: '16px' }}
            >
              <div className="modal-body text-center p-4 p-md-5">

                <h5 className="fw-bold mb-4">Konfirmasi Logout</h5>

                <p className="text-secondary mb-5">
                  Apakah Anda yakin ingin keluar dari akun FoodieHub?
                </p>

                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-light border px-4"
                    style={{ borderRadius: '9px' }}
                    onClick={() => setShowLogoutModal(false)}
                  >
                    Batal
                  </button>

                  <button
                    type="button"
                    className="btn text-white px-4"
                    style={{
                      backgroundColor: '#1554A5',
                      borderRadius: '9px',
                    }}
                    onClick={handleLogout}
                  >
                    Ya, Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
