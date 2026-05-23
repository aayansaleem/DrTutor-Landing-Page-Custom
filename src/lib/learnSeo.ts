/**
 * SEO config for /learn, kept OUTSIDE the lazy-loaded LearnPage chunk so
 * App.tsx can render <SEO /> synchronously on route change. This means
 * document.title, the canonical, and the meta tags apply on first paint —
 * not after the lazy chunk downloads + React hydrates (which on slow links
 * leaves bots and social-share crawlers reading the homepage meta for ~3s).
 */
import { learnFaqs } from '@/data/learn';

export const LEARN_SEO_TITLE =
  'Book a Free Assessment | Dr Tutor: PGCE-Qualified UK Tutors';

export const LEARN_SEO_DESCRIPTION =
  'See exactly where your child needs help. Book a free 30-minute online assessment with a PGCE-qualified tutor, KS2 to A-Level. No cost, no card, no obligation.';

export const learnServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Free academic assessment',
  name: 'Free 30-minute online academic assessment',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Dr Tutor',
    url: 'https://www.drtutor.uk',
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  description:
    'A free 30-minute online assessment with a PGCE-qualified tutor for UK students from KS2 to A-Level. Identifies learning gaps and provides a written report with recommended hours to reach the target grade. No cost, no card, no obligation.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
  },
};

export const learnFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: learnFaqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};
