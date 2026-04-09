import React from 'react';
import { Container } from '../ui';
import { motion } from 'motion/react';
import { Search, Check, Sparkles } from 'lucide-react';
import heroImg from '@/assets/images/resources-hero-img.avif';

export const ResourcesHeroSection: React.FC = () => {
  return (
    <>
      <section className="resources-hero-bg h-[100vh] lg:h-[90vh] flex flex-col relative overflow-hidden rounded-b-3xl">
        <Container className="relative z-10 flex-1 flex flex-col justify-center pt-20 sm:pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col justify-center"
            >
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-headline font-medium leading-[1.15] mb-3 lg:mb-4 text-black/60"
              >
                Learn Like a <span className="text-brand-teal">Champion</span> with Our Resources in Action
              </h1>
              <p className="text-base font-body font-normal mb-5 max-w-xl leading-relaxed text-brand-teal-darker">
                Our learning materials are thoughtfully developed using evidence-based strategies and real classroom insights. Every resource is crafted and delivered by subject experts, ensuring content that not only informs but truly sticks to empower learners from KS2 to A Levels.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-5">
                <a
                  href="/#tutors"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('tutors');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else window.location.href = '/#tutors';
                  }}
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-brand-teal text-brand-teal font-body font-semibold hover:bg-brand-teal hover:text-white transition-all group text-sm sm:text-base shadow-none"
                >
                  Find a Tutor <Search size={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://platform.drtutor.uk/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-brand-teal text-white font-body font-semibold hover:bg-brand-teal-dark transition-all shadow-none active:scale-95 text-sm sm:text-base"
                >
                  Book a Free Assessment
                </a>
              </div>

              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3 bg-[#E6E1E1] text-brand-navy px-3 sm:px-5 py-1.5 sm:py-2 rounded-full w-fit shadow-none text-xs sm:text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-brand-teal">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  U.K PGCE qualified Tutors
                </div>
                <div className="flex items-center gap-2 sm:gap-3 bg-[#E6E1E1] text-brand-navy px-3 sm:px-5 py-1.5 sm:py-2 rounded-full w-fit shadow-none text-xs sm:text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-brand-teal">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  Curriculum-Aligned for Real Results
                </div>
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex items-end lg:items-center justify-start lg:justify-end min-h-0"
            >
              <div className="relative w-full max-w-[90vw] md:mt-10 lg:pt-4 -mt-10 sm:max-w-[70vw] md:max-w-[480px] lg:max-w-[640px] xl:max-w-[720px] 2xl:max-w-[800px] lg:mx-0 lg:pr-8 lg:min-h-[420px] self-center">
                <img
                  src={heroImg}
                  alt="Mother and child learning together"
                  className="w-full object-contain max-h-[48vh] sm:max-h-[54vh] md:max-h-[60vh] lg:max-h-[64vh] xl:max-h-[70vh] 2xl:max-h-[76vh]"
                />

                {/* Rating Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 1.2,
                  }}
                  className="absolute bottom-12 sm:bottom-20 lg:bottom-24 right-0 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-xl flex items-center gap-1.5 sm:gap-2 border border-brand-teal-light"
                >
                  <div className="flex items-center text-brand-teal">
                    <Sparkles size={16} fill="currentColor" className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-brand-navy">
                    4.97 (500+ reviews)
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
      <div className="bg-white h-[10vh] w-full rounded-b-3xl -mt-2 z-10"></div>
    </>
  );
};
