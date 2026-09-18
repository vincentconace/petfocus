import type { MetadataRoute } from "next";
import { LANGS } from "@/lib/routes";
import { INDEXABLE_PAGES, absolute, languageAlternates } from "@/lib/site";

/**
 * Every page, in both languages, each declaring its twin.
 *
 * The two languages are separate URLs with translated slugs — that was the
 * point of putting the language in the path — so each one is submitted in its
 * own right and carries `alternates.languages`, which Next renders as
 * `xhtml:link rel="alternate" hreflang="…"`. Without those, Google sees
 * /en/services and /es/servicios as two unrelated pages and has to guess which
 * to show a Spanish-speaking searcher in Salt Lake. Guessing is what we are
 * trying to avoid.
 *
 * Built from `INDEXABLE_PAGES`, which is built from the same `LIVE_SECTIONS`
 * and `SERVICES` the router uses, so this cannot list a URL that 404s.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PAGES.flatMap((page) =>
    LANGS.map((lang) => ({
      url: absolute(page.href[lang]),
      lastModified: new Date(page.lastModified),
      changeFrequency: page.changeFrequency,
      // Spanish is not a translation afterthought here — half the audience
      // searches in it — but English is the default the middleware sends an
      // unknown visitor to, so it carries a hair more weight.
      priority: lang === "en" ? page.priority : Math.max(page.priority - 0.1, 0.1),
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(page.href)).map(([k, v]) => [
            k,
            absolute(v),
          ])
        ),
      },
    }))
  );
}
