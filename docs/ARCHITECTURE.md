# Architecture — Dr Tutor Website

A single-page React app that serves as the **marketing front door** for Dr Tutor. Everything past the "Book a Free Assessment" or "Become a Tutor" button hands off to a **separate** application (the Platform — see below).

---

## Where it lives

| Path | What |
|---|---|
| `E:\ERP Systems\DrTutor\DrTutor Website\` | **This repo** — the marketing site (`drtutor.uk`) |
| `E:\ERP Systems\DrTutor\DrTutor Platform\` | **Sibling repo** — the product app (`platform.drtutor.uk`) |
| `E:\ERP Systems\DrTutor\Google Ads\` | Ad creative + landing page experiments |

The two repos are deployed independently. They share a brand and visual language but no code.

---

## The two-app split

Some links on this site point **outside** to the Platform. They are real cross-origin links (`<a href>`), not React Router routes, and always open in a new tab via `target="_blank" rel="noopener noreferrer"`.

| User clicks | Goes to | Lives in |
|---|---|---|
| "Book a Free Assessment" (hero, navbar, CTA, pricing, resources) | `https://platform.drtutor.uk/register` | `../DrTutor Platform/pages/RegisterPage.tsx` |
| "Become a Tutor" (navbar, footer) | `https://platform.drtutor.uk/careers` | `../DrTutor Platform/pages/CareersPage.tsx` |

All other navigation stays inside this app via React Router.

Centralised in `src/data/navigation.ts` — change links there, not at the call site.

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **React 19** + **Vite 6** | `vite.config.ts`; `@` alias → `src/` |
| Language | **TypeScript ~5.8** | `tsconfig.json` uses bundler resolution, paths alias, no emit |
| Styling | **Tailwind v4** via `@tailwindcss/vite` | All design tokens declared in `src/index.css` under `@theme` + `:root` |
| Routing | **react-router-dom v7** | SPA — Vercel rewrites all paths to `/index.html` |
| Meta | **react-helmet-async** | Via `src/components/ui/SEO.tsx` |
| Animation | **motion** (ex-Framer Motion) | Used for entrance + parallax in sections |
| Icons | **lucide-react** | |
| Analytics | **GA4** (`G-29J2MTL3ZW`) | Consent Mode v2 defaults to denied; `useCookieConsent` flips it on Accept |
| Hosting | **Vercel** | `vercel.json` SPA rewrite + `npm run build` |

---

## Routes (this repo)

| Path | Component | File |
|---|---|---|
| `/` | `HomePage` | `src/components/pages/HomePage.tsx` |
| `/pricing` | `PricingPage` | `src/components/pages/PricingPage.tsx` |
| `/resources` | `ResourcesPage` | `src/components/pages/ResourcesPage.tsx` |
| `/contact` | `ContactPage` | `src/components/pages/ContactPage.tsx` |
| `/terms` | `TermsPage` | `src/components/pages/TermsPage.tsx` |
| `/learn` | `LearnPage` | `src/components/pages/LearnPage.tsx` |

Wired in `src/App.tsx`. Routes are lazy-loaded (one chunk each). Hash-anchored deep links (`/#tutors`, `/#how-it-works`, `/#faq`, `/#testimonials`) are handled by `Navbar.tsx` via a `useEffect` on `useLocation()`.

### `/learn` — the ad landing page (special case)

`/learn` is the **single-goal Google Ads landing page** and breaks the usual pattern deliberately:

- **No site chrome.** `App.tsx` detects `pathname === '/learn'` and renders a bare shell — no global `Navbar`, `Footer`, or floating `WhatsAppButton`. The page ships its own minimal glass header + footer (`src/components/learn/`). One goal: book the free assessment. The logo is not a link away.
- **Lead delivery is in-repo, not an external link.** Unlike "Book a Free Assessment" elsewhere (which links to `platform.drtutor.uk/register`), `/learn` has the booking form **inline** and submits via `src/lib/leads.ts` → `submitLead()`. Firebase was retired (2026-05-22); until the Django endpoint is set in `VITE_LEAD_ENDPOINT`, the form runs in **stub mode** (no lead persisted). Do not run paid ads until that endpoint is wired.
- **Tracking.** `fireLeadConversion()` pushes GA4 `generate_lead` on submit success (once per submission) and holds a stubbed Google Ads conversion tag (`ADS_CONVERSION_SEND_TO`) for the ads team's `AW-…/label`. `gclid`/UTM are captured into the lead payload for offline conversion import.
- **Design.** Cinematic aurora + glass system in `src/components/learn/` (`AuroraBackground`, `primitives.tsx`), 3D icons in `src/assets/icons3d/`. Brief: `Google Ads/docs/handoffs/HANDOFF-LEARN-PAGE.md`.

---

## Folder map (`src/`)

