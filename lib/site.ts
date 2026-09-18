import type { Lang } from "./i18n";
import {
  LANGS,
  LIVE_SECTIONS,
  homeHref,
  sectionHref,
  serviceHref,
  type SectionKey,
} from "./routes";
import { SERVICES } from "./services";

/**
 * The canonical origin, decided in exactly one place.
 *
 * ── Why this file exists ─────────────────────────────────────────────────
 * The fallback used to be `https://petfocus.com`. That domain is live and
 * belongs to a British pet-care magazine — a different company entirely. So
 * every build without NEXT_PUBLIC_SITE_URL set was publishing canonical and
 * hreflang tags pointing search engines at somebody else's website, which is
 * the one SEO mistake that removes a site from the index rather than merely
 * ranking it badly.
 *
 * Production was also emitting canonicals for the project-scoped deployment
 * host (`petfocus-vincent-conaces-projects.vercel.app`) rather than the stable
 * alias, which splits the same pages across two hostnames.
 *
 * The fallback is now the live alias. When the practice buys a real domain,
 * set NEXT_PUBLIC_SITE_URL to it and every canonical, hreflang, sitemap entry,
 * Open Graph URL and JSON-LD id follows.
 * ─────────────────────────────────────────────────────────────────────────
 */
const CONFIGURED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/**
 * Note the truthiness check rather than `??`.
 *
 * NEXT_PUBLIC_SITE_URL was set in Vercel production to an empty string, and
 * `"" ?? fallback` is `""` — nullish coalescing does not treat empty as
 * missing. That is what actually broke production: `metadataBase` resolved to
 * nothing, Next fell back to VERCEL_URL, and every canonical on the live site
 * pointed at the project-scoped deployment host instead of the alias. An empty
 * string is a missing value, so it is treated as one here.
 */
export const SITE_URL = (
  CONFIGURED_ORIGIN && CONFIGURED_ORIGIN.length > 0
    ? CONFIGURED_ORIGIN
    : "https://petfocus.vercel.app"
).replace(/\/+$/, "");

/** Absolute URL for a site-relative path. Crawlers want absolute, always. */
export function absolute(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * The practice, as facts rather than prose. Feeds JSON-LD and llms.txt, so a
 * search engine and a language model are told the same thing the visitor is.
 *
 * Nothing here is aspirational. There is no address, no opening hours and no
 * aggregateRating because none of those have been confirmed — and inventing
 * structured data is how a business earns a manual action.
 */
export const BUSINESS = {
  name: "PetFocus",
  legalish: "PetFocus Mobile Veterinary Service",
  telephone: "+1-385-381-9161",
  telephoneDisplay: "385-381-9161",
  priceRange: "$$",
  languages: ["English", "Spanish"],
  counties: [
    "Davis County, Utah",
    "Salt Lake County, Utah",
    "Tooele County, Utah",
    "Utah County, Utah",
  ],
  region: { en: "Northern Utah", es: "Norte de Utah" },
} as const;

/** Last time the site's content meaningfully changed. Keeps the sitemap from
 *  claiming every page was rewritten on every deploy, which crawlers learn to
 *  ignore. Bump it when copy changes, not when a class name does. */
export const CONTENT_UPDATED = "2026-09-18";

export type IndexablePage = {
  /** Stable identifier, for llms.txt grouping. */
  kind: "home" | "section" | "service";
  /** The localized path in each language. */
  href: Record<Lang, string>;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  lastModified: string;
};

/**
 * Every indexable URL on the site, derived from the same data the router uses.
 *
 * Built from `LIVE_SECTIONS` and `SERVICES` rather than written out, so adding
 * a service or turning on a section puts it in the sitemap and in llms.txt
 * without anyone remembering to.
 */
export const INDEXABLE_PAGES: IndexablePage[] = [
  {
    kind: "home",
    href: { en: homeHref("en"), es: homeHref("es") },
    priority: 1,
    changeFrequency: "monthly",
    lastModified: CONTENT_UPDATED,
  },
  ...LIVE_SECTIONS.map((key: SectionKey): IndexablePage => {
    const legal = key === "privacy" || key === "terms";
    return {
      kind: "section",
      href: { en: sectionHref("en", key), es: sectionHref("es", key) },
      priority: legal ? 0.3 : key === "services" ? 0.9 : 0.7,
      changeFrequency: legal ? "yearly" : "monthly",
      lastModified: CONTENT_UPDATED,
    };
  }),
  ...SERVICES.map((service): IndexablePage => ({
    kind: "service",
    href: {
      en: serviceHref("en", service.id),
      es: serviceHref("es", service.id),
    },
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: CONTENT_UPDATED,
  })),
];

/**
 * hreflang map for a page that exists in both languages.
 *
 * `x-default` points at English: the middleware sends a visitor with no
 * Spanish preference there, so it is the honest answer to "what do you serve
 * someone whose language you do not know".
 */
export function languageAlternates(href: Record<Lang, string>) {
  const languages: Record<string, string> = {};
  for (const lang of LANGS) languages[lang] = href[lang];
  languages["x-default"] = href.en;
  return languages;
}

/**
 * The share card for a language.
 *
 * Next's `opengraph-image` file convention attaches the image automatically —
 * but only to segments that do not declare their own `openGraph` object. Every
 * inner page here declares one (for its own title and url), which silently
 * dropped the image from all 24 of them: the home pages previewed with a card
 * and every service page previewed with a grey box. Passing this explicitly is
 * the fix, and keeping it in one function is what stops it regressing the next
 * time someone adds a page.
 */
export function ogImages(lang: Lang) {
  return [
    {
      url: `/${lang}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: "PetFocus — Mobile Veterinary Service, Northern Utah",
    },
  ];
}
