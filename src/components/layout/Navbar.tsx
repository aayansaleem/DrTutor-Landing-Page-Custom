import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button, Container } from '../ui';
import { navLinks } from '@/data/navigation';
import logoImg from '@/assets/logo/logo.svg';

// Small WhatsApp glyph for the /learn CTA variant.
const WhatsAppGlyph: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

function scrollToHash(hash: string) {
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle scroll on route/hash change
  useEffect(() => {
    if (location.hash) {
      // Small delay to let the page render before scrolling
      setTimeout(() => scrollToHash(location.hash), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  const handleHashClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      // href is like "/#faq" — extract path and hash
      const [path, hash] = href.split('#');
      const targetPath = path || '/';

      if (location.pathname === targetPath) {
        // Already on the right page — just smooth scroll
        e.preventDefault();
        scrollToHash('#' + hash);
      } else {
        // Navigate to the page with hash — useEffect handles scroll
        e.preventDefault();
        navigate(href);
      }
    },
    [location.pathname, navigate],
  );

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-nav py-0' : 'bg-transparent py-2'
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="DrTutor Logo" className="h-12 sm:h-20 w-auto" />
        </Link>

        {/* Desktop Nav Pill */}
        <div className={`hidden lg:flex items-center px-8 py-3 rounded-full gap-8 transition-all duration-500 ${
          isScrolled ? 'bg-transparent shadow-none border-transparent' : 'bg-white/90 backdrop-blur-md shadow-sm border border-white/20'
        }`}>
          {navLinks.map((link) =>
            link.href.startsWith('http') ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-body font-semibold text-brand-navy hover:text-brand-teal transition-colors"
              >
                {link.label}
              </a>
            ) : link.href.includes('#') ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={(e) => handleHashClick(e, link.href)}
                className="text-sm font-body font-semibold text-brand-navy hover:text-brand-teal transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-body font-semibold text-brand-navy hover:text-brand-teal transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA — on /learn, swap "Book a Free Assessment" for "WhatsApp us" since
            the page already has the booking form inline. */}
        <div className="hidden lg:block">
          {location.pathname === '/learn' ? (
            <a href="https://wa.me/447526327612" target="_blank" rel="noopener noreferrer">
              <Button
                size="md"
                className="rounded-full px-6 gap-2 hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #25D366 0%, #1ebe57 100%)', boxShadow: '0 6px 16px rgba(37,211,102,0.32)' }}
              >
                <WhatsAppGlyph /> WhatsApp us
              </Button>
            </a>
          ) : (
            <a href="https://platform.drtutor.uk/register" target="_blank" rel="noopener noreferrer">
              <Button size="md" className="bg-brand-teal-dark hover:bg-brand-teal-darker rounded-full px-6">
                Book a Free Assessment
              </Button>
            </a>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          className="lg:hidden text-brand-navy bg-white p-2 rounded-full shadow-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl py-6 px-6 flex flex-col gap-4 animate-fade-up border border-brand-teal-light">
          {navLinks.map((link) =>
            link.href.startsWith('http') ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-body font-semibold text-brand-navy py-2 border-b border-brand-teal-lighter last:border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ) : link.href.includes('#') ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-base font-body font-semibold text-brand-navy py-2 border-b border-brand-teal-lighter last:border-0"
                onClick={(e) => { handleHashClick(e, link.href); setIsMobileMenuOpen(false); }}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-base font-body font-semibold text-brand-navy py-2 border-b border-brand-teal-lighter last:border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          {location.pathname === '/learn' ? (
            <a
              href="https://wa.me/447526327612"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button
                className="w-full gap-2"
                style={{ background: 'linear-gradient(135deg, #25D366 0%, #1ebe57 100%)' }}
              >
                <WhatsAppGlyph /> WhatsApp us
              </Button>
            </a>
          ) : (
            <a href="https://platform.drtutor.uk/register" target="_blank" rel="noopener noreferrer" className="w-full mt-2">
              <Button className="w-full">Book a Free Assessment</Button>
            </a>
          )}
        </div>
      )}
    </nav>
  );
};
