import React from 'react';
import { motion } from 'motion/react';
import { Reveal } from './primitives';
import { journey } from '@/data/learn';
import bookClock from '@/assets/images/book-clock.avif';
import calendar from '@/assets/images/calendar.avif';
import bookBulb from '@/assets/images/book-bulb.avif';

const stepImages: Record<string, string> = {
  '01': bookClock,
  '02': calendar,
  '03': bookBulb,
};

/** "How it works, step by step" — replaces the previous Offer + Steps sections
 *  (they told the same story twice). Two-tone cards: soft teal-gradient image
 *  area on top with the step badge floating over it, deep teal body below
 *  carrying title + detail in white. Both halves run edge-to-edge inside the
 *  card's rounded-3xl outer shell. */
export const JourneySection: React.FC = () => {
  return (
    <section className="py-12 md:py-14 lg:py-16" style={{ backgroundColor: 'var(--bg-section-alt)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <span className="font-body font-semibold text-xs uppercase tracking-[0.16em] text-brand-teal">Your free assessment</span>
          <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-brand-teal mt-3 mb-4">
            How it works, step by step
          </h2>
          <p className="font-body text-sm sm:text-base text-brand-navy/65 leading-relaxed">
            Three quick steps from booking to a clear plan for your child.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {journey.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(14,140,140,0.32), 0 8px 16px rgba(3,26,53,0.10)' }}
              className="group h-full flex flex-col rounded-3xl overflow-hidden"
              style={{
                boxShadow: '0 8px 22px rgba(14,140,140,0.18), 0 2px 6px rgba(3,26,53,0.06)',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
            >
              {/* Image area — soft teal gradient, edge-to-edge top of card */}
              <div
                className="relative flex items-center justify-center px-6"
                style={{
                  height: 'clamp(170px, 22vw, 210px)',
                  background: 'linear-gradient(135deg, var(--brand-teal-mid-light) 0%, var(--brand-teal-light) 55%, var(--brand-teal-lighter) 100%)',
                }}
              >
                <img
                  src={stepImages[step.number]}
                  alt=""
                  aria-hidden="true"
                  className="max-h-[80%] w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-[0_8px_18px_rgba(3,26,53,0.12)]"
                />
                <span
                  className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1 font-body font-bold text-[11px] uppercase tracking-[0.14em] text-white"
                  style={{
                    background: 'linear-gradient(135deg, var(--brand-teal) 0%, var(--brand-teal-dark) 100%)',
                    boxShadow: '0 6px 14px rgba(8,104,104,0.32)',
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px]"
                    style={{ backgroundColor: 'rgba(255,255,255,0.22)' }}
                  >
                    {step.number}
                  </span>
                  {step.label}
                </span>
              </div>

              {/* Dark body — edge-to-edge bottom of card, white text */}
              <div
                className="relative flex flex-col flex-1 px-6 sm:px-7 pt-6 pb-7 overflow-hidden"
                style={{
                  // Anchored on the tutor-card teal (#0E8C8C) so the journey
                  // cards match that family, brighter than the previous near-
                  // navy gradient but still dark enough for white text to read.
                  background: 'linear-gradient(160deg, #11A0A0 0%, #0E8C8C 55%, #0B7878 100%)',
                  color: '#FFFFFF',
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)' }}
                />
                <h3 className="font-headline font-semibold text-lg sm:text-[1.2rem] text-white leading-snug mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
