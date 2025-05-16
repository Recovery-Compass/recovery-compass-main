
import { cn } from '@/lib/utils';

const OurApproach = () => {
  return (
    <div className="content-container">
      <h2 className="section-heading">Our Approach</h2>
      <p className="section-subheading">
        How environmental design transforms recovery journeys
      </p>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        <div className="space-y-4">
          <h3 className="text-2xl font-playfair text-bronze">Guided Navigation</h3>
          <p className="text-moonlight/80 leading-relaxed">
            Like a compass that provides direction in uncertain terrain, our approach offers clear guidance 
            while honoring the individual nature of each recovery journey. We believe in providing the tools 
            for navigation rather than prescribing a single path.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-playfair text-bronze">Rooted Connection</h3>
          <p className="text-moonlight/80 leading-relaxed">
            Just as the tree in our compass has deep roots that provide stability, we believe recovery 
            is strengthened through meaningful connections to community, purpose, and inner strength. 
            These roots provide the foundation for lasting transformation.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-playfair text-bronze">Cyclical Growth</h3>
          <p className="text-moonlight/80 leading-relaxed">
            Recovery isn't linear—it follows natural cycles like the waxing and waning of the moon. 
            Our approach acknowledges these ebbs and flows, celebrating progress while providing 
            support during challenging phases of the journey.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-playfair text-bronze">Transformative Light</h3>
          <p className="text-moonlight/80 leading-relaxed">
            The illumination in our compass symbolizes the hope and clarity that come through recovery. 
            We create environments that foster moments of insight and revelation, turning challenges 
            into opportunities for profound personal growth.
          </p>
        </div>
      </div>
      
      <div className="mt-16 p-8 border border-bronze/30 rounded-lg bg-navy/50">
        <p className="text-center text-moonlight/90 italic">
          "The compass doesn't just show us where we are—it reveals where we might go.
          <br />In recovery, this vision of possibility is everything."
        </p>
      </div>
    </div>
  );
};

export default OurApproach;
