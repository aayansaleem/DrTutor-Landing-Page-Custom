import React from 'react';
import { ContactHeroSection, CTASection } from '../sections';
import { SEO } from '../ui';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.drtutor.uk/' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.drtutor.uk/contact' },
  ],
};

export const ContactPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Contact Us | Dr Tutor — Get in Touch or Book a Free Assessment"
        description="Have questions about our science tutoring? Get in touch with Dr Tutor via WhatsApp, email or our contact form. Book a free assessment for your child today."
        path="/contact"
        schema={breadcrumbSchema}
      />
      <ContactHeroSection />
      <CTASection />
    </>
  );
};
