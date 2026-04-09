import { useState, useEffect, useCallback } from 'react';

export type ConsentStatus = 'accepted' | 'rejected' | null;

const STORAGE_KEY = 'dt_cookie_consent';
const EXPIRY_DAYS = 60;

interface StoredConsent {
  status: 'accepted' | 'rejected';
  timestamp: number;
}

function getStoredConsent(): ConsentStatus {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: StoredConsent = JSON.parse(raw);
    const ageMs = Date.now() - parsed.timestamp;
    const expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    if (ageMs > expiryMs) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed.status;
  } catch {
    return null;
  }
}

function saveConsent(status: 'accepted' | 'rejected') {
  const payload: StoredConsent = { status, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

/**
 * Apply Google Consent Mode v2 signals.
 * This updates gtag consent for analytics_storage, ad_storage,
 * ad_user_data, and ad_personalization — covering Google Analytics
 * and Google Ads cookies.
 */
function applyGoogleConsent(status: 'accepted' | 'rejected') {
  const granted = status === 'accepted' ? 'granted' : 'denied';

  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('consent', 'update', {
      analytics_storage: granted,
      ad_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
    });
  }
}

export function useCookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setStatus(stored);
      applyGoogleConsent(stored);
    } else {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = useCallback(() => {
    saveConsent('accepted');
    applyGoogleConsent('accepted');
    setStatus('accepted');
    setVisible(false);
  }, []);

  const reject = useCallback(() => {
    saveConsent('rejected');
    applyGoogleConsent('rejected');
    setStatus('rejected');
    setVisible(false);
  }, []);

  return { status, visible, accept, reject };
}
