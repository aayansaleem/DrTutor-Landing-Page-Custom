# Dr Tutor Website — Progress Log

Running record of meaningful changes to the marketing site (`drtutor.uk`). Newest entries on top.

---

## 2026-05-23 — Standalone /privacy page + GDPR/PECR cookies banner update

Split the privacy story out of `/terms` and into its own page, and brought the cookies banner up to PECR-compliant Accept/Reject parity.

### Added
- **`src/components/pages/PrivacyPage.tsx`** — full UK GDPR + PECR privacy policy in parent-readable plain English. Visual structure mirrors `/terms` (centered teal heading, "Last Updated" stamp, numbered sections, teal bullet dots) so it slots in as a peer. Covers: data controller, what we collect, lawful bases (Art 6(1)(b)/(a)/(f)), third-party recipients (Google LLC, Vercel Inc., DigitalOcean LLC, matched tutors), international transfers (DPF + SCCs), retention (12 months for cold enquiries, service + 6 years for customers, GA4 14 months, server logs 90 days), the eight UK GDPR rights including ICO complaint route, cookies categories, children policy, security measures, and contact (`contact@drtutor.uk`).
- **`src/App.tsx`** — new lazy-loaded `<Route path="/privacy" element={<PrivacyPage />} />`. Ships as its own 4.01 kB gzip chunk.
- **JSON-LD schema** on `/privacy`: `WebPage` (referencing the `EducationalOrganization`) + `BreadcrumbList`.

### Changed
- **`src/components/ui/CookieConsent.tsx`** — PECR fix: Reject is now visually equal to Accept. Both buttons share identical height (`h-8`), padding (`px-3.5`), weight and size; Accept stays gradient-filled, Reject is now outlined (white surface + 1.5 px teal-light border) so it reads as a peer button, not a tertiary text link. Banner copy now says "Cookies for analytics & ads (UK GDPR / PECR)" and the inline link points to `/privacy` (was `/terms`). `aria-label` added to each button for screen readers. Max width nudged 400 → 420 px to accommodate the outlined Reject pill without crowding.
- **`src/components/layout/Footer.tsx`** — Privacy Policy and Cookies links now point to `/privacy`. Terms & Conditions still points to `/terms`.
- **`public/sitemap.xml`** — added `/privacy` entry (priority 0.3, yearly). Bumped `<lastmod>` to `2026-05-23` on every URL whose footer Privacy link just changed.
- **`public/llms.txt`** + **`public/llms-full.txt`** — added Privacy Policy page to the route lists and a new "Privacy & Data Protection (Summary)" section in `llms-full.txt` summarising data collected, lawful bases, third parties, retention, and contact.

