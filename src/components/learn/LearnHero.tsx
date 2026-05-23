import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { AssessmentForm } from './AssessmentForm';
import { trustSignals } from '@/data/learn';
import { tutors } from '@/data/tutors';

const scrollToBook = () => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });

const headlineWords = ['See', 'exactly', 'where', 'your', 'child', 'needs', 'help'];

export const LearnHero: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section className="hero-bg relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 rounded-b-[40px] sm:rounded-b-[56px]">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-10 lg:gap-12 items-center">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5 font-body font-semibold text-xs text-brand-teal-dark"
              style={{ backgroundColor: 'rgba(255,255,255,0.7)', border: '1px solid rgba(15,165,165,0.18)' }}
            >
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--brand-teal)' }}
                animate={reduce ? undefined : { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={reduce ? undefined : { duration: 2, repeat: Infinity }}
              />
              Free 30-minute assessment
            </motion.span>

            <h1
              className="font-headline font-medium text-brand-navy leading-[1.05] tracking-tight text-[2.3rem] sm:text-[2.8rem] lg:text-[3.2rem] mb-5"
            >
              {headlineWords.map((w, i) => (
                <motion.span
                  key={w + i}
                  className={`inline-block ${w === 'exactly' ? 'relative text-brand-teal-dark' : ''}`}
                  style={{ marginRight: '0.26em' }}
                  initial={{ opacity: 0, y: reduce ? 0 : 18, filter: reduce ? 'blur(0)' : 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                  {w === 'exactly' && (
                    <motion.span
                      className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full"
                      style={{ background: 'linear-gradient(90deg, var(--brand-teal-dark), var(--brand-teal))', transformOrigin: 'left' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="font-body text-base sm:text-lg text-brand-navy/75 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-7"
            >
              A free 30-minute online assessment with a PGCE-qualified tutor. We find the gaps, then show you the way forward. No cost, no card, no obligation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="lg:hidden mb-7"
            >
              <button
                onClick={scrollToBook}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-body font-semibold text-sm text-white active:scale-[0.98] transition-transform"
                style={{ background: 'linear-gradient(135deg, var(--brand-teal) 0%, var(--brand-teal-dark) 100%)', boxShadow: '0 10px 24px rgba(13,138,138,0.32)' }}
              >
                Book a free assessment
              </button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-2 mb-6"
            >
              {trustSignals.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-body font-semibold text-xs text-brand-navy w-fit mx-auto sm:mx-0"
                  style={{ backgroundColor: '#E6E1E1' }}
                >
                  <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--brand-teal)' }}>
                    <Check size={11} strokeWidth={4} className="text-white" />
                  </span>
                  {s}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <div className="flex -space-x-2.5">
                {tutors.map((t) => (
                  <img key={t.id} src={t.image} alt={t.name} width={36} height={36} loading="lazy" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                ))}
              </div>
              <span className="font-body text-xs text-brand-navy/65">Taught by real UK teachers, every lesson</span>
            </motion.div>
          </div>

          {/* Right — booking form, compact width */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 22, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block max-w-[440px] w-full justify-self-end"
          >
            <AssessmentForm
              instanceId="hero"
              heading="Book your child's free assessment"
              subheading="Takes under a minute."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
