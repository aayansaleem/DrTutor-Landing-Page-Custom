export interface NavLink {
  label: string;
  href: string;
}

export interface Stage {
  id: string;
  label: string;
  colorToken: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Tutor {
  id: string;
  name: string;
  subject: string;
  rating: number;
  reviewCount: number;
  image: string;
  badgeColor: string;
  experience: number;
}

export interface Testimonial {
  id: string;
  text: string;
  name: string;
  role: string;
  avatar: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
