# PetFocus — Mobile Veterinary Service

Bilingual (EN/ES) Next.js 14 site for **PetFocus**, a mobile veterinary service
covering Davis, Salt Lake, Tooele and Utah County.

## Stack

- **Next.js 14** — App Router, TypeScript, fully static (29 prerendered pages)
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
| `lib/routes.ts` | Localized path segments and the language-swap helper |
| `data/utah-counties.json` | County boundaries from Utah SGID |

Adding a service is one entry in `lib/services.ts`; the route, the nav entry,
the footer link, the index card and the JSON-LD all follow.

## Docs

- **[README-brand.md](./README-brand.md)** — brand implementation and its exceptions
- **[docs/photography.md](./docs/photography.md)** — image assets and prompts
- **[docs/service-area.md](./docs/service-area.md)** — how the county map is generated

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Run only **one** dev
server per checkout — two `next dev` processes share the same `.next` directory
and clobber each other's route manifest, which shows up as existing routes
returning 404 or 500 at random.

## Deploy

Vercel, from `main`. Set `NEXT_PUBLIC_SITE_URL` to the production domain so
canonical and `hreflang` URLs are absolute.

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
- `hello@petfocus.com` is unverified. The legal pages therefore show only the
  phone number; set `ORG.email` and `ORG.address` in `lib/legal.ts` and the
  contact lines appear.
- **The Privacy Policy and Terms of Service were written by us and have not
  been reviewed by a lawyer.** They are modelled on what comparable US
  veterinary practices publish and on Utah Code § 58-28-605, and they describe
  what this site actually does. A Utah attorney should still read them, and
  `ORG.legalName` in `lib/legal.ts` needs the real registered entity rather
  than the brand name. Confirm the cancellation window in `POLICY` too.
