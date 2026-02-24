---
paths:
  - "src/**/*.{ts,tsx}"
---

# Code Style

- Use Tailwind utility classes exclusively. No CSS modules. No styled-components. No inline style objects.
- Use existing component classes from `globals.css`: `btn-primary`, `btn-secondary`, `card`, `section-padding`, `container-max`.
- Use `@/` path alias for all imports from `src/`.
- TypeScript strict mode. No `any` types. Define proper TypeScript interfaces.
- Functional components only. No class components.
- Name files in kebab-case for routes, PascalCase for components.
- Keep API route handlers in `route.ts` files following Next.js App Router conventions.
- Server components by default. Only add `'use client'` when you need state, effects, event handlers, or browser APIs.
