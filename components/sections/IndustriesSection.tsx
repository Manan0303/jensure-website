import SectionContainer from '@/components/layout/SectionContainer'
import IndustryCard from '@/components/ui/IndustryCard'
import CTAButton from '@/components/ui/CTAButton'
import { INDUSTRIES } from '@/lib/constants'

const FEATURED_IDS = ['healthcare', 'manufacturing', 'financial-services', 'ecommerce', 'marketing-agencies', 'saas']

export default function IndustriesSection() {
  const featured = INDUSTRIES.filter((ind) => FEATURED_IDS.includes(ind.id))

  return (
    <SectionContainer id="industries" className="bg-brand-surface">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Industries</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight max-w-xl">
            Every industry has repetitive work. We automate it.
          </h2>
          <CTAButton href="/industries" variant="secondary">
            All Industries
          </CTAButton>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((industry) => (
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
  )
}
