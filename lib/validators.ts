import { z } from 'zod'

export const AuditRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().min(1, 'Company is required'),
  message: z.string().optional()
})

export const AutomationDiscoverySchema = z.object({
  industry: z.string().min(1, 'Industry is required'),
  companySize: z.string().min(1, 'Company size is required'),
  timeConsumingTask: z.string().min(1, 'Please describe your most time-consuming task'),
  employeeCount: z.number().positive('Employee count must be a positive number'),
  hoursWeekly: z.number().positive('Hours per week must be a positive number')
})

export const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

export const BlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional().default([]),
  seoKeywords: z.array(z.string()).optional().default([]),
  author: z.string().optional().default('Jensure'),
  featuredImage: z.string().url().optional(),
  status: z.enum(['draft', 'published']),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional()
})

export const BlogPostUpdateSchema = BlogPostSchema.partial()

export const CaseStudySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  industry: z.string().min(1, 'Industry is required'),
  problem: z.string().min(1, 'Problem statement is required'),
  solution: z.string().min(1, 'Solution description is required'),
  results: z.array(z.string()).min(1, 'At least one result is required'),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),
  featuredImage: z.string().url().optional(),
  status: z.enum(['draft', 'published']),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional()
})

export const CaseStudyUpdateSchema = CaseStudySchema.partial()

export const FAQSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  keywords: z.array(z.string()).optional().default([]),
  category: z.string().optional().default('general'),
  status: z.enum(['draft', 'published']),
})
export const FAQUpdateSchema = FAQSchema.partial()
export type FAQInput = z.infer<typeof FAQSchema>

export type AuditRequestInput = z.infer<typeof AuditRequestSchema>
export type AutomationDiscoveryInput = z.infer<typeof AutomationDiscoverySchema>
export type ContactInput = z.infer<typeof ContactSchema>
export type BlogPostInput = z.infer<typeof BlogPostSchema>
export type CaseStudyInput = z.infer<typeof CaseStudySchema>
