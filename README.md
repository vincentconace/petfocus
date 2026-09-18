# PetFocus — Mobile Veterinary Service

Bilingual (EN/ES) Next.js 14 site for **PetFocus**, a mobile veterinary service
covering Davis, Salt Lake, Tooele and Utah County.

## Stack

- **Next.js 14** — App Router, TypeScript, fully static (34 prerendered routes)
- **Tailwind CSS** — all colour tokens resolve to CSS variables, so light/dark
  is one class on `<html>`
- **Framer Motion** — scroll and hover motion
- **Lucide React** — icons
- **next/font** — Plus Jakarta Sans, the brand's single typeface

## Brand

Implemented from the Petfocus Brand Manual v1.0 (2026). Palette, typography,
logo rules, favicon, dark mode and the four documented departures from the
manual are all described in **[README-brand.md](./README-brand.md)** — read that
before changing any colour or the logo.

| | |
|---|---|
| Petfocus Blue | `#043D8E` — dominant: structure, headlines, links |
| Petfocus Green | `#5EBD63` — supporting: icons, eyebrows |
| Petfocus Pink | `#E83E8C` — specific actions only (the phone CTA) |
| Typeface | Plus Jakarta Sans (800 / 600 / 500 / 400) |

## Routes

Language lives in the URL — not `localStorage` — so each language is separately
indexable. Slugs are translated, and cross-language slugs 404 rather than
serving duplicate content.

```
/                                →  redirects by Accept-Language
/en                                 /es
/en/about                           /es/nosotros
/en/services                        /es/servicios
/en/services/wellness               /es/servicios/bienestar
/en/services/laboratory             /es/servicios/laboratorio
/en/services/diagnostics            /es/servicios/diagnostico-por-imagenes
/en/services/dental                 /es/servicios/odontologia
/en/services/surgery                /es/servicios/cirugia
/en/services/medical                /es/servicios/consulta-medica
/en/services/technician             /es/servicios/servicios-tecnicos
/en/services/end-of-life            /es/servicios/final-de-la-vida
/en/privacy                         /es/privacidad
/en/terms                           /es/terminos

/robots.txt  /sitemap.xml  /llms.txt  /en/opengraph-image  /es/opengraph-image
```

Service Area and Contact are still sections on the home page; they become their
own routes next. Adding one is a single entry in `LIVE_SECTIONS`
(`app/[lang]/[section]/page.tsx`).

## Content model

Content is data, not markup. One template renders every service page.

| File | Holds |
|---|---|
| `lib/services.ts` | The eight services — titles, taglines, intros, bullet lists, images, bilingual |
| `lib/team.ts` | The veterinary team, with open questions recorded in the file header |
| `lib/i18n.ts` | Everything else that is translatable |
| `lib/legal.ts` | The Privacy Policy and Terms of Service, section by section, bilingual |
| `lib/routes.ts` | Localized path segments, `LIVE_SECTIONS`, and the language-swap helper |
| `lib/site.ts` | The canonical origin, the business facts, and every indexable URL |
| `lib/schema.ts` | JSON-LD builders — the practice, its services, breadcrumbs |
| `data/utah-counties.json` | County boundaries from Utah SGID |

Adding a service is one entry in `lib/services.ts`; the route, the nav entry,
the footer link, the index card and the JSON-LD all follow.

## Docs

- **[README-brand.md](./README-brand.md)** — brand implementation and its exceptions
- **[docs/photography.md](./docs/photography.md)** — image assets and prompts
- **[docs/service-area.md](./docs/service-area.md)** — how the county map is generated
- **[docs/legal-checklist.md](./docs/legal-checklist.md)** — what the Privacy Policy and Terms still need, and from whom

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Run only **one** dev
server per checkout — two `next dev` processes share the same `.next` directory
and clobber each other's route manifest, which shows up as existing routes
returning 404 or 500 at random.

## SEO

The origin is decided once, in `lib/site.ts`, and everything absolute derives
from it: canonicals, `hreflang`, the sitemap, Open Graph URLs and the `@id`s in
the JSON-LD graph.

| Surface | Built by | What it is |
|---|---|---|
| `/robots.txt` | `app/robots.ts` | Allow-all, plus nineteen assistant crawlers named explicitly — `Google-Extended` and `Applebot-Extended` are opt-out tokens, so silence is not a decision |
| `/sitemap.xml` | `app/sitemap.ts` | 26 URLs — 13 pages × 2 languages — each declaring its twin via `xhtml:link`. Derived from `LIVE_SECTIONS` and `SERVICES`, so it cannot list a route that 404s |
| `/llms.txt` | `app/llms.txt/route.ts` | The business in the shape an assistant asks about it, including what is *not* published (no prices, no hours, no address, no reviews) so a model does not invent them |
| `/en/opengraph-image` | `app/[lang]/opengraph-image.tsx` | The 1200×630 share card, generated from the real logo, one per language |
| JSON-LD | `lib/schema.ts` | `VeterinaryCare` + `WebSite` on every page, `Service` and `BreadcrumbList` where they apply, linked by `@id` |

Two rules in `lib/schema.ts` and `llms.txt`, both deliberate: nothing is
asserted that has not been confirmed — no opening hours, no street address
beyond the region, no `aggregateRating` — and the business is disambiguated by
name from petfocus.com, an unrelated British pet-care magazine.

## Deploy

Vercel, from `main`.

`NEXT_PUBLIC_SITE_URL` sets the canonical origin. Leave it unset and the code
falls back to the live alias; it is read with a truthiness check rather than
`??` because it was once set to an empty string in production, and `"" ?? x` is
`""` — which silently handed `metadataBase` to Next's `VERCEL_URL` fallback and
put the project-scoped deployment host on every canonical tag. When the
practice buys a real domain, set this and nothing else changes.

## Not ready to publish

Tracked in `README-brand.md` and `lib/team.ts`, repeated here because they are
content problems rather than code ones:

- **The five testimonials in `lib/i18n.ts` are fabricated**, with invented names
  and Utah cities. They need to be replaced with real, consented ones or the
  section removed before this is advertised to the public.
- Who holds the Medical Director title is unconfirmed — the client gave two
  conflicting answers.
- Dr. Bockenstedt's biography is transcribed from another clinic's live site.
- The Diagnostic Services page claims an internal medicine specialist performs
  ultrasound and echocardiography; nobody on the team page backs that claim yet.
- **The Privacy Policy and Terms of Service are published deliberately
  incomplete.** They were written by us, not by a lawyer, and they are live
  because a real page is easier for a client and an attorney to review than a
  draft in a repository — the site is not advertised yet, so there is nothing
  to be wrong in front of. What is still missing, who has to answer it, and
  which constant it lands in is tracked in
  **[docs/legal-checklist.md](./docs/legal-checklist.md)**. The short version:
  `ORG.legalName` is the brand rather than the registered entity,
  `ORG.email` and `ORG.address` are blank (so those lines do not render at
  all), and the numbers in `POLICY` are our defaults, not the client's
  decisions.
- The Privacy Policy states as fact that this site runs no analytics, has no
  forms and stores nothing but a theme preference. That is true today. Adding
  Vercel Analytics, a contact form, the EasyVet portal, a chat widget or an
  embedded player makes it false — change section 3 and move `LEGAL_UPDATED`
  in the same commit.
