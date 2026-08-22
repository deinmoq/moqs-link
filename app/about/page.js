'use client'

import ParticleBackground from '../components/ParticleBackground'
import { useState } from 'react'

export default function AboutPage() {
	const [formData, setFormData] = useState({ name: '', email: '', message: '' })
	const [sent, setSent] = useState(false)
	const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSent(true)
      }
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

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

        {/* Header */}
        <div style={{ marginBottom: '5rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            About
          </p>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: '2rem',
          }}>
            moq
          </h1>
          <p style={{
            color: '#666',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            maxWidth: '520px',
          }}>
            moq is a sound designer and producer focused on Rap, Trap & HipHop.
            The goal is simple – build professional tools and give them away for free.
            No paywalls. No bullshit. Just good plugins.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '4rem' }} />

        {/* Values */}
        <div style={{ marginBottom: '5rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
            What we stand for
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            background: '#1a1a1a',
            border: '1px solid #1a1a1a',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            {[
              {
                title: 'Free Forever',
                desc: 'Every plugin on this site is free. No trials, no subscriptions, no hidden costs.',
              },
              {
                title: 'Quality First',
                desc: 'Each plugin is built to professional standards. If it\'s not good enough, it doesn\'t ship.',
              },
              {
                title: 'Built for Producers',
                desc: 'Designed specifically for Rap, Trap & HipHop workflows. Nothing generic.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#080808',
                padding: '1.8rem 2rem',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#0f0f0f'}
              onMouseLeave={e => e.currentTarget.style.background = '#080808'}>
                <h3 style={{
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.01em',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#444',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '4rem' }} />

        {/* Contact Form */}
        <div>
          <p style={{
            color: '#444',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Contact
          </p>
          <h2 style={{
            color: '#ffffff',
            fontSize: '1.8rem',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: '0.8rem',
          }}>
            Get in touch
          </h2>
          <p style={{
            color: '#444',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}>
            Questions, feedback or just want to say hi?
            Drop a message below or reach out at{' '}
            <a href="mailto:support@moqs.link" style={{
              color: '#666',
              textDecoration: 'none',
              borderBottom: '1px solid #333',
            }}>
              support@moqs.link
            </a>
          </p>

          {sent ? (
            <div style={{
              background: '#0f0f0f',
              border: '1px solid #1a1a1a',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
            }}>
              <p style={{
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
              }}>
                Message sent ✓
              </p>
              <p style={{ color: '#444', fontSize: '0.85rem' }}>
                We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
              background: '#1a1a1a',
              border: '1px solid #1a1a1a',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              {/* Name */}
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{
                  background: '#080808',
                  border: 'none',
                  padding: '1.2rem 1.5rem',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'background 0.2s ease',
                }}
                onFocus={e => e.target.style.background = '#0f0f0f'}
                onBlur={e => e.target.style.background = '#080808'}
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{
                  background: '#080808',
                  border: 'none',
                  padding: '1.2rem 1.5rem',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'background 0.2s ease',
                }}
                onFocus={e => e.target.style.background = '#0f0f0f'}
                onBlur={e => e.target.style.background = '#080808'}
              />

              {/* Message */}
              <textarea
                placeholder="Message"
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                style={{
                  background: '#080808',
                  border: 'none',
                  padding: '1.2rem 1.5rem',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'none',
                  transition: 'background 0.2s ease',
                }}
                onFocus={e => e.target.style.background = '#0f0f0f'}
                onBlur={e => e.target.style.background = '#080808'}
              />

              {/* Submit */}
           <button
  type="submit"
  disabled={loading}
  style={{
    background: '#ffffff',
    border: 'none',
    padding: '1.2rem 1.5rem',
    color: '#080808',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
    opacity: loading ? 0.7 : 1,
    transition: 'background 0.2s ease',
    letterSpacing: '0.03em',
  }}
  onMouseEnter={e => { if (!loading) e.target.style.background = '#e0e0e0' }}
  onMouseLeave={e => e.target.style.background = '#ffffff'}
>
  {loading ? 'Sending...' : 'Send Message →'}
</button>
            </form>
          )}
        </div>

      </section>
    </main>
  )
}