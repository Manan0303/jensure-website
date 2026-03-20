import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { AutomationDiscoverySchema } from '@/lib/validators'
import { calculateAutomationOpportunity } from '@/lib/utils'
import DiscoverySubmission from '@/models/DiscoverySubmission'
import { checkRateLimit } from '@/lib/ratelimit'

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      request.headers.get('x-real-ip') ??
      '127.0.0.1'

    const { success, limit, remaining } = await checkRateLimit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
          },
        }
      )
    }

    const body = await request.json()
    const parsed = AutomationDiscoverySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { employeeCount, hoursWeekly, ...rest } = parsed.data
    const result = calculateAutomationOpportunity(employeeCount, hoursWeekly)

    await connectDB()
    await new DiscoverySubmission({ ...rest, employeeCount, hoursWeekly, result }).save()

    return NextResponse.json(result, { status: 200 })
  } catch (err) {
    console.error('[POST /api/automation-discovery]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
