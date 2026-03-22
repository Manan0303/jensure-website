'use client'

import { motion } from 'framer-motion'

const FONT = "var(--font-geist-sans), 'Geist', system-ui, sans-serif"

const CENTER = { x: 50, y: 50 }

// Organic scattered positions — not geometric, feels natural as a background
const SUB_AGENTS = [
  { x: 16, y: 12, label: 'Lead Gen',  delay: 0,   anchor: 'start'  as const, lx:  3.5, ly: 0.5  },
  { x: 84, y: 14, label: 'Email',     delay: 0.7, anchor: 'end'    as const, lx: -3.5, ly: 0.5  },
  { x: 88, y: 82, label: 'LinkedIn',  delay: 1.4, anchor: 'end'    as const, lx: -3.5, ly: 0.5  },
  { x: 13, y: 80, label: 'Follow-up', delay: 2.1, anchor: 'start'  as const, lx:  3.5, ly: 0.5  },
]

export default function AgentNetworkBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.055 }}
      >
        {/* Connection lines — animated dashes flowing outward from master */}
        {SUB_AGENTS.map((agent, i) => (
          <motion.line
            key={`line-${i}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={agent.x}
            y2={agent.y}
            stroke="rgba(0,229,204,1)"
            strokeWidth="0.25"
            strokeDasharray="1.8 2.8"
            animate={{
              strokeDashoffset: [14, 0],
              opacity: [0.25, 0.8, 0.25],
            }}
            transition={{
              strokeDashoffset: { duration: 2.8, delay: agent.delay, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 2.8, delay: agent.delay, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* Sub-agent nodes */}
        {SUB_AGENTS.map((agent, i) => (
          <g key={`sub-${i}`}>
            <motion.circle
              cx={agent.x}
              cy={agent.y}
              fill="none"
              stroke="rgba(0,229,204,0.6)"
              strokeWidth="0.25"
              animate={{ r: [2.5, 5.5, 2.5], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3.2, delay: agent.delay + 0.5, repeat: Infinity, ease: 'easeOut' }}
            />
            <circle cx={agent.x} cy={agent.y} r="1.6" fill="rgba(0,229,204,0.85)" />
            <text
              x={agent.x + agent.lx}
              y={agent.y + agent.ly}
              fontSize="2.8"
              fontFamily={FONT}
              fontWeight="600"
              fill="rgba(0,229,204,0.75)"
              textAnchor={agent.anchor}
              dominantBaseline="middle"
            >
              {agent.label}
            </text>
          </g>
        ))}

        {/* GTM Master — center */}
        <motion.circle
          cx={CENTER.x} cy={CENTER.y}
          fill="none"
          stroke="rgba(61,90,254,0.5)"
          strokeWidth="0.3"
          animate={{ r: [7, 14, 7], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle
          cx={CENTER.x} cy={CENTER.y}
          fill="none"
          stroke="rgba(61,90,254,0.3)"
          strokeWidth="0.2"
          animate={{ r: [4.5, 9, 4.5], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 4, delay: 0.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle
          cx={CENTER.x} cy={CENTER.y}
          fill="rgba(61,90,254,0.9)"
          animate={{ r: [3.5, 4.2, 3.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text
          x={CENTER.x}
          y={CENTER.y + 8.5}
          fontSize="3"
          fontFamily={FONT}
          fontWeight="700"
          fill="rgba(61,90,254,0.8)"
          textAnchor="middle"
        >
          GTM Master
        </text>
      </svg>
    </div>
  )
}
