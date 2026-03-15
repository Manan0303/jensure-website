import type { Metadata } from 'next'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import ServiceCard from '@/components/ui/ServiceCard'
import CTAButton from '@/components/ui/CTAButton'
import { AI_DEPARTMENTS, SMALL_AUTOMATIONS, GTM_COMPONENTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Automation Services',
  description: 'Jensure offers AI Departments, GTM Systems, and targeted automations that eliminate repetitive work across every business function.',
  openGraph: {
    title: 'Automation Services | Jensure',
    description: 'AI Departments, GTM Systems, and targeted automations for every business function.',
    url: 'https://jensure.com/services'
  }
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">Services</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-black tracking-tight mb-5 max-w-3xl">
            Automation built for your operations.
          </h1>
          <p className="text-lg text-brand-gray-dark max-w-2xl leading-relaxed">
            Whether you need a complete AI Department or a targeted fix for one bottleneck, Jensure builds the right system for where you are today.
          </p>
        </div>
      </section>

      {/* AI Departments */}
      <SectionContainer className="bg-brand-off-white">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">Full Department Builds</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-brand-black tracking-tight">AI Departments</h2>
            <CTAButton href="/ai-departments" variant="secondary">View All Departments</CTAButton>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_DEPARTMENTS.map((dept) => (
            <div key={dept.id} className="bg-white border border-brand-gray-light rounded-xl p-6 flex flex-col gap-3">
              <div className="text-2xl">{dept.icon}</div>
              <h3 className="font-semibold text-brand-black">{dept.name}</h3>
              <p className="text-sm text-brand-gray leading-relaxed">{dept.masterAgent.description}</p>
              <div className="mt-2 text-xs text-brand-gray-dark">
                {dept.subAgents.length} specialized sub agents
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* GTM Systems */}
      <SectionContainer className="bg-white">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">Pipeline Automation</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-brand-black tracking-tight">GTM Systems</h2>
            <CTAButton href="/gtm-systems" variant="secondary">Learn More</CTAButton>
          </div>
          <p className="mt-4 text-brand-gray-dark max-w-2xl">Automated go-to-market systems that generate and manage leads across email, LinkedIn, and CRM without a dedicated sales team.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GTM_COMPONENTS.map((c) => (
            <div key={c.id} className="bg-brand-surface border border-brand-gray-light rounded-xl p-5">
              <div className="text-xl mb-2">{c.icon}</div>
              <h3 className="text-sm font-semibold text-brand-black">{c.title}</h3>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Small Automations */}
      <SectionContainer className="bg-brand-off-white">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">Targeted Solutions</p>
          <h2 className="text-3xl font-bold text-brand-black tracking-tight">Small Automation Solutions</h2>
          <p className="mt-4 text-brand-gray-dark max-w-2xl">Eliminate one bottleneck at a time. Each automation targets a specific task and delivers measurable time savings immediately.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SMALL_AUTOMATIONS.map((a) => (
            <ServiceCard key={a.id} icon={a.icon} title={a.title} description={a.description} badge={a.timeSaved} />
          ))}
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-black">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Not sure where to start?</h2>
          <p className="text-gray-400 mb-8">Book a free automation audit. We will identify the highest-value automation opportunities in your business.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
