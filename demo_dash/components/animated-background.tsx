"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  color: string
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = [
      "rgba(128, 30, 45, 0.25)",
      "rgba(180, 50, 60, 0.2)",
      "rgba(230, 120, 50, 0.25)",
      "rgba(255, 160, 80, 0.2)",
    ]

    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 50,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Animated mesh gradient */}
      <div 
        className="absolute inset-0 opacity-40 animate-gradient"
        style={{
          background: "radial-gradient(ellipse at 20% 30%, rgba(128, 30, 45, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(230, 120, 50, 0.18) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(180, 50, 60, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-3xl animate-pulse-glow"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(128, 30, 45, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 30, 45, 0.15) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}
