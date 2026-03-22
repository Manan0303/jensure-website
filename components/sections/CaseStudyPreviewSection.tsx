import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'
import { CASE_STUDY_PREVIEWS } from '@/lib/constants'

export default function CaseStudyPreviewSection() {
  const featured = CASE_STUDY_PREVIEWS.slice(0, 2)
  const rest = CASE_STUDY_PREVIEWS.slice(2)

  return (
    <SectionContainer id="case-studies" className="bg-brand-bg">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-cta mb-3">Results</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight max-w-xl">
            Work we have done.
          </h2>
          <CTAButton href="/case-studies" variant="secondary">
            All Case Studies
          </CTAButton>
        </div>
      </div>

      {/* Featured: Sales Automation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {featured.map((cs) => (
          <Link
            key={cs.slug}
            href={`/case-studies/${cs.slug}`}
            className="group bg-brand-surface border border-brand-cta/25 hover:border-brand-cta/50 rounded-xl p-7 flex flex-col gap-4 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-cta uppercase tracking-wider">{cs.industry}</span>
              <span className="text-xs font-medium text-brand-cta/60 border border-brand-cta/20 rounded-full px-2.5 py-0.5">Sales Automation</span>
            </div>
            <h3 className="text-lg font-semibold text-brand-text leading-snug group-hover:text-brand-cta transition-colors">
              {cs.headline}
            </h3>
            <div className="mt-auto pt-4 border-t border-white/8">
              <span className="text-4xl font-bold text-brand-cta">{cs.metric}</span>
              <span className="ml-2 text-sm text-brand-text/50">{cs.metricLabel}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Rest */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {rest.map((cs) => (
          <Link
            key={cs.slug}
            href={`/case-studies/${cs.slug}`}
            className="group bg-brand-surface border border-white/10 hover:border-brand-accent/35 rounded-xl p-6 flex flex-col gap-4 transition-all duration-200"
          >
            <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">{cs.industry}</span>
            <h3 className="text-base font-semibold text-brand-text leading-snug group-hover:text-brand-cta transition-colors">
              {cs.headline}
            </h3>
            <div className="mt-auto pt-4 border-t border-white/8">
              <span className="text-3xl font-bold text-brand-text">{cs.metric}</span>
              <span className="ml-2 text-sm text-brand-text/50">{cs.metricLabel}</span>
            </div>
          </Link>
        ))}
      </div>
    </SectionContainer>
  )
}
