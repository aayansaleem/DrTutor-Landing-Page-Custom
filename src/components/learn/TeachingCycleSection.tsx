import React from 'react';
import { motion } from 'motion/react';
import { Reveal } from './primitives';
import iDoImg from '@/assets/images/painting.avif';
import weDoImg from '@/assets/images/we-do.avif';
import youDoImg from '@/assets/images/little-boy-pencil.avif';

interface Step {
  id: string;
  tag: string;
  subtitle: string;
  description: string;
  image: string;
}

const STEPS: Step[] = [
  { id: 'i', tag: 'I Do', subtitle: 'MODEL', description: "The tutor introduces and clearly demonstrates the concept, broken down step by step. It gives your child a strong, confident first look at how to approach the task.", image: iDoImg },
  { id: 'we', tag: 'We Do', subtitle: 'GUIDED PRACTICE', description: "Tutor and student work through it together. With live support and feedback, your child builds understanding without ever getting stuck.", image: weDoImg },
  { id: 'you', tag: 'You Do', subtitle: 'INDEPENDENT PRACTICE', description: "Your child takes the lead and practises independently. This is where mastery becomes visible, and any remaining gaps surface clearly.", image: youDoImg },
];

export const LearnTeachingCycleSection: React.FC = () => {
  return (
    <section className="py-12 md:py-14 lg:py-16" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center mb-8 md:mb-10 lg:mb-12">
          <span className="font-body font-semibold text-xs uppercase tracking-[0.16em] text-brand-teal">How we teach</span>
          <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-brand-teal mt-3">
            The “I, We, You” Cycle
          </h2>
          <p className="font-body text-sm sm:text-base text-brand-navy/65 max-w-xl mx-auto mt-3">
            Three calm beats every lesson follows. Your child sees it, tries it with support, then owns it.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 max-w-5xl mx-auto">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, boxShadow: '0 22px 44px rgba(3,26,53,0.13), 0 8px 16px rgba(15,165,165,0.10)' }}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden cursor-default"
              style={{ boxShadow: '0 2px 12px rgba(3,26,53,0.06)', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
            >
              {/* Image with overlay */}
              <div className="relative">
                <div className="m-3 rounded-2xl overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.tag}
                    loading="lazy"
                    className="w-full h-44 sm:h-56 md:h-60 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-3 rounded-2xl bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                </div>
                <div className="absolute bottom-5 left-0 right-0 text-center px-4">
                  <h3 className="text-white font-headline font-semibold text-2xl leading-tight drop-shadow-lg">{step.tag}</h3>
                  <span
                    className="inline-block mt-2 px-4 py-1 rounded-full text-white text-[11px] font-body font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: 'var(--brand-teal)' }}
                  >
                    ({step.subtitle})
                  </span>
                </div>
              </div>

              <div className="mx-4 border-t" style={{ borderColor: 'var(--brand-teal-light)' }} />

              <p className="px-5 py-4 text-sm font-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
