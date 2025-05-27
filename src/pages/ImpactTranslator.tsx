import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download, Sparkles, Upload } from 'lucide-react';

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
      // Process file content (placeholder for now)
      processFileContent(file);
    }
  };

  const processFileContent = async (file: File) => {
    console.log('Processing file:', file.name);
    // Placeholder for file processing logic
    // In real implementation, this would parse CSV, Excel, PDF, etc.
  };

  const handleContextChange = (field: string, value: string) => {
    setContext(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTransform = async () => {
    if (!story && !uploadedFile) return;
    
    setIsProcessing(true);
    console.log('Story:', story);
    console.log('File:', uploadedFile);
    console.log('Context:', context);
    
    // Simulate transformation process
    setTimeout(() => {
      const mockTransformedContent = generateMockTransformation();
      setTransformedContent(mockTransformedContent);
      setIsProcessing(false);
    }, 3000);
  };

  const generateMockTransformation = () => {
    return `# Impact Summary

## Program Overview
${context.approach || 'Our innovative approach'} has served ${context.whoServed || 'community members'} with measurable outcomes.

## Key Metrics
- Success measured by: ${context.successMeasure || 'participant outcomes'}
- Unique value proposition: ${context.uniqueAspect || 'community-centered design'}

## Story Integration
${story || 'Program narratives demonstrate significant positive impact on participants and community stakeholders.'}

## Funding Alignment
This program demonstrates clear ROI through participant outcomes and community engagement metrics that align with funder priorities around sustainable impact and evidence-based practice.`;
  };

  const handleExport = (format: 'pdf' | 'word' | 'text') => {
    console.log(`Exporting as ${format}:`, transformedContent);
    // Placeholder for export functionality
    const element = document.createElement('a');
    const file = new Blob([transformedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `impact-summary.${format === 'word' ? 'docx' : 'txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-slate-900 to-navy p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <h1 className="text-bronze text-2xl sm:text-3xl lg:text-4xl font-light tracking-widest font-montserrat mb-2 sm:mb-4">
            IMPACT TRANSLATOR
          </h1>
          <p className="text-moonlight/90 text-sm sm:text-base italic">
            transforming stories into funder language while preserving their soul
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Story Collection */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-teal/30 p-6 sm:p-8 transition-all duration-500 hover:border-teal/50 hover:bg-slate-800/50">
                <h2 className="text-bronze text-lg sm:text-xl mb-2 sm:mb-4 font-montserrat flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Share Your Story
                </h2>
                <p className="text-moonlight/80 mb-4 sm:mb-6 italic text-sm sm:text-base">
                  Tell us about the impact in your own words...
                </p>
                <Textarea 
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full bg-slate-700/50 border border-teal/30 rounded-lg p-3 sm:p-4 text-moonlight placeholder-slate-400 h-32 sm:h-40 min-h-[80px] text-base focus:border-bronze/50 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Describe a moment when your program made a real difference..."
                />
                {story && (
                  <p className="text-teal text-sm mt-2 italic opacity-70">
                    your story is being received...
                  </p>
                )}
              </div>
            </div>

            {/* Data Upload */}
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-teal/30 p-6 sm:p-8 transition-all duration-500 hover:border-teal/50 hover:bg-slate-800/50">
                <h2 className="text-bronze text-lg sm:text-xl mb-2 sm:mb-4 font-montserrat flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Your Data
                </h2>
                <p className="text-moonlight/80 mb-4 sm:mb-6 italic text-sm sm:text-base">
                  Any format works - we'll figure it out together
                </p>
                
                {!uploadedFile ? (
                  <div className="border-2 border-dashed border-teal/30 rounded-lg p-6 sm:p-8 min-h-[120px] text-center transition-colors duration-300 hover:border-teal/50">
                    <input 
                      type="file" 
                      className="hidden" 
                      id="dataUpload"
                      onChange={handleFileUpload}
                      accept="*/*"
                    />
                    <label htmlFor="dataUpload" className="cursor-pointer">
                      <FileText className="w-8 h-8 text-teal mx-auto mb-2" />
                      <p className="text-moonlight/80 text-sm sm:text-base">Drop files here or click to browse</p>
                      <p className="text-moonlight/50 text-xs sm:text-sm mt-2">CSV, Excel, Google Sheets, PDFs, even handwritten notes</p>
                    </label>
                  </div>
                ) : (
                  <div className="bg-slate-700/30 rounded-lg p-4 sm:p-6 min-h-[120px] text-center">
                    <FileText className="w-6 h-6 text-bronze mx-auto mb-2" />
                    <p className="text-moonlight/80 mb-2 text-sm sm:text-base">File received:</p>
                    <p className="text-teal font-medium text-sm sm:text-base">{uploadedFile.name}</p>
                    <button 
                      onClick={() => setUploadedFile(null)}
                      className="text-moonlight/60 text-xs sm:text-sm mt-2 hover:text-moonlight/80 transition-colors duration-300 min-h-[44px] px-4 py-2"
                    >
                      release and choose another
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Context Building */}
            <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-teal/30 p-6 sm:p-8 transition-all duration-500 hover:border-teal/50 hover:bg-slate-800/50">
                <h2 className="text-bronze text-lg sm:text-xl mb-2 sm:mb-4 font-montserrat">Program Context</h2>
                <p className="text-moonlight/80 mb-4 sm:mb-6 italic text-sm sm:text-base">
                  Help us understand your work environment
                </p>
                <div className="space-y-4">
                  <Input 
                    value={context.whoServed}
                    onChange={(e) => handleContextChange('whoServed', e.target.value)}
                    className="w-full bg-slate-700/50 border border-teal/30 rounded-lg p-3 text-moonlight text-base placeholder-moonlight/40 min-h-[44px] focus:border-bronze/50 focus:outline-none transition-colors duration-300"
                    placeholder="Who do you serve?"
                  />
                  <Input 
                    value={context.approach}
                    onChange={(e) => handleContextChange('approach', e.target.value)}
                    className="w-full bg-slate-700/50 border border-teal/30 rounded-lg p-3 text-moonlight text-base placeholder-moonlight/40 min-h-[44px] focus:border-bronze/50 focus:outline-none transition-colors duration-300"
                    placeholder="What's your main approach to helping them?"
                  />
                  <Input 
                    value={context.successMeasure}
                    onChange={(e) => handleContextChange('successMeasure', e.target.value)}
                    className="w-full bg-slate-700/50 border border-teal/30 rounded-lg p-3 text-moonlight text-base placeholder-moonlight/40 min-h-[44px] focus:border-bronze/50 focus:outline-none transition-colors duration-300"
                    placeholder="How do you measure success in your work?"
                  />
                  <Input 
                    value={context.uniqueAspect}
                    onChange={(e) => handleContextChange('uniqueAspect', e.target.value)}
                    className="w-full bg-slate-700/50 border border-teal/30 rounded-lg p-3 text-moonlight text-base placeholder-moonlight/40 min-h-[44px] focus:border-bronze/50 focus:outline-none transition-colors duration-300"
                    placeholder="What makes your work unique or different?"
                  />
                </div>
              </div>
            </div>

            {/* Transform Button */}
            <div className="text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <Button 
                onClick={handleTransform}
                disabled={(!story && !uploadedFile) || isProcessing}
                className={cn(
                  "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform min-h-[44px]",
                  "bg-gradient-to-r from-bronze to-teal hover:from-teal hover:to-bronze",
                  "text-navy hover:scale-105 text-base sm:text-lg",
                  ((!story && !uploadedFile) || isProcessing) && "opacity-50 cursor-not-allowed hover:scale-100"
                )}
              >
                {isProcessing ? 'Transforming...' : 'Transform Into Funder Language'}
              </Button>
              <p className="text-moonlight/60 text-xs sm:text-sm mt-4 italic">
                We'll preserve your story's soul while making it shine for funders
              </p>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {transformedContent ? (
              <>
                {/* Transformed Content Display */}
                <div className="animate-fade-in">
                  <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-bronze/30 p-6 sm:p-8">
                    <h2 className="text-bronze text-lg sm:text-xl mb-4 font-montserrat flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Transformed Content
                    </h2>
                    <div className="bg-slate-700/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="text-moonlight/90 text-sm whitespace-pre-wrap font-montserrat leading-relaxed">
                        {transformedContent}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Export Options */}
                <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-teal/30 p-6 sm:p-8">
                    <h2 className="text-bronze text-lg sm:text-xl mb-4 font-montserrat flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Export Options
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button
                        onClick={() => handleExport('pdf')}
                        variant="outline"
                        className="border-teal/30 text-teal hover:bg-teal/10 min-h-[44px]"
                      >
                        Export as PDF
                      </Button>
                      <Button
                        onClick={() => handleExport('word')}
                        variant="outline"
                        className="border-teal/30 text-teal hover:bg-teal/10 min-h-[44px]"
                      >
                        Export as Word
                      </Button>
                      <Button
                        onClick={() => handleExport('text')}
                        variant="outline"
                        className="border-teal/30 text-teal hover:bg-teal/10 min-h-[44px]"
                      >
                        Export as Text
                      </Button>
                    </div>
                    <p className="text-moonlight/60 text-xs sm:text-sm mt-4 italic text-center">
                      Ready for grant applications and stakeholder reports
                    </p>
                  </div>
                </div>
              </>
            ) : (
              /* Placeholder for Output */
              <div className="animate-fade-in">
                <div className="bg-slate-800/20 backdrop-blur-sm rounded-xl border border-slate-600/30 p-6 sm:p-8 text-center">
                  <div className="text-moonlight/40 mb-4">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-montserrat">Your transformed content will appear here</p>
                    <p className="text-sm italic mt-2">Share your story to begin the transformation</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactTranslator;
