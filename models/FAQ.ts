import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IFAQ extends Document {
  question: string
  answer: string
  keywords: string[]
  category: string
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    keywords: { type: [String], default: [] },
    category: { type: String, default: 'general' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
)

FAQSchema.index({ status: 1, createdAt: -1 })
FAQSchema.index({ category: 1, status: 1 })

const FAQ: Model<IFAQ> = mongoose.models.FAQ ?? mongoose.model<IFAQ>('FAQ', FAQSchema)
export default FAQ
