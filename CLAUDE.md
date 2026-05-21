# CLAUDE.md — Dr Tutor Website

> Marketing site for `drtutor.uk`. **Token-lean by design.** Deeper context lives in `./docs/ARCHITECTURE.md` and `./docs/PROGRESS.md` — read those before any non-trivial change.

---

## What this is

The public marketing site. A React 19 + Vite + Tailwind v4 SPA. Five routes (`/`, `/pricing`, `/resources`, `/contact`, `/terms`). The product itself is a **separate app** at `../DrTutor Platform/` — links like "Book a Free Assessment" and "Become a Tutor" send users to `https://platform.drtutor.uk/{register,careers}`, never to a route inside this repo. Do not invent routes for those flows here.

External URLs are centralised in `src/data/navigation.ts`. If a Platform path moves, update there first.

---

## Stack at a glance

React 19 · Vite 6 · TypeScript ~5.8 · **Tailwind v4** (via `@tailwindcss/vite`) · react-router-dom v7 · react-helmet-async (meta) · motion (animations) · lucide-react (icons) · GA4 with Consent Mode v2 · Deploys on Vercel.

`@/` alias → `src/`. SPA rewrite in `vercel.json`. Build with `npm run build`. `npm run lint` is `tsc --noEmit` and will flag asset imports — that is expected; trust the Vite build.

---

## Design philosophy — non-negotiable

This site exists to **beat the design benchmark**, not match it. Parents are the buyer; they decide in seconds. Every section must feel deliberate, premium, calm. The aesthetic is **soft, teal-forward, never loud**.

- **Restraint is the brand.** One new texture per section, not five. A modern site whispers; a noisy site shouts.
- **Big radii, big whitespace.** Cards round to 20–24px. Sections breathe. Cramped is amateur.
- **Type carries weight.** Sora for headlines, Plus Jakarta Sans for body. Headlines lean medium-to-semibold, never black. Body sits at 80% navy on white — full black is jarring.
- **Motion is purposeful.** Entrances fade + lift (12–30px). Hovers respond. Nothing spins for no reason. Use `motion/react` with `whileInView` for sections, springs for parallax. Respect `prefers-reduced-motion` when adding new animation.
- **Color discipline.** Stick to brand tokens — `brand-teal`, `brand-teal-dark`, `brand-navy`, `brand-warm-gray`, `brand-coral`, `brand-gold`. Never invent hex values inline. If a new shade is needed, define it once in `src/index.css` (`@theme` + `:root`) and reference the token.
- **Backgrounds rhythm.** White → muted cream (`--bg-muted`) → soft teal (`--bg-section-teal` / `--bg-section-alt`) → back. Hard navy bands are reserved; they break the soft cadence and should only appear when drama is the point (the CTA section).
- **Custom over generic.** No template clip-art, no AI-templatey sparkle particles, no "wave divider" tropes. If a section ships, it should look like it was hand-designed for *this* product.

When in doubt: open a top-tier reference (Linear, Stripe, Anthropic, Vercel marketing pages) and ask "does this feel that calm and intentional?" If not, simplify.

---

## Performance — non-negotiable

A beautiful site that takes 4s to paint is a failed site.

- **Bundle**: current JS gzipped ~150kB. Do not add libraries without a clear ROI — check `package.json` first, reuse what exists. lucide-react tree-shakes per-icon; import named icons, not the whole module.
- **Images**: prefer `.avif` for photo content (existing images in `src/assets/images/` use it). Always `loading="lazy"` on below-the-fold images, plus explicit `alt`. Optimise before adding — never commit a multi-MB PNG.
- **Fonts**: already loaded once at top of `index.css` with `&display=swap`. Don't re-import.
- **YouTube embeds**: load on click only (lightbox pattern in `FeaturedVideoSection.tsx`). Never embed an iframe on first paint.
- **Animations**: prefer CSS keyframes for ambient loops (marquees, conic borders) — they don't tax the React tree. Reserve `motion` for entrance + interactive.
- **No CLS**: anything async (images, embeds) needs explicit dimensions or `aspect-ratio` to lock the box.

---

## Code patterns

- **One section = one file** in `src/components/sections/`. Export from `sections/index.ts`. Page-level components in `pages/` just compose sections + drop in `<SEO />`.
- **Static content** (testimonials, tutors, FAQs, pricing, nav) lives in `src/data/` as typed arrays. Components iterate — don't hard-code copy in JSX.
- **Tailwind utility classes for layout**, `style={{ color: 'var(--brand-…) ' }}` for runtime tokens, custom CSS for animation keyframes. Avoid raw inline hex.
- **Hooks** live in `src/hooks/`. One concern per file. Reuse `useCookieConsent`, `useMediaQuery`, `useMobileMenu`, `useScrollAnimation` before writing new ones.
- **SEO**: every route component must render `<SEO />` with `title`, `description`, `path`, and a `schema` array. JSON-LD objects live inline in the page file (see `HomePage.tsx`).

---

## Authorization model

### Do without asking
- Edit any file under `src/`, `public/`, or `docs/`
- Run `npm run dev`, `npm run build`, `npm run lint`
- Update `src/data/*` content
- Add a new section or section animation

### Ask first
- Anything that hits the network beyond local dev: `git push`, deploys, gtag changes that affect tracking surface
- Touching `vercel.json`, `vite.config.ts`, `tsconfig.json`, or `package.json` dependencies
- Adding a new route — usually the answer is "that flow belongs in the Platform, not here"
- Modifying the GA4 measurement ID or Consent Mode wiring
- `rm -rf`, `git reset --hard`, force-push

