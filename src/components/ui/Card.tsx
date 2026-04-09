import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = true }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-card transition-all duration-300 ${
        hoverable ? 'hover:translate-y-[-4px] hover:shadow-card-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
