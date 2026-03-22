import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'

export default function FinalCTASection() {
  return (
    <SectionContainer className="bg-brand-surface-2 relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-20 blur-3xl bg-brand-accent" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-15 blur-3xl bg-brand-cta" />
      </div>

      <div className="relative text-center max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-text tracking-tight mb-5">
          Ready to run your business on systems?
        </h2>
        <p className="text-xl text-brand-text/60 mb-10 leading-relaxed">
          Tell us your biggest operational bottleneck. We will show you exactly how to remove it.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CTAButton href="/book-a-call#automation-discovery" variant="primary" size="large">
            Show Me What to Automate
          </CTAButton>
          <CTAButton href="/gtm-systems" variant="secondary" size="large">
            See How GTM Automation Works
          </CTAButton>
        </div>
        <p className="mt-5 text-xs text-brand-text/30">Free audit. No commitment. Results or you do not pay.</p>
      </div>
    </SectionContainer>
  )
}
