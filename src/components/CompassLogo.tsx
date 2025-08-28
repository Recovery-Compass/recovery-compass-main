
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CompassLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  priority?: boolean; // For performance optimization
}

const CompassLogo = ({
  className,
  size = 'lg',
  animated = true,
  priority = false
}: CompassLogoProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Set loaded after a small delay to trigger animations
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const sizeClasses = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-24 h-24 sm:w-32 sm:h-32',
    lg: 'w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64',
    xl: 'w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96'
  };

  const handleImageError = () => {
    setError(true);
    console.error('Failed to load compass logo image');
  };

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div className={cn(
        sizeClasses[size], 
        'relative transition-all duration-1000', 
        animated && 'animate-gentle-pulse'
      )}>
        {error ? (
          // Fallback content if image fails to load
          <div className="w-full h-full bg-tree-copper/20 rounded-full flex items-center justify-center border-2 border-tree-copper">
            <span className="text-tree-copper font-bold text-lg">RC</span>
          </div>
        ) : (
          <img 
            src="/lovable-uploads/a3dd77ca-2111-41fe-8111-fe1d04695f12.png" 
            alt="Recovery Compass - Tree of Life Logo" 
            className={cn(
              'object-contain w-full h-full',
              loaded ? 'opacity-100' : 'opacity-0',
              'transition-opacity duration-1000'
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        )}
        {animated && !error && (
          <div className="absolute inset-0 bg-moonlight/5 filter blur-xl animate-gentle-pulse rounded-full"></div>
        )}
      </div>
    </div>
  );
};

export default CompassLogo;
