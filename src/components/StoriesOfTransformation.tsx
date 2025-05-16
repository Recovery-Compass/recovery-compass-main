
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Story {
  id: number;
  name: string;
  title: string;
  content: string;
}

const StoriesOfTransformation = () => {
  const [activeStory, setActiveStory] = useState<number>(1);

  const stories: Story[] = [
    {
      id: 1,
      name: "Michael",
      title: "Redefining My Environment",
      content: "I spent years trying to change myself, always feeling like I was the problem. Working with Recovery Compass helped me see that my environment was working against me. By redesigning my living space to support calm and creativity, setting boundaries with technology, and creating intentional community connections, I discovered that transformation doesn't require fighting against myself—it comes from aligning my surroundings with who I truly am."
    },
    {
      id: 2,
      name: "Sarah",
      title: "Beyond Labels, Toward Life",
      content: "After cycling through various programs that tried to label and categorize me, I felt more disconnected from myself than ever. What made the difference was focusing on my environment first. With guidance from the Compass Companion, I identified how my physical spaces, digital habits, and social contexts were reinforcing patterns that didn't serve me. Once I transformed these external factors, internal change followed naturally—without sacrificing my identity."
    },
    {
      id: 3,
      name: "David",
      title: "Creating Conditions for Healing",
      content: "After losing my brother, I needed to navigate through grief while supporting my own wellbeing. Rather than focusing solely on processing my emotions, I deliberately transformed my environment to support healing. I redesigned spaces to honor his memory while supporting my present needs, curated media that fostered connection rather than escape, and established rhythms that anchored me during uncertainty. This environmental approach created the foundation that made everything else possible."
    }
  ];

  return (
    <div className="content-container">
      <h2 className="section-heading">Stories of Transformation</h2>
      <p className="section-subheading">
        Authentic experiences of environmental change
      </p>
      
      <div className="mt-12 flex flex-col space-y-8">
        <div className="flex justify-center space-x-4">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => setActiveStory(story.id)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                activeStory === story.id
                  ? 'bg-bronze w-6'
                  : 'bg-moonlight/30 hover:bg-moonlight/50'
              )}
              aria-label={`View ${story.name}'s story`}
            />
          ))}
        </div>
        
        <div className="relative h-[28rem]">
          {stories.map((story) => (
            <div
              key={story.id}
              className={cn(
                'absolute inset-0 transition-all duration-700 flex flex-col',
                'p-8 border border-bronze/30 rounded-lg bg-navy/50',
                activeStory === story.id
                  ? 'opacity-100 transform-none'
                  : 'opacity-0 translate-x-8'
              )}
            >
              <h3 className="text-2xl font-playfair text-bronze mb-2">{story.title}</h3>
              <p className="text-moonlight/70 mb-6">— {story.name}</p>
              <p className="text-moonlight/90 leading-relaxed italic">"{story.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoriesOfTransformation;
