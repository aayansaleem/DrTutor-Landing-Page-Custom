import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components/layout';
import { HomePage, ResourcesPage, ContactPage, PricingPage, TermsPage } from './components/pages';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { CookieConsent } from './components/ui/CookieConsent';

const GA_MEASUREMENT_ID = 'G-29J2MTL3ZW';

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag !== 'function') return;

    // Defer until next frame so document.title (updated via react-helmet-async)
    // reflects the new page before we send the event.
    const id = window.requestAnimationFrame(() => {
      w.gtag!('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
        send_to: GA_MEASUREMENT_ID,
      });
    });

    return () => window.cancelAnimationFrame(id);
  }, [location.pathname, location.search]);
}

export default function App() {
  usePageTracking();

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
}
