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
        body: JSON.stringify({
          email,
          pluginName: plugin.name,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setReady(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return (
    <>
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
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        width: '100%',
        maxWidth: '440px',
        padding: '0 1rem',
      }}>
        <div style={{
          background: '#0f0f0f',
          border: '1px solid #1a1a1a',
          borderRadius: '16px',
          overflow: 'hidden',
        }}>

          {/* Header */}
          <div style={{
            padding: '1.5rem 1.8rem',
            borderBottom: '1px solid #1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <p style={{
                color: '#444',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.3rem',
              }}>
                Free Download
              </p>
              <h3 style={{
                color: '#ffffff',
                fontSize: '1.1rem',
                fontWeight: '600',
                letterSpacing: '-0.01em',
              }}>
                {plugin.name}
              </h3>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#444',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '0.2rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#444'}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '1.8rem' }}>
            {!ready ? (
              <>
                {/* Preparing Download */}
                <div style={{
                  background: '#080808',
                  border: '1px solid #1a1a1a',
                  borderRadius: '10px',
                  padding: '1.2rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    flexShrink: 0,
                    animation: 'pulse 2s ease infinite',
                  }} />
                  <div>
                    <p style={{
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      marginBottom: '0.2rem',
                    }}>
                      Download is being prepared
                    </p>
                    <p style={{
                      color: '#444',
                      fontSize: '0.8rem',
                    }}>
                      Enter your email to unlock it
                    </p>
                  </div>
                </div>

                <style>{`
                  @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                  }
                `}</style>

                <form onSubmit={handleSubmit} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1px',
                  background: '#1a1a1a',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      background: '#080808',
                      border: 'none',
                      padding: '1rem 1.2rem',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: '#ffffff',
                      border: 'none',
                      padding: '1rem 1.2rem',
                      color: '#080808',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      opacity: loading ? 0.7 : 1,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { if (!loading) e.target.style.background = '#e0e0e0' }}
                    onMouseLeave={e => e.target.style.background = '#ffffff'}
                  >
                    {loading ? 'Unlocking...' : 'Unlock Download →'}
                  </button>
                </form>

                {error && (
                  <p style={{
                    color: '#ff4444',
                    fontSize: '0.8rem',
                    marginTop: '0.8rem',
                  }}>
                    {error}
                  </p>
                )}

                <p style={{
                  color: '#333',
                  fontSize: '0.75rem',
                  marginTop: '1rem',
                  lineHeight: 1.5,
                }}>
                  No spam. Unsubscribe anytime.
                </p>
              </>
            ) : (
              /* Download Ready */
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem',
                }}>
                  🎛️
                </div>
                <h4 style={{
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                }}>
                  Download Unlocked!
                </h4>
                <p style={{
                  color: '#666',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}>
                  Your download is ready.
                </p>
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
                  <button style={{
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.9rem 2rem',
                    color: '#080808',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => e.target.style.background = '#e0e0e0'}
                  onMouseLeave={e => e.target.style.background = '#ffffff'}
                  >
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