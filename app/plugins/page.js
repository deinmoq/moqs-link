'use client'

import ParticleBackground from '../../components/ParticleBackground'
import DownloadModal from '../../components/DownloadModal'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PluginPage({ params }) {
  const [plugin, setPlugin] = useState(null)
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getSlug = async () => {
      const { slug } = await params
      setSlug(slug)
      fetch(`/api/plugins/${slug}`)
        .then(res => res.json())
        .then(data => {
          setPlugin(data.plugin || null)
          setLoading(false)

          fetch('/api/stats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'trackVisit',
              page: slug,
            }),
          })
        })
        .catch(() => setLoading(false))
    }
    getSlug()
  }, [params])

  if (loading) {
    return (
      <main style={{ position: 'relative', minHeight: '100vh' }}>
        <ParticleBackground />
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}>
          <p style={{ color: '#333', fontSize: '0.9rem' }}>Loading...</p>
        </div>
      </main>
    )
  }

  if (!plugin) {
    return (
      <main style={{ position: 'relative', minHeight: '100vh' }}>
        <ParticleBackground />
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <h1 style={{ color: '#ffffff' }}>Plugin not found</h1>
          <Link href="/plugins" style={{ color: '#666', textDecoration: 'none' }}>
            ← Back to Plugins
          </Link>
        </div>
      </main>
    )
  }

  const features = plugin.features ? plugin.features.toString().split('|') : []
  const requirements = plugin.requirements
    ? plugin.requirements.toString().split('|').map(r => {
        const [key, ...val] = r.split(':')
        return { key: key?.trim(), value: val.join(':')?.trim() }
      })
    : []
  const changelog = plugin.changelog
    ? plugin.changelog.toString().split('|').map(c => {
        const [version, ...rest] = c.split(':')
        return { version: version?.trim(), notes: rest.join(':')?.trim() }
      })
    : []
  const tags = plugin.tags ? plugin.tags.toString().split('|') : []

  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <ParticleBackground />

      <section style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '800px',
        margin: '0 auto',
        padding: '10rem 2rem 6rem',
      }}>

        {/* Back */}
        <Link href="/plugins" style={{
          color: '#444',
          textDecoration: 'none',
          fontSize: '0.85rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginBottom: '4rem',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#444'}>
          ← All Plugins
        </Link>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '4rem',
        }}>
          <div>
            <p style={{
              color: '#444',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
            }}>
              {plugin.tag} · {plugin.version}
            </p>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              margin: 0,
            }}>
              {plugin.name}
            </h1>
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{
              background: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.9rem 1.8rem',
              color: '#080808',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              alignSelf: 'flex-end',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#e0e0e0'}
            onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
          >
            ↓ Free Download
          </button>
        </div>

        {/* Image */}
        <div style={{
          width: '100%',
          height: '280px',
          background: '#0f0f0f',
          border: '1px solid #1a1a1a',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '4rem',
          overflow: 'hidden',
        }}>
          {plugin.image ? (
            <img
              src={plugin.image}
              alt={plugin.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{
              color: '#222',
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Screenshot coming soon
            </span>
          )}
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Description */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            About
          </p>
          {plugin.description.toString().split('\n\n').map((para, i) => (
            <p key={i} style={{
              color: '#888',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              marginBottom: '1rem',
            }}>
              {para}
            </p>
          ))}
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Features */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            Features
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {features.map((feature, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '1px',
                  height: '16px',
                  background: '#333',
                  flexShrink: 0,
                }} />
                <span style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Requirements */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            System Requirements
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1px',
            background: '#1a1a1a',
            border: '1px solid #1a1a1a',
            borderRadius: '10px',
            overflow: 'hidden',
          }}>
            {requirements.map(({ key, value }, i) => (
              <div key={i} style={{
                background: '#080808',
                padding: '1rem 1.2rem',
                minWidth: '160px',
                flex: '1 1 160px',
              }}>
                <div style={{
                  color: '#333',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}>
                  {key}
                </div>
                <div style={{ color: '#888', fontSize: '0.85rem', fontWeight: '500' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Changelog */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            Changelog
          </p>
          {changelog.map((entry, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '0.8rem',
            }}>
              <span style={{
                color: '#333',
                fontSize: '0.8rem',
                fontWeight: '600',
                minWidth: '50px',
              }}>
                {entry.version}
              </span>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>
                {entry.notes}
              </span>
            </div>
          ))}
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '2rem' }} />

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              border: '1px solid #1a1a1a',
              borderRadius: '6px',
              padding: '0.3rem 0.8rem',
              color: '#444',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
            }}>
              {tag}
            </span>
          ))}
        </div>

      </section>

      {showModal && (
        <DownloadModal
          plugin={{
            name: plugin.name,
            slug: slug,
            downloadUrl: plugin.downloadUrl,
          }}
          onClose={() => setShowModal(false)}
        />
      )}

    </main>
  )
}