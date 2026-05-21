# Outreach Strategy

> The full system blueprint. ICP, audience segmentation, positioning, scale model, integration with the rest of the brand. Read this before building anything.

---

## Ideal Customer Profile (ICP)

We have **two parallel ICPs**, both addressed by the same pipeline but with different filters, message variants, and follow-up paths.

### ICP-A — UK affluent professional parent

- **Geography**: UK-wide, weighted toward London, Manchester, Birmingham, Edinburgh, Cambridge, Oxford catchments (highest concentration of premium-tutoring spend)
- **Title proxies**: Senior consultant, Director, VP, Partner, Founder, Head of, Senior Doctor, Solicitor, Barrister, Surgeon, Senior Engineer, Senior Banker, Senior Academic
- **Age proxy**: LinkedIn experience ≥ 12 years (suggests 35+)
- **Family signals**: bio mentions "mum/dad of X", parenting columns, school-governor roles, PTA mentions, posts about school holidays, posts about kids' achievements
- **Industry skew**: finance, law, medicine, tech, consulting, academia
- **Why they buy**: high standards for their child's education, value time over money, distrust marketplace tutors, willing to pay £40–£70/hour for the right specialist

### ICP-B — Middle East family targeting UK education

- **Geography**: UAE (Dubai, Abu Dhabi), Qatar (Doha), Kuwait City, Saudi (Riyadh, Jeddah), Bahrain (Manama), Oman (Muscat)
- **Title proxies**: same as ICP-A — senior professionals, business owners, executives
- **Family signals**: same as ICP-A, *plus* alumni of UK universities (LSE, Imperial, UCL, Oxford, Cambridge, Russell Group), alumni of British international schools (GEMS, Repton, Brighton College ME), membership of British community groups
- **Why they buy**:
  - Often planning to send children to UK boarding school / sixth form / university
  - Want British accent + curriculum alignment from day one
  - "PGCE-qualified" is a magnet phrase (vs the local market's mix of non-credentialled tutors)
  - Less price-sensitive than UK parents — premium Specialist tier at £70/hr converts here
  - Strong word-of-mouth networks (one signed family often introduces 2–3 more)

### Anti-ICP — who NOT to pursue

- Anyone who doesn't show signals of being a parent of school-age children. Don't waste connection slots.
- Bargain-hunter parents — they will not pay our rates and won't refer.
- Tutors / education marketplaces / competitors — different funnel entirely (not part of this system).
- People without a clear UK or ME location.

---

## Positioning (what we lead with)

The message stack in priority order. Use these claims **in DMs, never in connection notes** (notes are warm, not pitchy):

1. **Every tutor is PGCE-qualified** — the single strongest credential we can lead with. Distinguishes us from MyTutor / Tutorful (which mix qualified + unqualified).
2. **Personalised 1:1 online** — not group classes, not pre-recorded.
3. **British curriculum mastery** — KS2 → A-Level fully covered (key for ICP-B).
4. **Real-time progress tracking** — parents can see exactly what's improving.
5. **Free assessment** — no commitment, low-friction first step.

For ICP-B specifically, add a sixth: **"Many of our tutors prepare students for UK boarding school / GCSE / A-Level / Oxbridge entry."** This sentence opens doors.

---

## Audience segmentation in the CRM

HubSpot stages mirror the five-step funnel. Each lead is also tagged with:

- **Segment**: `UK` or `ME`
- **City**: London / Dubai / Doha / Riyadh / etc.
- **Kid's stage (best guess from signals)**: `KS2 / KS3 / GCSE / A-Level / Unknown`
- **Source channel**: `LinkedIn / Referral / Inbound`
- **Touch count**: integer, increments per message

This lets us measure:
- UK vs ME conversion rate (we expect ME > UK)
- City-level performance (helps decide where to double down in month 2)
- Stage-level performance (which kid-stage families convert fastest — guides ad targeting later)

---

## The scale model

What is a realistic ceiling for this channel?

Working **15 connection requests/day, 6 days/week, 50 weeks/year**:
- Annual connection requests: ~4,500
- @ 25% accept rate: ~1,125 new connections
- @ 30% turn into ≥2-message conversation: ~340
- @ 35% give email consent: ~120 permissioned leads
- @ 30% book a trial: ~36 trials
- @ 50% trial → student: ~18 new students/year from this channel alone

**Per-student LTV** (4 sessions/month × £55 avg × 18-month avg retention) = **~£4,000**.

**Annualised revenue from outreach at saturation**: ~£72k from a single founder running ~70 min/day.

This is a slow-cooker channel. It compounds. The first month produces ~2 students; month 12 produces 2-3/month plus referrals. By year 2 it could be carrying ~£100k+ ARR on its own.

---

## How this channel relates to the other channels

| Channel | Role | This system's interaction |
|---|---|---|
| **SEO** (`../SEO-90-DAY-PLAN.md`) | Inbound, brand-search capture, indexing | Outreach drives brand searches → SEO catches them. Permissioned-email recipients who don't convert often search the brand later. |
| **GBP reviews** | Local-pack ranking, social proof | Every signed family from outreach should be invited to leave a GBP review (Sprint 5 / Day 10 in `TASKS-SCHEDULER.md`) |
| **Referrals** | Existing-family word-of-mouth | ICP-B signed families especially refer well — build a simple "introduce a friend" perk |
| **Paid ads** (future) | Volume, targeted intent | Outreach learnings define ad targeting later (which titles, cities, kid-stages convert) |
| **Founder-led content** | Authority, trust | Outreach prospects are 5× more likely to convert if they've seen Aayan's LinkedIn content first. Post 1× / week minimum — see DAILY-CADENCE.md |

---

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| LinkedIn account flag / restriction | Stay under 20 connection requests/day. Vary message text. Never use Chrome-extension automation in the messaging layer. |
| Reply rates underperform expectations | Iterate templates weekly. A/B variants. Listen to what people actually say. |
| Email deliverability tanks | Always send from warmed-up subdomain (`outreach.drtutor.uk`), never main domain. Monitor bounce + spam complaints in Instantly. |
| Spam complaint → ICO action | Stay strictly within the consent funnel. Every email recipient has explicitly said "yes, send me info" in DM. Keep the DM screenshot as proof. |
| ME timezone friction | Most ME prospects are UK-aware; sessions in ME afternoons = UK mornings. Standard. |
| Founder burnout | Cap at 6 days/week × 70 min/day. Track in `DAILY-CADENCE.md`. The system is sustainable specifically because it's manual quality, not automation grind. |
| Channel-fit failure (parents really aren't on LinkedIn enough) | 30-day pilot decides this. Defined success thresholds in `30-DAY-PILOT.md`. If pilot fails, pivot the system to B2B (schools / corporate benefits) without re-architecting tooling. |

---

## When to expand / when to stop

After the 30-day pilot, three decision paths:

- **Continue + scale** — if pilot hits ≥ 2 signed students. Same system, push to 20 connection requests/day, hire VA for research-layer work at day 90.
- **Continue + tune** — if pilot hits 5 trials but 0 signed. Conversion problem, not channel problem. Rework trial-to-paid flow.
- **Pivot or pause** — if < 3 trials in 30 days. Channel-fit failure for B2C. Either reroute the tooling at B2B targets (the original reframe) or pause and double down on SEO + GBP.

Either way, the docs + tooling investment is not wasted — the system architecture works for any LinkedIn-driven outreach.
