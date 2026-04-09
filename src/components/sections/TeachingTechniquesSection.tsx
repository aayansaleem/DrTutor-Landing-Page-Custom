import React from 'react';
import { Container } from '../ui';
import { motion } from 'motion/react';
import { CircleCheck } from 'lucide-react';
import { teachingTechniques } from '@/data/resources';

export const TeachingTechniquesSection: React.FC = () => {
  return (
    <section
      className="py-10 md:py-12 lg:py-14"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <Container>
        <div
          className="teaching-card-bg rounded-3xl px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 lg:px-16 lg:py-14 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center"
          style={{
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Left — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-headline font-semibold leading-tight mb-4 text-brand-teal"
            >
              Our Powerful Teaching Techniques
            </h2>
            <p
              className="text-sm font-body mb-6 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Some of the most Effective Tools from Teach Like a Champion we
              implement in our teaching style.
            </p>

            <ul className="space-y-3">
              {teachingTechniques.map((technique) => (
                <li key={technique.id} className="flex items-center gap-3">
                  <CircleCheck
                    size={22}
                    style={{ color: 'var(--brand-teal)' }}
                    fill="var(--brand-teal)"
                    stroke="white"
                    strokeWidth={2}
                    className="flex-shrink-0"
                  />
                  <span
                    className="font-body font-semibold text-sm"
                    style={{ color: 'var(--brand-teal)' }}
                  >
                    {technique.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Illustrated stacked document cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center justify-center py-4"
          >
            {/* Hover wrapper — lifts and gently tilts the whole stack */}
            <motion.div
              className="relative"
              style={{ width: 'clamp(170px, 22vw, 220px)', height: 'clamp(200px, 26vw, 260px)' }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              {/* Back document — white lined paper, rotated left */}
              <motion.div
                className="absolute bg-white rounded-2xl shadow-md overflow-hidden inset-0"
                style={{
                  top: '14px',
                  right: '20px',
                  transform: 'rotate(-7deg)',
                  transformOrigin: 'bottom center',
                }}
                whileHover={{ rotate: -10 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              >
                <div className="p-5 pt-6 space-y-2.5">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        height: '7px',
                        backgroundColor: 'rgba(15,165,165,0.35)',
                        width: i % 3 === 2 ? '55%' : '88%',
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Front teal book card */}
              <motion.div
                className="absolute rounded-2xl shadow-xl overflow-hidden inset-0"
                style={{
                  left: '20px',
                  bottom: '14px',
                  background: 'linear-gradient(145deg, var(--footer-gradient-start) 0%, var(--brand-teal) 55%, var(--hero-gradient-mid) 100%)',
                  transform: 'rotate(5deg)',
                  transformOrigin: 'bottom center',
                }}
                whileHover={{ rotate: 7, y: -4 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              >
                <div className="p-5 h-full flex flex-col justify-between">
                  <div>
                    <p
                      className="font-body font-semibold text-xs mb-3 uppercase tracking-widest"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      DT Resources
                    </p>
                    <h3 className="font-headline font-semibold text-xl leading-tight text-white">
                      Interactive<br />Lesson Kit<br />Tailored
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 rounded-full bg-white/25 w-3/4" />
                    <div className="h-1.5 rounded-full bg-white/25 w-1/2" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
