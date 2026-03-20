import Link from 'next/link'
import { notFound } from 'next/navigation'
import FAQForm from '../FAQForm'

async function getFAQ(id: string) {
  const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  const res = await fetch(`${base}/api/cms/faqs/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  return data.faq ?? null
}

export default async function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const faq = await getFAQ(id)
  if (!faq) notFound()

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/faqs" className="text-brand-text/40 hover:text-brand-text text-sm transition-colors">← FAQs</Link>
        <span className="text-brand-text/20">/</span>
        <h1 className="text-2xl font-bold text-brand-text">Edit FAQ</h1>
      </div>
      <div className="bg-brand-surface border border-white/8 rounded-xl p-8">
        <FAQForm mode="edit" id={id} initialData={{
          question: faq.question, answer: faq.answer,
          keywords: faq.keywords ?? [], category: faq.category ?? 'general', status: faq.status
        }} />
      </div>
    </div>
  )
}
