import type { Localized } from "./services";

export type TeamMember = {
  id: string;
  /** Name exactly as the client wrote it. */
  name: string;
  /** The "(a.k.a. Dr. B)" line on the reference site. */
  alias?: string;
  /** Post-nominals — DVM, CVT, etc. Not localized. */
  credential?: string;
  /** Job title. Localized because "Medical Director" has a Spanish form. */
  role?: Localized;
  photo: string;
  /** First paragraph, always visible. */
  bio?: Localized;
  /** Revealed by "Read more", following the reference site's expander. */
  bioMore?: Localized;
};

/**
 * The veterinary team.
 *
 * ── Open questions, do not publish before these are answered ──────────────
 *
 * 1. WHO IS MEDICAL DIRECTOR? The client's typed list reads
 *      "Dr. Nelson / DVM / Medical director"
 *    but the message immediately after says the medical director is Kat
 *    Hanley. Both cannot be right. Hanley carries the title below because
 *    that was the explicit sentence, but this is a credential on a real
 *    clinician — confirm before this goes live, and move the `role` line if
 *    it belongs to Nelson.
 *
 * 2. Dr. Nelson's first name is missing.
 *
 * 3. "Carl" vs "Carlos" — the client wrote both. "Carl" is used here because
 *    that is what the fphmapleton.com screenshot shows.
 *
 * 4. Bios for Nelson and Hanley were never sent.
 *
 * 5. Dr. Bockenstedt's bio below is transcribed from fphmapleton.com, another
 *    clinic's live site. It is his biography, but it is their copy — get his
 *    own version, or his written OK to reuse it.
 *
 * 6. The Diagnostic Services page states that ultrasound and echocardiography
 *    are "performed by an internal medicine specialist", and the meeting notes
 *    named a Dr. Gavin for that. No Dr. Gavin appears in this list. Either a
 *    fourth person is missing, or that claim has nobody behind it.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const TEAM: TeamMember[] = [
  {
    id: "bockenstedt",
    name: "Dr. Carl Bockenstedt",
    alias: "a.k.a. Dr. B",
    credential: "DVM",
    photo: "/team/bockenstedt.jpg",
    bio: {
      en: "Dr. Carl Bockenstedt grew up on a family farm in Iowa as the tenth of thirteen children, where his love for animals began at an early age.",
      es: "El Dr. Carl Bockenstedt creció en una granja familiar en Iowa, el décimo de trece hermanos, donde su amor por los animales comenzó desde muy temprano.",
    },
    bioMore: {
      en: "He earned his Doctor of Veterinary Medicine degree in 1989 and went on to work in two veterinary practices before purchasing his own clinic in 1997, which he owned and operated for 23 years.",
      es: "Obtuvo su título de Doctor en Medicina Veterinaria en 1989 y trabajó en dos clínicas veterinarias antes de comprar la suya propia en 1997, que dirigió durante 23 años.",
    },
  },
  {
    id: "nelson",
    name: "Dr. Nelson",
    credential: "DVM",
    photo: "/team/nelson.jpg",
  },
  {
    id: "hanley",
    name: "Dr. Kat Hanley",
    credential: "DVM",
    // ⚠ See open question 1 above before publishing.
    role: { en: "Medical Director", es: "Directora Médica" },
    photo: "/team/hanley.jpg",
  },
];
