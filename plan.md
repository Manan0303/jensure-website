# Jensure Website — Implementation Plan

## Overview

This document is the founding build plan for the Jensure marketing website. It defines every phase, task, file, and decision required to take the project from an empty repository to a fully deployed, conversion-optimized marketing site.

Stack: Next.js 14 (App Router) · Node.js (API layer) · TypeScript · TailwindCSS · Framer Motion
Primary conversion event: **Book Automation Audit**

---

## Phase 0 — Project Scaffolding

### 0.1 Initialize Next.js App
- Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false`
- Confirm App Router is enabled
- Confirm `tailwind.config.ts` is generated

### 0.2 Install Dependencies
```
framer-motion
@tailwindcss/typography   (for blog/content pages)
zod                       (request validation on API routes)
nodemailer                (email notifications on form submissions)
mongoose                  (MongoDB ODM — models, connection, queries)
```

Environment variable required (`.env.local`):
```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/jensure
CMS_API_KEY=<secret>      (protects write endpoints on CMS routes)
```

### 0.3 Configure TailwindCSS
- Extend `tailwind.config.ts` with Jensure brand tokens (colors, fonts, spacing)
- Define CSS custom properties in `app/globals.css`

### 0.4 Create Directory Structure
```
/app
  layout.tsx                      ← root layout (Navbar + Footer)
  page.tsx                        ← Homepage
  sitemap.ts                      ← dynamic XML sitemap (includes blog + case study slugs)
  robots.ts                       ← robots.txt
  services/page.tsx
  ai-departments/page.tsx
  gtm-systems/page.tsx
  industries/page.tsx
  case-studies/
    page.tsx                      ← case studies listing (fetches from MongoDB)
    [slug]/page.tsx               ← individual case study (dynamic route)
  about/page.tsx
  blog/
    page.tsx                      ← blog listing (fetches from MongoDB)
    [slug]/page.tsx               ← individual blog post (dynamic route + SEO metadata)
  book-a-call/page.tsx
  api/
    audit/route.ts                ← POST: save audit request
    automation-discovery/route.ts ← POST: validate, calculate, save discovery submission
    contact/route.ts              ← POST: save contact form
    cms/
      blog/
        route.ts                  ← GET (list posts) · POST (create post, auth required)
        [slug]/route.ts           ← GET (single) · PUT (update) · DELETE (remove)
      case-studies/
        route.ts                  ← GET (list) · POST (create, auth required)
        [slug]/route.ts           ← GET (single) · PUT (update) · DELETE (remove)

/components
  layout/
    Navbar.tsx
    Footer.tsx
    SectionContainer.tsx
  ui/
    CTAButton.tsx
    ServiceCard.tsx
    IndustryCard.tsx
    AgentDiagram.tsx
    AutomationForm.tsx
  sections/
    (homepage section components)

/models                           ← Mongoose schemas
  BlogPost.ts
  CaseStudy.ts
  AuditRequest.ts
  DiscoverySubmission.ts
  Contact.ts

/lib
  mongodb.ts                      ← MongoDB connection singleton
  constants.ts                    ← shared static data (departments, industries, services)
  utils.ts                        ← automation opportunity calculator
  validators.ts                   ← Zod schemas for all API routes
  cms-auth.ts                     ← CMS_API_KEY header validation helper

/docs                             ← reference docs (not served)
  design-system.md
  architecture.md
  services.md
  industries.md
  gtm-systems.md
  content-guidelines.md
  automation-examples.md
```

---

## Phase 1 — Design System & Brand Tokens

### 1.1 Create `/docs/design-system.md`
Define and document:
- Color palette
- Typography scale
- Spacing system
- Component variants

### 1.2 Brand Tokens (Tailwind config)
Light-mode first. Stripe is the clearest reference — white canvas, sharp type, restrained color.

| Token | Value | Usage |
|-------|-------|-------|
| `brand-white` | `#FFFFFF` | Page backgrounds |
| `brand-off-white` | `#F9FAFB` | Alternate section backgrounds |
| `brand-black` | `#0F0F0F` | Primary text |
| `brand-gray-dark` | `#374151` | Secondary text |
| `brand-gray` | `#6B7280` | Tertiary text / labels |
| `brand-gray-light` | `#E5E7EB` | Borders / dividers |
| `brand-blue` | `#2563EB` | Primary CTA, links |
| `brand-blue-light` | `#3B82F6` | CTA hover states |
| `brand-surface` | `#F3F4F6` | Card backgrounds |

