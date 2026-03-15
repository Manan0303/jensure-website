import SectionContainer from '@/components/layout/SectionContainer'

const PILLARS = [
  {
    step: '01',
    title: 'The problem',
    body: 'Every business performs thousands of repetitive tasks each week — data entry, report preparation, lead follow-ups, document processing. These consume employee time but produce no strategic value.'
  },
  {
    step: '02',
    title: 'The approach',
    body: 'Jensure builds AI Departments: orchestrated systems where a Master Agent coordinates specialized Sub Agents to execute these tasks automatically. Your existing tools stay in place — we connect and operate them.'
  },
  {
    step: '03',
    title: 'The outcome',
    body: 'Your operations run without the overhead. Reports generate themselves. Leads get followed up on time. Invoices go out automatically. Your team focuses on work that actually moves the business forward.'
  }
]

export default function WhatIsJensure() {
  return (
    <SectionContainer id="what-is-jensure" className="bg-brand-surface">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">What We Do</p>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight max-w-2xl">
          AI infrastructure that runs your operations.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PILLARS.map(({ step, title, body }) => (
          <div key={step} className="flex flex-col gap-4">
            <div className="text-5xl font-bold text-white/10">{step}</div>
            <h3 className="text-lg font-semibold text-brand-text">{title}</h3>
            <p className="text-sm text-brand-text/60 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}
