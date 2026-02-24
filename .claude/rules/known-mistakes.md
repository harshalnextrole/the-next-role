# Known Mistakes to Avoid

_Add to this file when you discover a recurring mistake pattern._

- `.env.example` references `OPENAI_API_KEY` but the code uses `ANTHROPIC_API_KEY`. Don't be misled by the example file.
- Always add `'use client'` directive before using React hooks (`useState`, `useEffect`, etc.) in a component. Server components don't support hooks.
- When writing to JSON data files, always `JSON.parse` the existing content first, modify the array, then `JSON.stringify` with pretty printing (`null, 2`).
- The Calendly integration uses `react-calendly`'s `PopupModal` component. Don't try to use iframe embeds.
- Admin auth is header-based (`x-admin-key`), not cookie or session-based. Don't add middleware for admin auth.
