import Link from 'next/link'
import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import CaseStudy from '@/models/CaseStudy'
import CaseStudyForm from '../CaseStudyForm'

export default async function EditCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectDB()
  const cs = await CaseStudy.findOne({ slug }).lean() as Record<string, unknown> | null

  if (!cs) notFound()

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/case-studies" className="text-brand-text/40 hover:text-brand-text text-sm transition-colors">
          ← Case Studies
        </Link>
        <span className="text-brand-text/20">/</span>
        <h1 className="text-2xl font-bold text-brand-text">Edit Case Study</h1>
      </div>
      <div className="bg-brand-surface border border-white/8 rounded-xl p-8">
        <CaseStudyForm
          mode="edit"
          originalSlug={slug}
          initialData={{
            title: cs.title as string,
            slug: cs.slug as string,
            industry: cs.industry as string,
            problem: cs.problem as string,
            solution: cs.solution as string,
            technologies: (cs.technologies as string[]) ?? [],
            results: (cs.results as string[]).length ? (cs.results as string[]) : [''],
            metrics: (cs.metrics as { label: string; value: string }[]).length
              ? (cs.metrics as { label: string; value: string }[])
              : [{ label: '', value: '' }],
            featuredImage: (cs.featuredImage as string) ?? '',
            status: cs.status as 'draft' | 'published',
            metaTitle: (cs.metaTitle as string) ?? '',
            metaDescription: (cs.metaDescription as string) ?? '',
          }}
        />
      </div>
    </div>
  )
}
