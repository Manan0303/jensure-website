'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Metadata } from 'next'
import SectionContainer from '@/components/layout/SectionContainer'
import AgentDiagram from '@/components/ui/AgentDiagram'
import CTAButton from '@/components/ui/CTAButton'
import { AI_DEPARTMENTS } from '@/lib/constants'

const STEPS = [
  { step: '01', title: 'Discovery', body: 'We audit your operations to identify which tasks are repetitive, rule-based, and consuming the most employee time.' },
  { step: '02', title: 'Design', body: 'We architect the AI Department — selecting the right Master Agent, defining Sub Agent responsibilities, and mapping them to your existing tools.' },
  { step: '03', title: 'Deploy', body: 'We build, integrate, and test the full system. You receive a functioning AI Department connected to your stack, ready to operate.' }
]

export default function AIDepartmentsPage() {
  const [active, setActive] = useState(AI_DEPARTMENTS[0].id)
  const activeDept = AI_DEPARTMENTS.find((d) => d.id === active) ?? AI_DEPARTMENTS[0]

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">AI Departments</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-black tracking-tight mb-5 max-w-3xl">
            AI Departments that run your operations.
          </h1>
          <p className="text-lg text-brand-gray-dark max-w-2xl leading-relaxed">
            Each AI Department replicates how a real operational team functions — with a Master Agent coordinating strategy and specialized Sub Agents executing every task automatically.
          </p>
        </div>
      </section>

      {/* Department Showcase */}
      <SectionContainer className="bg-brand-off-white">
        {/* Tab nav */}
        <div className="flex flex-wrap gap-2 mb-12">
          {AI_DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActive(dept.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                active === dept.id
                  ? 'bg-brand-blue text-white'
                  : 'bg-white border border-brand-gray-light text-brand-gray-dark hover:border-brand-blue'
              }`}
            >
              {dept.icon} {dept.name.replace('AI ', '')}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDept.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-brand-black">{activeDept.name}</h2>
            </div>
            <AgentDiagram
              masterAgent={activeDept.masterAgent}
              subAgents={activeDept.subAgents}
            />
          </motion.div>
        </AnimatePresence>
      </SectionContainer>

      {/* How it works */}
      <SectionContainer className="bg-white">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">How It Works</p>
          <h2 className="text-4xl font-bold text-brand-black tracking-tight">From audit to operating department.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map(({ step, title, body }) => (
            <div key={step} className="flex flex-col gap-4">
              <div className="text-5xl font-bold text-brand-gray-light">{step}</div>
              <h3 className="text-lg font-semibold text-brand-black">{title}</h3>
              <p className="text-sm text-brand-gray leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-black">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Build your AI Department.</h2>
          <p className="text-gray-400 mb-8">Book a free audit and we will identify which department delivers the most value for your business first.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
