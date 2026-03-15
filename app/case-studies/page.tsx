import type { Metadata } from 'next'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'
import { CASE_STUDY_PREVIEWS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'See how Jensure deploys AI automation across healthcare, agencies, manufacturing, and more — with measurable operational results.',
  openGraph: {
    title: 'Case Studies | Jensure',
    description: 'Real automation results across healthcare, agencies, manufacturing, and more.',
    url: 'https://jensure.com/case-studies'
  }
}

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">Case Studies</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-black tracking-tight mb-5 max-w-3xl">
            Automation in practice.
          </h1>
          <p className="text-lg text-brand-gray-dark max-w-2xl leading-relaxed">
            Concrete examples of how Jensure removes operational bottlenecks and replaces manual work with systems.
          </p>
        </div>
      </section>

      {/* Case Study Cards */}
      <SectionContainer className="bg-brand-off-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDY_PREVIEWS.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group bg-white border border-brand-gray-light rounded-xl p-7 flex flex-col gap-4 hover:border-brand-blue transition-colors"
            >
              <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">{cs.industry}</span>
              <h2 className="text-xl font-bold text-brand-black leading-snug group-hover:text-brand-blue transition-colors">
                {cs.headline}
              </h2>
              <div className="mt-auto pt-5 border-t border-brand-gray-light flex items-baseline gap-2">
                <span className="text-4xl font-bold text-brand-black">{cs.metric}</span>
                <span className="text-sm text-brand-gray">{cs.metricLabel}</span>
              </div>
            </Link>
          ))}
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-black">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Want results like these?</h2>
          <p className="text-gray-400 mb-8">Book a free automation audit and we will identify what is possible in your specific operation.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
