
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Tier = 'struggling' | 'seeking' | 'thriving' | 'limitless';

interface AssessmentResultsProps {
  tier: Tier;
  responses: Record<string, string>;
  assessmentId: string | null;
  onStartJourney: () => void;
}

const tierResults = {
  struggling: {
    title: 'Foundation Environmental Design',
    description: 'Your environment should establish stable systems that reduce overwhelm and create supportive structure.',
    recommendations: [
      'Design organized spaces that minimize daily decision fatigue',
      'Create visual systems for consistent routines and habits',
      'Establish distinct zones for different life activities',
      'Incorporate natural elements to promote calm and focus',
      'Build in flexibility while maintaining supportive structure'
    ],
    color: 'text-orange-300',
    bgColor: 'bg-orange-900/20',
    borderColor: 'border-orange-500/50'
  },
  seeking: {
    title: 'Growth-Oriented Environmental Design',
    description: 'Your environment should inspire development, learning, and positive transformation.',
    recommendations: [
      'Create dedicated spaces for reflection, planning, and skill development',
      'Design inspiration zones with visual reminders of your goals and values',
      'Organize environments to naturally support emerging positive habits',
      'Include growth-oriented elements like plants, books, and learning materials',
      'Design connection areas that facilitate meaningful relationships and collaboration'
    ],
    color: 'text-teal-300',
    bgColor: 'bg-teal-900/20',
    borderColor: 'border-teal-500/50'
  },
  thriving: {
    title: 'Mastery-Focused Environmental Design',
    description: 'Your environment should amplify your strengths, support peak performance, and enable meaningful contribution.',
    recommendations: [
      'Design signature spaces that reflect your unique values and expertise',
      'Create optimized work environments for creative expression and high-impact activities',
      'Include elements that connect your environment to your broader purpose and community',
      'Balance productivity zones with inspiration and renewal areas',
      'Design mentorship and collaboration spaces that allow you to share your mastery with others'
    ],
    color: 'text-bronze',
    bgColor: 'bg-bronze/20',
    borderColor: 'border-bronze/50'
  },
  limitless: {
    title: 'Visionary Environmental Mastery Design',
    description: 'Your environment should embody your highest vision and support transformation at scale.',
    recommendations: [
      'Design revolutionary spaces that model the change you want to create in the world',
      'Create environments that facilitate breakthrough thinking and paradigm-shifting innovation',
      'Include legacy elements that connect your daily environment to your long-term impact',
      'Design for systems-level thinking and large-scale collaboration',
      'Create demonstration environments that inspire and teach others about environmental mastery'
    ],
    color: 'text-gold',
    bgColor: 'bg-gold/20',
    borderColor: 'border-gold/50'
  }
};

const AssessmentResults = ({ tier, responses, assessmentId, onStartJourney }: AssessmentResultsProps) => {
  const result = tierResults[tier];

  return (
    <div className="space-y-8">
      <Card className={cn(
        'p-8 border-2',
        result.bgColor,
        result.borderColor
      )}>
        <div className="text-center mb-8">
          <h2 className={cn('text-3xl font-montserrat font-black mb-4', result.color)}>
            {result.title}
          </h2>
          <p className="text-moonlight/90 text-lg">
            {result.description}
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-montserrat font-bold text-moonlight">
            Your Environmental Design Recommendations:
          </h3>
          
          <ul className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className={cn(
                  'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                  result.color.replace('text-', 'bg-')
                )} />
                <span className="text-moonlight/90 leading-relaxed">
                  {recommendation}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-moonlight/80">
          Ready to begin implementing your personalized Environmental Mastery Design™?
        </p>
        
        <Button
          onClick={onStartJourney}
          className="bg-bronze text-navy hover:bg-bronze/90 px-8 py-3 text-lg"
        >
          Start Your Environmental Mastery Journey
        </Button>
        
        <p className="text-moonlight/60 text-sm">
          Your assessment has been saved. You can always return to review your results.
        </p>
      </div>
    </div>
  );
};

export default AssessmentResults;