### 1.3 Typography
- Headlines: `Inter` or `Geist` (geometric sans)
- Body: `Inter` (readable sans)
- Loaded via `next/font`

### 1.4 Animation Conventions (Framer Motion)
- **Fade-in**: `{ opacity: 0 } → { opacity: 1 }`, 0.5s ease
- **Stagger children**: 0.1s delay between items
- **Hover elevation**: `scale: 1.02`, `y: -2`
- No bounce, no spring, no slide-in from off-screen

---

## Phase 2 — Shared Components

### 2.1 `Navbar.tsx`
- Logo (left)
- Nav links: AI Departments · Services · GTM Systems · Industries · About · Blog
- CTA button: "Book Automation Audit" (brand-blue)
- Sticky, transparent → opaque on scroll
- Mobile: hamburger menu

### 2.2 `Footer.tsx`
- Logo + tagline: "AI Operational Infrastructure"
- Column links: Product · Company · Resources
- Bottom bar: copyright + legal links
- No social media icons (optional, secondary)

### 2.3 `SectionContainer.tsx`
- Props: `id`, `className`, `children`
- Applies consistent horizontal padding and max-width
- Used on every section of every page

### 2.4 `CTAButton.tsx`
- Variants: `primary` (brand-blue fill) · `secondary` (outline/ghost)
- Props: `href`, `variant`, `children`, `onClick`
- Framer Motion hover elevation
- Used site-wide — style must be consistent

### 2.5 `AgentDiagram.tsx`
- Renders the Master Agent → Sub Agents hierarchy
- Props: `masterAgent: { title, description }`, `subAgents: Agent[]`
- Visual: Master box at top → vertical line → horizontal row of sub-agent cards
- Implemented with pure Tailwind divs (no external diagram library)
- Used on: homepage, AI Departments page, GTM Systems page

### 2.6 `ServiceCard.tsx`
- Props: `icon`, `title`, `description`
- Clean card with border, subtle hover elevation
- Used on Services page and homepage automation categories section

### 2.7 `IndustryCard.tsx`
- Props: `industry`, `painPoint`, `automationExample`
- Used on Industries page and homepage industries grid

### 2.8 `AutomationForm.tsx`
- Fields: industry (select) · company size (select) · most time-consuming task (text) · employees performing it (number) · hours weekly (number)
- On submit: POSTs to `/api/automation-discovery`
  - Backend validates payload (Zod), persists submission, returns calculated result
  - Formula applied server-side: `employees × hoursWeekly × 0.7` = hours recoverable per week; annual = above × 50 weeks
  - Frontend displays returned result in a fade-in result card
- Framer Motion fade-in for result card

---

## Phase 3 — Reference Documentation (`/docs`)

Create all 7 docs files before writing page content. These define the source of truth for copy and positioning.

### 3.1 `/docs/architecture.md`
- Full explanation of the AI Department Model
- Master Agent + Sub Agents structure
- All 5 departments with agent lists (from PRD sections 4.1–4.5)

### 3.2 `/docs/services.md`
- AI Departments (full department service)
- GTM Systems
- Small Automation Solutions (list from PRD section 6)

### 3.3 `/docs/industries.md`
- All 17 industries from PRD section 7
- For each: pain point + automation opportunity example

### 3.4 `/docs/gtm-systems.md`
- GTM system components (from PRD section 5)
- How it fits within the AI Marketing Department

### 3.5 `/docs/content-guidelines.md`
- Tone: direct, operational, authoritative
- Avoid: buzzwords, vague claims, chatbot/consulting framing
- Use: specific outcomes, time metrics, workflow language

