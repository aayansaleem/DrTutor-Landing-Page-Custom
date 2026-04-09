import type { NavLink } from '@/types';

export const navLinks: NavLink[] = [
  { label: 'Find a tutor', href: '/#tutors' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Resources', href: '/resources' },
  { label: 'Become a tutor', href: 'https://platform.drtutor.uk/careers' },
  { label: 'Pricing', href: '/pricing' },
  { label: "FAQ's", href: '/#faq' },
];

export const footerLinks = {
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Find a Tutor', href: '/#tutors' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Testimonials', href: '/#testimonials' },
  ],
  support: [
    { label: "FAQ's", href: '/#faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Become a Tutor', href: 'https://platform.drtutor.uk/careers' },
  ],
};
