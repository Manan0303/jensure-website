import type { Metadata } from 'next'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'

export const metadata: Metadata = {
  title: 'About',
  description: 'Jensure is AI Operational Infrastructure. We build AI Departments that run business functions automatically — and the operating system for automated companies.',
  openGraph: {
    title: 'About | Jensure',
    description: 'Building the operating system for automated companies.',
    url: 'https://jensure.com/about'
  }
}

const VALUES = [
  { title: 'Systems over headcount', body: 'Every operational problem can be solved with better systems before adding more people. We build the systems.' },
  { title: 'Specificity over claims', body: 'We measure what we build. Time saved, tasks eliminated, hours recovered. Not vague promises about transformation.' },
  { title: 'Infrastructure over tools', body: 'We do not sell software subscriptions. We build operational infrastructure that runs your business functions end-to-end.' }
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">About</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-black tracking-tight mb-5 max-w-3xl">
            Built to run the modern business.
          </h1>
          <p className="text-lg text-brand-gray-dark max-w-2xl leading-relaxed">
            Jensure is AI Operational Infrastructure. We build the agent systems that replace repetitive work across every business function.
          </p>
        </div>
      </section>

      {/* Mission */}
      <SectionContainer className="bg-brand-off-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-black tracking-tight mb-5">The mission</h2>
            <p className="text-brand-gray-dark leading-relaxed mb-4">
              Every business, regardless of size or industry, performs thousands of repetitive operational tasks every week. Data entry, report preparation, lead follow-ups, document processing, communication management.
            </p>
            <p className="text-brand-gray-dark leading-relaxed mb-4">
              These tasks consume significant employee time but create no strategic value. They exist because the systems to automate them were not accessible to most businesses — until now.
            </p>
            <p className="text-brand-gray-dark leading-relaxed font-medium">
              Jensure eliminates these tasks by building AI-powered operational systems that perform them automatically.
            </p>
          </div>
          <div className="bg-white border border-brand-gray-light rounded-xl p-8">
            <blockquote className="text-2xl font-bold text-brand-black leading-tight mb-4">
              &ldquo;Jack of all trades. Master of all.&rdquo;
            </blockquote>
            <p className="text-brand-gray-dark text-sm leading-relaxed">
              Any operational process that follows a predictable pattern can be automated when the correct system architecture is designed. We apply this principle across every industry and every business function.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Values */}
      <SectionContainer className="bg-white">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-brand-black tracking-tight">How we operate</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map(({ title, body }) => (
            <div key={title} className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-brand-black">{title}</h3>
              <p className="text-sm text-brand-gray leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Long-term vision */}
      <SectionContainer className="bg-brand-off-white">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-brand-black tracking-tight mb-5">The long-term vision</h2>
          <p className="text-brand-gray-dark leading-relaxed mb-4">
            Jensure begins by building AI automation systems for businesses. Each system is designed, deployed, and handed over — running as operational infrastructure.
          </p>
          <p className="text-brand-gray-dark leading-relaxed mb-4">
            Over time, the most successful systems evolve into scalable software products. The AI Departments we build today become the productized platforms of tomorrow.
          </p>
          <p className="text-brand-gray-dark leading-relaxed font-medium">
            The long-term goal: the operating system for automated companies.
          </p>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-black">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Work with us.</h2>
          <p className="text-gray-400 mb-8">Book a free automation audit. We will review your operations and identify exactly what to build.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
