import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${className}`}
      style={{
        backgroundColor: color || 'var(--brand-teal)',
        color: 'var(--text-on-accent)',
      }}
    >
      {children}
    </span>
  );
};
