
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Memorial = () => {
  const [tribute, setTribute] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to a backend
    // For now, we'll just simulate success
    setSubmitted(true);
    // Reset form after brief delay
    setTimeout(() => {
      setTribute('');
      setName('');
      setSubmitted(false);
    }, 3000);
  };
  
  const memorials = [
    { name: "Robert J.", tribute: "Your courage taught us all what strength truly means. Forever remembered." },
    { name: "Elizabeth M.", tribute: "The light you brought to our lives continues to guide us." },
    { name: "James T.", tribute: "Your story isn't over—it lives on in all the lives you touched." }
  ];
  
  return (
    <div className="content-container">
      <h2 className="section-heading">Memorial Space</h2>
      <p className="section-subheading">
        A dignified area for honoring loved ones lost to addiction
      </p>
      
      <div className="mt-12 text-center mb-12">
        <p className="text-moonlight/90 max-w-2xl mx-auto">
          This space is dedicated to honoring the memory of those whose journeys ended too soon.
          Their lives mattered, their struggles were valid, and their stories continue to inspire
          our mission.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {memorials.map((memorial, index) => (
          <div 
            key={index}
            className="flex flex-col items-center p-6 border border-bronze/30 rounded-lg bg-navy/50"
          >
            <div className="w-16 h-16 rounded-full bg-bronze/20 flex items-center justify-center mb-4">
              <span className="text-bronze text-2xl">✦</span>
            </div>
            <p className="text-moonlight/90 text-center italic mb-4">"{memorial.tribute}"</p>
            <p className="text-bronze">— {memorial.name}</p>
          </div>
        ))}
      </div>
      
      <div className="max-w-md mx-auto">
        <h3 className="font-playfair text-2xl text-bronze mb-6 text-center">Add a Tribute</h3>
        
        {submitted ? (
          <div className="text-center p-6 border border-teal/30 rounded-lg bg-teal/10 text-moonlight animate-fade-in">
            Your tribute has been received and will be added to our memorial space.
            <br />Thank you for honoring their memory.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-moonlight/80 text-sm">
                Their Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 bg-navy/50 border border-bronze/30 rounded-md text-moonlight/90 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze"
                placeholder="Name or initials"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tribute" className="block text-moonlight/80 text-sm">
                Your Tribute
              </label>
              <textarea
                id="tribute"
                value={tribute}
                onChange={(e) => setTribute(e.target.value)}
                required
                rows={4}
                className="w-full p-3 bg-navy/50 border border-bronze/30 rounded-md text-moonlight/90 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze resize-none"
                placeholder="Share your tribute (limit 200 characters)"
                maxLength={200}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-bronze/20 border border-bronze/50 text-bronze rounded-md hover:bg-bronze/30 transition-colors duration-300"
            >
              Submit Tribute
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Memorial;
