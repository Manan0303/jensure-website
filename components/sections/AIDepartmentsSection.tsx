import SectionContainer from '@/components/layout/SectionContainer'
import AgentDiagram from '@/components/ui/AgentDiagram'
import CTAButton from '@/components/ui/CTAButton'
import { AI_DEPARTMENTS } from '@/lib/constants'

export default function AIDepartmentsSection() {
  const marketing = AI_DEPARTMENTS[0]

  return (
    <SectionContainer id="ai-departments" className="bg-brand-bg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-cta mb-3">AI Departments</p>
          <h2 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5">
            Full departments that run on their own.
          </h2>
          <p className="text-lg text-brand-text/60 leading-relaxed mb-6">
            Each AI Department mirrors how a real team operates. A Master Agent coordinates strategy and a set of specialized Sub Agents execute the work. No managers required.
          </p>
          <ul className="space-y-3 mb-8">
            {AI_DEPARTMENTS.map((dept) => (
              <li key={dept.id} className="flex items-center gap-3 text-base text-brand-text/70">
                <span className="text-brand-cta">→</span>
                <span>{dept.name}</span>
              </li>
            ))}
          </ul>
          <CTAButton href="/ai-departments" variant="secondary">
            Explore All AI Departments
          </CTAButton>
        </div>

        {/* Right: live diagram */}
        <div>
          <div className="mb-4 text-center">
            <span className="text-sm font-semibold text-brand-text/70">Example: {marketing.name}</span>
          </div>
          <AgentDiagram
            masterAgent={marketing.masterAgent}
            subAgents={marketing.subAgents}
            compact
          />
        </div>
      </div>
    </SectionContainer>
  )
}
