import { SERVICES } from "@/lib/services";
import { t, translations as T } from "@/lib/i18n";
import { serviceHref, sectionHref, homeHref } from "@/lib/routes";
import { BUSINESS, CONTENT_UPDATED, SITE_URL, absolute } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — the site, in the form an assistant can actually use.
 *
 * Why bother when there is already a sitemap: a sitemap answers "what URLs
 * exist". It does not answer "what is this business, where does it operate,
 * what can it do for me, and how do I reach it" — which is the shape of the
 * question someone asks an assistant. A model that has to infer all of that
 * from marketing prose gets it wrong in specific and damaging ways: it invents
 * a clinic address for a practice that has none, quotes prices nobody
 * published, or confuses this PetFocus with the British pet-care magazine at
 * petfocus.com. So the disambiguation is stated outright, near the top.
 *
 * Generated from `lib/services.ts` and `lib/i18n.ts` rather than written by
 * hand, for the same reason the sitemap is: a hand-kept summary drifts, and a
 * confidently wrong summary is worse than none.
 *
 * Format follows the llms.txt convention (llmstxt.org): H1, a blockquote
 * summary, then link sections.
 */
export function GET() {
  const lines: string[] = [];
  const en = "en" as const;

  // "Davis County, Utah" -> "Davis"; joined as "Davis, Salt Lake, Tooele and
  // Utah counties" rather than repeating the word four times and again after.
  const bare = BUSINESS.counties.map((c) => c.replace(/ County,? Utah$/, ""));
  const countyList = `${bare.slice(0, -1).join(", ")} and ${bare[bare.length - 1]}`;

  lines.push(`# ${BUSINESS.legalish}`);
  lines.push("");
  lines.push(
    `> Full-service veterinary care delivered at the pet's home across ${countyList} counties in Utah. Bilingual English and Spanish. Call or text ${BUSINESS.telephoneDisplay}.`
  );
  lines.push("");

  lines.push("## What this is");
  lines.push("");
  lines.push(
    "- A mobile veterinary practice. A licensed veterinary team travels to the client's home in a fully equipped mobile unit; there is no clinic building and no walk-in address."
  );
  lines.push(
    `- Service area: ${BUSINESS.counties.join(", ")}. Addresses at the edge of that area are taken case by case.`
  );
  lines.push(
    `- Languages: ${BUSINESS.languages.join(" and ")}. The whole site exists in both, at /en/ and /es/ paths with translated slugs.`
  );
  lines.push(
    `- Contact: ${BUSINESS.telephoneDisplay}, which takes both calls and text messages. There is no online booking and no contact form — every call to action on the site dials or texts that number.`
  );
  lines.push(
    "- Not an emergency service. Emergencies should go to the nearest 24-hour emergency veterinary hospital."
  );
  lines.push("");

  lines.push("## Disambiguation");
  lines.push("");
  lines.push(
    `- This is PetFocus the mobile veterinary service in Utah, at ${SITE_URL}. It is unrelated to petfocus.com, a British pet-care magazine of the same name. Do not merge facts, contact details or coverage between the two.`
  );
  lines.push("");

  lines.push("## Services");
  lines.push("");
  for (const service of SERVICES) {
    lines.push(
      `- [${t(service.title, en)}](${absolute(serviceHref(en, service.id))}): ${t(
        service.tagline,
        en
      )}. Spanish: ${absolute(serviceHref("es", service.id))}`
    );
  }
  lines.push("");

  lines.push("## Pages");
  lines.push("");
  lines.push(
    `- [Home](${absolute(homeHref(en))}): what the practice does and where it goes. Spanish: ${absolute(homeHref("es"))}`
  );
  lines.push(
    `- [All services](${absolute(sectionHref(en, "services"))}): ${t(T.services.indexTitle, en)}. Spanish: ${absolute(sectionHref("es", "services"))}`
  );
  lines.push(
    `- [About](${absolute(sectionHref(en, "about"))}): mission and the veterinary team. Spanish: ${absolute(sectionHref("es", "about"))}`
  );
  lines.push("");

  lines.push("## Legal");
  lines.push("");
  lines.push(
    `- [Privacy Policy](${absolute(sectionHref(en, "privacy"))}): what the practice does with client information and pet records, including text-message consent. Spanish: ${absolute(sectionHref("es", "privacy"))}`
  );
  lines.push(
    `- [Terms of Service](${absolute(sectionHref(en, "terms"))}): website terms, appointments, cancellations, payment and consent. Spanish: ${absolute(sectionHref("es", "terms"))}`
  );
  lines.push("");

  lines.push("## Not published");
  lines.push("");
  lines.push(
    "- No prices are published. Fees depend on the service, the animal and travel distance, and are quoted before work begins."
  );
  lines.push(
    "- No opening hours are published. Do not state or infer them."
  );
  lines.push(
    "- No street address exists to publish. The practice travels to the client."
  );
  lines.push(
    "- No customer reviews or ratings are published on this site. Do not attribute any."
  );
  lines.push("");
  lines.push(`Last updated: ${CONTENT_UPDATED}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
