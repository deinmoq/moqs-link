'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid #1a1a1a',
      padding: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1.5rem',
    }}>

      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {[
          { label: 'Plugins', href: '/plugins' },
          { label: 'About', href: '/about' },
          { label: 'Impressum', href: '/impressum' },
          { label: 'Datenschutz', href: '/datenschutz' },
        ].map(link => (
          <Link key={link.href} href={link.href} style={{
            color: '#333',
            textDecoration: 'none',
            fontSize: '0.8rem',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.target.style.color = '#fff'}
          onMouseLeave={e => e.target.style.color = '#333'}>
            {link.label}
          </Link>
        ))}
      </div>

    </footer>
  )
}