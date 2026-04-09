import React from 'react';
import { Container } from '../ui';
import { Check } from 'lucide-react';

const trustPoints = [
  { text: 'PGCE Qualified Tutors',               iconBg: 'var(--brand-teal-dark)' },
  { text: 'Curriculum-Aligned for Real Results', iconBg: 'var(--brand-teal-dark)' },
  { text: 'Expert Tutors for Every Stage',       iconBg: 'var(--brand-gold)' },
  { text: 'Lessons Tailored to Your Needs',      iconBg: 'var(--brand-teal-dark)' },
];

export const AboutSection: React.FC = () => {
  return (
    <section style={{ backgroundColor: 'var(--bg-muted)' }} className="pt-16 sm:pt-24 lg:pt-32 overflow-hidden">
      <Container className="pb-16 sm:pb-24 lg:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left — Minimalist heading */}
          <div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-headline font-semibold text-brand-teal mb-4"
            >
              Setting a New Standard in Student Success
            </h2>
          </div>

          {/* Right — Minimalist paragraph */}
          <div>
            <p className="text-base sm:text-lg font-body font-normal text-brand-navy/80 leading-relaxed">
              We're a forward-thinking tutoring platform committed to helping students from KS2 to A-Level succeed. Through personalised, online 1:1 science lessons, our trusted tutors help students boost confidence, retain information, and improve academic results. We focus on more than just marks. We build confidence, curiosity, and a love for science that lasts. With every session, your child will receive expert instruction, real-time progress updates — and a boost in motivation, confidence, and grades.
            </p>
          </div>
        </div>
      </Container>

      {/* Marquee trust strip */}
      <div className="border-t border-gray-100 bg-white py-4 sm:py-5 overflow-hidden relative">
        {/* Left edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right edge fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee-reverse gap-6 sm:gap-10" style={{ width: 'max-content' }}>
          {[...trustPoints, ...trustPoints, ...trustPoints, ...trustPoints].map((point, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: point.iconBg }}
              >
                <Check size={14} strokeWidth={3} className="text-white" />
              </div>
              <span className="text-sm font-body font-medium whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                {point.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
