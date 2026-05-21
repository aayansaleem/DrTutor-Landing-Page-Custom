# 90-Day SEO Boost Plan — Dr Tutor

> **Drafted 2026-05-21. Target completion 2026-08-19.** Built on competitive R&D (sources verified live on 2026-05-21). For the underlying playbook see `docs/SEO.md`.

---

## The starting position (be honest)

Live competitive research surfaced an uncomfortable truth: **`drtutor.uk` does not rank on page 1 for "drtutor"**. The brand SERP is owned by other entities, in order of strength:

| Domain | Country | What they do | Threat level |
|---|---|---|---|
| **drtutor.net** | UK-priced (intl.) | Professional certs (PMP, PRINCE2, ITIL, Scrum) — **#1 with sitelinks** | High (owns the brand SERP) |
| **drtutor.com.au** | Australia (QLD) | Bio / Chem / Physics tutoring — **same subjects** | High (subject overlap) |
| drtutor.co.uk | UK (London) | English / ESOL / IELTS school aggregator | Medium |
| drtutor.org | US-leaning | Free K-12 ELA + Science activities | Medium |
| dr-tutor.co.uk | UK | UCAT / medical-school admissions | Low (different niche) |
| DRTUTOR LTD #16076105 | UK Companies House | Watford-registered ed-support company (Nov 2024) | Likely Aayan's own entity → confirm + link from footer for entity unification |

For "dr tutor uk" we manage #2. For "drtutor" we are nowhere.

**Other gaps the research surfaced** (drives every sprint below):

- Every top UK competitor (MyTutor, Tutorful, Spires, Sherpa, Study Mind, etc.) ships **per-subject + per-level landing pages** (`/gcse-biology-tutor`, `/a-level-chemistry-tutor`). We have none.
- All top competitors ship **FAQ schema + Review schema with visible star ratings**. We have FAQ schema only on the homepage and zero Review schema (despite the hero claiming 4.97 from 500+ reviews).
- Every "best of UK online tutor" listicle and Reddit recommendation thread surfaced — **Dr Tutor is absent**. That's the LLM-citation gap; LLMs cite what listicles cite.
- Google Business Profile exists (5.0 / **4 reviews**, London area). MyTutor sits at 4.3 / 448, Tutorful at 3.5 / 335. We are dramatically under-reviewed — but with the best rating. Cheapest possible authority win.

---

## North-star metrics (day 1 → day 90)

| Metric | Start | Day 90 target |
|---|---|---|
| Pages indexed (GSC) | 1 / 5 marketing routes | 12+ (5 marketing + 6 subject/level + 4 tutor profiles) |
| Brand SERP position for "drtutor" | Not on page 1 | Top 3 |
| Brand SERP position for "dr tutor uk" | #2 | #1 |
| GBP reviews | 4 | 30+ |
| UK directory listings (live, dofollow or nofollow) | ~0 | 15 |
| Earned external links from outreach (guest post / listicle / forum) | 0 | 8 |
| LLM citations (Perplexity / ChatGPT / Claude / Gemini for "best UK online science tutor") | 0 | 3+ |
| Trustpilot rating | None | 4.5+ with 15+ reviews |

---

## Sprint plan — 6 sprints × 2 weeks

Each sprint has a code-side ship (we do) and an operational push (Aayan does). Both must move together.

### Sprint 1 (Days 1–14) — Foundation lock-in

**Code ships (this repo):**
- Populate `organizationSchema.sameAs` in `HomePage.tsx` with the 3 social URLs + `https://platform.drtutor.uk/`.
- Add `VideoObject` JSON-LD to `FeaturedVideoSection.tsx` (name, description, thumbnailUrl, embedUrl, uploadDate).
- Add `BreadcrumbList` schema **and** a visible `<Breadcrumb />` UI component on `/pricing`, `/resources`, `/contact`, `/terms`. Brand-teal aesthetic, lives in `src/components/ui/`.
- Refresh `sitemap.xml` lastmod for any page that changed; leave the rest honest.
- Audit every `<img>` alt text + `loading="lazy"` discipline (one Explore agent pass).
- Cross-repo: build `/sitemap.xml` in `../DrTutor Platform/` listing `/register` and `/careers`. Add AI-bot whitelist to its `robots.txt`. Add `Organization` schema with `sameAs` pointing back to `www.drtutor.uk` + socials.

**Operational (Aayan):**
- In GSC: add `drtutor.uk` as a **Domain property** (covers all subdomains in one report).
- In GSC URL Inspection: request indexing for `/pricing`, `/resources`, `/contact`, `/terms` — **once each**, do not spam.
- Add the site to **Bing Webmaster Tools**. Import from GSC for fast bootstrap.
- Confirm DRTUTOR LTD #16076105 is your entity. If yes, add the registered address + company number to the footer (legal-required for UK ltd anyway, and helps entity disambiguation).
- GBP: add 10+ photos (logo, lesson screenshots, tutor headshots), set proper categories (Tutoring Service, Educational Service), fill out Services with the three tiers, add a weekly "Post" (Google rewards active profiles).

