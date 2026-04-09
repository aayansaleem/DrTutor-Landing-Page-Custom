import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button, Container } from '../ui';
import { navLinks } from '@/data/navigation';
import logoImg from '@/assets/logo/logo.svg';

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

        {/* CTA */}
        <div className="hidden lg:block">
          <a href="https://platform.drtutor.uk/register" target="_blank" rel="noopener noreferrer">
            <Button size="md" className="bg-brand-teal-dark hover:bg-brand-teal-darker rounded-full px-6">
              Book a Free Assessment
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
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
          <a href="https://platform.drtutor.uk/register" target="_blank" rel="noopener noreferrer" className="w-full mt-2">
            <Button className="w-full">Book a Free Assessment</Button>
          </a>
        </div>
      )}
    </nav>
  );
};
