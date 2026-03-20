import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IBlogPost extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  seoKeywords: string[]
  author: string
  featuredImage?: string
  status: 'draft' | 'published'
  publishedAt?: Date
  metaTitle?: string
  metaDescription?: string
  readTimeMinutes: number
  createdAt: Date
  updatedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    seoKeywords: { type: [String], default: [] },
    author: { type: String, default: 'Jensure' },
    featuredImage: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
    metaTitle: { type: String },
    metaDescription: { type: String },
    readTimeMinutes: { type: Number, default: 1 }
  },
  { timestamps: true }
)

// Indexes
BlogPostSchema.index({ slug: 1 }, { unique: true })
BlogPostSchema.index({ status: 1, publishedAt: -1 })
BlogPostSchema.index({ category: 1, status: 1 })

// Set publishedAt when status changes to published
BlogPostSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ?? mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)

export default BlogPost
