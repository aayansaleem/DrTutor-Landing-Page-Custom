import React from 'react';
import { Container } from '../ui';
import { motion } from 'motion/react';
import { Search, Check, Sparkles } from 'lucide-react';
import girlHeroImg from '@/assets/images/girl-hero.jpg';
import boyHeroImg from '@/assets/images/boy-hero.jpg';
import laptopHeroImg from '@/assets/images/laptop-hero.png';

export const HeroSection: React.FC = () => {
  return (
    <>
      <section className="hero-bg h-[100vh] lg:h-[90vh] flex flex-col justify-center pt-20 sm:pt-24 pb-8 sm:pb-12 relative overflow-hidden rounded-b-3xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-headline font-medium leading-[1.1] mb-3 lg:mb-4 text-brand-teal"
              >
                Making Learning Simple From KS2 to A-Levels
              </h1>
              <p className="text-base sm:text-lg font-body font-normal mb-5 max-w-xl leading-relaxed text-brand-navy/80">
                We understand how much you care about your child's success. Our expert tutors are here to boost their confidence and grades, so you can relax knowing they're on the right path.
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

            {/* Right Content - Composite Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-[270px] sm:h-[340px] md:h-[400px] lg:h-[440px] flex items-end justify-center mt-8"
            >
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[560px] mx-auto aspect-[1.1/1]">
                {/* Left Card */}
                <motion.div
                  initial={{ opacity: 0, rotate: -12, x: -32, y: 0 }}
                  animate={{ opacity: 1, rotate: -8, x: -38, y: 32 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute left-20 top-6 w-[35%] h-[50%] rounded-2xl overflow-hidden shadow-xl z-0 rotate-[-8deg]"
                  style={{ background: '#E6E1E1' }}
                >
                  <img
                    src={girlHeroImg}
                    alt="Student smiling"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Right Card */}
                <motion.div
                  initial={{ opacity: 0, rotate: 12, x: 32, y: 0 }}
                  animate={{ opacity: 1, rotate: 8, x: 38, y: 32 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute right-20 top-6 w-[35%] h-[50%] rounded-2xl overflow-hidden shadow-xl z-0 rotate-[8deg]"
                  style={{ background: '#E6F7F7' }}
                >
                  <img
                    src={boyHeroImg}
                    alt="Student with books"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Laptop (Front Center) */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute left-1/2 -bottom-6 w-[68%] sm:w-[70%] md:w-[68%] -translate-x-1/2 z-20"
                >
                  <div className="relative">
                    <img
                      src={laptopHeroImg}
                      alt="Dr Tutor Platform on Laptop"
                      className="w-full h-auto drop-shadow-[0_20px_24px_rgba(0,0,0,0.13)]"
                    />
                    {/* Rating Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
                      className="absolute bottom-2 right-2 bg-white px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2 border border-brand-teal-light"
                    >
                      <div className="flex items-center text-brand-teal">
                        <Sparkles size={18} fill="currentColor" />
                      </div>
                      <span className="text-xs font-semibold text-brand-navy">4.97 (500+ reviews)</span>
                    </motion.div>
                  </div>
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
