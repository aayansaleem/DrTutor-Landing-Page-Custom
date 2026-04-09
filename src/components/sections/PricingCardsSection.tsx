import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Container, Badge, Button } from '../ui';
import {
  keyStages,
  specialistPrice,
  tierDetails,
  specialistTier,
} from '@/data/pricing';
import type { PricingTier } from '@/data/pricing';

const stageLabels = [
  ...keyStages.map((s) => s.shortLabel),
  'Specialist',
];

function getPriceForTier(
  stageIndex: number,
  tierName: 'Standard' | 'Experienced' | 'Expert',
): number {
  if (stageIndex >= keyStages.length) return specialistPrice;
  const stage = keyStages[stageIndex];
  const key = tierName.toLowerCase() as 'standard' | 'experienced' | 'expert';
  return stage.tiers[key];
}

interface PricingCardProps {
  tier: PricingTier;
  price: number;
  delay: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, price, delay }) => {
  const isPopular = tier.isPopular;

  return (
    <motion.div
      className={`group relative rounded-3xl p-8 flex flex-col ${
        isPopular ? 'lg:scale-105 border-2' : ''
      }`}
      style={{
        background:
          'linear-gradient(to top, rgba(15,165,165,0.12) 0%, rgba(224,244,244,0.4) 40%, rgba(255,255,255,0.6) 100%)',
        boxShadow: '0 2px 12px rgba(3,26,53,0.05)',
        borderColor: isPopular ? 'var(--brand-teal)' : 'transparent',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      {/* Hover teal gradient overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0"
        style={{
          background:
            'linear-gradient(to top, rgba(15,165,165,0.22) 0%, rgba(15,165,165,0.08) 50%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          <Badge
            color={
              tier.name === 'Standard'
                ? 'var(--brand-teal-dark)'
                : tier.name === 'Experienced'
                  ? 'var(--brand-teal)'
                  : 'var(--brand-teal-darker)'
            }
          >
            {tier.name}
          </Badge>
          {isPopular && (
            <Badge color="var(--brand-coral)">Most Popular</Badge>
          )}
        </div>

        {/* Price */}
        <div className="mb-2">
          <span
            className="text-3xl font-headline font-semibold"
            style={{ color: 'var(--brand-navy)' }}
          >
            from £{price}
          </span>
          <span
            className="text-sm font-body ml-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            /hour
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm font-body leading-relaxed mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          {tier.description}
        </p>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{ backgroundColor: 'var(--brand-warm-gray)' }}
        />

        {/* Feature list */}
        <ul className="space-y-3 mb-8 flex-1">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check
                size={18}
                className="flex-shrink-0 mt-0.5"
                style={{ color: 'var(--brand-teal)' }}
                aria-hidden="true"
              />
              <span
                className="text-sm font-body leading-relaxed"
                style={{ color: 'var(--text-primary)' }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://platform.drtutor.uk/register"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button
            variant={isPopular ? 'primary' : 'secondary'}
            size="lg"
            className="w-full"
          >
            Book a Free Assessment
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

export const PricingCardsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(2); // default to GCSE

  const isSpecialist = activeIndex >= keyStages.length;

  const tiers = useMemo(
    () => (isSpecialist ? [specialistTier] : tierDetails),
    [isSpecialist],
  );

  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <Container>
        {/* Stage selector tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Select key stage"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {stageLabels.map((label, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={label}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(i)}
                className={`px-5 py-2.5 rounded-2xl font-body font-semibold text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white shadow-glow-teal'
                    : 'border'
                }`}
                style={{
                  backgroundColor: isActive
                    ? 'var(--brand-teal)'
                    : 'var(--bg-page)',
                  color: isActive ? '#FFFFFF' : 'var(--brand-navy)',
                  borderColor: isActive
                    ? 'transparent'
                    : 'var(--brand-warm-gray)',
                }}
              >
                {label}
              </button>
            );
          })}
        </motion.div>

        {/* Pricing cards grid */}
        <div
          className={`grid gap-6 ${
            isSpecialist
              ? 'grid-cols-1 max-w-md mx-auto'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {tiers.map((tier, i) => (
            <PricingCard
              key={`${activeIndex}-${tier.name}`}
              tier={tier}
              price={getPriceForTier(activeIndex, tier.name)}
              delay={0.1 * i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
