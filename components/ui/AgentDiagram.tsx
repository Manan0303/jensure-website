'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface SubAgent {
  name: string
  description: string
}

interface AgentDiagramProps {
  masterAgent: { title: string; description: string }
  subAgents: SubAgent[]
  compact?: boolean
}

interface Line { x1: number; y1: number; x2: number; y2: number }

export default function AgentDiagram({ masterAgent, subAgents, compact = false }: AgentDiagramProps) {
  const masterRef = useRef<HTMLDivElement>(null)
  const subRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<Line[]>([])
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })

  const computeLines = useCallback(() => {
    if (!masterRef.current || !containerRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const master = masterRef.current.getBoundingClientRect()

    setSvgSize({ width: container.width, height: container.height })

    const masterX = master.left + master.width / 2 - container.left
    const masterY = master.bottom - container.top

    const newLines: Line[] = []
    subRefs.current.forEach((ref) => {
      if (!ref) return
      const sub = ref.getBoundingClientRect()
      newLines.push({
        x1: masterX,
        y1: masterY,
        x2: sub.left + sub.width / 2 - container.left,
        y2: sub.top - container.top,
      })
    })
    setLines(newLines)
  }, [])

  useEffect(() => {
    const raf = requestAnimationFrame(computeLines)
    window.addEventListener('resize', computeLines)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', computeLines)
    }
  }, [computeLines, subAgents])

  const gridClass =
    subAgents.length <= 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : subAgents.length === 4
      ? 'grid-cols-2 sm:grid-cols-4'
      : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3'

  return (
    <div ref={containerRef} className="relative flex flex-col items-center w-full">
      {/* SVG connector lines */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={svgSize.width}
        height={svgSize.height}
        style={{ zIndex: 0 }}
      >
        {lines.map((line, i) => (
          <line
            key={i}
            x1={line.x1} y1={line.y1}
            x2={line.x2} y2={line.y2}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        ))}
      </svg>

      {/* Master Agent */}
      <motion.div
        ref={masterRef}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative z-10 bg-brand-accent/20 border border-brand-accent/40 text-brand-text rounded-xl px-6 py-4 text-center w-full max-w-sm shadow-glow-accent"
      >
        <div className="text-xs font-semibold uppercase tracking-widest text-brand-accent/70 mb-1">Master Agent</div>
        <div className="font-semibold text-base text-brand-text">{masterAgent.title}</div>
        {!compact && (
          <p className="text-sm text-brand-text/60 mt-1 leading-snug">{masterAgent.description}</p>
        )}
      </motion.div>

      {/* Spacing between master and sub-agents */}
      <div className="h-10 relative z-10" />

      {/* Sub Agents */}
      <div className={`grid w-full gap-3 relative z-10 ${gridClass}`}>
        {subAgents.map((agent, i) => (
          <motion.div
            key={agent.name}
            ref={(el) => { subRefs.current[i] = el }}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.02, transition: { duration: 0.2 } },
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            style={{ opacity: 0, y: 12 }}
            className="bg-brand-surface-2 border border-white/10 rounded-lg p-4 text-center cursor-default relative overflow-hidden"
          >
            {/* Hover pulse ring */}
            <motion.span
              variants={{
                rest: { opacity: 0, scale: 1 },
                hover: {
                  opacity: [0, 0.7, 0],
                  scale: [1, 1.07, 1],
                  transition: { duration: 2, repeat: Infinity, ease: 'easeOut' },
                },
              }}
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{ border: '1.5px solid rgba(0,229,204,0.45)' }}
            />

            <div className="w-1.5 h-1.5 bg-brand-cta rounded-full mx-auto mb-2 relative z-10" />
            <div className="text-sm font-medium text-brand-text leading-tight relative z-10">{agent.name}</div>
            {!compact && (
              <p className="text-xs text-brand-text/55 mt-1 leading-snug relative z-10">{agent.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
