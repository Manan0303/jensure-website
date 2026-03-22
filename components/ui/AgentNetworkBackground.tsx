'use client'

import { motion } from 'framer-motion'

type TextAnchor = 'start' | 'middle' | 'end'

const CENTER = { x: 52, y: 50, label: 'GTM Master', sublabel: 'Agent' }

const SUB_AGENTS: Array<{ x: number; y: number; label: string; delay: number; anchor: TextAnchor }> = [
  { x: 52, y: 9,  label: 'Lead Gen',   delay: 0,   anchor: 'middle' },
  { x: 87, y: 26, label: 'Email',       delay: 0.6, anchor: 'start'  },
  { x: 87, y: 72, label: 'LinkedIn',    delay: 1.2, anchor: 'start'  },
  { x: 18, y: 72, label: 'Follow-up',   delay: 1.8, anchor: 'end'    },
  { x: 18, y: 26, label: 'Analytics',   delay: 2.4, anchor: 'end'    },
]

export default function AgentNetworkBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.08 }}
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
            strokeWidth="0.2"
            strokeDasharray="1.6 2.4"
            animate={{ strokeDashoffset: [12, 0], opacity: [0.25, 0.75, 0.25] }}
            transition={{
              strokeDashoffset: { duration: 2.5, delay: agent.delay, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 2.8, delay: agent.delay, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* Sub agent nodes + labels */}
        {SUB_AGENTS.map((agent, i) => (
          <g key={`sub-${i}`}>
            {/* Ripple ring */}
            <motion.circle
              cx={agent.x}
              cy={agent.y}
              fill="none"
              stroke="rgba(0,229,204,0.55)"
              strokeWidth="0.22"
              animate={{ r: [2.5, 5.5, 2.5], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 3.2, delay: agent.delay + 0.4, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Core dot */}
            <circle cx={agent.x} cy={agent.y} r="1.8" fill="rgba(0,229,204,0.85)" />
            {/* Label */}
            <text
              x={agent.x + (agent.anchor === 'start' ? 3.2 : agent.anchor === 'end' ? -3.2 : 0)}
              y={agent.anchor === 'middle' ? agent.y - 3.5 : agent.y + 0.8}
              fontSize="2.6"
              fontFamily="system-ui, sans-serif"
              fontWeight="600"
              fill="rgba(0,229,204,0.7)"
              textAnchor={agent.anchor}
              letterSpacing="0.2"
            >
              {agent.label}
            </text>
          </g>
        ))}

        {/* Master Agent — center node with double pulse ring */}
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          fill="none"
          stroke="rgba(61,90,254,0.45)"
          strokeWidth="0.28"
          animate={{ r: [7, 13, 7], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          fill="none"
          stroke="rgba(61,90,254,0.28)"
          strokeWidth="0.18"
          animate={{ r: [4.5, 8, 4.5], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3.5, delay: 0.6, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Core */}
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="3.5"
          fill="rgba(61,90,254,0.95)"
          animate={{ r: [3.2, 4.0, 3.2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Master label */}
        <text
          x={CENTER.x}
          y={CENTER.y + 7.5}
          fontSize="2.5"
          fontFamily="system-ui, sans-serif"
          fontWeight="700"
          fill="rgba(61,90,254,0.75)"
          textAnchor="middle"
          letterSpacing="0.15"
        >
          {CENTER.label}
        </text>
        <text
          x={CENTER.x}
          y={CENTER.y + 10.2}
          fontSize="2.2"
          fontFamily="system-ui, sans-serif"
          fill="rgba(255,255,255,0.3)"
          textAnchor="middle"
        >
          {CENTER.sublabel}
        </text>
      </svg>
    </div>
  )
}