### 3.6 `/docs/automation-examples.md`
- 3–5 real automation examples per industry
- Used as content for case study previews and industry pages

### 3.7 `/docs/design-system.md`
- Colors, typography, spacing, component rules (mirrors Phase 1 above)

---

## Phase 4 — Data / Constants Layer

### 4.1 `/lib/constants.ts`
Centralize all structured data so page components are not hardcoded:

```ts
// AI Departments
export const AI_DEPARTMENTS = [ ... ] // 5 departments, each with masterAgent + subAgents[]

// Industries
export const INDUSTRIES = [ ... ] // 17 industries with name, icon, painPoint, automationExample

// Services (small automations)
export const SMALL_AUTOMATIONS = [ ... ] // 9 automation types

// GTM System components
export const GTM_COMPONENTS = [ ... ]

// Navigation links
export const NAV_LINKS = [ ... ]
```

### 4.2 `/lib/utils.ts`
```ts
export function calculateAutomationOpportunity(
  employees: number,
  hoursWeekly: number
): { weeklyHoursSaved: number; annualHoursSaved: number; annualDaysSaved: number }
```

---

## Phase 5 — Root Layout

### 5.1 `app/layout.tsx`
- Import `Navbar` and `Footer`
- Apply global font via `next/font`
- Set light background (`#FFFFFF`) as body default, `brand-black` as base text color
- Include metadata defaults

### 5.2 `app/globals.css`
- Tailwind directives
- CSS custom properties for brand tokens
- Base element resets (heading sizes, link styles)

---

## Phase 6 — Homepage (`app/page.tsx`)

Build as a sequence of section components. Each section is a separate component in `/components/sections/`.

### Section Order & Component Map

| # | Section | Component | Key Content |
|---|---------|-----------|-------------|
| 1 | Hero | `HeroSection.tsx` | Headline: "Your Business, Operated by AI" · Sub: one-liner on AI Departments · 2 CTAs: Book Audit + Describe Workflow |
| 2 | What is Jensure | `WhatIsJensure.tsx` | 3-column layout: Problem → Jensure's Approach → Result |
| 3 | AI Departments | `AIDepartmentsSection.tsx` | AgentDiagram for Marketing dept as example · Link to full AI Departments page |
| 4 | GTM Systems | `GTMSystemsSection.tsx` | 6-card grid of GTM components · CTA to GTM Systems page |
| 5 | Automation Categories | `AutomationCategoriesSection.tsx` | Grid of ServiceCards (small automations) |
| 6 | Industries | `IndustriesSection.tsx` | Grid of IndustryCards (6 featured, link to all) |
| 7 | Automation Discovery | `AutomationDiscoverySection.tsx` | AutomationForm component + result display |
| 8 | Case Study Previews | `CaseStudyPreviewSection.tsx` | 2–3 case study cards (placeholder content) |
| 9 | Final CTA | `FinalCTASection.tsx` | Large headline + Book Automation Audit button |

### SEO Metadata (homepage)
```ts
export const metadata = {
  title: 'Jensure — AI Operational Infrastructure',
  description: 'Jensure builds AI Departments that automate business operations. Replace repetitive work with intelligent agent systems.',
  openGraph: { ... }
}
```

---

## Phase 7 — AI Departments Page (`app/ai-departments/page.tsx`)

### Sections
1. **Page Hero** — "AI Departments That Run Your Operations"
2. **Model Explanation** — What is an AI Department (Master Agent concept)
3. **Department Showcase** — One `AgentDiagram` per department (5 total), with accordion or tabbed navigation
4. **How It Works** — 3-step process: Discovery → Design → Deploy
5. **CTA** — Book Automation Audit

---

## Phase 8 — Services Page (`app/services/page.tsx`)

