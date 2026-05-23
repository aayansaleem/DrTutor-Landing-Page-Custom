/**
 * Content for the /learn ad landing page. Kept separate from the marketing-site
 * data so the lander can speak directly to a parent arriving from an ad, with
 * a single goal: book the free assessment. Copy is parent-facing and concrete.
 */

export interface JourneyStep {
  number: string;
  label: string;
  title: string;
  detail: string;
}

/** The single "how your free assessment works" story — booking, the
 *  assessment itself, and the report. Each step carries the value of that
 *  moment so the page tells one tight narrative instead of repeating itself. */
export const journey: JourneyStep[] = [
  {
    number: '01',
    label: 'Book',
    title: 'Four details, under a minute',
    detail: "Your name, phone, email, and your child's age. No card, no account. Done before the kettle boils.",
  },
  {
    number: '02',
    label: 'Meet',
    title: 'A free 30-minute assessment',
    detail: "An experienced academic manager meets your child on Zoom or Google Meet, and pinpoints the exact gaps holding them back.",
  },
  {
    number: '03',
    label: 'Plan',
    title: 'A clear plan you can act on',
    detail: "A short written report with strengths, the gaps to close, and the recommended hours to reach your child's target grade.",
  },
];

/** Teach Like a Champion techniques used in lessons. */
export const techniquePills: string[] = [
  'Warm Call',
  'Check for Understanding',
  'No Opt Out',
  'Right is Right',
  'Wait Time',
];

export interface LearnFaq {
  id: string;
  question: string;
  answer: string;
}

/** Conversion-relevant FAQs only — objection handling, no jargon. */
export const learnFaqs: LearnFaq[] = [
  {
    id: 'free',
    question: 'Is the assessment really free?',
    answer: 'Yes, completely. There’s no card needed and no obligation to book lessons afterwards. It’s a genuine chance to understand where your child is and what would help.',
  },
  {
    id: 'time',
    question: 'How long does it take?',
    answer: 'About 30 minutes, online, for one subject. You’ll come away with a clear sense of your child’s strengths and the gaps to work on.',
  },
  {
    id: 'subjects',
    question: 'Which subjects and ages do you cover?',
    answer: 'KS2 right through to A-Level, plus 11+ prep, across Science, Maths and English. If you’re not sure where your child fits, just book and we’ll guide you.',
  },
  {
    id: 'change-tutor',
    question: 'What if we’d like a different tutor?',
    answer: 'No problem at all. Finding the right match matters, so if a different tutor would suit your child better, we’ll arrange it.',
  },
  {
    id: 'how-online',
    question: 'How do the online lessons work?',
    answer: 'Everything runs 1:1 on Zoom or Google Meet, so your child learns from home at a time that fits around school and family life.',
  },
];

/** Trust signals — verifiable facts only, no unsourced numbers. */
export const trustSignals: string[] = [
  'PGCE-qualified UK teachers',
  'Curriculum-aligned: AQA, Edexcel, OCR',
  '1:1 online on Zoom and Google Meet',
];
