# Tooling — Outreach Stack

> What we use, why, how to set it up, what it costs. Everything below is **commercial software written by other people** — links + pricing accurate as of 2026-05-21. Verify before signing up.

---

## Stack at a glance

```
┌─────────────────────────────────────────────────────────────────┐
│  Research layer        — LinkedIn MCP + Sales Navigator         │
│  Enrichment layer      — Hunter.io (email lookups)              │
│  CRM layer             — HubSpot free tier                      │
│  Sending layer         — Instantly (warmed-up outreach domain)  │
│  Tracker layer         — Notion or Google Sheets                │
└─────────────────────────────────────────────────────────────────┘
```

Total monthly cost at pilot scale: **~£130–£160/month**. Setup time: **~10 hours over 2 weeks**.

---

## 1. LinkedIn MCP

**Purpose**: Read-only profile research. Pull title, company, city, bio, recent posts. Detect ICP signals (parent indicators, alumni, family mentions). Dump into HubSpot.

**What it is NOT**: A messaging tool. We never use the MCP to send connection requests or DMs. That layer is manual to stay inside LinkedIn ToS.

**Setup**:
- Use whichever LinkedIn MCP server is current at the time of pilot (the ecosystem moves fast; check the MCP registry).
- Authenticate with your personal LinkedIn account.
- Run during normal business hours, at human pace (a few queries per minute, not hundreds).

