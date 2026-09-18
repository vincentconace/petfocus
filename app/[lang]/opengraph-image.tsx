import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { isLang, LANGS } from "@/lib/routes";
import { BUSINESS } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PetFocus — Mobile Veterinary Service, Northern Utah";

/**
 * The share card, one per language.
 *
 * Every link to this site — a text message to a client, a Facebook post, a
 * Slack paste, a Google rich result — was previewing as a grey box, because
 * `twitter:card` was set to `summary_large_image` and no image was ever
 * supplied. For a business whose entire acquisition path is "someone sends a
 * neighbour the link", that blank rectangle is the first impression.
 *
 * Generated at build time from the real logo file rather than a hand-exported
 * PNG, so it cannot fall out of date with the brand, and rendered in both
 * languages because the Spanish pages are indexed separately.
 *
 * Kept to flat colour and flex layout on purpose: this renders through satori,
 * which supports a deliberate subset of CSS. The brand wash is a linear
 * gradient here rather than the four radial gradients `.brand-wash` uses.
 */
const logoSrc = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "public/brand/logo-horizontal.png"))
  .toString("base64")}`;

const COPY = {
  en: {
    headline: "Bringing veterinary care home.",
    sub: "Full-service care at your door across Davis, Salt Lake, Tooele and Utah County.",
    cta: "Call or text",
  },
  es: {
    headline: "Llevamos el cuidado veterinario a su hogar.",
    sub: "Atención integral en su puerta en Davis, Salt Lake, Tooele y Utah County.",
    cta: "Llame o escriba",
  },
} as const;

export default function OpengraphImage({
  params,
}: {
  params: { lang: string };
}) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const copy = COPY[lang];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#FFFFFF",
          backgroundImage:
            "linear-gradient(135deg, #EEF3FB 0%, #FFFFFF 45%, #EDF7EE 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" height={72} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "#043D8E",
              maxWidth: 940,
            }}
          >
            {copy.headline}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#42506B",
              maxWidth: 900,
            }}
          >
            {copy.sub}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#C9296F",
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 700,
              padding: "16px 34px",
              borderRadius: 999,
            }}
          >
            {copy.cta} · {BUSINESS.telephoneDisplay}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5EBD63", fontWeight: 600 }}>
            {lang === "es" ? "Servicio bilingüe" : "Bilingual service"}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

/**
 * Without this the card is generated per request, because `[lang]` is a
 * dynamic segment and the layout's params do not reach a route-level special
 * file. Two languages, two PNGs, built once.
 */
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}
