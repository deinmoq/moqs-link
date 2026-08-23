'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ParticleBackground from '../components/ParticleBackground'

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
        maxWidth: '900px',
        margin: '0 auto',
        padding: '10rem 2rem 6rem',
      }}>

        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.8rem',
          }}>
            Free VST3 Plugins
          </p>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            margin: 0,
          }}>
            Plugins
          </h1>
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
            {plugins.filter(p => p.visible === true || p.visible === 'true').map(plugin => (
              <Link
                key={plugin.slug}
                href={`/plugins/${plugin.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
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
                  <div style={{
                    color: '#333',
                    fontSize: '1.2rem',
                    transition: 'color 0.2s ease',
                  }}>
                    →
                  </div>

                </div>
              </Link>
            ))}

            {/* Empty State */}
            {plugins.filter(p => p.visible === true || p.visible === 'true').length === 0 && (
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