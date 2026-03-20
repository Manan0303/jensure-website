import Link from 'next/link'
import { notFound } from 'next/navigation'
import CaseStudyForm from '../CaseStudyForm'

async function getCaseStudy(slug: string) {
  const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  const res = await fetch(`${base}/api/cms/case-studies/${slug}`, { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  return data.caseStudy ?? null
}

export default async function EditCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = await getCaseStudy(slug)
  if (!cs) notFound()

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/case-studies" className="text-brand-text/40 hover:text-brand-text text-sm transition-colors">← Case Studies</Link>
        <span className="text-brand-text/20">/</span>
        <h1 className="text-2xl font-bold text-brand-text">Edit Case Study</h1>
      </div>
      <div className="bg-brand-surface border border-white/8 rounded-xl p-8">
        <CaseStudyForm mode="edit" originalSlug={slug} initialData={{
          title: cs.title, slug: cs.slug, industry: cs.industry,
          problem: cs.problem, solution: cs.solution,
          technologies: cs.technologies ?? [],
          results: cs.results ?? [''],
          metrics: cs.metrics ?? [{ label: '', value: '' }],
          featuredImage: cs.featuredImage ?? '',
          status: cs.status,
          metaTitle: cs.metaTitle ?? '',
          metaDescription: cs.metaDescription ?? '',
        }} />
      </div>
    </div>
  )
}
