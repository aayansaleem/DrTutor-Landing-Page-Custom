# 30-Day Outreach Pilot

> The point of the pilot: discover whether this channel actually converts for Dr Tutor at the predicted rates, before investing in scaling tooling, VAs, or paid software stacks. Daily plan, decision tree at Day 30.

---

## Pilot dates

- **Start**: TBC — typically the Monday after `outreach.drtutor.uk` subdomain warm-up completes (~Day 14 of warm-up). Estimate: 2026-06-09 if tooling setup starts immediately.
- **End**: 30 calendar days later.

If `outreach.drtutor.uk` warm-up runs in parallel with LinkedIn-only weeks, the email-send portion comes online during Week 3 of the pilot.

---

## Daily target — total volume across UK + ME

| Activity | Daily volume | Weekly | 30-day total |
|---|---|---|---|
| Profiles researched + added to CRM | 25 | 150 (6 days/wk) | 600 |
| Connection requests sent | 15 (10 UK + 5 ME) | 90 | 360 |
| Follow-up messages (to accepted connections) | 10 | 60 | 240 |
| Permissioned emails (week 3+ only) | 5 | 30 | 60 |
| Replies / conversation tending | as needed | — | — |
| Daily tracker update | 5 min | — | — |

Six days/week (Sun–Fri to align with both UK and ME working weeks — ME weekend is Fri–Sat in some countries, Sat–Sun in others, but most professionals are reachable across the full Sun–Thu band).

---

## North-star metrics (30-day targets)

| Metric | Target | Stretch |
|---|---|---|
| Connection requests sent | 360 | 450 |
| Connection acceptance rate | 25% | 35% |
| Total new connections | 90+ | 150+ |
| Conversations (≥2 message exchange) | 25 | 40 |
| Email consent given (PECR-bridge) | 8 | 15 |
| Trial assessments booked | 4 | 8 |
| Students signed | 2 | 4 |
| Cost per signed student | < £80 | < £40 |

These numbers come from blended industry conversion data + Dr Tutor's expected premium positioning. ME prospects are expected to over-index on conversion (premium fit) but under-index on connection acceptance (lower familiarity).

---

## Week-by-week plan

### Week 1 — Setup + warm-up start

No outreach sent. Foundation work only.

| Day | What |
|---|---|
| 1 | Pay for Sales Navigator (£60/mo). Set up the saved searches: "ICP-A UK" and "ICP-B ME". |
| 2 | Sign up HubSpot free tier. Create properties: `segment`, `city`, `kid_stage_guess`, `source`, `touch_count`, `dm_consent_screenshot`, `consent_date`. |
| 3 | Set up DNS for `outreach.drtutor.uk` (see `TOOLING.md`). SPF + DKIM + DMARC + MX records. Verify in MX Toolbox. |
| 4 | Sign up Instantly. Connect `outreach.drtutor.uk`. Start automated warm-up (will run ~14 days). |
| 5 | Write the 8 message templates (3 connection notes, 2 DMs, 1 consent ask, 2 email follow-ups) — UK and ME variants. See `MESSAGE-TEMPLATES.md`. |
| 6 | Build the Notion / Sheets daily tracker (template in `DAILY-CADENCE.md`). |
| 7 | Day off — let warm-up keep running. |

### Week 2 — LinkedIn-only outreach begins

Email subdomain still warming. Pure LinkedIn play.

| Day | What |
|---|---|
| 8 | First 10 connection requests (6 UK + 4 ME). Read templates twice before sending — personalisation matters. |
| 9 | 15 connection requests. Tend any replies from yesterday's accepted connections (some come in fast). |
| 10 | 15 requests. First follow-up DMs to anyone accepted ≥ 2 days ago. |
| 11 | 15 requests + tending. Note acceptance rate — gut-check by Day 4 of sending. |
| 12 | 15 requests + tending. If acceptance < 15%, pause and tweak connection-note templates. |
| 13 | Day off. Acceptance rate should be settling around 20–35%. |
| 14 | 15 requests + tending. Sanity-check Sales Nav filters — bin any false-positives showing up. |

### Week 3 — Email layer comes online

