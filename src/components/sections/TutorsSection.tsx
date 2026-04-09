import React from 'react';
import { Container } from '../ui';
import { tutors } from '@/data/tutors';

/* Gold stars with half-star support — rendered on dark teal bg */
const TutorStars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => {
      const filled = i < Math.floor(rating);
      const half = !filled && i < rating;
      return (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24">
          {half ? (
            <>
              <defs>
                <linearGradient id={`half-${i}`}>
                  <stop offset="50%" stopColor="#F5A623" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.25)" />
                </linearGradient>
              </defs>
              <path fill={`url(#half-${i})`} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </>
          ) : (
            <path
              fill={filled ? '#F5A623' : 'rgba(255,255,255,0.25)'}
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          )}
        </svg>
      );
    })}
  </div>
);

export const TutorsSection: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--bg-page)' }}
      id="tutors"
    >
      <Container>
        <h2
          className="text-center font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-brand-teal mb-10 sm:mb-14 md:mb-16 lg:mb-20"
        >
          Meet some of our PGCE qualified tutors
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {tutors.map((tutor) => (
            <div key={tutor.id} className=" overflow-hidden relative group cursor-pointer rounded-[20px]" style={{ paddingTop: '130%' }}>

              {/* ── Card background (warm beige) ── */}
              <div
                className="absolute overflow-hidden bottom-0 left-0 right-0 rounded-[20px] transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  top: '18%',
                  backgroundColor: '#EDE7DA',
                }}
              />

              {/* ── Photo — anchored to bottom of card, overflows above beige ── */}
              <div className="absolute inset-x-0 top-0 bottom-0 flex items-end justify-center z-10 pointer-events-none">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-ful h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>

              {/* ── Teal info badge — bottom overlay ── */}
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
                <TutorStars rating={tutor.rating} />
                <p
                  className="text-[10px] sm:text-xs lg:text-sm font-body mt-1 sm:mt-1.5"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  {tutor.experience} years experience
                </p>
              </div>

            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
