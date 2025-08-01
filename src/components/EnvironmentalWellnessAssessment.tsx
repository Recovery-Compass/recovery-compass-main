import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Home, Users, DollarSign, Clock, Heart, UsersRound, BookOpen } from 'lucide-react';
import LivingEnvironmentQuiz from './LivingEnvironmentQuiz';
interface AssessmentCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}
const assessmentCategories: AssessmentCategory[] = [{
  id: 'living-environment',
  title: 'Living Environment & Space Design',
  description: 'How your physical surroundings support or hinder your daily thriving',
  icon: Home
}, {
  id: 'social-connections',
  title: 'Social Connections & Relationships',
  description: 'The people and community networks that influence your wellbeing',
  icon: Users
}, {
  id: 'work-life-integration',
  title: 'Work-Life Harmony',
  description: 'How your professional environment aligns with your personal values and needs',
  icon: Heart
}, {
  id: 'financial-security',
  title: 'Financial Wellness & Security',
  description: 'Economic factors affecting your sense of safety and future planning',
  icon: DollarSign
}, {
  id: 'time-management',
  title: 'Time Management & Routines',
  description: 'Daily and weekly patterns that either energize or drain you',
  icon: Clock
}, {
  id: 'physical-health',
  title: 'Physical Health & Movement',
  description: 'How your body\'s needs are supported by your current environment',
  icon: Heart
}, {
  id: 'community-support',
  title: 'Community & Support Systems',
  description: 'External resources and networks available during both routine and challenging times',
  icon: UsersRound
}, {
  id: 'personal-growth',
  title: 'Personal Growth & Learning',
  description: 'Opportunities for development and meaningful engagement in your current setup',
  icon: BookOpen
}];
const EnvironmentalWellnessAssessment = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [journeyContext, setJourneyContext] = useState<any>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Check for journey context
    const context = JSON.parse(sessionStorage.getItem('journeyContext') || '{}');
    if (context.category) {
      setJourneyContext(context);
      // Auto-start living environment quiz if that's what they selected
      if (context.category === 'living-environment') {
        setShowQuiz(true);
      }
    }
    
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
    if (categoryId === 'living-environment') {
      setShowQuiz(true);
    } else {
      // Future implementation for other assessment pages
      console.log('Selected category:', categoryId);
    }
  };
  const handleBack = () => {
    navigate('/pathway-select');
  };

  const handleQuizBack = () => {
    setShowQuiz(false);
  };

  if (showQuiz) {
    return <LivingEnvironmentQuiz onBack={handleQuizBack} />;
  }
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
          <h1 className="font-heading heading-welcoming text-4xl md:text-5xl text-bronze mb-6 tracking-tight lg:text-5xl text-center">Choose Your Environmental Focus</h1>
          <p className="font-body text-moonlight/70 text-lg">
            Evidence-based environmental optimization
          </p>
        </div>

        {/* Show personalized message if from adaptive journey */}
        {journeyContext && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
              <p className="text-moonlight/80 text-center">
                Based on your responses, we recommend starting with <strong className="text-gold">{assessmentCategories.find(cat => cat.id === journeyContext.category)?.title}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Assessment Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">{assessmentCategories.map((category, index) => <CategoryCard key={category.id} category={category} isVisible={visibleCards.includes(category.id)} delay={500 + index * 100} onSelect={() => handleCategorySelect(category.id)} isRecommended={journeyContext?.category === category.id} />)}
        </div>
      </div>
    </div>;
};
interface CategoryCardProps {
  category: AssessmentCategory;
  isVisible: boolean;
  delay: number;
  onSelect: () => void;
  isRecommended?: boolean;
}
const CategoryCard = ({
  category,
  isVisible,
  onSelect,
  isRecommended = false
}: CategoryCardProps) => {
  const IconComponent = category.icon;
  
  return <Card className={cn(
    'bg-navy/50 border p-8 rounded-lg cursor-pointer text-center group',
    'hover:border-bronze/60 hover:bg-navy/70 hover:shadow-xl hover:shadow-bronze/30',
    'transition-all duration-300 hover:translate-y-[-4px]',
    'min-h-[220px] flex flex-col justify-center',
    'transition-all duration-700',
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
    isRecommended 
      ? 'border-gold/50 bg-gold/5 ring-2 ring-gold/20' 
      : 'border-bronze/30'
  )} onClick={onSelect}>
      <div className="space-y-6">
        {/* Icon and Recommended Badge */}
        <div className="flex justify-center items-center gap-2">
          <IconComponent className="w-8 h-8 text-bronze/80 group-hover:text-bronze transition-colors duration-200" />
          {isRecommended && (
            <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">
              Recommended
            </span>
          )}
        </div>
        
        {/* Title with Explore indicator */}
        <div className="relative">
          <button className="font-body font-bold text-xl text-bronze tracking-tight leading-tight hover:text-bronze/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bronze focus:ring-offset-2 focus:ring-offset-navy min-h-[48px]" onClick={e => {
            e.stopPropagation();
            onSelect();
          }}>
            {category.title}
          </button>
          <span className="text-xs text-moonlight/50 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1 block">
            Explore →
          </span>
        </div>
        
        <p className="font-body text-moonlight text-base leading-relaxed">
          {category.description}
        </p>
      </div>
    </Card>;
};
export default EnvironmentalWellnessAssessment;