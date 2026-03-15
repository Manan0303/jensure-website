import type { Metadata } from 'next'
import SectionContainer from '@/components/layout/SectionContainer'
import IndustryCard from '@/components/ui/IndustryCard'
import CTAButton from '@/components/ui/CTAButton'
import { INDUSTRIES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Jensure builds AI automation systems for businesses across 17 industries — from healthcare and manufacturing to ecommerce and SaaS.',
  openGraph: {
    title: 'Industries | Jensure',
    description: 'AI automation for every industry — healthcare, manufacturing, finance, retail, SaaS, and more.',
    url: 'https://jensure.com/industries'
  }
}

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">Industries</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-black tracking-tight mb-5 max-w-3xl">
            Automation across every industry.
          </h1>
          <p className="text-lg text-brand-gray-dark max-w-2xl leading-relaxed">
            Every industry has repetitive, predictable work. Jensure identifies it and builds the systems to remove it — regardless of the sector.
          </p>
        </div>
      </section>

      {/* Industry Grid */}
      <SectionContainer className="bg-brand-off-white">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-brand-black tracking-tight">17 industries supported</h2>
          <p className="mt-3 text-brand-gray-dark">Each card shows the core operational problem and the type of automation Jensure deploys to solve it.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((industry) => (
            <IndustryCard
              key={industry.id}
              icon={industry.icon}
              name={industry.name}
              painPoint={industry.painPoint}
              automationExample={industry.automationExample}
            />
          ))}
        </div>
      </SectionContainer>

      {/* Common automations across industries */}
      <SectionContainer className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-black tracking-tight mb-5">
              Any process that follows a pattern can be automated.
            </h2>
            <p className="text-brand-gray-dark leading-relaxed mb-4">
              The core philosophy behind every Jensure build: if a task follows predictable steps, it can be replaced with an AI agent that executes those steps without human input.
            </p>
            <p className="text-brand-gray-dark leading-relaxed mb-8">
              This applies regardless of industry. The specific workflows differ, but the underlying pattern — receive input, process it, produce output, trigger the next step — is consistent.
            </p>
            <CTAButton href="/book-a-call" variant="primary">Book Automation Audit</CTAButton>
          </div>
          <div className="space-y-3">
            {['Reporting and analytics', 'Customer communication', 'Data entry and synchronization', 'Document processing', 'Lead generation and follow-up', 'Scheduling and coordination', 'Invoice and payment management'].map((task) => (
              <div key={task} className="flex items-center gap-3 bg-brand-surface border border-brand-gray-light rounded-lg px-4 py-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                <span className="text-sm text-brand-gray-dark">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-black">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Find your automation opportunity.</h2>
          <p className="text-gray-400 mb-8">Book a free audit and we will map the highest-value automation opportunities in your specific operation.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
