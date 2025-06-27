
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Tier = 'crisis' | 'struggling' | 'seeking' | 'thriving' | 'limitless';

interface TierSelectorProps {
  onTierSelect: (tier: Tier) => void;
}

const tierInfo = {
  crisis: {
    title: 'Crisis',
    description: 'Need immediate support and safety',
    color: 'red',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-500/50',
    textColor: 'text-red-300'
  },
  struggling: {
    title: 'Struggling',
    description: 'Working through daily challenges',
    color: 'orange',
    bgColor: 'bg-orange-900/20',
    borderColor: 'border-orange-500/50',
    textColor: 'text-orange-300'
  },
  seeking: {
    title: 'Seeking',
    description: 'Ready for growth and change',
    color: 'teal',
    bgColor: 'bg-teal-900/20',
    borderColor: 'border-teal-500/50',
    textColor: 'text-teal-300'
  },
  thriving: {
    title: 'Thriving',
    description: 'Building on existing strengths',
    color: 'bronze',
    bgColor: 'bg-bronze/20',
    borderColor: 'border-bronze/50',
    textColor: 'text-bronze'
  },
  limitless: {
    title: 'Limitless',
    description: 'Creating transformational impact',
    color: 'gold',
    bgColor: 'bg-gold/20',
    borderColor: 'border-gold/50',
    textColor: 'text-gold'
  }
};

const TierSelector = ({ onTierSelect }: TierSelectorProps) => {
  const [hoveredTier, setHoveredTier] = useState<Tier | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-montserrat font-bold text-moonlight mb-4">
          Where are you in your journey?
        </h2>
        <p className="text-moonlight/80">
          Choose the description that best fits where you are right now.
        </p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {Object.entries(tierInfo).map(([tier, info]) => (
          <Card
            key={tier}
            className={cn(
              'p-6 cursor-pointer transition-all duration-300',
              'bg-navy/50 border-2',
              info.borderColor,
              hoveredTier === tier ? `${info.bgColor} scale-105` : 'hover:scale-102'
            )}
            onMouseEnter={() => setHoveredTier(tier as Tier)}
            onMouseLeave={() => setHoveredTier(null)}
            onClick={() => onTierSelect(tier as Tier)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className={cn('text-xl font-montserrat font-bold mb-2', info.textColor)}>
                  {info.title}
                </h3>
                <p className="text-moonlight/80">
                  {info.description}
                </p>
              </div>
              <div className={cn(
                'w-4 h-4 rounded-full transition-all duration-300',
                hoveredTier === tier ? info.bgColor.replace('/20', '') : info.bgColor
              )} />
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-moonlight/60 text-sm italic">
          Don't worry about getting it "perfect" - choose what feels most true right now.
        </p>
      </div>
    </div>
  );
};

export default TierSelector;
