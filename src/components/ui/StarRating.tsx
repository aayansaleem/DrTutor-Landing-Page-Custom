import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, reviewCount, className = '' }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < Math.floor(rating) ? 'fill-brand-gold text-brand-gold' : 'text-brand-warm-gray'}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-brand-navy">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-xs text-brand-secondary">({reviewCount}+ reviews)</span>
      )}
    </div>
  );
};
