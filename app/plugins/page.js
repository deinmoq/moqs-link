'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ParticleBackground from '../components/ParticleBackground'

const SORT_OPTIONS = [
  { value: 'manual', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'downloads_desc', label: 'Most Popular' },
  { value: 'downloads_asc', label: 'Least Popular' },
]

function getBadge(plugin) {
  const now = new Date()
  const tenDays = 10 * 24 * 60 * 60 * 1000

  if (plugin.isNew) {
    const markedAt = new Date(plugin.isNew)
    if (!isNaN(markedAt) && now - markedAt < tenDays) return 'new'
  }
  if (plugin.isUpdated) {
    const markedAt = new Date(plugin.isUpdated)
    if (!isNaN(markedAt) && now - markedAt < tenDays) return 'updated'
  }
  return null
}

export default function PluginsPage() {
  const [plugins, setPlugins] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('manual')

  useEffect(() => {
    fetch('/api/plugins')
      .then(res => res.json())
      .then(data => {
        setPlugins(data.plugins || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const visiblePlugins = plugins.filter(p => p.visible === true || p.visible === 'true')

  const sortedPlugins = [...visiblePlugins].sort((a, b) => {
    if (sort === 'newest') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    }
    if (sort === 'oldest') {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
    }
    if (sort === 'downloads_desc') {
      return (Number(b.downloads) || 0) - (Number(a.downloads) || 0)
    }
    if (sort === 'downloads_asc') {
      return (Number(a.downloads) || 0) - (Number(b.downloads) || 0)
    }
    return 0 // manual = Reihenfolge wie in Sheets
  })

  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <ParticleBackground />

      <section style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '900px',
        margin: '0 auto',
        padding: '10rem 2rem 6rem',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          <div>
            <p style={{
              color: '#444',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
              margin: 0,
            }}>
              Free VST3 Plugins
            </p>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              margin: '0.5rem 0 0',
            }}>
              Plugins
            </h1>
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ color: '#444', fontSize: '0.8rem' }}>Sort by</span>
            <div style={{ position: 'relative' }}>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  background: '#0f0f0f',
                  border: '1px solid #1a1a1a',
                  borderRadius: '8px',
                  padding: '0.5rem 2rem 0.5rem 0.9rem',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  outline: 'none',
                  fontFamily: 'inherit',
                  appearance: 'none',
                }}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span style={{
                position: 'absolute',
                right: '0.7rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#444',
                pointerEvents: 'none',
                fontSize: '0.7rem',
              }}>
                ▾
              </span>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p style={{ color: '#333', fontSize: '0.9rem' }}>Loading...</p>
        )}

        {/* Plugin List */}
        {!loading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            background: '#1a1a1a',
            border: '1px solid #1a1a1a',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            {sortedPlugins.map(plugin => {
              const badge = getBadge(plugin)
              return (
                <Link
                  key={plugin.slug}
                  href={`/plugins/${plugin.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      background: '#080808',
                      padding: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '2rem',
                      flexWrap: 'wrap',
                      transition: 'background 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#0f0f0f'}
                    onMouseLeave={e => e.currentTarget.style.background = '#080808'}
                  >
                    {/* Left: Image + Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      {/* Thumbnail */}
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '10px',
                        background: '#111',
                        border: '1px solid #1a1a1a',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}>
                        {plugin.image ? (
                          <img
                            src={plugin.image}
                            alt={plugin.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#222',
                            fontSize: '0.6rem',
                            letterSpacing: '0.1em',
                          }}>
                            VST
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.8rem',
                          marginBottom: '0.4rem',
                          flexWrap: 'wrap',
                        }}>
                          <h2 style={{
                            color: '#ffffff',
                            fontSize: '1rem',
                            fontWeight: '600',
                            margin: 0,
                          }}>
                            {plugin.name}
                          </h2>
                          <span style={{
                            color: '#333',
                            fontSize: '0.75rem',
                            letterSpacing: '0.08em',
                          }}>
                            {plugin.version}
                          </span>

                          {/* Badge */}
                          {badge === 'new' && (
                            <span style={{
                              background: 'rgba(255,255,255,0.08)',
                              border: '1px solid rgba(255,255,255,0.15)',
                              borderRadius: '100px',
                              padding: '0.15rem 0.6rem',
                              color: '#ffffff',
                              fontSize: '0.65rem',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              fontWeight: '600',
                            }}>
                              New
                            </span>
                          )}
                          {badge === 'updated' && (
                            <span style={{
                              background: 'rgba(100,180,255,0.08)',
                              border: '1px solid rgba(100,180,255,0.2)',
                              borderRadius: '100px',
                              padding: '0.15rem 0.6rem',
                              color: '#64b4ff',
                              fontSize: '0.65rem',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              fontWeight: '600',
                            }}>
                              Updated
                            </span>
                          )}

                          {/* Downloads */}
                          {Number(plugin.downloads) > 0 && (
                            <span style={{
                              color: '#333',
                              fontSize: '0.75rem',
                            }}>
                              ↓ {Number(plugin.downloads).toLocaleString()}
                            </span>
                          )}
                        </div>

                        <p style={{
                          color: '#444',
                          fontSize: '0.8rem',
                          margin: 0,
                          letterSpacing: '0.05em',
                        }}>
                          {plugin.tag}
                        </p>
                        <p style={{
                          color: '#333',
                          fontSize: '0.8rem',
                          margin: '0.4rem 0 0',
                          maxWidth: '400px',
                          lineHeight: 1.5,
                        }}>
                          {plugin.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Right: Arrow */}
                    <div style={{ color: '#333', fontSize: '1.2rem' }}>→</div>
                  </div>
                </Link>
              )
            })}

            {sortedPlugins.length === 0 && (
              <div style={{
                background: '#080808',
                padding: '4rem',
                textAlign: 'center',
                color: '#333',
                fontSize: '0.9rem',
              }}>
                No plugins available yet.
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  )
}