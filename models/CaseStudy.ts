import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICaseStudy extends Document {
  title: string
  slug: string
  industry: string
  problem: string
  solution: string
  results: string[]
  metrics: { label: string; value: string }[]
  featuredImage?: string
  status: 'draft' | 'published'
  publishedAt?: Date
  metaTitle?: string
  metaDescription?: string
  createdAt: Date
  updatedAt: Date
}

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    industry: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    results: { type: [String], default: [] },
    metrics: {
      type: [{ label: String, value: String }],
      default: []
    },
    featuredImage: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
    metaTitle: { type: String },
    metaDescription: { type: String }
  },
  { timestamps: true }
)

CaseStudySchema.index({ slug: 1 }, { unique: true })
CaseStudySchema.index({ status: 1, publishedAt: -1 })
CaseStudySchema.index({ industry: 1, status: 1 })

CaseStudySchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

const CaseStudy: Model<ICaseStudy> =
  mongoose.models.CaseStudy ?? mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema)

export default CaseStudy
