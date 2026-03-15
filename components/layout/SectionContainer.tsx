'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionContainerProps {
  id?: string
  className?: string
  children: React.ReactNode
  as?: 'section' | 'div' | 'article'
  animate?: boolean
}

export default function SectionContainer({
  id,
  className,
  children,
  as: Tag = 'section',
  animate = true
}: SectionContainerProps) {
  const content = (
    <Tag
      id={id}
      className={cn('px-6 md:px-12 lg:px-16 py-20 md:py-28', className)}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </Tag>
  )

  if (!animate) return content

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {content}
    </motion.div>
  )
}
