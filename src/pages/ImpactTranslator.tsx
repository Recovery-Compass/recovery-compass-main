
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ImpactTranslator = () => {
  const [story, setStory] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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
    }
  };

  const handleContextChange = (field: string, value: string) => {
    setContext(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTransform = () => {
    console.log('Story:', story);
    console.log('File:', uploadedFile);
    console.log('Context:', context);
    // Future: This will trigger Claude's transformation logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <h1 className="text-amber-400 text-2xl sm:text-3xl lg:text-4xl font-light tracking-widest font-montserrat mb-2 sm:mb-4">
            IMPACT TRANSLATOR
          </h1>
          <p className="text-slate-300 text-sm sm:text-base italic">
            transforming stories into funder language while preserving their soul
          </p>
        </div>

        {/* Story Collection Section */}
        <div className="mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-teal-500/30 p-6 sm:p-8 transition-all duration-500 hover:border-teal-500/50 hover:bg-slate-800/50">
            <h2 className="text-amber-400 text-lg sm:text-xl mb-2 sm:mb-4 font-montserrat">Share Your Story</h2>
            <p className="text-slate-300 mb-4 sm:mb-6 italic text-sm sm:text-base">Tell us about the impact in your own words...</p>
            <textarea 
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full bg-slate-700/50 border border-teal-500/30 rounded-lg p-3 sm:p-4 text-white placeholder-slate-400 h-24 sm:h-32 lg:h-40 min-h-[80px] text-base focus:border-amber-400/50 focus:outline-none transition-colors duration-300 resize-none"
              placeholder="Describe a moment when your program made a real difference..."
            />
            {story && (
              <p className="text-teal-400 text-sm mt-2 italic opacity-70">
                your story is being received...
              </p>
            )}
          </div>
        </div>

        {/* Data Upload Section */}
        <div className="mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-teal-500/30 p-6 sm:p-8 transition-all duration-500 hover:border-teal-500/50 hover:bg-slate-800/50">
            <h2 className="text-amber-400 text-lg sm:text-xl mb-2 sm:mb-4 font-montserrat">Upload Your Data</h2>
            <p className="text-slate-300 mb-4 sm:mb-6 italic text-sm sm:text-base">Any format works - we'll figure it out together</p>
            
            {!uploadedFile ? (
              <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-6 sm:p-8 min-h-[120px] text-center transition-colors duration-300 hover:border-teal-500/50">
                <input 
                  type="file" 
                  className="hidden" 
                  id="dataUpload"
                  onChange={handleFileUpload}
                  accept="*/*"
                />
                <label htmlFor="dataUpload" className="cursor-pointer">
                  <div className="text-teal-400 mb-2 text-2xl sm:text-3xl">📊</div>
                  <p className="text-slate-300 text-sm sm:text-base">Drop files here or click to browse</p>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2">CSV, Excel, Google Sheets, PDFs, even handwritten notes</p>
                </label>
              </div>
            ) : (
              <div className="bg-slate-700/30 rounded-lg p-4 sm:p-6 min-h-[120px] text-center">
                <div className="text-amber-400 mb-2 text-xl sm:text-2xl">✓</div>
                <p className="text-slate-300 mb-2 text-sm sm:text-base">File received:</p>
                <p className="text-teal-400 font-medium text-sm sm:text-base">{uploadedFile.name}</p>
                <button 
                  onClick={() => setUploadedFile(null)}
                  className="text-slate-400 text-xs sm:text-sm mt-2 hover:text-slate-300 transition-colors duration-300 min-h-[44px] px-4 py-2"
                >
                  release and choose another
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Context Building Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-teal-500/30 p-6 sm:p-8 transition-all duration-500 hover:border-teal-500/50 hover:bg-slate-800/50">
            <h2 className="text-amber-400 text-lg sm:text-xl mb-2 sm:mb-4 font-montserrat">Program Context</h2>
            <p className="text-slate-300 mb-4 sm:mb-6 italic text-sm sm:text-base">Help us understand your work environment</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                value={context.whoServed}
                onChange={(e) => handleContextChange('whoServed', e.target.value)}
                className="bg-slate-700/50 border border-teal-500/30 rounded-lg p-3 text-white text-base placeholder-slate-400 min-h-[44px] focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                placeholder="Who do you serve?"
              />
              <Input 
                value={context.approach}
                onChange={(e) => handleContextChange('approach', e.target.value)}
                className="bg-slate-700/50 border border-teal-500/30 rounded-lg p-3 text-white text-base placeholder-slate-400 min-h-[44px] focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                placeholder="What's your main approach?"
              />
              <Input 
                value={context.successMeasure}
                onChange={(e) => handleContextChange('successMeasure', e.target.value)}
                className="bg-slate-700/50 border border-teal-500/30 rounded-lg p-3 text-white text-base placeholder-slate-400 min-h-[44px] focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                placeholder="How do you measure success?"
              />
              <Input 
                value={context.uniqueAspect}
                onChange={(e) => handleContextChange('uniqueAspect', e.target.value)}
                className="bg-slate-700/50 border border-teal-500/30 rounded-lg p-3 text-white text-base placeholder-slate-400 min-h-[44px] focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                placeholder="What makes your work unique?"
              />
            </div>
          </div>
        </div>

        {/* Bottom Action Section */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <Button 
            onClick={handleTransform}
            disabled={!story && !uploadedFile}
            className={cn(
              "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform min-h-[44px]",
              "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
              "text-slate-900 hover:scale-105 text-base sm:text-lg",
              (!story && !uploadedFile) && "opacity-50 cursor-not-allowed hover:scale-100"
            )}
          >
            Transform Into Funder Language
          </Button>
          <p className="text-slate-400 text-xs sm:text-sm mt-4 italic">
            We'll preserve your story's soul while making it shine for funders
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactTranslator;