### Sections
1. **Page Hero** — "Automation Built for Your Operations"
2. **AI Departments** — Summary cards linking to the AI Departments page
3. **GTM Systems** — Summary section linking to GTM Systems page
4. **Small Automation Solutions** — Full grid of ServiceCards (9 automation types)
5. **CTA** — Book Automation Audit

---

## Phase 9 — GTM Systems Page (`app/gtm-systems/page.tsx`)

### Sections
1. **Page Hero** — "Automated Go-To-Market Systems"
2. **What are GTM Systems** — Explanation of pipeline automation
3. **AgentDiagram** — CMO Agent → GTM sub-agents visualization
4. **GTM Components** — Card grid (8 components from PRD section 5)
5. **Use Cases** — 2–3 examples (agency, SaaS, ecommerce)
6. **CTA** — Book Automation Audit

---

## Phase 10 — Industries Page (`app/industries/page.tsx`)

### Sections
1. **Page Hero** — "Automation Across Every Industry"
2. **Industry Grid** — All 17 IndustryCards
3. **Industry Deep Dives** — Expandable section or tabs: each industry shows pain point + 3 automation examples
4. **CTA** — Book Automation Audit

---

## Phase 11 — Case Studies Pages

### 11.1 Listing Page (`app/case-studies/page.tsx`)
- Server component — fetches published case studies from MongoDB via `/api/cms/case-studies`
- Sections:
  1. **Page Hero** — "Automation in Practice"
  2. **Case Study Card Grid** — renders one card per document: industry tag, headline problem, solution summary, key metric
  3. **CTA** — Book Automation Audit
- Seed 3 placeholder documents into MongoDB at project start:
  - Healthcare: patient intake automation → 80% reduction in admin time
  - Agency: content pipeline automation → 3× content output
  - Manufacturing: reporting automation → weekly reports in 2 minutes

### 11.2 Individual Case Study Page (`app/case-studies/[slug]/page.tsx`)
- `generateStaticParams` fetches all published slugs from MongoDB at build time
- `generateMetadata` returns per-case-study title, description, and Open Graph tags
- Sections: headline → problem → solution → agent diagram (if applicable) → results metrics → CTA

---

## Phase 12 — About Page (`app/about/page.tsx`)

### Sections
1. **Page Hero** — "Built to Run the Modern Business"
2. **Mission Statement** — "The AI Operational Infrastructure that runs modern businesses"
3. **Philosophy** — "Jack of all trades. Master of all." explanation
4. **Long-Term Vision** — Agency → Platform transition narrative
5. **CTA** — Book Automation Audit

---

## Phase 13 — Blog Pages

### 13.1 Blog Listing Page (`app/blog/page.tsx`)
- Server component — fetches published posts from MongoDB via `/api/cms/blog?status=published`
- Sections:
  1. **Page Hero** — "Resources on AI Automation"
  2. **Post Card Grid** — title, excerpt, category tag, published date, read time estimate, slug link
  3. **CTA** — Book Automation Audit
- Seed 3 placeholder posts into MongoDB:
  - "What is an AI Department?" (category: AI Departments)
  - "How GTM Automation Works" (category: GTM)
  - "Automating Operations vs. Adding Tools" (category: Operations)

### 13.2 Individual Blog Post Page (`app/blog/[slug]/page.tsx`)
- `generateStaticParams` fetches all published slugs from MongoDB (enables static generation)
- `generateMetadata` returns per-post Open Graph and Twitter card metadata
- Renders post content (stored as HTML or Markdown in MongoDB)
- JSON-LD structured data block (Article schema — see Phase 17)
- Sidebar or bottom: related posts (same category, fetched from MongoDB)
- CTA at bottom of every post: Book Automation Audit

---

## Phase 14 — Book a Call Page (`app/book-a-call/page.tsx`)

### Sections
1. **Page Hero** — "Book Your Automation Audit"
2. **What to Expect** — 3-step list: We review your operations → Identify automation opportunities → Propose an AI Department build
3. **Calendly Embed or Contact Form** — Embed placeholder or simple form (name, email, company, message)
4. **Trust Signals** — Industries served list, brief philosophy statement

