Project: Jensure Website



This repository contains the official marketing website for Jensure, an AI automation company that builds AI Departments and automation systems for businesses across industries.



The purpose of this project is to:



• explain the Jensure platform and services

• demonstrate AI Department architecture

• convert visitors into automation audit calls

• establish authority in AI automation



The site must communicate clarity, trust, and operational intelligence.

Core Product Concept


Jensure builds AI Departments for businesses.



Each AI Department consists of:



Master Agent

(Coordinates strategy and execution)



Sub Agents

(Specialized operational agents performing tasks)



Example:



AI Marketing Department



CMO Agent → coordinates



Sub agents:



• Inbound Lead Agent

• SEO Agent

• Content Agent

• Social Media Agent

• Paid Ads Agent

• Analytics Agent



The website must clearly communicate this agent orchestration model.

Website Objective


The website must allow visitors to quickly understand:

What Jensure does

What problems it solves

How AI Departments operate

Which industries benefit

How automation improves business operations

How to request an automation audit



Primary conversion event:



Book Automation Audit

Core Messaging Principles


The site must avoid generic AI marketing language.



Instead focus on:



• eliminating repetitive work

• replacing operational chaos with systems

• orchestrating business functions with AI agents

• building automation that runs companies smoothly



Never position Jensure as:



• a chatbot provider

• a consulting firm

• a generic automation agency



Always position Jensure as:



AI Operational Infrastructure

Technology Stack


The website uses:



Next.js (App Router)

Node.js (For Backend)

TypeScript

TailwindCSS

Framer Motion



Do not document common framework behavior here.

Documentation Structure


Additional documentation is located in /docs.



Agents should reference these files when deeper context is required.



docs/



architecture.md

→ AI Department architecture explanation



services.md

→ automation services catalog



industries.md

→ industries supported by Jensure



gtm-systems.md

→ go-to-market automation systems



design-system.md

→ brand colors, typography, UI rules



content-guidelines.md

→ tone, messaging, positioning rules



automation-examples.md

→ real automation examples across industries

Page Architecture


Pages are defined in:



/app



Expected pages:

/app
  page.tsx
  services/page.tsx
  ai-departments/page.tsx
  gtm-systems/page.tsx
  industries/page.tsx
  case-studies/page.tsx
  about/page.tsx
  blog/page.tsx
  book-a-call/page.tsx
Agents must maintain this structure.



Avoid collapsing pages into single-page layouts.

Core Sections Required on Homepage


The homepage must include:



Hero

What is Jensure

AI Departments explanation

GTM systems overview

Automation categories

Industries served

Automation discovery section

Case study previews

Call to action

Automation Discovery Section


The site must include a form that asks visitors:



• industry

• company size

• most time consuming task

• number of employees performing it

• hours spent weekly



The form estimates automation opportunity.



This is a key differentiation feature.

Design Principles


The visual identity must follow these rules:



Clean

Modern

Authority-driven

Minimalistic



Avoid:



• heavy gradients

• excessive UI decoration

• gimmicky animations



Inspired by:



Stripe

Vercel

Linear

OpenAI

Branding


Primary colors are defined in:



docs/design-system.md



Typography:



Headlines: modern geometric sans serif

Body: clean readable sans serif



CTA color must always remain consistent across the site.

Agent Orchestration Visualization


The website must visually demonstrate:



Master Agent

↓

Sub Agents



This concept should appear in:



• AI Departments page

• GTM systems page

• homepage architecture section



Diagrams should be implemented using simple UI components.

Content Rules


The website content must follow these guidelines:



Avoid buzzwords.



Avoid vague statements like:



“revolutionary AI solutions”



Instead focus on:



• operational improvements

• time saved

• workflow automation

• system orchestration

Frequent Errors to Avoid


Claude agents commonly make these mistakes.



Avoid them.

Converting the site into a SaaS dashboard UI



This is a marketing website, not an application.

Overcomplicating animations



Animations must remain subtle.



Use Framer Motion only for:



• fade-in

• staggered elements

• hover elevation

Creating long walls of text



Break content into:



• sections

• cards

• structured layouts

Removing GTM explanation



The GTM system is a key marketing feature.



Never remove it from homepage or services page.

Ignoring industries



The platform must appear applicable to all industries.



Examples should include:



• manufacturing

• healthcare

• finance

• agencies

• ecommerce

Component Guidelines


Reusable components must be created in:



/components



Expected components:



Navbar

Footer

SectionContainer

ServiceCard

AgentDiagram

IndustryCard

CTAButton

AutomationForm



Avoid repeating layout patterns across pages.

SEO Requirements


Each page must include:



metadata export



title

description

open graph metadata



Use semantic HTML hierarchy.



Only one H1 per page.

Conversion Goal


Every page must guide the visitor toward:



Automation Audit



Primary CTA wording:



Book Automation Audit



Secondary CTA:



Describe Your Workflow

Long-Term Vision


This website is the foundation for:



Jensure Platform



Over time:



AI Departments will evolve into productized software systems.



The messaging must reflect that Jensure is building:



the operating system for automated companies