import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = true,
  className = '',
  light = false,
}) => {
  return (
    <div className={`${centered ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className={`text-xl sm:text-2xl md:text-3xl font-headline font-semibold ${light ? 'text-white' : 'text-brand-teal'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base font-body max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/90' : 'text-brand-secondary'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
