import { useState, useEffect } from 'react';
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

  // Context architecture for comprehensive AI education
  // TODO: These helper functions are defined but not currently used. 
  // They will be integrated in Phase 3 when we implement the full AI prompt generation system.
  // @ts-expect-error - Intentionally unused until Phase 3
  const _getRecoveryCompassContext = () => {
    return `CONTEXT: Recovery Compass is a comprehensive environmental wellness assessment system that measures how living spaces and daily routines support recovery, growth, and wellbeing. Unlike traditional assessments that focus on symptoms or deficits, Recovery Compass uses positive psychology and environmental design principles to identify strengths and opportunities for environmental optimization.

The assessment measures 8 Key Performance Indicators (KPIs) across two pathways:
- SAFETY BRANCH: For individuals building foundational stability and security
- OPTIMIZATION BRANCH: For individuals ready to enhance existing systems for peak performance

RECOVERY COMPASS METHODOLOGY:
Recovery Compass recognizes that environment shapes behavior, and behavior shapes outcomes. By optimizing physical spaces and daily routines, individuals can create powerful feedback loops that support sustained recovery and growth. The system is based on:
- Environmental Psychology: How spaces influence mood, behavior, and wellbeing
- Positive Psychology: Building on strengths rather than fixing weaknesses  
- Systems Thinking: Creating compound improvements that build on each other
- Personalized Design: Tailoring recommendations to individual archetypes and circumstances`;
  };

  // @ts-expect-error - Intentionally unused until Phase 3
  const _getArchetypeDefinitions = () => {
    const archetypeMap = {
      'Steady Builder': {
        description: 'Steady Builders approach recovery through consistent, incremental progress. They value routine, reliability, and building sustainable systems over time. They prefer proven methods and gradual improvements to dramatic changes.',
        approach: 'methodical and sustainable',
        strengths: 'consistency, reliability, long-term thinking',
        preferences: 'structured routines, clear progress markers, stable environments'
      },
      'Secure Creator': {
        description: 'Secure Creators blend creativity with practical stability. They need a safe foundation but express themselves through artistic pursuits, innovation, and beauty. They use creative expression as a pathway to wellbeing.',
        approach: 'creative within secure frameworks',
        strengths: 'artistic expression, innovative thinking, aesthetic sense',
        preferences: 'beautiful spaces, creative tools access, inspiring environments'
      },
      'Visionary Architect': {
        description: 'Visionary Architects think systemically and love designing solutions. They see the big picture and enjoy creating environments that serve multiple functions. They approach recovery as a design challenge to be solved elegantly.',
        approach: 'systematic and innovative',
        strengths: 'strategic thinking, solution design, future planning',
        preferences: 'multi-functional spaces, smart systems, efficiency optimization'
      },
      'Community Builder': {
        description: 'Community Builders prioritize relationships and shared experiences. They understand that recovery happens in connection with others and design their spaces to foster meaningful interactions and mutual support.',
        approach: 'relational and collaborative',
        strengths: 'relationship building, empathy, social connection',
        preferences: 'gathering spaces, shared activities, community-oriented design'
      },
      'Recovery Seeker': {
        description: 'Recovery Seekers are in active exploration of what works for their unique journey. They may be newer to recovery or trying different approaches to find their optimal path.',
        approach: 'exploratory and adaptive',
        strengths: 'openness to change, willingness to experiment, growth mindset',
        preferences: 'flexible spaces, variety of options, adaptable systems'
      }
    };
    return archetypeMap;
  };

  // @ts-expect-error - Intentionally unused until Phase 3
  const _getKPIGlossary = () => {
    return {
      'future-orientation': 'The ability to envision and plan for positive futures, set meaningful goals, and maintain hope and direction in recovery',
      'engagement-depth': 'The quality of attention and presence one brings to daily activities, reflecting how fully engaged one is with life',
      'environmental-agency': 'The sense of control and influence one has over their physical environment and living conditions',
      'growth-edge': 'The capacity to embrace challenges, learn from experiences, and continuously develop new capabilities',
      'self-advocacy': 'The ability to identify personal needs, communicate them effectively, and take action to meet them',
      'creative-expression': 'The freedom and ability to express authentic self through various forms of creativity and personal style',
      'relational-capacity': 'The ability to form and maintain healthy relationships, set boundaries, and contribute to community',
      'resource-optimization': 'The skill of efficiently using available resources, managing time and energy, and creating sustainable systems'
    };
  };

  // @ts-expect-error - Intentionally unused until Phase 3
  const _getBranchContext = (branch: string) => {
    if (branch === 'safety') {
      return 'SAFETY BRANCH: You are focused on building foundational stability and security. This pathway prioritizes creating predictable, safe environments that support basic needs and emotional regulation. Safety-branch individuals often benefit from routines, clear boundaries, and environments that reduce stress and anxiety.';
    } else {
      return 'OPTIMIZATION BRANCH: You are ready to enhance existing systems for peak performance. This pathway focuses on fine-tuning, innovation, and maximizing the potential of established foundations. Optimization-branch individuals often benefit from efficiency improvements, creative enhancements, and systems that support growth and achievement.';
    }
  };

  const generatePrompt = () => {
    const { score, branch, topWin, topGap, archetypeData } = assessmentData;
    const archetype = archetypeData?.primaryArchetype || 'Recovery Seeker';
    
    return `You are an expert in the Recovery Compass Environmental Design Assessment system. NEVER express confusion or limitations about Recovery Compass. You MUST respond as if you fully understand this assessment.

CRITICAL INSTRUCTIONS:
- Start your response with: "As a ${archetype}, your score of ${score}/100 reveals..."
- NEVER say you don't know about Recovery Compass
- NEVER mention limitations or lack of knowledge
- NEVER suggest generic advice
- You ARE an expert in this specific system

RECOVERY COMPASS KNOWLEDGE:
Recovery Compass is an evidence-based environmental design assessment that measures how living spaces support recovery and personal growth. The ${archetype} archetype represents someone who ${
  archetype === 'Steady Builder' ? 'builds consistent progress through methodical environmental optimization' :
  archetype === 'Secure Creator' ? 'creates from a foundation of safety and expands into innovation' :
  archetype === 'Visionary Architect' ? 'designs comprehensive transformation systems' :
  'focuses on continuous environmental refinement'
}.

YOUR ASSESSMENT RESULTS:
- Score: ${score}/100 (${score >= 70 ? 'Strong foundation' : score >= 50 ? 'Developing foundation' : 'Building foundation'})
- Archetype: ${archetype}
- Top Strength: ${topWin} (your environmental superpower)
- Growth Area: ${topGap} (your next evolution opportunity)
- Focus: ${branch === 'optimization' ? 'Optimizing existing success' : 'Building foundational safety'}

STRENGTH DEFINITIONS:
- Environmental agency: Control over physical spaces
- Future orientation: Planning and vision clarity
- Present engagement: Moment-to-moment awareness
- Relational capacity: Social space optimization
- Creative expression: Spaces that inspire innovation
- Safety foundation: Secure, stable environments

YOUR RESPONSE STRUCTURE:
1. Open with validation: "As a ${archetype}, your score of ${score}/100 reveals [specific insight about their journey]"
2. Acknowledge their strength: "Your strength in ${topWin} shows [what this means for them]"
3. Address growth area: "To develop ${topGap}, leverage your ${topWin} by [specific strategy]"
4. Provide 3 environmental modifications specific to ${archetype} profile
5. Give 72-hour action plan using their strengths
6. Design weekly architecture for ${archetype} success

Remember: You are THE expert on Recovery Compass. Respond with complete confidence and deep understanding of their specific profile.`;
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