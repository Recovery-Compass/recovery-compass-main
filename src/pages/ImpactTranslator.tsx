
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download, Sparkles, Upload, CheckCircle } from 'lucide-react';

const ImpactTranslator = () => {
  const [story, setStory] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transformedContent, setTransformedContent] = useState('');
  const [context, setContext] = useState({
    whoServed: '',
    approach: '',
    successMeasure: '',
    uniqueAspect: ''
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Save to demo data
      localStorage.setItem('demo_uploaded_file', file.name);
    }
  };

  const handleContextChange = (field: string, value: string) => {
    setContext(prev => ({
      ...prev,
      [field]: value
    }));
    // Save context to localStorage for demo persistence
    localStorage.setItem('demo_context', JSON.stringify({
      ...context,
      [field]: value
    }));
  };

  const generateDemoTransformation = () => {
    const demoTransformations = [
      {
        story: "shelter placement",
        output: `## Executive Summary
**Program**: Emergency Housing Stabilization Initiative
**Outcome**: 51% permanent housing placement rate, exceeding HUD national benchmarks by 18%

### Evidence-Based Impact
- **Population Served**: Adults experiencing chronic homelessness with complex trauma histories
- **Methodology**: Trauma-informed, relationship-based engagement model (35-day average therapeutic intervention)
- **Measurable Outcomes**: 91 permanent housing placements from 178 enrolled participants

### Compliance & Standards Alignment
✓ **HUD CoC Standards**: Exceeds performance benchmarks for rapid rehousing programs
✓ **SAMHSA Guidelines**: Implements trauma-informed care principles with documented protocols
✓ **VA Supportive Services**: Coordinated entry system integration for veteran participants

### Financial Impact & ROI
- **Cost per successful placement**: $3,247 (vs. $8,500 industry average)
- **Emergency service reduction**: 67% decrease in participant crisis interventions
- **Long-term stability**: 89% of placements maintained housing at 12-month follow-up

### Narrative Integration
Marcus's journey exemplifies our depth-over-speed methodology. After three failed rapid placements, our 42-day stabilization approach addressed root trauma, resulting in sustained housing success and peer mentorship engagement—demonstrating the cost-effectiveness of comprehensive intervention models.`
      },
      {
        story: "clinical contact",
        output: `## Clinical Integration Report
**Service Model**: Integrated Behavioral Health & Housing Services
**Metric**: 196 clinical contacts across 85 active participants

### Evidence-Based Service Delivery
- **Clinical Model**: Integrated care coordination with on-site behavioral health specialists
- **Engagement Rate**: 89% participant completion of recommended clinical interventions
- **Outcomes Tracking**: PHQ-9 depression scores improved average 4.2 points over 90 days

### Regulatory Compliance
✓ **42 CFR Part 2**: Confidentiality protocols for substance use treatment integration
✓ **HIPAA**: Protected health information safeguards with coordinated care agreements
✓ **CARF Standards**: Person-centered planning documentation and outcome measurement

### Cost-Effectiveness Analysis
- **Per-contact cost**: $127 (vs. $340 for emergency department visits)
- **Crisis prevention**: 73% reduction in psychiatric emergency services utilization
- **Medication adherence**: 84% improvement in prescribed treatment compliance

### Strategic Value Proposition
This integrated model demonstrates how embedded clinical services create measurable outcomes while reducing system costs—a scalable approach for funders seeking evidence-based homeless services innovation.`
      }
    ];

    const selectedDemo = demoTransformations.find(demo => 
      story.toLowerCase().includes(demo.story)
    ) || demoTransformations[0];

    return selectedDemo.output;
  };

  const handleTransform = async () => {
    if (!story && !uploadedFile) return;
    
    setIsProcessing(true);
    console.log('Demo transformation starting...');
    
    // Simulate realistic processing time
    setTimeout(() => {
      const mockTransformedContent = generateDemoTransformation();
      setTransformedContent(mockTransformedContent);
      setIsProcessing(false);
      
      // Save transformation to localStorage for demo
      localStorage.setItem('demo_last_transformation', mockTransformedContent);
      localStorage.setItem('demo_transform_timestamp', new Date().toISOString());
    }, 2500);
  };

  const handleExport = (format: 'pdf' | 'word' | 'text') => {
    console.log(`Demo export as ${format}:`, transformedContent);
    const element = document.createElement('a');
    const file = new Blob([transformedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `recovery-compass-impact-summary.${format === 'word' ? 'docx' : 'txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // Track demo export
    localStorage.setItem('demo_last_export', format);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-slate-900 to-navy p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-gold rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-navy">RC</span>
            </div>
            <h1 className="text-bronze text-2xl sm:text-3xl lg:text-4xl font-light tracking-widest font-montserrat">
              IMPACT TRANSLATOR
            </h1>
          </div>
          <p className="text-moonlight/90 text-sm sm:text-base italic max-w-2xl mx-auto">
            Transforming authentic stories into funder language while preserving their sacred essence
          </p>
          <div className="mt-4 text-xs text-teal/70 italic">
            Demo Mode: Advanced AI-powered transformation engine
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Enhanced Input Section */}
          <div className="space-y-6">
            {/* Story Collection with Enhanced UI */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-teal/30 p-6 sm:p-8 transition-all duration-500 hover:border-teal/50 hover:bg-slate-800/60 hover:shadow-2xl">
                <h2 className="text-bronze text-lg sm:text-xl mb-4 font-montserrat flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-gold" />
                  Share Your Authentic Story
                </h2>
                <p className="text-moonlight/80 mb-6 italic text-sm sm:text-base">
                  Tell us about the real impact in your own words—we'll handle the translation...
                </p>
                <Textarea 
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full bg-slate-700/50 border border-teal/30 rounded-xl p-4 text-moonlight placeholder-slate-400 h-40 min-h-[120px] text-base focus:border-bronze/50 focus:outline-none transition-all duration-300 resize-none focus:ring-2 focus:ring-bronze/20"
                  placeholder="Example: 'Last month, Marcus came to us after three failed shelter placements. Traditional programs rushed him into housing before addressing his PTSD and substance use. We gave him 42 days to rebuild trust, work through trauma, and develop sustainable coping strategies. Today, Marcus has his own apartment and volunteers here weekly—not because he has to, but because he wants to give back.'"
                />
                {story && (
                  <div className="flex items-center gap-2 mt-3">
                    <CheckCircle className="w-4 h-4 text-teal" />
                    <p className="text-teal text-sm italic">Story received and ready for transformation</p>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Data Upload */}
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-teal/30 p-6 sm:p-8 transition-all duration-500 hover:border-teal/50 hover:bg-slate-800/60">
                <h2 className="text-bronze text-lg sm:text-xl mb-4 font-montserrat flex items-center gap-3">
                  <Upload className="w-6 h-6 text-gold" />
                  Upload Supporting Data
                </h2>
                <p className="text-moonlight/80 mb-6 italic text-sm sm:text-base">
                  Any format works—CSV, Excel, PDFs, even handwritten notes
                </p>
                
                {!uploadedFile ? (
                  <div className="border-2 border-dashed border-teal/30 rounded-xl p-8 min-h-[140px] text-center transition-all duration-300 hover:border-teal/50 hover:bg-slate-700/20">
                    <input 
                      type="file" 
                      className="hidden" 
                      id="dataUpload"
                      onChange={handleFileUpload}
                      accept="*/*"
                    />
                    <label htmlFor="dataUpload" className="cursor-pointer">
                      <FileText className="w-10 h-10 text-teal mx-auto mb-3" />
                      <p className="text-moonlight/80 text-base mb-2">Drop files here or click to browse</p>
                      <p className="text-moonlight/50 text-sm">Supports all formats • Secure processing</p>
                    </label>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-teal/10 to-bronze/10 rounded-xl p-6 text-center border border-teal/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-teal" />
                      <FileText className="w-6 h-6 text-bronze" />
                    </div>
                    <p className="text-moonlight/80 mb-2 text-base">File uploaded successfully:</p>
                    <p className="text-teal font-medium text-base">{uploadedFile.name}</p>
                    <button 
                      onClick={() => setUploadedFile(null)}
                      className="text-moonlight/60 text-sm mt-3 hover:text-moonlight/80 transition-colors duration-300 underline"
                    >
                      Upload different file
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Transform Button */}
            <div className="text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <Button 
                onClick={handleTransform}
                disabled={(!story && !uploadedFile) || isProcessing}
                className={cn(
                  "px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform text-lg min-h-[56px]",
                  "bg-gradient-to-r from-teal to-gold hover:from-gold hover:to-teal",
                  "text-navy hover:scale-105 shadow-lg hover:shadow-2xl",
                  ((!story && !uploadedFile) || isProcessing) && "opacity-50 cursor-not-allowed hover:scale-100"
                )}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-navy"></div>
                    AI Transformation in Progress...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    Transform Into Funder Language
                  </div>
                )}
              </Button>
              <p className="text-moonlight/60 text-sm mt-4 italic max-w-md mx-auto">
                Advanced AI preserves your story's essence while optimizing for grant success
              </p>
            </div>
          </div>

          {/* Enhanced Output Section */}
          <div className="space-y-6">
            {transformedContent ? (
              <>
                {/* Enhanced Transformed Content Display */}
                <div className="animate-fade-in">
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl border border-bronze/30 p-6 sm:p-8 shadow-2xl">
                    <h2 className="text-bronze text-lg sm:text-xl mb-6 font-montserrat flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-gold" />
                      Grant-Ready Content
                    </h2>
                    <div className="bg-slate-700/30 rounded-xl p-6 max-h-96 overflow-y-auto border border-bronze/20">
                      <div className="text-moonlight/90 text-sm whitespace-pre-wrap font-montserrat leading-relaxed">
                        {transformedContent}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-teal">
                      <CheckCircle className="w-4 h-4" />
                      Transformation complete • Ready for stakeholder presentation
                    </div>
                  </div>
                </div>

                {/* Enhanced Export Options */}
                <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-teal/30 p-6 sm:p-8">
                    <h2 className="text-bronze text-lg sm:text-xl mb-6 font-montserrat flex items-center gap-3">
                      <Download className="w-6 h-6 text-gold" />
                      Professional Export Options
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button
                        onClick={() => handleExport('pdf')}
                        variant="outline"
                        className="border-teal/40 text-teal hover:bg-teal/10 hover:border-teal/60 min-h-[48px] rounded-xl"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button
                        onClick={() => handleExport('word')}
                        variant="outline"
                        className="border-teal/40 text-teal hover:bg-teal/10 hover:border-teal/60 min-h-[48px] rounded-xl"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export Word
                      </Button>
                      <Button
                        onClick={() => handleExport('text')}
                        variant="outline"
                        className="border-teal/40 text-teal hover:bg-teal/10 hover:border-teal/60 min-h-[48px] rounded-xl"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export Text
                      </Button>
                    </div>
                    <p className="text-moonlight/60 text-sm mt-6 italic text-center">
                      Professional formatting optimized for Anthony & Donna presentations
                    </p>
                  </div>
                </div>
              </>
            ) : (
              /* Enhanced Placeholder */
              <div className="animate-fade-in">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-8 text-center min-h-[400px] flex flex-col justify-center">
                  <div className="text-moonlight/40 mb-6">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-teal/20 to-gold/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-12 h-12 opacity-50" />
                    </div>
                    <p className="text-xl font-montserrat mb-3">AI Transformation Engine Ready</p>
                    <p className="text-base italic">Share your authentic story to begin the professional transformation</p>
                  </div>
                  <div className="text-xs text-moonlight/30 italic">
                    Demo system • Instant processing • Enterprise-grade results
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Footer Branding */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal to-gold text-navy rounded-xl shadow-lg">
            <div className="w-8 h-8 bg-navy/20 rounded-lg flex items-center justify-center mr-3">
              <span className="font-bold text-sm">RC</span>
            </div>
            <span className="font-semibold">Recovery Compass Impact Intelligence</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactTranslator;
