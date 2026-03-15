'use client'

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

export default function AgentDiagram({ masterAgent, subAgents, compact = false }: AgentDiagramProps) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Master Agent */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-brand-accent/20 border border-brand-accent/40 text-brand-text rounded-xl px-6 py-4 text-center w-full max-w-sm shadow-glow-accent"
      >
        <div className="text-xs font-semibold uppercase tracking-widest text-brand-accent/70 mb-1">Master Agent</div>
        <div className="font-semibold text-base text-brand-text">{masterAgent.title}</div>
        {!compact && (
          <p className="text-sm text-brand-text/60 mt-1 leading-snug">{masterAgent.description}</p>
        )}
      </motion.div>

      {/* Vertical connector */}
      <div className="w-px h-8 bg-white/15" />

      {/* Sub Agents */}
      <div className={`grid w-full gap-3 ${
        subAgents.length <= 3
          ? 'grid-cols-1 sm:grid-cols-3'
          : subAgents.length === 4
          ? 'grid-cols-2 sm:grid-cols-4'
          : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3'
      }`}>
        {subAgents.map((agent, i) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="bg-brand-surface-2 border border-white/10 rounded-lg p-4 text-center hover:border-brand-cta/30 transition-colors"
          >
            <div className="w-1.5 h-1.5 bg-brand-cta rounded-full mx-auto mb-2" />
            <div className="text-sm font-medium text-brand-text leading-tight">{agent.name}</div>
            {!compact && (
              <p className="text-xs text-brand-text/55 mt-1 leading-snug">{agent.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
