---
paths:
  - "src/components/**/*.tsx"
  - "src/app/**/*.tsx"
  - "src/app/globals.css"
  - "tailwind.config.ts"
---

# Design System

## Colors (defined in `tailwind.config.ts`)

| Color   | Role                    | Primary shade |
|---------|-------------------------|---------------|
| Navy    | Headings, text, trust   | `navy-800`    |
| Coral   | CTAs, accents, warmth   | `coral-500`   |
| Cream   | Backgrounds, softness   | `cream-100`   |
| Forest  | Success, positive       | `forest-500`  |

Full scales available: navy-50 to navy-950, coral-50 to coral-950, cream-50 to cream-500, forest-50 to forest-900.

## Typography

- **Headings:** `font-display` (DM Sans) — weights 400-800
- **Body:** `font-sans` (Inter) — weights 300-700
- **Base:** `text-navy-800` on `bg-cream-100`

## Component Classes (from `globals.css`)

- `btn-primary` — Coral CTA button with shadow and hover lift
- `btn-secondary` — White outlined button with coral hover
- `card` — White rounded card with cream border and hover shadow
- `section-padding` — Responsive section padding
- `container-max` — Max-width centered container
