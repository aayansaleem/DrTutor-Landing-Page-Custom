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

## When changing anything visible

1. Run `npm run dev` and look at the change in the browser at every breakpoint that matters (390 mobile, 768 tablet, 1440 desktop).
2. Make sure the new pattern fits the section rhythm of the rest of the page — don't drop a maximalist component into a minimalist site.
3. Append an entry to `docs/PROGRESS.md` for anything more than a typo fix.
4. **Don't push without explicit "push it" from the user.** Match the scope of the ask: a button-color fix doesn't get a section refactor, and a section build doesn't get bundled with dependency upgrades.
