'use client'

import { motion } from 'framer-motion'

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  badge?: string
}

export default function ServiceCard({ icon, title, description, badge }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="bg-brand-surface border border-white/8 rounded-xl p-6 flex flex-col gap-3 hover:border-brand-accent/30 hover:shadow-card-hover transition-colors duration-200"
    >
      {badge && (
        <span className="self-start text-xs font-semibold bg-brand-cta/10 text-brand-cta px-2.5 py-1 rounded-full border border-brand-cta/20">
          {badge}
        </span>
      )}
      <div className="text-2xl">{icon}</div>
      <h3 className="text-base font-semibold text-brand-text leading-snug">{title}</h3>
      <p className="text-sm text-brand-text/55 leading-relaxed">{description}</p>
    </motion.div>
  )
}
