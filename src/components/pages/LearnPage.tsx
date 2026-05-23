import React, { useEffect } from 'react';
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

/**
 * SEO meta (title, description, canonical, JSON-LD) for this route is rendered
 * from App.tsx — see `src/lib/learnSeo.ts` — so it lands on first paint instead
 * of waiting for this lazy chunk to hydrate. Don't add another <SEO /> here.
 */
export const LearnPage: React.FC = () => {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
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
