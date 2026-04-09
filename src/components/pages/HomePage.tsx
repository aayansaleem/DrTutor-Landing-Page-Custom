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
import { SEO } from '../ui';
import { faqs } from '@/data/faqs';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Dr Tutor',
  alternateName: 'DrTutor',
  url: 'https://www.drtutor.uk',
  logo: 'https://www.drtutor.uk/logo.svg',
  image: 'https://www.drtutor.uk/og-image.png',
  description:
    'Dr Tutor provides personalised online science tutoring for UK students from KS2 to A-Levels, delivered by PGCE-qualified specialists. We offer structured lesson plans, real-time progress tracking, comprehensive study resources, and flexible monthly packages with no hidden fees.',
  foundingDate: '2024',
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  serviceType: [
    'Science Tutoring',
    'Online Tutoring',
    'KS2 Tutoring',
    'KS3 Tutoring',
    'GCSE Tutoring',
    'A-Level Tutoring',
    '11+ Preparation',
  ],
  knowsAbout: [
    'Science Education',
    'Biology',
    'Chemistry',
    'Physics',
    'GCSE Science',
    'A-Level Science',
    'KS2 Science',
    'KS3 Science',
    '11+ Exam Preparation',
    'UK National Curriculum',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    url: 'https://www.drtutor.uk/contact',
    availableLanguage: 'English',
  },
  sameAs: [] as string[],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dr Tutor',
  alternateName: 'DrTutor',
  url: 'https://www.drtutor.uk',
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'Dr Tutor',
    url: 'https://www.drtutor.uk',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.drtutor.uk/' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://www.drtutor.uk/pricing' },
    { '@type': 'ListItem', position: 3, name: 'Resources', item: 'https://www.drtutor.uk/resources' },
    { '@type': 'ListItem', position: 4, name: 'Contact', item: 'https://www.drtutor.uk/contact' },
  ],
};

export const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Dr Tutor | Smarter, Personalised Science Tutoring — KS2 to A-Levels"
        description="PGCE-qualified science tutors offering personalised KS2, KS3, GCSE and A-Level tutoring across the UK. Online lessons, progress tracking and free study resources. Book your free assessment today."
        path="/"
        schema={[organizationSchema, websiteSchema, faqSchema, breadcrumbSchema]}
      />
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
