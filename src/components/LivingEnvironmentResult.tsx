import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ResultProps {
  score: number;           // 0-100 overall
  branch: 'safety' | 'optimization';
  topWin: string;          // highest-scoring factor label
  topGap: string;          // lowest-scoring factor label
  onBack: () => void;
}

const LivingEnvironmentResult = ({ score, branch, topWin, topGap, onBack }: ResultProps) => {
  const personaSentence = branch === 'safety' 
    ? "You fit our Safety-First profile — protecting stability comes first."
    : "You fit our Steady-Builder profile — solid base, ready for comfort upgrades.";

  const socialProofClients = branch === 'safety' ? 'Safety-First' : 'Optimization-Track';

  const handleUpgrade = () => {
    // Future implementation - could open modal or redirect
    console.log('Upgrade to $99 Environmental Design');
  };

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full transition-all duration-300 opacity-100 translate-y-0">
        <Card className="bg-navy/50 border border-bronze/30 p-8 rounded-lg">
          <div className="space-y-8">
            {/* Headline */}
            <h1 className="font-heading heading-celebrating text-3xl text-bronze text-center tracking-tightest">
              Your Living-Environment Profile
            </h1>

            {/* Metrics Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
              <div className="space-y-2">
                <div className="text-bronze font-body font-bold text-sm">
                  Wellness Score: {score}/100
                </div>
                <div className="text-bronze font-body font-bold text-sm">
                  Top Win: {topWin}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-bronze font-body font-bold text-sm">
                  Branch: {branch}
                </div>
                <div className="text-bronze font-body font-bold text-sm">
                  Key Gap: {topGap}
                </div>
              </div>
            </div>

            {/* Persona Sentence */}
            <p className="text-moonlight text-lg font-body text-center leading-relaxed">
              {personaSentence}
            </p>

            {/* Social Proof Line */}
            <div className="text-center">
              <p className="text-moonlight/80 font-body text-sm">
                ⭐ 4.8/5 from 23 {socialProofClients} clients this month
              </p>
            </div>

            {/* Blurred Preview Card */}
            <div className="relative w-full max-w-md mx-auto my-6">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-bronze/20 to-navy/40 rounded-lg blur-sm flex items-center justify-center">
                  <div className="text-moonlight/60 font-body font-bold text-sm">
                    Custom Design Preview
                  </div>
                </div>
                <span className="absolute top-2 right-2 bg-bronze text-navy px-2 py-1 text-xs font-bold rounded">
                  $99 VALUE PACK
                </span>
              </div>
              <ul className="mt-4 space-y-1 text-moonlight/80 text-sm font-body">
                <li>✔ Custom light-map for calmer evenings</li>
                <li>✔ Privacy & flow mini-layout</li>
                <li>✔ Product links & checklist</li>
              </ul>
            </div>

            {/* Primary CTA */}
            <div className="text-center space-y-2">
              <Button
                onClick={handleUpgrade}
                className="w-full bg-bronze text-navy hover:bg-bronze/80 font-body font-bold uppercase tracking-wide text-lg py-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-bronze/30 min-h-[48px]"
              >
                Unlock My 72-Hour Design – $99
              </Button>
              <p className="text-moonlight/60 text-xs font-body">
                Next 3 spots available for Tuesday delivery • Love it or full refund
              </p>
            </div>

            {/* Secondary Link */}
            <div className="text-center">
              <a 
                href="/environmental-design" 
                className="text-moonlight/60 text-sm underline font-body hover:text-moonlight/80 transition-colors duration-200"
              >
                Maybe later – explore free tools →
              </a>
            </div>

            {/* Back Button */}
            <div className="text-center mt-8">
              <Button 
                onClick={onBack}
                variant="ghost"
                className="text-moonlight/60 hover:text-bronze hover:bg-bronze/10 font-body font-bold"
              >
                Back to Categories
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LivingEnvironmentResult;