import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components/layout';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { CookieConsent } from './components/ui/CookieConsent';
import { SEO } from './components/ui/SEO';
import {
  LEARN_SEO_TITLE,
  LEARN_SEO_DESCRIPTION,
  learnServiceSchema,
  learnFaqSchema,
} from './lib/learnSeo';

// Route-level code splitting: each page is its own chunk so a visitor only
// downloads what the route needs. Critical for the /learn ad lander — it loads
// its own bundle, not the entire marketing site.
const HomePage = lazy(() => import('./components/pages/HomePage').then((m) => ({ default: m.HomePage })));
const ResourcesPage = lazy(() => import('./components/pages/ResourcesPage').then((m) => ({ default: m.ResourcesPage })));
const ContactPage = lazy(() => import('./components/pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PricingPage = lazy(() => import('./components/pages/PricingPage').then((m) => ({ default: m.PricingPage })));
const TermsPage = lazy(() => import('./components/pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('./components/pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const LearnPage = lazy(() => import('./components/pages/LearnPage').then((m) => ({ default: m.LearnPage })));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white" aria-hidden="true">
    <div
      className="w-9 h-9 rounded-full border-[3px] animate-spin"
      style={{ borderColor: 'var(--brand-teal-light)', borderTopColor: 'var(--brand-teal)' }}
    />
  </div>
);

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
  const location = useLocation();

  // /learn uses the site's Navbar + Footer like every other page (with a
  // WhatsApp CTA swapped in for the booking button — handled inside Navbar).
  // The only chrome we still suppress here is the floating WhatsApp button,
  // since /learn already has WhatsApp in the nav, the sticky mobile bar, and
  // the final CTA section.
  const isLanding = location.pathname === '/learn';

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* /learn SEO is rendered HERE (not inside LearnPage) so the title,
          description, canonical and JSON-LD apply on first paint instead of
          waiting for the lazy chunk to hydrate. Helmet handles dedupe if the
          page also renders <SEO />. */}
      {isLanding && (
        <SEO
          title={LEARN_SEO_TITLE}
          description={LEARN_SEO_DESCRIPTION}
          path="/learn"
          schema={[learnServiceSchema, learnFaqSchema]}
        />
      )}
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/learn" element={<LearnPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {!isLanding && <WhatsAppButton />}
      <CookieConsent />
    </div>
  );
}
