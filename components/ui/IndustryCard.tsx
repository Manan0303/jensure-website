'use client'

import { motion } from 'framer-motion'

interface IndustryCardProps {
  icon: string
  name: string
  painPoint: string
  automationExample: string
}

export default function IndustryCard({ icon, name, painPoint, automationExample }: IndustryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="bg-brand-surface-2 border border-white/8 rounded-xl p-6 flex flex-col gap-3 hover:border-brand-accent/30 hover:shadow-card-hover transition-colors duration-200"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-semibold text-brand-text text-base">{name}</h3>
      </div>
      <p className="text-sm text-brand-text/55 leading-relaxed">{painPoint}</p>
      <div className="mt-auto pt-3 border-t border-white/8">
        <p className="text-xs font-medium text-brand-cta">{automationExample}</p>
      </div>
    </motion.div>
  )
}
