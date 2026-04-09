import React from 'react';
import { Container } from '../ui';
import girlLeft from '@/assets/images/girl-hero.jpg';
import girlCenter from '@/assets/images/CTA-gril.avif';
import boyRight from '@/assets/images/CTA-boy.avif';

export const CTASection: React.FC = () => {
  return (
    <section
      className="pt-16 lg:pt-24 pb-0 relative"
      style={{ backgroundColor: 'var(--bg-page)' }}
      id="contact"
    >
      <Container>
        {/* ── Text + CTAs ── */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-brand-teal mb-4">
            Start Learning Today
          </h2>
          <p className="font-body text-sm md:text-base max-w-md mx-auto mb-8 text-brand-navy/80">
            Choose a time that works for you and meet your tutor online
            <br className="hidden sm:block" />
            quick and easy
          </p>
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="/#tutors"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('tutors');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/#tutors';
              }}
              className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 font-body font-semibold text-sm rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-[0.97]  bg-brand-teal text-white"
            >
              Find a Tutor
            </a>
            <a
              href="https://platform.drtutor.uk/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 font-body font-semibold text-sm rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-[0.97] resources-hero-bg "
            >
              Book a Free Assessment
            </a>
          </div>
        </div>
      </Container>

      {/* ── 3-card fan layout — overflows into footer ── */}
      <div className="relative" style={{ marginTop: '2rem' }}>
        {/* Gradient transition that matches footer start */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '55%',
            background: 'linear-gradient(180deg, transparent 0%, #EAF9F7 100%)',
          }}
        />

        <Container>
          <div
            className="relative flex items-end justify-center mx-auto"
            style={{ height: 'clamp(260px, 48vw, 560px)', maxWidth: '780px' }}
          >
            {/* Left card — girl with braids */}
            <div
              className="absolute w-[40%] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl z-10"
              style={{
                left: '2%',
                bottom: '-6%',
                transform: 'rotate(-6deg)',
                transformOrigin: 'bottom center',
              }}
            >
              <img
                src={girlLeft}
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Centre card — girl in teal vest */}
            <div
              className="relative w-[40%] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-20"
              style={{ marginBottom: '-2%' }}
            >
              <img
                src={girlCenter}
                alt="Student looking up"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right card — boy arms crossed */}
            <div
              className="absolute w-[40%] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl z-10"
              style={{
                right: '2%',
                bottom: '-6%',
                transform: 'rotate(6deg)',
                transformOrigin: 'bottom center',
              }}
            >
              <img
                src={boyRight}
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
