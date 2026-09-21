import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

import { TURNSTILE_SITE_KEY, loadTurnstile } from '@/lib/turnstile';

interface TurnstileFieldProps {
  /** Called with a fresh token, or null when it expires or errors. */
  onToken: (token: string | null) => void;
  /** Bump this number to force a new challenge (tokens are single use). */
  resetSignal?: number;
}

/**
 * Renders the Turnstile challenge for the assessment form.
 *
 * In Managed mode this is usually a quiet "verifying" tick that resolves on its
 * own. If the script cannot load at all we say so plainly and point at
 * WhatsApp, rather than leaving a parent stuck on a button that will not work.
 */
export const TurnstileField: React.FC<TurnstileFieldProps> = ({ onToken, resetSignal = 0 }) => {
  const holder = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const [blocked, setBlocked] = useState(false);

  // Keep the latest callback without re-rendering the widget on every keystroke.
  const onTokenRef = useRef(onToken);
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    let cancelled = false;

    loadTurnstile()
      .then((api) => {
        if (cancelled || !holder.current || widgetId.current) return;
        widgetId.current = api.render(holder.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'light',
          callback: (token: string) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(null),
          'error-callback': () => onTokenRef.current(null),
        });
      })
      .catch(() => {
        if (!cancelled) setBlocked(true);
      });

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!resetSignal) return;
    if (widgetId.current && window.turnstile) {
      window.turnstile.reset(widgetId.current);
      onTokenRef.current(null);
    }
  }, [resetSignal]);

  if (blocked) {
    return (
      <p className="font-body text-xs leading-relaxed text-brand-navy/70">
        We could not load our security check. Please turn off any ad blocker and refresh,
        or message us on WhatsApp and we will book you in directly.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div ref={holder} className="min-h-[65px]" />
      <p className="flex items-center gap-1.5 font-body text-[11px] text-brand-navy/45">
        <ShieldCheck size={12} className="shrink-0" />
        Protected by Cloudflare. We check for bots so real families reach us faster.
      </p>
    </div>
  );
};
