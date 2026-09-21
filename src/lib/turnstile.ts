/**
 * Cloudflare Turnstile: bot protection for the public assessment form.
 *
 * The site key is public by design (it identifies the widget to Cloudflare and
 * is visible in any page source). The matching secret key lives only on the
 * Django server, which verifies the token before storing a lead. In Managed
 * mode a real parent normally sees nothing beyond a brief "verifying" tick.
 */

const DEFAULT_SITE_KEY = '0x4AAAAAAE_LmxsJQbbsED8V';

const _env = (import.meta as unknown as {
  env?: Record<string, string | undefined>;
}).env;

export const TURNSTILE_SITE_KEY: string =
  _env?.VITE_TURNSTILE_SITE_KEY || DEFAULT_SITE_KEY;

const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export interface TurnstileApi {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
      theme?: 'light' | 'dark' | 'auto';
      appearance?: 'always' | 'execute' | 'interaction-only';
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loader: Promise<TurnstileApi> | null = null;

/**
 * Load the Turnstile script once per page and resolve with its API.
 * Rejects if the script cannot load, for example when an aggressive blocker
 * or corporate firewall drops it, so the caller can show a way through.
 */
export function loadTurnstile(): Promise<TurnstileApi> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('no window'));
  }
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (loader) return loader;

  loader = new Promise<TurnstileApi>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    const script = existing ?? document.createElement('script');

    const onReady = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error('turnstile script loaded without an api'));
    };

    script.addEventListener('load', onReady);
    script.addEventListener('error', () => reject(new Error('turnstile script blocked')));

    if (!existing) {
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if (window.turnstile) {
      onReady();
    }
  });

  loader.catch(() => {
    // Allow a later retry (for example after the parent disables a blocker).
    loader = null;
  });

  return loader;
}
