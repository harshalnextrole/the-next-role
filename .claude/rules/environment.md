# Environment Variables

| Variable                              | Used For                    |
|---------------------------------------|-----------------------------|
| `ADMIN_SECRET_KEY`                    | Admin dashboard auth        |
| `ANTHROPIC_API_KEY`                   | Claude AI (resume + chat)   |
| `STRIPE_SECRET_KEY`                   | Stripe server-side          |
| `STRIPE_WEBHOOK_SECRET`              | Stripe webhook verification |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe client-side          |
| `RESEND_API_KEY`                      | Email notifications         |
| `EMAIL_FROM`                          | Sender email address        |
| `ADMIN_EMAIL`                         | Admin notification recipient|
| `NEXT_PUBLIC_SITE_URL`               | Public URL for links        |

`.env.example` lists `OPENAI_API_KEY` — this is legacy. The codebase uses `ANTHROPIC_API_KEY`. Ignore `OPENAI_API_KEY`.
