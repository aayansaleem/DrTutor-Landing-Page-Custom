import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui';
import { footerLinks } from '@/data/navigation';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import logoImg from '@/assets/logo/logo.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-gradient">
      {/* ── Large centered logo ── */}
      <Link to="/" className="flex items-center justify-center pt-14 sm:pt-18 md:pt-22 lg:pt-28 pb-10 sm:pb-14 md:pb-16 lg:pb-20">
        <img
          src={logoImg}
          alt="DrTutors — Personalised Tutors"
          className="h-24 sm:h-36 md:h-40 lg:h-48 w-auto"
        />
      </Link>

      {/* ── Content: tagline + nav ── */}
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between gap-8 sm:gap-12 md:gap-14 pb-12 sm:pb-16 md:pb-18 lg:pb-20">
          {/* Left — tagline + socials */}
          <div>
            <p
              className="font-body text-base sm:text-lg lg:text-xl leading-relaxed mb-6"
              style={{ color: 'var(--brand-teal)' }}
            >
              Your Search for the
              <br />
              <span
                className="font-semibold"
                style={{ color: 'var(--brand-teal-dark)' }}
              >
                Perfect 5-Star Tutor Ends Here.
              </span>
            </p>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
                style={{ backgroundColor: '#E1306C' }}
                aria-label="Instagram"
              >
                <Instagram size={18} color="#fff" />
              </a>
              {/* Facebook */}
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
                style={{ backgroundColor: '#1877F2' }}
                aria-label="Facebook"
              >
                <Facebook size={18} color="#fff" />
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
                style={{ backgroundColor: '#0A66C2' }}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} color="#fff" />
              </a>
            </div>
          </div>

          {/* Right — Navigation + Support columns */}
          <div className="flex gap-10 sm:gap-16 md:gap-20 lg:gap-24">
            <div>
              <h4 className="font-headline font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-5 text-brand-teal">
                Navigation
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-xs sm:text-sm font-body transition-colors duration-200 hover:underline"
                        style={{ color: 'var(--brand-teal)' }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-xs sm:text-sm font-body transition-colors duration-200 hover:underline"
                        style={{ color: 'var(--brand-teal)' }}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-5 text-brand-teal">
                Support
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-xs sm:text-sm font-body transition-colors duration-200 hover:underline"
                        style={{ color: 'var(--brand-teal)' }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-xs sm:text-sm font-body transition-colors duration-200 hover:underline"
                        style={{ color: 'var(--brand-teal)' }}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4"
          style={{ borderTop: '1px solid rgba(15,165,165,0.12)' }}
        >
          <p
            className="text-[11px] sm:text-xs font-body"
            style={{ color: 'var(--brand-teal)' }}
          >
            &copy; 2025 &ndash; Dr Tutors
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
            <Link
              to="/terms"
              className="text-[11px] sm:text-xs font-body hover:underline transition-colors duration-200"
              style={{ color: 'var(--brand-teal)' }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-[11px] sm:text-xs font-body hover:underline transition-colors duration-200"
              style={{ color: 'var(--brand-teal)' }}
            >
              Cookies
            </Link>
            <Link
              to="/terms"
              className="text-[11px] sm:text-xs font-body hover:underline transition-colors duration-200"
              style={{ color: 'var(--brand-teal)' }}
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