**Boundary**: if the MCP starts to feel "too automated" (you're not reading any profiles, just bulk-extracting), stop. LinkedIn's detection is downstream of pattern, not API call count.

---

## 2. LinkedIn Sales Navigator

**Purpose**: The advanced filters and saved searches LinkedIn explicitly sells. The only LinkedIn product allowed for scale prospecting.

**Cost**: £59.99/month (Core tier — sufficient for pilot).

**Setup**:
1. Sign up at https://business.linkedin.com/sales-solutions/sales-navigator
2. Use the 30-day trial first if available — covers the entire pilot.
3. Create two **saved searches**:

### Saved search 1 — "ICP-A UK Affluent Parents"

| Filter | Value |
|---|---|
| Geography | United Kingdom |
| Seniority Level | Director, VP, CXO, Owner, Partner |
| Industry | Financial Services, Legal, Healthcare, Management Consulting, Technology, Higher Education |
| Years in Current Position | 3+ |
| Years of Experience | 12+ |
| Keywords (in profile) | parent OR "mum of" OR "dad of" OR "father of" OR "mother of" OR PTA OR "school governor" OR family |

### Saved search 2 — "ICP-B ME British Education"

| Filter | Value |
|---|---|
| Geography | United Arab Emirates, Qatar, Saudi Arabia, Kuwait, Bahrain, Oman |
| Seniority Level | Director, VP, CXO, Owner, Partner |
| School | University of Oxford, University of Cambridge, London School of Economics, Imperial College London, UCL, Russell Group |
| Years of Experience | 12+ |
| Keywords | British OR "British school" OR "UK education" OR boarding OR GCSE OR A-Level OR parent OR family |

Sales Nav alerts you to new profiles matching each search — review daily.

---

## 3. Hunter.io

**Purpose**: Find email addresses for prospects who have given consent in DM. Domain-pattern lookup mainly.

**Cost**: Free tier = 25 searches/month, generous for pilot. Paid tier = £40/month for 500 searches.

**Setup**:
1. Sign up at https://hunter.io.
2. When a prospect consents to email in DM, use Hunter's domain search on their employer to find the email pattern (e.g. `firstname.lastname@company.com`).
3. Verify the email is valid before sending (Hunter has a verifier built in).

**Important**: ONLY use Hunter AFTER explicit DM consent. Pre-emptive email enrichment without consent is a PECR breach.

**Alternative**: Apollo.io — has enrichment + sequencer in one. £40/month equivalent. Useful if you outgrow the Hunter + Instantly split.

---

## 4. HubSpot CRM (free tier)

**Purpose**: Central record of every prospect, their stage, every touch, their consent screenshot.

**Cost**: Free for our use case (free tier handles 1M contacts).

**Setup**:
1. Sign up at https://www.hubspot.com/products/crm.
2. Create the following **custom contact properties**:
   - `outreach_segment` (single-line text): `UK` or `ME`
   - `outreach_city` (single-line text)
   - `outreach_kid_stage_guess` (dropdown): `KS2` / `KS3` / `GCSE` / `A-Level` / `Unknown`
   - `outreach_source` (single-line): default `LinkedIn`
   - `outreach_touch_count` (number): default 0
   - `outreach_dm_consent_screenshot` (file upload)
   - `outreach_consent_date` (date)
   - `outreach_status` (dropdown): `prospected` / `connection_sent` / `connected` / `conversation` / `email_consent` / `trial_booked` / `signed` / `removed`
3. Create a **Deal pipeline** for tracking trial → signed.
4. Create a **List** for each saved search (ICP-A and ICP-B).

---

## 5. Outreach subdomain — `outreach.drtutor.uk`

**Purpose**: A separate sending identity that protects `drtutor.uk` main domain reputation. If outreach gets spam complaints, only the subdomain's reputation takes the hit — `noreply@drtutor.uk` (booking confirmations, password resets) keeps working.

**DNS records** to add in your DNS provider (Vercel, Cloudflare, GoDaddy, whichever hosts drtutor.uk):

| Record | Host | Value | Purpose |
|---|---|---|---|
| MX | `outreach.drtutor.uk` | (whatever Instantly tells you, e.g. `mx.smtp.instantly.ai` priority 10) | Receive bounces |
| TXT (SPF) | `outreach.drtutor.uk` | `v=spf1 include:_spf.instantly.ai ~all` | Authorise Instantly to send as you |
| TXT (DKIM) | `instantly1._domainkey.outreach.drtutor.uk` | (DKIM key from Instantly) | Crypto-sign every email |
| TXT (DMARC) | `_dmarc.outreach.drtutor.uk` | `v=DMARC1; p=quarantine; rua=mailto:dmarc@drtutor.uk; pct=100; aspf=s; adkim=s` | Tell receivers what to do if SPF/DKIM fail |

Verify all four pass at https://mxtoolbox.com after propagation (~30 min to 4 hours).

**Warm-up**: Instantly has built-in domain warm-up. Enable it the moment DNS is verified. It runs ~14 days of artificial-looking real interactions to build sender reputation. Do **not** send real outreach until warm-up is complete — your inbox-placement rate will be terrible.

---

## 6. Instantly

**Purpose**: Send permissioned outreach emails. Sequencer with personalisation, A/B variants, deliverability tracking.

**Cost**: £30/month (Growth plan) — sufficient for pilot.

**Setup**:
1. Sign up at https://instantly.ai.
2. Add `outreach.drtutor.uk` as a sending account. Authenticate via the DKIM/SPF setup above.
3. Enable **automated warm-up** (~14 days).
4. Create a **campaign** for each segment (UK / ME). Use the templates from `MESSAGE-TEMPLATES.md`.
5. Set the daily send cap at **30 emails/day per sending account** (conservative; can be raised to 50 once domain is well-warmed).
6. Monitor the **bounce rate** (target < 2%) and **complaint rate** (target < 0.1%) in the Instantly dashboard.

**Alternative**: Smartlead.ai — similar features, slightly cheaper at £25/mo. Pick whichever has the better UI for you.

---

## 7. Daily tracker — Notion or Google Sheets

**Purpose**: Quick daily log that takes 5 min to update. Captures what HubSpot doesn't naturally surface — daily volume, response rate, A/B variant performance.

**Format (one tab per week)**:

| Date | Requests sent | Accepts | Convos | Consents | Emails | Trials | Notes |
|---|---|---|---|---|---|---|---|
| Mon | 15 | — | — | — | — | — | A-variant connection notes |
| Tue | 15 | 3 | 0 | 0 | 0 | 0 | First accept came from finance / London |
| ... | | | | | | | |

End-of-week totals row. Quick visual check on whether KPIs are tracking.

---

## Cost summary

| Tool | Monthly cost |
|---|---|
| LinkedIn Sales Navigator | £60 |
| Hunter.io | £0 (free tier) or £40 |
| HubSpot CRM | £0 (free tier) |
| Instantly | £30 |
| Domain warm-up | (bundled in Instantly) |
| Daily tracker | £0 |
| **Total** | **£90–£130/month** |

Setup-time one-offs: ~10 hours over 2 weeks (Sales Nav saved searches, DNS records, message templates, HubSpot properties, Instantly warm-up monitoring).

Optional later (only if pilot succeeds): VA (£300–£600/mo for research-layer support), upgrade to Hunter paid + Sales Nav Advanced (£200+ combined).

---

## When something breaks

| Symptom | Likely cause | Fix |
|---|---|---|
| LinkedIn connection acceptance rate < 15% | Connection notes feel template-y | Hand-vary every note; reference recent posts |
| LinkedIn account "restricted — verify identity" | Too many requests too fast OR using a flagged third-party tool | Pause for a week; comply with verification; review tooling |
| Emails landing in spam | Domain warm-up incomplete OR DKIM/SPF misconfigured | Verify in MX Toolbox; extend warm-up another week |
| Bounce rate > 5% | Hunter delivering invalid emails | Use Hunter verifier before send; remove unverified |
| ICO / complaint received | One of the legal rules was broken | See `LEGAL-GDPR-PECR.md` § "If someone says where did you get my data" — and audit recent sends |

---

## Tools we explicitly do NOT use

- **Phantombuster, Dripify, Expandi, Linked Helper, MeetAlfred** — all third-party LinkedIn automation tools that simulate user actions. All bannable. We're explicit: research layer = MCP (read-only), messaging layer = manual.
- **Bought email lists** — instant PECR breach.
- **Mass-mailers** (Mailchimp / Sendgrid bulk sends) without consent funnel — these are for newsletters with subscribers, not outreach.
- **WhatsApp Business bulk send tools** — PECR breach for ME prospects.

The system stays clean because the tools stay clean.
