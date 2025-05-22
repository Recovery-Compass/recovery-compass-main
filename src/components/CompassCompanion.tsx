
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import PathwayQuote from './PathwayQuote';

const CompassCompanion = () => {
  return (
    <div className="content-container">
      <h2 className="section-heading">The Compass Companion</h2>
      <p className="section-subheading">
        Self-directed assessment and personalized environmental optimization
      </p>
      
      <PathwayQuote className="mb-16 mt-8">
        <p className="mb-6">Symptom management is an epidemic. We freeze people in their worst moment and call that the problem. But what if it's not 1 problem — what if it's 33?</p>
        <p>When you give 100% of your effort to 5% of the problem, you get 5% of the result — every hour, every day.</p>
      </PathwayQuote>
      
      <div className="mt-12 flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/2 space-y-6">
          <p className="text-moonlight/90 leading-relaxed">
            The Compass Companion is a personalized assessment approach that helps you identify 
            how your current environment may be influencing your well-being and choices. Unlike 
            traditional assessments focused on diagnosis and deficiency, the Compass Companion 
            emphasizes environmental factors you can transform.
          </p>
          
          <p className="text-moonlight/80 leading-relaxed">
            This self-directed tool maps the physical, digital, social, and sensory aspects of your 
            environment to reveal opportunities for meaningful change. It respects your autonomy to 
            determine what transformation means for you, without imposing external definitions of success.
          </p>
          
          <div className="pt-4">
            <Button className="bg-bronze/20 border border-bronze/50 text-bronze hover:bg-bronze/30 transition-colors duration-300">
              Coming Soon: Access the Companion
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 border border-bronze/30 rounded-lg p-8 bg-navy/50">
          <h3 className="text-xl font-playfair text-bronze mb-6">The Compass Companion Maps:</h3>
          
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-bronze/20 flex items-center justify-center">
                <span className="text-bronze">01</span>
              </div>
              <div>
                <h4 className="text-lg font-playfair text-bronze/90">Physical Spaces</h4>
                <p className="text-moonlight/80 mt-1">How your home, workplace, and community spaces impact your well-being</p>
              </div>
            </li>
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-bronze/20 flex items-center justify-center">
                <span className="text-bronze">02</span>
              </div>
              <div>
                <h4 className="text-lg font-playfair text-bronze/90">Digital Environment</h4>
                <p className="text-moonlight/80 mt-1">How your online spaces, media consumption, and technology use shape your thoughts</p>
              </div>
            </li>
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-bronze/20 flex items-center justify-center">
                <span className="text-bronze">03</span>
              </div>
              <div>
                <h4 className="text-lg font-playfair text-bronze/90">Social Context</h4>
                <p className="text-moonlight/80 mt-1">How your relationships and community connections influence your choices</p>
              </div>
            </li>
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-bronze/20 flex items-center justify-center">
                <span className="text-bronze">04</span>
              </div>
              <div>
                <h4 className="text-lg font-playfair text-bronze/90">Sensory Elements</h4>
                <p className="text-moonlight/80 mt-1">How light, sound, texture, scent and other sensory inputs affect your state of mind</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompassCompanion;
