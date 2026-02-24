# Critical Rules

- **Never modify `.env` or `.env.local` files.** Only reference env vars in code.
- **Never expose secret keys in client-side code.** Only `NEXT_PUBLIC_*` vars are safe for the browser.
- **Never add a database.** The JSON file data layer is intentional. Keep it.
- **Never remove `CalendlyPreload` from the root layout.** It enables instant calendar popups.
- **Never change the Calendly resource preloading** in `layout.tsx` `<head>`.
- **Never use `OPENAI_API_KEY`.** All AI features use `ANTHROPIC_API_KEY` with the Anthropic SDK.
- **Never use CSS modules or styled-components.** Tailwind only.
- **Never use `any` type.** Define proper TypeScript interfaces.
