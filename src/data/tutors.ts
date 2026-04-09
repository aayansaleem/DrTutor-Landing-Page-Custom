import type { Tutor } from '@/types';
import falakImg from '@/assets/images/falak.avif';
import ahmedImg from '@/assets/images/ahmad.avif';
import elHendiImg from '@/assets/images/hendi.png';
import ekramiImg from '@/assets/images/ekrami.avif';

export const tutors: Tutor[] = [
  {
    id: '1',
    name: 'Dr Falak',
    subject: 'KS3-4 Science | KS5 Chemistry & Biology',
    rating: 5.0,
    reviewCount: 48,
    image: falakImg,
    badgeColor: 'var(--brand-coral)',
    experience: 7,
  },
  {
    id: '2',
    name: 'Mr Ahmed',
    subject: 'KS3-5 Science & Maths',
    rating: 5.0,
    reviewCount: 32,
    image: ahmedImg,
    badgeColor: 'var(--brand-teal)',
    experience: 25,
  },
  {
    id: '3',
    name: 'Mr El-Hendi',
    subject: 'KS3-4 Science | KS5 Chemistry',
    rating: 4.0,
    reviewCount: 24,
    image: elHendiImg,
    badgeColor: 'var(--brand-gold)',
    experience: 16,
  },
  {
    id: '4',
    name: 'Ms Ekrami',
    subject: 'KS3-4 English',
    rating: 4.5,
    reviewCount: 19,
    image: ekramiImg,
    badgeColor: '#8B5CF6',
    experience: 15,
  },
];
