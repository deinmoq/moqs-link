'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const ADMIN_PASSWORD = 'Camryv12!'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [plugins, setPlugins] = useState([])
  const [emails, setEmails] = useState([])
  const [tab, setTab] = useState('plugins')
  const [loading, setLoading] = useState(false)
  const [editPlugin, setEditPlugin] = useState(null)
  const [showAddPlugin, setShowAddPlugin] = useState(false)
  const [newPlugin, setNewPlugin] = useState({
    slug: '',
    name: '',
    tag: '',
    version: 'v1.0.0',
    shortDescription: '',
    description: '',
    features: '',
    requirements: 'OS: Windows 10/11|Format: VST3|CPU: Intel/AMD x64|RAM: 4GB recommended|DAW: Any VST3 compatible DAW',
    changelog: '',
    tags: 'VST3|Windows',
    downloadUrl: '',
    image: '',
  })

  useEffect(() => {
    if (authed) {
      fetchData()
    }
  }, [authed])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [pluginsRes, emailsRes] = await Promise.all([
        fetch('/api/plugins'),
        fetch('/api/admin'),
      ])
      const pluginsData = await pluginsRes.json()
      const emailsData = await emailsRes.json()
      setPlugins(pluginsData.plugins || [])
      setEmails(emailsData.emails || [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      setError('')
    } else {
      setError('Wrong password')
    }
  }

  const handleToggleVisible = async (slug, visible) => {
    await fetch(`/api/plugins/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggleVisible', visible: !visible }),
    })
    fetchData()
  }

  const handleUpdatePlugin = async (e) => {
    e.preventDefault()
    await fetch(`/api/plugins/${editPlugin.slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updatePlugin', ...editPlugin }),
    })
    setEditPlugin(null)
    fetchData()
  }

  const handleAddPlugin = async (e) => {
    e.preventDefault()
    await fetch('/api/plugins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'addPlugin', ...newPlugin }),
    })
    setShowAddPlugin(false)
    fetchData()
  }

  // Login Screen
  if (!authed) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#080808',
        padding: '2rem',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '360px',
        }}>
          <p style={{
            color: '#444',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Admin
          </p>
          <h1 style={{
            color: '#ffffff',
            fontSize: '2rem',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: '3rem',
          }}>
            moqs Panel
          </h1>

          <form onSubmit={handleLogin} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            background: '#1a1a1a',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                background: '#0f0f0f',
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
              style={{
                background: '#ffffff',
                border: 'none',
                padding: '1rem 1.2rem',
                color: '#080808',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Login →
            </button>
          </form>

          {error && (
            <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.8rem' }}>
              {error}
            </p>
          )}
        </div>
      </main>
    )
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#080808',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '3rem',
          paddingTop: '2rem',
        }}>
          <div>
            <p style={{
              color: '#444',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              Admin Panel
            </p>
            <h1 style={{
              color: '#ffffff',
              fontSize: '2rem',
              fontWeight: '700',
              letterSpacing: '-0.02em',
            }}>
              moqs
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/" style={{
              color: '#444',
              textDecoration: 'none',
              fontSize: '0.85rem',
            }}>
              ← Website
            </Link>
            <button
              onClick={() => setAuthed(false)}
              style={{
                background: 'transparent',
                border: '1px solid #1a1a1a',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: '#444',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1px',
          background: '#1a1a1a',
          border: '1px solid #1a1a1a',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}>
          {[
            { label: 'Plugins', value: plugins.length },
            { label: 'Emails collected', value: emails.length },
            { label: 'Live', value: plugins.filter(p => p.visible === 'true' || p.visible === true).length },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: '#080808',
              padding: '1.5rem',
            }}>
              <div style={{
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: '700',
                letterSpacing: '-0.02em',
                marginBottom: '0.3rem',
              }}>
                {stat.value}
              </div>
              <div style={{
                color: '#444',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '1px',
          background: '#1a1a1a',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '2rem',
          width: 'fit-content',
        }}>
          {['plugins', 'emails'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: tab === t ? '#ffffff' : '#080808',
                border: 'none',
                padding: '0.6rem 1.5rem',
                color: tab === t ? '#080808' : '#444',
                fontSize: '0.85rem',
                fontWeight: tab === t ? '600' : '400',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: '#444', fontSize: '0.9rem' }}>Loading...</p>
        ) : (
          <>
            {/* Plugins Tab */}
            {tab === 'plugins' && (
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: '1rem',
                }}>
                  <button
                    onClick={() => setShowAddPlugin(true)}
                    style={{
                      background: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.6rem 1.2rem',
                      color: '#080808',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    + Add Plugin
                  </button>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1px',
                  background: '#1a1a1a',
                  border: '1px solid #1a1a1a',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}>
                  {plugins.map((plugin) => (
                    <div key={plugin.slug} style={{
                      background: '#080808',
                      padding: '1.5rem 2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      flexWrap: 'wrap',
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.3rem' }}>
                          <h3 style={{
                            color: '#ffffff',
                            fontSize: '1rem',
                            fontWeight: '600',
                          }}>
                            {plugin.name}
                          </h3>
                          <span style={{
                            color: '#333',
                            fontSize: '0.75rem',
                            letterSpacing: '0.08em',
                          }}>
                            {plugin.version}
                          </span>
                          <span style={{
                            background: (plugin.visible === true || plugin.visible === 'true') ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
                            border: `1px solid ${(plugin.visible === true || plugin.visible === 'true') ? 'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)'}`,
                            borderRadius: '100px',
                            padding: '0.15rem 0.6rem',
                            color: (plugin.visible === true || plugin.visible === 'true') ? '#00ff00' : '#ff4444',
                            fontSize: '0.7rem',
                          }}>
                            {(plugin.visible === true || plugin.visible === 'true') ? 'Live' : 'Hidden'}
                          </span>
                        </div>
                        <p style={{
                          color: '#444',
                          fontSize: '0.8rem',
                        }}>
                          {plugin.slug}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleToggleVisible(plugin.slug, plugin.visible === true || plugin.visible === 'true')}
                          style={{
                            background: 'transparent',
                            border: '1px solid #1a1a1a',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            color: '#666',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                          }}
                        >
                          {(plugin.visible === true || plugin.visible === 'true') ? 'Hide' : 'Show'}
                        </button>
                        <button
                          onClick={() => setEditPlugin(plugin)}
                          style={{
                            background: 'transparent',
                            border: '1px solid #1a1a1a',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            color: '#666',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                          }}
                        >
                          Edit
                        </button>
                        <Link
                          href={`/plugins/${plugin.slug}`}
                          target="_blank"
                          style={{
                            background: 'transparent',
                            border: '1px solid #1a1a1a',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            color: '#666',
                            fontSize: '0.8rem',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                        >
                          View →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emails Tab */}
            {tab === 'emails' && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1px',
                background: '#1a1a1a',
                border: '1px solid #1a1a1a',
                borderRadius: '12px',
                overflow: 'hidden',
              }}>
                {emails.length === 0 ? (
                  <div style={{
                    background: '#080808',
                    padding: '3rem',
                    textAlign: 'center',
                    color: '#333',
                    fontSize: '0.9rem',
                  }}>
                    No emails yet
                  </div>
                ) : (
                  emails.map((entry, i) => (
                    <div key={i} style={{
                      background: '#080808',
                      padding: '1rem 2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                    }}>
                      <span style={{ color: '#ffffff', fontSize: '0.9rem' }}>
                        {entry.Email}
                      </span>
                      <span style={{ color: '#444', fontSize: '0.8rem' }}>
                        {entry.Plugin}
                      </span>
                      <span style={{ color: '#333', fontSize: '0.8rem' }}>
                        {entry.Date}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}

        {/* Edit Plugin Modal */}
        {editPlugin && (
          <>
            <div
              onClick={() => setEditPlugin(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(8px)',
                zIndex: 999,
              }}
            />
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              width: '100%',
              maxWidth: '600px',
              padding: '0 1rem',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}>
              <div style={{
                background: '#0f0f0f',
                border: '1px solid #1a1a1a',
                borderRadius: '16px',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '1.5rem 1.8rem',
                  borderBottom: '1px solid #1a1a1a',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <h3 style={{ color: '#ffffff', fontWeight: '600' }}>
                    Edit – {editPlugin.name}
                  </h3>
                  <button
                    onClick={() => setEditPlugin(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#444',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleUpdatePlugin} style={{ padding: '1.8rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1a1a1a', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
                    {[
                      { label: 'Name', key: 'name' },
                      { label: 'Tag', key: 'tag' },
                      { label: 'Version', key: 'version' },
                      { label: 'Short Description', key: 'shortDescription' },
                      { label: 'Download URL', key: 'downloadUrl' },
                      { label: 'Image URL', key: 'image' },
                    ].map(field => (
                      <div key={field.key}>
                        <input
                          placeholder={field.label}
                          value={editPlugin[field.key] || ''}
                          onChange={e => setEditPlugin({ ...editPlugin, [field.key]: e.target.value })}
                          style={{
                            width: '100%',
                            background: '#080808',
                            border: 'none',
                            padding: '0.9rem 1.2rem',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            outline: 'none',
                            fontFamily: 'inherit',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    ))}
                    <textarea
                      placeholder="Description"
                      value={editPlugin.description || ''}
                      onChange={e => setEditPlugin({ ...editPlugin, description: e.target.value })}
                      rows={4}
                      style={{
                        background: '#080808',
                        border: 'none',
                        padding: '0.9rem 1.2rem',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none',
                        fontFamily: 'inherit',
                        resize: 'none',
                      }}
                    />
                    <textarea
                      placeholder="Features (separate with |)"
                      value={editPlugin.features || ''}
                      onChange={e => setEditPlugin({ ...editPlugin, features: e.target.value })}
                      rows={3}
                      style={{
                        background: '#080808',
                        border: 'none',
                        padding: '0.9rem 1.2rem',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none',
                        fontFamily: 'inherit',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.9rem 1.5rem',
                      color: '#080808',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      width: '100%',
                    }}
                  >
                    Save Changes →
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        {/* Add Plugin Modal */}
        {showAddPlugin && (
          <>
            <div
              onClick={() => setShowAddPlugin(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(8px)',
                zIndex: 999,
              }}
            />
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              width: '100%',
              maxWidth: '600px',
              padding: '0 1rem',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}>
              <div style={{
                background: '#0f0f0f',
                border: '1px solid #1a1a1a',
                borderRadius: '16px',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '1.5rem 1.8rem',
                  borderBottom: '1px solid #1a1a1a',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <h3 style={{ color: '#ffffff', fontWeight: '600' }}>
                    Add New Plugin
                  </h3>
                  <button
                    onClick={() => setShowAddPlugin(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#444',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddPlugin} style={{ padding: '1.8rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1a1a1a', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
                    {[
                      { label: 'Slug (z.B. my-plugin)', key: 'slug' },
                      { label: 'Name', key: 'name' },
                      { label: 'Tag (z.B. FX · Dynamics)', key: 'tag' },
                      { label: 'Version', key: 'version' },
                      { label: 'Short Description', key: 'shortDescription' },
                      { label: 'Download URL', key: 'downloadUrl' },
                      { label: 'Image URL (optional)', key: 'image' },
                    ].map(field => (
                      <input
                        key={field.key}
                        placeholder={field.label}
                        required={field.key !== 'image'}
                        value={newPlugin[field.key]}
                        onChange={e => setNewPlugin({ ...newPlugin, [field.key]: e.target.value })}
                        style={{
                          background: '#080808',
                          border: 'none',
                          padding: '0.9rem 1.2rem',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          outline: 'none',
                          fontFamily: 'inherit',
                        }}
                      />
                    ))}
                    <textarea
                      placeholder="Description"
                      required
                      value={newPlugin.description}
                      onChange={e => setNewPlugin({ ...newPlugin, description: e.target.value })}
                      rows={4}
                      style={{
                        background: '#080808',
                        border: 'none',
                        padding: '0.9rem 1.2rem',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none',
                        fontFamily: 'inherit',
                        resize: 'none',
                      }}
                    />
                    <textarea
                      placeholder="Features (separate with |)"
                      required
                      value={newPlugin.features}
                      onChange={e => setNewPlugin({ ...newPlugin, features: e.target.value })}
                      rows={3}
                      style={{
                        background: '#080808',
                        border: 'none',
                        padding: '0.9rem 1.2rem',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none',
                        fontFamily: 'inherit',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.9rem 1.5rem',
                      color: '#080808',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      width: '100%',
                    }}
                  >
                    Add Plugin →
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

      </div>
    </main>
  )
}