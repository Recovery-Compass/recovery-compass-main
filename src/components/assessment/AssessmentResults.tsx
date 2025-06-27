
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Tier = 'crisis' | 'struggling' | 'seeking' | 'thriving' | 'limitless';

interface AssessmentResultsProps {
  tier: Tier;
  responses: Record<string, string>;
  assessmentId: string | null;
  onStartJourney: () => void;
}

const tierResults = {
  crisis: {
    title: 'Crisis Support Design',
    description: 'Your environment should prioritize immediate safety, calm, and accessible support.',
    recommendations: [
      'Create a dedicated quiet space for grounding and breathing',
      'Keep crisis hotline numbers and emergency contacts visible',
      'Remove or secure items that might be harmful during difficult moments',
      'Have comfort items easily accessible (blanket, water, snacks)',
      'Consider soft lighting and calming colors in your primary spaces'
    ],
    color: 'text-red-300',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-500/50'
  },
  struggling: {
    title: 'Stability-Building Design',
    description: 'Your environment should support routine, reduce overwhelm, and provide gentle structure.',
    recommendations: [
      'Organize spaces to reduce daily decision fatigue',
      'Create visual reminders for healthy routines (sleep, meals, self-care)',
      'Designate specific areas for different activities (rest, work, meals)',
      'Keep supportive resources visible but not overwhelming',
      'Use natural elements to create a sense of peace'
    ],
    color: 'text-orange-300',
    bgColor: 'bg-orange-900/20',
    borderColor: 'border-orange-500/50'
  },
  seeking: {
    title: 'Growth-Oriented Design',
    description: 'Your environment should inspire reflection, learning, and positive change.',
    recommendations: [
      'Create a dedicated space for journaling, meditation, or reflection',
      'Display inspirational books, quotes, or artwork that motivate you',
      'Organize your space to support new healthy habits',
      'Include plants or natural elements to represent growth',
      'Design areas that encourage connection with supportive people'
    ],
    color: 'text-teal-300',
    bgColor: 'bg-teal-900/20',
    borderColor: 'border-teal-500/50'
  },
  thriving: {
    title: 'Expansion-Focused Design',
    description: 'Your environment should support creativity, purpose, and meaningful contribution.',
    recommendations: [
      'Create spaces that reflect your values and aspirations',
      'Design areas for creative expression and meaningful work',
      'Include elements that connect you to your community and purpose',
      'Organize for both productivity and inspiration',
      'Create spaces for mentoring or supporting others in their journey'
    ],
    color: 'text-bronze',
    bgColor: 'bg-bronze/20',
    borderColor: 'border-bronze/50'
  },
  limitless: {
    title: 'Visionary Impact Design',
    description: 'Your environment should reflect your highest vision and support world-changing work.',
    recommendations: [
      'Design spaces that embody the change you want to see in the world',
      'Create environments that inspire breakthrough thinking and innovation',
      'Include elements that connect you to your legacy and long-term impact',
      'Design for collaboration and systems-level thinking',
      'Create spaces that serve as examples of the transformation you envision'
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
          Ready to begin implementing your personalized environmental design?
        </p>
        
        <Button
          onClick={onStartJourney}
          className="bg-bronze text-navy hover:bg-bronze/90 px-8 py-3 text-lg"
        >
          Start Your Recovery Journey
        </Button>
        
        <p className="text-moonlight/60 text-sm">
          Your assessment has been saved. You can always return to review your results.
        </p>
      </div>
    </div>
  );
};

export default AssessmentResults;
