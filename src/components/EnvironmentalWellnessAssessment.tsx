import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
interface AssessmentCategory {
  id: string;
  title: string;
  description: string;
}
const assessmentCategories: AssessmentCategory[] = [{
  id: 'living-environment',
  title: 'Living Environment & Space Design',
  description: 'How your physical surroundings support or hinder your daily thriving'
}, {
  id: 'social-connections',
  title: 'Social Connections & Relationships',
  description: 'The people and community networks that influence your wellbeing'
}, {
  id: 'work-life-integration',
  title: 'Work-Life Integration',
  description: 'How your professional environment aligns with your personal values and needs'
}, {
  id: 'financial-security',
  title: 'Financial Security & Planning',
  description: 'Economic factors affecting your sense of safety and future planning'
}, {
  id: 'time-management',
  title: 'Time Management & Routines',
  description: 'Daily and weekly patterns that either energize or drain you'
}, {
  id: 'physical-health',
  title: 'Physical Health & Movement',
  description: 'How your body\'s needs are supported by your current environment'
}, {
  id: 'community-support',
  title: 'Community & Support Systems',
  description: 'External resources and networks available during both routine and challenging times'
}, {
  id: 'personal-growth',
  title: 'Personal Growth & Learning',
  description: 'Opportunities for development and meaningful engagement in your current setup'
}];
const EnvironmentalWellnessAssessment = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        assessmentCategories.forEach((_, index) => {
          setTimeout(() => {
            setVisibleCards(prev => [...prev, assessmentCategories[index].id]);
          }, 200 + index * 100);
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  const handleCategorySelect = (categoryId: string) => {
    // Future implementation for individual assessment pages
    console.log('Selected category:', categoryId);
  };
  const handleBack = () => {
    navigate('/pathway-select');
  };
  return <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-20">
      <div className={cn('max-w-6xl w-full transition-all duration-1000', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" onClick={handleBack} className="text-moonlight hover:text-bronze hover:bg-bronze/10 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Pathway
          </Button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="font-montserrat font-black text-4xl md:text-5xl text-bronze mb-6 tracking-tight lg:text-5xl text-center">Choose Your Environmental 
Focus</h1>
        </div>

        {/* Assessment Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {assessmentCategories.map((category, index) => <CategoryCard key={category.id} category={category} isVisible={visibleCards.includes(category.id)} delay={500 + index * 100} onSelect={() => handleCategorySelect(category.id)} />)}
        </div>
      </div>
    </div>;
};
interface CategoryCardProps {
  category: AssessmentCategory;
  isVisible: boolean;
  delay: number;
  onSelect: () => void;
}
const CategoryCard = ({
  category,
  isVisible,
  onSelect
}: CategoryCardProps) => {
  return <Card className={cn('bg-navy/50 border border-bronze/30 p-8 rounded-lg cursor-pointer text-center', 'hover:border-bronze/60 hover:bg-navy/70 hover:shadow-lg hover:shadow-bronze/20', 'transition-all duration-300 hover:translate-y-[-2px]', 'min-h-[200px] flex flex-col justify-center', 'transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12')} onClick={onSelect}>
      <div className="space-y-4">
        <button className="font-montserrat font-bold text-xl text-bronze tracking-tight leading-tight hover:text-bronze/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bronze focus:ring-offset-2 focus:ring-offset-navy" onClick={e => {
        e.stopPropagation();
        onSelect();
      }}>
          {category.title}
        </button>
        
        <p className="font-montserrat font-medium text-moonlight text-lg leading-relaxed">
          {category.description}
        </p>
      </div>
    </Card>;
};
export default EnvironmentalWellnessAssessment;