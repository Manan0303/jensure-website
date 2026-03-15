import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAuditRequest extends Document {
  name: string
  email: string
  company: string
  message?: string
  createdAt: Date
}

const AuditRequestSchema = new Schema<IAuditRequest>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    message: { type: String }
  },
  { timestamps: true }
)

AuditRequestSchema.index({ createdAt: -1 })
AuditRequestSchema.index({ email: 1 })

const AuditRequest: Model<IAuditRequest> =
  mongoose.models.AuditRequest ?? mongoose.model<IAuditRequest>('AuditRequest', AuditRequestSchema)

export default AuditRequest
