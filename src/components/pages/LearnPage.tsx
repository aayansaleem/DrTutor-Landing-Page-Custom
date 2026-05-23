import React, { useEffect } from 'react';
import { SEO } from '../ui';
import {
  LearnHero,
  TrustStrip,
  JourneySection,
  LearnTutorsSection,
  LearnTeachingCycleSection,
  MethodSection,
  LearnTestimonialsSection,
  PricingPeek,
  FormSection,
  LearnFaqSection,
  FinalCta,
  StickyCta,
} from '../learn';
import { FeaturedVideoSection } from '../sections/FeaturedVideoSection';
import { captureAttribution } from '@/lib/leads';
import { learnFaqs } from '@/data/learn';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Free academic assessment',
  name: 'Free 30-minute online academic assessment',
  provider: { '@type': 'EducationalOrganization', name: 'Dr Tutor', url: 'https://www.drtutor.uk' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  description:
    'A free 30-minute online assessment with a PGCE-qualified tutor for UK students from KS2 to A-Level. Identifies learning gaps and provides a written report with recommended hours to reach the target grade. No cost, no card, no obligation.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP', availability: 'https://schema.org/InStock' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: learnFaqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

export const LearnPage: React.FC = () => {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
      <SEO
        title="Book a Free Assessment | Dr Tutor — PGCE-Qualified UK Tutors"
        description="See exactly where your child needs help. Book a free 30-minute online assessment with a PGCE-qualified tutor, KS2 to A-Level. No cost, no card, no obligation."
        path="/learn"
        schema={[serviceSchema, faqSchema]}
      />
      <LearnHero />
      <div id="learn-hero-sentinel" aria-hidden="true" />
      <TrustStrip />
      <JourneySection />
      <LearnTutorsSection />
      <FeaturedVideoSection compact />
      <LearnTeachingCycleSection />
      <MethodSection />
      <LearnTestimonialsSection />
      <PricingPeek />
      <FormSection />
      <LearnFaqSection />
      <FinalCta />
      <StickyCta />
    </div>
  );
};
