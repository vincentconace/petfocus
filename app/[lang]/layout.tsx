import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { isLang, LANGS } from "@/lib/routes";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, languageAlternates, ogImages } from "@/lib/site";
import { siteSchema } from "@/lib/schema";
import type { Lang } from "@/lib/i18n";

// §07 — Plus Jakarta Sans is the brand's single typeface. Its variable weight
// axis (200–800) covers headlines (800), subheads (600), labels (500) and
// body (400), so no second family is loaded.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const META: Record<Lang, Metadata> = {
  en: {
    title:
      "PetFocus — Mobile Veterinary Service | Davis · Salt Lake · Tooele · Utah County",
    description:
      "Compassionate, convenient, full-service veterinary care delivered to your home across Northern Utah. Bilingual service. Call or text: 385-381-9161.",
  },
  es: {
    title:
      "PetFocus — Veterinaria Móvil | Davis · Salt Lake · Tooele · Utah County",
    description:
      "Cuidado veterinario integral y compasivo en su hogar, en todo el norte de Utah. Atención bilingüe. Llame o escriba: 385-381-9161.",
  },
};

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  return {
    ...META[lang],
    // Canonical and hreflang URLs must be absolute for Google to honour them.
    // The origin is decided once, in lib/site.ts — see the note there about
    // the petfocus.com fallback this replaced, which belonged to a different
    // company and was being published as this site's canonical.
    metadataBase: new URL(SITE_URL),
    keywords: [
      "mobile vet Utah",
      "veterinaria móvil Utah",
      "at-home veterinary care",
      "veterinario a domicilio",
      "PetFocus",
      "Davis County vet",
      "Salt Lake mobile vet",
      "bilingual veterinarian",
    ],
    alternates: {
      canonical: `/${lang}`,
      // x-default included: the middleware sends a visitor with no Spanish
      // preference to /en, so that is the honest answer to "what do you serve
      // someone whose language you do not know". Without it Google picks one.
      languages: languageAlternates({ en: "/en", es: "/es" }),
    },
    // Explicit rather than implied. `max-image-preview: large` is what lets a
    // result carry a photograph instead of a thumbnail, which for a service
    // people choose emotionally is most of the click.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    // Generated from the official symbol (see scripts note in README-brand.md).
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
    openGraph: {
      title: META[lang].title as string,
      description: META[lang].description as string,
      type: "website",
      url: `/${lang}`,
      siteName: "PetFocus Mobile Veterinary Service",
      locale: lang === "es" ? "es_US" : "en_US",
      alternateLocale: lang === "es" ? "en_US" : "es_US",
      images: ogImages(lang),
    },
    twitter: {
      card: "summary_large_image",
      title: META[lang].title as string,
      description: META[lang].description as string,
      images: ogImages(lang),
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLang(params.lang)) notFound();
  const lang: Lang = params.lang;

  return (
    <html
      lang={lang}
      className={jakarta.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <JsonLd schema={siteSchema(lang)} />
      </head>
      <body className="font-sans antialiased bg-bg text-ink-primary">
        <ThemeProvider>
          <LanguageProvider lang={lang}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-bg-surface focus:text-ink-primary focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-float-lg"
          >
            {lang === "es" ? "Ir al contenido" : "Skip to content"}
          </a>
          {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
