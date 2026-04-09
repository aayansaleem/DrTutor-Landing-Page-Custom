import React from 'react';
import { Container } from '../ui';
import { motion } from 'motion/react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

export const ContactHeroSection: React.FC = () => {
  return (
    <section className="hero-bg min-h-screen flex flex-col justify-center relative overflow-hidden pb-16 sm:pb-28">
      <Container>
        <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto pt-20 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-headline font-semibold mb-2 text-brand-teal"
            >
              Reach out to us
            </h1>
            <p
              className="text-xs font-body"
              style={{ color: 'var(--text-secondary)' }}
            >
              Got any questions? Reach out to us and we&rsquo;ll reply in 24 hours.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="block text-[11px] font-body font-semibold mb-1.5 tracking-wide uppercase"
                style={{ color: 'var(--text-secondary)' }}
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your Name"
                className="w-full h-11 px-4 text-sm font-body rounded-xl outline-none transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid transparent',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-focus)';
                  e.currentTarget.style.boxShadow = '0 0 0 4px var(--border-focus-ring), 0 4px 12px rgba(15,165,165,0.08)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(3,26,53,0.06)';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)';
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="block text-[11px] font-body font-semibold mb-1.5 tracking-wide uppercase"
                style={{ color: 'var(--text-secondary)' }}
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="yourname@email.com"
                className="w-full h-11 px-4 text-sm font-body rounded-xl outline-none transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid transparent',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-focus)';
                  e.currentTarget.style.boxShadow = '0 0 0 4px var(--border-focus-ring), 0 4px 12px rgba(15,165,165,0.08)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(3,26,53,0.06)';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)';
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="block text-[11px] font-body font-semibold mb-1.5 tracking-wide uppercase"
                style={{ color: 'var(--text-secondary)' }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={3}
                placeholder="I had a query..."
                className="w-full px-4 py-3 text-sm font-body rounded-xl outline-none resize-none transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid transparent',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-focus)';
                  e.currentTarget.style.boxShadow = '0 0 0 4px var(--border-focus-ring), 0 4px 12px rgba(15,165,165,0.08)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(3,26,53,0.06)';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)';
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 rounded-full font-body font-semibold text-sm text-white transition-all duration-300 hover:shadow-xl active:scale-[0.97] mt-1"
              style={{
                background: 'linear-gradient(135deg, var(--brand-teal), var(--brand-teal-dark))',
                boxShadow: '0 6px 20px rgba(15,165,165,0.3)',
              }}
            >
              Submit
            </button>
          </motion.form>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-5"
          >
            <a
              href="https://www.instagram.com/drtut0r/"
              target="_blank"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #E1306C, #F77737)' }}
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/drtut0r/"
              target="_blank"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              style={{ backgroundColor: '#1877F2' }}
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/dr-tut0r/"
              target="_blank"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              style={{ backgroundColor: '#0A66C2' }}
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </div>
      </Container>
      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{ clipPath: 'ellipse(70% 100% at 50% 100%)' }} />
    </section>
  );
};
