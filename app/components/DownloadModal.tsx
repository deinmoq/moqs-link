'use client'

import { useState } from 'react'

export default function DownloadModal({ plugin, onClose }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pluginName: plugin.name }),
      })
      const data = await res.json()
      if (data.success) {
        setReady(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0px); opacity: 1; }
        }

        /* ─── Desktop Modal ─── */
        .modal-positioner {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          width: 100%;
          max-width: 560px;        /* Breiter auf Desktop */
          padding: 0 1.5rem;
        }

        .modal-box {
          background: #0f0f0f;
          border: 1px solid #222;
          border-radius: 20px;
          overflow: hidden;
          animation: slideUp 0.25s ease forwards;
        }

        .modal-header {
          padding: 2rem 2.2rem;
          border-bottom: 1px solid #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-label {
          color: #555;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }

        .modal-title {
          color: #fff;
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .modal-close {
          background: #1a1a1a;
          border: 1px solid #222;
          border-radius: 8px;
          color: #666;
          font-size: 1rem;
          cursor: pointer;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .modal-close:hover {
          background: #222;
          color: #fff;
          border-color: #333;
        }

        .modal-content {
          padding: 2.2rem;
        }

        .status-box {
          background: #080808;
          border: 1px solid #1e1e1e;
          border-radius: 12px;
          padding: 1.4rem;
          margin-bottom: 1.8rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .pulse-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #fff;
          flex-shrink: 0;
          animation: pulse 2s ease infinite;
        }

        .status-title {
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .status-sub {
          color: #555;
          font-size: 0.85rem;
        }

        .email-form {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #222;
        }

        .email-input {
          background: #0a0a0a;
          border: none;
          padding: 1.1rem 1.4rem;
          color: #fff;
          font-size: 1rem;
          outline: none;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
        }

        .email-input::placeholder {
          color: #444;
        }

        .submit-btn {
          background: #fff;
          border: none;
          padding: 1.1rem 1.4rem;
          color: #080808;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s ease, opacity 0.2s ease;
          min-height: 52px;
          letter-spacing: -0.01em;
        }

        .submit-btn:hover:not(:disabled) {
          background: #e0e0e0;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-msg {
          color: #ff5555;
          font-size: 0.82rem;
          margin-top: 0.9rem;
        }

        .fine-print {
          color: #333;
          font-size: 0.75rem;
          margin-top: 1.2rem;
          line-height: 1.6;
        }

        /* ─── Download Ready ─── */
        .ready-box {
          text-align: center;
          padding: 1.5rem 0;
        }

        .ready-icon {
          font-size: 3rem;
          margin-bottom: 1.2rem;
        }

        .ready-title {
          color: #fff;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }

        .ready-sub {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .download-btn {
          background: #fff;
          border: none;
          border-radius: 12px;
          padding: 1.1rem 2rem;
          color: #080808;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          width: 100%;
          min-height: 52px;
          transition: background 0.2s ease;
          font-family: inherit;
          letter-spacing: -0.01em;
        }

        .download-btn:hover {
          background: #e0e0e0;
        }

        /* ─── Mobile: Bottom Sheet ─── */
        @media (max-width: 600px) {
          .modal-positioner {
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            transform: none;
            max-width: 100%;
            padding: 0;
          }

          .modal-box {
            border-radius: 24px 24px 0 0;
            animation: slideUp 0.3s ease forwards;
          }

          .modal-header {
            padding: 1.5rem 1.5rem;
          }

          .modal-title {
            font-size: 1.1rem;
          }

          .modal-content {
            padding: 1.5rem;
            /* Verhindert, dass Content unter der iOS Home Bar endet */
            padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 999,
        }}
      />

      {/* Modal */}
      <div className="modal-positioner">
        <div className="modal-box">

          {/* Header */}
          <div className="modal-header">
            <div>
              <p className="modal-label">Free Download</p>
              <h3 className="modal-title">{plugin.name}</h3>
            </div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>

          {/* Content */}
          <div className="modal-content">
            {!ready ? (
              <>
                {/* Status Box */}
                <div className="status-box">
                  <div className="pulse-dot" />
                  <div>
                    <p className="status-title">Download is being prepared</p>
                    <p className="status-sub">Enter your email to unlock it</p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="email-form">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="email-input"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="submit-btn"
                  >
                    {loading ? 'Unlocking...' : 'Unlock Download →'}
                  </button>
                </form>

                {error && <p className="error-msg">{error}</p>}

                <p className="fine-print">No spam. Unsubscribe anytime.</p>
              </>
            ) : (
              /* Download Ready */
              <div className="ready-box">
                <div className="ready-icon">🎛️</div>
                <h4 className="ready-title">Download Unlocked!</h4>
                <p className="ready-sub">Your download is ready.</p>
                <a
                  href={plugin.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                  onClick={() => {
                    fetch('/api/stats', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        action: 'trackDownload',
                        plugin: plugin.name,
                        slug: plugin.slug,
                      }),
                    })
                  }}
                >
                  <button className="download-btn">
                    ↓ Download {plugin.name}
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}