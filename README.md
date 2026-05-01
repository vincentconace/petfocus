# PetFocus — Mobile Veterinary Service Landing Page

Modern, fully-bilingual (EN/ES) Next.js 14 landing page for **PetFocus**, a mobile veterinary service serving Davis, Salt Lake, Tooele, and Utah County.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with a custom Catalis-inspired design system
- **Framer Motion** for cinematic scroll/hover animations
- **Lucide React** for icons
- **next/font** with Fraunces (display serif) + Inter (body)
- All hero illustrations and decorations are hand-built **inline SVG** — zero external image dependencies

## Brand identity

| Token | Value |
|---|---|
| Primary (Burgundy) | `#8B2332` |
| Secondary (Teal) | `#2A8388` |
| Accent (Gold) | `#C8A04A` |
| Forest Green | `#2D6E4E` |
| Cream | `#F8F2E4` |
| Display font | Fraunces (italic accents) |
| Body font | Inter |

## Sections

1. Sticky transparent navbar with EN/ES toggle (persisted in `localStorage`)
2. Hero with floating cards + cinematic SVG illustration
3. Brand Pillars — Care · Compassion · Convenience
4. Our Services — 4 detailed bilingual category cards (all 7 services from the flyer covered)
5. Features — 4-column experience pillars
6. Core Features — 3 expanded cards (Comfort, Additional, Mobile)
7. Pricing — 3 service packages with featured shimmer-border tier
8. Testimonials — auto-scrolling marquee, pause on hover
9. Blog — 3 article cards with custom SVG covers
10. Service Area — bilingual chips + decorative Utah map
11. Final CTA — dark glassy section with newsletter form
12. Footer — full sitemap, contact, social

## Run locally

```bash
cd petfocus
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deploy

One-click deploy on Vercel: drop the folder in [vercel.com/new](https://vercel.com/new).

## Bilingual system

All translatable copy lives in `lib/i18n.ts`. The `LanguageProvider` in `lib/language-context.tsx` exposes a `useLang()` hook with `lang`, `setLang`, and `toggle`. Language preference is auto-detected from `navigator.language` on first load and persisted to `localStorage` under the key `petfocus_lang`.
# petfocus
