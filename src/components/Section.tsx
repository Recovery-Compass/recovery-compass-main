
import { useRef, useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  reveal?: boolean;
}

const Section = ({ id, className, children, reveal = true }: SectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        'min-h-screen flex flex-col justify-center items-center section-padding',
        reveal && 'vertical-reveal',
        isVisible && reveal && 'revealed',
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
