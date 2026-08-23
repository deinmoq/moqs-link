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
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0px);  opacity: 1; }
        }

        .dm-positioner {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          width: 100%;
          max-width: 580px;
          padding: 0 1.5rem;
          box-sizing: border-box;
        }

        .dm-box {
          background: #0f0f0f;
          border: 1px solid #222;
          border-radius: 20px;
          overflow: hidden;
          animation: slideUp 0.25s ease forwards;
        }

        .dm-header {
          padding: 2rem 2.4rem;
          border-bottom: 1px solid #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .dm-label {
          color: #555;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
          margin-top: 0;
        }

        .dm-title {
          color: #fff;
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .dm-close {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          color: #666;
          font-size: 1rem;
          cursor: pointer;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .dm-close:hover {
          background: #222;
          color: #fff;
          border-color: #333;
        }

        .dm-content {
          padding: 2.4rem;
        }

        .dm-status {
          background: #080808;
          border: 1px solid #1e1e1e;
          border-radius: 12px;
          padding: 1.4rem;
          margin-bottom: 1.8rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .dm-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #fff;
          flex-shrink: 0;
          animation: pulse 2s ease infinite;
        }

        .dm-status-title {
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          margin-top: 0;
        }

        .dm-status-sub {
          color: #555;
          font-size: 0.85rem;
          margin: 0;
        }

        .dm-form {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #222;
        }

        .dm-input {
          background: #0a0a0a;
          border: none;
          padding: 1.15rem 1.4rem;
          color: #fff;
          font-size: 1rem;
          outline: none;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
        }

        .dm-input::placeholder { color: #444; }

        .dm-submit {
          background: #fff;
          border: none;
          padding: 1.15rem 1.4rem;
          color: #080808;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s ease, opacity 0.2s ease;
          min-height: 54px;
          letter-spacing: -0.01em;
        }

        .dm-submit:hover:not(:disabled) { background: #e0e0e0; }
        .dm-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .dm-error {
          color: #ff5555;
          font-size: 0.82rem;
          margin-top: 0.9rem;
          margin-bottom: 0;
        }

        .dm-fine {
          color: #333;
          font-size: 0.75rem;
          margin-top: 1.2rem;
          margin-bottom: 0;
          line-height: 1.6;
        }

        /* Ready state */
        .dm-ready {
          text-align: center;
          padding: 1.5rem 0;
        }

        .dm-ready-icon {
          font-size: 3rem;
          margin-bottom: 1.2rem;
        }

        .dm-ready-title {
          color: #fff;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          margin-top: 0;
        }

        .dm-ready-sub {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          margin-top: 0;
        }

        .dm-dl-btn {
          background: #fff;
          border: none;
          border-radius: 12px;
          padding: 1.15rem 2rem;
          color: #080808;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          width: 100%;
          min-height: 54px;
          transition: background 0.2s ease;
          font-family: inherit;
          letter-spacing: -0.01em;
        }

        .dm-dl-btn:hover { background: #e0e0e0; }

        /* Mobile: bottom sheet */
        @media (max-width: 600px) {
          .dm-positioner {
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            transform: none;
            max-width: 100%;
            padding: 0;
          }

          .dm-box {
            border-radius: 24px 24px 0 0;
          }

          .dm-header {
            padding: 1.5rem 1.6rem;
          }

          .dm-title {
            font-size: 1.15rem;
          }

          .dm-content {
            padding: 1.6rem;
            padding-bottom: calc(1.6rem + env(safe-area-inset-bottom));
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
      <div className="dm-positioner">
        <div className="dm-box">

          {/* Header */}
          <div className="dm-header">
            <div>
              <p className="dm-label">Free Download</p>
              <h3 className="dm-title">{plugin.name}</h3>
            </div>
            <button className="dm-close" onClick={onClose}>✕</button>
          </div>

          {/* Content */}
          <div className="dm-content">
            {!ready ? (
              <>
                <div className="dm-status">
                  <div className="dm-dot" />
                  <div>
                    <p className="dm-status-title">Download is being prepared</p>
                    <p className="dm-status-sub">Enter your email to unlock it</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="dm-form">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="dm-input"
                  />
                  <button type="submit" disabled={loading} className="dm-submit">
                    {loading ? 'Unlocking...' : 'Unlock Download →'}
                  </button>
                </form>

                {error && <p className="dm-error">{error}</p>}
                <p className="dm-fine">No spam. Unsubscribe anytime.</p>
              </>
            ) : (
              <div className="dm-ready">
                <div className="dm-ready-icon">🎛️</div>
                <h4 className="dm-ready-title">Download Unlocked!</h4>
                <p className="dm-ready-sub">Your download is ready.</p>
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
                  <button className="dm-dl-btn">
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