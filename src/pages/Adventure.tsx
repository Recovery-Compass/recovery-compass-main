import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/useToast';
import CompassLogo from '@/components/shared/CompassLogo';
import { Copy, Check } from 'lucide-react';

const Adventure = () => {
  const [aiResponse, setAiResponse] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [orgType, setOrgType] = useState('');
  const [orgSize, setOrgSize] = useState('');
  const [primaryChallenge, setPrimaryChallenge] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_isSubmitted, _setIsSubmitted] = useState(false);
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
    
    // Validate required fields
    if (!aiResponse.trim()) {
      setFormStatus('error');
      setFormMessage('Please paste the AI response.');
      return;
    }
    
    if (!email.trim()) {
      setFormStatus('error');
      setFormMessage('Please provide your email address.');
      return;
    }
    
    if (!name.trim()) {
      setFormStatus('error');
      setFormMessage('Please provide your name.');
      return;
    }
    
    // Validate AI response length (minimum 100 characters)
    if (aiResponse.trim().length < 100) {
      setFormStatus('error');
      setFormMessage('Please paste the complete AI response (at least 100 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('save-adventure-insight', {
        body: { 
          email: email.trim(), 
          name: name.trim(),
          ai_response: aiResponse.trim(),
          org_type: orgType || null,
          org_size: orgSize || null,
          primary_challenge: primaryChallenge || null,
          role: role.trim() || null
        }
      });

      if (error) throw error;

      setFormStatus('success');
      setFormMessage("Thank you! We've received your insight. You'll receive expert analysis within 48 hours.");
      setAiResponse('');
      setEmail('');
      setName('');
      setOrgType('');
      setOrgSize('');
      setPrimaryChallenge('');
      setRole('');
    } catch (error) {
      console.error('Error submitting insight:', error);
      setFormStatus('error');
      setFormMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (_isSubmitted) {
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
              {/* AI Response - Required */}
              <div>
                <label htmlFor="ai-response" className="block text-base md:text-lg font-bold mb-3 text-compass-gold">
                  AI Response *
                </label>
                <Textarea
                  id="ai-response"
                  value={aiResponse}
                  onChange={(e) => setAiResponse(e.target.value)}
                  placeholder="Paste the AI's analysis here (minimum 100 characters)..."
                  className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-compass-gold focus:ring-2 focus:ring-compass-gold/20 text-base md:text-base"
                  required
                />
                <p className="text-sm text-white/60 mt-2">
                  💡 Include the full AI response for the most helpful expert analysis
                </p>
              </div>

              {/* Email - Required */}
              <div>
                <label htmlFor="email" className="block text-base md:text-lg font-bold mb-3 text-compass-gold">
                  Email Address *
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

              {/* Name - Required */}
              <div>
                <label htmlFor="name" className="block text-base md:text-lg font-bold mb-3 text-compass-gold">
                  Your Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First and Last Name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-compass-gold focus:ring-2 focus:ring-compass-gold/20 text-base md:text-base h-12"
                  required
                />
              </div>

              {/* Optional Context Section */}
              <div className="bg-white/5 rounded-lg p-6 space-y-6 border border-white/10">
                <div className="mb-4">
                  <h3 className="font-heading text-lg md:text-xl font-black text-compass-gold mb-2">
                    Help Us Personalize Your Response
                  </h3>
                  <p className="text-sm text-white/70">
                    These fields are optional but help us tailor our expert analysis to your specific context
                  </p>
                </div>

                {/* Organization Type - Optional */}
                <div>
                  <label htmlFor="org-type" className="block text-base font-bold mb-3 text-white/90">
                    Organization Type <span className="text-white/50 font-normal">(optional)</span>
                  </label>
                  <select
                    id="org-type"
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-3 focus:border-compass-gold focus:ring-2 focus:ring-compass-gold/20 text-base h-12"
                  >
                    <option value="" className="bg-navy">Select one...</option>
                    <option value="treatment-center" className="bg-navy">Treatment Center / Rehab</option>
                    <option value="sober-living" className="bg-navy">Sober Living / Recovery Housing</option>
                    <option value="outpatient" className="bg-navy">Outpatient Program</option>
                    <option value="nonprofit" className="bg-navy">Nonprofit / Community Organization</option>
                    <option value="government" className="bg-navy">Government / Public Health</option>
                    <option value="healthcare" className="bg-navy">Healthcare System</option>
                    <option value="education" className="bg-navy">Education / University</option>
                    <option value="other" className="bg-navy">Other</option>
                  </select>
                </div>

                {/* Organization Size - Optional */}
                <div>
                  <label htmlFor="org-size" className="block text-base font-bold mb-3 text-white/90">
                    Organization Size <span className="text-white/50 font-normal">(optional)</span>
                  </label>
                  <select
                    id="org-size"
                    value={orgSize}
                    onChange={(e) => setOrgSize(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-3 focus:border-compass-gold focus:ring-2 focus:ring-compass-gold/20 text-base h-12"
                  >
                    <option value="" className="bg-navy">Select one...</option>
                    <option value="1-10" className="bg-navy">1-10 staff</option>
                    <option value="11-50" className="bg-navy">11-50 staff</option>
                    <option value="51-200" className="bg-navy">51-200 staff</option>
                    <option value="201-500" className="bg-navy">201-500 staff</option>
                    <option value="500+" className="bg-navy">500+ staff</option>
                  </select>
                </div>

                {/* Primary Challenge - Optional */}
                <div>
                  <label htmlFor="primary-challenge" className="block text-base font-bold mb-3 text-white/90">
                    Primary Challenge <span className="text-white/50 font-normal">(optional)</span>
                  </label>
                  <select
                    id="primary-challenge"
                    value={primaryChallenge}
                    onChange={(e) => setPrimaryChallenge(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-3 focus:border-compass-gold focus:ring-2 focus:ring-compass-gold/20 text-base h-12"
                  >
                    <option value="" className="bg-navy">What's your biggest challenge right now?</option>
                    <option value="staff-retention" className="bg-navy">Staff Retention / Burnout</option>
                    <option value="client-engagement" className="bg-navy">Client Engagement / Motivation</option>
                    <option value="relapse-prevention" className="bg-navy">Relapse Prevention</option>
                    <option value="program-effectiveness" className="bg-navy">Program Effectiveness / Outcomes</option>
                    <option value="facility-design" className="bg-navy">Facility Design / Physical Environment</option>
                    <option value="culture-change" className="bg-navy">Culture Change / Leadership</option>
                    <option value="compliance" className="bg-navy">Compliance / Accreditation</option>
                    <option value="funding" className="bg-navy">Funding / Sustainability</option>
                    <option value="other" className="bg-navy">Other</option>
                  </select>
                </div>

                {/* Your Role - Optional */}
                <div>
                  <label htmlFor="role" className="block text-base font-bold mb-3 text-white/90">
                    Your Role <span className="text-white/50 font-normal">(optional)</span>
                  </label>
                  <Input
                    id="role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Executive Director, Program Manager"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-compass-gold focus:ring-2 focus:ring-compass-gold/20 text-base md:text-base h-12"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full submit-btn-gold font-bold text-base md:text-lg py-4 md:py-6 transition-all duration-200 hover:transform hover:-translate-y-0.5 flex items-center justify-center min-h-[3rem] md:min-h-[3.5rem]"
              >
                {isSubmitting ? 'Sending...' : 'Get My Expert Analysis'}
              </Button>

              {/* Form Messages */}
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