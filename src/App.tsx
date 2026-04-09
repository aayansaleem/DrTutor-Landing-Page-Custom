import { Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/layout';
import { HomePage, ResourcesPage, ContactPage, PricingPage, TermsPage } from './components/pages';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { CookieConsent } from './components/ui/CookieConsent';

export default function App() {
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
