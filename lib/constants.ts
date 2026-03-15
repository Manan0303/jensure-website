// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'AI Departments', href: '/ai-departments' },
  { label: 'Services', href: '/services' },
  { label: 'GTM Systems', href: '/gtm-systems' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' }
]

// ─── AI Departments ───────────────────────────────────────────────────────────

export interface SubAgent {
  name: string
  description: string
}

export interface AIDepartment {
  id: string
  name: string
  masterAgent: { title: string; description: string }
  subAgents: SubAgent[]
  icon: string
}

export const AI_DEPARTMENTS: AIDepartment[] = [
  {
    id: 'marketing',
    name: 'AI Marketing Department',
    icon: '📣',
    masterAgent: {
      title: 'AI Chief Marketing Officer',
      description: 'Oversees all marketing operations, coordinates campaigns, and ensures consistent lead generation across channels.'
    },
    subAgents: [
      { name: 'Inbound Lead Agent', description: 'Monitors website forms and inbound inquiries, qualifies and routes leads automatically.' },
      { name: 'Content Creation Agent', description: 'Generates blog posts, newsletters, and marketing materials on a defined schedule.' },
      { name: 'Social Media Agent', description: 'Creates and schedules posts across all social platforms from approved content briefs.' },
      { name: 'SEO Agent', description: 'Conducts keyword research and generates SEO-optimized content and meta data.' },
      { name: 'Paid Advertising Agent', description: 'Creates and continuously optimizes advertising campaigns across channels.' },
      { name: 'Analytics Agent', description: 'Compiles and distributes marketing performance reports automatically.' }
    ]
  },
  {
    id: 'sales',
    name: 'AI Sales Department',
    icon: '💼',
    masterAgent: {
      title: 'AI Chief Revenue Officer',
      description: 'Coordinates the full sales pipeline from prospect identification to closed deal, ensuring no opportunity is missed.'
    },
    subAgents: [
      { name: 'Lead Enrichment Agent', description: 'Researches and enriches prospect data with company, role, and contact information.' },
      { name: 'Outreach Agent', description: 'Generates and sends personalized outreach messages across email and LinkedIn.' },
      { name: 'Follow-Up Agent', description: 'Ensures every lead receives timely, contextual follow-ups without manual intervention.' },
      { name: 'Meeting Scheduling Agent', description: 'Coordinates and books meetings directly from outreach sequences.' },
      { name: 'Proposal Generation Agent', description: 'Creates tailored proposals from predefined templates and deal data.' },
      { name: 'Pipeline Monitoring Agent', description: 'Tracks deal progression and surfaces stalled opportunities for review.' }
    ]
  },
  {
    id: 'operations',
    name: 'AI Operations Department',
    icon: '⚙️',
    masterAgent: {
      title: 'AI Chief Operating Officer',
      description: 'Ensures all internal operational workflows run without bottlenecks, coordinating data, tasks, and reporting automatically.'
    },
    subAgents: [
      { name: 'Workflow Automation Agent', description: 'Coordinates internal task workflows across teams and tools.' },
      { name: 'Data Synchronization Agent', description: 'Maintains data consistency across all connected systems in real time.' },
      { name: 'Reporting Agent', description: 'Generates operational performance reports on schedule without manual effort.' },
      { name: 'Document Processing Agent', description: 'Extracts, categorizes, and routes information from incoming documents.' },
      { name: 'Knowledge Management Agent', description: 'Organizes company knowledge, SOPs, and process documentation automatically.' }
    ]
  },
  {
    id: 'finance',
    name: 'AI Finance Department',
    icon: '📊',
    masterAgent: {
      title: 'AI Chief Financial Officer',
      description: 'Manages financial operations, ensures invoicing accuracy, tracks spending, and delivers financial visibility without manual work.'
    },
    subAgents: [
      { name: 'Invoice Generation Agent', description: 'Automatically creates and sends invoices from project or order triggers.' },
      { name: 'Payment Reminder Agent', description: 'Sends payment reminders and follow-ups on a defined schedule.' },
      { name: 'Expense Management Agent', description: 'Categorizes and tracks expenses from receipts and card feeds.' },
      { name: 'Financial Reporting Agent', description: 'Produces financial summaries and performance reports automatically.' },
      { name: 'Budget Monitoring Agent', description: 'Tracks spending against approved budgets and alerts on variances.' }
    ]
  },
  {
    id: 'hr',
    name: 'AI HR & Recruitment Department',
    icon: '👥',
    masterAgent: {
      title: 'AI Chief Human Resources Officer',
      description: 'Manages the full employee lifecycle — from candidate screening to onboarding and performance tracking — with minimal manual effort.'
    },
    subAgents: [
      { name: 'Candidate Screening Agent', description: 'Evaluates resumes against job criteria and surfaces qualified candidates only.' },
      { name: 'Interview Scheduling Agent', description: 'Coordinates candidate and panel calendars and books interviews automatically.' },
      { name: 'Onboarding Agent', description: 'Automates new hire paperwork, tool provisioning, and onboarding communications.' },
      { name: 'Performance Monitoring Agent', description: 'Tracks employee performance metrics and generates review summaries.' },
      { name: 'Employee Communication Agent', description: 'Manages internal HR communications, announcements, and policy updates.' }
    ]
  }
]

