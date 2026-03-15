import type { MetadataRoute } from 'next'

const BASE_URL = 'https://jensure.com'

// Static routes — always included
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/ai-departments`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/gtm-systems`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
  { url: `${BASE_URL}/book-a-call`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 }
]

// Placeholder blog slugs — swapped for MongoDB query once CMS is seeded
const BLOG_SLUGS = [
  'what-is-an-ai-department',
  'how-gtm-automation-works',
  'automating-operations-vs-adding-tools'
]

// Placeholder case study slugs
const CASE_STUDY_SLUGS = [
  'healthcare-patient-intake',
  'agency-content-pipeline',
  'manufacturing-reporting'
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // In production with MongoDB connected, replace these arrays with DB queries:
  // const posts = await BlogPost.find({ status: 'published' }, 'slug updatedAt').lean()
  // const cases = await CaseStudy.find({ status: 'published' }, 'slug updatedAt').lean()

  const blogRoutes: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  }))

  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  }))

  return [...STATIC_ROUTES, ...blogRoutes, ...caseStudyRoutes]
}
