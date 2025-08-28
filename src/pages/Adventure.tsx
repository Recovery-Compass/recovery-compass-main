import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import CompassLogo from '@/components/CompassLogo';
import { Copy, Check } from 'lucide-react';

const Adventure = () => {
  const [aiResponse, setAiResponse] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const { toast } = useToast();

  const adventurePrompt = `You are an Environmental Response Architecture™ analyst. I'm going to share my organization's current challenges with you. Please analyze them through the lens of "environment as ally" and provide:

1. Three specific environmental modifications that could transform how our organization operates
2. One "keystone change" - a single environmental shift that would create cascading positive effects
3. Implementation guidance for the next 48 hours

Focus on practical, evidence-based environmental design principles. Think systems, not just individual behavior change.

Here are my organization's current challenges: [Share your specific situation here]`;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(adventurePrompt);
      setPromptCopied(true);
      toast({
        title: "Prompt copied!",
        description: "The prompt has been copied to your clipboard.",
      });
      setTimeout(() => setPromptCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please manually copy the prompt text.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aiResponse.trim() || !email.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both your AI response and email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('save-adventure-insight', {
        body: { 
          email: email.trim(), 
          ai_response: aiResponse.trim() 
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Insight received!",
        description: "Your thoughtful reflection will arrive within 48 hours.",
      });
    } catch (error) {
      console.error('Error submitting insight:', error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy to-navy-dark text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <CompassLogo 
              size="lg" 
              animated={true} 
              className="mx-auto mb-8 drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]" 
            />
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 heading-celebrating">
              Insight Received
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Your thoughtful reflection will arrive within 48 hours.
            </p>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-lg">
                We're crafting a personalized analysis of your submission using Environmental Response Architecture™ principles. 
                Check your email for deep insights designed to help your environment become your ally.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-navy-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <CompassLogo 
              size="lg" 
              animated={true} 
              className="mx-auto mb-8 drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]" 
            />
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 heading-welcoming">
              Engage the Prompt
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Transform organizational challenges into environmental opportunities through AI-guided analysis
            </p>
          </div>

          {/* Prompt Block */}
          <div className="bg-white/10 rounded-lg p-6 mb-8 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-heading text-2xl font-bold text-gold heading-confident">
                Environmental Response Architecture™ Prompt
              </h2>
              <Button
                onClick={handleCopyPrompt}
                variant="outline"
                size="sm"
                className="bg-transparent border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-200"
              >
                {promptCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {promptCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="whitespace-pre-wrap text-sm md:text-base text-white/90 font-body leading-relaxed">
              {adventurePrompt}
            </pre>
          </div>

          {/* Guidance */}
          <div className="bg-white/5 rounded-lg p-6 mb-8">
            <h3 className="font-heading text-xl font-bold mb-4 text-gold heading-confident">
              Three Simple Steps
            </h3>
            <ol className="space-y-4 text-lg">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gold text-navy rounded-full flex items-center justify-center font-bold">
                  1
                </span>
                <span>Copy the prompt above</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gold text-navy rounded-full flex items-center justify-center font-bold">
                  2
                </span>
                <span>Paste into ChatGPT, Claude, or Gemini with your organization's specific challenges</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gold text-navy rounded-full flex items-center justify-center font-bold">
                  3
                </span>
                <span>Paste the AI's response below with your email. You'll receive a thoughtful reflection within 48 hours.</span>
              </li>
            </ol>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="ai-response" className="block text-lg font-bold mb-3 text-gold">
                AI Response
              </label>
              <Textarea
                id="ai-response"
                value={aiResponse}
                onChange={(e) => setAiResponse(e.target.value)}
                placeholder="Paste the AI's analysis here..."
                className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-bold mb-3 text-gold">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold text-navy hover:bg-gold/90 font-bold text-lg py-6 transition-all duration-200 hover:transform hover:-translate-y-0.5"
            >
              {isSubmitting ? 'Sharing Your Insight...' : 'Share Your Insight'}
            </Button>
          </form>

          {/* Footer Note */}
          <div className="text-center mt-8 text-white/70">
            <p className="text-sm">
              Your submission helps us refine Environmental Response Architecture™ methodology. 
              Responses are crafted individually by our team of recovery environment specialists.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adventure;