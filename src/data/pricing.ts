export interface PricingTier {
  name: 'Standard' | 'Experienced' | 'Expert';
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface KeyStagePrice {
  stage: string;
  shortLabel: string;
  tiers: {
    standard: number;
    experienced: number;
    expert: number;
  };
}

export const keyStages: KeyStagePrice[] = [
  { stage: 'Primary (KS2)', shortLabel: 'KS2', tiers: { standard: 20, experienced: 25, expert: 30 } },
  { stage: 'Secondary (KS3)', shortLabel: 'KS3', tiers: { standard: 30, experienced: 35, expert: 40 } },
  { stage: 'GCSE (KS4)', shortLabel: 'GCSE', tiers: { standard: 40, experienced: 45, expert: 50 } },
  { stage: 'A-Level (KS5)', shortLabel: 'A-Level', tiers: { standard: 50, experienced: 55, expert: 65 } },
];

export const specialistPrice = 70;

export const monthlyDiscounts = {
  four: { sessions: 4, discountPercent: 10 },
  eight: { sessions: 8, discountPercent: 15 },
};

export const tierDetails: PricingTier[] = [
  {
    name: 'Standard',
    description: 'Solid foundations with a qualified UK teacher',
    features: [
      'Qualified UK Teacher (PGCE/QTS)',
      'Structured Lesson Plans',
      'Homework Support',
      'Online Sessions (Zoom/Google Meet)',
    ],
  },
  {
    name: 'Experienced',
    description: 'Enhanced learning with exam-board expertise',
    isPopular: true,
    features: [
      'Everything in Standard',
      'Exam-Board Expertise',
      'Personalised Study Plan',
      'Priority Booking',
    ],
  },
  {
    name: 'Expert',
    description: 'Premium support from senior examiners',
    features: [
      'Everything in Experienced',
      'Senior Examiner Insights',
      'Intensive Revision Programmes',
      'Assessment & Progress Report Included',
    ],
  },
];

export const specialistTier: PricingTier = {
  name: 'Expert',
  description: 'Expert teachers & examiners for specialist preparation',
  features: [
    'Senior Examiner & Specialist Teacher',
    'Exam-Board Expertise',
    'Intensive Revision Programmes',
    'Personalised Study Plan',
    'Assessment & Progress Report Included',
    'Priority Booking',
  ],
};
