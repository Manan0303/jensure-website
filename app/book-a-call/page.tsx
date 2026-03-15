import type { Metadata } from 'next'
import SectionContainer from '@/components/layout/SectionContainer'
import BookACallForm from '@/components/ui/BookACallForm'
import { INDUSTRIES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Book Automation Audit',
  description: 'Book a free automation audit with Jensure. We review your operations, identify automation opportunities, and propose the right AI Department build.',
  openGraph: {
    title: 'Book Automation Audit | Jensure',
    description: 'Free automation audit — we review your operations and identify what to build.',
    url: 'https://jensure.com/book-a-call'
  }
}

const STEPS = [
  { step: '01', title: 'We review your operations', body: 'Tell us about your business and the tasks consuming the most time. We come prepared.' },
  { step: '02', title: 'We identify automation opportunities', body: 'We map which tasks are automatable, estimate the time savings, and prioritize by impact.' },
  { step: '03', title: 'We propose a build', body: 'You receive a clear proposal: which AI Department or automation to build, how it works, and what it delivers.' }
]

export default function BookACallPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">Automation Audit</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-black tracking-tight mb-5 max-w-3xl">
            Book your free automation audit.
          </h1>
          <p className="text-lg text-brand-gray-dark max-w-2xl leading-relaxed">
            A focused review of your operations. No commitment required. We identify what can be automated and what it would deliver.
          </p>
        </div>
      </section>

      {/* What to expect + Form */}
      <SectionContainer className="bg-brand-off-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: steps */}
          <div>
            <h2 className="text-2xl font-bold text-brand-black tracking-tight mb-8">What to expect</h2>
            <div className="space-y-8">
              {STEPS.map(({ step, title, body }) => (
                <div key={step} className="flex gap-5">
                  <div className="text-3xl font-bold text-brand-gray-light flex-shrink-0">{step}</div>
                  <div>
                    <h3 className="font-semibold text-brand-black mb-1">{title}</h3>
                    <p className="text-sm text-brand-gray leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust signals */}
            <div className="mt-10 pt-8 border-t border-brand-gray-light">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-gray mb-4">Industries we work with</p>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.slice(0, 10).map((ind) => (
                  <span key={ind.id} className="text-xs bg-white border border-brand-gray-light rounded-full px-3 py-1 text-brand-gray-dark">
                    {ind.icon} {ind.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <div className="bg-white border border-brand-gray-light rounded-xl p-8">
              <h2 className="text-xl font-bold text-brand-black mb-6">Request your audit</h2>
              <BookACallForm />
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
