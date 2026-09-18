# PetFocus — brand implementation

How the Brand Manual v1.0 (2026) is wired into this site, and the three places
where we deliberately departed from it.

Brand contact: charlypattelani@gmail.com

---

## Source of truth

| Concern | Where it lives |
|---|---|
| Colour, elevation, type scale | `app/globals.css` (`:root` and `.dark`) |
| Tailwind token names | `tailwind.config.ts` |
| Logo rules | `components/ui/Logo.tsx` |
| Button colour roles | `components/ui/Button.tsx` |
| Logo files | `public/brand/` |
| Favicon / app icons | `public/favicon.ico`, `public/icon*.png`, `public/apple-icon.png` |

No component holds a hex value. Every colour resolves through a CSS variable,
which is what makes dark mode a single class on `<html>`.

## Palette (§06)

| Token | Light | Dark | Role |
|---|---|---|---|
| `brand-primary` | `#043D8E` | `#7FB0FF` | Dominant. Headlines, links, structure, secondary buttons |
| `brand-support` | `#5EBD63` | `#6FD074` | Accompanies and organises. Icons, fills, eyebrows |
| `brand-support-text` | `#2A8033` | `#7ED683` | Same green, legible as text |
| `brand-accent` | `#E83E8C` | `#FF5FA2` | Specific actions only |
| `brand-accent-strong` | `#D12E7B` | `#D12E7B` | Pink that carries white text (same in both themes) |
| `bg` / `bg-subtle` / `bg-surface` | `#FFFFFF` / `#F4F6F8` / `#FFFFFF` | `#0B1017` / `#121A24` / `#141D28` | Surfaces |
| `ink-primary` / `ink-secondary` | `#0F1419` / `#5A6674` | `#F2F5F9` / `#A3B1C2` | Text |
| `line` | `#E4E9F0` | `#22303F` | Hairlines |

Proportion (White 60 · Blue 25 · Green 10 · Pink 5) is held by role, not by
counting pixels: blue carries structure, green carries supporting marks, and
pink appears only on the phone CTA — three small pills across a long page.

## Typography (§07)

Plus Jakarta Sans, loaded once via `next/font/google`, weights 400–800.
Fraunces, Inter and Anton are gone; so are all italics, which the manual never
uses and which this variable font would have to synthesise.

| Class | Spec |
|---|---|
| `.display-1/2/3` | 800 · −2% tracking |
| `.subhead` | 600 · 1.3 line-height |
| `.body-text` | 400 · 1.5 line-height |
| `.label-text`, `.pill-badge` | 500 · small caps · +16% tracking |

## Logo (§02–§05)

`<Logo variant="horizontal" width={…} />` — the horizontal lockup is what the
manual specifies for website headers. `variant="primary"` gives the vertical
version.

Enforced in the component:

- Minimum on-screen width: horizontal 160px, primary 100px. Smaller values are
  clamped, not honoured.
- Symbol and wordmark never separate, with two exceptions (see below):
  `variant="symbol"` is used for the favicon and for the mobile bar and drawer.
- Dark backgrounds get the official white export, not a CSS filter — §05
  forbids recolouring.
- No shadows or effects. The previous build had `shadow-pill` on the footer
  logo; that is removed.
- The hand-set "PetFocus / Mobile Veterinary Service" text that used to sit
  beside the mark is removed — the lockup already carries both.

### Files

| File | Source |
|---|---|
| `public/brand/logo-horizontal.png` | `logos-png/horizontal.png` |
| `public/brand/logo-horizontal-onblack.png` | `logos-png/on-black-2.png` |
| `public/brand/logo-primary.png` | `logos-png/logo-main.png` |
| `public/brand/logo-primary-onblack.png` | `logos-png/on black-1.png` |
| `public/brand/logo-mono-blue.png` | `logos-png/monocromatic-blue.png` |

All copied byte-for-byte. Nothing is recreated or traced.

### Favicon

`public/brand/symbol.png` is the cross + animals + orbit, cropped from the
official `logo-main.png` and trimmed to its alpha bounding box — no redraw.
From it: `favicon.ico` (16/32/48/64), `icon.png`, `icon-192.png`,
`icon-512.png`, and `apple-icon.png` (opaque white background, as iOS
composites transparent icons onto black).

> **Ask the designer for an icon-only export.** Cropping is defensible for a
> favicon, but an official symbol-only file is the correct long-term asset.

## Dark mode

`darkMode: "class"`. An inline script in `<head>` (`THEME_INIT_SCRIPT` in
`components/ThemeToggle.tsx`) applies the class before first paint, so there is
no white flash. Order of precedence: stored choice → OS preference. While the
visitor has made no explicit choice the site keeps following the OS live.

The toggle sits beside the language switch in the navbar and on its own row in
the mobile drawer.

**The manual does not define a dark theme** — §04 only specifies the white logo
on dark backgrounds. The dark scale above is ours: brand hues lifted until they
clear WCAG AA against the dark surfaces, hue left intact. Worth a review.

## Four departures from the manual

All four are reversible in one line.

1. **`--c-accent-strong` (`#D12E7B`).** Brand pink `#E83E8C` under white text is
   **3.8:1** — below the 4.5:1 AA threshold for a 16px button label. Filled
   buttons use the darkened pink; brand pink is unchanged everywhere else.
   Alternative, if the designer prefers exact brand pink: raise button labels to
   18.66px bold, which qualifies as large text.

2. **`--c-support-text` (`#2A8033`).** Brand green under white is **2.4:1**, and
   green *text* on white is the same. Green text uses the darkened value; fills,
   icons and the logo keep `#5EBD63`.

3. **No italics.** The manual's type spec has none, and Plus Jakarta Sans would
   have to synthesise an oblique. The old serif italic accents are now the
   `.brand-accent-text` gradient (blue → green, echoing the logo's own
   gradient).

4. **Isotype below 640px.** §02 says never separate the symbol from the text.
   The horizontal lockup has a 160px minimum (§03), which is 41% of a 390px
   phone — it crowded the phone CTA and the menu button, and forced the header
   pill wider than its design. Phones and the mobile drawer therefore show the
   symbol alone; tablet and desktop keep the full lockup. Requested by the
   client. To revert, swap `variant="symbol"` back to `variant="horizontal"` in
   `components/Navbar.tsx` (two places) and restore the wider mobile pill in
   `useNavGeometry`.

   The symbol file is pixel-identical between the light and dark official
   exports — only the wordmark changes colour — so `variant="symbol"` serves
   one asset to both themes.

## Still to confirm with the client

- Icon-only logo export — now needed for the favicon *and* the mobile header.
- Sign-off on the dark palette.
- Whether the darkened pink and green are acceptable, or whether they would
  rather change the type sizes.
- Photography now uses nine generated editorial scenes, including a full-bleed
  home hero. See `docs/photography.md` for assets, prompts, and the pending video.
  The current hero motion is a CSS camera drift over a still image.
