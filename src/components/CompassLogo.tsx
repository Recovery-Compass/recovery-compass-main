
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CompassLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const CompassLogo = ({ className, size = 'lg', animated = true }: CompassLogoProps) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded after a small delay to trigger animations
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48 md:w-64 md:h-64',
    xl: 'w-64 h-64 md:w-96 md:h-96',
  };
  
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div 
        className={cn(
          sizeClasses[size], 
          'relative transition-all duration-1000',
          animated && 'animate-gentle-pulse'
        )}
      >
        <img 
          src="/lovable-uploads/68c39900-fe84-4eac-be73-765984df2867.png" 
          alt="Recovery Compass Logo" 
          className={cn(
            'object-contain w-full h-full',
            loaded ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-1000'
          )}
        />
        {animated && (
          <div className="absolute inset-0 bg-moonlight/5 rounded-full filter blur-xl animate-gentle-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default CompassLogo;
