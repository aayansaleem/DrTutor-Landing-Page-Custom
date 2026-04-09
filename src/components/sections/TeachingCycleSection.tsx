import React from 'react';
import { Container } from '../ui';
import { motion } from 'motion/react';
import { teachingCycleSteps } from '@/data/resources';
import iDoImg from '@/assets/images/painting.avif';
import weDoImg from '@/assets/images/we-do.avif';
import youDoImg from '@/assets/images/little-boy-pencil.avif';

const stepImages: Record<string, string> = {
  'kL3NvrCU6yuaDbl1rBeFlKlKaqY.avif': iDoImg,
  'auetM8x6P5jy8Curah3NkqiMZQ.avif': weDoImg,
  'u6InakIvapsvSo0yBI8cnUGKnLc.avif': youDoImg,
};

export const TeachingCycleSection: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <Container>
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-14 lg:mb-16">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-headline font-semibold text-brand-teal"
          >
            How We Teach: The &ldquo;I, We, You&rdquo; Cycle
          </h2>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {teachingCycleSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(3,26,53,0.13), 0 8px 16px rgba(15,165,165,0.10)' }}
              className="group flex flex-col bg-white rounded-3xl shadow-md overflow-hidden cursor-pointer" style={{ transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
            >
              {/* Image with overlay */}
              <div className="relative">
                <div className="m-3 rounded-2xl overflow-hidden">
                  <img
                    src={stepImages[step.image]}
                    alt={step.title}
                    className="w-full h-40 sm:h-52 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-3 rounded-2xl bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

                {/* Title + Badge overlay at bottom of image */}
                <div className="absolute bottom-5 left-0 right-0 text-center px-4">
                  <h3 className="text-white font-headline font-semibold text-xl leading-tight drop-shadow-lg">
                    {step.title}
                  </h3>
                  <span
                    className="inline-block mt-2 px-4 py-1 rounded-full text-white text-[11px] font-body font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: 'var(--brand-teal)' }}
                  >
                    ({step.subtitle})
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="mx-4 border-t"
                style={{ borderColor: 'var(--brand-teal-light, #b2dfdb)' }}
              />

              {/* Description */}
              <p
                className="px-4 py-4 text-xs font-body leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