// ─── Industries ───────────────────────────────────────────────────────────────

export interface Industry {
  id: string
  name: string
  icon: string
  painPoint: string
  automationExample: string
}

export const INDUSTRIES: Industry[] = [
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', painPoint: 'Patient intake, scheduling, and documentation consume clinical and admin staff time.', automationExample: 'Patient intake automated from form to EHR — 45 minutes of admin work eliminated per patient.' },
  { id: 'pharmaceutical', name: 'Pharmaceutical', icon: '💊', painPoint: 'Regulatory documentation and compliance reporting require significant manual coordination.', automationExample: 'Compliance reports generated automatically from trial data — no analyst input required.' },
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭', painPoint: 'Production reports, inventory tracking, and supplier communication rely on manual data entry.', automationExample: 'Daily production reports generated from sensor data in under 2 minutes.' },
  { id: 'financial-services', name: 'Financial Services', icon: '🏦', painPoint: 'Client onboarding, KYC checks, and compliance reporting are time-intensive and error-prone.', automationExample: 'KYC checks run automatically on submission — compliance team reviews flagged cases only.' },
  { id: 'insurance', name: 'Insurance', icon: '🛡️', painPoint: 'Claims processing, policy renewals, and customer follow-ups require large operations teams.', automationExample: 'Renewal reminders sent automatically 30 days before policy expiry — zero manual outreach.' },
  { id: 'retail', name: 'Retail', icon: '🛍️', painPoint: 'Inventory management, order processing, and customer service create high operational volume.', automationExample: 'Inventory synced across all channels every 15 minutes — stockouts prevented automatically.' },
  { id: 'ecommerce', name: 'Ecommerce', icon: '🛒', painPoint: 'Product listings, support tickets, and return processing consume bandwidth as volume scales.', automationExample: 'Returns processed and replacements triggered without customer service involvement.' },
  { id: 'real-estate', name: 'Real Estate', icon: '🏠', painPoint: 'Lead follow-up, listing management, and document preparation are repetitive and time-consuming.', automationExample: 'Lead nurture sequences run automatically — agents only engage when prospect is ready.' },
  { id: 'education', name: 'Education', icon: '🎓', painPoint: 'Enrollment, administrative communications, and course management require significant staff time.', automationExample: 'Student enrollment workflows fully automated from application to confirmation.' },
  { id: 'logistics', name: 'Logistics', icon: '🚚', painPoint: 'Shipment tracking, carrier communication, and delivery exceptions create constant operational noise.', automationExample: 'Exception alerts triggered and customer notifications sent automatically on delivery delay.' },
  { id: 'consulting', name: 'Consulting', icon: '💡', painPoint: 'Proposal creation, project reporting, and client communication eat into billable hours.', automationExample: 'Client status reports generated and emailed automatically every Friday — zero consultant time.' },
  { id: 'marketing-agencies', name: 'Marketing Agencies', icon: '📈', painPoint: 'Content production, client reporting, and campaign management at scale require large teams.', automationExample: 'Client performance reports compiled from all platforms and delivered every Monday automatically.' },
  { id: 'recruitment', name: 'Recruitment Firms', icon: '🎯', painPoint: 'Resume screening, candidate outreach, and interview scheduling are high-volume and repetitive.', automationExample: 'Resumes screened automatically — consultants only review pre-qualified candidates.' },
  { id: 'saas', name: 'SaaS Companies', icon: '💻', painPoint: 'Customer onboarding, churn detection, and support triage require constant human attention.', automationExample: 'Churn signals flagged and escalated to success team automatically — no manual monitoring.' },
  { id: 'hospitality', name: 'Hospitality', icon: '🏨', painPoint: 'Reservation management, guest communication, and staff coordination create daily operational complexity.', automationExample: 'Guest pre-arrival communications sent automatically based on booking data.' },
  { id: 'travel', name: 'Travel & Tourism', icon: '✈️', painPoint: 'Booking management, itinerary generation, and support handle high request volumes.', automationExample: 'Itineraries generated automatically from booking data and emailed to guests within minutes.' },
  { id: 'media', name: 'Media & Entertainment', icon: '🎬', painPoint: 'Content scheduling, analytics, and audience reporting require ongoing manual effort.', automationExample: 'Weekly audience analytics report generated from all platforms and distributed automatically.' }
]

