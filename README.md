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

## Product status drives the UI

Duka POS is **live** (signup hands off to the app, with UTMs so trial starts
are attributable). The Agency Management System is **in development** —
waitlist only, never a buy path. The internal CRM is not on the site as a
product; it appears only as proof on the software services page.

## Known gaps

- **No verified sending domain.** Visitor auto-replies are switched off behind
  `RESEND_DOMAIN_VERIFIED`. Internal lead alerts still work.
- **`/work`** (case studies) is not built until real client numbers exist.
- **Privacy page is a placeholder** and needs legal review.
- **`/services/ai-automation` copy is a draft** written from a one-line brief.
- **`package-lock.json` is not committed** — run `npm install` to generate one.
