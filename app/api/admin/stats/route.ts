import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { auth } from '@/auth'
import AuditRequest from '@/models/AuditRequest'
import DiscoverySubmission from '@/models/DiscoverySubmission'
import Contact from '@/models/Contact'
import BlogPost from '@/models/BlogPost'
import CaseStudy from '@/models/CaseStudy'
import FAQ from '@/models/FAQ'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const [auditCount, discoveryCount, contactCount, blogCount, caseStudyCount, faqCount,
      recentAudit, recentDiscovery, recentContact, recentBlogs, recentCaseStudies] = await Promise.all([
      AuditRequest.countDocuments(),
      DiscoverySubmission.countDocuments(),
      Contact.countDocuments(),
      BlogPost.countDocuments(),
      CaseStudy.countDocuments(),
      FAQ.countDocuments(),
      AuditRequest.find().sort({ createdAt: -1 }).limit(5).select('name email company createdAt').lean(),
      DiscoverySubmission.find().sort({ createdAt: -1 }).limit(5).select('industry companySize timeConsumingTask createdAt').lean(),
      Contact.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt').lean(),
      BlogPost.find().sort({ createdAt: -1 }).limit(5).select('title slug status createdAt').lean(),
      CaseStudy.find().sort({ createdAt: -1 }).limit(5).select('title slug industry status createdAt').lean(),
    ])

    return NextResponse.json({
      counts: {
        enquiries: auditCount + discoveryCount + contactCount,
        blogs: blogCount,
        caseStudies: caseStudyCount,
        faqs: faqCount,
      },
      recent: { audits: recentAudit, discovery: recentDiscovery, contacts: recentContact, blogs: recentBlogs, caseStudies: recentCaseStudies }
    })
  } catch (err) {
    console.error('[GET /api/admin/stats]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
