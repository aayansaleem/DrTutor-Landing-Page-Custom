import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const WhatsAppGlyph = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

/** Mobile-only sticky CTA. Appears after the hero scrolls away, hides while the
 *  booking form is on screen so it never doubles up. */
export const StickyCta: React.FC = () => {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('learn-hero-sentinel');
    const form = document.getElementById('book');
    let heroPassed = false;
    let formVisible = false;
    const sync = () => setShow(heroPassed && !formVisible);
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const o = new IntersectionObserver(([e]) => { heroPassed = !e.isIntersecting; sync(); }, { threshold: 0 });
      o.observe(hero); observers.push(o);
    }
    if (form) {
      const o = new IntersectionObserver(([e]) => { formVisible = e.isIntersecting; sync(); }, { threshold: 0.18 });
      o.observe(form); observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToBook = () => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-2"
          initial={{ y: reduce ? 0 : 100, opacity: reduce ? 1 : 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduce ? 0 : 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        >
          <div className="glass flex items-center gap-2.5 rounded-2xl p-2">
            <button
              onClick={scrollToBook}
              className="flex-1 py-3.5 rounded-xl font-body font-semibold text-sm text-white active:scale-[0.98] transition-transform"
              style={{ background: 'linear-gradient(135deg, var(--brand-teal) 0%, var(--brand-teal-dark) 100%)', boxShadow: '0 8px 20px rgba(15,165,165,0.34)' }}
            >
              Book free assessment
            </button>
            <a
              href="https://wa.me/447526327612"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp"
              className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-white"
              style={{ boxShadow: '0 2px 8px rgba(3,26,53,0.1)' }}
            >
              <WhatsAppGlyph />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
