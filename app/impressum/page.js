'use client'

import ParticleBackground from '../components/ParticleBackground'
import Link from 'next/link'

export default function ImpressumPage() {
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

        <Link href="/" style={{
          color: '#444',
          textDecoration: 'none',
          fontSize: '0.85rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginBottom: '4rem',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={e => e.target.style.color = '#fff'}
        onMouseLeave={e => e.target.style.color = '#444'}>
          ← Back
        </Link>

        <p style={{
          color: '#444',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Legal
        </p>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginBottom: '4rem',
        }}>
          Impressum
        </h1>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Angaben gemäß §5 TMG */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Angaben gemäß §5 TMG
          </p>
          <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 2 }}>
            Keanu Steible<br />
            Galgenbergweg 4<br />
            77933 Lahr<br />
            Deutschland
          </p>
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Kontakt */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Kontakt
          </p>
          <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 2 }}>
            E-Mail:{' '}
            <a href="mailto:support@moqs.link" style={{
              color: '#666',
              textDecoration: 'none',
              borderBottom: '1px solid #333',
            }}>
              support@moqs.link
            </a>
          </p>
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Haftungsausschluss */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Haftungsausschluss
          </p>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong style={{ color: '#666' }}>Haftung für Inhalte:</strong><br />
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. 
            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können 
            wir jedoch keine Gewähr übernehmen.
          </p>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8 }}>
            <strong style={{ color: '#666' }}>Haftung für Links:</strong><br />
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren 
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden 
            Inhalte auch keine Gewähr übernehmen.
          </p>
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Urheberrecht */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Urheberrecht
          </p>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen 
            Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, 
            Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
            Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des 
            jeweiligen Autors bzw. Erstellers.
          </p>
        </div>

      </section>
    </main>
  )
}