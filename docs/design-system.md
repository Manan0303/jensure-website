# Jensure Design System

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| brand-white | #FFFFFF | Page backgrounds |
| brand-off-white | #F9FAFB | Alternate section backgrounds |
| brand-black | #0F0F0F | Primary text |
| brand-gray-dark | #374151 | Secondary text |
| brand-gray | #6B7280 | Labels, tertiary text |
| brand-gray-light | #E5E7EB | Borders, dividers |
| brand-blue | #2563EB | Primary CTA, links |
| brand-blue-light | #3B82F6 | Hover states |
| brand-surface | #F3F4F6 | Card backgrounds |

## Typography

- Headlines: Geist Sans (geometric) — tight tracking, large scale
- Body: Geist Sans — readable weight, comfortable line height
- Loaded via next/font/google or next/font/local

### Scale
- Hero headline: text-6xl / text-7xl, font-bold, tracking-tight
- Section headline: text-4xl / text-5xl, font-semibold
- Card headline: text-xl / text-2xl, font-semibold
- Body: text-base / text-lg, font-normal
- Caption / label: text-sm, font-medium, text-brand-gray

## Spacing
- Section vertical padding: py-24 (desktop), py-16 (mobile)
- Max content width: max-w-7xl mx-auto
- Section gap between sections: space-y-24

## Components

### CTAButton
- Primary: bg-brand-blue text-white, hover:bg-brand-blue-light
- Secondary: border border-brand-gray-light text-brand-black, hover:bg-brand-surface
- Padding: px-6 py-3 (default), px-8 py-4 (large)
- Border radius: rounded-lg
- Transition: Framer Motion hover scale 1.02, y -2

### Cards
- Background: bg-brand-surface
- Border: border border-brand-gray-light
- Border radius: rounded-xl
- Padding: p-6
- Hover: shadow-md, scale 1.01 via Framer Motion

### AgentDiagram
- Master box: bg-brand-blue text-white, rounded-xl, p-4
- Sub-agent boxes: bg-brand-surface border border-brand-gray-light, rounded-lg, p-3
- Connector line: bg-brand-gray-light, 1px wide
- Layout: flex-col with centered alignment

## Animation Rules (Framer Motion only)
- Fade-in: opacity 0→1, y 8→0, duration 0.5s, ease
- Stagger: 0.1s delay between children
- Hover elevation: scale 1.02, y -2
- NO: bounce, spring, slide from off-screen, page transitions

## Design References
Stripe · OpenAI · Linear · Vercel (light-mode instances)
