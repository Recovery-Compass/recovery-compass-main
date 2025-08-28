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
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
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
    setFormMessage('');
    setFormStatus('idle');
    
    if (!aiResponse.trim() || !email.trim()) {
      setFormStatus('error');
      setFormMessage('Please fill in both fields.');
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

      setFormStatus('success');
      setFormMessage("Thank you! We've received your insight. We review all submissions and respond as appropriate.");
      setAiResponse('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting insight:', error);
      setFormStatus('error');
      setFormMessage('Something went wrong. Please try again.');
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
          <div className="text-center mb-8 md:mb-12">
            <CompassLogo 
              size="lg" 
              animated={true} 
              className="mx-auto mb-6 md:mb-8 drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]" 
            />
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 text-white">
              Engage the Prompt
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
              Transform organizational challenges into environmental opportunities through AI-guided analysis
            </p>
          </div>

          {/* Prompt Block */}
          <div className="bg-white/10 rounded-lg p-4 md:p-6 mb-6 md:mb-8 backdrop-blur-sm mx-4 md:mx-0">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
              <h2 className="font-heading text-xl md:text-2xl font-black text-compass-gold">
                Environmental Response Architecture™ Prompt
              </h2>
              <Button
                onClick={handleCopyPrompt}
                variant="outline"
                size="sm"
                className="bg-transparent border-compass-gold text-compass-gold hover:bg-compass-gold hover:text-navy transition-all duration-200 self-start md:self-auto flex items-center gap-2"
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
          <div className="bg-white/5 rounded-lg p-4 md:p-6 mb-6 md:mb-8 mx-4 md:mx-0">
            <h3 className="font-heading text-lg md:text-xl font-black mb-4 text-compass-gold">
              Three Simple Steps
            </h3>
            <ol className="space-y-4 text-base md:text-lg">
              <li className="flex items-start gap-3 md:gap-4">
                <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-compass-gold text-navy rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                  1
                </span>
                <span className="text-white/90 leading-relaxed">Copy the prompt above</span>
              </li>
              <li className="flex items-start gap-3 md:gap-4">
                <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-compass-gold text-navy rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                  2
                </span>
                <span className="text-white/90 leading-relaxed">Paste into ChatGPT, Claude, or Gemini with your organization's specific challenges</span>
              </li>
              <li className="flex items-start gap-3 md:gap-4">
                <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-compass-gold text-navy rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                  3
                </span>
                <span className="text-white/90 leading-relaxed">Paste the AI's response below with your email. You'll receive a thoughtful reflection within 48 hours.</span>
              </li>
            </ol>
          </div>

          {/* Form */}
          <div className="px-4 md:px-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="ai-response" className="block text-base md:text-lg font-bold mb-3 text-compass-gold">
                  AI Response
                </label>
                <Textarea
                  id="ai-response"
                  value={aiResponse}
                  onChange={(e) => setAiResponse(e.target.value)}
                  placeholder="Paste the AI's analysis here..."
                  className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-compass-gold focus:ring-2 focus:ring-compass-gold/20 text-base md:text-base"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base md:text-lg font-bold mb-3 text-compass-gold">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-compass-gold focus:ring-2 focus:ring-compass-gold/20 text-base md:text-base h-12"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full submit-btn-gold font-bold text-base md:text-lg py-4 md:py-6 transition-all duration-200 hover:transform hover:-translate-y-0.5 flex items-center justify-center min-h-[3rem] md:min-h-[3.5rem]"
              >
                {isSubmitting ? 'Sending...' : 'Share Your Insight'}
              </Button>

              {formMessage && (
                <div
                  className={`form-message ${formStatus} mt-4 p-4 rounded-lg text-center ${
                    formStatus === 'success' 
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}
                  role={formStatus === 'error' ? 'alert' : 'status'}
                >
                  {formMessage}
                </div>
              )}
            </form>
          </div>

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