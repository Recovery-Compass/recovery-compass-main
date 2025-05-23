
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-amber-400 text-4xl font-light tracking-widest font-montserrat mb-4">
            IMPACT TRANSLATOR
          </h1>
          <p className="text-slate-300 text-lg italic">
            transforming stories into funder language while preserving their soul
          </p>
        </div>

        {/* Story Collection Section */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-teal-500/30 p-8 transition-all duration-500 hover:border-teal-500/50 hover:bg-slate-800/50">
            <h2 className="text-amber-400 text-xl mb-4 font-montserrat">Share Your Story</h2>
            <p className="text-slate-300 mb-6 italic">Tell us about the impact in your own words...</p>
            <textarea 
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full bg-slate-700/50 border border-teal-500/30 rounded-lg p-4 text-white placeholder-slate-400 h-32 focus:border-amber-400/50 focus:outline-none transition-colors duration-300 resize-none"
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
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-teal-500/30 p-8 transition-all duration-500 hover:border-teal-500/50 hover:bg-slate-800/50">
            <h2 className="text-amber-400 text-xl mb-4 font-montserrat">Upload Your Data</h2>
            <p className="text-slate-300 mb-6 italic">Any format works - we'll figure it out together</p>
            
            {!uploadedFile ? (
              <div className="border-2 border-dashed border-teal-500/30 rounded-lg p-8 text-center transition-colors duration-300 hover:border-teal-500/50">
                <input 
                  type="file" 
                  className="hidden" 
                  id="dataUpload"
                  onChange={handleFileUpload}
                  accept="*/*"
                />
                <label htmlFor="dataUpload" className="cursor-pointer">
                  <div className="text-teal-400 mb-2 text-3xl">📊</div>
                  <p className="text-slate-300">Drop files here or click to browse</p>
                  <p className="text-slate-500 text-sm mt-2">CSV, Excel, Google Sheets, PDFs, even handwritten notes</p>
                </label>
              </div>
            ) : (
              <div className="bg-slate-700/30 rounded-lg p-6 text-center">
                <div className="text-amber-400 mb-2 text-2xl">✓</div>
                <p className="text-slate-300 mb-2">File received:</p>
                <p className="text-teal-400 font-medium">{uploadedFile.name}</p>
                <button 
                  onClick={() => setUploadedFile(null)}
                  className="text-slate-400 text-sm mt-2 hover:text-slate-300 transition-colors duration-300"
                >
                  release and choose another
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Context Building Section */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-teal-500/30 p-8 transition-all duration-500 hover:border-teal-500/50 hover:bg-slate-800/50">
            <h2 className="text-amber-400 text-xl mb-4 font-montserrat">Program Context</h2>
            <p className="text-slate-300 mb-6 italic">Help us understand your work environment</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                value={context.whoServed}
                onChange={(e) => handleContextChange('whoServed', e.target.value)}
                className="bg-slate-700/50 border border-teal-500/30 rounded-lg p-3 text-white placeholder-slate-400 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                placeholder="Who do you serve?"
              />
              <input 
                value={context.approach}
                onChange={(e) => handleContextChange('approach', e.target.value)}
                className="bg-slate-700/50 border border-teal-500/30 rounded-lg p-3 text-white placeholder-slate-400 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                placeholder="What's your main approach?"
              />
              <input 
                value={context.successMeasure}
                onChange={(e) => handleContextChange('successMeasure', e.target.value)}
                className="bg-slate-700/50 border border-teal-500/30 rounded-lg p-3 text-white placeholder-slate-400 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                placeholder="How do you measure success?"
              />
              <input 
                value={context.uniqueAspect}
                onChange={(e) => handleContextChange('uniqueAspect', e.target.value)}
                className="bg-slate-700/50 border border-teal-500/30 rounded-lg p-3 text-white placeholder-slate-400 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                placeholder="What makes your work unique?"
              />
            </div>
          </div>
        </div>

        {/* Bottom Action Section */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <button 
            onClick={handleTransform}
            disabled={!story && !uploadedFile}
            className={cn(
              "px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform",
              "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
              "text-slate-900 hover:scale-105",
              (!story && !uploadedFile) && "opacity-50 cursor-not-allowed hover:scale-100"
            )}
          >
            Transform Into Funder Language
          </button>
          <p className="text-slate-400 text-sm mt-4 italic">
            We'll preserve your story's soul while making it shine for funders
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactTranslator;
