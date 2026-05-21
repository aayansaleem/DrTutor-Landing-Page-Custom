# Dr Tutor Outreach System

> Relationship-first LinkedIn-led outreach pipeline for direct parent acquisition. Built for UK + Middle East affluent professional parents. Designed inside UK GDPR / PECR + LinkedIn ToS, scaled by light automation on the research side and **manual quality** on the messaging side.

---

## Why this exists

Dr Tutor's growth is sales-bound — every new student is a real conversation, not a self-serve signup. The website + SEO play (see `../SEO-90-DAY-PLAN.md`) handles **inbound** demand. This system handles **outbound** — proactively finding the families most likely to become high-LTV clients and starting a relationship.

The market we're targeting:
- **UK** — affluent professional parents in all regions, kids aged 7–18
- **Middle East** — UAE / Qatar / Kuwait / Saudi families targeting UK education for their children, looking specifically for PGCE-qualified, British-accent tutors

These two segments share a common attribute: **they will pay premium rates for quality and authenticity**. They are not the bargain-hunter parent. They are the "this matters too much to compromise" parent.

---

## The five-step legal funnel

This is the system in one diagram. Everything in these docs hangs off this.

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. RESEARCH                                                      │
│    LinkedIn MCP + Sales Navigator pull profiles matching ICP.    │
│    Stored in HubSpot CRM. No outreach yet.                       │
└────────────────────────┬────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. CONNECT                                                       │
│    Personal LinkedIn connection request with thoughtful note.    │
│    Not a pitch. Limit: 15–20/day total. Governed by LinkedIn ToS │
│    (PECR does not apply to LinkedIn messages).                   │
└────────────────────────┬────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. CONVERSE                                                      │
│    Once connected, value-first DM. Ask about their kids' stage / │
│    learning challenges. Listen. Build trust over 2–4 messages.   │
└────────────────────────┬────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. CONSENT                                                       │
│    Soft ask: "Mind if I send you a short overview by email?"     │
│    THIS IS THE PECR-COMPLIANT BRIDGE. They consent → we can      │
│    legally email them. They decline → we stay on LinkedIn.       │
└────────────────────────┬────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. CONVERT                                                       │
│    Permissioned email from outreach.drtutor.uk with a free       │
│    assessment booking link → trial session → signed student.     │
└─────────────────────────────────────────────────────────────────┘
```

**Why this works.** Every step in the chain is something the prospect *agreed to*. The result is the opposite of spam: a slow, premium, conversation-led acquisition channel that compounds over months. The lifetime value of a single signed family (£200–£500/month × 12+ months) makes even a 1% conversion rate enormously profitable.

**Why this is legal.** Step 4 is the bridge. We never pure-cold-email parents — we always have explicit DM consent first. ICO has been clear: this pattern is PECR-compliant. See `LEGAL-GDPR-PECR.md` for the chapter and verse.

---

## Doc map

| File | Read for |
|---|---|
| [`STRATEGY.md`](./STRATEGY.md) | The full system: ICP, audience definitions, segmentation (UK vs ME), positioning, scale model, integration with the SEO plan |
| [`LEGAL-GDPR-PECR.md`](./LEGAL-GDPR-PECR.md) | Exactly what is and isn't legal under UK GDPR + PECR, the consent-bridge pattern, ICO precedent, ME jurisdictional notes |
| [`30-DAY-PILOT.md`](./30-DAY-PILOT.md) | The day-by-day pilot. KPIs, success thresholds, decision tree at day 30 |
| [`MESSAGE-TEMPLATES.md`](./MESSAGE-TEMPLATES.md) | Connection notes, DM scripts, consent-ask, email follow-up — UK + ME variants, never spammy |
| [`TOOLING.md`](./TOOLING.md) | LinkedIn MCP + Sales Nav + Hunter/Apollo + HubSpot + Instantly setup. Costs, DNS for `outreach.drtutor.uk`, warm-up sequence |
| [`DAILY-CADENCE.md`](./DAILY-CADENCE.md) | The 60–90 min daily routine. Ban-safe rate limits. What to do when LinkedIn flags activity |

---

## How outreach + SEO work together

Outreach is not a replacement for SEO — it's a **complement**. The two systems amplify each other:

- Every LinkedIn connection request that lands at the Dr Tutor profile is an impression. Even non-converters increase brand recognition.
- People you DM may search "Dr Tutor reviews" later — strong SEO + GBP reviews close the loop.
- A founder who is publicly visible on LinkedIn (commenting on education content, engaging with parents) generates the kind of mentions LLMs cite when answering "best UK online tutor".
- Permissioned-email recipients who don't convert immediately are still brand mentions waiting to happen.

The 90-day SEO plan (`../SEO-90-DAY-PLAN.md`) and this outreach pilot should run **in parallel** from Day 1, not sequentially. They feed each other.

---

## North-star metrics — 30-day pilot

| Metric | Target |
|---|---|
| Connection requests sent | 450 (15/day × 30) |
| Connection acceptance rate | ≥ 25% (112+ acceptances) |
| Conversations started (≥ 2 message exchange) | ≥ 35 |
| Email consent given | ≥ 12 |
| Trial assessments booked | ≥ 5 |
| Students signed | ≥ 2 |

Full KPI dashboard + decision tree at day 30: `30-DAY-PILOT.md`.

---

## Tool stack at a glance

| Layer | Tool | Monthly cost |
|---|---|---|
| Research | LinkedIn MCP + Sales Navigator | ~£60 (Sales Nav) |
| Email enrichment | Hunter.io | Free → £40 |
| CRM | HubSpot free tier | £0 |
| Email sending | Instantly or Smartlead from `outreach.drtutor.uk` | £30–£60 |
| Domain warm-up | Instantly's built-in or Lemwarm | (bundled) |
| Daily tracker | Notion or Google Sheets | £0 |

**Total: £130–£160/month** to run the system, once set up.

Setup-time investment: ~10 hours over 2 weeks (DNS + warmup + CRM templates + saved searches + first message templates).
