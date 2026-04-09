import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export const CookieConsent: React.FC = () => {
  const { visible, accept, reject } = useCookieConsent();

  if (!visible) return null;

  return (
    <>
      {/* Backdrop — subtle, allows click-through to page */}
      <div className="fixed inset-0 z-[998] pointer-events-none" />

      {/* Popup card */}
      <div
        className="fixed z-[999] bottom-4 left-4 right-4 sm:right-auto sm:max-w-[370px] animate-fade-up"
        style={{ animationDuration: '0.5s' }}
      >
        <div
          className="rounded-2xl p-5 sm:p-6"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow:
              '0 8px 32px rgba(3,26,53,0.12), 0 2px 8px rgba(15,165,165,0.08)',
            border: '1px solid rgba(15,165,165,0.10)',
          }}
        >
          {/* Header row */}
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--brand-teal-light)' }}
            >
              <Shield
                size={16}
                style={{ color: 'var(--brand-teal)' }}
                aria-hidden="true"
              />
            </div>
            <h3 className="font-headline font-semibold text-sm text-brand-teal">
              Cookie Preferences
            </h3>
          </div>

          {/* Description */}
          <p
            className="font-body text-xs leading-relaxed mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            We use cookies from Google Analytics and Google Ads to understand
            how you use our site and to show relevant content. You can accept
            or reject non-essential cookies below.
          </p>

          {/* Cookie categories — compact inline pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold"
              style={{
                backgroundColor: 'var(--brand-teal-light)',
                color: 'var(--brand-teal)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'var(--brand-teal)' }}
              />
              Analytics
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold"
              style={{
                backgroundColor: 'var(--brand-teal-light)',
                color: 'var(--brand-teal)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'var(--brand-teal)' }}
              />
              Advertising
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold"
              style={{
                backgroundColor: 'var(--brand-teal-lighter)',
                color: 'var(--brand-navy)',
                opacity: 0.7,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'var(--brand-green)' }}
              />
              Essential (always on)
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={reject}
              className="flex-1 h-9 rounded-full font-body font-semibold text-xs cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.97]"
              style={{
                border: '1.5px solid var(--brand-teal)',
                color: 'var(--brand-teal)',
                backgroundColor: 'transparent',
              }}
            >
              Reject
            </button>
            <button
              onClick={accept}
              className="flex-1 h-9 rounded-full font-body font-semibold text-xs text-white cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.97]"
              style={{
                backgroundColor: 'var(--brand-teal)',
                border: '1.5px solid var(--brand-teal)',
              }}
            >
              Accept All
            </button>
          </div>

          {/* Footer link */}
          <div className="mt-3 text-center">
            <Link
              to="/terms"
              className="font-body text-[10px] hover:underline transition-colors duration-200"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Privacy Policy &middot; Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
