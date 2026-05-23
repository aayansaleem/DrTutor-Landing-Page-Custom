import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Reveal } from './primitives';
import { keyStages } from '@/data/pricing';

/** Pulls the Standard-tier starting prices straight from the pricing data so
 *  the kinetic cycle is always honest. */
const STAGES = keyStages.map((k) => ({
  label: k.shortLabel,
  fullLabel: k.stage,
  price: k.tiers.standard,
}));

const CYCLE_MS = 2400;

/** Compact pricing transparency strip between Testimonials and the booking
 *  form. Kinetic: the price + stage chip cycle through KS2 → KS3 → GCSE →
 *  A-Level in sync, showing the parent that pricing scales by stage without
 *  a full table. Reduced-motion users see the lowest stage statically. */
export const PricingPeek: React.FC = () => {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % STAGES.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [reduce]);

  const current = STAGES[idx];

  return (
    <section className="py-12 md:py-14 lg:py-16" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl p-7 sm:p-9 lg:p-11"
            style={{
              background: 'linear-gradient(160deg, #11A0A0 0%, #0E8C8C 55%, #0B7878 100%)',
              boxShadow: '0 14px 36px rgba(14,140,140,0.28), 0 4px 12px rgba(3,26,53,0.10)',
            }}
          >
            {/* Decorative light blob top-right */}
            <span
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)' }}
            />
            {/* Top highlight seam */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)' }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-7 lg:gap-10 items-center">
              {/* Left — pitch + CTA */}
              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 font-body font-bold text-[11px] uppercase tracking-[0.16em] text-white"
                  style={{ backgroundColor: 'rgba(255,255,255,0.16)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#9CE0BB' }} />
                  Transparent pricing
                </span>

                {/* Kinetic headline — the WHOLE line swaps as one motion
                    element. No inline splicing so there's no baseline drift.
                    Container height pinned to one line, width pinned to the
                    widest variant via an invisible spacer. */}
                <h2
                  className="font-headline font-semibold text-white leading-[1.2] mb-3 text-xl sm:text-2xl md:text-[1.8rem] lg:text-[2rem]"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span
                    className="relative inline-block overflow-hidden align-top"
                    style={{ height: '1.2em' }}
                  >
                    <span className="invisible whitespace-nowrap" aria-hidden="true">
                      A-Level from £50 / hour
                    </span>
                    <AnimatePresence initial={false}>
                      <motion.span
                        key={`line-${idx}`}
                        initial={{ y: reduce ? 0 : '100%', opacity: reduce ? 1 : 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        exit={{ y: reduce ? 0 : '-100%', opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-0 whitespace-nowrap"
                      >
                        {current.label} from £{current.price} / hour
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </h2>

                <p
                  className="font-body text-sm sm:text-base leading-relaxed mb-6 max-w-md"
                  style={{ color: 'rgba(255,255,255,0.82)' }}
                >
                  Pay monthly and save up to 15% with 4 or 8 session packages.
                </p>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-full font-body font-semibold text-sm text-brand-teal-dark bg-white hover:shadow-lg active:scale-[0.97] transition-all"
                  style={{ boxShadow: '0 10px 24px rgba(3,26,53,0.18)' }}
                >
                  See full pricing
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Right — glassy Monthly Packages mini-card */}
              <div
                className="relative rounded-2xl p-5 sm:p-6"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(10px) saturate(1.3)',
                  WebkitBackdropFilter: 'blur(10px) saturate(1.3)',
                  border: '1px solid rgba(255,255,255,0.20)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
                }}
              >
                <span
                  className="block font-body font-bold text-[11px] uppercase tracking-[0.18em] mb-3"
                  style={{ color: 'rgba(255,255,255,0.78)' }}
                >
                  Monthly packages
                </span>
                <ul className="space-y-0">
                  <li className="flex items-center justify-between gap-3 py-2">
                    <span className="font-body text-sm text-white">4 sessions / month</span>
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-1 font-body font-bold text-[11px]"
                      style={{ backgroundColor: 'rgba(255,255,255,0.94)', color: 'var(--brand-teal-dark)' }}
                    >
                      10% off
                    </span>
                  </li>
                  <li className="h-px w-full" aria-hidden="true" style={{ background: 'rgba(255,255,255,0.14)' }} />
                  <li className="flex items-center justify-between gap-3 py-2">
                    <span className="font-body text-sm text-white">8 sessions / month</span>
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-1 font-body font-bold text-[11px]"
                      style={{ backgroundColor: 'rgba(255,255,255,0.94)', color: 'var(--brand-teal-dark)' }}
                    >
                      15% off
                    </span>
                  </li>
                </ul>
                <p
                  className="mt-4 pt-3 font-body text-xs"
                  style={{ color: 'rgba(255,255,255,0.70)', borderTop: '1px solid rgba(255,255,255,0.12)' }}
                >
                  More sessions, bigger saving.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
