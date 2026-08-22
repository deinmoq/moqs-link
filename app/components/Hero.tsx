'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-cta:hover {
          background: #e0e0e0 !important;
        }

        .hero-cta-outline:hover {
          border-color: #ffffff !important;
          color: #ffffff !important;
        }

        .stat-item:hover {
          border-color: #333 !important;
        }

        /* Stats: 2x2 Grid auf Mobile */
        .stats-grid {
          display: flex;
          gap: 1px;
          background: #1a1a1a;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
        }

        @media (max-width: 480px) {
          .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .hero-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 280px;
          }

          .hero-cta,
          .hero-cta-outline {
            width: 100%;
            text-align: center;
          }

          .hero-badge {
            font-size: 0.65rem !important;
            padding: 0.3rem 0.8rem !important;
          }
        }

        @media (max-width: 640px) {
          .stat-item {
            padding: 1rem 1.2rem !important;
          }
        }
      `}</style>

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 1.5rem 4rem',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Badge */}
        <div className="hero-badge" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: '1px solid #1a1a1a',
          borderRadius: '100px',
          padding: '0.35rem 1rem',
          marginBottom: '2.5rem',
          opacity: visible ? 1 : 0,
          animation: visible ? 'fadeUp 0.6s ease forwards' : 'none',
        }}>
          <div style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#ffffff',
            flexShrink: 0,
          }} />
          <span style={{
            color: '#666',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Free VST3 Plugins for Producers
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(3.5rem, 14vw, 11rem)',
          fontWeight: '800',
          letterSpacing: '-0.02em',
          color: '#ffffff',
          lineHeight: 0.9,
          marginBottom: '2rem',
          opacity: visible ? 1 : 0,
          animation: visible ? 'fadeUp 0.6s ease 0.1s forwards' : 'none',
        }}>
          moqs
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
          color: '#666',
          maxWidth: '480px',
          lineHeight: 1.7,
          marginBottom: '3rem',
          padding: '0 1rem',
          opacity: visible ? 1 : 0,
          animation: visible ? 'fadeUp 0.6s ease 0.2s forwards' : 'none',
        }}>
          Professional sound design tools for Rap, Trap & HipHop producers.
          Free. Forever.
        </p>

        {/* Buttons */}
        <div className="hero-buttons" style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '5rem',
          opacity: visible ? 1 : 0,
          animation: visible ? 'fadeUp 0.6s ease 0.3s forwards' : 'none',
        }}>
          <Link href="/plugins" style={{ textDecoration: 'none', width: '100%', maxWidth: '200px' }}>
            <button className="hero-cta" style={{
              background: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.8rem 1.8rem',
              color: '#080808',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              letterSpacing: '0.03em',
              transition: 'all 0.2s ease',
              width: '100%',
            }}>
              Browse Plugins
            </button>
          </Link>

          <Link href="/about" style={{ textDecoration: 'none', width: '100%', maxWidth: '200px' }}>
            <button className="hero-cta-outline" style={{
              background: 'transparent',
              border: '1px solid #1a1a1a',
              borderRadius: '10px',
              padding: '0.8rem 1.8rem',
              color: '#666',
              fontWeight: '500',
              fontSize: '0.9rem',
              cursor: 'pointer',
              letterSpacing: '0.03em',
              transition: 'all 0.2s ease',
              width: '100%',
            }}>
              about moq
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{
          opacity: visible ? 1 : 0,
          animation: visible ? 'fadeUp 0.6s ease 0.4s forwards' : 'none',
        }}>
          {[
            { number: '3', label: 'Plugins' },
            { number: '100%', label: 'Free' },
            { number: 'VST3', label: 'Format' },
            { number: 'WIN', label: 'Windows' },
          ].map((stat) => (
            <div key={stat.label} className="stat-item" style={{
              background: '#080808',
              padding: '1.2rem 2rem',
              textAlign: 'center',
              transition: 'background 0.2s ease',
            }}>
              <div style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: '#444',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginTop: '0.2rem',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          opacity: visible ? 0.4 : 0,
          animation: visible ? 'fadeUp 0.6s ease 0.8s forwards' : 'none',
        }}>
          <span style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Scroll
          </span>
          <div style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to bottom, #444, transparent)',
          }} />
        </div>

      </section>
    </>
  )
}