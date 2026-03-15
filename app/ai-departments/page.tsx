'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AgentDiagram from '@/components/ui/AgentDiagram'
import CTAButton from '@/components/ui/CTAButton'
import { AI_DEPARTMENTS } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
})

const STEPS = [
  { step: '01', title: 'Discovery', body: 'We audit your operations to identify which tasks are repetitive, rule-based, and consuming the most employee time.' },
  { step: '02', title: 'Design', body: 'We architect the AI Department — selecting the right Master Agent, defining Sub Agent responsibilities, and mapping them to your existing tools.' },
  { step: '03', title: 'Deploy', body: 'We build, integrate, and test the full system. You receive a functioning AI Department connected to your stack, ready to operate.' }
]

const CROSS_DEPT_FLOWS = [
  { from: 'Marketing', to: 'Sales', data: 'Qualified leads & campaign data' },
  { from: 'Sales', to: 'Finance', data: 'Closed deals & revenue data' },
  { from: 'Finance', to: 'Operations', data: 'Budget approvals & spend data' },
  { from: 'HR', to: 'Operations', data: 'Headcount & resource allocation' }
]

export default function AIDepartmentsPage() {
  const [active, setActive] = useState(AI_DEPARTMENTS[0].id)
  const activeDept = AI_DEPARTMENTS.find((d) => d.id === active) ?? AI_DEPARTMENTS[0]

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 70% 20%, rgba(61,90,254,0.2) 0%, transparent 50%), radial-gradient(circle at 10% 70%, rgba(0,229,204,0.1) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p {...fadeUp(0)} className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">AI Departments</motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            AI Departments that run your operations.
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-lg text-brand-text/60 max-w-2xl leading-relaxed">
            Each AI Department replicates how a real operational team functions — with a Master Agent coordinating strategy and specialized Sub Agents executing every task automatically.
          </motion.p>
        </div>
      </section>

      {/* Department Showcase */}
      <section className="bg-brand-surface px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Select a Department</p>
            <h2 className="text-3xl font-bold text-brand-text tracking-tight mb-6">Explore each AI Department</h2>
            <div className="flex flex-wrap gap-2">
              {AI_DEPARTMENTS.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setActive(dept.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active === dept.id
                      ? 'bg-brand-accent text-white shadow-glow-accent'
                      : 'bg-brand-surface-2 border border-white/10 text-brand-text/70 hover:border-brand-accent/40 hover:text-brand-text'
                  }`}
                >
                  {dept.icon} {dept.name.replace('AI ', '')}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-brand-text">{activeDept.name}</h2>
                <p className="text-brand-text/55 mt-2 max-w-xl mx-auto text-sm">{activeDept.masterAgent.description}</p>
              </div>
              <AgentDiagram
                masterAgent={activeDept.masterAgent}
                subAgents={activeDept.subAgents}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Cross-Department Collaboration */}
      <section className="bg-brand-bg px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Cross-Department Intelligence</p>
            <h2 className="text-4xl font-bold text-brand-text tracking-tight mb-4">
              Departments that work like colleagues.
            </h2>
            <p className="text-brand-text/55 max-w-2xl mx-auto">
              AI Departments share data with each other the way real teams do — automatically. Marketing passes leads to Sales. Sales triggers Finance. Every department reports to the Director.
            </p>
          </motion.div>

          {/* Org chart visualization */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col items-center gap-6">
            {/* Director level */}
            <div className="bg-brand-surface-2 border-2 border-brand-cta/50 rounded-2xl px-8 py-5 text-center shadow-glow-cta max-w-xs w-full">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-1">Director / CEO</div>
              <div className="font-bold text-brand-text text-lg">Consolidated Report</div>
              <div className="text-xs text-brand-text/50 mt-1">Receives unified insights from all departments</div>
            </div>

            {/* Connector lines */}
            <div className="relative w-full max-w-4xl">
              <div className="flex justify-center">
                <div className="w-px h-8 bg-brand-cta/30" />
              </div>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-brand-cta/30 to-transparent" />
            </div>

            {/* Department row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full max-w-4xl">
              {AI_DEPARTMENTS.map((dept, i) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-brand-surface border border-brand-accent/20 rounded-xl p-4 text-center hover:border-brand-accent/50 transition-colors"
                >
                  <div className="text-2xl mb-2">{dept.icon}</div>
                  <div className="text-xs font-semibold text-brand-text">{dept.masterAgent.title.replace('AI Chief ', '').replace(' Officer', '')}</div>
                  <div className="text-xs text-brand-cta mt-1">{dept.subAgents.length} sub agents</div>
                </motion.div>
              ))}
            </div>

            {/* Data flow arrows */}
            <div className="w-full max-w-4xl mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CROSS_DEPT_FLOWS.map(({ from, to, data }, i) => (
                  <motion.div
                    key={`${from}-${to}`}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-brand-surface border border-white/8 rounded-lg px-4 py-3"
                  >
                    <span className="text-xs font-semibold text-brand-accent bg-brand-accent/10 rounded px-2 py-0.5">{from}</span>
                    <span className="text-brand-cta text-sm">→</span>
                    <span className="text-xs font-semibold text-brand-cta bg-brand-cta/10 rounded px-2 py-0.5">{to}</span>
                    <span className="text-xs text-brand-text/40 ml-auto">{data}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-brand-surface px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">How It Works</p>
            <h2 className="text-4xl font-bold text-brand-text tracking-tight">From audit to operating department.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map(({ step, title, body }, i) => (
              <motion.div key={step} {...fadeUp(i * 0.1)} className="flex flex-col gap-4">
                <div className="text-5xl font-bold text-white/10">{step}</div>
                <h3 className="text-lg font-semibold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-text/55 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-surface-2 relative overflow-hidden px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-15 blur-3xl bg-brand-accent" />
          <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl bg-brand-cta" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-text tracking-tight mb-4">Build your AI Department.</h2>
          <p className="text-brand-text/60 mb-8">Book a free audit and we will identify which department delivers the most value for your business first.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </section>
    </>
  )
}
