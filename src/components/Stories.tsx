
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Story {
  id: number;
  name: string;
  title: string;
  content: string;
}

const Stories = () => {
  const [activeStory, setActiveStory] = useState<number>(1);

  const stories: Story[] = [
    {
      id: 1,
      name: "Michael",
      title: "Finding North Again",
      content: "For years, I felt completely lost in my addiction, like I was wandering without direction. Recovery Compass provided something I hadn't experienced before—a sense that even when I couldn't see the path forward clearly, there were tools to help me find my way. The environmental approach made me realize how much my surroundings were influencing my recovery journey. Now, three years into sobriety, I've created spaces in my life that nurture rather than challenge my wellbeing."
    },
    {
      id: 2,
      name: "Sarah",
      title: "Roots and Wings",
      content: "Recovery for me has been about finding balance—being rooted enough to feel stable but free enough to grow. Through the Recovery Compass approach, I learned to create environments that supported this balance. The most powerful change was redesigning my living space to reflect the person I wanted to become, not the person I had been. That intentionality spread to other areas of my life—from the people I spend time with to the work I choose to do."
    },
    {
      id: 3,
      name: "David",
      title: "Navigating Through Darkness",
      content: "After losing my brother to addiction, I found myself needing to navigate through grief while supporting my own recovery. The Memorial Space created by Recovery Compass gave me somewhere to honor his memory that wasn't triggering for my sobriety. There's something powerful about having a place dedicated to remembrance that's designed with recovery in mind. It helped me integrate these two significant journeys in my life."
    }
  ];

  return (
    <div className="content-container">
      <h2 className="section-heading">Stories</h2>
      <p className="section-subheading">
        Authentic testimonials presented with dignity
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
        
        <div className="relative h-80">
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

export default Stories;
