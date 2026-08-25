# A&O Kreative — website

Lead-generating marketing site for A&O Kreative. Next.js 16 (App Router) ·
TypeScript · Tailwind v4 · Supabase · Resend.

## Running locally

```bash
cp .env.example .env.local   # then fill in the keys
npm install
npm run dev
```

## What's here

| Path | Purpose |
|---|---|
| `src/lib/site.ts` | Single source of truth for nav, products, pricing and service copy |
| `src/app/globals.css` | Design tokens — every colour sampled from the logo |
| `src/components/ui/primitives.tsx` | Button, Badge, Section, Container, Check |
| `src/app/contact/actions.ts` | Server Action: validate → score → store → email |
| `src/lib/score.ts` | Lead scoring (>= 50 flags the alert as HOT) |
| `src/lib/email.ts` | Resend templates, visitor mail gated on a verified domain |
| `public/brand/*.svg` | The mark, traced to vector; reverse version for dark grounds |
| `src/content/*` | Services, case studies and articles — content, not config |
| `src/lib/knowledge.ts` | The assistant's system prompt, built from those same modules |
| `src/app/api/chat/route.ts` | Streaming assistant + deterministic lead capture |

## Product status drives the UI

Duka POS is **live** (signup hands off to the app, with UTMs so trial starts
are attributable). The Agency Management System is **in development** —
waitlist only, never a buy path. The internal CRM is not on the site as a
product; it appears only as proof on the software services page.

## Known gaps

- **No verified sending domain.** Visitor auto-replies are switched off behind
  `RESEND_DOMAIN_VERIFIED`. Internal lead alerts still work.
- **Privacy page is a placeholder** and needs legal review.
- **`/services/ai-automation` copy is a draft** written from a one-line brief.
- **`package-lock.json` is not committed** — run `npm install` to generate one.
- **The assistant needs `ANTHROPIC_API_KEY`.** Without it the widget degrades to a polite "not configured" message rather than failing.
- **The night backdrop is generated in CSS**, not a photograph. Drop a licensed
  image at `public/brand/skyline.jpg` and the `.skyline` class layers it on top
  automatically — no code change needed.
