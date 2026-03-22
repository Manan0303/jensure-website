'use client'

import { motion } from 'framer-motion'

const CENTER = { x: 52, y: 50 }

const SUB_AGENTS = [
  { x: 14, y: 16, delay: 0 },
  { x: 52, y: 4, delay: 0.6 },
  { x: 88, y: 16, delay: 1.2 },
  { x: 92, y: 58, delay: 1.8 },
  { x: 62, y: 90, delay: 2.4 },
  { x: 12, y: 74, delay: 3.0 },
]

export default function AgentNetworkBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.07 }}
      >
        {/* Connection lines — animated dashes flowing outward */}
        {SUB_AGENTS.map((agent, i) => (
          <motion.line
            key={`line-${i}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={agent.x}
            y2={agent.y}
            stroke="rgba(0,229,204,1)"
            strokeWidth="0.22"
            strokeDasharray="1.8 2.8"
            animate={{ strokeDashoffset: [12, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{
              strokeDashoffset: { duration: 2.5, delay: agent.delay, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 2.8, delay: agent.delay, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* Sub agent nodes */}
        {SUB_AGENTS.map((agent, i) => (
          <g key={`sub-${i}`}>
            {/* Ripple ring */}
            <motion.circle
              cx={agent.x}
              cy={agent.y}
              fill="none"
              stroke="rgba(0,229,204,0.5)"
              strokeWidth="0.25"
              animate={{ r: [2.5, 5.5, 2.5], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3.2, delay: agent.delay + 0.4, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Core dot */}
            <circle cx={agent.x} cy={agent.y} r="1.6" fill="rgba(0,229,204,0.85)" />
          </g>
        ))}

        {/* Master Agent — center node with double pulse ring */}
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          fill="none"
          stroke="rgba(61,90,254,0.45)"
          strokeWidth="0.3"
          animate={{ r: [7, 13, 7], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          fill="none"
          stroke="rgba(61,90,254,0.3)"
          strokeWidth="0.2"
          animate={{ r: [4.5, 8, 4.5], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3.5, delay: 0.6, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Core */}
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="3.5"
          fill="rgba(61,90,254,0.95)"
          animate={{ r: [3.2, 4, 3.2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}
