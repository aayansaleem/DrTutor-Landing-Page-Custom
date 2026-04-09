import React from 'react';
import {
  PricingHeroSection,
  PricingCardsSection,
  MonthlyPackagesSection,
  PricingAddOnsSection,
  PricingTrustBanner,
  CTASection,
} from '../sections';

export const PricingPage: React.FC = () => {
  return (
    <>
      <PricingHeroSection />
      <PricingCardsSection />
      <MonthlyPackagesSection />
      <PricingAddOnsSection />
      <PricingTrustBanner />
      <CTASection />
    </>
  );
};