---

## Phase 15 — Node.js API Layer (`app/api/`)

Next.js Route Handlers run on Node.js. All routes: validate with Zod → hit MongoDB → respond.

---

### 15.1 `/lib/mongodb.ts` — Connection Singleton

```ts
// Caches the connection across hot reloads in dev and across requests in prod
import mongoose from 'mongoose'

let cached = global.mongoose ?? { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn
  cached.promise ??= mongoose.connect(process.env.MONGODB_URI!)
  cached.conn = await cached.promise
  return cached.conn
}
```

---

### 15.2 `/models/` — Mongoose Schemas

**`BlogPost.ts`**
```ts
{
  title: String (required)
  slug: String (required, unique, indexed)
  excerpt: String
  content: String          // HTML or Markdown
  category: String
  tags: [String]
  author: String
  featuredImage: String    // URL
  status: 'draft' | 'published'
  publishedAt: Date
  metaTitle: String
  metaDescription: String
  readTimeMinutes: Number
  createdAt: Date
  updatedAt: Date
}
```
Index: `{ slug: 1 }` unique, `{ status: 1, publishedAt: -1 }` compound (listing queries)

**`CaseStudy.ts`**
```ts
{
  title: String (required)
  slug: String (required, unique, indexed)
  industry: String
  problem: String
  solution: String
  results: [String]        // bullet outcomes
  metrics: [{ label: String, value: String }]
  featuredImage: String
  status: 'draft' | 'published'
  publishedAt: Date
  metaTitle: String
  metaDescription: String
  createdAt: Date
  updatedAt: Date
}
```

**`AuditRequest.ts`**
```ts
{ name, email, company, message?, createdAt }
```

**`DiscoverySubmission.ts`**
```ts
{ industry, companySize, timeConsumingTask, employeeCount, hoursWeekly,
  result: { weeklyHoursSaved, annualHoursSaved, annualDaysSaved }, createdAt }
```

**`Contact.ts`**
```ts
{ name, email, message, createdAt }
```

---

### 15.3 `/lib/validators.ts` — Zod Schemas

```ts
export const AuditRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  message: z.string().optional()
})

export const AutomationDiscoverySchema = z.object({
  industry: z.string().min(1),
  companySize: z.string().min(1),
  timeConsumingTask: z.string().min(1),
  employeeCount: z.number().positive(),
  hoursWeekly: z.number().positive()
})

export const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1)
})

export const BlogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string(),
  content: z.string(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  featuredImage: z.string().url().optional(),
  status: z.enum(['draft', 'published']),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional()
})

export const CaseStudySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  industry: z.string(),
  problem: z.string(),
  solution: z.string(),
  results: z.array(z.string()),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  status: z.enum(['draft', 'published']),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional()
})
```

---

### 15.4 `/lib/cms-auth.ts` — Write Endpoint Guard

```ts
// All CMS POST/PUT/DELETE routes call this before touching MongoDB
export function requireCmsAuth(request: Request): boolean {
  return request.headers.get('x-api-key') === process.env.CMS_API_KEY
}
```
Returns `401` if the key is missing or wrong.

---

### 15.5 Submission Routes

**`POST /api/audit`**
```
Body: { name, email, company, message? }
→ connectDB()
→ Validate with AuditRequestSchema (400 on failure)
→ new AuditRequest(body).save()
→ 200: { success: true }
```

**`POST /api/automation-discovery`**
```
Body: { industry, companySize, timeConsumingTask, employeeCount, hoursWeekly }
→ connectDB()
→ Validate with AutomationDiscoverySchema (400 on failure)
→ calculateAutomationOpportunity(employeeCount, hoursWeekly)
→ new DiscoverySubmission({ ...body, result }).save()
→ 200: { weeklyHoursSaved, annualHoursSaved, annualDaysSaved }
```

**`POST /api/contact`**
```
Body: { name, email, message }
→ connectDB()
→ Validate with ContactSchema (400 on failure)
→ new Contact(body).save()
→ 200: { success: true }
```