Warm-up complete (~Day 14). Email enabled for prospects who said yes in DM.

| Day | What |
|---|---|
| 15 | 15 requests + tending. First permissioned email send (likely 0–2 recipients only — that's normal). |
| 16 | 15 requests + tending. Email replies start trickling. Reply same-day, always. |
| 17 | 15 requests + tending + 1–3 emails. Trial booking link should be in every consent-email. |
| 18 | First trial assessment booked? If yes, celebrate quietly and run a great session. |
| 19 | 15 requests + tending + emails. Reflect: which segment (UK vs ME) is converting better? |
| 20 | Day off. Compile mid-pilot stats. |
| 21 | 15 requests + tending + emails. |

### Week 4 — Iterate + close

Templates have been A/B'd informally. Conversion rate signals are emerging.

| Day | What |
|---|---|
| 22 | 15 requests + tending + emails. Variant the message templates that underperform. |
| 23 | 15 requests + tending. Push for trial bookings from any "yes-but-not-yet" leads. |
| 24 | 15 requests + tending + emails. |
| 25 | 15 requests + tending + emails. Second trial assessment likely happening this week. |
| 26 | 15 requests + tending + emails. |
| 27 | Day off. |
| 28 | 15 requests + tending + emails. Final week — focus on closing existing conversations rather than adding new ones. |
| 29 | Same. Last day of outreach sending. |
| 30 | **Pilot review day**. Pull every number. Decide next step (see decision tree below). |

---

## Decision tree at Day 30

Compute the pilot scorecard:

```
A. Students signed
B. Trials booked
C. Connection acceptance rate %
D. Conversation conversion rate (accepted → ≥2 messages)
E. UK vs ME conversion delta
```

### Path 1 — Scale (A ≥ 2)
- Channel works at this volume.
- Hire VA for the research layer (Day 31+). VA pulls profiles + drafts personalisation notes; you approve + send.
- Push outbound volume to 20–25 requests/day.
- Open a second saved search (e.g. ME by alumni filter).
- Set monthly outreach budget: ~£200/mo (tools + VA).

### Path 2 — Tune (B ≥ 4 but A = 0–1)
- Top-of-funnel works; bottom of funnel is broken.
- Focus the next 30 days on **conversion not acquisition**.
- Watch trial sessions. Are they being run well? Is the parent leaving the trial wanting more?
- Re-examine pricing presentation, trial-to-paid handoff, post-trial follow-up cadence.
- Keep outreach volume flat; rerun pilot KPIs at Day 60.

### Path 3 — Iterate (C < 20% OR D < 25%)
- Top of funnel itself is weak.
- Iterate message templates (connection notes especially).
- Tighten Sales Nav filters — maybe ICP signals are too broad.
- Try variant message angles: "free curriculum guide for parents" vs current positioning.
- Run another 30 days. Same KPI thresholds.

### Path 4 — Pivot (B ≤ 2 AND A = 0)
- Channel-fit failure for direct B2C.
- Pivot the entire tooling stack at the B2B reframe (schools, corporate benefits, tutor recruitment).
- Same infrastructure, different ICP, different message templates.
- Re-run a 30-day pilot at B2B targets.

### Path 5 — Pause
- If even the pivot looks unviable after 60 days total: pause this channel.
- Double down on SEO (`../SEO-90-DAY-PLAN.md`), GBP reviews, referrals.
- Outreach docs stay — pick back up in 6 months if SEO is plateauing.

---

## What we'll know at Day 30

Quantitatively:
- Which segment converts better (UK vs ME).
- Which cities over-index (will inform paid-ads geo-targeting later).
- Realistic cost-per-signed-student for this channel.
- Realistic time investment per signed student.

Qualitatively (record these — they shape the brand):
- The 3 most common objections heard on LinkedIn DM.
- The 3 most common "joy moments" — what parents loved when they replied positively.
- Whether ME prospects bring up boarding school / UK uni admission (validates the premium thesis).
- Whether anyone got annoyed and asked us to remove their data (process for that lives in `LEGAL-GDPR-PECR.md`).

That qualitative data is more valuable than the numbers. The numbers tell us *whether* to scale; the conversations tell us *how* to scale.
