# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

No test runner is configured. Validate changes with `npm run build` and `npm run lint`.

## What This Is

PM career coaching platform by Harshal Gautam. Users can analyze resumes with AI, chat with a coaching bot, book Calendly calls, read blog posts, submit testimonials, and pay via Stripe. Admin dashboard moderates content.

## Tech Stack

- **Framework:** Next.js 14.2 (App Router), React 18.2, TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 3.4 — no other CSS solution
- **AI:** Anthropic SDK 0.72.1 — Claude Haiku 3 for resume analysis + chat coaching
- **Payments:** Stripe 20.3.0
- **Scheduling:** react-calendly 4.4.0 (pre-loaded in root layout for instant popups)
- **PDF Parsing:** unpdf 1.4.0
- **Email:** Resend (optional, falls back to console logging)

## Architecture

```
src/app/              → Pages and layouts (App Router)
src/app/api/          → API route handlers
src/components/       → Reusable React components
src/lib/email.ts      → Email notifications (Resend)
data/*.json           → All persistent data (no database)
```

### Cross-Cutting Patterns

**Root layout** (`src/app/layout.tsx`) wraps every page with Header, Footer, CalendlyPreload, and FloatingCTA. Calendly resources are preloaded in `<head>` and the widget script loads on mount via CalendlyPreload. This is performance-critical — do not restructure.

**CalendlyModal** uses a React Portal (`document.body`) to escape Header's stacking context. The modal prevents body scroll and pre-loads the InlineWidget with a 100ms delay.

**Data persistence** is JSON file-based. All API routes that mutate data follow the same pattern: read file with `fs.readFileSync`, parse JSON, modify array, write back with `JSON.stringify(data, null, 2)`. Files auto-create if missing.

**Admin auth** is header-based only: API routes check `x-admin-key` header against `ADMIN_SECRET_KEY` env var. No middleware, no cookies, no sessions. The admin dashboard stores the key in localStorage.

**Resume Analyzer flow** spans multiple components and API routes:
1. `ResumeAnalyzer.tsx` handles file upload → calls `/api/parse-pdf` for PDF extraction
2. Submits resume + job description to `/api/analyze-resume` → Claude Haiku returns structured JSON (matchScore, strengths, gaps, rewrites)
3. `ScoreCircle.tsx` renders the match score; rewrites are gated (3 free, rest paywalled)
4. `ChatCoach.tsx` provides follow-up chat via `/api/chat-coach` (5 free messages, then paywalled)
5. `PricingModal.tsx` (Portal) handles tier selection → `/api/create-checkout` → Stripe
6. On return from Stripe, URL query param `?purchased={productId}` unlocks features

**Stripe fallback:** If `STRIPE_SECRET_KEY` is not configured, `/api/create-checkout` grants demo access automatically instead of creating a real checkout session.

**Email notifications** (`src/lib/email.ts`) fire on testimonial submission and contact form submission. If `RESEND_API_KEY` is missing, notifications log to console instead of failing.

**Import alias:** Use `@/` for all imports from `src/` (e.g., `import Header from "@/components/Header"`).

## Rules

Detailed rules live in `.claude/rules/` with path-scoped frontmatter where applicable:

| File                    | Scope                          |
|-------------------------|--------------------------------|
| `code-style.md`        | TypeScript/Tailwind conventions |
| `api-routes.md`        | API route patterns              |
| `design-system.md`     | Colors, typography, components  |
| `brand-voice.md`       | Copywriting tone and style      |
| `data-layer.md`        | JSON storage patterns           |
| `environment.md`       | Env vars reference              |
| `critical-rules.md`    | Hard rules (never-do list)      |
| `design-recreation.md` | Screenshot comparison workflow  |
| `known-mistakes.md`    | Common pitfall patterns         |
