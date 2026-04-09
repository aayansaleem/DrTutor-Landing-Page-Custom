import React, { useState, useCallback } from 'react';
import { Container } from '../ui';
import { testimonials } from '@/data/testimonials';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const TestimonialsSection: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 640px)');
  const VISIBLE = isDesktop ? 3 : isTablet ? 2 : 1;

  const [offset, setOffset] = useState(0);
  const maxOffset = Math.max(0, testimonials.length - VISIBLE);

  const prev = useCallback(() => setOffset((o) => Math.max(0, o - 1)), []);
  const next = useCallback(() => setOffset((o) => Math.min(maxOffset, o + 1)), [maxOffset]);

  // Active dot = which "page" we're closest to
  const activeDot = Math.round(offset / 1);

  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--bg-section-alt)' }}
      id="testimonials"
    >
      <Container>
        {/* ── Heading — left-aligned ── */}
        <div className="mb-10 md:mb-12 lg:mb-14">
          <h2
            className="text-center font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-brand-teal mb-10 sm:mb-14 md:mb-16 lg:mb-20"
          >
            Perfect Match
          </h2>
        </div>

        {/* ── Carousel wrapper ── */}
        <div className="relative">

          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute -left-2 sm:-left-4 md:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: 'rgba(200,200,200,0.4)',
              backdropFilter: 'blur(4px)',
              color: 'var(--text-secondary)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute -right-2 sm:-right-4 md:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: 'rgba(200,200,200,0.4)',
              backdropFilter: 'blur(4px)',
              color: 'var(--text-secondary)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

          {/* Sliding track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${offset * (100 / VISIBLE)}%)`,
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-shrink-0 px-2.5 lg:px-3"
                  style={{ width: `${100 / VISIBLE}%` }}
                >
                  <div
                    className="rounded-2xl flex flex-col overflow-hidden relative group transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border: '1px solid var(--border-default)',
                      backgroundColor: '#FFFFFF',
                      minHeight: 'clamp(300px, 40vw, 380px)',
                    }}
                  >
                    {/* Teal gradient from bottom — default state */}
                    <div
                      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-400"
                      style={{
                        background: 'linear-gradient(to top, rgba(15,165,165,0.10) 0%, rgba(15,165,165,0.04) 40%, transparent 70%)',
                      }}
                    />
                    {/* Teal gradient from bottom — hover state (stronger) */}
                    <div
                      className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{
                        background: 'linear-gradient(to top, rgba(15,165,165,0.22) 0%, rgba(15,165,165,0.10) 40%, transparent 70%)',
                      }}
                    />

                    <div className="flex flex-col flex-1 p-5 sm:p-7 lg:p-8 relative z-10">
                      {/* Avatar */}
                      <div className="mb-5 sm:mb-8">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-14 h-14 rounded-full object-cover"
                          style={{ border: '2px solid var(--border-default)' }}
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Quote */}
                      <p
                        className="text-sm lg:text-[15px] font-body leading-relaxed flex-1 mb-6"
                        style={{ color: 'var(--brand-teal-dark)' }}
                      >
                        {t.text}
                      </p>

                      {/* Name + role */}
                      <div>
                        <p
                          className="text-sm font-headline font-semibold text-brand-teal"
                        >
                          {t.name}{t.role ? ', ' : ''}{t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Dot pagination — one dot per slide position ── */}
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
      </Container>
    </section>
  );
};
