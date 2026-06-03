/**
 * Lead delivery + conversion tracking for the /learn ad landing page.
 *
 * BACKEND STATUS (2026-06-02): LIVE. Leads POST to the DrTutor Workspace Django
 * endpoint https://api.drtutor.uk/api/v1/assessment-bookings/quick/ (public,
 * rate-limited), which persists an AssessmentBooking (source `learn-ads`) and
 * returns { reference_number }. The endpoint defaults on in production builds;
 * set VITE_LEAD_ENDPOINT to override. In local dev with no override, submitLead
 * stays in STUB mode (simulated success, no network) so dev never posts to prod.
 *
 * Wire format expected by Django: snake_case keys, FLAT utm_* fields, and a
 * valid `source` choice (`learn-ads`).
 */

const GA_MEASUREMENT_ID = 'G-29J2MTL3ZW';

// Google Ads conversion — live. ID + label from the Ads workstream (handoff
// 2026-05-23). Fires the Ads `conversion` event on /learn submit-success only,
// idempotent via the `conversionFired` flag below.
const ADS_CONVERSION_SEND_TO: string | null = 'AW-17962620600/Ds-_COeOkLIcELitn_VC';

const PROD_LEAD_ENDPOINT = 'https://api.drtutor.uk/api/v1/assessment-bookings/quick/';

const _env = (import.meta as unknown as {
  env?: Record<string, string | undefined>;
}).env;

// Explicit override wins; otherwise default to the live endpoint in production
// builds. Dev with no override resolves to undefined -> stub mode.
const LEAD_ENDPOINT: string | undefined =
  _env?.VITE_LEAD_ENDPOINT || (_env?.PROD ? PROD_LEAD_ENDPOINT : undefined);

const ATTRIBUTION_KEY = 'dt_learn_attribution';

export interface LeadInput {
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  childAge: number;
  /** Affirmative opt-in to be contacted + to use details for ad measurement.
   *  Gates the server-side Google Ads conversion upload (UK GDPR / PECR). */
  marketingConsent: boolean;
}

export interface LeadResult {
  ok: boolean;
  referenceNumber?: string;
  error?: string;
}

interface Attribution {
  gclid?: string;
  utm?: Record<string, string>;
}

/**
 * Capture the click ID + UTM params from the landing URL and stash them for
 * the session, so they survive client-side navigation and reach the lead
 * payload. Storing gclid with the lead is what enables offline conversion
 * import to Google Ads later (resilient to consent-denied + ad-blockers).
 * Safe to call on every page load.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const existing = readAttribution();

    const gclid = params.get('gclid') || existing.gclid;
    const utm: Record<string, string> = { ...(existing.utm || {}) };
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const value = params.get(key);
      if (value) utm[key] = value;
    }

    const next: Attribution = {};
    if (gclid) next.gclid = gclid;
    if (Object.keys(utm).length) next.utm = utm;

    if (next.gclid || next.utm) {
      sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
    }
  } catch {
    /* sessionStorage unavailable (private mode) — attribution is best-effort */
  }
}

function readAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

function stubReference(): string {
  const rand = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `DT-${rand}`;
}

/**
 * Deliver a lead. In STUB mode (no endpoint configured) this resolves to a
 * simulated success after a short delay so the success state + conversion
 * tracking can be exercised end to end — but nothing is stored.
 */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const { gclid, utm } = readAttribution();

  // Wire format expected by the Django endpoint: snake_case keys, FLAT utm_*
  // fields, a valid `source` choice. Server responds with { reference_number }.
  const body: Record<string, unknown> = {
    parent_name: input.parentName,
    parent_phone: input.parentPhone,
    parent_email: input.parentEmail,
    child_age: input.childAge,
    marketing_consent: input.marketingConsent,
    source: 'learn-ads',
    ...(gclid ? { gclid } : {}),
    ...(utm?.utm_source ? { utm_source: utm.utm_source } : {}),
    ...(utm?.utm_medium ? { utm_medium: utm.utm_medium } : {}),
    ...(utm?.utm_campaign ? { utm_campaign: utm.utm_campaign } : {}),
    ...(utm?.utm_content ? { utm_content: utm.utm_content } : {}),
    ...(utm?.utm_term ? { utm_term: utm.utm_term } : {}),
  };

  if (!LEAD_ENDPOINT) {
    if (import.meta && (import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        '[DrTutor /learn] No lead endpoint configured — lead was NOT persisted (stub mode).',
        body,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 650));
    return { ok: true, referenceNumber: stubReference() };
  }

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return { ok: false, error: `Server responded ${res.status}` };
    }
    const json = (await res.json().catch(() => ({}))) as { reference_number?: string };
    return { ok: true, referenceNumber: json.reference_number };
  } catch {
    return { ok: false, error: 'network' };
  }
}

let conversionFired = false;

/**
 * Fire the lead conversion on a genuine submit success — once per page load.
 * Pushes the GA4 `generate_lead` event, and (once the Ads team supplies the
 * ID) the Google Ads conversion. Never call this on page load or on a
 * validation error.
 */
export function fireLeadConversion(): void {
  if (conversionFired) return;
  conversionFired = true;

  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== 'function') return;

  // GA4 — imported into Google Ads as a conversion by the ads team.
  w.gtag('event', 'generate_lead', {
    currency: 'GBP',
    value: 0,
    send_to: GA_MEASUREMENT_ID,
  });

  // Google Ads conversion tag — enable when ADS_CONVERSION_SEND_TO is filled in.
  if (ADS_CONVERSION_SEND_TO) {
    w.gtag('event', 'conversion', { send_to: ADS_CONVERSION_SEND_TO });
  }
}
