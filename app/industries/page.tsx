'use client'

import { motion } from 'framer-motion'
import SectionContainer from '@/components/layout/SectionContainer'
import IndustryCard from '@/components/ui/IndustryCard'
import CTAButton from '@/components/ui/CTAButton'
import { INDUSTRIES } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
})

const AUTOMATABLE_TASKS = [
  'Reporting and analytics',
  'Customer communication',
  'Data entry and synchronization',
  'Document processing',
  'Lead generation and follow-up',
  'Scheduling and coordination',
  'Invoice and payment management'
]

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 80% 20%, rgba(0,229,204,0.12) 0%, transparent 50%), radial-gradient(circle at 10% 70%, rgba(61,90,254,0.15) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p {...fadeUp(0)} className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Industries</motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            Automation across every industry.
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-lg text-brand-text/60 max-w-2xl leading-relaxed">
            Every industry has repetitive, predictable work. Jensure identifies it and builds the systems to remove it — regardless of the sector.
          </motion.p>
        </div>
      </section>

      {/* Industry Grid */}
      <SectionContainer className="bg-brand-surface">
        <motion.div {...fadeUp()} className="mb-10">
          <h2 className="text-3xl font-bold text-brand-text tracking-tight">17 industries supported</h2>
          <p className="mt-3 text-brand-text/55">Each card shows the core operational problem and the type of automation Jensure deploys to solve it.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((industry, i) => (
            <motion.div key={industry.id} {...fadeUp(Math.min(i * 0.04, 0.4))}>
              <IndustryCard
                icon={industry.icon}
                name={industry.name}
                painPoint={industry.painPoint}
                automationExample={industry.automationExample}
              />
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* Pattern section */}
      <SectionContainer className="bg-brand-bg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">The Principle</p>
            <h2 className="text-3xl font-bold text-brand-text tracking-tight mb-5">
              Any process that follows a pattern can be automated.
            </h2>
            <p className="text-brand-text/60 leading-relaxed mb-4">
              The core philosophy behind every Jensure build: if a task follows predictable steps, it can be replaced with an AI agent that executes those steps without human input.
            </p>
            <p className="text-brand-text/60 leading-relaxed mb-6">
              This applies regardless of industry. The specific workflows differ, but the underlying pattern — receive input, process it, produce output, trigger the next step — is consistent.
            </p>
            <p className="text-sm italic text-brand-text/40 mb-8">Jensure — Jack of all trades, master of all.</p>
            <CTAButton href="/book-a-call" variant="primary">Book Automation Audit</CTAButton>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="space-y-3">
            {AUTOMATABLE_TASKS.map((task, i) => (
              <motion.div
                key={task}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-3 bg-brand-surface border border-white/8 rounded-lg px-4 py-3 hover:border-brand-cta/30 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cta flex-shrink-0" />
                <span className="text-sm text-brand-text/70">{task}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-15 blur-3xl bg-brand-accent" />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-text tracking-tight mb-4">Find your automation opportunity.</h2>
          <p className="text-brand-text/60 mb-8">Book a free audit and we will map the highest-value automation opportunities in your specific operation.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
