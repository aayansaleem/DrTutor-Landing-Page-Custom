import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Play, X } from 'lucide-react';
import { Container } from '../ui';

const YOUTUBE_ID = 'Ykt6w8DzQTg';
const THUMB_MAXRES = `https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const THUMB_HQ = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;

interface VideoLightboxProps {
  onClose: () => void;
}

const VideoLightbox: React.FC<VideoLightboxProps> = ({ onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Featured video: Meet Dr Tutor"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 video-lightbox-backdrop"
      style={{
        background: 'rgba(17, 18, 22, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[1200px] video-lightbox-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-video bg-black"
          style={{ boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)' }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title="Meet Dr Tutor"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-10 h-10 rounded-full bg-black/55 backdrop-blur-md text-white hover:bg-black/75 hover:scale-105 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ring-1 ring-white/15"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface FeaturedVideoSectionProps {
  /** When true, uses tighter top/bottom padding suited for pages where the
   *  video sits between two other sections of similar bg (e.g. /learn).
   *  Defaults to the homepage's roomier padding. */
  compact?: boolean;
}

export const FeaturedVideoSection: React.FC<FeaturedVideoSectionProps> = ({ compact = false }) => {
  const [open, setOpen] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(THUMB_MAXRES);
  const playBtnRef = useRef<HTMLButtonElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 160,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const openLightbox = useCallback(() => setOpen(true), []);
  const closeLightbox = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => playBtnRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, closeLightbox]);

  return (
    <section className={`relative bg-white overflow-hidden ${compact ? 'pt-10 sm:pt-12 lg:pt-14 pb-10 sm:pb-12 lg:pb-14' : 'pt-6 sm:pt-8 lg:pt-10 pb-20 sm:pb-24 lg:pb-28'}`}>
      {/* Soft teal radial halo behind the frame */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 55%, rgba(15, 165, 165, 0.18) 0%, rgba(15, 165, 165, 0.06) 38%, rgba(15, 165, 165, 0) 70%)',
        }}
      />
      {/* Subtle dot grid texture */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #031A35 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal text-[11px] font-body font-semibold uppercase tracking-[0.16em]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
            Featured
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-headline font-semibold text-brand-teal leading-[1.1]">
            Meet Dr Tutor
          </h2>
          <p className="mt-4 text-base sm:text-lg font-body text-brand-navy/70 max-w-xl mx-auto">
            Press play to see how we teach.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="relative max-w-5xl mx-auto"
          style={{ perspective: 1200 }}
        >
          {/* Conic-rotating gradient border */}
          <div className="relative rounded-[28px] p-[1.5px] video-conic-border">
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-[26px] overflow-hidden bg-brand-navy"
            >
              <button
                ref={playBtnRef}
                type="button"
                onClick={openLightbox}
                aria-label="Play featured video: Meet Dr Tutor"
                className="group video-shine-wrapper relative block w-full aspect-video focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal/40"
              >
                <img
                  src={thumbSrc}
                  onError={() => {
                    if (thumbSrc !== THUMB_HQ) setThumbSrc(THUMB_HQ);
                  }}
                  alt="Meet Dr Tutor — watch the story"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />

                {/* Readability gradient */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(3,26,53,0.08) 0%, rgba(3,26,53,0.22) 55%, rgba(3,26,53,0.55) 100%)',
                  }}
                />

                {/* Shine sweep on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                >
                  <div
                    className="video-shine absolute top-0 left-0 h-full w-[45%]"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)',
                      transform: 'translateX(-120%) skewX(-18deg)',
                    }}
                  />
                </div>

                {/* Glass play disc + ripple rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full video-ripple"
                      style={{ boxShadow: '0 0 0 2px rgba(255,255,255,0.6)' }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full video-ripple-delayed"
                      style={{ boxShadow: '0 0 0 2px rgba(255,255,255,0.45)' }}
                    />
                    <div
                      className="relative w-full h-full rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background:
                          'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.97), rgba(255,255,255,0.7))',
                        boxShadow:
                          '0 14px 44px rgba(3, 26, 53, 0.38), inset 0 1px 0 rgba(255,255,255,0.9)',
                      }}
                    >
                      <Play
                        size={30}
                        strokeWidth={0}
                        fill="currentColor"
                        className="text-brand-teal ml-1.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Caption strip */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 flex items-center gap-3 text-white">
                  <span className="text-xs sm:text-sm font-body font-semibold tracking-wide">
                    Watch the story
                  </span>
                  <span className="w-8 h-px bg-white/60" />
                </div>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {open && <VideoLightbox onClose={closeLightbox} />}
    </section>
  );
};
