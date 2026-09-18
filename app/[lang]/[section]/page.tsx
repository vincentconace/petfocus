import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";
import FeaturedServiceCard from "@/components/FeaturedServiceCard";
import TeamGrid from "@/components/TeamGrid";
import Badge from "@/components/ui/Badge";
import FinalCTA from "@/components/sections/FinalCTA";
import { translations as T, t, type Lang } from "@/lib/i18n";
import { GRID_SERVICES, SET_APART_SERVICES } from "@/lib/services";
import {
  SECTIONS,
  isLang,
  sectionKeyBySlug,
  sectionHref,
  type SectionKey,
} from "@/lib/routes";

export const dynamicParams = false;

/** Service Area and Contact are still home-page anchors; they land here next. */
const LIVE_SECTIONS: SectionKey[] = ["services", "about"];

export function generateStaticParams({ params }: { params: { lang: Lang } }) {
  return LIVE_SECTIONS.map((key) => ({ section: SECTIONS[key][params.lang] }));
}

export function generateMetadata({
  params,
}: {
  params: { lang: string; section: string };
}): Metadata {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const key = sectionKeyBySlug(params.section, lang);
  if (!key) return {};

  const copy =
    key === "about"
      ? { title: t(T.about.title, lang), desc: t(T.about.mission, lang) }
      : {
          title: t(T.services.indexTitle, lang),
          desc: t(T.services.indexIntro, lang),
        };

  return {
    title: `${copy.title} — PetFocus`,
    description: copy.desc.slice(0, 155),
    alternates: {
      canonical: sectionHref(lang, key),
      languages: {
        en: sectionHref("en", key),
        es: sectionHref("es", key),
      },
    },
  };
}

export default function SectionPage({
  params,
}: {
  params: { lang: string; section: string };
}) {
  if (!isLang(params.lang)) notFound();
  const lang: Lang = params.lang;

  const key = sectionKeyBySlug(params.section, lang);
  if (!key || !LIVE_SECTIONS.includes(key)) notFound();

  return (
    <>
      <Navbar />
      <main id="main">
        {key === "about" ? (
          <AboutPage lang={lang} />
        ) : (
          <ServicesIndex lang={lang} />
        )}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

function AboutPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHeader
        title={t(T.about.title, lang)}
        tagline={t(T.about.tagline, lang)}
        crumbs={[{ label: t(T.nav.about, lang) }]}
      />

      {/* Mission first — the order the client asked for: vision and mission,
          then the basics, then the detail. */}
      <section id="mission" className="px-3 sm:px-5 lg:px-8 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          <Badge>{t(T.about.missionLabel, lang)}</Badge>
          <p className="mt-7 text-xl sm:text-2xl leading-relaxed text-ink-primary">
            {t(T.about.mission, lang)}
          </p>
        </div>
      </section>

      <section id="team" className="px-3 sm:px-5 lg:px-8 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
            <Badge>{t(T.about.teamLabel, lang)}</Badge>
            <h2 className="display-2 mt-5">{t(T.about.teamTitle, lang)}</h2>
            <p className="mt-4 text-lg text-ink-secondary">
              {t(T.about.teamIntro, lang)}
            </p>
          </div>
          <TeamGrid />
        </div>
      </section>
    </>
  );
}

function ServicesIndex({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHeader
        title={t(T.services.indexTitle, lang)}
        crumbs={[{ label: t(T.nav.services, lang) }]}
      />

      <section className="px-3 sm:px-5 lg:px-8 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="max-w-3xl text-lg text-ink-secondary leading-relaxed">
            {t(T.services.indexIntro, lang)}
          </p>

          {/* End-of-life care is shown on its own above the grid, per the
              client's request that it not sit beside nail trims. */}
          {SET_APART_SERVICES.map((service) => (
            <div key={service.id} className="mt-12">
              <FeaturedServiceCard service={service} />
            </div>
          ))}

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GRID_SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
