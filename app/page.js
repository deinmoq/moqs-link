'use client'

import { useState } from 'react'
import Intro from './components/Intro'
import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'

export default function Home() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <ParticleBackground />
      <main style={{
        opacity: introDone ? 1 : 0,
        transition: 'opacity 0.8s ease',
        position: 'relative',
        zIndex: 1,
      }}>
        <Hero />
      </main>
    </>
  )
}