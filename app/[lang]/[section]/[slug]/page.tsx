import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ServiceBody from "@/components/ServiceBody";
import FinalCTA from "@/components/sections/FinalCTA";
import JsonLd from "@/components/JsonLd";
import { languageAlternates, ogImages } from "@/lib/site";
import { serviceSchema } from "@/lib/schema";
import { translations as T, t, type Lang } from "@/lib/i18n";
import { SERVICES, getServiceBySlug } from "@/lib/services";
import {
  SECTIONS,
  isLang,
  sectionKeyBySlug,
  sectionHref,
  serviceHref,
} from "@/lib/routes";

export const dynamicParams = false;

/**
 * `[lang]` is resolved by the layout's generateStaticParams and arrives here;
 * `[section]` is not (its generateStaticParams lives on a page, not a layout),
 * so this returns the section/slug pair for every service.
 */
export function generateStaticParams({ params }: { params: { lang: Lang } }) {
  const section = SECTIONS.services[params.lang];
  return SERVICES.map((s) => ({ section, slug: s.slug[params.lang] }));
}

export function generateMetadata({
  params,
}: {
  params: { lang: string; section: string; slug: string };
}): Metadata {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const service = getServiceBySlug(params.slug, lang);
  if (!service) return {};

  return {
    title: `${t(service.title, lang)} — PetFocus Mobile Veterinary Service`,
    description: t(service.intro, lang).slice(0, 155),
    alternates: {
      canonical: serviceHref(lang, service.id),
      languages: languageAlternates({
        en: serviceHref("en", service.id),
        es: serviceHref("es", service.id),
      }),
    },
    openGraph: {
      title: `${t(service.title, lang)} — PetFocus`,
      description: t(service.tagline, lang),
      type: "article",
      url: serviceHref(lang, service.id),
      siteName: "PetFocus Mobile Veterinary Service",
      locale: lang === "es" ? "es_US" : "en_US",
      images: ogImages(lang),
    },
    twitter: {
      card: "summary_large_image",
      title: `${t(service.title, lang)} — PetFocus`,
      description: t(service.tagline, lang),
      images: ogImages(lang),
    },
  };
}

export default function ServicePage({
  params,
}: {
  params: { lang: string; section: string; slug: string };
}) {
  if (!isLang(params.lang)) notFound();
  const lang: Lang = params.lang;

  if (sectionKeyBySlug(params.section, lang) !== "services") notFound();

  const service = getServiceBySlug(params.slug, lang);
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main id="main">
        <PageHeader
          title={t(service.title, lang)}
          tagline={t(service.tagline, lang)}
          crumbs={[
            { label: t(T.nav.services, lang), href: sectionHref(lang, "services") },
            { label: t(service.title, lang) },
          ]}
        />
        <ServiceBody service={service} />
        <FinalCTA />
      </main>
      <Footer />
      <JsonLd schema={serviceSchema(service, lang)} />
    </>
  );
}
