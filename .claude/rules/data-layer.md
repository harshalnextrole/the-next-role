---
paths:
  - "data/**/*.json"
  - "src/app/api/**/*.ts"
---

# Data Layer

All data lives in `data/*.json`. No database.

## Storage

| File                       | Purpose                        |
|----------------------------|--------------------------------|
| `testimonials.json`        | Approved testimonials          |
| `testimonials-pending.json`| Awaiting admin review          |
| `blog-posts.json`          | Blog content                   |
| `inquiries.json`           | Contact form submissions       |
| `clients.json`             | Client records                 |

## Data Models

**Testimonial:** `{ id, name, role, quote, rating (1-5), createdAt }`
**Blog Post:** `{ id, slug, title, excerpt, content, author, publishedAt, tags[], readTime, featured }`
**Inquiry:** `{ id, name, email, subject, message, createdAt, status ('new'|'read'|'replied') }`

## Testimonial Workflow

1. User submits -> saved to `testimonials-pending.json`
2. Admin reviews in `/admin` dashboard
3. Approved -> moved to `testimonials.json`
4. Rejected -> removed from pending

## JSON Read/Write Pattern

- Read with `fs.readFileSync`, write with `fs.writeFileSync`.
- Always `JSON.parse` existing content first, modify the array, then `JSON.stringify` with pretty printing (`null, 2`).