---

### 15.6 CMS Blog Routes

**`GET /api/cms/blog`**
```
Query: ?status=published|draft  ?category=  ?limit=  ?page=
→ connectDB()
→ BlogPost.find(filters).sort({ publishedAt: -1 }).skip().limit()
→ 200: { posts: [...], total, page }
```

**`POST /api/cms/blog`**
```
Header: x-api-key (required)
Body: BlogPostSchema fields
→ requireCmsAuth() → 401 if invalid
→ connectDB()
→ Validate with BlogPostSchema (400 on failure)
→ new BlogPost(body).save()
→ 201: { post }
```

**`GET /api/cms/blog/[slug]`**
```
→ connectDB()
→ BlogPost.findOne({ slug })
→ 200: { post } | 404
```

**`PUT /api/cms/blog/[slug]`**
```
Header: x-api-key (required)
Body: partial BlogPostSchema fields
→ requireCmsAuth() → 401 if invalid
→ connectDB()
→ BlogPost.findOneAndUpdate({ slug }, body, { new: true })
→ 200: { post } | 404
```

**`DELETE /api/cms/blog/[slug]`**
```
Header: x-api-key (required)
→ requireCmsAuth() → 401 if invalid
→ connectDB()
→ BlogPost.findOneAndDelete({ slug })
→ 200: { success: true } | 404
```

---

### 15.7 CMS Case Studies Routes

Mirrors Blog routes exactly, replacing `BlogPost` with `CaseStudy` and `BlogPostSchema` with `CaseStudySchema`:

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/cms/case-studies` | No |
| POST | `/api/cms/case-studies` | Yes |
| GET | `/api/cms/case-studies/[slug]` | No |
| PUT | `/api/cms/case-studies/[slug]` | Yes |
| DELETE | `/api/cms/case-studies/[slug]` | Yes |

---

### 15.8 Error Handling Convention (all routes)
- `400` — Zod validation failure; return `{ errors: ZodError.flatten() }`
- `401` — Missing or invalid CMS API key
- `404` — Document not found
- `500` — MongoDB error; log server-side, return `{ error: 'Internal server error' }`
- All routes return `Content-Type: application/json`

---

## Phase 16 — Blog SEO Indexing

This phase ensures every blog post and case study is discoverable, correctly indexed, and structured for rich search results.

---

### 16.1 `app/sitemap.ts` — Dynamic XML Sitemap

Next.js generates the sitemap at build time via this file. It fetches all published slugs from MongoDB.

```ts
import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import CaseStudy from '@/models/CaseStudy'

export default async function sitemap() {
  await connectDB()
  const posts = await BlogPost.find({ status: 'published' }, 'slug updatedAt')
  const cases = await CaseStudy.find({ status: 'published' }, 'slug updatedAt')

  const staticRoutes = ['/', '/services', '/ai-departments', '/gtm-systems',
    '/industries', '/about', '/blog', '/case-studies', '/book-a-call']
    .map(url => ({ url: `https://jensure.com${url}`, lastModified: new Date() }))

  const blogRoutes = posts.map(p => ({
    url: `https://jensure.com/blog/${p.slug}`,
    lastModified: p.updatedAt
  }))

  const caseRoutes = cases.map(c => ({
    url: `https://jensure.com/case-studies/${c.slug}`,
    lastModified: c.updatedAt
  }))

  return [...staticRoutes, ...blogRoutes, ...caseRoutes]
}
```

---

### 16.2 `app/robots.ts` — Robots Directive

```ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://jensure.com/sitemap.xml'
  }
}
```

---

### 16.3 `app/blog/[slug]/page.tsx` — Per-Post Metadata

**`generateStaticParams`** — called at build time, fetches all published slugs:
```ts
export async function generateStaticParams() {
  await connectDB()
  const posts = await BlogPost.find({ status: 'published' }, 'slug')
  return posts.map(p => ({ slug: p.slug }))
}
```

**`generateMetadata`** — dynamic metadata per post:
```ts
export async function generateMetadata({ params }) {
  await connectDB()
  const post = await BlogPost.findOne({ slug: params.slug })
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      type: 'article',
      url: `https://jensure.com/blog/${post.slug}`,
      publishedTime: post.publishedAt?.toISOString(),
      images: post.featuredImage ? [{ url: post.featuredImage }] : []
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt
    },
    alternates: { canonical: `https://jensure.com/blog/${post.slug}` }
  }
}
```

---

### 16.4 JSON-LD Structured Data (Article Schema)

Injected into each blog post page via a `<script type="application/ld+json">` tag:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "post.title",
  "description": "post.excerpt",
  "author": { "@type": "Organization", "name": "Jensure" },
  "publisher": {
    "@type": "Organization",
    "name": "Jensure",
    "logo": { "@type": "ImageObject", "url": "https://jensure.com/logo.png" }
  },
  "datePublished": "post.publishedAt",
  "dateModified": "post.updatedAt",
  "image": "post.featuredImage",
  "url": "https://jensure.com/blog/post.slug",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://jensure.com/blog/post.slug" }
}
```

