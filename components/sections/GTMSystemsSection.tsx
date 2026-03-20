import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'
import { GTM_COMPONENTS } from '@/lib/constants'

export default function GTMSystemsSection() {
  return (
    <SectionContainer id="gtm-systems" className="bg-brand-surface">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">GTM Systems</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight max-w-xl">
            Your pipeline, running without a team.
          </h2>
          <CTAButton href="/gtm-systems" variant="secondary">
            Learn More
          </CTAButton>
        </div>
        <p className="mt-5 text-brand-text/60 max-w-2xl leading-relaxed">
          GTM Systems automate the entire process of generating and managing leads, from initial identification through outreach, enrichment, follow-up, and meeting booking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GTM_COMPONENTS.map((component) => (
          <div
            key={component.id}
            className="bg-brand-surface-2 border border-white/8 rounded-xl p-5 flex flex-col gap-2 hover:border-brand-accent/30 transition-colors"
          >
            <div className="text-xl">{component.icon}</div>
            <h3 className="text-sm font-semibold text-brand-text">{component.title}</h3>
            <p className="text-xs text-brand-text/55 leading-relaxed">{component.description}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}
