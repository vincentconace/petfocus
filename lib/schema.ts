import type { Lang } from "./i18n";
import { t, translations as T } from "./i18n";
import { SERVICES, type Service } from "./services";
import { homeHref, serviceHref, sectionHref } from "./routes";
import { SOCIAL_PROFILES } from "./social";
import { BUSINESS, SITE_URL, absolute } from "./site";

/**
 * JSON-LD, built from the same data the pages render.
 *
 * Two rules held throughout this file:
 *
 *   1. Nothing is asserted that is not true. No `openingHours`, because nobody
 *      has confirmed them. No `address` beyond the region, because there is no
 *      premises — this is a practice that drives to you, and a street address
 *      in structured data would put a pin on a map where no clinic stands. No
 *      `aggregateRating` or `review`, because the site publishes none; marking
 *      up ratings that do not exist is what earns a manual action.
 *   2. Everything is linked by `@id`, so a crawler reads one business with
 *      pages and services attached, rather than eight unrelated fragments that
 *      happen to share a name.
 */

const PRACTICE_ID = `${SITE_URL}/#practice`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const DESCRIPTION: Record<Lang, string> = {
  en: "Mobile veterinary service providing full-service, at-home care for pets across Davis, Salt Lake, Tooele and Utah counties in Northern Utah. Bilingual English and Spanish.",
  es: "Servicio veterinario móvil que brinda atención integral a domicilio para mascotas en los condados de Davis, Salt Lake, Tooele y Utah, en el norte de Utah. Atención bilingüe en inglés y español.",
};

/** The business and the website, emitted once from the root layout. */
export function siteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VeterinaryCare",
        "@id": PRACTICE_ID,
        name: BUSINESS.name,
        alternateName: BUSINESS.legalish,
        description: DESCRIPTION[lang],
        url: absolute(homeHref(lang)),
        logo: absolute("/brand/logo-primary.png"),
        image: absolute("/images/hero-home.webp"),
        telephone: BUSINESS.telephone,
        priceRange: BUSINESS.priceRange,
        currenciesAccepted: "USD",
        // Region only. There is no clinic to put on a map.
        address: {
          "@type": "PostalAddress",
          addressRegion: "UT",
          addressCountry: "US",
        },
        areaServed: BUSINESS.counties.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        availableLanguage: BUSINESS.languages,
        knowsLanguage: BUSINESS.languages,
        ...(SOCIAL_PROFILES.length > 0 && {
          sameAs: SOCIAL_PROFILES.map((p) => p.href),
        }),
        // What the practice does, in the shape an assistant can enumerate.
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t(T.services.indexTitle, lang),
          itemListElement: SERVICES.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${absolute(serviceHref(lang, service.id))}#service`,
              name: t(service.title, lang),
              url: absolute(serviceHref(lang, service.id)),
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: BUSINESS.legalish,
        description: DESCRIPTION[lang],
        inLanguage: ["en-US", "es-US"],
        publisher: { "@id": PRACTICE_ID },
      },
    ],
  };
}

/**
 * A service page: the service itself, plus the trail that got you there.
 *
 * `provider` points at the practice by id rather than repeating it, which is
 * how a crawler learns that eight service pages belong to one business.
 */
export function serviceSchema(service: Service, lang: Lang) {
  const url = absolute(serviceHref(lang, service.id));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: t(service.title, lang),
        description: t(service.intro, lang),
        url,
        image: absolute(service.image),
        serviceType: t(service.title, lang),
        provider: { "@id": PRACTICE_ID },
        areaServed: BUSINESS.counties.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        availableLanguage: BUSINESS.languages,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t(T.services.includes, lang),
          itemListElement: service.includes.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: t(item, lang) },
          })),
        },
      },
      breadcrumbNode(lang, [
        { name: t(T.nav.services, lang), path: sectionHref(lang, "services") },
        { name: t(service.title, lang), path: serviceHref(lang, service.id) },
      ]),
    ],
  };
}

/** Breadcrumbs for a section page. */
export function breadcrumbSchema(
  lang: Lang,
  trail: { name: string; path: string }[]
) {
  return { "@context": "https://schema.org", ...breadcrumbNode(lang, trail) };
}

function breadcrumbNode(
  lang: Lang,
  trail: { name: string; path: string }[]
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t(T.nav.home, lang),
        item: absolute(homeHref(lang)),
      },
      ...trail.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.name,
        item: absolute(crumb.path),
      })),
    ],
  };
}
