import React from 'react';
import {
  ResourcesHeroSection,
  TeachingTechniquesSection,
  TeachingCycleSection,
  LessonsStickSection,
  CTASection,
} from '../sections';
import { SEO } from '../ui';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.drtutor.uk/' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://www.drtutor.uk/resources' },
  ],
};

export const ResourcesPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Free Science Resources | Dr Tutor — Revision Guides & Study Materials"
        description="Access free downloadable science resources for KS2, KS3, GCSE and A-Level students. Revision guides, topic summaries, past paper tips and more from PGCE-qualified tutors."
        path="/resources"
        schema={breadcrumbSchema}
      />
      <ResourcesHeroSection />
      <TeachingTechniquesSection />
      <TeachingCycleSection />
      <LessonsStickSection />
      <CTASection />
    </>
  );
};
