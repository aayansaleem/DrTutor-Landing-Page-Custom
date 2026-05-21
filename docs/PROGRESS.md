# Dr Tutor Website — Progress Log

Running record of meaningful changes to the marketing site (`drtutor.uk`). Newest entries on top.

---

## 2026-05-21 — Featured video, footer socials, GA4, favicon

### Added
- **`Meet Dr Tutor` featured video section** (`src/components/sections/FeaturedVideoSection.tsx`) directly under the hero on the homepage.
  - Cinematic 16:9 frame with a slow-rotating conic gradient border (teal → gold → teal, ~14s loop) implemented via CSS `@property --video-angle`.
  - Glass-morphic play button with two pulsing ripple rings and a diagonal shine sweep on hover.
  - Subtle 3° parallax tilt driven by `motion`'s `useMotionValue` + `useSpring` for smooth physics.
  - Soft teal radial halo backdrop + dot-grid texture along the top edge of the section.
  - Click → accessible lightbox modal:
    - Charcoal `rgba(17, 18, 22, 0.94)` backdrop with 20px blur (neutral, no blue cast).
    - Closes on **X button** (inside, top-right), **Esc key**, or **click-outside backdrop**.
    - Body scroll lock while open; focus moves to close button, returns to play button on close.
    - `role="dialog"` + `aria-modal` for screen readers.
    - YouTube embed: `Ykt6w8DzQTg` with autoplay, `modestbranding`, `playsinline`.
- **`docs/`** folder — this file is the inaugural entry.

### Fixed
- **Footer social icons** (`src/components/layout/Footer.tsx`) now link to the real Dr Tutor profiles (Instagram, Facebook, LinkedIn) with `target="_blank"` + `rel="noopener noreferrer"`. They previously all pointed at `#` and did nothing on click.
- **Favicon swap on load** (`index.html`) — removed the `<link rel="icon" type="image/svg+xml" href="/logo.svg" />` declaration. Browsers were upgrading to the SVG a few seconds after first paint; now `favicon.ico` is the sole tab icon.

### Wired up
- **Google Analytics 4 (`G-29J2MTL3ZW`)** end-to-end:
  - `index.html` — gtag.js loader script added directly after the existing Consent Mode v2 defaults (which keep `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` all denied until consent).
  - Configured with `send_page_view: false` — GA4 will not auto-fire a page_view on initial load.
  - `src/App.tsx` — new `usePageTracking()` hook listens to `useLocation()` and sends a manual `page_view` on every route change (including initial). Deferred to `requestAnimationFrame` so `document.title` (updated via `react-helmet-async`) is correct before the event fires.
  - Existing `useCookieConsent` hook already wires Accept/Reject to `gtag('consent', 'update', ...)` — Consent Mode v2 stays in full control.

### Notes for future me
- The `organizationSchema.sameAs` array in `HomePage.tsx` is still empty. Adding the three social URLs there would surface them to Google's knowledge graph — quick SEO win when ready.
- The `apple-touch-icon` link still points at `logo.svg`. iOS prefers a proper PNG (180×180) — drop one in `public/` and update the link when convenient.

---

## Earlier history (pre-this-log)

Reconstructed from `git log` for context. Not exhaustive.

- **2026 (prior)** — Testimonials refreshed with new avatars + revised name (`8ca178e`).
- **2026 (prior)** — SEO components, sitemap, and robots.txt added for search visibility (`765b1b4`).
- **2026 (prior)** — Logo asset swap (`694c3cb`).
- **2026 (prior)** — Vercel + Claude configuration files committed (`ee67d92`).
- **Initial** — Main website implementation (`eef438c`).
