const INDUSTRIES = [
  'Recruitment', 'SaaS', 'Healthcare', 'Marketing Agencies',
  'Manufacturing', 'Finance', 'Real Estate', 'E-commerce', 'Logistics', 'Legal'
]

export default function TrustBar() {
  return (
    <div className="bg-brand-surface border-y border-white/6 py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-text/30 shrink-0">
          Industries served
        </span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {INDUSTRIES.map((ind) => (
            <span key={ind} className="text-sm text-brand-text/45 whitespace-nowrap">
              {ind}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
