import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, BookOpen, Award } from 'lucide-react';
import { Container } from '../ui';

const trustPoints = [
  { icon: ShieldCheck, text: 'Qualified UK teachers (PGCE/QTS)' },
  { icon: BookOpen, text: 'Structured lesson plans' },
  { icon: Award, text: 'Measurable academic progress' },
];

export const PricingTrustBanner: React.FC = () => {
  return (
    <section style={{ backgroundColor: 'var(--brand-teal)' }}>
      <Container>
        <motion.div
          className="py-8 md:py-9 lg:py-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {trustPoints.map((point) => (
            <div
              key={point.text}
              className="flex items-center gap-2.5"
            >
              <point.icon
                size={20}
                className="flex-shrink-0"
                style={{ color: 'rgba(255,255,255,0.85)' }}
                aria-hidden="true"
              />
              <span className="text-sm lg:text-base font-body text-white">
                {point.text}
              </span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
