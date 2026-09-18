/**
 * One place that knows how to put structured data on a page.
 *
 * Server component by design — this must be in the HTML a crawler receives,
 * not injected after hydration. Google renders JavaScript eventually, but
 * "eventually" is not a scheduling guarantee, and the assistant crawlers in
 * robots.ts mostly do not render at all.
 */
export default function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
