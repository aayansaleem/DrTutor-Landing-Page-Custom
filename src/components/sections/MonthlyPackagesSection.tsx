import React from 'react';
import { motion } from 'motion/react';
import { Container, Badge, SectionHeading } from '../ui';
import { monthlyDiscounts } from '@/data/pricing';

interface PackageCardProps {
  sessions: number;
  discountPercent: number;
  exampleLabel: string;
  examplePrice: number;
  isBestValue?: boolean;
  delay: number;
}

const PackageCard: React.FC<PackageCardProps> = ({
  sessions,
  discountPercent,
  exampleLabel,
  examplePrice,
  isBestValue,
  delay,
}) => {
  const discountedTotal = Math.round(
    examplePrice * sessions * (1 - discountPercent / 100),
  );

  return (
    <motion.div
      className="group relative rounded-3xl p-8 flex flex-col"
      style={{
        background:
          'linear-gradient(to top, rgba(15,165,165,0.12) 0%, rgba(224,244,244,0.4) 40%, rgba(255,255,255,0.6) 100%)',
        boxShadow: '0 2px 12px rgba(3,26,53,0.05)',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      {/* Hover overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0"
        style={{
          background:
            'linear-gradient(to top, rgba(15,165,165,0.22) 0%, rgba(15,165,165,0.08) 50%, transparent 100%)',
        }}
      />

      <div className="relative z-10">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          <Badge
            color={
              isBestValue ? 'var(--brand-green)' : 'var(--brand-gold)'
            }
          >
            Save {discountPercent}%
          </Badge>
          {isBestValue && (
            <Badge color="var(--brand-coral)">Best Value</Badge>
          )}
        </div>

        {/* Sessions */}
        <h3
          className="text-xl font-headline font-semibold mb-2"
          style={{ color: 'var(--brand-navy)' }}
        >
          {sessions} Sessions/Month
        </h3>

        <p
          className="text-sm font-body leading-relaxed mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          {discountPercent}% discount on your total monthly fee
        </p>

        {/* Divider */}
        <div
          className="h-px w-full mb-4"
          style={{ backgroundColor: 'var(--brand-warm-gray)' }}
        />

        {/* Example pricing */}
        <p
          className="text-sm font-body mb-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          Example: {exampleLabel}
        </p>
        <p
          className="text-2xl font-headline font-semibold text-brand-teal"
        >
          from £{discountedTotal}
          <span
            className="text-sm font-body font-normal ml-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            /month
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export const MonthlyPackagesSection: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--bg-section-alt)' }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeading
            title="Save More with Monthly Packages"
            subtitle="Commit to regular sessions and enjoy discounted rates on your monthly tutoring fees."
            className="mb-12"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <PackageCard
            sessions={monthlyDiscounts.four.sessions}
            discountPercent={monthlyDiscounts.four.discountPercent}
            exampleLabel="GCSE Standard (from £40/hr)"
            examplePrice={40}
            delay={0.1}
          />
          <PackageCard
            sessions={monthlyDiscounts.eight.sessions}
            discountPercent={monthlyDiscounts.eight.discountPercent}
            exampleLabel="GCSE Standard (from £40/hr)"
            examplePrice={40}
            isBestValue
            delay={0.2}
          />
        </div>
      </Container>
    </section>
  );
};