This enables Google rich snippets (article date, author, image) in search results.

---

### 16.5 Blog Listing Page Index Controls

- Blog listing page (`/blog`) is **indexable** (`index, follow`)
- Individual post pages are **indexable** only when `status === 'published'`
- Draft posts must return `noindex` via `generateMetadata`:
  ```ts
  robots: post.status === 'published'
    ? { index: true, follow: true }
    : { index: false, follow: false }
  ```
- Canonical URL set on every post page to prevent duplicate content if slugs change

---

### 16.6 Blog Post URL Structure

```
/blog                         ← listing (paginated)
/blog/[slug]                  ← individual post
```

Slug rules enforced at CMS write time:
- Lowercase, hyphen-separated
- No special characters
- Max 75 characters
- Auto-generated from title if not provided (in the POST `/api/cms/blog` route)

---

## Phase 17 — SEO & Metadata

Every page exports a `metadata` object:
```ts
export const metadata: Metadata = {
  title: '...',
  description: '...',
  openGraph: {
    title: '...',
    description: '...',
    type: 'website',
    url: 'https://jensure.com/...',
    images: [{ url: '/og-image.png' }]
  }
}
```

Semantic HTML rules:
- One `<h1>` per page
- Use `<section>`, `<article>`, `<nav>`, `<main>`, `<footer>` appropriately
- `<h2>` for section headings, `<h3>` for card/sub-section headings

---

## Phase 16 — Final QA Checklist

### Content
- [ ] No buzzwords ("revolutionary", "cutting-edge", "game-changing")
- [ ] All 5 AI Departments represented with full agent hierarchies
- [ ] GTM Systems present on homepage and services page
- [ ] All 17 industries mentioned (at minimum 6 featured on homepage)
- [ ] AutomationForm functional with result output
- [ ] AgentDiagram present on homepage, AI Departments page, GTM Systems page

### Design
- [ ] Light background (`#FFFFFF` / `#F9FAFB`) applied consistently site-wide
- [ ] CTA button color consistent across all pages
- [ ] No heavy gradients
- [ ] Framer Motion used only for fade-in, stagger, hover elevation
- [ ] Typography hierarchy enforced (one H1 per page)

### Technical
- [ ] All pages and dynamic routes exist and route correctly (`/blog/[slug]`, `/case-studies/[slug]`)
- [ ] `metadata` exported from every page; `generateMetadata` on all dynamic routes
- [ ] All shared components in `/components`
- [ ] All static data centralized in `/lib/constants.ts`
- [ ] MongoDB connection singleton in `/lib/mongodb.ts`; all 5 Mongoose models defined
- [ ] All 3 submission API routes operational (`/api/audit`, `/api/automation-discovery`, `/api/contact`)
- [ ] All CMS blog routes operational (GET list, POST, GET slug, PUT, DELETE)
- [ ] All CMS case-study routes operational (same set)
- [ ] CMS write routes return 401 without correct `x-api-key` header
- [ ] Zod validation returns 400 with field-level errors on bad input
- [ ] `app/sitemap.ts` generates valid XML including all published blog + case study slugs
- [ ] `app/robots.ts` disallows `/api/` and points to sitemap
- [ ] JSON-LD Article schema injected on every blog post page
- [ ] Draft posts return `noindex` robots directive
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] Tailwind purge working (no unused class bloat)
- [ ] Mobile responsive (tested at 375px, 768px, 1440px)