### Sprint 2 (Days 15–28) — Content depth + directory blitz

**Code ships:**
- Deepen `/pricing` to 600+ words: methodology, FAQ, "what's included" expansion, comparison to industry rates.
- Same treatment for `/resources` (add download teasers + use-case copy) and `/contact` (add response-time SLA, support hours, channel list).
- Add `Service` schema to pricing tiers — `Service > offers > Offer > price + priceCurrency + priceSpecification`.
- Ship a `/blog` (or `/insights`) route with proper RSS + Atom feed. First 5 anchor posts:
  1. "Best online science tutors UK 2026 — honest comparison" (flagship — LLM citation bait)
  2. "How to pass GCSE Biology: the PGCE-approved 12-week plan"
  3. "A-Level Chemistry: the 5 topics that swing your grade"
  4. "11+ Science prep — what actually gets tested"
  5. "Why your KS3 child finds science boring (and how to fix it)"

**Operational:**
- Submit to the top 10 UK tutor directories from the R&D list — all free or freemium:
  - TuitionList, Superprof UK, FindTutors UK, Tutor Hunt, UK Tutors, The Tutors Directory, Home Tutors Directory, Tutorspot, In-Tune (beta), TutorFinder UK.
- Bark UK — set up lead-receiver profile (paid per lead but the directory listing is a brand-mention win even if you decline leads).
- Start a GBP review-collection campaign: email the last 30 client families with a one-click Google review link. Realistic conversion: 25–30%, so expect 8–10 new reviews.
- Set up **Trustpilot** business profile (free tier). Start collecting reviews in parallel.

### Sprint 3 (Days 29–42) — Subject + level landing pages

This sprint closes the structural gap with MyTutor / Tutorful / Spires.

**Code ships:**
- Eight new landing pages, all under `/tutors/<slug>`:
  - `/tutors/ks2-science`
  - `/tutors/ks3-science`
  - `/tutors/gcse-biology`
  - `/tutors/gcse-chemistry`
  - `/tutors/gcse-physics`
  - `/tutors/a-level-biology`
  - `/tutors/a-level-chemistry`
  - `/tutors/a-level-physics`
  - (+`/tutors/11-plus-prep` if it fits in this sprint)
- Each page: 800+ words, single-purpose `<h1>`, `Course` + `FAQPage` + `BreadcrumbList` JSON-LD, an embedded "matching" CTA pointing at `platform.drtutor.uk/register`.
- Page template lives in `src/components/pages/SubjectLevelPage.tsx`; content data in `src/data/subjectLevels.ts` so adding more later is a data change, not a code change.
- Add each new URL to `sitemap.xml` with honest lastmod.

**Operational:**
- Once the first three pages are live, submit those URLs in GSC for indexing.
- Begin Reddit seeding: identify 3 high-engagement threads/week on `/r/GCSE`, `/r/alevel`, `/r/ukeducation` where a substantive PGCE-led answer adds value. Link to the relevant subject page only when truly helpful (heavy-handed promotion gets shadow-banned). The goal isn't traffic; it's the org-name mentions LLMs will later cite.

### Sprint 4 (Days 43–56) — Authority + outreach

**Code ships:**
- `Review` + `AggregateRating` schema on `HomePage.tsx` — but **only with real verifiable data**. If the 4.97 / 500+ claim cannot be evidenced (Trustpilot + GBP + first-party combined), trim it to the verifiable number. Google audits aggregateRating; faking it earns a manual penalty.
- Add a `/reviews` page surfacing Trustpilot + GBP reviews via official widgets (no fakery).
- Anchor post #6: "Dr Tutor vs MyTutor vs Tutorful — what UK parents should actually compare". Cite real public pricing where applicable. This becomes the brand-comparison page LLMs love.

**Operational — outreach (the 90-day fulcrum):**
- **Listicle inclusion pitches** — send personal, evidence-based pitches to:
  1. thirdspacelearning.com/blog/best-online-tutoring-websites-uk (highest-DA UK listicle)
  2. findtutors.co.uk/blog/best-tutoring-websites
  3. spires.co/online-tutors/10-best-online-tutoring-platforms-uk
- **Parent-blog guest post outreach** — pitch 1500-word science revision guides to:
  1. theparentsguideto.co.uk
  2. mummyvswork.co.uk
  3. brightheart.co.uk
  4. atomlearning.com/blog
  5. wolseyhalloxford.org.uk/blog-and-news
- **Add `<author>` bylines** with `Person` schema on every blog post — outbound credibility for the writer + inbound entity signals for Dr Tutor.

