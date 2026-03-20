import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { auth } from '@/auth'
import CaseStudy from '@/models/CaseStudy'

const STATIC_CASE_STUDIES = [
  {
    title: 'Patient intake process automated end-to-end',
    slug: 'healthcare-patient-intake',
    industry: 'Healthcare',
    problem: 'A mid-sized clinic had 4 administrative staff spending 45 minutes per patient on intake — collecting forms, verifying insurance, entering data into the EHR, and scheduling follow-ups. With 60 patients per day, this consumed the equivalent of 2 full-time employees.',
    solution: 'Jensure deployed an AI Operations Department with a Document Processing Agent and a Data Synchronization Agent. Patient intake forms are now captured digitally, automatically parsed, and written directly into the EHR. Insurance verification runs as a background process on submission. A Communication Agent sends appointment confirmations and follow-up scheduling prompts automatically.',
    technologies: ['Document Processing AI', 'EHR Integration', 'Insurance Verification API', 'Automated Communication'],
    results: [
      'Patient intake time reduced from 45 minutes to under 9 minutes per patient',
      'Data entry errors eliminated — all records entered from validated source data',
      'Two administrative staff redeployed to patient-facing roles',
      'Same-day appointment confirmations sent automatically on booking',
    ],
    metrics: [
      { label: 'Admin time saved per patient', value: '36 min' },
      { label: 'Annual hours recovered', value: '3,120 hrs' },
      { label: 'Error rate reduction', value: '100%' },
      { label: 'Staff redeployed', value: '2 FTE' },
    ],
    status: 'published' as const,
    publishedAt: new Date('2026-01-25'),
  },
  {
    title: 'Content pipeline running without a content team',
    slug: 'agency-content-pipeline',
    industry: 'Marketing Agency',
    problem: 'A 12-person marketing agency was producing 8 pieces of content per month across client accounts — limited by writer bandwidth. Content briefs, research, drafting, and formatting each required manual effort.',
    solution: 'Jensure built an AI Marketing Department with a Content Creation Agent, an SEO Agent, and a Formatting and Scheduling Agent. The system takes approved topic briefs, conducts keyword research, generates first-draft content, applies SEO optimization, formats for publication, and schedules at optimal times — automatically.',
    technologies: ['Content Creation AI', 'SEO Optimization Agent', 'CMS Integration', 'Publishing Automation'],
    results: [
      'Monthly content output increased from 8 to 26 pieces without adding headcount',
      'Content brief to first draft turnaround reduced from 3 days to 4 hours',
      'SEO optimization applied automatically to every piece',
      'Writers now focus exclusively on editing and strategy, not production',
    ],
    metrics: [
      { label: 'Monthly content pieces', value: '26 vs 8' },
      { label: 'Draft turnaround', value: '4 hrs' },
      { label: 'Output increase', value: '3×' },
      { label: 'Headcount added', value: '0' },
    ],
    status: 'published' as const,
    publishedAt: new Date('2026-02-15'),
  },
  {
    title: 'Production reporting fully automated',
    slug: 'manufacturing-reporting',
    industry: 'Manufacturing',
    problem: 'A manufacturing operation with 3 production lines had a floor manager spending 6 hours every Monday compiling production data from multiple systems into a weekly report for leadership. The process was manual, error-prone, and always delayed.',
    solution: 'Jensure deployed an AI Operations Department with a Reporting Agent and a Data Synchronization Agent. Production data is pulled from floor sensors, ERP, and inventory systems, aggregated, and compiled into a formatted report — distributed to leadership every Monday at 8am.',
    technologies: ['ERP Integration', 'IoT Sensor Data', 'Automated Reporting', 'Data Synchronization'],
    results: [
      'Weekly report generation time reduced from 6 hours to under 2 minutes',
      'Reports delivered at 8am Monday without any manager involvement',
      'Data accuracy improved — single source of truth, no manual aggregation',
      'Floor manager freed for operational decisions, not data processing',
    ],
    metrics: [
      { label: 'Report generation time', value: '< 2 min' },
      { label: 'Hours saved weekly', value: '6 hrs' },
      { label: 'Annual hours recovered', value: '300 hrs' },
      { label: 'Delivery time', value: 'Mon 8am' },
    ],
    status: 'published' as const,
    publishedAt: new Date('2026-03-10'),
  },
]

export async function POST() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()

    const existingSlugs = new Set(
      (await CaseStudy.find({}, 'slug').lean()).map((cs: { slug: string }) => cs.slug)
    )

    const toInsert = STATIC_CASE_STUDIES.filter((cs) => !existingSlugs.has(cs.slug))

    if (toInsert.length === 0) {
      return NextResponse.json({ message: 'All case studies already seeded', seeded: 0 })
    }

    await CaseStudy.insertMany(toInsert, { ordered: false })
    return NextResponse.json({ message: 'Seeded successfully', seeded: toInsert.length })
  } catch (err) {
    console.error('[POST /api/cms/case-studies/seed]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
