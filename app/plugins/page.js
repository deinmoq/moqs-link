'use client'

import ParticleBackground from '../components/ParticleBackground'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function PluginsPage() {
  const [plugins, setPlugins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/plugins')
      .then(res => res.json())
      .then(data => {
        setPlugins(data.plugins || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <ParticleBackground />

      <section style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '10rem 2rem 6rem',
      }}>

        {/* Header */}
        <div style={{ marginBottom: '5rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            All Plugins
          </p>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: '1.2rem',
          }}>
            Free VST3 Plugins
          </h1>
          <p style={{
            color: '#666',
            fontSize: '0.95rem',
            maxWidth: '400px',
            lineHeight: 1.7,
          }}>
            Professional tools. No bullshit. Just download and create.
          </p>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: '#1a1a1a',
          marginBottom: '3rem',
        }} />

        {/* Loading */}
        {loading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            background: '#1a1a1a',
            border: '1px solid #1a1a1a',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                background: '#080808',
                padding: '2rem 2.5rem',
                height: '80px',
                opacity: 0.5,
              }} />
            ))}
          </div>
        )}

        {/* Plugin List */}
        {!loading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            background: '#1a1a1a',
            border: '1px solid #1a1a1a',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            {plugins.length === 0 && (
              <div style={{
                background: '#080808',
                padding: '3rem',
                textAlign: 'center',
                color: '#333',
                fontSize: '0.9rem',
              }}>
                No plugins available yet.
              </div>
            )}
            {plugins.map((plugin, i) => (
              <Link
                key={plugin.slug}
                href={`/plugins/${plugin.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    background: '#080808',
                    padding: '2rem 2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '2rem',
                    transition: 'background 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#0f0f0f'}
                  onMouseLeave={e => e.currentTarget.style.background = '#080808'}
                >
                  {/* Left */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <span style={{
                      color: '#222',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      minWidth: '24px',
                    }}>
                      0{i + 1}
                    </span>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '0.4rem',
                      }}>
                        <h2 style={{
                          color: '#ffffff',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          letterSpacing: '-0.01em',
                        }}>
                          {plugin.name}
                        </h2>
                        <span style={{
                          color: '#333',
                          fontSize: '0.75rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}>
                          {plugin.tag}
                        </span>
                      </div>
                      <p style={{
                        color: '#444',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        maxWidth: '500px',
                      }}>
                        {plugin.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      color: '#333',
                      fontSize: '0.75rem',
                      letterSpacing: '0.08em',
                    }}>
                      VST3
                    </span>
                    <span style={{
                      color: '#333',
                      fontSize: '0.75rem',
                      letterSpacing: '0.08em',
                    }}>
                      Windows
                    </span>
                    <span style={{
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                    }}>
                      Free →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </section>
    </main>
  )
}