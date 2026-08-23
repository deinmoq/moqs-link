'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.2rem;
          }

          .footer-links {
            gap: 1.2rem;
          }
        }
      `}</style>

      <footer style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid #1a1a1a',
        padding: '2.5rem 1.5rem',
      }}>
        <div className="footer-inner">

          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: '700',
              letterSpacing: '0.15em',
            }}>
              moq's store
            </span>
            <span style={{
              color: '#333',
              fontSize: '0.8rem',
            }}>
              © 2026 moq. All rights reserved.
            </span>
          </div>

          {/* Right */}
          <div className="footer-links">
            {[
              { label: 'Plugins', href: '/plugins' },
              { label: 'About', href: '/about' },
              { label: 'Impressum', href: '/impressum' },
              { label: 'Datenschutz', href: '/datenschutz' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#333'}
              >
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </footer>
    </>
  )
}