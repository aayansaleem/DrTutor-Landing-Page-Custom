import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Reveal } from './primitives';
import { AssessmentForm } from './AssessmentForm';

export const FormSection: React.FC = () => {
  return (
    <section id="book" className="relative py-12 md:py-14 lg:py-16" style={{ backgroundColor: 'var(--bg-section-alt)' }}>
      <div className="relative mx-auto max-w-lg px-4 sm:px-6 text-center">
        <Reveal>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-body font-semibold text-xs text-brand-teal-dark"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-default)' }}
          >
            <ShieldCheck size={15} /> Free and no obligation
          </span>
          <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-brand-teal leading-tight mt-4 mb-3">
            Book your child's free assessment
          </h2>
          <p className="font-body text-sm sm:text-base text-brand-navy/65 leading-relaxed mb-8">
            Four quick details and we'll be in touch to arrange a time. It really is that simple.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <AssessmentForm instanceId="inline" className="text-left" />
        </Reveal>
      </div>
    </section>
  );
};
