import React from 'react';
import { Container } from '../ui';
import { CTASection } from '../sections';

const sections = [
  {
    title: '1. Our Services',
    items: [
      'DrTutor is a tutoring platform committed to helping students from KS2 to A-Level succeed.',
      'We provide personalised, online science lessons designed to boost confidence, help students retain information, and improve academic results.',
      'Our subject focus is on making science simple from KS2 to A-Levels, though we offer tutoring for all subjects across KS2, KS3, GCSE, A-Level, and 11+ Exam Prep.',
      'We also provide study resources to help students with their homework.',
    ],
  },
  {
    title: '2. Tutor Information',
    items: [
      'Our platform features expert tutors, some of whom are PGCE qualified.',
      'We highlight tutors who have successfully delivered over 100 lessons.',
      'While we refer to our tutors as "trusted", the provided document does not state whether tutors have undergone a DBS check.',
    ],
  },
  {
    title: '3. Booking and Scheduling',
    items: [
      'Lessons are fully online and can be accessed from anywhere.',
      'You can choose a time that works for you, with sessions available after school or on weekends.',
      'The process involves finding a tutor and booking an assessment or lesson via the website.',
    ],
  },
  {
    title: '4. Payments and Billing',
    items: [
      'The cost of a tutor varies depending on the individual tutor\'s rates. Examples shown in the document range from £30 to £60 per hour.',
      'The document does not specify how you will be charged for lessons.',
      'The presence of the Stripe logo suggests that payments are handled through their online payment processing system.',
    ],
  },
  {
    title: '5. User Responsibilities',
    items: [
      'You agree to use the DrTutor platform and study resources for personal, non-commercial educational purposes only.',
      'Students are expected to participate actively in lessons to achieve the best academic results. Our tutors follow Doug Lemov\'s "Teach Like a Champion" framework to deliver engaging and effective online lessons.',
    ],
  },
  {
    title: '6. Personalised Approach',
    items: [
      'Every student learns at their own pace. Our tutors tailor lessons to your child\'s specific needs, whether they are catching up or aiming to get ahead.',
      'We provide personalised plans and regular feedback so you are always aware of a student\'s strengths and areas for improvement.',
    ],
  },
  {
    title: '7. Intellectual Property',
    items: [
      'All content on this website, including the study resources used by over a million students, is the property of DrTutor and is intended for personal use to assist with homework and learning.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    items: [
      'DrTutor is a platform dedicated to improving student success. We aim to build confidence and improve grades. However, we do not guarantee specific academic outcomes, as results depend on various factors including student engagement. Our service is designed to guide, support, and motivate.',
    ],
  },
  {
    title: '9. Changes to Terms',
    items: [
      'DrTutor reserves the right to modify these terms and conditions at any time. We recommend that users review this page periodically to stay informed of any changes.',
    ],
  },
  {
    title: '10. Contact Information',
    items: [
      'If you have any questions, we are here to help. Please refer to the "Contact us" section of our website.',
    ],
  },
];

export const TermsPage: React.FC = () => {
  return (
    <>
      <section
        className="pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-20 lg:pb-24"
        style={{ backgroundColor: 'var(--bg-page)' }}
      >
        <Container>
          {/* Page heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-headline font-semibold text-center text-brand-teal mb-8 md:mb-10"
          >
            Terms and Conditions
          </h1>

          {/* Last updated */}
          <p
            className="text-xs font-body font-semibold mb-4"
            style={{ color: 'var(--brand-teal)' }}
          >
            Last Updated: June 7, 2025
          </p>

          {/* Intro paragraph */}
          <p
            className="text-sm font-body leading-relaxed mb-8"
            style={{ color: 'var(--text-primary)' }}
          >
            Welcome to DrTutor. These Terms and Conditions govern your use of our website and the tutoring services offered.
            By accessing our website and booking our services, you agree to be bound by the terms outlined below.
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
                <ul className="space-y-1.5 pl-1">
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
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
};
