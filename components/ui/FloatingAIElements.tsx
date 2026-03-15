'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const NODES = [
  { id: 'master', label: 'Master Agent', x: '50%', y: '20%', size: 56, delay: 0, color: 'accent' },
  { id: 'marketing', label: 'Marketing', x: '20%', y: '55%', size: 44, delay: 0.3, color: 'cta' },
  { id: 'sales', label: 'Sales', x: '80%', y: '45%', size: 44, delay: 0.5, color: 'cta' },
  { id: 'ops', label: 'Ops', x: '35%', y: '80%', size: 36, delay: 0.7, color: 'light' },
  { id: 'analytics', label: 'Analytics', x: '65%', y: '75%', size: 36, delay: 0.9, color: 'light' }
] as const

const FLOAT_ANIMATIONS = [
  { duration: 7, yRange: 14, rotateRange: 2 },
  { duration: 9, yRange: 18, rotateRange: -3 },
  { duration: 6, yRange: 10, rotateRange: 2 },
  { duration: 8, yRange: 16, rotateRange: -2 },
  { duration: 10, yRange: 12, rotateRange: 3 }
]

export default function FloatingAIElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })
  const parallaxX = useTransform(springX, [-1, 1], [-12, 12])
  const parallaxY = useTransform(springY, [-1, 1], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.width / 2
    const cy = rect.height / 2
    mouseX.set((e.clientX - rect.left - cx) / cx)
    mouseY.set((e.clientY - rect.top - cy) / cy)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const colorMap = {
    accent: {
      bg: 'rgba(61,90,254,0.15)',
      border: 'rgba(61,90,254,0.4)',
      text: '#6B85FF',
      glow: 'rgba(61,90,254,0.25)',
      glowShadow: '0 0 16px rgba(61,90,254,0.2)'
    },
    cta: {
      bg: 'rgba(0,229,204,0.12)',
      border: 'rgba(0,229,204,0.35)',
      text: '#00E5CC',
      glow: 'rgba(0,229,204,0.25)',
      glowShadow: '0 0 16px rgba(0,229,204,0.2)'
    },
    light: {
      bg: 'rgba(107,133,255,0.1)',
      border: 'rgba(107,133,255,0.3)',
      text: '#8BA0FF',
      glow: 'rgba(107,133,255,0.15)',
      glowShadow: 'none'
    }
  }

  return (
    // Outer: captures mouse events (pointer-events on)
    <div
      ref={containerRef}
      className="absolute inset-0 select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static SVG connector lines */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" aria-hidden="true">
        <line x1="50%" y1="20%" x2="20%" y2="55%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="50%" y1="20%" x2="80%" y2="45%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="20%" y1="55%" x2="35%" y2="80%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="80%" y1="45%" x2="65%" y2="75%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 6" />
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3D5AFE" />
            <stop offset="100%" stopColor="#00E5CC" />
          </linearGradient>
        </defs>
      </svg>

      {/* Parallax wrapper — separate from float animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: parallaxX, y: parallaxY }}
      >
        {NODES.map((node, i) => {
          const anim = FLOAT_ANIMATIONS[i % FLOAT_ANIMATIONS.length]
          const colors = colorMap[node.color]

          return (
            <motion.div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: node.delay, ease: 'backOut' }}
            >
              {/* Float animation on inner wrapper */}
              <motion.div
                animate={{
                  y: [0, -anim.yRange, 0],
                  rotate: [0, anim.rotateRange, 0]
                }}
                transition={{
                  duration: anim.duration,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative flex flex-col items-center"
              >
                {/* Glow pulse */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: anim.duration * 0.7, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: node.size * 1.8,
                    height: node.size * 1.8,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: colors.glow
                  }}
                />

                {/* Node box */}
                <div
                  className="relative rounded-xl flex items-center justify-center backdrop-blur-sm"
                  style={{
                    width: node.size,
                    height: node.size,
                    fontSize: node.size > 50 ? '9px' : '8px',
                    fontWeight: 600,
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    boxShadow: colors.glowShadow,
                    textAlign: 'center',
                    padding: '4px'
                  }}
                >
                  {node.label}
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
