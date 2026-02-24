---
paths:
  - "src/app/api/**/*.ts"
---

# API Route Patterns

- Admin routes authenticate via `x-admin-key` header matching `ADMIN_SECRET_KEY` env var.
- Admin auth is header-based (`x-admin-key`), not cookie or session-based. Don't add middleware for admin auth.
- Resume analyzer is rate-limited to 3 analyses per day per IP (in-memory tracking).
- AI routes use `ANTHROPIC_API_KEY` to instantiate the Anthropic SDK client.
- All data mutations read the JSON file, modify the array, and write back.
- When writing to JSON data files, always `JSON.parse` the existing content first, modify the array, then `JSON.stringify` with pretty printing (`null, 2`).