### Untouched (deliberately)
- Consent Mode v2 defaults in `index.html` remain `denied` across all four signals (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`). PECR requires defaults-denied.
- `VITE_LEAD_ENDPOINT` / Django integration.
- `/terms` page content (still references "privacy policy" inside it, but the canonical privacy doc now lives at `/privacy`).

### Verification
- `npm run build` clean. New `PrivacyPage` chunk: 9.60 kB raw / 4.01 kB gzip.
- `tsc --noEmit` shows only the pre-existing asset-import noise documented in CLAUDE.md. Zero new errors from the privacy work.
- Grep confirms: only one remaining `to="/terms"` Link in the codebase (the Terms & Conditions footer link). All Privacy targets now point to `/privacy`.
- Exactly one `<Route path="/privacy">` in `src/App.tsx`.

---

## 2026-05-23 — Google Ads conversion tag wired into /learn

- `src/lib/leads.ts`: set `ADS_CONVERSION_SEND_TO = 'AW-17962620600/Ds-_COeOkLIcELitn_VC'` (was stubbed `null`).
- `index.html`: added `gtag('config', 'AW-17962620600')` alongside existing GA4 config. No duplicate loader.
- Verified `npm run build` + `npm run lint` clean.
- Deployed via push to main (Vercel auto-deploy).
- Ads workstream notified; they will test-submit `/learn` once Django endpoint also lives and flip campaigns Enabled.
- Outstanding (not this task): `VITE_LEAD_ENDPOINT` env var → Django URL; that's the parallel backend task tonight.

---

## 2026-05-23 — Merged Offer + Steps into one JourneySection, removed all 3D Fluency icons

The previous `OfferSection` ("What you get, free") and `StepsSection` ("After you book") were telling the same story twice — both described the assessment moment from slightly different angles. Merged into one cohesive section.

### Added
- **`src/components/learn/JourneySection.tsx`** — single section titled "How it works, step by step". Three cards (Book / Meet / Plan), each fusing the process moment with the value attached to it. Visual treatment mirrors the homepage `LessonsStickSection` (white rounded card, brand-teal-light border, hover lift, illustration bottom-pinned).
- **`src/data/learn.ts`** — new `journey` data array. Removed the now-unused `offerItems`, `steps`, `methodCycle`, and their interfaces.

### Removed
- `src/components/learn/OfferSection.tsx` — superseded by JourneySection.
- `src/components/learn/StepsSection.tsx` — superseded by JourneySection.
- All Icons8 3D Fluency PNGs (`src/assets/icons3d/`, 12 icons, ~584 KB) — they didn't carry the DrTutor teal/coral/gold palette and looked off-brand against the rest of the site. **Replaced with the existing DT brand illustrations** (`book-clock.avif`, `calendar.avif`, `book-bulb.avif`) — the same ones used in the homepage's `LessonsStickSection`, which map perfectly to Book / Meet / Plan.
- `Icon3d` component + `ICON3D` map from `primitives.tsx` — fully unused after the merge.

### Changed
- **`AssessmentForm.tsx`** success state — `Icon3d "approval"` swapped for a **custom teal-gradient check medallion** (radial teal gradient, inner white ring, big white check SVG). Lighter than a PNG and fully on-brand.

### Bundle / perf
- `/learn` chunk dropped from 16.46 → 12.91 kB gzip after removing the 3D PNG imports.

---

## 2026-05-23 — Post-audit: SEO hydration on first paint + footer brand fix

Two follow-ups from the read-only audit at `Google Ads/docs/audits/AUDIT-LEARN-PAGE.md`.

### Changed
- **`src/lib/learnSeo.ts`** (new) — exports `LEARN_SEO_TITLE`, `LEARN_SEO_DESCRIPTION`, `learnServiceSchema`, `learnFaqSchema` so the SEO config sits **outside the lazy `LearnPage` chunk**.
- **`src/App.tsx`** — renders `<SEO />` synchronously when `pathname === '/learn'`, before the lazy `<Suspense>` resolves. Result: `document.title`, canonical, OG/Twitter meta and JSON-LD all apply on first paint instead of the ~3s lazy-hydration delay the audit caught. Social-share bots and crawlers now see the right meta for `/learn` from the very first response.
- **`src/components/pages/LearnPage.tsx`** — the duplicate `<SEO />` + inlined schemas are removed (App now owns it).
- **`src/components/layout/Footer.tsx`** — logo alt corrected: `"DrTutors — Personalised Tutors"` → `"Dr Tutor, Personalised Tutors"`. Fixes the long-standing brand typo flagged in the brief, drops the decorative em dash at the same time.
- **`/learn` `<title>`** — em dash swapped for a colon: `"Book a Free Assessment | Dr Tutor: PGCE-Qualified UK Tutors"`.

Other audit findings (navbar simplification on /learn, PricingPeek conscious-decision review, testimonial spellings, MethodSection misleading "dashboard" alt, TrustStrip "All subjects" inaccuracy, Terms page contradictions, etc.) are deferred — full audit is in the markdown.

---

## 2026-05-23 — `/learn` now uses the site Navbar + Footer

Reverted the original "no nav, no footer" minimal-shell decision for `/learn`. The page now renders the **site Navbar** (with menu links) and the **site Footer** (social icons + Navigation + Support columns + copyright/address + Privacy/Terms/Cookies), so it reads as a proper page in the site, not a kiosk.

### Changed
- **`src/components/layout/Navbar.tsx`** — primary CTA is pathname-aware: on `/learn` the "Book a Free Assessment" button becomes a **green WhatsApp pill** linking to `wa.me/447526327612` (since the booking form is already inline on the page). The desktop pill, the mobile menu CTA, and the closing behaviour are all swapped. All other pages are unchanged.
- **`src/App.tsx`** — the dedicated landing-shell branch is removed; `/learn` flows through the normal app layout. Only the **floating WhatsApp button is suppressed** on `/learn` (avoids triplication with the nav CTA + sticky mobile bar).
- **`src/components/pages/LearnPage.tsx`** — drops `LearnHeader` + `LearnFooter` usage.
- **`src/components/learn/LearnHeader.tsx`** — deleted (no longer used).
- **`src/components/learn/FinalCta.tsx`** — `LearnFooter` export removed (the global Footer now picks up under the photo fan via its `footer-gradient`).

### Result
- One global header / footer / cookie banner everywhere, with the only /learn-specific tweak being the nav CTA.

---

## 2026-05-23 — `/learn` redesign aligned with site DNA + sleek site-wide cookie banner

The previous `/learn` build (heavy glass + aurora throughout) diverged too far from the homepage's visual language. Redesigned so the lander reads as a focused sibling of the marketing site, not a different aesthetic.

### Changed
- **Hero** — now uses the homepage `hero-bg` teal gradient with `rounded-b-[40px]/56px` bottom curve. Two-column split rebalanced (≈ 55/45) so the form no longer feels stretched. Headline kept the kinetic word-reveal with teal "exactly" + drawn underline.
- **Header** — bigger logo (`h-10/sm:h-11`), confident bar; transparent over the hero, fades to white-translucent with subtle border on scroll. Bigger WhatsApp pill (shortens to "Chat" on mobile).
- **Form (`AssessmentForm.tsx`)** — age pill-strip replaced with a **modern custom dropdown** (Framer Motion popover, listbox role, click-outside + escape, branded). Floating-label fields swapped for clean icon-prefixed fields. Conversion logic + lead delivery unchanged.
- **Tutors (`TutorsSection.tsx`)** — rebuilt to mirror the homepage `TutorsSection` (warm beige `#EDE7DA` card, mix-blend photo, teal `#0E8C8C` info badge). Star ratings dropped (honesty rule).
- **I/We/You** — promoted from a thin strip to its own `LearnTeachingCycleSection.tsx`, mirroring the `/resources` page treatment (image card + dark overlay + white title + teal subtitle pill + description below).
- **Method (`MethodSection.tsx`)** — slimmed to mirror the homepage `TeachingTechniquesSection`: `teaching-card-bg` block with Lemov intro + technique pills + the dashboard mockup with a soft glow.
- **Testimonials (`TestimonialsSection.tsx`)** — rebuilt to mirror the homepage carousel (chevron arrows, dot pagination, white card with teal gradient overlay).
- **Final CTA + footer (`FinalCta.tsx`)** — rebuilt to mirror the homepage `CTASection` (3-photo fan bleeding into `footer-gradient`), with a `rounded-t-[40px]/56px` top curve for symmetry with the hero. Minimal footer kept (Privacy / Terms / © DRTUTOR LTD).
- **Offer + Steps + FAQ + Form section** — dropped the heavy glass/aurora layer in favour of the homepage palette (white cards on `bg-muted` / `bg-section-alt`, soft shadow, brand-token borders). 3D Icons8 glossy icons kept.
- **AuroraBackground primitive removed** (no longer used).

### Site-wide
- **`CookieConsent`** — sleek pill bar (one row, icon + line + Reject/Accept). Compact ~400px max-w, replacing the bulky card. Same accept/reject + Consent Mode v2 wiring intact.

### Notes
- Verified at 390 / 1440 against the standard. The lander now reads as part of the same brand family as the homepage, focused on conversion.

---

## 2026-05-22 — `/learn` ad landing page (cinematic redesign)

New single-goal landing page for Google Ads traffic. Build brief: `Google Ads/docs/handoffs/HANDOFF-LEARN-PAGE.md`. First (flat) attempt was scrapped for not hitting the design bar; rebuilt as a cinematic aurora + glass design.

### Added
- **Route `/learn`** in `App.tsx`, lazy-loaded as its own chunk (~16 kB gzip). Renders its own minimal shell — the global Navbar, Footer and floating WhatsApp button are **suppressed** on this route (single goal, zero exits, logo not linked away). Cookie banner kept.
- **`src/components/learn/`** — the page. Cinematic design language: living **aurora** (Framer Motion driven, `AuroraBackground.tsx`), **real glass** surfaces (`.glass` in `index.css`), **3D glossy icons** (Icons8 3D Fluency, bundled in `src/assets/icons3d/`), cursor-reactive tilt, scroll-linked reveals, a self-drawing step connector, and an **alive** form success state (live-writing + 3D check). Sections: glass header, parallax hero with the form inline (desktop), trust marquee, glass-bento offer, 3-step, tutor cards with cursor spotlight, condensed method (Teach Like a Champion + I/We/You + technique pills + dashboard mockup), testimonials, centerpiece form, FAQ, full-bleed aurora CTA, minimal footer, mobile sticky CTA bar.
- **`src/components/learn/primitives.tsx`** — shared `Reveal`, `GlassCard` (tilt), `LiveWrite`, `Icon3d`.
- **`src/lib/leads.ts`** — `submitLead()` lead delivery + `fireLeadConversion()` (GA4 `generate_lead`, once per submission; Google Ads conversion tag stubbed pending the ads team's conversion ID). Captures `gclid` + UTM into the payload for offline conversion import.
- **`src/data/learn.ts`** — page copy (offer, steps, method, FAQs, trust signals). Parent-facing voice, no em dashes.
- **`.env.example`** — `VITE_LEAD_ENDPOINT` (empty for now).

### Pending / dependencies (IMPORTANT)
- **Backend:** Firebase was retired 2026-05-22; the platform is migrating to Django. `VITE_LEAD_ENDPOINT` is **empty**, so the form runs in **stub mode** (simulated success, lead NOT persisted). **Do not resume paid ads until the Django endpoint is wired**, or leads silently vanish.
- **Tracking:** GA4 `generate_lead` is live; the Google Ads conversion tag is stubbed in `leads.ts` (`ADS_CONVERSION_SEND_TO`) until the ads team supplies the `AW-…/label`.
- Honesty: no review numbers / star ratings / `aggregateRating` anywhere (no verifiable source). Pricing deliberately omitted.

### Notes
- Design verified personally at 390 / 1440 against the standard before sign-off (charged-up modern + optimized + crafted experience). Footer Privacy/Terms both point at `/terms` for now (no dedicated `/privacy` route yet).

---

## 2026-05-21 — Outreach system blueprint + entity unification

### Added
- **`docs/outreach/`** — full LinkedIn-led outbound system blueprint. Six files, ~1,500 lines total:
  - `README.md` — five-step legal funnel diagram (research → connection → conversation → DM consent → permissioned email), doc map, KPI summary, tool stack at-a-glance.
  - `STRATEGY.md` — two-ICP definition (UK affluent professional parents + Middle East families targeting UK education), audience filters, premium positioning, scale model (~£72k/year at saturation from 70 min/day), how outreach feeds the SEO + GBP + referral channels.
  - `LEGAL-GDPR-PECR.md` — UK GDPR + PECR + LinkedIn ToS chapter-and-verse. Why the DM consent bridge is the only PECR-compliant path to B2C cold email in the UK. ME jurisdictional notes. LIA template ready to sign.
  - `30-DAY-PILOT.md` — daily plan + KPI targets (450 connection requests / 25%+ acceptance / 5+ trials / 2+ signed). Five-path decision tree at Day 30 (scale / tune / iterate / pivot / pause).
  - `MESSAGE-TEMPLATES.md` — connection notes, DMs, consent ask, permissioned email. UK + ME variants. Legal footer block. Anti-patterns ("never lead with pitch").
  - `TOOLING.md` — LinkedIn MCP + Sales Navigator (£60) + Hunter.io (free→£40) + HubSpot (free) + Instantly (£30) + `outreach.drtutor.uk` DNS spec (SPF/DKIM/DMARC). Total ~£130/mo at pilot scale.
  - `DAILY-CADENCE.md` — the 75-min daily routine, LinkedIn rate limits, what to do when LinkedIn flags activity, Friday review template.
- **`CLAUDE.md`** — new **Outreach system — non-negotiable** section. Two hard rules: the five-step legal funnel is the only sanctioned path, and only light automation (research only) is permitted.
- Pointers added in `docs/ARCHITECTURE.md` (outreach subdomain DNS notes), `docs/SEO.md` (how outreach feeds SEO), `docs/SEO-90-DAY-PLAN.md` (parallel-workstream alignment), `docs/TASKS-SCHEDULER.md` (new 🤝 marker + Day 2 task to read the pilot doc).
- **`src/components/pages/HomePage.tsx`** — `organizationSchema` upgraded for entity unification: `legalName: 'DRTUTOR LTD'`, `identifier` (UK Companies House № 16076105), `address` (21 Fulford Grove, Watford WD19 7QQ, GB), refined `foundingDate` (2024-11-12), `sameAs` populated with the 3 social URLs + Platform URL. Google Knowledge Graph and LLM crawlers now read a complete entity.
- **`src/components/layout/Footer.tsx`** — legal footer line added: `© 2026 DRTUTOR LTD · Registered in England No. 16076105 · 21 Fulford Grove, Watford WD19 7QQ`. UK Ltd company display requirement + brand entity disambiguation in SERPs.

---

## 2026-05-21 — SEO playbook + 90-day boost plan + Playwright hygiene

### Added
- **`docs/SEO.md`** — full playbook covering traditional + LLM SEO. Calls out the "Discovered – currently not indexed" reality (it's a page-quality issue, not a sitemap one), the multi-subdomain rule (sitemaps are host-scoped, so `platform.drtutor.uk` URLs cannot live in `www.drtutor.uk/sitemap.xml`), schema-graph strategy ("think Tesla / Stripe / Apple"), LLM SEO mindset, performance-as-SEO-multiplier, and a tiered action checklist (immediate / soon / cross-repo / off-repo).
- **`docs/SEO-90-DAY-PLAN.md`** — 6-sprint × 2-week plan grounded in live competitive R&D run on 2026-05-21. Reveals that `drtutor.uk` is **not on page 1 for "drtutor"** (drtutor.net dominates with sitelinks; drtutor.com.au has direct subject overlap from Australia). Lists 15 UK directory backlink targets, 10 parent-blog outreach targets, the LLM-citation gap (Dr Tutor is absent from every "best of" UK tutor listicle surfaced), and a verified GBP at 5.0 / 4 reviews — under-leveraged vs MyTutor (448 reviews) and Tutorful (335). North-star: indexed-pages 1 → 12, brand SERP for "drtutor" not-page-1 → top-3, GBP reviews 4 → 30+, LLM citations 0 → 3+.
- **`CLAUDE.md`** — new **SEO — non-negotiable** section. Covers the one-brand-two-subdomains rule, JSON-LD entity-graph mindset, honest signals (no gaming `lastmod` or `aggregateRating`), LLM SEO discipline, performance as multiplier. Pointer to `docs/SEO.md` for the full playbook.
- **`CLAUDE.md`** — new **Playwright / MCP browser hygiene — non-negotiable** section. Five hard rules: every screenshot/snapshot must use an absolute `$env:TEMP\dt-pw\<name>.png` path (POSIX `/tmp/dt-pw/...`), delete after use, never commit, repeat the rules in any subagent prompt, recovery pattern if a tool ignores absolute paths.
- **`.gitignore`** — defensive rules blocking `.playwright-mcp/`, `playwright-report/`, `test-results/`, `page-*.yml`, `console-*.log`, `trace.zip`, `videos/`. Caught a real leak from the research-agent run before it could be committed.
- **Memory** (in `~/.claude/projects/E--ERP-Systems-DrTutor-DrTutor-Website/memory/`): `feedback_playwright_hygiene.md` + `MEMORY.md` index — locks the Playwright hygiene preference across all future sessions.

### Changed
- **`public/sitemap.xml`** — homepage `lastmod` bumped to `2026-05-21` (legitimate signal — featured-video section + analytics + favicon shipped today). Inner-page dates left at `2026-04-09` because their content has not actually changed (honest signals matter).

---

## 2026-05-21 — Documentation pass

### Added
- **`CLAUDE.md`** at repo root — operating contract for AI assistants working in this codebase. Covers project identity, the two-app split with the Platform, stack at a glance, design philosophy (restraint, big radii, brand token discipline, custom-over-generic), performance non-negotiables, code patterns, authorization model, and the visible-change checklist.
- **`docs/ARCHITECTURE.md`** — system reference. Where things live (this repo vs. `../DrTutor Platform/`), how the two-app split maps to external `register` / `careers` URLs, full stack table, route table, `src/` folder map, design-system source-of-truth pointer, SEO + analytics flow, build/deploy commands, and cross-repo notes for when Platform paths move.

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
