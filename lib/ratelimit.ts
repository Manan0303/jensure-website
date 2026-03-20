/**
 * MongoDB-based rate limiter — no external service required.
 *
 * Strategy: sliding window using a single document per IP.
 * - findOneAndUpdate with upsert atomically increments the counter.
 * - TTL index on `expiresAt` auto-deletes documents after the window closes.
 * - Storage cost: ~200 bytes per unique IP per 60s window — negligible.
 */

import mongoose, { Schema, Model } from 'mongoose'
import { connectDB } from './mongodb'

const WINDOW_MS = 60 * 1000  // 60 seconds
const MAX_REQUESTS = 5

interface IRateLimit {
  ip: string
  count: number
  expiresAt: Date
}

const RateLimitSchema = new Schema<IRateLimit>({
  ip: { type: String, required: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
})

// TTL index: MongoDB removes the document automatically when expiresAt is reached
RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })
// Unique index on ip for atomic upsert correctness
RateLimitSchema.index({ ip: 1 }, { unique: true })

const RateLimitModel: Model<IRateLimit> =
  mongoose.models.RateLimit ??
  mongoose.model<IRateLimit>('RateLimit', RateLimitSchema)

export async function checkRateLimit(
  ip: string
): Promise<{ success: boolean; limit: number; remaining: number }> {
  await connectDB()

  const now = new Date()
  const expiresAt = new Date(now.getTime() + WINDOW_MS)

  // Atomically:
  // - If no doc exists for this IP (or the old one expired and TTL cleaned it): insert with count=1
  // - If doc exists and window is still open: increment count
  // - The condition `expiresAt: { $gt: now }` ensures expired-but-not-yet-cleaned docs
  //   are treated as new windows rather than carrying over stale counts
  const doc = await RateLimitModel.findOneAndUpdate(
    { ip, expiresAt: { $gt: now } },
    {
      $inc: { count: 1 },
      $setOnInsert: { expiresAt },
    },
    { upsert: true, new: true }
  ).lean()

  const count = doc?.count ?? 1
  const success = count <= MAX_REQUESTS
  const remaining = Math.max(0, MAX_REQUESTS - count)

  return { success, limit: MAX_REQUESTS, remaining }
}