### Conversion
- [ ] Every page has a primary CTA: "Book Automation Audit"
- [ ] Homepage has secondary CTA: "Describe Your Workflow"
- [ ] Book a Call page links from all primary CTAs

---

## Implementation Order Summary

| Order | Phase | Deliverable |
|-------|-------|-------------|
| 1 | Phase 0 | Next.js project initialized |
| 2 | Phase 1 | Design tokens in Tailwind config |
| 3 | Phase 3 | `/docs` reference files written |
| 4 | Phase 4 | `/lib/constants.ts` and `/lib/utils.ts` |
| 5 | Phase 5 | Root layout, globals, fonts |
| 6 | Phase 2 | All shared components built |
| 7 | Phase 6 | Homepage (all 9 sections) |
| 8 | Phase 7 | AI Departments page |
| 9 | Phase 8 | Services page |
| 10 | Phase 9 | GTM Systems page |
| 11 | Phase 10 | Industries page |
| 12 | Phase 11 | Case Studies page |
| 13 | Phase 12 | About page |
| 14 | Phase 13 | Blog page |
| 15 | Phase 14 | Book a Call page |
| 16 | Phase 15 | MongoDB connection · Mongoose models · submission routes · CMS CRUD routes |
| 17 | Phase 16 | Blog SEO indexing (sitemap · robots · JSON-LD · generateMetadata · noindex on drafts) |
| 18 | Phase 17 | SEO metadata on all static pages |
| 19 | Phase 18 | QA pass |

---

## Key Architectural Decisions

1. **No external diagram library** — AgentDiagram built with Tailwind divs only. Keeps bundle small and maintains full visual control.

2. **Data-driven pages** — All department/industry/service data lives in `/lib/constants.ts`. Pages import and map over arrays. This prevents content drift and makes future updates a single-file change.

3. **Automation calculator runs server-side** — The discovery form POSTs to `/api/automation-discovery`. The Node.js route handles validation, calculates the result, and persists the lead. This captures every submission as a qualified lead record, not just a browser calculation that disappears.

4. **MongoDB from day one** — All persistence goes through Mongoose models. The connection is a cached singleton (`/lib/mongodb.ts`) to avoid connection exhaustion under Next.js serverless cold starts. No file-based intermediate — MongoDB Atlas free tier is sufficient for launch.

5. **CMS is an internal API, not a third-party service** — Blog posts and case studies are managed via `/api/cms/blog` and `/api/cms/case-studies`. Write operations are protected by a `CMS_API_KEY` header. This means content can be created via any HTTP client (curl, Postman, a future admin UI) without committing to a SaaS CMS contract. The API can later back a custom admin panel or be replaced with a headless CMS without touching the frontend components.

6. **Blog SEO is structural, not an afterthought** — The sitemap is generated dynamically at build time from MongoDB, so every new post is automatically included on the next deploy. JSON-LD Article schema is embedded in every post page. Draft posts are protected by `noindex`. Canonical URLs are set to prevent duplicate content issues. This gives Google everything it needs to rank individual posts without manual configuration.

6. **Light mode** — The design system is light-first. White canvas with sharp typography and restrained use of color. Stripe is the reference. This reads as more trustworthy and institutional to the business buyer audience (operations managers, CFOs, CHROs) than a dark developer-tool aesthetic.

7. **Framer Motion minimal** — `motion.div` wrappers on section containers only. No page transitions. No complex choreography. Keeps performance strong and avoids gimmicky feel.
