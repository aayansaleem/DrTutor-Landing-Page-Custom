import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle } from 'lucide-react';
import { Container } from '../ui';

const addOns = [
  {
    icon: Sparkles,
    label: 'Trial Session',
    value: 'from £25',
  },
  {
    icon: CheckCircle,
    label: 'Assessment & Progress Report',
    value: 'Included',
  },
];

export const PricingAddOnsSection: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <Container>
        <motion.div
          className="rounded-2xl px-6 py-6 sm:px-10 sm:py-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
          style={{ backgroundColor: 'var(--brand-teal-lighter)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {addOns.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--brand-teal-light)' }}
              >
                <item.icon
                  size={20}
                  style={{ color: 'var(--brand-teal)' }}
                  aria-hidden="true"
                />
              </div>
              <div>
                <p
                  className="text-sm font-body font-semibold"
                  style={{ color: 'var(--brand-navy)' }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sm font-body"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
