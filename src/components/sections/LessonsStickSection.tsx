import React from 'react';
import { Container } from '../ui';
import { motion } from 'motion/react';
import { lessonFeatures } from '@/data/resources';
import doNowImg from '@/assets/images/book-clock.avif';
import planningImg from '@/assets/images/calendar.avif';
import endLessonImg from '@/assets/images/book-bulb.avif';

const featureImages: Record<string, string> = {
  '0GXX8Ix3WQpoeki2ozgusAXraSU.avif': doNowImg,
  'X5EKd69NxkDaFjYwR42ecTuzlc.avif': planningImg,
  'mFtTDQiqSFvNt2uAoj4TAD5uf8.avif': endLessonImg,
};

export const LessonsStickSection: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--bg-section-alt)' }}
    >
      <Container>
        {/* Section Heading — left-aligned */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-headline font-semibold mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-brand-teal"
        >
          What Makes Our Lessons Stick
        </motion.h2>

        {/* Three feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {lessonFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(15,165,165,0.12), 0 4px 12px rgba(3,26,53,0.08)' }}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden"
              style={{
                border: '1.5px solid var(--brand-teal-light)',
                boxShadow: '0 2px 8px rgba(3,26,53,0.05)',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
            >
              {/* Text block */}
              <div className="px-7 pt-7 pb-4">
                <h3
                  className="font-headline font-semibold text-lg leading-snug mb-4 text-brand-teal"
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm font-body leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Illustration — large, bottom-pinned */}
              <div className="mt-auto flex items-end justify-center px-6 pb-6 sm:pb-8 pt-4 sm:pt-6">
                <img
                  src={featureImages[feature.image]}
                  alt={feature.title}
                  className="w-32 h-32 sm:w-44 sm:h-44 object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
