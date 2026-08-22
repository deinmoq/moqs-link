'use client'

import ParticleBackground from '../components/ParticleBackground'
import Link from 'next/link'

export default function DatenschutzPage() {
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
          Datenschutzerklärung
        </h1>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Verantwortlicher */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Verantwortlicher
          </p>
          <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 2 }}>
            Keanu Steible<br />
            Galgenbergweg 4<br />
            77933 Lahr<br />
            Deutschland<br />
            E-Mail: support@moqs.link
          </p>
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Erhobene Daten */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Welche Daten wir erheben
          </p>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Wir erheben folgende personenbezogene Daten:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              'E-Mail-Adresse (beim Plugin-Download oder Kontaktformular)',
              'Name (beim Kontaktformular)',
              'Nachricht (beim Kontaktformular)',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '1px', height: '16px', background: '#333', flexShrink: 0 }} />
                <span style={{ color: '#888', fontSize: '0.9rem' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Zweck */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Zweck der Datenverarbeitung
          </p>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Wir verwenden deine E-Mail-Adresse ausschließlich für:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              'Versand des Download-Links für angeforderte Plugins',
              'Benachrichtigungen über neue Plugins (nur mit deiner Zustimmung)',
              'Beantwortung von Kontaktanfragen',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '1px', height: '16px', background: '#333', flexShrink: 0 }} />
                <span style={{ color: '#888', fontSize: '0.9rem' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Double Opt-In */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Double Opt-In
          </p>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Beim Eintragen deiner E-Mail-Adresse erhältst du eine Bestätigungsmail. 
            Erst nach Bestätigung dieser Mail wirst du in unseren Verteiler aufgenommen. 
            Dies entspricht den Anforderungen der DSGVO.
          </p>
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Weitergabe */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Weitergabe von Daten
          </p>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Wir geben deine Daten nicht an Dritte weiter. 
            Für den E-Mail-Versand nutzen wir Resend (resend.com), 
            einem DSGVO-konformen E-Mail-Dienstleister.
          </p>
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Rechte */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Deine Rechte
          </p>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Du hast jederzeit das Recht auf:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
            {[
              'Auskunft über deine gespeicherten Daten',
              'Berichtigung unrichtiger Daten',
              'Löschung deiner Daten',
              'Widerruf deiner Einwilligung',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '1px', height: '16px', background: '#333', flexShrink: 0 }} />
                <span style={{ color: '#888', fontSize: '0.9rem' }}>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Für Anfragen wende dich an:{' '}
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

        {/* Cookies */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: '#444',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Cookies
          </p>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Diese Website verwendet keine Tracking-Cookies. 
            Es werden ausschließlich technisch notwendige Cookies verwendet, 
            die für den Betrieb der Website erforderlich sind.
          </p>
        </div>

        <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '3rem' }} />

        {/* Stand */}
        <p style={{ color: '#333', fontSize: '0.8rem' }}>
          Stand: 2024
        </p>

      </section>
    </main>
  )
}