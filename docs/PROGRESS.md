# Dr Tutor Website — Progress Log

Running record of meaningful changes to the marketing site (`drtutor.uk`). Newest entries on top.

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
