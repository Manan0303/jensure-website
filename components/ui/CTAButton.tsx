'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CTAButtonProps {
  href?: string
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'large'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export default function CTAButton({
  href,
  variant = 'primary',
  size = 'default',
  children,
  onClick,
  type = 'button',
  disabled = false,
  className
}: CTAButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cta/50',
    size === 'default' ? 'px-5 py-2.5 text-sm' : 'px-7 py-3.5 text-base',
    variant === 'primary'
      ? 'bg-brand-cta text-brand-bg hover:bg-brand-cta-dark shadow-glow-cta hover:shadow-[0_0_32px_rgba(0,229,204,0.6)] disabled:opacity-50'
      : 'border border-brand-accent text-brand-accent bg-transparent hover:bg-brand-accent/10 hover:border-brand-accent-light disabled:opacity-50',
    disabled && 'cursor-not-allowed',
    className
  )

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02, y: -1 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.15 }
  }

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={base}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={base}
    >
      {children}
    </motion.button>
  )
}