// ─── Small Automations ────────────────────────────────────────────────────────

export interface SmallAutomation {
  id: string
  title: string
  description: string
  icon: string
  timeSaved: string
}

export const SMALL_AUTOMATIONS: SmallAutomation[] = [
  { id: 'data-entry', title: 'Data Entry Automation', description: 'Eliminate manual form and spreadsheet entry by connecting your sources directly to your systems.', icon: '⌨️', timeSaved: 'Saves 5–15 hrs/week' },
  { id: 'spreadsheet-sync', title: 'Spreadsheet Synchronization', description: 'Keep data consistent across multiple sheets and systems in real time without manual updates.', icon: '📋', timeSaved: 'Saves 3–8 hrs/week' },
  { id: 'meeting-transcription', title: 'Meeting Transcription & Summary', description: 'Every meeting recorded, transcribed, and summarized — action items extracted automatically.', icon: '🎙️', timeSaved: 'Saves 2–4 hrs/week' },
  { id: 'email-management', title: 'Email Inbox Management', description: 'Categorize, route, and draft email responses automatically based on content and context.', icon: '📧', timeSaved: 'Saves 4–10 hrs/week' },
  { id: 'invoice-generation', title: 'Invoice Generation', description: 'Invoices created and sent automatically from project milestones, order confirmations, or time entries.', icon: '🧾', timeSaved: 'Saves 3–6 hrs/week' },
  { id: 'document-summarization', title: 'Document Summarization', description: 'Contracts, reports, and documents summarized with key information extracted in seconds.', icon: '📄', timeSaved: 'Saves 4–8 hrs/week' },
  { id: 'feedback-analysis', title: 'Customer Feedback Analysis', description: 'Aggregate and categorize customer feedback from all channels into structured, actionable reports.', icon: '💬', timeSaved: 'Saves 3–6 hrs/week' },
  { id: 'content-repurposing', title: 'Content Repurposing', description: 'Convert long-form content into social posts, email newsletters, and short clips automatically.', icon: '♻️', timeSaved: 'Saves 4–8 hrs/week' },
  { id: 'task-creation', title: 'Task Creation from Communications', description: 'Convert Slack messages and emails into tasks in your project management tool automatically.', icon: '✅', timeSaved: 'Saves 2–5 hrs/week' }
]

// ─── GTM System Components ────────────────────────────────────────────────────

export interface GTMComponent {
  id: string
  title: string
  description: string
  icon: string
}

export const GTM_COMPONENTS: GTMComponent[] = [
  { id: 'lead-gen', title: 'Lead Generation', description: 'Identifies and captures leads from inbound channels, web activity, and intent signals automatically.', icon: '🎯' },
  { id: 'email-outreach', title: 'Email Outreach', description: 'Sends personalized email sequences with automated follow-up logic based on prospect behavior.', icon: '📧' },
  { id: 'linkedin', title: 'LinkedIn Outreach', description: 'Manages connection requests, messages, and follow-ups on LinkedIn at scale without manual effort.', icon: '🔗' },
  { id: 'enrichment', title: 'Lead Enrichment', description: 'Automatically researches leads and appends company size, role, tech stack, and contact data.', icon: '🔍' },
  { id: 'crm', title: 'CRM Integration', description: 'Syncs all lead and deal data into your CRM automatically — no manual entry, no missed updates.', icon: '🗂️' },
  { id: 'scheduling', title: 'Meeting Scheduling', description: 'Books meetings directly from outreach sequences based on prospect responses and availability.', icon: '📅' },
  { id: 'followup', title: 'Follow-Up Sequences', description: 'Ensures no lead goes cold with timed, personalized follow-up messages triggered automatically.', icon: '🔄' },
  { id: 'analytics', title: 'Campaign Analytics', description: 'Tracks open rates, reply rates, meetings booked, and pipeline value in a real-time dashboard.', icon: '📊' }
]

// ─── Case Study Placeholder Data ──────────────────────────────────────────────

export interface CaseStudyPreview {
  industry: string
  headline: string
  metric: string
  metricLabel: string
  slug: string
}

export const CASE_STUDY_PREVIEWS: CaseStudyPreview[] = [
  { industry: 'Healthcare', headline: 'Patient intake process automated end-to-end', metric: '80%', metricLabel: 'reduction in admin time', slug: 'healthcare-patient-intake' },
  { industry: 'Marketing Agency', headline: 'Content pipeline running without a content team', metric: '3×', metricLabel: 'content output increase', slug: 'agency-content-pipeline' },
  { industry: 'Manufacturing', headline: 'Production reporting fully automated', metric: '2 min', metricLabel: 'weekly reports generated', slug: 'manufacturing-reporting' }
]
