'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Schließe Menu bei Resize zu Desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <style>{`
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 200;
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #ffffff;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(8, 8, 8, 0.97);
          backdrop-filter: blur(20px);
          z-index: 150;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
        }

        .mobile-menu.open {
          display: flex;
        }

        @media (max-width: 640px) {
          .nav-links {
            display: none;
          }

          .hamburger {
            display: flex;
          }
        }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.2rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(8, 8, 8, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #1a1a1a' : 'none',
        transition: 'all 0.4s ease',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', zIndex: 200 }}>
          <span style={{
            fontSize: '1rem',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '0.2em',
          }}>
            moq's store
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          <Link href="/about" style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '400',
            letterSpacing: '0.05em',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
          onMouseLeave={e => (e.target as HTMLElement).style.color = '#666'}>
            About
          </Link>

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
            onMouseEnter={e => (e.target as HTMLElement).style.background = '#e0e0e0'}
            onMouseLeave={e => (e.target as HTMLElement).style.background = '#ffffff'}>
              Get Plugins
            </button>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{ zIndex: 200 }}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link href="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '0.2em',
          }}>
            moq's store
          </span>
        </Link>

        <Link href="/about" onClick={() => setMenuOpen(false)} style={{
          color: '#666',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: '400',
          letterSpacing: '0.05em',
        }}>
          About
        </Link>

        <Link href="/plugins" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
          <button style={{
            background: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '0.8rem 2.5rem',
            color: '#080808',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
          }}>
            Get Plugins
          </button>
        </Link>
      </div>
    </>
  )
}