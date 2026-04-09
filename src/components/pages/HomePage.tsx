import React from 'react';
import {
  HeroSection,
  StagesSection,
  AboutSection,
  FeaturesSection,
  TutorsSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from '../sections';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <StagesSection />
      <AboutSection />
      <FeaturesSection />
      <TutorsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
};
