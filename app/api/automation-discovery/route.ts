import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { AutomationDiscoverySchema } from '@/lib/validators'
import { calculateAutomationOpportunity } from '@/lib/utils'
import DiscoverySubmission from '@/models/DiscoverySubmission'

export async function POST(request: Request) {
  try {
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
