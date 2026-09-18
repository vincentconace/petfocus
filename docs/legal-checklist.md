# Legal pages — what we still need from the client

The Privacy Policy and Terms of Service are **live in the codebase** and render at:

```
/en/privacy    /es/privacidad
/en/terms      /es/terminos
```

They were published in their current state on purpose. The site is not yet
advertised, and a real page is far easier for a client and an attorney to read
and mark up than a draft sitting in a repository. Nothing below blocks the
pages from existing; all of it closes them out.

Blank fields are **skipped, not rendered as placeholders** — a policy that
lists a mailing address nobody confirmed is worse than one that lists only the
phone number we know answers. So the pages are honest today and get more
complete as answers arrive.

---

## 1. Needed before the site is advertised

| # | What we need | Why it matters | Goes in | Until then |
|---|---|---|---|---|
| 1 | **The registered legal entity name** — exactly as it appears on the Utah business registration, e.g. "PetFocus Veterinary Services LLC", plus the DBA if the brand name differs | The Terms are a contract. "PetFocus" is a brand, and a brand cannot be a party to one | `ORG.legalName` in `lib/legal.ts` | The limitation-of-liability clause names the brand |
| 2 | **A working email address** | `hello@petfocus.com` has never been verified. A privacy policy needs a channel for records and privacy requests that is not only a phone number | `ORG.email` | Contact block shows the phone only |
| 3 | **A mailing address** — registered agent, office or PO box | Privacy requests and any legal notice have to be able to reach somewhere physical | `ORG.address` | Shows "Northern Utah" |
| 4 | **Business hours** | The Terms say the line is answered "during business hours" without ever saying what those are. That is vague in the one place it should be specific — it is what tells someone whether to call us or an emergency hospital | new entry in `lib/legal.ts` | Undefined |

## 2. Policy decisions only the client can make

These are drafted with defaults so the page reads as a finished document. Each
one is a business decision, not a legal one, and each is a single number in
`POLICY` (`lib/legal.ts`).

| # | Decision | Drafted as |
|---|---|---|
| 5 | Cancellation notice window | 24 hours |
| 6 | Cancellation / no-show fee — whether there is one, how much, and whether a euthanasia appointment is treated differently | No amount stated. The text says "a fee we will have told you about when you booked", which is honest but not an enforceable stated policy |
| 7 | Travel charge — flat, by distance, or by zone, and where the edge of the no-charge zone falls | Mentioned, never quantified |
| 8 | Deposits for surgery or euthanasia — taken or not, refundable or not | Not mentioned |
| 9 | Repeat no-shows — at what point the practice stops scheduling a client | "may mean we ask for prepayment, or stop scheduling" |
| 10 | Minimum age of the adult who must be present at a visit | 18 |

## 3. Quick factual answers

Short questions; each removes a vague phrase from a published document.

- **Payment processor** — the policy says card payments go to "our payment
  processor" without naming it. Naming the categories and identities of third
  parties is better practice and what most state privacy statutes expect.
- **Practice-management / records software** — same reason. The README notes
  EasyVet may be going live; if so, it belongs in the list of processors.
- **Outside laboratory** — which reference lab receives samples.
- **Does the practice text from the same number it calls from?** The SMS
  section assumes yes (385-381-9161).
- **Is a texting platform involved?** If messages go through a provider rather
  than a phone, the number needs A2P 10DLC registration — and the carrier will
  check for exactly the published SMS consent and opt-out language that now
  exists on the Privacy Policy. That was one reason to write it.
- **Aftercare / crematory partner** — the end-of-life section lists options
  generically. A named partner reads better and is a real question families ask.

## 4. For the attorney

The page is a normal read, but these five points are where a Utah attorney's
judgement actually changes something:

1. **The liability split.** The limitation clause is deliberately confined to
   the website and says in terms that it does not limit any right regarding the
   veterinary care itself. Confirm that split holds up in Utah and is worded
   the way they would word it.
2. **Governing law and venue.** Currently "the state or federal courts sitting
   in Utah". Confirm whether a specific county is wanted — and whether the
   practice wants an arbitration clause instead. We did not draft one: it is a
   business decision with real trade-offs, not a default.
3. **The bilingual clause.** The English version controls where the two
   conflict. Standard, but worth confirming given the practice markets in
   Spanish, to Spanish speakers, as a selling point.
4. **Records retention.** We wrote "at least as long as the Utah rules for a
   licensed veterinary practice require" rather than stating a number. If a
   number is wanted, DOPL rule R156-28 is where it comes from.
5. **The forms at the visit.** The Terms repeatedly reference the estimate,
   consent-to-treat and euthanasia authorization forms the client signs in
   person. Those forms should exist, and nothing in them should contradict this
   page. Worth putting them in front of the same attorney at the same time.

Provenance, so nobody has to guess: the documents were drafted against what
comparable US veterinary practices publish, against **Utah Code § 58-28-605**
(veterinarian-client confidentiality), and against A2P 10DLC/TCPA expectations
for a business that takes text messages. They have not been reviewed by a
lawyer.

## 5. What will make these pages wrong later

The Privacy Policy makes three factual claims about this website that are true
today and are the main thing that distinguishes it from boilerplate:

- no analytics and no advertising trackers
- no accounts, no forms, no online booking
- nothing stored in the browser but the light/dark preference

Every one of those becomes false the moment someone enables Vercel Analytics or
adds Google Analytics, adds a contact form or the EasyVet booking portal, or
drops in a chat widget, a Meta pixel or an embedded YouTube player. If any of
that ships, **section 3 of the Privacy Policy has to change and
`LEGAL_UPDATED` has to move with it.** Catch it in review, not afterwards.

## Where it all lives

| | |
|---|---|
| `lib/legal.ts` | `ORG` (the contact facts), `POLICY` (the numbers), `LEGAL_UPDATED` (the date), then both documents as bilingual data |
| `components/LegalBody.tsx` | The renderer — summary, table of contents, numbered sections with anchors |
| `app/[lang]/[section]/page.tsx` | Routing and metadata |

Filling in an answer is one edit in `ORG` or `POLICY`. Both languages and both
pages pick it up.
