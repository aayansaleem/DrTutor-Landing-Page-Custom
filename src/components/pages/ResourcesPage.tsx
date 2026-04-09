import React from 'react';
import {
  ResourcesHeroSection,
  TeachingTechniquesSection,
  TeachingCycleSection,
  LessonsStickSection,
  CTASection,
} from '../sections';

export const ResourcesPage: React.FC = () => {
  return (
    <>
      <ResourcesHeroSection />
      <TeachingTechniquesSection />
      <TeachingCycleSection />
      <LessonsStickSection />
      <CTASection />
    </>
  );
};
