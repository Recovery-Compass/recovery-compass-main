import React, { useState } from 'react';
import { BreathSync } from '@/components/individual/BreathSync';
import { Card } from '@/components/ui/card';

export const TestBreathSync = () => {
  const [showBreathSync, setShowBreathSync] = useState(true);
  const [pattern, setPattern] = useState<'4-7-8' | 'box' | 'coherent'>('4-7-8');
  const [key, setKey] = useState(0);

  const restart = () => {
    setKey(prev => prev + 1);
    setShowBreathSync(true);
  };

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center p-4">
      <h1 className="text-gold text-3xl font-heading mb-8">BreathSync Test Page</h1>
      
      <div className="mb-4 flex gap-4">
        <button 
          onClick={() => setPattern('4-7-8')}
          className={`px-4 py-2 rounded ${pattern === '4-7-8' ? 'bg-gold text-navy' : 'bg-bronze/20 text-moonlight'}`}
        >
          4-7-8 Pattern
        </button>
        <button 
          onClick={() => setPattern('box')}
          className={`px-4 py-2 rounded ${pattern === 'box' ? 'bg-gold text-navy' : 'bg-bronze/20 text-moonlight'}`}
        >
          Box Breathing
        </button>
        <button 
          onClick={() => setPattern('coherent')}
          className={`px-4 py-2 rounded ${pattern === 'coherent' ? 'bg-gold text-navy' : 'bg-bronze/20 text-moonlight'}`}
        >
          Coherent
        </button>
      </div>
      
      <button 
        onClick={restart}
        className="mb-4 px-4 py-2 bg-bronze text-white rounded hover:bg-bronze/80"
      >
        Restart Animation
      </button>
      
      {showBreathSync && (
        <Card className="bg-navy/50 border border-bronze/30 p-12 rounded-lg max-w-2xl w-full">
          <BreathSync 
            key={key}
            pattern={pattern}
            duration={30}
            onComplete={() => {
              console.log('✅ BreathSync completed!');
              setShowBreathSync(false);
            }}
          />
        </Card>
      )}
      
      <div className="mt-8 text-moonlight/70 text-sm max-w-md text-center">
        <p>Check browser console for debug logs</p>
        <p className="mt-2">Press Space to pause/resume, Escape to skip</p>
      </div>
    </div>
  );
};