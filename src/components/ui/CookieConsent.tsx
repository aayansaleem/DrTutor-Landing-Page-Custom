import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export const CookieConsent: React.FC = () => {
  const { visible, accept, reject } = useCookieConsent();

  if (!visible) return null;

  // PECR + UK GDPR: defaults are denied (see index.html Consent Mode v2),
  // Reject must be as easy and as prominent as Accept, and a link to the
  // full Privacy Policy is shown in the banner copy.
  return (
    <div
      className="fixed z-[999] bottom-4 left-4 right-4 sm:right-auto sm:max-w-[420px] animate-fade-up"
      style={{ animationDuration: '0.5s' }}
      role="dialog"
      aria-label="Cookie preferences"
    >
      <div
        className="flex items-center gap-3 rounded-full pl-4 pr-1.5 py-1.5"
        style={{
          backgroundColor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(14px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.5)',
          border: '1px solid rgba(15,165,165,0.16)',
          boxShadow: '0 12px 32px rgba(3,26,53,0.14), 0 2px 6px rgba(15,165,165,0.08)',
        }}
      >
        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--brand-teal-light)' }}
          aria-hidden="true"
        >
          <Cookie size={15} style={{ color: 'var(--brand-teal-dark)' }} />
        </span>
        <p className="font-body text-[12px] leading-snug text-brand-navy/75 flex-1 min-w-0">
          Cookies for analytics &amp; ads (UK GDPR / PECR).{' '}
          <Link to="/privacy" className="underline" style={{ color: 'var(--brand-teal-dark)' }}>
            Privacy
          </Link>
        </p>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={reject}
            aria-label="Reject all non-essential cookies"
            className="h-8 px-3.5 rounded-full font-body font-semibold text-[11px] cursor-pointer transition-all duration-200 active:scale-95"
            style={{
              color: 'var(--brand-teal-dark)',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid var(--brand-teal-light)',
            }}
          >
            Reject
          </button>
          <button
            onClick={accept}
            aria-label="Accept all cookies"
            className="h-8 px-3.5 rounded-full font-body font-semibold text-[11px] text-white cursor-pointer transition-transform duration-200 active:scale-95"
            style={{ background: 'linear-gradient(135deg, var(--brand-teal) 0%, var(--brand-teal-dark) 100%)' }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
