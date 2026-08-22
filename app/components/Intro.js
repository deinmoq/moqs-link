'use client'

import { useEffect, useState } from 'react'

export default function Intro({ onComplete }) {
  const [phase, setPhase] = useState(0)
  // phase 0: leer
  // phase 1: rakete fliegt rein
  // phase 2: MOQS erscheint
  // phase 3: alles faded out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 1200)
    const t3 = setTimeout(() => setPhase(3), 2400)
    const t4 = setTimeout(() => onComplete(), 3200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#080808',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1.5rem',
      opacity: phase === 3 ? 0 : 1,
      transition: 'opacity 0.8s ease',
      pointerEvents: phase === 3 ? 'none' : 'all',
    }}>

      <style>{`
        @keyframes rocketFly {
          0% {
            transform: translateY(120px) rotate(-45deg);
            opacity: 0;
          }
          60% {
            transform: translateY(-8px) rotate(-45deg);
            opacity: 1;
          }
          75% {
            transform: translateY(4px) rotate(-45deg);
          }
          100% {
            transform: translateY(0px) rotate(-45deg);
            opacity: 1;
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes trailFade {
          0% { opacity: 0; height: 0px; }
          100% { opacity: 1; height: 48px; }
        }

        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(123,47,255,0.6)); }
          50% { filter: drop-shadow(0 0 24px rgba(123,47,255,1)); }
        }

        .rocket {
          animation: rocketFly 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards,
                     glowPulse 1.5s ease infinite;
          font-size: 3.5rem;
          display: ${phase >= 1 ? 'block' : 'none'};
        }

        .trail {
          animation: trailFade 0.6s ease forwards;
          animation-delay: 0.3s;
          opacity: 0;
          display: ${phase >= 1 ? 'block' : 'none'};
        }

        .moqs-text {
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
          display: ${phase >= 2 ? 'block' : 'none'};
        }

        .moqs-sub {
          animation: fadeUp 0.6s ease forwards;
          animation-delay: 0.15s;
          opacity: 0;
          display: ${phase >= 2 ? 'block' : 'none'};
        }
      `}</style>

      {/* Rocket + Trail */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}>
        <div className="rocket">🚀</div>
        <div className="trail" style={{
          width: '2px',
          background: 'linear-gradient(to bottom, rgba(123,47,255,0.8), transparent)',
          borderRadius: '2px',
        }} />
      </div>

      {/* Text */}
      <div style={{ textAlign: 'center' }}>
        <div className="moqs-text" style={{
          fontSize: '3rem',
          fontWeight: '900',
          letterSpacing: '0.2em',
          color: '#ffffff',
          lineHeight: 1,
        }}>
          moqs
        </div>
        <div className="moqs-sub" style={{
          fontSize: '0.75rem',
          color: '#666',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginTop: '0.5rem',
        }}>
          Free VST3 Plugins
        </div>
      </div>

    </div>
  )
}