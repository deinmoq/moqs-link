'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '1.2rem 2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(8, 8, 8, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid #1a1a1a' : 'none',
      transition: 'all 0.4s ease',
    }}>

      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontSize: '1.1rem',
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: '0.2em',
        }}>
          moq's store
        </span>
      </Link>

      {/* Links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
      }}>
        {[
          { label: 'About', href: '/about' },
        ].map((link) => (
          <Link key={link.href} href={link.href} style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '400',
            letterSpacing: '0.05em',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.target.style.color = '#fff'}
          onMouseLeave={e => e.target.style.color = '#666'}>
            {link.label}
          </Link>
        ))}

        <Link href="/plugins" style={{ textDecoration: 'none' }}>
          <button style={{
            background: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.5rem 1.2rem',
            color: '#080808',
            fontWeight: '600',
            fontSize: '0.85rem',
            cursor: 'pointer',
            letterSpacing: '0.03em',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.target.style.background = '#e0e0e0'
          }}
          onMouseLeave={e => {
            e.target.style.background = '#ffffff'
          }}>
            Get Plugins
          </button>
        </Link>
      </div>

    </nav>
  )
}