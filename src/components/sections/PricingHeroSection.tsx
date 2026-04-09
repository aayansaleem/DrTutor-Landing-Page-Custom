import React from 'react';
import { motion } from 'motion/react';
import { Container, Badge } from '../ui';

export const PricingHeroSection: React.FC = () => {
  return (
    <section
      className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20"
      style={{ backgroundColor: 'var(--bg-section-alt)' }}
    >
      <Container>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Badge color="var(--brand-teal)" className="mb-6">
              Pricing
            </Badge>
          </motion.div>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-headline font-semibold mb-4 text-brand-teal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            Transparent Pricing, Exceptional Teaching
          </motion.h1>

          <motion.p
            className="text-base md:text-lg font-body max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            Qualified UK Teachers | KS2 – A-Level | English, Maths &amp; Science
          </motion.p>
        </div>
      </Container>
    </section>
  );
};
