# Dé-light Fashion House — Web

Production Next.js build for delightfashionhouse.com. Spec lives in `../delight-fashion-house/docs/`.

## Stack

- **Next.js 14** (App Router, TypeScript) → deployed to **Vercel**
- **Tailwind CSS** with brand tokens locked to the real assets
- **Resend** for transactional email (optional; site previews without it)
- **Meta Pixel** wired and ready (optional; site previews without it)
- **Content in JSON** under `content/` so non-coders can edit via GitHub. See [CONTENT.md](./CONTENT.md).

## Brand palette (locked, derived from the actual logo + design assets)

| Token | Hex | Usage |
| --- | --- | --- |
| `crimson` | `#B91D1D` | Primary brand accent, CTAs, dividers |
| `crimson-deep` | `#8B1212` | Hover state |
| `navy` | `#1A2D5F` | Primary brand colour, headers |
| `navy-deep` | `#0E1A3E` | Footer, hero overlays |
| `cream` | `#F5ECD7` | Primary canvas |
| `cream-warm` | `#FAF4E4` | Alternate section background |
| `gold` | `#C9A961` | Secondary metallic accent |
| `silver` | `#C0C0C0` | Tertiary metallic |

## Pages

- `/` — Home (9 sections per docs/01-home-page.md)
- `/fashion-inspo` — Filterable grid of all looks
- `/fashion-inspo/[slug]` — Per-pin detail (statically generated)
- `/gallery/[archetype]` — One dynamic route covering Brides, Aso Ebi, Boss Ladies, Soft Life
- `/our-story` — Founder story + 10-year timeline
- `/contact` — WhatsApp tile + IG + Pinterest + backup form + FAQ

## Run locally

```bash
# from inside web/
export PATH="$HOME/.local/node/bin:$PATH"   # if Node was installed user-level
npm run dev                                  # http://localhost:3000
```

## Deploy to Vercel

```bash
# one-time
git init && git add . && git commit -m "Initial commit"
# push to a new GitHub repo, then in Vercel dashboard:
#   1. Import the repo
#   2. Framework: Next.js (auto-detected)
#   3. Root directory: web
#   4. Add environment variables (see .env.local.example)
#   5. Deploy
```

After the first deploy, every push to `main` (or whichever branch you set as production) auto-rebuilds.

## Editing content (Beulah / Nifemi)

See [CONTENT.md](./CONTENT.md) for the step-by-step guide. Short version:

1. Open the GitHub repo in browser.
2. Edit a file in `content/` (e.g. `pins.json` to set prices).
3. Commit via the GitHub UI.
4. Vercel auto-deploys in ~30s.

No CLI, no Sanity, no developer needed for content changes.

## Optional integrations (off by default)

| Service | Activate by setting | What it enables |
| --- | --- | --- |
| Resend | `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` | Real email send on form submits, list growth |
| Meta Pixel | `NEXT_PUBLIC_META_PIXEL_ID` | Real Pixel events for retargeting |
| Sanity (future) | `NEXT_PUBLIC_SANITY_PROJECT_ID` | Optional CMS upgrade; client and queries already in `lib/sanity.ts` |

Without these env vars, the site previews fully and the API routes log to console instead of sending email.

## Brand assets

| Path | Source |
| --- | --- |
| `public/brand/logo-{white,navy,crimson,charcoal}.png` | Generated from the white logo via PIL tinting |
| `public/brand/business-card-red.{jpg,webp}` | Branding Document mockup |
| `public/brand/business-card-silver.{jpg,webp}` | Branding Document mockup |
| `public/brand/tote-navy.{jpg,webp}` | Branding Document mockup |
| `public/pins/pin-01.jpg` … `pin-18.jpg` | Pinterest pins, deduped |
| `public/designs/studio-01.jpg` … `studio-12.jpg` | Designs/1 (catalog studio shots) |
| `public/designs/lifestyle-01.jpg` … `lifestyle-06.jpg` | Designs/2 (lifestyle shots) |
| `public/designs/editorial-01.jpg` … `editorial-12.jpg` | Designs/3 (editorial shots) |
| `public/designs/founder-portrait.jpg` | Beulah's Pinterest profile picture (720x900) |

## Standing rules (enforced)

- No em dashes or en dashes anywhere on the site. Use commas, semicolons, colons, parentheses, or "and / to / plus".
- Mobile first.
- Every commerce intent flows through the two step CTA (`components/TwoStepCtaModal.tsx`).
- Pin prices are blank by default (`"priceFromNgn": null`) and display as **Price on request**. Set them in `content/pins.json` when ready.
