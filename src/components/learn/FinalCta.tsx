import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Reveal } from './primitives';
import girlLeft from '@/assets/images/girl-hero.jpg';
import girlCenter from '@/assets/images/CTA-gril.avif';
import boyRight from '@/assets/images/CTA-boy.avif';

const scrollToBook = () => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });

/** Mirrors the homepage CTASection — centered CTA copy + 3-photo fan that
 *  bleeds into the footer's teal gradient. Curved top on the wrapping
 *  section gives symmetry with the hero's curved bottom. */
export const FinalCta: React.FC = () => {
  return (
    <section
      className="pt-12 lg:pt-16 pb-0 relative rounded-t-[40px] sm:rounded-t-[56px] overflow-hidden -mt-6"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-brand-teal mb-4">
            Start with a free assessment
          </h2>
          <p className="font-body text-sm md:text-base max-w-md mx-auto mb-8 text-brand-navy/80">
            See exactly where your child stands. You decide if it's a fit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={scrollToBook}
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-7 sm:px-8 font-body font-semibold text-sm rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-[0.97] bg-brand-teal text-white"
            >
              Book a free assessment
            </button>
            <a
              href="https://wa.me/447526327612"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 sm:px-7 font-body font-semibold text-sm rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-[0.97] text-brand-teal-dark"
              style={{ backgroundColor: '#FFFFFF', border: '1.5px solid var(--brand-teal-light)' }}
            >
              <MessageCircle size={16} /> Prefer to talk? Message us
            </a>
          </div>
        </Reveal>
      </div>

      {/* 3-card fan that bleeds into the footer gradient */}
      <div className="relative" style={{ marginTop: '2rem' }}>
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '55%', background: 'linear-gradient(180deg, transparent 0%, #EAF9F7 100%)' }}
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            className="relative flex items-end justify-center mx-auto"
            style={{ height: 'clamp(260px, 48vw, 560px)', maxWidth: '780px' }}
          >
            <div
              className="absolute w-[40%] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl z-10"
              style={{ left: '2%', bottom: '-6%', transform: 'rotate(-6deg)', transformOrigin: 'bottom center' }}
            >
              <img src={girlLeft} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div
              className="relative w-[40%] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-20"
              style={{ marginBottom: '-2%' }}
            >
              <img src={girlCenter} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div
              className="absolute w-[40%] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl z-10"
              style={{ right: '2%', bottom: '-6%', transform: 'rotate(6deg)', transformOrigin: 'bottom center' }}
            >
              <img src={boyRight} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

