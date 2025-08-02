import React, { useState, useEffect } from 'react';
import { Copy, Sparkles, Brain, Target, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trackEvent } from '@/lib/analytics';

interface AIPromptGeneratorProps {
  assessmentData: {
    score: number;
    branch: 'safety' | 'optimization';
    topWin: string;
    topGap: string;
    kpiMetrics?: any;
    archetypeData?: {
      primaryArchetype: string;
      strengthAreas: string[];
      growthOpportunities: string[];
      recommendedPathways: string[];
    };
    responses?: any[];
  };
  onBack: () => void;
}

export function AIPromptGenerator({ assessmentData, onBack }: AIPromptGeneratorProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    trackEvent('ai_prompt_viewed', {
      archetype: assessmentData.archetypeData?.primaryArchetype,
      score: assessmentData.score,
      branch: assessmentData.branch,
    });

    return () => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      trackEvent('ai_prompt_engagement', { duration });
    };
  }, []);

  // Generate personalized prompt based on assessment data
  const generatePrompt = () => {
    const { score, branch, topWin, topGap, archetypeData } = assessmentData;
    const archetype = archetypeData?.primaryArchetype || 'Recovery Seeker';
    
    return `I'm seeking strategic guidance for optimizing my living environment and daily routines. Based on my recent assessment:

CURRENT STATE:
- Wellness Score: ${score}/100 (${archetype} profile)
- Top strength: ${topWin}
- Key growth area: ${topGap}
- Branch focus: ${branch === 'optimization' ? 'Optimization of existing systems' : 'Building foundational safety'}

CONTEXT:
I'm looking to enhance my physical space and daily habits to better support my recovery journey and wellbeing goals. ${
  branch === 'optimization' 
    ? "I have a solid foundation but know there's room for meaningful improvements."
    : "I'm focused on creating a safe, supportive foundation for sustainable growth."
}

SPECIFIC AREAS OF INTEREST:
1. How can I optimize my living space for ${topWin.toLowerCase()} while addressing ${topGap.toLowerCase()}?
2. What are the highest-leverage environmental changes for someone with my ${archetype} profile?
3. How do I build on my strength in ${topWin} to support growth in ${topGap}?
4. What specific routines or environmental cues would accelerate my progress?

MY GROWTH OPPORTUNITIES:
${archetypeData?.growthOpportunities?.map((opp, i) => `${i + 1}. ${opp}`).join('\n') || '- Deepening daily practices\n- Building consistent routines\n- Enhancing environmental support'}

Please provide:
- 3 specific environmental modifications tailored to my ${archetype} profile
- A weekly routine framework that leverages my ${topWin} strength
- Strategies to address my ${topGap} growth area through environmental design
- Quick wins I can implement within 72 hours
- Long-term architectural changes for sustainable transformation

Consider that I value evidence-based approaches and appreciate when suggestions include the "why" behind them. I'm particularly interested in solutions that compound over time and create positive feedback loops in my recovery journey.`;
  };

  const prompt = generatePrompt();

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      trackEvent('ai_prompt_copied', {
        archetype: assessmentData.archetypeData?.primaryArchetype,
        score: assessmentData.score,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareInsights = () => {
    const subject = `Recovery Compass Insights - ${assessmentData.archetypeData?.primaryArchetype} Profile`;
    const body = `I generated a personalized recovery prompt and would like to share insights that might help others.

My Profile: ${assessmentData.archetypeData?.primaryArchetype}
Focus Area: ${assessmentData.topGap}

[Your AI's key insights here]

This anonymous feedback helps improve Recovery Compass for everyone.`;
    
    window.location.href = `mailto:research@recoverycompass.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    trackEvent('insights_share_initiated', {
      archetype: assessmentData.archetypeData?.primaryArchetype,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-midnight-foundation via-deep-ocean/20 to-midnight-foundation flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Brain className="w-16 h-16 text-compass-gold" />
              <Sparkles className="w-8 h-8 text-compass-gold absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="font-heading text-4xl font-bold text-moon-glow">
            Your Recovery Intelligence Profile
          </h1>
          <p className="text-xl text-compass-gold">
            Use this AI prompt to unlock personalized insights
          </p>
        </div>

        {/* Score Display */}
        <Card className="bg-midnight-foundation/50 border border-compass-gold/30 p-6 text-center">
          <h2 className="text-2xl font-bold text-compass-gold mb-2">
            Wellness Score: {assessmentData.score}/100
          </h2>
          <p className="text-xl text-compass-gold/80 mb-1">
            {assessmentData.archetypeData?.primaryArchetype} Profile
          </p>
          <p className="text-moon-glow/70">
            Primary focus: {assessmentData.topWin} • Key opportunity: {assessmentData.topGap}
          </p>
        </Card>

        {/* Instructions */}
        <Card className="bg-tree-copper/10 border border-tree-copper/30 p-6">
          <h3 className="text-xl font-semibold text-tree-copper mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            How to Use Your Personalized Prompt
          </h3>
          <ol className="space-y-3 text-moon-glow/90">
            <li className="flex items-start gap-3">
              <span className="text-tree-copper font-bold">1.</span>
              <span>Copy your custom prompt below</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-tree-copper font-bold">2.</span>
              <span>Paste it into your preferred AI assistant (ChatGPT, Claude, Gemini, Perplexity)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-tree-copper font-bold">3.</span>
              <span>Review the insights and create your action plan</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-tree-copper font-bold">4.</span>
              <span>Optional: Share key insights to help improve Recovery Compass</span>
            </li>
          </ol>
        </Card>

        {/* Prompt Section */}
        <Card className="bg-midnight-foundation/40 border border-compass-gold/20 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-compass-gold">
              Your Personalized AI Prompt
            </h3>
            <Button
              onClick={copyPrompt}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-all ${
                copied
                  ? 'bg-tree-copper text-midnight-foundation'
                  : 'bg-compass-gold text-midnight-foundation hover:bg-compass-gold/80'
              }`}
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Prompt'}
            </Button>
          </div>
          <div className="bg-midnight-foundation/60 border border-compass-gold/10 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-moon-glow/90 whitespace-pre-wrap font-mono">
              {prompt}
            </pre>
          </div>
        </Card>

        {/* Share Section */}
        <Card className="bg-deep-ocean/10 border border-deep-ocean/30 p-6 text-center">
          <h3 className="text-xl font-semibold text-deep-ocean mb-3">
            Help Us Build Better Recovery Tools
          </h3>
          <p className="text-moon-glow/90 mb-4">
            Your AI's response contains valuable insights that could help thousands of others on their recovery journey. 
            Consider sharing key findings with our research team.
          </p>
          <Button
            onClick={shareInsights}
            variant="outline"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-deep-ocean text-deep-ocean hover:bg-deep-ocean/20"
          >
            Share Insights (Optional)
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="px-6 py-3 text-moon-glow/60 hover:text-moon-glow"
          >
            ← Back to Results
          </Button>
        </div>

        {/* Privacy Notice */}
        <p className="text-center text-moon-glow/50 text-sm">
          Recovery Compass uses anonymous pattern recognition to improve our tools.
          <br />
          No personal data is collected without explicit consent.
        </p>
      </div>
    </div>
  );
}