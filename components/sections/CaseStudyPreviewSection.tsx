import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'
import { CASE_STUDY_PREVIEWS } from '@/lib/constants'

export default function CaseStudyPreviewSection() {
  return (
    <SectionContainer id="case-studies" className="bg-brand-bg">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-cta mb-3">Case Studies</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight max-w-xl">
            Automation in practice.
          </h2>
          <CTAButton href="/case-studies" variant="secondary">
            All Case Studies
          </CTAButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CASE_STUDY_PREVIEWS.map((cs) => (
          <Link
            key={cs.slug}
            href={`/case-studies/${cs.slug}`}
            className="group bg-brand-surface border border-white/8 rounded-xl p-6 flex flex-col gap-4 hover:border-brand-accent/40 transition-all duration-200 hover:shadow-card-hover"
          >
            <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">{cs.industry}</span>
            <h3 className="text-lg font-semibold text-brand-text leading-snug group-hover:text-brand-cta transition-colors">
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
