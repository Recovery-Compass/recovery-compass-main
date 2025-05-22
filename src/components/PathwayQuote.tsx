
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PathwayQuoteProps {
  className?: string;
  visible?: boolean;
  children: React.ReactNode;
}

const PathwayQuote = ({
  className,
  visible = false,
  children
}: PathwayQuoteProps) => {
  const [isRevealed, setIsRevealed] = useState(visible);
  const quoteRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    
    if (quoteRef.current) {
      observer.observe(quoteRef.current);
    }
    
    return () => {
      if (quoteRef.current) {
        observer.unobserve(quoteRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={quoteRef}
      className={cn(
        'transition-all duration-1200 max-w-3xl mx-auto px-6 py-12 overflow-hidden',
        isRevealed ? 
          'bg-gradient-to-r from-teal/40 to-teal/10' : 
          'bg-transparent',
        className
      )}
    >
      <blockquote 
        className={cn(
          'italic text-moonlight font-light text-[20px] leading-relaxed transition-all duration-1200 transform',
          isRevealed ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'
        )}
      >
        {children}
      </blockquote>
    </div>
  );
};

export default PathwayQuote;
