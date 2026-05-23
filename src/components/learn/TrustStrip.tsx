import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { stages } from '@/data/stages';

/** Mirrors the homepage StagesSection — solid teal pills, infinite marquee. */
export const TrustStrip: React.FC = () => {
  const reduce = useReducedMotion();
  const row = [...stages, ...stages, ...stages, ...stages];

  return (
    <section className="bg-white py-8 relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex gap-4 w-max"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={reduce ? undefined : { duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((stage, i) => (
          <span
            key={i}
            className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-full text-white text-xs font-body font-semibold"
            style={{ backgroundColor: 'var(--brand-teal)' }}
          >
            <span className="w-2 h-2 rounded-full bg-white/60" />
            {stage.label}
          </span>
        ))}
      </motion.div>
    </section>
  );
};
