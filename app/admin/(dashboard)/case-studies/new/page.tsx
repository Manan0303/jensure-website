import Link from 'next/link'
import CaseStudyForm from '../CaseStudyForm'

export default function NewCaseStudyPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/case-studies" className="text-brand-text/40 hover:text-brand-text text-sm transition-colors">← Case Studies</Link>
        <span className="text-brand-text/20">/</span>
        <h1 className="text-2xl font-bold text-brand-text">New Case Study</h1>
      </div>
      <div className="bg-brand-surface border border-white/8 rounded-xl p-8">
        <CaseStudyForm mode="new" />
      </div>
    </div>
  )
}
