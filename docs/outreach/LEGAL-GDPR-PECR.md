# Legal Frame — GDPR / PECR / LinkedIn ToS

> **Not legal advice.** This is a working reference written from public ICO guidance and LinkedIn's published Terms of Service. For high-stakes decisions consult a UK solicitor.

The point of this doc: stay legal at scale. Outreach companies get fined by ICO; LinkedIn accounts get banned by Microsoft. Both are avoidable if we operate inside the rules.

---

## The three regimes we live inside

| Regime | What it governs | Risk if violated |
|---|---|---|
| **UK GDPR** | How we collect, store, and process personal data (names, emails, LinkedIn profile data) | Fines up to £17.5m or 4% of turnover |
| **PECR** (Privacy and Electronic Communications Regulations) | Sending electronic marketing — email, SMS, calls | Fines up to £500k per breach (raising) |
| **LinkedIn ToS** | What you may and may not do inside LinkedIn the platform | Account restriction → permanent ban |

UK GDPR + PECR apply because Dr Tutor is UK-established. They apply to anyone we contact, regardless of where the prospect lives — including Middle East prospects (a UK business has UK obligations even when contacting non-UK people).

---

## UK GDPR — what we can store and process

We *can* lawfully collect and store the following data from public LinkedIn profiles and store it in HubSpot:

- Name, job title, employer, city, country
- LinkedIn profile URL
- Bio text (public-facing)
- Inferred ICP signals (parent indicators, alumni, interests)

We *must*:

