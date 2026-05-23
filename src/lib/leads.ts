/**
 * Lead delivery + conversion tracking for the /learn ad landing page.
 *
 * BACKEND STATUS (2026-05-22): Firebase was retired today; the platform is
 * migrating to Django. Until that endpoint exists, `VITE_LEAD_ENDPOINT` is
 * empty and `submitLead` runs in STUB mode: it simulates a successful submit
 * so the UI + tracking flow can be verified, but it DOES NOT persist the lead.
 *
 * >>> Do not resume paid ads until VITE_LEAD_ENDPOINT points at the live
 * >>> Django endpoint, or every lead silently vanishes. <<<
 *
 * To go live: set VITE_LEAD_ENDPOINT to the Django URL (e.g.
 * https://api.drtutor.uk/assessment-bookings/). Django should accept the
 * LeadPayload shape below and return { referenceNumber }.
 */

const GA_MEASUREMENT_ID = 'G-29J2MTL3ZW';

// Google Ads conversion — STUB. The Ads team owns the conversion ID + label
// (the account currently has only call-based actions). Drop it in here as
// `AW-XXXXXXXXX/xxxxxxxxxxxxxxxxx` and uncomment the conversion call below.
const ADS_CONVERSION_SEND_TO: string | null = null;

const LEAD_ENDPOINT: string | undefined = (import.meta as unknown as {
  env?: Record<string, string | undefined>;
}).env?.VITE_LEAD_ENDPOINT;

const ATTRIBUTION_KEY = 'dt_learn_attribution';

export interface LeadInput {
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  childAge: number;
}

export interface LeadPayload extends LeadInput {
  source: 'learn';
  gclid?: string;
  utm?: Record<string, string>;
  submittedAt: string;
  pagePath: string;
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
  const payload: LeadPayload = {
    ...input,
    source: 'learn',
    submittedAt: new Date().toISOString(),
    pagePath: typeof window !== 'undefined' ? window.location.pathname : '/learn',
    ...(gclid ? { gclid } : {}),
    ...(utm ? { utm } : {}),
  };

  if (!LEAD_ENDPOINT) {
    if (import.meta && (import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        '[DrTutor /learn] VITE_LEAD_ENDPOINT is not set — lead was NOT persisted (stub mode). ' +
          'Wire the Django endpoint before resuming paid ads.',
        payload,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 650));
    return { ok: true, referenceNumber: stubReference() };
  }

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { ok: false, error: `Server responded ${res.status}` };
    }
    const json = (await res.json().catch(() => ({}))) as { referenceNumber?: string };
    return { ok: true, referenceNumber: json.referenceNumber };
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
