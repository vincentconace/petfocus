/**
 * Social profiles, in one place so the footer and any future in-body block
 * cannot drift apart.
 *
 * The URLs the client sent were share links carrying tracking parameters:
 *
 *   instagram.com/petfocus26?stkn=…&utm_source=qr
 *   facebook.com/share/1EjLDU6GkA/?mibextid=wwXIfr
 *
 * `stkn` is a one-off share token, `utm_source=qr` attributes the visit to a
 * printed QR code, and `mibextid` is Facebook's own tracker — none of which
 * should be baked into a site's footer, where they would mislabel every
 * visitor. The Facebook one is also a redirect stub; it was resolved to the
 * page it points at (302 → facebook.com/Petfocus26, "PetFocus Mobile Vet").
 */
export type SocialProfile = {
  id: "instagram" | "facebook" | "google";
  label: string;
  href: string;
};

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/petfocus26",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/Petfocus26",
  },
  // Still pending from the client — the row simply skips entries with no URL.
  { id: "google", label: "Google Reviews", href: "" },
].filter((s) => s.href) as SocialProfile[];
