import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { isLang, LANGS } from "@/lib/routes";
import { THEME_INIT_SCRIPT } from "@/components/ThemeToggle";
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
    // Set NEXT_PUBLIC_SITE_URL to the production domain once it exists.
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://petfocus.com"
    ),
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
      languages: { en: "/en", es: "/es" },
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
      locale: lang === "es" ? "es_US" : "en_US",
      alternateLocale: lang === "es" ? "en_US" : "es_US",
    },
    twitter: {
      card: "summary_large_image",
      title: META[lang].title as string,
      description: META[lang].description as string,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VeterinaryCare",
              name: "PetFocus",
              description: "Mobile Veterinary Service",
              telephone: "+1-385-381-9161",
              areaServed: [
                { "@type": "AdministrativeArea", name: "Davis County, Utah" },
                { "@type": "AdministrativeArea", name: "Salt Lake County, Utah" },
                { "@type": "AdministrativeArea", name: "Tooele County, Utah" },
                { "@type": "AdministrativeArea", name: "Utah County, Utah" },
              ],
              availableLanguage: ["English", "Spanish"],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-bg text-ink-primary">
        <LanguageProvider lang={lang}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-bg-surface focus:text-ink-primary focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-float-lg"
          >
            {lang === "es" ? "Ir al contenido" : "Skip to content"}
          </a>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
