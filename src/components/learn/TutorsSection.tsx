import React from 'react';
import { Reveal } from './primitives';
import { tutors } from '@/data/tutors';

/** Mirrors the homepage TutorsSection (warm beige card, teal info badge,
 *  mix-blend photo). No star ratings on /learn — honesty rule. */
export const LearnTutorsSection: React.FC = () => {
  return (
    <section className="py-12 md:py-14 lg:py-16" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-brand-teal mb-3">
            Meet your PGCE-qualified tutors
          </h2>
          <p className="text-center font-body text-sm sm:text-base text-brand-navy/65 max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12">
            Real UK teachers with years in real classrooms. The same tutor who runs your assessment can carry on the lessons.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {tutors.map((tutor, i) => (
            <Reveal as="div" key={tutor.id} delay={i * 0.08}>
              <div className="overflow-hidden relative group cursor-default rounded-[20px]" style={{ paddingTop: '130%' }}>
                {/* Warm beige card backing */}
                <div
                  className="absolute overflow-hidden bottom-0 left-0 right-0 rounded-[20px] transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ top: '18%', backgroundColor: '#EDE7DA' }}
                />
                {/* Photo, anchored bottom, blends with beige */}
                <div className="absolute inset-x-0 top-0 bottom-0 flex items-end justify-center z-10 pointer-events-none">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                </div>
                {/* Teal info badge */}
                <div
                  className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 z-20 rounded-xl sm:rounded-2xl px-2.5 sm:px-4 py-2 sm:py-3 transition-all duration-300 group-hover:shadow-lg"
                  style={{ backgroundColor: '#0E8C8C' }}
                >
                  <p
                    className="text-[9px] sm:text-[10px] lg:text-[11px] font-body leading-snug mb-0.5 sm:mb-1"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    {tutor.subject}
                  </p>
                  <h3 className="text-base sm:text-lg lg:text-xl font-headline font-semibold text-white mb-1 sm:mb-1.5">
                    {tutor.name}
                  </h3>
                  <p
                    className="text-[10px] sm:text-xs lg:text-sm font-body"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                  >
                    {tutor.experience} years experience · PGCE qualified
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
