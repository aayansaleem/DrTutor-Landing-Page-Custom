import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useInView } from 'motion/react';

/* ───────────────────────── Reveal ─────────────────────────
   Scroll-triggered "focus reveal": content rises and sharpens
   into place. Plays once, collapses to a fade for reduced motion. */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span';
}
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 26, className, as = 'div' }) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: reduce ? 'blur(0px)' : 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -90px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
};

/* ─────────────────────── GlassCard ────────────────────────
   Real glass surface. Optional cursor-reactive 3D tilt that
   springs back. Tilt disabled for touch / reduced motion. */
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  /** max tilt in degrees */
  intensity?: number;
  style?: React.CSSProperties;
}
export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', tilt = false, intensity = 8, style }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 220, damping: 18 });

  const enabled = tilt && !reduce;

  const onMove = (e: React.PointerEvent) => {
    if (!enabled || e.pointerType === 'touch' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { px.set(0); py.set(0); };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`glass rounded-[28px] ${className}`}
      style={enabled ? { rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d', ...style } : style}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────── LiveWrite ────────────────────────
   "AI writes it live" reveal — types the text out with a
   blinking caret when it scrolls into view. Shows instantly
   for reduced motion. */
interface LiveWriteProps {
  text: string;
  className?: string;
  speed?: number; // ms per char
  startDelay?: number; // ms
  caret?: boolean;
}
export const LiveWrite: React.FC<LiveWriteProps> = ({ text, className, speed = 34, startDelay = 0, caret = true }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [count, setCount] = useState(reduce ? text.length : 0);
  const [done, setDone] = useState(Boolean(reduce));

  useEffect(() => {
    if (reduce || !inView) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const startId = setTimeout(function tick() {
      i += 1;
      setCount(i);
      if (i < text.length) {
        timer = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    }, startDelay);
    return () => { clearTimeout(startId); clearTimeout(timer); };
  }, [inView, reduce, text, speed, startDelay]);

  return (
    <span ref={ref} className={className}>
      {text.slice(0, count)}
      {caret && !done && <span className="learn-caret" style={{ background: 'currentColor' }}>&nbsp;</span>}
    </span>
  );
};

