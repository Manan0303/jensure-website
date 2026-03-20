import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAdminUser extends Document {
  email: string
  passwordHash: string
  createdAt: Date
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
)

const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser ??
  mongoose.model<IAdminUser>('AdminUser', AdminUserSchema)

export default AdminUser
