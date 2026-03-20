import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Sliding window: 5 requests per 60 seconds per IP
// Protects against form spam and MongoDB storage exhaustion
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '60 s'),
  analytics: false,
  prefix: 'jensure:rl',
})

export async function checkRateLimit(ip: string) {
  const { success, limit, remaining, reset } = await ratelimit.limit(ip)
  return { success, limit, remaining, reset }
}
