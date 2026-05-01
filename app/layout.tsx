import type { Metadata } from "next";
import { Fraunces, Inter, Anton } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Anton — bold condensed display font from the PetFocus logo.
// Available as `font-brand` in Tailwind; used for badges, eyebrow labels,
// and brand-voice accents.
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PetFocus — Mobile Veterinary Service | Davis · Salt Lake · Tooele · Utah County",
  description:
    "Compassionate, convenient, full-service veterinary care delivered to your home across Northern Utah. Bilingual service. Book a visit: 385-381-9161.",
  keywords: [
    "mobile vet Utah",
    "veterinaria móvil",
    "at-home veterinary care",
    "PetFocus",
    "vet near me",
    "Davis County vet",
    "Salt Lake mobile vet",
    "bilingual veterinarian",
  ],
  openGraph: {
    title: "PetFocus — Mobile Veterinary Service",
    description: "Bringing veterinary care home. Care · Compassion · Convenience.",
    type: "website",
    locale: "en_US",
    alternateLocale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PetFocus — Mobile Veterinary Service",
    description: "Bringing veterinary care home. Bilingual mobile vet across Northern Utah.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${anton.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
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
      <body className="font-sans antialiased">
        <LanguageProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
          >
            Skip to content
          </a>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
