import React from 'react';
import { Container } from '../ui';
import img1 from '@/assets/images/kL3NvrCU6yuaDbl1rBeFlKlKaqY.avif';
import img2 from '@/assets/images/auetM8x6P5jy8Curah3NkqiMZQ.avif';
import img3 from '@/assets/images/u6InakIvapsvSo0yBI8cnUGKnLc.avif';
import boyImg from '@/assets/images/1V7Zyohomfsj3U3cQa2ydDw6Aq8.avif';
import resourcesImg from '@/assets/images/yM2d50Z0kBsFJjNFNdAtAWKcY.avif';
import harryImg from '@/assets/images/harry.avif';
import annaImg from '@/assets/images/anna.avif';
import jessieImg from '@/assets/images/jassie.avif';

/* Positions icons in a circle around a centre point */
const orbitPos = (angleDeg: number, r: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
};

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24" style={{ backgroundColor: 'var(--bg-section-alt)' }} id="how-it-works">
      <Container>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-teal mb-2">How it works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Card 1: Learn Like a Champion ────────────── */}
          <div
            className="rounded-3xl overflow-hidden flex flex-col group relative"
            style={{
              background: 'linear-gradient(to top, rgba(15,165,165,0.12) 0%, rgba(224,244,244,0.4) 40%, rgba(255,255,255,0.6) 100%)',
              boxShadow: '0 2px 12px rgba(3,26,53,0.05)',
            }}
          >
            {/* Hover teal gradient overlay */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0" style={{ background: 'linear-gradient(to top, rgba(15,165,165,0.22) 0%, rgba(15,165,165,0.08) 50%, transparent 100%)' }} />
            <div className="relative z-10 flex flex-col flex-1">
            <div className="relative h-56 sm:h-72 md:h-80 flex items-end justify-center px-4 sm:px-6 pt-6 sm:pt-8 pb-0">
              {/* Back-left photo — tilted, behind */}
              <div
                className="absolute left-[8%] md:left-[10%] bottom-0 w-[38%] max-w-[200px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg z-10 border-[5px] border-white transition-transform duration-500 group-hover:rotate-[-14deg] group-hover:translate-x-[-6px]"
                style={{ transform: 'rotate(-10deg)' }}
              >
                <img src={img1} alt="Student" className="w-full h-full object-cover" />
              </div>
              {/* Back-right photo — tilted opposite, behind */}
              <div
                className="absolute right-[8%] md:right-[10%] bottom-0 w-[38%] max-w-[200px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg z-10 border-[5px] border-white transition-transform duration-500 group-hover:rotate-[14deg] group-hover:translate-x-[6px]"
                style={{ transform: 'rotate(8deg)' }}
              >
                <img src={img3} alt="Student" className="w-full h-full object-cover" />
              </div>
              {/* Front-centre photo — tallest, on top */}
              <div className="relative w-[44%] max-w-[220px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-20 border-[5px] border-white transition-transform duration-500 group-hover:translate-y-[-6px] group-hover:scale-[1.02]">
                <img src={img2} alt="Student celebrating" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Text */}
            <div className="px-8 pb-8 pt-6">
              <h3 className="text-xl font-headline font-semibold mb-3 text-brand-teal">
                Learn Like a Champion
              </h3>
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                At Dr Tutor, we follow Doug Lemov's Teach Like a Champion framework — an evidence-based approach that helps us deliver engaging and effective online lessons. These proven techniques ensure every session is impactful and memorable for our students.
              </p>
            </div>
            </div>
          </div>

          {/* ── Card 2: Online Access ─────────────────────── */}
          <div
            className="rounded-3xl flex flex-col group relative"
            style={{
              background: 'linear-gradient(to top, rgba(15,165,165,0.12) 0%, rgba(224,244,244,0.4) 40%, rgba(255,255,255,0.6) 100%)',
              boxShadow: '0 2px 12px rgba(3,26,53,0.05)',
            }}
          >
            {/* Hover teal gradient overlay */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0" style={{ background: 'linear-gradient(to top, rgba(15,165,165,0.22) 0%, rgba(15,165,165,0.08) 50%, transparent 100%)' }} />
            <div className="relative z-10 flex flex-col flex-1">
            {/* Orbit graphic */}
            <div className="relative flex items-center justify-center overflow-hidden" style={{ height: 'clamp(220px, 30vw, 290px)' }}>
              {/* Outer ring — visible by default */}
              <div
                className="absolute rounded-full transition-all duration-1000"
                style={{ width: 'clamp(180px, 24vw, 240px)', height: 'clamp(180px, 24vw, 240px)', border: '1.5px solid var(--brand-teal)' }}
              />
              {/* Middle ring — visible by default */}
              <div
                className="absolute rounded-full transition-all duration-1000"
                style={{ width: 'clamp(140px, 19vw, 190px)', height: 'clamp(140px, 19vw, 190px)', border: '1.5px solid var(--brand-teal)', opacity: 0.35 }}
              />
              {/* Inner ring — hidden by default, appears on hover */}
              <div
                className="absolute rounded-full transition-all duration-1000 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                style={{ width: 'clamp(220px, 29vw, 290px)', height: 'clamp(220px, 29vw, 290px)', border: '1.5px solid var(--brand-teal)' }}
              />

              {/* Boy avatar */}
              <div
                className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-105"
                style={{ border: '4px solid var(--brand-teal-light)' }}
              >
                <img src={boyImg} alt="Student" className="w-full h-full object-cover" />
              </div>

              {/* Cloud Service — bottom-left */}
              {(() => { const p = orbitPos(210, 125); const pH = orbitPos(210, 100); return (
                <div
                  className="orbit-icon absolute z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md text-white text-xs font-body font-semibold transition-all duration-1000"
                  style={{ backgroundColor: '#4285F4', transform: `translate(${p.x}px, ${p.y}px)`, '--hover-x': `${pH.x}px`, '--hover-y': `${pH.y}px` } as React.CSSProperties}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M6.5 20q-2.275 0-3.888-1.575Q1 16.85 1 14.575q0-1.95 1.175-3.475Q3.35 9.575 5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038Q19 8.075 19 11q1.725.2 2.863 1.488Q23 13.775 23 15.5q0 1.875-1.312 3.188Q20.375 20 18.5 20Z"/></svg>
                  Cloud Service
                </div>
              ); })()}

              {/* Google — top-centre */}
              {(() => { const p = orbitPos(270, 125); const pH = orbitPos(270, 100); return (
                <div
                  className="orbit-icon absolute z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md flex items-center justify-center bg-white transition-all duration-1000"
                  style={{ border: '1.5px solid var(--brand-teal-light)', transform: `translate(${p.x}px, ${p.y}px)`, '--hover-x': `${pH.x}px`, '--hover-y': `${pH.y}px` } as React.CSSProperties}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                </div>
              ); })()}

              {/* Google Meet — top-right */}
              {(() => { const p = orbitPos(325, 125); const pH = orbitPos(325, 100); return (
                <div
                  className="orbit-icon absolute z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-xl shadow-md flex items-center justify-center transition-all duration-1000"
                  style={{ backgroundColor: '#00897B', transform: `translate(${p.x}px, ${p.y}px)`, '--hover-x': `${pH.x}px`, '--hover-y': `${pH.y}px` } as React.CSSProperties}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/></svg>
                </div>
              ); })()}

              {/* Google Slides — left */}
              {(() => { const p = orbitPos(165, 125); const pH = orbitPos(165, 100); return (
                <div
                  className="orbit-icon absolute z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-xl shadow-md flex items-center justify-center transition-all duration-1000"
                  style={{ backgroundColor: '#FBBC04', transform: `translate(${p.x}px, ${p.y}px)`, '--hover-x': `${pH.x}px`, '--hover-y': `${pH.y}px` } as React.CSSProperties}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                </div>
              ); })()}

              {/* Zoom — right */}
              {(() => { const p = orbitPos(15, 130); const pH = orbitPos(15, 100); return (
                <div
                  className="orbit-icon absolute z-20 px-3.5 py-2 rounded-full shadow-md text-white text-sm font-body font-semibold transition-all duration-1000"
                  style={{ backgroundColor: '#2D8CFF', transform: `translate(${p.x}px, ${p.y}px)`, '--hover-x': `${pH.x}px`, '--hover-y': `${pH.y}px` } as React.CSSProperties}
                >
                  zoom
                </div>
              ); })()}
            </div>

            {/* Text */}
            <div className="px-8 pb-8 pt-4">
              <h3 className="text-xl font-headline font-semibold mb-3 text-brand-teal">
                Online Access
              </h3>
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Life's busy — we get it. That's why our lessons are fully online and easy to access from anywhere. Whether it's after school or on weekends, you choose the time that works, and we'll be there to support your child every step of the way.
              </p>
            </div>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mt-6">

          {/* ── Card 3: Progress Tracking ─────────────────── */}
          <div
            className="md:col-span-4 rounded-3xl overflow-hidden flex flex-col group relative"
            style={{
              background: 'linear-gradient(to top, rgba(15,165,165,0.12) 0%, rgba(224,244,244,0.4) 40%, rgba(255,255,255,0.6) 100%)',
              boxShadow: '0 2px 12px rgba(3,26,53,0.05)',
            }}
          >
            {/* Hover teal gradient overlay */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0" style={{ background: 'linear-gradient(to top, rgba(15,165,165,0.22) 0%, rgba(15,165,165,0.08) 50%, transparent 100%)' }} />
            <div className="relative z-10 flex flex-col flex-1">
            {/* Student list */}
            <div className="px-8 pt-8 flex flex-col gap-3">
              {[
                { name: 'Harry', lessons: 8, img: harryImg },
                { name: 'Anna', lessons: 7, img: annaImg },
                { name: 'Jessie', lessons: 5, img: jessieImg },
              ].map((student, i) => (
                <div
                  key={student.name}
                  className="flex items-center justify-between py-3 px-4 rounded-2xl bg-white/70 shadow-sm transition-transform duration-300 group-hover:translate-x-1"
                  style={{ opacity: i === 2 ? 0.5 : 1, transitionDelay: `${i * 60}ms` }}
                >
                  <div>
                    <span className="text-sm font-headline font-semibold block" style={{ color: 'var(--brand-teal)' }}>{student.name}</span>
                    <span className="text-xs font-body font-semibold tracking-wider" style={{ color: 'var(--text-primary)' }}>{student.lessons} LESSONS</span>
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>

            {/* Text */}
            <div className="px-8 pb-8 pt-6">
              <h3 className="text-xl font-headline font-semibold mb-3 text-brand-teal">
                Progress Tracking
              </h3>
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                No more guessing how your child is doing. With personalised plans and regular feedback, you'll always know their strengths and where they're improving. We're here to guide, support, and celebrate every little win together.
              </p>
            </div>
            </div>
          </div>

          {/* ── Card 4: Study Resources ──────────────────── */}
          <div
            className="md:col-span-6 rounded-3xl flex flex-col group relative"
            style={{
              background: 'linear-gradient(to top, rgba(15,165,165,0.12) 0%, rgba(224,244,244,0.55) 50%, rgba(224,244,244,0.95) 100%)',
              boxShadow: '0 2px 12px rgba(3,26,53,0.05)',
            }}
          >
            {/* Hover teal gradient overlay */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0" style={{ background: 'linear-gradient(to top, rgba(15,165,165,0.22) 0%, rgba(15,165,165,0.08) 50%, transparent 100%)' }} />
            <div className="relative z-10 flex flex-col flex-1">
            {/* Image */}
            <div className="relative overflow-hidden rounded-t-3xl">
              <img
                src={resourcesImg}
                alt="Study resources preview"
                className="w-full h-48 sm:h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient fade from image bottom into card background */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(224,244,244,0.7) 70%, rgba(210,240,240,0.95) 100%)' }}
              />
            </div>

            {/* Text */}
            <div className="px-8 pb-8 pt-4">
              <h3 className="text-xl font-headline font-semibold mb-3 text-brand-teal">
                Study Resources
              </h3>
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Just like our tutoring, our full library of study resources is available online, ready for you whenever you need it, whether it's for last-minute revision or dedicated study time.
              </p>
            </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
