# Daily Cadence — Outreach Pipeline

> The 60–90 min daily routine. Ban-safe rate limits. What to do when LinkedIn flags activity. Print this — open it every morning.

---

## The hour (or 90 minutes)

This is what a day looks like once the system is set up and humming. Six days a week, ideally same window each day (LinkedIn loves consistency).

| Block | Time | What |
|---|---|---|
| **0:00 – 0:15 — Research** | 15 min | Open Sales Nav. Review each saved search (ICP-A UK + ICP-B ME). Pick 25 fresh profiles you'd actually want to know. Pipe them into HubSpot with `status = prospected`. Read each one — really read, not skim. The personalisation comes from this read. |
| **0:15 – 0:30 — Connection sends** | 15 min | Send 15 connection requests (10 UK + 5 ME). Personalise EVERY note — minimum one specific detail from their profile. Vary the wording between sends. Use `MESSAGE-TEMPLATES.md` as starting point, never paste verbatim. Update HubSpot: `status → connection_sent`. |
| **0:30 – 0:45 — Tend conversations** | 15 min | Review LinkedIn inbox. Reply to everyone who messaged back. **Same-day replies double conversion**. For new accepts ≥ 2 days old, send the first DM (Step 3a in templates). Update touch counts in HubSpot. |
| **0:45 – 0:55 — Follow-ups** | 10 min | Find anyone who got the first DM 4+ days ago with no reply. Send the single nudge (Step 3b). Mark them. **No second nudge ever** — after the nudge, they're done. |
| **0:55 – 1:10 — Email layer** | 15 min | (Week 3+ only.) Send permissioned emails to anyone who consented in DM today or yesterday. Screenshot their consent DM and attach to HubSpot. Use templates from `MESSAGE-TEMPLATES.md`. Reply to anyone who replied to a prior email. |
| **1:10 – 1:15 — Tracker update** | 5 min | Open the daily tracker. Log today's numbers: requests sent, accepts (yesterday's), conversations started, consents, emails, trials. End-of-day, you're done. |

**Total: 75 minutes.** Less on quiet days, more on heavy-reply days.

---

## Rate limits — never cross these

### LinkedIn (per LinkedIn ToS)

- **Connection requests/day** — ≤ 20 (we operate at 15 to be safe). Soft weekly cap = ~100.
- **InMails/month** (Sales Nav Core) — 50. Save these for high-value ICP-B prospects who don't accept connection requests.
- **DMs to existing connections** — no published cap, but at human pace. ≤ 60/day is comfortable; >100 starts to look automated.
- **Search queries** — no published cap, but >50 advanced searches/day raises flags.

### Email (per PECR + deliverability best practice)

- **First 14 days** — Instantly warm-up only. **Send zero real outreach.**
- **Days 15–30** — Up to 30 permissioned emails/day from `outreach.drtutor.uk`.
- **Day 30+** — Up to 50/day if reputation is healthy (bounce <2%, complaint <0.1%).
- **Never** — bulk-send the same email to 50 people. Each email is consent-driven, personalised, one-to-one.

### Behavioural pace

- LinkedIn sessions should look human. Take breaks. Don't burn through 25 profile views in 90 seconds.
- Vary the day. Skip a day entirely sometimes — real humans take days off.

---

## When LinkedIn flags activity

LinkedIn will sometimes ask you to verify your account ("we've noticed unusual activity"). This happens to everyone occasionally; it's not a ban. Steps:

1. **Stop sending immediately.** Don't try to push through.
2. **Comply with verification** — phone number, ID, whatever they ask. Be straightforward.
3. **Wait 48–72 hours** before resuming. Don't login obsessively in between.
4. **Resume at half-rate** for a week (7–8 requests/day instead of 15). Re-build trust.
5. **Review what caused it**:
   - Sent too many in too short a window? Spread out next time.
   - Identical message body to many people? Hand-vary every note from now.
   - Logged in from a new IP / device? Standard noise, ignore.

If you cross from "verify identity" to "your account has been restricted":

1. Appeal via the in-product flow. State that you operate manually and at low volume.
2. Stop ALL outbound activity. Focus only on inbound for the period of the restriction.
3. If permanent ban: this channel is over from this account. The CRM data is yours; nothing else carries over.

---

## Off-days, holidays, founder absence

The system is **deliberately not built for unattended operation**. It dies the moment messaging is automated. So when Aayan is away:

- **1–3 days off** — skip. Resume on return. No harm done.
- **1 week+ off** — set Instantly campaigns to "paused" so emails don't go out without you replying. New connection acceptances will be cold by the time you return; tend them anyway, with a graceful "sorry for the delay" line.
- **Hiring a VA** (Day 31+ only if pilot succeeds) — the VA can do the *research* layer (Block 1 — adding profiles to HubSpot, drafting personalisation notes for you to approve). They cannot do connection sends or DMs as you. Founder-led outreach is part of the brand.

---

## Mental model — quality > quantity

Every prospect on LinkedIn is a real person making real decisions about their children's education. The whole reason this system works while spammy versions get banned is the **read** in Block 1.

When you're rushing, you're sending notes that say "hi I noticed your post" but the post you "noticed" was generic. The recipient can feel it. Accept rate collapses, conversion collapses, eventually LinkedIn fingerprints the pattern and restricts the account.

Slow down. 15 personal connection requests beat 50 templated ones at every metric — accept rate, conversion to conversation, trial booking, lifetime value.

The system is a craft, not a hose.

---

## Friday review — 30 min, once a week

Every Friday end-of-day:

1. Open the daily tracker. Fill in the weekly totals row.
2. Update HubSpot — does every record have an accurate stage?
3. Pull the week's stats:
   - Connection acceptance rate (this week vs last)
   - Conversation conversion rate
   - Permissioned-email count (Week 3+)
4. Note in a single sentence: *what worked this week, what didn't*.
5. **Adjust one thing for next week** — A/B variant retired, a saved search tightened, a message template revised. Don't change multiple things at once; you won't know what caused the change.

The weekly review is what turns this from a job into a system.

---

## Red flags to escalate immediately

| Signal | Action |
|---|---|
| LinkedIn restricts the account | Stop everything; follow the flagging-response playbook above |
| Email bounce rate > 5% | Pause sending; verify all emails in Hunter; investigate domain reputation |
| Prospect explicitly asks to be removed | Same-day full erasure from HubSpot + Instantly; reply once politely; log in `removed.csv` |
| Prospect threatens ICO complaint or legal action | Same-day full erasure; reply with apology + confirmation of deletion; document the exchange; review what step in the funnel was missed |
| Two prospects in one week complain about the same thing | Process is broken — fix it before next session |

---

## Sustainability ground-truth

This system runs forever **only** if it's enjoyable to operate. If 75 min/day starts feeling like a grind:

- Audit the work — is it the research that's tedious, the messaging, or the tending?
- The grindy part is the candidate for VA delegation (research-layer first, never messaging).
- Cap at 6 days/week. Take Sundays off (UK) or whatever your day off is.
- Periodic 1-week pauses are fine.
- The momentum is in **months**, not days. Don't burn out chasing a daily streak.

This channel is a 10-year channel, not a 30-day sprint. Treat it accordingly.
