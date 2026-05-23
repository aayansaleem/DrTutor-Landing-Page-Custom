import React from 'react';
import { Container, SEO } from '../ui';
import { CTASection } from '../sections';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.drtutor.uk/' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://www.drtutor.uk/privacy' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy',
  url: 'https://www.drtutor.uk/privacy',
  description:
    'How Dr Tutor collects, uses, and protects the personal data of parents and children, in line with UK GDPR and PECR.',
  inLanguage: 'en-GB',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Dr Tutor',
    url: 'https://www.drtutor.uk',
  },
  about: {
    '@type': 'EducationalOrganization',
    name: 'Dr Tutor',
    legalName: 'DRTUTOR LTD',
    url: 'https://www.drtutor.uk',
  },
  dateModified: '2026-05-23',
};

interface Section {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

const sections: Section[] = [
  {
    title: '1. Who we are',
    paragraphs: [
      'Dr Tutor is the trading name of DRTUTOR LTD, a company registered in England (No. 16076105) at 21 Fulford Grove, Watford WD19 7QQ, United Kingdom. We are the "data controller" for the personal information described in this policy, which means we decide how and why your data is used.',
      'If you have any questions about your data or want to use one of the rights set out below, email us at contact@drtutor.uk and we will respond within 30 days.',
    ],
  },
  {
    title: '2. What we collect',
    paragraphs: [
      'We try to collect as little as possible, and only what we actually need to help your child learn. The categories are:',
    ],
    items: [
      'Parent details you give us through the assessment form on /learn: your name, phone number, email address, and your child\'s age.',
      'Anonymised analytics through Google Analytics 4, but only after you accept cookies. This includes things like which pages you visited and roughly where in the UK you are.',
      'Standard server logs kept by our hosting providers (IP address, browser type, the page you requested, the time of the request). These are used for security and to keep the site running.',
    ],
  },
  {
    title: '3. Why we use it, and our legal basis',
    paragraphs: [
      'Under UK GDPR we have to tell you the "lawful basis" for each thing we do with your data. Ours are:',
    ],
    items: [
      'Form submissions on /learn (name, phone, email, child age): we use these to book your free 30-minute assessment, match a tutor, and follow up about the assessment. Lawful basis: Article 6(1)(b), pre-contractual steps taken at your request.',
      'Marketing follow-up beyond the assessment booking itself: only if you opt in. Lawful basis: Article 6(1)(a), your explicit consent. You can withdraw at any time by replying "unsubscribe" or emailing contact@drtutor.uk.',
      'Analytics and ad-conversion cookies: only if you accept them in the cookies banner. Lawful basis: Article 6(1)(a), your consent. UK PECR also requires this consent for any non-essential cookies.',
      'Server security logs: lawful basis Article 6(1)(f), our legitimate interest in keeping the site available and safe from abuse.',
    ],
  },
  {
    title: '4. Who else sees your data',
    paragraphs: [
      'We do not sell your data. We share it only with the providers and people listed below, and only with what they need:',
    ],
    items: [
      'Google LLC, for Google Analytics 4 (measurement ID G-29J2MTL3ZW) and Google Ads conversion tracking (account AW-17962620600). US-based. Transfers covered by the EU-US Data Privacy Framework and Standard Contractual Clauses.',
      'Vercel Inc., the host for this marketing site. US-based, with EU data residency where supported, and Standard Contractual Clauses in place.',
      'DigitalOcean LLC, the host for our backend services and database. We use UK or EU regions wherever possible; otherwise Standard Contractual Clauses apply.',
      'Your assigned tutor, who receives the matched parent and child details they need to plan and deliver lessons: parent name, child age, and the learning need you described.',
      'We do not send marketing email to anyone who has not first given explicit consent (PECR rule). Our outreach workflow is set out internally at docs/outreach/LEGAL-GDPR-PECR.md and the rule is the same in every case: consent first, email second.',
    ],
  },
  {
    title: '5. International transfers',
    paragraphs: [
      'Most of our data stays in the UK or EU. Some processing (Google, Vercel) happens in the United States. Where that is the case, we rely on the EU-US Data Privacy Framework, the UK extension to it, or Standard Contractual Clauses, with supplementary measures where appropriate. You can ask us for a copy of the relevant safeguards.',
    ],
  },
  {
    title: '6. How long we keep it',
    items: [
      'Enquiries that did not turn into lessons: 12 months from your form submission, then deleted.',
      'Active customer records: for as long as you are a customer, plus 6 years after the last lesson, which is the UK statutory retention period for service contracts.',
      'Google Analytics data: 14 months (the GA4 default), then automatically deleted.',
      'Server security logs: 90 days.',
    ],
  },
  {
    title: '7. Your rights',
    paragraphs: [
      'UK GDPR gives you the following rights, free of charge, in plain English:',
    ],
    items: [
      'Access: ask for a copy of the data we hold about you.',
      'Rectification: ask us to correct anything inaccurate.',
      'Erasure: ask us to delete your data ("right to be forgotten").',
      'Restriction: ask us to pause processing while a question is sorted out.',
      'Portability: ask for your data in a portable, machine-readable format.',
      'Objection: object to processing based on legitimate interests.',
      'Withdraw consent: where we relied on your consent, you can take it back at any time.',
      'Complaint: lodge a complaint with the Information Commissioner\'s Office at ico.org.uk or call 0303 123 1113. We would appreciate the chance to fix things first, but it is your right to go straight to the ICO.',
    ],
    /* second paragraphs handled by trailing block in render */
  },
  {
    title: '8. Cookies',
    paragraphs: [
      'When you first visit the site, a small banner asks you whether to accept cookies. By default everything non-essential is switched off (Google Consent Mode v2, all signals set to "denied"). Nothing changes until you click Accept.',
      'We use three categories:',
    ],
    items: [
      'Strictly necessary: required for the site to function (e.g. remembering your cookie choice). Always on, no consent needed.',
      'Analytics: Google Analytics 4. Only loads if you accept.',
      'Marketing / ads: Google Ads conversion tracking. Only loads if you accept.',
    ],
  },
  {
    title: '9. Children',
    paragraphs: [
      'Our service is bought by parents or guardians on behalf of a child. The assessment form is filled in by an adult and the only thing we ask about the child is their age, which we need to match the right tutor. We do not knowingly collect data directly from anyone under 13. If you think a child has used the site without a parent\'s knowledge, please email contact@drtutor.uk and we will remove the information.',
    ],
  },
  {
    title: '10. How we keep your data safe',
    items: [
      'Encrypted in transit: every page on drtutor.uk is served over TLS (HTTPS).',
      'Encrypted at rest: the database storing your enquiry is encrypted.',
      'Least access: only the people who genuinely need to see your enquiry can see it (the team member matching tutors, and your assigned tutor).',
      'No payment data on this site: the free assessment costs nothing, so we do not take card details on /learn.',
    ],
  },
  {
    title: '11. Changes to this policy',
    paragraphs: [
      'If we make a meaningful change to how we handle your data, we will update the "Last updated" date at the top of this page and show a notice in the cookies banner area so you see it on your next visit. Minor wording tweaks happen quietly.',
    ],
  },
  {
    title: '12. Contact',
    paragraphs: [
      'For anything privacy-related, email contact@drtutor.uk. We aim to reply within 5 working days and will resolve formal data-rights requests within 30 days, as UK GDPR requires.',
    ],
  },
];

export const PrivacyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Dr Tutor"
        description="How Dr Tutor collects, uses, and protects the personal data of parents and children, in line with UK GDPR and PECR. Plain English, parent-readable."
        path="/privacy"
        schema={[webPageSchema, breadcrumbSchema]}
      />
      <section
        className="pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-20 lg:pb-24"
        style={{ backgroundColor: 'var(--bg-page)' }}
      >
        <Container>
          {/* Page heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-headline font-semibold text-center text-brand-teal mb-8 md:mb-10"
          >
            Privacy Policy
          </h1>

          {/* Last updated */}
          <p
            className="text-xs font-body font-semibold mb-4"
            style={{ color: 'var(--brand-teal)' }}
          >
            Last Updated: 23 May 2026
          </p>

          {/* Intro paragraph */}
          <p
            className="text-sm font-body leading-relaxed mb-8"
            style={{ color: 'var(--text-primary)' }}
          >
            This policy explains, in plain English, what data we collect when you visit drtutor.uk
            or book a free assessment, why we collect it, who we share it with, and the rights you
            have under the UK GDPR and the Privacy and Electronic Communications Regulations
            (PECR). If anything below is unclear, please email contact@drtutor.uk and we will
            walk you through it.
          </p>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <h2
                  className="text-sm font-headline font-semibold mb-2"
                  style={{ color: 'var(--brand-teal)' }}
                >
                  {section.title}
                </h2>
                {section.paragraphs?.map((p, i) => (
                  <p
                    key={`p-${i}`}
                    className="text-sm font-body leading-relaxed mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {p}
                  </p>
                ))}
                {section.items && (
                  <ul className="space-y-1.5 pl-1 mt-2">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm font-body leading-relaxed"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'var(--brand-teal)' }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
};
