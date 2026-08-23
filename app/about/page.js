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
      if (data.success) setSent(true)
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
                desc: "Each plugin is built to professional standards. If it's not good enough, it doesn't ship.",
              },
              {
                title: 'Built for Producers',
                desc: 'Designed specifically for Rap, Trap & HipHop workflows. Nothing generic.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{ background: '#080808', padding: '1.8rem 2rem', transition: 'background 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0f0f0f'}
                onMouseLeave={e => e.currentTarget.style.background = '#080808'}
              >
                <h3 style={{
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.01em',
                }}>
                  {item.title}
                </h3>
                <p style={{ color: '#444', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '4rem' }} />

        {/* Transparency Section */}
        <div style={{ marginBottom: '5rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Transparency
          </p>
          <h2 style={{
            color: '#ffffff',
            fontSize: '1.8rem',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: '0.8rem',
          }}>
            One person. Real work.
          </h2>
          <p style={{
            color: '#444',
            fontSize: '0.85rem',
            lineHeight: 1.8,
            marginBottom: '1.5rem',
            maxWidth: '560px',
          }}>
            This entire project – the plugins, the website, the designs – is run by
            one person. To keep up with everything, AI is used as a tool in parts of
            the process: for website code, visual designs and some written content.
          </p>
          <p style={{
            color: '#444',
            fontSize: '0.85rem',
            lineHeight: 1.8,
            marginBottom: '2rem',
            maxWidth: '560px',
          }}>
            The plugin concepts, sound design decisions and everything that actually
            matters musically are done by hand. AI helps with the parts that would
            otherwise eat up all the time – so more energy can go into building
            better tools for producers.
          </p>

          {/* Info Cards */}
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
                icon: '🤖',
                title: 'AI-assisted',
                desc: 'Parts of the website, designs and written content are created with AI support.',
              },
              {
                icon: '🎛️',
                title: 'Handcrafted audio',
                desc: 'All plugin concepts, DSP decisions and sound design are done by moq personally.',
              },
              {
                icon: '👤',
                title: 'Solo project',
                desc: 'No team, no agency. One person building and maintaining everything.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#080808',
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.2rem',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#0f0f0f'}
                onMouseLeave={e => e.currentTarget.style.background = '#080808'}
              >
                <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' }}>
                  {item.icon}
                </span>
                <div>
                  <h3 style={{
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginBottom: '0.3rem',
                    margin: '0 0 0.3rem',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#444', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '4rem' }} />

        {/* Community Section */}
        <div style={{ marginBottom: '5rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Community
          </p>
          <h2 style={{
            color: '#ffffff',
            fontSize: '1.8rem',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: '0.8rem',
          }}>
            Be part of it
          </h2>
          <p style={{
            color: '#444',
            fontSize: '0.85rem',
            lineHeight: 1.8,
            marginBottom: '1.8rem',
            maxWidth: '520px',
          }}>
            Community contributions make this project better for everyone.
            Videos, tutorials, plugin showcases, artwork or feedback – all of it
            is welcome. Tag{' '}
            <a
              href="https://instagram.com/vstbymoq"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#666', textDecoration: 'none', borderBottom: '1px solid #333' }}
            >
              @vstbymoq
            </a>
            {' '}on Instagram or reach out directly.
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
              { icon: '🎬', label: 'Plugin demos & tutorials' },
              { icon: '🎨', label: 'Artwork & visual content' },
              { icon: '🎵', label: 'Tracks made with moqs plugins' },
              { icon: '💬', label: 'Feedback & feature requests' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#080808',
                  padding: '1.2rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#0f0f0f'}
                onMouseLeave={e => e.currentTarget.style.background = '#080808'}
              >
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '4rem' }} />

        {/* Follow on Instagram */}
        <div style={{ marginBottom: '5rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Stay updated
          </p>
          <h2 style={{
            color: '#ffffff',
            fontSize: '1.8rem',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: '0.8rem',
          }}>
            Follow on Instagram
          </h2>
          <p style={{
            color: '#444',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            marginBottom: '1.8rem',
            maxWidth: '480px',
          }}>
            Updates, previews and behind the scenes of new plugins.
            Follow to stay in the loop.
          </p>

          <a
            href="https://instagram.com/vstbymoq"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                background: '#0f0f0f',
                border: '1px solid #1a1a1a',
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                transition: 'border-color 0.2s ease, background 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#333'
                e.currentTarget.style.background = '#141414'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#1a1a1a'
                e.currentTarget.style.background = '#0f0f0f'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="#ffffff"/>
              </svg>
              <div>
                <p style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>
                  @vstbymoq
                </p>
                <p style={{ color: '#444', fontSize: '0.75rem', margin: '0.2rem 0 0' }}>
                  instagram.com/vstbymoq
                </p>
              </div>
              <span style={{ color: '#333', marginLeft: '0.5rem' }}>→</span>
            </div>
          </a>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '4rem' }} />

        {/* Support Section */}
        <div style={{ marginBottom: '5rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Support the project
          </p>
          <h2 style={{
            color: '#ffffff',
            fontSize: '1.8rem',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: '0.8rem',
          }}>
            Buy moq a coffee
          </h2>
          <p style={{
            color: '#444',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            marginBottom: '1.8rem',
            maxWidth: '480px',
          }}>
            All plugins are free and will stay free forever.
            If you enjoy using them and want to support the work,
            donations are always appreciated – no pressure at all.
          </p>

          <a
            href="https://paypal.me/armerkeanu"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                background: '#0f0f0f',
                border: '1px solid #1a1a1a',
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                transition: 'border-color 0.2s ease, background 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#333'
                e.currentTarget.style.background = '#141414'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#1a1a1a'
                e.currentTarget.style.background = '#0f0f0f'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 4h8.5C17.5 4 19 5.5 18.5 8c-.5 2.5-2.5 4-5 4H11l-1 5H7L7 4z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M10 12l-1.5 7" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div>
                <p style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>
                  Donate via PayPal
                </p>
                <p style={{ color: '#444', fontSize: '0.75rem', margin: '0.2rem 0 0' }}>
                  paypal.me/armerkeanu
                </p>
              </div>
              <span style={{ color: '#333', marginLeft: '0.5rem' }}>→</span>
            </div>
          </a>
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
              <p style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Message sent ✓
              </p>
              <p style={{ color: '#444', fontSize: '0.85rem', margin: 0 }}>
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
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{
                  background: '#080808', border: 'none', padding: '1.2rem 1.5rem',
                  color: '#ffffff', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
                }}
                onFocus={e => e.currentTarget.style.background = '#0f0f0f'}
                onBlur={e => e.currentTarget.style.background = '#080808'}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{
                  background: '#080808', border: 'none', padding: '1.2rem 1.5rem',
                  color: '#ffffff', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
                }}
                onFocus={e => e.currentTarget.style.background = '#0f0f0f'}
                onBlur={e => e.currentTarget.style.background = '#080808'}
              />
              <textarea
                placeholder="Message"
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                style={{
                  background: '#080808', border: 'none', padding: '1.2rem 1.5rem',
                  color: '#ffffff', fontSize: '0.9rem', outline: 'none',
                  fontFamily: 'inherit', resize: 'none',
                }}
                onFocus={e => e.currentTarget.style.background = '#0f0f0f'}
                onBlur={e => e.currentTarget.style.background = '#080808'}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#ffffff', border: 'none', padding: '1.2rem 1.5rem',
                  color: '#080808', fontSize: '0.9rem', fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                  opacity: loading ? 0.7 : 1, transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#e0e0e0' }}
                onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
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