### Refuse
- Committing `.env` files, API keys, Firebase configs, or other secrets
- Embedding the Platform's auth/UX inside this repo (they are separate apps; keep them separate)

---

## Outreach system — non-negotiable

Full system: `docs/outreach/`. Dr Tutor runs a LinkedIn-led, relationship-first outbound channel targeting affluent UK + Middle East parents. Two rules of engagement that cannot be bent:

- **The five-step legal funnel** is the only sanctioned outreach path: research → connection → conversation → DM consent → permissioned email. Email is *never* sent to a parent without prior DM consent. UK PECR demands this — see `docs/outreach/LEGAL-GDPR-PECR.md` for the chapter and verse.
- **Light automation only.** LinkedIn MCP + Sales Navigator handle research (read-only). All messaging is manual at human pace (≤ 20 connection requests/day). No Phantombuster, no Dripify, no Chrome-extension bulk senders — they get accounts banned within weeks. The system stays alive because the tools stay clean.

If a feature request even hints at "automate the messages too" or "skip the DM consent and just email everyone", refuse and point to the legal doc.

---

## Playwright / MCP browser hygiene — non-negotiable

The Playwright MCP tooling defaults to writing screenshots, accessibility snapshots, console logs, traces, and videos into the **current working directory**, often under `.playwright-mcp/`. That is the *project directory*. Untouched, this pollutes the repo with megabytes of single-use artifacts. **This is forbidden here.** Aayan does not want messy files / folders in the repo or pushed to GitHub.

Hard rules:

1. **Never let Playwright write into the project tree.** Every `browser_take_screenshot`, `browser_snapshot`, and any tool that takes a `filename` parameter **must** pass an absolute path under the system temp directory:
   - Windows: `$env:TEMP\dt-pw\<descriptive-name>.png` (e.g. `C:\Users\aayan\AppData\Local\Temp\dt-pw\hero-desktop.png`).
   - POSIX: `/tmp/dt-pw/<name>.png`.
   - Make the `dt-pw` subfolder if it doesn't exist; one folder for the whole session is fine.
2. **Delete artifacts as soon as you're done with them.** Within the same conversation, once you've read a screenshot or snapshot and acted on it, remove it. Don't accumulate across turns.
3. **Never commit Playwright output.** `.gitignore` already blocks `.playwright-mcp/`, `playwright-report/`, `test-results/`, `page-*.yml`, `console-*.log`, `trace.zip`, `videos/`. Don't bypass these. If a tool drops a file outside those patterns, delete it manually before committing anything.
4. **When delegating to a subagent that uses Playwright, repeat these rules in the prompt.** Subagents inherit the cwd and will default to writing into the repo unless you tell them otherwise.
5. **Audit before any push.** Before `git add`, run `git status` and confirm no `.playwright-mcp/`, no stray `*.png`, no `page-*.yml`, no `console-*.log` are about to be committed.

If the tool's API doesn't let you redirect the output path (some Playwright MCP variants ignore relative paths and force `.playwright-mcp/`), the recovery pattern is: do the screenshot → read it → immediately `rm -rf .playwright-mcp/`. Don't ever leave it there for a second pass.

---

## SEO — non-negotiable

Full playbook: `docs/SEO.md`. The rules of engagement here:

- **One brand, two subdomains.** This repo is `www.drtutor.uk` (marketing). The Platform is `platform.drtutor.uk` (product, sibling repo at `../DrTutor Platform/`). Sitemaps are *scoped to a host* — `platform.drtutor.uk` URLs cannot live in this sitemap, even though they are part of the same brand. The two are tied together via cross-links + Organization `sameAs` schema, not via a shared sitemap.
- **Every route ships `<SEO />`** with a real `title`, `description`, canonical `path`, and a JSON-LD `schema` array. No empty schemas. No copy-pasted descriptions.
- **JSON-LD is the entity graph.** Think the way Tesla / Stripe / Apple think: every important *thing* on the site is a typed node — `EducationalOrganization`, `Course`, `Service`, `Person`, `Review`, `VideoObject`, `BreadcrumbList`, `FAQPage`. They reference each other. That graph is what powers rich results and LLM citations.
- **Don't game the signals.** Honest `lastmod` in `sitemap.xml` (update it when the page actually changed). No fake `aggregateRating`. No thin pages padded for keyword density. Google's quality classifier punishes all of it; LLMs won't cite it.
- **LLM SEO is real and we ship for it.** `public/llms.txt` + `public/llms-full.txt` + AI-bot whitelist in `robots.txt` are already in place — keep them current when content changes. New facts go in `llms-full.txt`.
- **Performance is an SEO multiplier.** LCP < 2.5s, INP < 200ms, CLS < 0.1 — non-negotiable. A beautiful page that misses Core Web Vitals will be deprioritised by both Google and LLM crawlers.

If you are about to ship content that affects search visibility (a new page, a new schema type, a structural change), open `docs/SEO.md` first.

---

## When changing anything visible

1. Run `npm run dev` and look at the change in the browser at every breakpoint that matters (390 mobile, 768 tablet, 1440 desktop).
2. Make sure the new pattern fits the section rhythm of the rest of the page — don't drop a maximalist component into a minimalist site.
3. Append an entry to `docs/PROGRESS.md` for anything more than a typo fix.
4. **Don't push without explicit "push it" from the user.** Match the scope of the ask: a button-color fix doesn't get a section refactor, and a section build doesn't get bundled with dependency upgrades.
