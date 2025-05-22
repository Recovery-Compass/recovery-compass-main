
import { cn } from '@/lib/utils';
import PathwayQuote from './PathwayQuote';

const EnvironmentalDesign = () => {
  return (
    <div className="content-container">
      <h2 className="section-heading">Environmental Response Design</h2>
      <p className="section-subheading">
        How optimizing your surroundings transforms life outcomes
      </p>
      
      <PathwayQuote className="mb-16 mt-8">
        <p className="mb-6">Symptom management is an epidemic. We freeze people in their worst moment and call that the problem. But what if it's not 1 problem — what if it's 33?</p>
        <p>When you give 100% of your effort to 5% of the problem, you get 5% of the result — every hour, every day.</p>
      </PathwayQuote>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        <div className="space-y-4">
          <h3 className="text-2xl font-playfair text-bronze">Environment First</h3>
          <p className="text-moonlight/80 leading-relaxed">
            Rather than focusing on individual change alone, we recognize that transforming your 
            environment creates the foundation for sustainable growth. The surroundings we inhabit 
            shape our choices, thoughts, and possibilities far more than willpower alone.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-playfair text-bronze">Autonomy & Agency</h3>
          <p className="text-moonlight/80 leading-relaxed">
            Every person has their own unique life experience and context. Environmental 
            Response Design respects your autonomy to determine what changes will best support 
            your journey, without imposing standardized solutions or labels.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-playfair text-bronze">Sensory Optimization</h3>
          <p className="text-moonlight/80 leading-relaxed">
            Our physical spaces speak to us through all five senses. By deliberately crafting 
            environments that communicate safety, possibility, and connection, we create the 
            conditions for transformation without relying on willpower alone.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-playfair text-bronze">Connection Through Design</h3>
          <p className="text-moonlight/80 leading-relaxed">
            The opposite of addiction isn't sobriety—it's connection. Environmental design that 
            fosters meaningful relationships and a sense of belonging creates the foundation for 
            lasting transformation, regardless of where you are in your journey.
          </p>
        </div>
      </div>
      
      <div className="mt-16 p-8 border border-bronze/30 rounded-lg bg-navy/50">
        <p className="text-center text-moonlight/90 italic">
          "When we change the environment first, we create the conditions where people can reconnect 
          with their authentic selves and find their own path forward."
        </p>
      </div>
    </div>
  );
};

export default EnvironmentalDesign;
