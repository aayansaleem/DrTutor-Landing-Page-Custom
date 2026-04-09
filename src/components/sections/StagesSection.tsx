import React from 'react';
import { stages } from '@/data/stages';

const StageBadge: React.FC<{ label: string }> = ({ label }) => (
  <div
    className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-brand-teal text-white text-xs font-body font-semibold shadow-none border-none"
  >
    <span className="w-2 h-2 rounded-full flex-shrink-0 bg-white/60" />
    <span className="text-xs font-body font-semibold text-white whitespace-nowrap">{label}</span>
  </div>
);

export const StagesSection: React.FC = () => {
  return (
    <section className="bg-white py-8 relative overflow-hidden">
      {/* Left edge fade */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      {/* Right edge fade */}
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Infinite loop marquee — 4 copies for seamless fill on any screen width */}
      <div className="flex animate-marquee gap-4" style={{ width: 'max-content' }}>
        {[...stages, ...stages, ...stages, ...stages].map((stage, i) => (
          <StageBadge key={i} label={stage.label} />
        ))}
      </div>
    </section>
  );
};
