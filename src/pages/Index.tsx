import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '@/components/Section';
import HeroSection from '@/components/HeroSection';

// Configuration for future extensibility
const SECTIONS = [
  {
    id: 'compass',
    component: HeroSection,
    className: 'relative'
  }
] as const;

// Utility to check if navigation target is external route
const isExternalRoute = (target: string): boolean => target.startsWith('/');

// Smooth scroll utility with error handling
const scrollToElement = (elementId: string): boolean => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return false;
    }
    
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
    return true;
  } catch (error) {
    console.error('Scroll error:', error);
    return false;
  }
};

const Index = () => {
  const navigate = useNavigate();
  
  // Memoized navigation handler with error handling
  const handleNavigate = useCallback(async (target: string) => {
    try {
      if (isExternalRoute(target)) {
        // Handle external route navigation
        navigate(target);
      } else {
        // Handle internal section navigation
        const scrollSuccess = scrollToElement(target);
        if (!scrollSuccess) {
          console.warn(`Failed to scroll to section: ${target}`);
        }
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Could add toast notification here for user feedback
    }
  }, [navigate]);
  
  // Memoized sections to prevent unnecessary re-renders
  const renderedSections = useMemo(() => 
    SECTIONS.map(({ id, component: Component, className }) => (
      <Section 
        key={id}
        id={id} 
        className={className}
        role="main"
        aria-label={`${id} section`}
      >
        <Component onNavigate={handleNavigate} />
      </Section>
    )), 
    [handleNavigate]
  );
  
  return (
    <div className="min-h-screen bg-navy">
      {renderedSections}
    </div>
  );
};

export default Index;
