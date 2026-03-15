import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IDiscoverySubmission extends Document {
  industry: string
  companySize: string
  timeConsumingTask: string
  employeeCount: number
  hoursWeekly: number
  result: {
    weeklyHoursSaved: number
    annualHoursSaved: number
    annualDaysSaved: number
    annualFTESaved: number
  }
  createdAt: Date
}

const DiscoverySubmissionSchema = new Schema<IDiscoverySubmission>(
  {
    industry: { type: String, required: true },
    companySize: { type: String, required: true },
    timeConsumingTask: { type: String, required: true },
    employeeCount: { type: Number, required: true },
    hoursWeekly: { type: Number, required: true },
    result: {
      weeklyHoursSaved: { type: Number, required: true },
      annualHoursSaved: { type: Number, required: true },
      annualDaysSaved: { type: Number, required: true },
      annualFTESaved: { type: Number, required: true }
    }
  },
  { timestamps: true }
)

DiscoverySubmissionSchema.index({ createdAt: -1 })
DiscoverySubmissionSchema.index({ industry: 1 })

const DiscoverySubmission: Model<IDiscoverySubmission> =
  mongoose.models.DiscoverySubmission ??
  mongoose.model<IDiscoverySubmission>('DiscoverySubmission', DiscoverySubmissionSchema)

export default DiscoverySubmission
