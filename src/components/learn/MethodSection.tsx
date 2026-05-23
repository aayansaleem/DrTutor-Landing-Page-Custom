import React from 'react';
import { motion } from 'motion/react';
import { Reveal } from './primitives';
import { techniquePills } from '@/data/learn';
import dashboardImg from '@/assets/images/laptop-hero.png';

export const MethodSection: React.FC = () => {
  return (
    <section className="py-12 md:py-14 lg:py-16" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="teaching-card-bg rounded-3xl px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 lg:px-16 lg:py-14 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <Reveal>
            <span className="font-body font-semibold text-xs uppercase tracking-[0.16em] text-brand-teal">Trained on a real method</span>
            <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mt-3 mb-4 text-brand-teal">
              The techniques behind every lesson
            </h2>
            <p className="text-sm sm:text-base font-body leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Our tutors are trained on Doug Lemov's "Teach Like a Champion" approach. Lessons are planned, curriculum-aligned, and built on proven techniques that keep your child engaged and learning.
            </p>
            <ul className="flex flex-wrap gap-2">
              {techniquePills.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-body font-semibold text-xs"
                  style={{ backgroundColor: '#FFFFFF', color: 'var(--brand-teal-dark)', border: '1px solid rgba(15,165,165,0.18)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand-teal)' }} />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative">
              <motion.div
                className="absolute -inset-5 rounded-[2.5rem]"
                style={{ background: 'radial-gradient(circle at 55% 40%, rgba(15,165,165,0.18), transparent 70%)' }}
                aria-hidden="true"
                animate={{ opacity: [0.55, 0.85, 0.55] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                src={dashboardImg}
                alt="Dr Tutor progress tracking dashboard"
                loading="lazy"
                className="relative w-full h-auto drop-shadow-[0_22px_44px_rgba(3,26,53,0.16)]"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
