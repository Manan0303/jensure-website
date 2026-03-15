import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'
import { CASE_STUDY_PREVIEWS } from '@/lib/constants'

const CASE_STUDY_DETAIL: Record<string, {
  industry: string
  headline: string
  metric: string
  metricLabel: string
  problem: string
  solution: string
  results: string[]
  metrics: { label: string; value: string }[]
}> = {
  'healthcare-patient-intake': {
    industry: 'Healthcare',
    headline: 'Patient intake process automated end-to-end',
    metric: '80%',
    metricLabel: 'reduction in admin time',
    problem: 'A mid-sized clinic had 4 administrative staff spending 45 minutes per patient on intake — collecting forms, verifying insurance, entering data into the EHR, and scheduling follow-ups. With 60 patients per day, this consumed the equivalent of 2 full-time employees.',
    solution: 'Jensure deployed an AI Operations Department with a Document Processing Agent and a Data Synchronization Agent. Patient intake forms are now captured digitally, automatically parsed, and written directly into the EHR. Insurance verification runs as a background process on submission.',
    results: [
      'Patient intake time reduced from 45 minutes to under 9 minutes per patient',
      'Data entry errors eliminated — all records entered from validated source data',
      'Two administrative staff redeployed to patient-facing roles',
      'Same-day appointment confirmations sent automatically on booking'
    ],
    metrics: [
      { label: 'Admin time saved per patient', value: '36 min' },
      { label: 'Annual hours recovered', value: '3,120 hrs' },
      { label: 'Error rate reduction', value: '100%' },
      { label: 'Staff redeployed', value: '2 FTE' }
    ]
  },
  'agency-content-pipeline': {
    industry: 'Marketing Agency',
    headline: 'Content pipeline running without a content team',
    metric: '3×',
    metricLabel: 'content output increase',
    problem: 'A 12-person marketing agency was producing 8 pieces of content per month across client accounts — limited by writer bandwidth. Content briefs, research, drafting, and formatting each required manual effort.',
    solution: 'Jensure built an AI Marketing Department with a Content Creation Agent and an SEO Agent. The system takes approved topic briefs, conducts keyword research, generates first-draft content, applies SEO optimization, and formats for publication — automatically.',
    results: [
      'Monthly content output increased from 8 to 26 pieces without adding headcount',
      'Content brief to first draft turnaround reduced from 3 days to 4 hours',
      'SEO optimization applied automatically to every piece',
      'Writers now focus exclusively on editing and strategy, not production'
    ],
    metrics: [
      { label: 'Monthly content pieces', value: '26 vs 8' },
      { label: 'Draft turnaround', value: '4 hrs' },
      { label: 'Output increase', value: '3×' },
      { label: 'Headcount added', value: '0' }
    ]
  },
  'manufacturing-reporting': {
    industry: 'Manufacturing',
    headline: 'Production reporting fully automated',
    metric: '2 min',
    metricLabel: 'weekly reports generated',
    problem: 'A manufacturing operation with 3 production lines had a floor manager spending 6 hours every Monday compiling production data from multiple systems into a weekly report for leadership. The process was manual, error-prone, and always delayed.',
    solution: 'Jensure deployed an AI Operations Department with a Reporting Agent and a Data Synchronization Agent. Production data is pulled from floor sensors, ERP, and inventory systems, aggregated, and compiled into a formatted report — distributed to leadership every Monday at 8am.',
    results: [
      'Weekly report generation time reduced from 6 hours to under 2 minutes',
      'Reports delivered at 8am Monday without any manager involvement',
      'Data accuracy improved — single source of truth, no manual aggregation',
      'Floor manager freed for operational decisions, not data processing'
    ],
    metrics: [
      { label: 'Report generation time', value: '< 2 min' },
      { label: 'Hours saved weekly', value: '6 hrs' },
      { label: 'Annual hours recovered', value: '300 hrs' },
      { label: 'Delivery time', value: 'Mon 8am' }
    ]
  }
}

export async function generateStaticParams() {
  return CASE_STUDY_PREVIEWS.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = CASE_STUDY_DETAIL[slug]
  if (!cs) return { title: 'Case Study Not Found' }

  return {
    title: cs.headline,
    description: `${cs.industry} automation case study: ${cs.metric} ${cs.metricLabel}.`,
    openGraph: {
      title: `${cs.headline} | Jensure`,
      description: `${cs.industry} automation case study: ${cs.metric} ${cs.metricLabel}.`,
      url: `https://jensure.com/case-studies/${slug}`
    }
  }
}

export default async function CaseStudyPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = CASE_STUDY_DETAIL[slug]
  if (!cs) notFound()

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 20% 50%, rgba(61,90,254,0.15) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-semibold text-brand-cta uppercase tracking-wider">{cs.industry}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight mt-3 mb-6">{cs.headline}</h1>
          <div className="flex items-baseline gap-3 pb-8 border-b border-white/10">
            <span className="text-5xl font-bold text-brand-cta">{cs.metric}</span>
            <span className="text-lg text-brand-text/60">{cs.metricLabel}</span>
          </div>
        </div>
      </section>

      {/* Metrics bar */}
      <section className="bg-brand-surface border-b border-white/8 px-6 md:px-12 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {cs.metrics.map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-brand-text">{value}</div>
              <div className="text-xs text-brand-text/45 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <SectionContainer className="bg-brand-bg">
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h2 className="text-xl font-bold text-brand-text mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-brand-error rounded-full inline-block" />
              The Problem
            </h2>
            <p className="text-brand-text/60 leading-relaxed">{cs.problem}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-text mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-brand-accent rounded-full inline-block" />
              The Solution
            </h2>
            <p className="text-brand-text/60 leading-relaxed">{cs.solution}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-text mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-brand-cta rounded-full inline-block" />
              Results
            </h2>
            <ul className="space-y-3">
              {cs.results.map((r) => (
                <li key={r} className="flex items-start gap-3 text-brand-text/60 text-sm">
                  <span className="text-brand-cta mt-1 flex-shrink-0">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl bg-brand-cta" />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-text tracking-tight mb-4">Build this for your business.</h2>
          <p className="text-brand-text/60 mb-8">Book a free automation audit and we will identify the same opportunities in your operations.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
