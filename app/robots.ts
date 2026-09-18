import type { MetadataRoute } from "next";
import { SITE_URL, absolute } from "@/lib/site";

/**
 * Assistant and answer-engine crawlers, named explicitly.
 *
 * `User-agent: *` already allows every one of these, so why list them? Two
 * reasons, both practical:
 *
 *   1. `Google-Extended` and `Applebot-Extended` are opt-OUT tokens. They do
 *      not fetch anything themselves; they control whether content already
 *      crawled may be used for AI answers and training. Silence means yes
 *      today, but silence is not a decision — an explicit Allow is, and it
 *      survives the next person who adds a blanket Disallow without thinking
 *      about what it takes out of AI answers with it.
 *   2. This practice is a local service business whose customers increasingly
 *      ask an assistant "mobile vet near me in Salt Lake" rather than typing
 *      it into a search box. Being absent from that answer is the modern
 *      version of being absent from the phone book.
 *
 * Bytespider and CCBot are deliberately included: bulk crawlers feed the
 * training sets that assistants answer local-business questions from.
 */
const ASSISTANT_CRAWLERS = [
  // OpenAI — training, live browsing, and the ChatGPT search index
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google and Apple AI-use tokens (opt-out by design; answered explicitly)
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  // Others that answer or index local queries
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "cohere-ai",
  "Bytespider",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing here is private; the only paths worth keeping out of an
        // index are Next's build artefacts, which carry no content and waste
        // crawl budget when a crawler follows them.
        disallow: ["/_next/static/chunks/", "/_next/image"],
      },
      ...ASSISTANT_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: absolute("/sitemap.xml"),
    host: SITE_URL,
  };
}
