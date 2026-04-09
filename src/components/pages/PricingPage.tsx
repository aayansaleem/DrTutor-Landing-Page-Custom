import React from 'react';
import {
  PricingHeroSection,
  PricingCardsSection,
  MonthlyPackagesSection,
  PricingAddOnsSection,
  PricingTrustBanner,
  CTASection,
} from '../sections';
import { SEO } from '../ui';
import { keyStages, specialistPrice } from '@/data/pricing';

const provider = {
  '@type': 'EducationalOrganization',
  name: 'Dr Tutor',
  url: 'https://www.drtutor.uk',
};

// One Service schema per key stage, with an AggregateOffer covering the Standard → Expert price range.
const serviceSchemas = keyStages.map((stage) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Online Science Tutoring',
  provider,
  name: `${stage.stage} Science Tutoring`,
  description: `Personalised online ${stage.stage} science tutoring delivered by PGCE-qualified specialists. Flexible monthly packages with no hidden fees.`,
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'GBP',
    lowPrice: stage.tiers.standard,
    highPrice: stage.tiers.expert,
    offerCount: 3,
    url: 'https://www.drtutor.uk/pricing',
  },
}));

const specialistService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Specialist Exam Preparation',
  provider,
  name: 'Specialist Tutoring (11+ & Senior Examiners)',
  description:
    'Intensive specialist preparation from senior examiners and specialist teachers, including 11+ exam preparation and advanced A-Level revision programmes.',
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  offers: {
    '@type': 'Offer',
    price: specialistPrice,
    priceCurrency: 'GBP',
    url: 'https://www.drtutor.uk/pricing',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.drtutor.uk/' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://www.drtutor.uk/pricing' },
  ],
};

export const PricingPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Pricing & Packages | Dr Tutor — Transparent Science Tutoring Rates"
        description="View Dr Tutor's transparent monthly tutoring packages for KS2, KS3, GCSE and A-Level science. No hidden fees, flexible plans, and add-on sessions available. See what's included."
        path="/pricing"
        schema={[breadcrumbSchema, ...serviceSchemas, specialistService]}
      />
      <PricingHeroSection />
      <PricingCardsSection />
      <MonthlyPackagesSection />
      <PricingAddOnsSection />
      <PricingTrustBanner />
      <CTASection />
    </>
  );
};
