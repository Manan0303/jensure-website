// ─── Automation Opportunity Calculator ────────────────────────────────────────

export interface AutomationResult {
  weeklyHoursSaved: number
  annualHoursSaved: number
  annualDaysSaved: number
  annualFTESaved: number
}

export function calculateAutomationOpportunity(
  employeeCount: number,
  hoursWeekly: number
): AutomationResult {
  const weeklyHoursSaved = Math.round(employeeCount * hoursWeekly * 0.7)
  const annualHoursSaved = weeklyHoursSaved * 50
  const annualDaysSaved = Math.round(annualHoursSaved / 8)
  const annualFTESaved = parseFloat((annualHoursSaved / 2000).toFixed(1))

  return { weeklyHoursSaved, annualHoursSaved, annualDaysSaved, annualFTESaved }
}

// ─── Slug Generation ──────────────────────────────────────────────────────────

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 75)
    .trim()
}

// ─── Read Time Estimate ───────────────────────────────────────────────────────

export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

// ─── Class Merge Utility ──────────────────────────────────────────────────────

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
