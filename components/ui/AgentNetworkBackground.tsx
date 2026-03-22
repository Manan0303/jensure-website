'use client'

import { motion } from 'framer-motion'

const FONT = "var(--font-geist-sans), 'Geist', system-ui, sans-serif"

// Tree structure — Sales Department AI hierarchy
// Level 0: Master (top center)
// Level 1: 2 mid agents
// Level 2: 2 leaf agents under each mid agent
const MASTER = { x: 50, y: 10, label: 'CRO Agent' }

const L1 = [
  { x: 24, y: 40, label: 'Lead Enrichment' },
  { x: 76, y: 40, label: 'Pipeline Monitor' },
]

const L2 = [
  { x: 9,  y: 72, label: 'Outreach',     parent: 0, delay: 0.4  },
  { x: 36, y: 72, label: 'Scheduling',   parent: 0, delay: 0.7  },
  { x: 64, y: 72, label: 'Proposal Gen', parent: 1, delay: 1.0  },
  { x: 91, y: 72, label: 'Follow-Up',    parent: 1, delay: 1.3  },
]

// All edges in the tree
const EDGES = [
  // Master → L1
  { x1: MASTER.x, y1: MASTER.y, x2: L1[0].x, y2: L1[0].y, delay: 0   },
  { x1: MASTER.x, y1: MASTER.y, x2: L1[1].x, y2: L1[1].y, delay: 0.2 },
  // L1[0] → L2[0,1]
  { x1: L1[0].x, y1: L1[0].y, x2: L2[0].x, y2: L2[0].y, delay: 0.5 },
  { x1: L1[0].x, y1: L1[0].y, x2: L2[1].x, y2: L2[1].y, delay: 0.7 },
  // L1[1] → L2[2,3]
  { x1: L1[1].x, y1: L1[1].y, x2: L2[2].x, y2: L2[2].y, delay: 0.9 },
  { x1: L1[1].x, y1: L1[1].y, x2: L2[3].x, y2: L2[3].y, delay: 1.1 },
]

export default function AgentNetworkBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <svg
        viewBox="-2 0 104 88"
        className="w-full h-full"
        preserveAspectRatio="xMidYMin meet"
        style={{ opacity: 0.06 }}
      >
        {/* Edges — animated dashes flowing downward */}
        {EDGES.map((e, i) => (
          <motion.line
            key={`edge-${i}`}
            x1={e.x1} y1={e.y1}
            x2={e.x2} y2={e.y2}
            stroke="rgba(0,229,204,1)"
            strokeWidth="0.25"
            strokeDasharray="1.8 2.5"
            animate={{ strokeDashoffset: [12, 0], opacity: [0.2, 0.75, 0.2] }}
            transition={{
              strokeDashoffset: { duration: 2.5, delay: e.delay, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 2.5, delay: e.delay, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* L2 leaf nodes */}
        {L2.map((node, i) => (
          <g key={`l2-${i}`}>
            <motion.circle
              cx={node.x} cy={node.y}
              fill="none" stroke="rgba(0,229,204,0.55)" strokeWidth="0.22"
              animate={{ r: [2, 4.5, 2], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 3, delay: node.delay + 0.3, repeat: Infinity, ease: 'easeOut' }}
            />
            <circle cx={node.x} cy={node.y} r="1.4" fill="rgba(0,229,204,0.85)" />
            <text
              x={node.x} y={node.y + 4}
              fontSize="2.5" fontFamily={FONT} fontWeight="600"
              fill="rgba(0,229,204,0.7)" textAnchor="middle"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* L1 mid nodes */}
        {L1.map((node, i) => (
          <g key={`l1-${i}`}>
            <motion.circle
              cx={node.x} cy={node.y}
              fill="none" stroke="rgba(0,229,204,0.5)" strokeWidth="0.25"
              animate={{ r: [2.5, 5.5, 2.5], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3.5, delay: i * 0.4 + 0.2, repeat: Infinity, ease: 'easeOut' }}
            />
            <circle cx={node.x} cy={node.y} r="1.8" fill="rgba(0,229,204,0.9)" />
            <text
              x={node.x} y={node.y + 4.5}
              fontSize="2.6" fontFamily={FONT} fontWeight="600"
              fill="rgba(0,229,204,0.75)" textAnchor="middle"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Master — CRO Agent (top center) */}
        <motion.circle
          cx={MASTER.x} cy={MASTER.y}
          fill="none" stroke="rgba(61,90,254,0.5)" strokeWidth="0.3"
          animate={{ r: [6, 12, 6], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle
          cx={MASTER.x} cy={MASTER.y}
          fill="none" stroke="rgba(61,90,254,0.3)" strokeWidth="0.2"
          animate={{ r: [3.5, 7, 3.5], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 4, delay: 0.7, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle
          cx={MASTER.x} cy={MASTER.y}
          fill="rgba(61,90,254,0.95)"
          animate={{ r: [3, 3.8, 3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text
          x={MASTER.x} y={MASTER.y + 7.5}
          fontSize="3" fontFamily={FONT} fontWeight="700"
          fill="rgba(61,90,254,0.8)" textAnchor="middle"
        >
          {MASTER.label}
        </text>
      </svg>
    </div>
  )
}
