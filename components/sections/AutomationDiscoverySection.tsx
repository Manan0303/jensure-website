import SectionContainer from '@/components/layout/SectionContainer'
import AutomationForm from '@/components/ui/AutomationForm'

export default function AutomationDiscoverySection() {
  return (
    <SectionContainer id="automation-discovery" className="bg-brand-surface">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Automation Discovery</p>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight mb-4">
          How much time are you losing?
        </h2>
        <p className="text-brand-text/60 max-w-xl mx-auto leading-relaxed">
          Tell us about your most time-consuming task. We will calculate exactly how much time automation can give back to your team.
        </p>
      </div>
      <AutomationForm />
    </SectionContainer>
  )
}
