import React from 'react';
import { Accordion } from '@/components/ui';
import { Reveal } from './primitives';
import { learnFaqs } from '@/data/learn';

export const LearnFaqSection: React.FC = () => {
  return (
    <section className="py-12 md:py-14 lg:py-16" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center mb-8 md:mb-10 lg:mb-12">
          <span className="font-body font-semibold text-xs uppercase tracking-[0.16em] text-brand-teal">Good to know</span>
          <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-brand-teal mt-3">
            Questions parents ask first
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <Accordion items={learnFaqs} />
        </Reveal>
      </div>
    </section>
  );
};
