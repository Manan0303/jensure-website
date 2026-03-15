import SectionContainer from '@/components/layout/SectionContainer'
import ServiceCard from '@/components/ui/ServiceCard'
import CTAButton from '@/components/ui/CTAButton'
import { SMALL_AUTOMATIONS } from '@/lib/constants'

export default function AutomationCategoriesSection() {
  return (
    <SectionContainer id="automations" className="bg-brand-bg">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Small Automations</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight max-w-xl">
            Fix one problem. Start saving time immediately.
          </h2>
          <CTAButton href="/services" variant="secondary">
            All Services
          </CTAButton>
        </div>
        <p className="mt-5 text-brand-text/60 max-w-2xl leading-relaxed">
          Not every business needs a full AI Department on day one. These targeted automations eliminate specific bottlenecks fast.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SMALL_AUTOMATIONS.map((automation) => (
          <ServiceCard
            key={automation.id}
            icon={automation.icon}
            title={automation.title}
            description={automation.description}
            badge={automation.timeSaved}
          />
        ))}
      </div>
    </SectionContainer>
  )
}
