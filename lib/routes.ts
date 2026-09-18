import type { Lang } from "./i18n";
import { SERVICES } from "./services";

export const LANGS: Lang[] = ["en", "es"];
export const DEFAULT_LANG: Lang = "en";

export function isLang(value: string): value is Lang {
  return (LANGS as string[]).includes(value);
}

/**
 * Localized path segments.
 *
 * Slugs are translated rather than shared, because the per-service pages exist
 * largely to be found in search — and half this audience searches in Spanish.
 * Changing a slug later costs rankings, so it is done up front.
 */
export const SECTIONS = {
  services: { en: "services", es: "servicios" },
  about: { en: "about", es: "nosotros" },
  area: { en: "service-area", es: "cobertura" },
  contact: { en: "contact", es: "contacto" },
  // Unaccented Spanish slug on purpose: /es/terminos survives being copied,
  // pasted and typed by hand in a way /es/términos does not.
  privacy: { en: "privacy", es: "privacidad" },
  terms: { en: "terms", es: "terminos" },
} as const;

export type SectionKey = keyof typeof SECTIONS;

export function sectionKeyBySlug(
  slug: string,
  lang: Lang
): SectionKey | undefined {
  return (Object.keys(SECTIONS) as SectionKey[]).find(
    (k) => SECTIONS[k][lang] === slug
  );
}

/** `/en`, `/es` */
export function homeHref(lang: Lang) {
  return `/${lang}`;
}

/** `/en/services`, `/es/servicios` */
export function sectionHref(lang: Lang, key: SectionKey) {
  return `/${lang}/${SECTIONS[key][lang]}`;
}

/** `/en/services/dental`, `/es/servicios/odontologia` */
export function serviceHref(lang: Lang, serviceId: string) {
  const service = SERVICES.find((s) => s.id === serviceId);
  if (!service) return sectionHref(lang, "services");
  return `${sectionHref(lang, "services")}/${service.slug[lang]}`;
}

/**
 * Same page, other language. Used by the EN/ES toggle, which is now real
 * navigation rather than a localStorage flag — otherwise Google would only
 * ever index one version of every service page.
 *
 * Falls back to the target-language home if the path can't be mapped.
 */
export function swapLang(pathname: string, to: Lang): string {
  const parts = pathname.split("/").filter(Boolean);
  const [current, sectionSlug, detailSlug] = parts;

  if (!current || !isLang(current)) return homeHref(to);
  const from = current;

  if (!sectionSlug) return homeHref(to);

  const key = sectionKeyBySlug(sectionSlug, from);
  if (!key) return homeHref(to);

  if (!detailSlug) return sectionHref(to, key);

  if (key === "services") {
    const service = SERVICES.find((s) => s.slug[from] === detailSlug);
    if (service) return serviceHref(to, service.id);
  }

  return sectionHref(to, key);
}

/**
 * The sections that actually have a page today.
 *
 * Lives here rather than in the route file because the sitemap has to agree
 * with the router: a sitemap that lists a URL the router 404s is worse than no
 * sitemap at all, and that drift is invisible until a crawler finds it.
 * Service Area and Contact are still home-page anchors.
 */
export const LIVE_SECTIONS: SectionKey[] = [
  "services",
  "about",
  "privacy",
  "terms",
];
