'use client'

import { motion } from 'framer-motion'
import CTAButton from '@/components/ui/CTAButton'
import FloatingAIElements from '@/components/ui/FloatingAIElements'

export default function HeroSection() {
  return (
    <section
      className="relative pt-32 pb-24 md:pt-44 md:pb-32 px-6 md:px-12 lg:px-16 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 20% 30%, rgba(61,90,254,0.25) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(0,229,204,0.20) 0%, transparent 40%), linear-gradient(135deg, #0A0F2C, #141A4F, #0D3B66)'
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* Floating AI node visualization — right side only on large screens */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <FloatingAIElements />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/10 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cta animate-pulse" />
            <span className="text-xs font-medium text-brand-text/80 tracking-wide uppercase">AI Automation Agency</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance mb-6 text-brand-text"
          >
            Hire an Entire{' '}
            <br className="hidden sm:block" />
            <span className="text-brand-accent">AI Department</span>
            <br className="hidden sm:block" />
            {' '}for Less Than One Employee.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-brand-text/70 max-w-2xl leading-relaxed mb-10"
          >
            Jensure deploys coordinated AI agents that run your outreach, operations, reporting, and follow-ups — automatically, 24/7, without adding headcount.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <CTAButton href="/book-a-call" variant="primary" size="large">
              Book Automation Audit
            </CTAButton>
            <CTAButton href="/#automation-discovery" variant="secondary" size="large">
              Describe Your Workflow
            </CTAButton>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-10"
          >
            {[
              { value: '80%', label: 'Admin time eliminated' },
              { value: '3×', label: 'Output without hiring' },
              { value: '6 hrs → 2 min', label: 'Reporting time' }
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-brand-text">{value}</div>
                <div className="text-sm text-brand-text/50 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