- Have a documented **lawful basis** for processing this data. For outreach prospecting, the basis is **legitimate interest** (Art. 6(1)(f)). Document this in a one-page "Legitimate Interest Assessment" (LIA) — template at the bottom of this doc.
- Maintain a **Privacy Policy** on drtutor.uk explaining what data we collect, why, retention period, and how to request deletion. The site already has `/terms` — verify it covers this scenario.
- **Honour right-to-erasure** within 30 days. If anyone asks to be removed, delete their record in HubSpot end-to-end (don't just "mark unsubscribed").
- **Encrypt at rest**. HubSpot does this by default.
- **Restrict access**. Only people who need to use the CRM should have logins.

We *cannot*:

- Sell or share the list with third parties.
- Use the data for purposes outside outreach (e.g. retargeting on Facebook without separate consent).
- Retain data indefinitely. Set a retention policy: prospects with no engagement after 12 months are auto-deleted.

---

## PECR — what we can and cannot send

PECR is stricter than GDPR for **electronic marketing communications**. The rules differ by channel and recipient type.

### Email — to individuals (parents)

| Action | Legal? |
|---|---|
| Cold email to a parent we found on LinkedIn — no prior contact | **NO** — PECR breach |
| Cold email to a parent who *signed up* to our newsletter | YES (they consented) |
| Cold email to a parent who said in a LinkedIn DM "yes, send me info" | **YES** (this is the consent bridge — soft opt-in, ICO-recognised) |
| Cold email to a parent who is an existing or prior customer, about the same service | YES (soft opt-in by prior relationship) |

The consent bridge is the entire reason this system is structured the way it is. Email **only** after they have explicitly said yes in DM. Screenshot the DM and store with their CRM record. That screenshot is your legal defence if challenged.

### Email — to businesses (schools, corporates) [not our primary target, listed for completeness]

| Action | Legal? |
|---|---|
| Cold email to a generic role address (`benefits@bigco.com`) | YES (with opt-out and identifier) |
| Cold email to a named individual at a limited company / PLC | YES (legitimate interest) |
| Cold email to a named individual at a sole trader / partnership | **NO** (treated as individual) |

### LinkedIn messages

LinkedIn messages are **not** governed by PECR — they're governed by LinkedIn ToS only. This is critical:

- A LinkedIn connection request with a note is **not** marketing communication under PECR.
- A LinkedIn message to an accepted connection is **not** PECR-covered.
- An InMail to a non-connection (via Sales Navigator) is **not** PECR-covered (LinkedIn classes it as a platform message, not third-party marketing).

This is what makes the funnel legal. **LinkedIn is the pre-consent channel; email is the post-consent channel.**

### SMS, WhatsApp, phone

- **Cold SMS / WhatsApp to individuals**: PECR breach without consent. Avoid entirely.
- **Phone calls** — opt-in via the Telephone Preference Service (TPS) registry blocks most numbers. Don't cold-call parents.

---

## LinkedIn ToS — what gets you banned

LinkedIn's published ToS (and aggressive automated enforcement) prohibit:

- **Third-party scraping tools** that simulate user actions (Phantombuster, Dripify, Expandi, LinkedHelper, etc. — all detected, all bannable).
- **Mass connection requests** without personalisation. Weekly soft cap = ~100 requests, but flagged accounts cap at 5/day. Sustained safe rate = ~15/day.
- **Spammy messaging** — same message text repeated to many people. LinkedIn fingerprints message bodies.
- **Multiple-account operation** by one person.
- **Logging in from too many IPs** — flags as account compromise.

What is allowed:

- **Sales Navigator** at the published rate limits (paid tier: 50 InMails/month). Sales Nav is LinkedIn's own product — using its filters and saved searches is fully sanctioned.
- **Personal, varied connection notes** at modest daily volume.
- **Manual messaging** in personal time, at human pace.
- **LinkedIn API access** (very limited, mostly read-only — what an MCP would use lawfully).

**The LinkedIn MCP in our stack is for read-only research** (profile data extraction, list-building). The messaging layer is **manual**. This is the line that keeps the account healthy.

---

## Middle East considerations

Each ME jurisdiction has its own data protection law. The pragmatic position:

- **UAE PDPL** (Federal Decree-Law No. 45 of 2021) — broadly similar to GDPR, enforcement light so far.
- **Saudi Arabia PDPL** (in force from September 2023) — GDPR-style.
- **Qatar PDPL** — broadly aligned.
- **Kuwait, Bahrain, Oman** — less developed regimes.

Because we are a **UK-established controller**, UK GDPR + PECR apply to our processing of ME residents' data too. So the practical rule is: **operate to UK GDPR / PECR standards globally**. If we do that, we are compliant in ME by default and don't need a jurisdiction-by-jurisdiction analysis.

One ME-specific friction: some prospects use WhatsApp as their primary channel. **Do not** add ME prospects to WhatsApp without explicit consent — it's PECR-covered the same as SMS/email.

---

## What we must document

For ICO audit-readiness, the following exist somewhere:

| Document | Where | Status |
|---|---|---|
| Privacy Policy on drtutor.uk | `/terms` | Audit pending — verify it covers prospect data |
| Legitimate Interest Assessment (LIA) | `docs/outreach/LIA.md` | **To write** before Day 1 of pilot |
| Data Retention Policy | inside LIA | **To write** |
| Right-to-erasure process | inside LIA + HubSpot SOP | **To write** |
| DM-consent screenshots | HubSpot record per lead | Process — capture each one |
| Bounce + complaint monitoring | Instantly dashboard | Standard tool feature |

The LIA template:

```
LEGITIMATE INTEREST ASSESSMENT — Dr Tutor Outreach Pipeline

1. Purpose
   We use LinkedIn-sourced profile data (name, title, employer, city,
   public bio) to identify parents likely to need premium online
   tutoring. We contact them via LinkedIn first, and via email only
   after explicit consent given in a LinkedIn DM.

2. Necessity
   This processing is necessary because there is no public registry
   of "parents seeking tutoring". LinkedIn profile signals are the
   most reliable proxy without inappropriate intrusion.

3. Balancing test
   Data subject impact: minimal. We process only public-facing
   profile data. We do not retarget. We honour erasure requests.
   We do not share data with third parties.

   Our interest: legitimate (lawful business of recruiting students)
   and tightly bounded (no cold-emailing without consent, no spam).

   Conclusion: legitimate interest is proportionate.

4. Safeguards
   - Connection requests only at safe volume (≤ 20/day).
   - Email only after DM consent; screenshot kept as proof.
   - 12-month auto-delete for non-engaged prospects.
   - Privacy Policy at https://www.drtutor.uk/terms describes the
     processing and gives a deletion contact.

Signed: <founder name>
Date: <YYYY-MM-DD>
Review: annually.
```

Drop this in `docs/outreach/LIA.md` and re-sign annually.

---

## If someone says "where did you get my data?"

Have a one-sentence answer ready:

> "I found your profile via LinkedIn — your title and city matched the kind of UK parent we typically work with, and I sent you a connection request. Happy to remove your details immediately if you'd prefer."

That answer is honest, calm, and triggers no escalation. Follow through on the removal request the same day.

---

## Red flags to never cross

- ❌ Buying email lists — instant PECR breach, ICO loves catching this.
- ❌ Scraping emails from LinkedIn (LinkedIn ToS *and* PECR breach).
- ❌ Sending cold email to a parent before they've consented in DM.
- ❌ Adding the prospect to a "newsletter" they didn't sign up to.
- ❌ Using the same message text on 50+ people (LinkedIn fingerprinting → ban).
- ❌ Ignoring an unsubscribe / erasure request beyond 30 days.

Stay inside the lines and this channel runs for years.
