'use client'

import { motion } from 'framer-motion'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
})

const VALUES = [
  { title: 'Systems over headcount', body: 'Every operational problem can be solved with better systems before adding more people. We build the systems.', icon: '⚙️' },
  { title: 'Specificity over claims', body: 'We measure what we build. Time saved, tasks eliminated, hours recovered. Not vague promises about transformation.', icon: '📐' },
  { title: 'Infrastructure over tools', body: 'We do not sell software subscriptions. We build operational infrastructure that runs your business functions end-to-end.', icon: '🏗️' }
]

const PRINCIPLES = [
  { label: '80%', desc: 'Admin time eliminated in first deployment' },
  { label: '3×', desc: 'Average output increase without hiring' },
  { label: '10+', desc: 'Industries automated' },
  { label: '$100', desc: 'Starting price for automation builds' },
]

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 80% 30%, rgba(0,229,204,0.12) 0%, transparent 50%), radial-gradient(circle at 10% 60%, rgba(61,90,254,0.15) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p {...fadeUp(0)} className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">About</motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            The AI Automation Agency That Builds Operational Infrastructure.
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-lg text-brand-text/60 max-w-2xl leading-relaxed">
            Jensure is AI Operational Infrastructure. We build the agent systems that replace repetitive work across every business function.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-surface border-b border-white/8 px-6 md:px-12 lg:px-16 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {PRINCIPLES.map(({ label, desc }, i) => (
            <motion.div key={label} {...fadeUp(i * 0.08)} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-cta mb-1">{label}</div>
              <div className="text-xs text-brand-text/50">{desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <SectionContainer className="bg-brand-bg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">The Mission</p>
            <h2 className="text-3xl font-bold text-brand-text tracking-tight mb-5">The operating system for automated companies.</h2>
            <p className="text-brand-text/60 leading-relaxed mb-4">
              Every business, regardless of size or industry, performs thousands of repetitive operational tasks every week. Data entry, report preparation, lead follow-ups, document processing, communication management.
            </p>
            <p className="text-brand-text/60 leading-relaxed mb-4">
              These tasks consume significant employee time but create no strategic value. They exist because the systems to automate them were not accessible to most businesses — until now.
            </p>
            <p className="text-brand-text/80 leading-relaxed font-medium">
              Jensure eliminates these tasks by building AI-powered operational systems that perform them automatically.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="bg-brand-surface border border-brand-accent/20 rounded-2xl p-8 space-y-6">
            {[
              { metric: '6 hrs → 2 min', label: 'Manufacturing reporting automated' },
              { metric: '80%', label: 'Healthcare admin time eliminated' },
              { metric: '3×', label: 'Agency content output increase' },
            ].map(({ metric, label }) => (
              <div key={label} className="border-b border-white/8 pb-5 last:border-0 last:pb-0">
                <div className="text-2xl font-bold text-brand-cta">{metric}</div>
                <div className="text-sm text-brand-text/50 mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </SectionContainer>

      {/* Values */}
      <SectionContainer className="bg-brand-surface">
        <motion.div {...fadeUp()} className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">How We Operate</p>
          <h2 className="text-3xl font-bold text-brand-text tracking-tight">Three principles that guide every build.</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map(({ title, body, icon }, i) => (
            <motion.div key={title} {...fadeUp(i * 0.1)} className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center justify-center text-2xl">
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-brand-text">{title}</h3>
              <p className="text-sm text-brand-text/55 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* Long-term vision */}
      <SectionContainer className="bg-brand-bg">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div {...fadeUp()} className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Vision</p>
            <h2 className="text-3xl font-bold text-brand-text tracking-tight mb-5">The long-term vision</h2>
            <p className="text-brand-text/60 leading-relaxed mb-4">
              Jensure begins by building AI automation systems for businesses. Each system is designed, deployed, and handed over — running as operational infrastructure.
            </p>
            <p className="text-brand-text/60 leading-relaxed mb-4">
              Over time, the most successful systems evolve into scalable software products. The AI Departments we build today become the productized platforms of tomorrow.
            </p>
            <p className="text-brand-text/80 leading-relaxed font-semibold">
              The long-term goal: the operating system for automated companies.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="lg:col-span-2 flex flex-col gap-3">
            {['AI Departments built for your operation', 'Master + Sub Agent architecture', 'Cross-department intelligence and reporting', 'Productised into scalable platforms', 'The operating system for automated companies'].map((item, i) => (
              <div key={item} className="flex items-start gap-3 bg-brand-surface border border-white/8 rounded-lg px-4 py-3">
                <span className="w-5 h-5 rounded-full bg-brand-cta/20 text-brand-cta flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-sm text-brand-text/70">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-15 blur-3xl bg-brand-accent" />
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl bg-brand-cta" />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-text tracking-tight mb-4">Work with us.</h2>
          <p className="text-brand-text/60 mb-8">Book a free automation audit. We will review your operations and identify exactly what to build.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
