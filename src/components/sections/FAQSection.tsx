import React from 'react';
import { Container, Accordion } from '../ui';
import { faqs } from '@/data/faqs';

export const FAQSection: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--bg-section-alt)' }}
      id="faq"
    >
      <Container>
        <div className="mb-10 md:mb-12 lg:mb-14 text-center">
          <h2
            className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-brand-teal mb-10 sm:mb-14 md:mb-16 lg:mb-20"
          >
            Frequently asked questions
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </Container>
    </section>
  );
};
