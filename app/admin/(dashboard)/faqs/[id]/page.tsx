import Link from 'next/link'
import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import FAQ from '@/models/FAQ'
import FAQForm from '../FAQForm'

export default async function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await connectDB()
  const faq = await FAQ.findById(id).lean() as Record<string, unknown> | null

  if (!faq) notFound()

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/faqs" className="text-brand-text/40 hover:text-brand-text text-sm transition-colors">
          ← FAQs
        </Link>
        <span className="text-brand-text/20">/</span>
        <h1 className="text-2xl font-bold text-brand-text">Edit FAQ</h1>
      </div>
      <div className="bg-brand-surface border border-white/8 rounded-xl p-8">
        <FAQForm
          mode="edit"
          id={id}
          initialData={{
            question: faq.question as string,
            answer: faq.answer as string,
            keywords: (faq.keywords as string[]) ?? [],
            category: (faq.category as string) ?? 'general',
            status: faq.status as 'draft' | 'published',
          }}
        />
      </div>
    </div>
  )
}
