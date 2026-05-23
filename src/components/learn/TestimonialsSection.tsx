import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from './primitives';
import { testimonials } from '@/data/testimonials';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/** Mirrors the homepage TestimonialsSection: carousel with arrow controls,
 *  white card with a teal gradient that strengthens on hover, dot pagination. */
export const LearnTestimonialsSection: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 640px)');
  const VISIBLE = isDesktop ? 3 : isTablet ? 2 : 1;

  const [offset, setOffset] = useState(0);
  const maxOffset = Math.max(0, testimonials.length - VISIBLE);

  const prev = useCallback(() => setOffset((o) => Math.max(0, o - 1)), []);
  const next = useCallback(() => setOffset((o) => Math.min(maxOffset, o + 1)), [maxOffset]);

  return (
    <section className="py-12 md:py-14 lg:py-16" style={{ backgroundColor: 'var(--bg-section-alt)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center mb-8 md:mb-10 lg:mb-12">
          <span className="font-body font-semibold text-xs uppercase tracking-[0.16em] text-brand-teal">From parents</span>
          <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-brand-teal mt-3">
            Families who took the first step
          </h2>
        </Reveal>

        <div className="relative">
          <button
            onClick={prev}
            className="absolute -left-2 sm:-left-4 md:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(4px)',
              color: 'var(--text-secondary)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            }}
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            onClick={next}
            className="absolute -right-2 sm:-right-4 md:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(4px)',
              color: 'var(--text-secondary)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            }}
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${offset * (100 / VISIBLE)}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="flex-shrink-0 px-2.5 lg:px-3" style={{ width: `${100 / VISIBLE}%` }}>
                  <div
                    className="rounded-2xl flex flex-col overflow-hidden relative group transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border: '1px solid var(--border-default)',
                      backgroundColor: '#FFFFFF',
                      minHeight: 'clamp(300px, 40vw, 380px)',
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-400"
                      style={{ background: 'linear-gradient(to top, rgba(15,165,165,0.10) 0%, rgba(15,165,165,0.04) 40%, transparent 70%)' }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: 'linear-gradient(to top, rgba(15,165,165,0.22) 0%, rgba(15,165,165,0.10) 40%, transparent 70%)' }}
                    />

                    <div className="flex flex-col flex-1 p-5 sm:p-7 lg:p-8 relative z-10">
                      <div className="mb-5 sm:mb-8">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          loading="lazy"
                          className="w-14 h-14 rounded-full object-cover"
                          style={{ border: '2px solid var(--border-default)' }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <p className="text-sm lg:text-[15px] font-body leading-relaxed flex-1 mb-6" style={{ color: 'var(--brand-teal-dark)' }}>
                        {t.text}
                      </p>
                      <p className="text-sm font-headline font-semibold text-brand-teal">
                        {t.name}{t.role ? ', ' : ''}{t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5 mt-10">
          {Array.from({ length: maxOffset + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setOffset(i)}
              className="rounded-full cursor-pointer transition-all duration-300"
              style={{
                width: i === offset ? '10px' : '8px',
                height: i === offset ? '10px' : '8px',
                backgroundColor: i === offset ? 'var(--brand-teal)' : 'var(--brand-teal-light)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
