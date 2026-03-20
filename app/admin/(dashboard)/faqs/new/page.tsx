import Link from 'next/link'
import FAQForm from '../FAQForm'

export default function NewFAQPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/faqs" className="text-brand-text/40 hover:text-brand-text text-sm transition-colors">← FAQs</Link>
        <span className="text-brand-text/20">/</span>
        <h1 className="text-2xl font-bold text-brand-text">New FAQ</h1>
      </div>
      <div className="bg-brand-surface border border-white/8 rounded-xl p-8">
        <FAQForm mode="new" />
      </div>
    </div>
  )
}
