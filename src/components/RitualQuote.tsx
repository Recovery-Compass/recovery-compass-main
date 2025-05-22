
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface RitualQuoteProps {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}

const RitualQuote = ({
  className,
  delay = 1500,
  children
}: RitualQuoteProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={cn(
        'transition-all duration-1000 max-w-3xl mx-auto px-6',
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
        className
      )}
    >
      <blockquote className="italic text-bronze text-center font-semibold text-[26px] leading-tight">
        {children}
      </blockquote>
    </div>
  );
};

export default RitualQuote;
