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
          Book a free automation audit. We review your operations, identify what can be automated, and propose the right AI Department build for your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CTAButton href="/book-a-call" variant="primary" size="large">
            Book Automation Audit
          </CTAButton>
          <CTAButton href="/#automation-discovery" variant="secondary" size="large">
            Describe Your Workflow
          </CTAButton>
        </div>
      </div>
    </SectionContainer>
  )
}
