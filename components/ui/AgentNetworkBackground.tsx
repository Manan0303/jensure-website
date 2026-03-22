'use client'

import { motion } from 'framer-motion'

// 4 sub-agents in a wide compass layout — fully spread to edges so the animation feels zoomed out
const CENTER = { x: 50, y: 50 }

const SUB_AGENTS = [
  { x: 50, y: 6,  label: 'Lead Gen',   anchor: 'middle' as const, labelDx: 0,    labelDy: -3.8 },
  { x: 93, y: 50, label: 'Email',       anchor: 'start'  as const, labelDx: 3.2,  labelDy: 0.8  },
  { x: 50, y: 93, label: 'LinkedIn',    anchor: 'middle' as const, labelDx: 0,    labelDy: 4.2  },
  { x: 7,  y: 50, label: 'Follow-up',   anchor: 'end'    as const, labelDx: -3.2, labelDy: 0.8  },
]

const FONT = "var(--font-geist-sans), 'Geist', system-ui, sans-serif"

export default function AgentNetworkBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* viewBox enlarged so the network fills the full section without clipping */}
      <svg
        viewBox="-5 -5 110 110"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.16 }}
      >
        {/* Connection lines — animated dashes flowing from center outward */}
        {SUB_AGENTS.map((agent, i) => (
          <motion.line
            key={`line-${i}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={agent.x}
            y2={agent.y}
            stroke="rgba(0,229,204,0.9)"
            strokeWidth="0.3"
            strokeDasharray="2 3"
            animate={{
              strokeDashoffset: [15, 0],
              opacity: [0.3, 0.85, 0.3],
            }}
            transition={{
              strokeDashoffset: { duration: 3, delay: i * 0.6, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 3, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* Sub-agent nodes */}
        {SUB_AGENTS.map((agent, i) => (
          <g key={`sub-${i}`}>
            {/* Ripple */}
            <motion.circle
              cx={agent.x}
              cy={agent.y}
              fill="none"
              stroke="rgba(0,229,204,0.5)"
              strokeWidth="0.3"
              animate={{ r: [2.8, 6, 2.8], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3.5, delay: i * 0.6 + 0.5, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Core */}
            <circle cx={agent.x} cy={agent.y} r="2.2" fill="rgba(0,229,204,0.9)" />
            {/* Label */}
            <text
              x={agent.x + agent.labelDx}
              y={agent.y + agent.labelDy}
              fontSize="3"
              fontFamily={FONT}
              fontWeight="600"
              fill="rgba(0,229,204,0.8)"
              textAnchor={agent.anchor}
              letterSpacing="0.1"
            >
              {agent.label}
            </text>
          </g>
        ))}

        {/* GTM Master — center node */}
        {/* Outer pulse */}
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          fill="none"
          stroke="rgba(61,90,254,0.5)"
          strokeWidth="0.35"
          animate={{ r: [8, 15, 8], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Inner pulse */}
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          fill="none"
          stroke="rgba(61,90,254,0.3)"
          strokeWidth="0.25"
          animate={{ r: [5, 10, 5], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 4, delay: 0.7, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Solid core */}
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          fill="rgba(61,90,254,0.95)"
          animate={{ r: [4, 5, 4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* GTM Master label */}
        <text
          x={CENTER.x}
          y={CENTER.y + 9}
          fontSize="3.2"
          fontFamily={FONT}
          fontWeight="700"
          fill="rgba(61,90,254,0.85)"
          textAnchor="middle"
          letterSpacing="0.15"
        >
          GTM Master
        </text>
      </svg>
    </div>
  )
}
