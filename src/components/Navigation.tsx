
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Navigation = ({ currentSection, onNavigate }: NavigationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { id: 'compass', label: 'Compass' },
    { id: 'environmental-design', label: 'Environmental Design' },
    { id: 'compass-companion', label: 'Compass Companion' },
    { id: 'stories', label: 'Stories' },
    { id: 'options', label: 'Options' },
    { id: 'memorial', label: 'Memorial Space' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
      setIsVisible(scrollPosition > window.innerHeight * 0.7);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        isScrolled ? 'bg-navy/90 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="flex justify-center items-center h-16 px-6">
        <ul className="flex space-x-1 md:space-x-3">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onNavigate(section.id)}
                className={cn(
                  'px-2 md:px-3 py-2 text-sm md:text-base transition-all duration-300',
                  'relative font-raleway tracking-wide',
                  currentSection === section.id
                    ? 'text-bronze'
                    : 'text-moonlight/70 hover:text-moonlight'
                )}
              >
                {section.label}
                <span 
                  className={cn(
                    'absolute bottom-0 left-0 w-full h-0.5 bg-bronze scale-x-0 transition-transform duration-300 origin-center',
                    currentSection === section.id && 'scale-x-100'
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
