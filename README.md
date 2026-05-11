# Jirapa Executive Residence — marketing site

Next.js 14 (App Router) site for JER: booking inquiries, admin tools, and configurable imagery.

## Local development

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your Supabase URL, service role key, and admin secrets.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See **`.env.local.example`** for the full list. Minimum for production:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | **Server only** — REST service role key (never `NEXT_PUBLIC_`) |
| `ADMIN_PASSWORD` | Admin sign-in |
| `ADMIN_SESSION_SECRET` | JWT signing for admin cookie (≥32 characters) |

Optional: `NEXT_PUBLIC_EXPERIENCE_VIDEO_EMBED_URL`, rate-limit tuning vars (documented in the example file).

## Database migrations

SQL lives in `supabase/migrations/`. Apply to your Supabase project:

```bash
supabase link --project-ref YOUR_PROJECT_REF
npm run db:migrate
```

Or run each file in order in the Supabase SQL editor.

Tables/functions used by the app include **`jer_bookings`**, **`jer_gallery_layout`**, **`jer_rate_limit_events`**, and RPC **`jer_check_rate_limit`**.

## Operations

- **Health check:** `GET /api/health` — returns `{ "ok": true }` for uptime monitors.
- **Rate limits:** Booking and admin login use Supabase-backed limits per IP (configurable via env). Apply the latest migration so the RPC exists.
- **Secrets:** Rotate keys if they were ever exposed in chat, tickets, or screenshots. Never commit `.env.local`.

## Deploy (Vercel)

Set the same environment variables in the Vercel project settings, then push to your connected branch.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
