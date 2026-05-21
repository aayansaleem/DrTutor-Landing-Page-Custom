# SEO Playbook — Dr Tutor

> Built to compete the way the giants compete: deep structured data, multi-property discipline, content authority, and ruthless performance. Covers **traditional search** (Google, Bing) and **LLM search** (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews) side by side, because in 2026 both pipelines feed the same eyeballs.

---

## Mental model

Search is two pipelines, both fed by the same fundamentals.

| Pipeline | What it ranks | What it rewards |
|---|---|---|
| **Traditional** (Google, Bing) | Crawled URLs ranked by signals | Authority, freshness, intent match, technical health |
| **LLM** (ChatGPT, Perplexity, Gemini, Claude, AIO) | Quotable facts and entities | Clean structured content, unambiguous claims, machine-readable schema, citations |

Both pipelines reward the same six fundamentals: **clarity, structure, depth, freshness, performance, authority**. Optimising for one helps the other. There is no real trade-off. Anyone who tells you "LLM SEO" replaces "traditional SEO" is selling you something.

---

## The current state of Dr Tutor SEO

What is already in place (good — don't break it):

- **Meta**: dynamic `<title>`, `<meta description>`, `rel="canonical"`, OG, Twitter Card on every route via `SEO` component (`src/components/ui/SEO.tsx`).
- **JSON-LD**: `EducationalOrganization`, `WebSite`, `FAQPage`, `BreadcrumbList` injected in `HomePage.tsx`. (Pricing / Resources / Contact / Terms pages: see their own JSON-LD or add.)
- **Sitemap**: `public/sitemap.xml` — 5 URLs, image extension declared.
- **robots.txt**: declares the sitemap, explicitly whitelists `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-Web`, `PerplexityBot`, `Google-Extended`.
- **LLM-discovery**: `public/llms.txt` and `public/llms-full.txt` — the emerging `llms.txt` spec, picked up by Perplexity, Anthropic, and others.
- **Consent + Analytics**: GA4 with Consent Mode v2 (no tracking until consent).

What is NOT yet in place (the gaps):

- `organizationSchema.sameAs` in `HomePage.tsx` is an empty array. Should list the three social URLs to anchor the entity graph.
- No `Person` schema for the four named tutors (a wasted authority signal — these are real PGCE specialists).
- No `Course` / `Service` schema for the tutoring offerings.
- No `Review` / `AggregateRating` schema — the site claims 4.97/500+ reviews on the hero, but Google can't read that claim because it's not marked up.
- No `VideoObject` schema for the featured Meet Dr Tutor video.
- No blog / insights surface — nothing to attract long-tail traffic or build topical authority.
- `platform.drtutor.uk` has no sitemap or coordinated meta (the sibling repo at `../DrTutor Platform/`).
- Most `lastmod` dates in `sitemap.xml` are stale — they should reflect real edits, not be left at the initial-commit date.

---

## The two-subdomain reality (the answer to "why aren't the external pages in the sitemap")

`www.drtutor.uk` and `platform.drtutor.uk` are **different subdomains**, which Google treats as **different sites**. A sitemap can only declare URLs from the host it lives on. This is a protocol-level rule, not a Google policy — `https://www.drtutor.uk/sitemap.xml` cannot contain `https://platform.drtutor.uk/register`. Anything claiming otherwise produces a `urlNotAllowed` warning and the entry is ignored.

The correct multi-property pattern:

1. **Each subdomain owns its own sitemap.**
   - `https://www.drtutor.uk/sitemap.xml` (this repo) — marketing pages only.
   - `https://platform.drtutor.uk/sitemap.xml` (Platform repo at `../DrTutor Platform/`) — needs to be built. Should list `/register`, `/careers`, and any other publicly indexable Platform routes.

2. **Both sitemaps are declared in each `robots.txt`.** Cross-declaration is allowed and is the standard pattern for multi-subdomain estates:
   ```
   Sitemap: https://www.drtutor.uk/sitemap.xml
   Sitemap: https://platform.drtutor.uk/sitemap.xml
   ```
   (Will enable here once the Platform sitemap ships.)

3. **Each subdomain is a separate property in Google Search Console.** Add `platform.drtutor.uk` as a new GSC property — separate verification, separate index report, separate sitemap submission.

4. **The two subdomains are tied together via Organization schema's `sameAs`** and via natural cross-linking (marketing pages link to `/register` and `/careers` — those internal links pass authority across the subdomain boundary). Google's entity graph then understands they are one organisation.

---

## Fixing "Discovered – currently not indexed"

This is your current GSC state for 4 of 5 pages. Here is what it actually means and what moves the needle.

**What it means**: Google has crawled the sitemap, fetched the page, and decided it's not worth indexing *right now*. Reasons:

- Site is new / has low authority signals.
- Page content is shallow or substantially similar to the homepage.
- Crawl budget exhausted (very rare on a 5-page site, but possible if there are infinite-loop URL variants).
- Page quality scoring is borderline.
- Internal linking to those pages is weak (Google uses link strength to infer priority).

**What actually fixes it** (in priority order):

1. **Strengthen internal linking**. Every "leaf" page should be linked from the homepage *and* at least one other page with relevant anchor text. The footer counts but counts less than in-body links. Add contextual links from the hero / features / FAQ to `/pricing`, `/resources`, `/contact`.
2. **Deepen page content**. A pricing page should be 600+ words of useful copy, not a card grid. Resources, contact, terms — same. Google's quality classifier penalises "thin" pages.
3. **Add Course / Service / Review schema** so each page surfaces a rich result eligible.
4. **Honest `lastmod`**. Update `sitemap.xml` lastmod when a page *actually* changes — Google has gotten very good at detecting fake freshness signals. Don't game it.
5. **Request indexing manually for each page in GSC** (URL Inspection → Request Indexing). Limited to ~10 / day. Do it once per page, then *don't* spam — re-requesting the same URL hurts.
6. **Earn external links**. One credible backlink (an education blog, parenting site, UK directory) is worth ten internal optimisations. Reach out, get listed, be cited.
7. **Pass Core Web Vitals**. LCP < 2.5s, INP < 200ms, CLS < 0.1. Currently the site is well-positioned (bundle ~150kB gz, AVIF images, lazy YouTube) — but verify quarterly via PageSpeed Insights.
8. **Click "Validate Fix" only after a real change**. Repeated failed validations train Google to deprioritise this property.

Realistic timeline: 4–8 weeks from real fixes to indexation for a low-authority new domain.

---

## Schema.org strategy — "think like Tesla"

The big-brand pattern is a **connected entity graph**: every important thing on the site is a node, every page declares its nodes, and they all reference each other via `@id` and `sameAs`. That graph is what powers Knowledge Panels, rich results, and LLM citations.

For Dr Tutor, the graph should include:

| Schema type | Where it lives | Status |
|---|---|---|
| `EducationalOrganization` | `HomePage.tsx` | ✅ exists, `sameAs` empty |
| `WebSite` | `HomePage.tsx` | ✅ |
| `BreadcrumbList` | every page | ✅ home only — add to all |
| `FAQPage` | `HomePage.tsx` (FAQ section) | ✅ |
| `Service` | pricing page (one per tier × stage, or a single ServiceCatalog) | ❌ |
| `Course` | resources page or per-subject pages | ❌ |
| `Person` | each tutor card, also a `/tutors/<slug>` route eventually | ❌ |
| `Review` + `AggregateRating` | testimonials section + pricing page | ❌ — would unlock star-ratings in SERP |
| `VideoObject` | `FeaturedVideoSection.tsx` | ❌ — easy ship |
| `Organization` (Platform) | Platform repo, with `sameAs` pointing back to www.drtutor.uk | ❌ — coordinate with Platform repo |

`Person` for tutors is unusually powerful for a tutoring brand — each tutor becomes a discoverable entity. Combined with `Review` schema, you can earn rich results that show tutor names + ratings directly in SERPs.

---

## LLM SEO — the new playbook

LLMs ingest content very differently from Googlebot. Three rules:

**1. Be quotable.** LLMs love short, factual, self-contained sentences they can cite verbatim. "Every Dr Tutor is PGCE-qualified" is better than "Our tutors have excellent credentials." Replace fluff with claims.

**2. Be structured.** `llms.txt` (already shipping) gives crawlers a curated index of what to read. JSON-LD lets them parse the entity graph without inferring. The cleaner the structure, the more reliably you get cited.

**3. Be cited.** LLMs preferentially cite content that has *external* citations to it. Same as Google. Build authority off-site.

What we already do right:
- `llms.txt` + `llms-full.txt` exist and are well-structured ✅
- robots.txt explicitly allows AI bots ✅
- JSON-LD is on every page ✅

What to ship next:
- Add a small **"Cite us"** block to each high-value page with a canonical short claim ("Dr Tutor is the UK's PGCE-qualified science tutoring service for KS2–A-Level.") that LLMs can lift verbatim.
- When `Review` schema lands, mirror the rating data inside `llms-full.txt` so LLMs can quote it.
- Maintain a `/changelog` or `/news` route eventually — LLMs love dated factual updates.

---

## Traditional SEO checklist (audit + ship)

| Item | State | Action |
|---|---|---|
| One H1 per page | needs audit | Audit each route — only one `<h1>` per page |
| Meta description ≤ 160 chars | ✅ | Keep |
| Image `alt` text | needs audit | Every `<img>` in `src/components/` should have meaningful alt |
| `loading="lazy"` below the fold | partial | Audit hero composites + section images |
| Canonical URL | ✅ via SEO component | Keep |
| `og-image.png` 1200×630 | ✅ | Keep |
| Mobile-friendly | ✅ | Keep |
| HTTPS only | ✅ Vercel default | Keep |
| `robots.txt` | ✅ | Add Platform sitemap line when ready |
| `sitemap.xml` | ✅ | Honest lastmod updates per change |
| Hreflang | not needed | UK-only |
| 404 / soft-404 | needs verify | Ensure unknown routes show a real 404, not the homepage |
| Trailing-slash policy | needs verify | Vercel default behaviour is fine; pick one and canonical it |

---

## Performance — the SEO multiplier

Core Web Vitals are a real ranking factor and an indirect LLM signal (slower pages get less crawl budget, less freshness, less authority). Targets:

- **LCP** < 2.5s — currently strong (no above-the-fold blocking)
- **INP** < 200ms — strong (motion is GPU-accelerated, animations don't block main thread)
- **CLS** < 0.1 — verify the featured video lightbox doesn't shift layout on open
- **TTFB** < 0.8s — Vercel edge handles this

Quarterly: run PageSpeed Insights on `/`, `/pricing`, `/resources`. Anything below 90 mobile = investigate.

---

## Multi-subdomain coordination (this repo ↔ Platform repo)

The two repos are sibling marketing + product. SEO should treat them as one brand, two surfaces.

| Concern | This repo (`www.drtutor.uk`) | Platform repo (`platform.drtutor.uk`) |
|---|---|---|
| Sitemap | `/sitemap.xml` (this) | Build `/sitemap.xml` listing `/register`, `/careers` etc. |
| robots.txt | Declares both sitemaps | Declares both sitemaps |
| GSC property | `drtutor.uk` (Domain property covers both subdomains) **or** two separate URL-prefix properties | Same |
| Canonical | Each page canonical to its own URL | Same |
| Organization JSON-LD | `EducationalOrganization` with `sameAs: [platform URL, socials]` | `Organization` with `sameAs: [www URL, socials]` |
| Cross-links | Hero / nav / footer CTAs link to `platform.drtutor.uk/{register,careers}` ✅ | Platform footer should link back to `www.drtutor.uk` |

**Recommendation**: add `drtutor.uk` (without `www`) as a **Domain property** in GSC — this covers all subdomains in one report and is the cleanest setup for a multi-subdomain estate.

---

## Action checklist

### Immediate (this repo, ready to ship)
- [ ] Add the 3 social URLs + `https://platform.drtutor.uk/` to `organizationSchema.sameAs` in `HomePage.tsx`. (Owner: us, on next "yes" from Aayan.)
- [ ] Add `VideoObject` JSON-LD to `FeaturedVideoSection.tsx` (name, description, thumbnailUrl, uploadDate, embedUrl, contentUrl).
- [ ] Add `BreadcrumbList` + page-specific JSON-LD to `PricingPage`, `ResourcesPage`, `ContactPage`, `TermsPage`.
- [ ] Update `sitemap.xml` lastmod when a page genuinely changes (no gaming).

### Soon (this repo, more work)
- [ ] Add `Service` schema for the tutoring tiers on `PricingPage`.
- [ ] Add `Person` schema for each named tutor on the homepage.
- [ ] Add `Review` + `AggregateRating` schema to back the 4.97 / 500+ claim.
- [ ] Audit all `<img>` alt text + `loading="lazy"` discipline.
- [ ] Deepen `/pricing`, `/resources`, `/contact`, `/terms` copy to break the "thin content" classification.

### Cross-repo (coordination with `../DrTutor Platform/`)
- [ ] Build `/sitemap.xml` in the Platform repo listing `/register`, `/careers`.
- [ ] Mirror robots.txt — declare both sitemaps + AI bot whitelist.
- [ ] Add `Organization` JSON-LD on the Platform with `sameAs` pointing back here.
- [ ] Add a "back to www.drtutor.uk" link in the Platform footer.

### Off-repo (operational, Aayan)
- [ ] In GSC, add `drtutor.uk` as a **Domain property** (covers all subdomains).
- [ ] In GSC, manually request indexing for `/pricing`, `/resources`, `/contact`, `/terms` (URL Inspection → Request Indexing — once each, don't spam).
- [ ] Submit the (eventual) Platform sitemap once built.
- [ ] Add the site to **Bing Webmaster Tools** (cheaper traffic, less competitive).
- [ ] Start a backlink outreach list: UK education directories, parent blogs, GCSE revision sites.

---

## What to ignore (anti-patterns)

- Keyword stuffing in meta tags — Google ignores keywords meta entirely.
- Hidden text, white-on-white SEO blocks — manual penalty risk.
- AI-generated thin content for ranking — Google's helpful-content system flags it; LLMs won't cite it.
- Mass directory submissions — most are toxic in 2026.
- Fake reviews / aggregateRating — Google audits these; penalty is severe.
- Aggressive `changefreq` / `priority` in sitemap — Google has publicly stated it largely ignores these. Keep them, but honest values.
- Repeatedly clicking "Validate Fix" in GSC without real changes — degrades the property's trust signal.

---

## Sources of truth (link out for the latest)

- **Search Central** — https://developers.google.com/search
- **Schema.org** — https://schema.org/docs/schemas.html
- **Web.dev** — https://web.dev (Core Web Vitals + perf)
- **Bing Webmaster** — https://www.bing.com/webmasters
- **llms.txt spec** — https://llmstxt.org/