### Sprint 5 (Days 57–70) — Tutor profiles + review push

**Code ships:**
- Four tutor profile pages, one per existing tutor in `src/data/tutors.ts`:
  - `/tutors/profile/dr-falak`
  - `/tutors/profile/mr-ahmed`
  - `/tutors/profile/mr-el-hendi`
  - `/tutors/profile/ms-ekrami`
- Each: `Person` schema (jobTitle, alumniOf, knowsAbout, image, sameAs to LinkedIn if available), an `AggregateRating` for that tutor (use real numbers from `data/tutors.ts` review counts), a bio, subjects + levels covered, and a "Book a session" CTA.
- Update the `TutorsSection` cards to deep-link into each profile.
- `BreadcrumbList`: Home → Tutors → [Tutor Name].

**Operational:**
- GBP review collection sprint #2 — target 12 more reviews this sprint (cumulative 20+).
- Trustpilot review collection — target 15 reviews.
- Confirm at least one of the four listicle pitches landed; chase if not.

### Sprint 6 (Days 71–90) — Polish, measure, double-down

**Code ships:**
- Core Web Vitals pass on every new page — LCP < 2.5s, INP < 200ms, CLS < 0.1. Run PageSpeed Insights on `/`, `/pricing`, and 3 subject pages. Investigate anything below 90 mobile.
- `OG:image` variants per landing page (subject-specific OG images so social shares look intentional).
- Schema audit: pass every page through Google's Rich Results Test. Fix any warnings.
- Sitemap final: every new page added with honest lastmod. Confirm no orphan URLs (each indexable URL is linked from at least two other pages).

**Operational:**
- GSC: review which pages moved from "Discovered" to "Indexed". For any stragglers, hit "Request Indexing" once more.
- Bing Webmaster: confirm sitemap re-crawled.
- Listicle results: confirm at least 3 inclusions. If not, chase + add 2 more pitches.
- LLM citation check: ask Perplexity, ChatGPT, Claude, and Gemini "best UK online science tutors" — count Dr Tutor mentions.
- Compile a Day-90 report (rankings, indexed count, reviews, backlinks, citations) — keeps us honest for the next 90.

---

## Companion checklists

### Quick wins available right now (Day 1 ships, < 1 hour each)
- Populate `organizationSchema.sameAs` (data already in hand — 3 social URLs + Platform).
- Honest `sitemap.xml` lastmod refresh.
- GBP — request 5 reviews from recent families via email.
- Add the company number + registered address to the footer (if DRTUTOR LTD is yours).
- Submit to TuitionList + Superprof UK + Tutor Hunt (3 free directories, ~30 min total).

### What NOT to do
- Don't buy backlinks. Even "premium" link networks earn manual penalties in 2026.
- Don't generate AI thin content to fill the blog. Google's helpful-content classifier flags it; LLMs won't cite it.
- Don't claim 4.97 / 500+ in `aggregateRating` unless verifiable. Trim the claim to honest numbers if needed.
- Don't keyword-stuff title tags. Stick to "<benefit>, <brand>" format under 60 chars.
- Don't re-request indexing more than once per URL. Repeat requests degrade trust.

---

## Risks to track

| Risk | Mitigation |
|---|---|
| drtutor.net / drtutor.com.au increase their authority during this 90-day window | We can't control them; we control our entity graph + brand mention velocity. Sprints 1, 4, 6 directly target this. |
| Reddit / forum seeding looks promotional and gets shadow-banned | Always lead with value; link only when genuinely relevant; don't post from a brand-named account — use a real-person account that *discloses* affiliation when asked. |
| Listicle pitches all decline | Two backup paths: pay for sponsored inclusion (transparent), or build a stronger flagship comparison post and earn links naturally over months. |
| Aggressive `aggregateRating` invites a Google manual action | Only ship verifiable numbers. Use Trustpilot + GBP widgets that pull live data, not hardcoded counts. |
| Cross-repo coordination drift (Platform sitemap not built) | Schedule a check-in with the Platform owner at end of Sprint 1. Without it, the multi-subdomain strategy is half-built. |

---

## Closing — why this works

Two truths the giants live by, which this plan respects:

1. **Authority is earned slowly, then compounds suddenly.** Sprints 1–3 are foundation. Sprints 4–6 are when rankings start to move. Day 90 is not the destination; it's the inflection point. If the foundation is honest, the curve goes up for years.
2. **The same content wins for Google and for LLMs.** Deep, structured, factually-precise, schema-rich content with real authorship and external citations ranks for traditional search **and** gets quoted by ChatGPT / Perplexity / Claude / Gemini / AIO. Build once, rank everywhere.

When in doubt, ask: *"Would a journalist citing this page feel comfortable that the claim is verifiable?"* If yes, ship it. If no, fix it first.