```
src/
├── App.tsx                  Routes + GA4 SPA page tracking (usePageTracking)
├── main.tsx                 Entry — wraps app in HelmetProvider + BrowserRouter
├── index.css                Design tokens + animations (single source of truth)
├── components/
│   ├── layout/              Navbar, Footer
│   ├── pages/               Top-level route components — compose sections + SEO
│   ├── sections/            One file per page section (HeroSection, FeaturedVideoSection, …)
│   └── ui/                  Reusable primitives — Button, Card, Container, SEO, CookieConsent, WhatsAppButton, …
├── data/                    Static content arrays — testimonials, tutors, FAQs, pricing, navigation
├── hooks/                   useCookieConsent, useMediaQuery, useMobileMenu, useScrollAnimation
├── types/                   Shared TS interfaces (NavLink, Stage, Tutor, Testimonial, FAQ, …)
└── assets/                  Images + logo (bundled via Vite, hashed at build)
```

`public/` ships: `favicon.ico`, `logo.svg`, `og-image.png`, `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `.well-known/`.

---

## Design system — where things are defined

Single source of truth: **`src/index.css`**.

- **`@theme { … }`** — Tailwind v4 design tokens (colors, fonts, shadows, radii). These become utility classes like `bg-brand-teal`, `font-headline`, `shadow-card`. Tailwind v4 cannot resolve `var()` refs at build time, so hex values are repeated here verbatim.
- **`:root { … }`** — CSS custom properties for runtime use in `style={{ color: 'var(--brand-teal)' }}`. Same palette as above, plus semantic tokens (`--bg-page`, `--text-primary`, `--border-default`, …) and the hero/resources gradient stops.
- **`@keyframes` + helper classes** — `animate-marquee`, `animate-marquee-reverse`, `animate-fade-up`, plus the Featured-video animation suite (`video-conic-border`, `video-ripple`, `video-shine`, `video-lightbox-modal`, …).

Brand palette anchor: **teal `#0FA5A5`**, **navy `#031A35`**, warm-gray `#E6E1E1`, coral `#F97066`, gold `#F5A623`.

Fonts: **Sora** (headlines) + **Plus Jakarta Sans** (body) — loaded once at the top of `index.css` via Google Fonts.

---

## SEO + indexing

- `SEO` component (`src/components/ui/SEO.tsx`) wraps `react-helmet-async`. Each page passes `title`, `description`, `path`, and an optional `schema` array of JSON-LD blocks. Canonical, OG, Twitter Card, and robots meta are all set here.
- JSON-LD schemas live inline in the page component (see `HomePage.tsx` for `EducationalOrganization`, `WebSite`, `FAQPage`, `BreadcrumbList`).
- `public/robots.txt` + `public/sitemap.xml` are static.
- `llms.txt` + `llms-full.txt` are AI-crawler-friendly content snapshots.

---

## Analytics — how it actually works

1. `index.html` declares Consent Mode v2 defaults (denied) **before** loading gtag.js.
2. `gtag.js` loads async with `send_page_view: false` — automatic page_view is disabled to avoid silent SPA blindness.
3. `useCookieConsent` (in `src/hooks/`) reads/writes a 60-day `dt_cookie_consent` key in localStorage and calls `gtag('consent', 'update', …)` on Accept/Reject.
4. `usePageTracking()` in `App.tsx` listens to `useLocation()` and fires a manual `page_view` on every route change, deferred one animation frame so `document.title` has updated.

If consent is denied, GA4 still receives cookieless modeling pings but sets no cookies.

---

## Build + deploy

```
npm install
npm run dev        # http://localhost:3000
npm run build      # → dist/
npm run preview    # serve dist/ locally
npm run lint       # tsc --noEmit (asset-import errors are expected — Vite, not tsc, handles those)
```

Vercel: connect the repo, framework auto-detected as Vite. SPA rewrites are declared in `vercel.json`. Pushes to `main` trigger a production deploy.

---

## Cross-repo notes

If you ever need to verify something on the Platform side (the `/register` or `/careers` link target):
- Read it at `../DrTutor Platform/pages/RegisterPage.tsx` or `CareersPage.tsx`
- Platform stack: React 19 + Vite + Firebase. No shared design tokens — visual consistency is maintained by convention, not import.
- Platform deploy is its own Vercel project. Do not commit Platform changes from this repo.

When the Platform UI moves (route renamed, page split), update `src/data/navigation.ts` here — it is the only place where those external URLs are hard-coded… plus six call sites that pass them directly (`Navbar.tsx`, `HeroSection.tsx`, `CTASection.tsx`, `PricingCardsSection.tsx`, `ResourcesHeroSection.tsx`). Worth consolidating into `navigation.ts` constants if a rename ever happens.

---

## Outreach subdomain — `outreach.drtutor.uk`

The outreach system (`docs/outreach/`) sends permissioned emails from a dedicated subdomain to protect main-domain reputation. Setup:

- **Subdomain**: `outreach.drtutor.uk` — separate DNS records from `www.drtutor.uk`. Hosted independently of the website (it is a sending identity, not a web property).
- **DNS records**: MX, SPF, DKIM, DMARC — full setup in `docs/outreach/TOOLING.md` § "Outreach subdomain".
- **Warm-up**: ~14 days via Instantly before first real send. Don't bypass.
- **Why not `drtutor.uk` direct**: a single spam complaint or low-engagement signal on the main domain would damage booking confirmations + password resets. Subdomain isolation is the standard pattern.

The Platform repo (`../DrTutor Platform/`) doesn't need to know about `outreach.drtutor.uk` — it's a sending-only identity, not a route.
