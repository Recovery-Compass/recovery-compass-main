
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface DataOfferingProps {
  active: boolean;
  onZoneChange: () => void;
  onDataChange: (file: File | null) => void;
  presenceDepth: number;
}

const DataOffering = ({
  active,
  onZoneChange,
  onDataChange,
  presenceDepth
}: DataOfferingProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dwellTime, setDwellTime] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dwellTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reveal effect based on presence depth
  useEffect(() => {
    if (presenceDepth > 0.4 && !isRevealed) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [presenceDepth, isRevealed]);

  // Hover/dwell detection
  useEffect(() => {
    const startDwellTimer = () => {
      if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
      
      dwellTimerRef.current = setInterval(() => {
        setDwellTime(prev => prev + 100);
      }, 100);
    };
    
    const stopDwellTimer = () => {
      if (dwellTimerRef.current) {
        clearInterval(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', startDwellTimer);
      container.addEventListener('mouseleave', stopDwellTimer);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mouseenter', startDwellTimer);
        container.removeEventListener('mouseleave', stopDwellTimer);
      }
      stopDwellTimer();
    };
  }, []);

  // Activate zone when dwelled long enough
  useEffect(() => {
    if (dwellTime > 1800 && !active) {
      onZoneChange();
    }
  }, [dwellTime, active, onZoneChange]);

  // Notify parent component when file changes
  useEffect(() => {
    onDataChange(file);
  }, [file, onDataChange]);

  // Handle file drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    onZoneChange();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative transition-all duration-1500",
        isRevealed ? "opacity-100" : "opacity-0 translate-y-4",
      )}
    >
      <div 
        className={cn(
          "p-8 rounded-lg border relative overflow-hidden",
          "transition-all duration-700 ease-in-out",
          active ? "border-bronze/40" : "border-teal/10",
          isDragging && "border-bronze/60"
        )}
        onClick={() => {
          onZoneChange();
          if (!file) fileInputRef.current?.click();
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Textile-like background texture */}
        <div 
          className={cn(
            "absolute inset-0 opacity-20",
            "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMTQ4ZDhkMjAiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iI0Q0QUYzNzEwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')]"
          )}
        />
        
        {/* Ambient glow effect */}
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-1000 -z-10",
            "bg-gradient-to-b from-teal/5 to-transparent",
            active ? "opacity-100" : "opacity-0"
          )}
        />
        
        {/* Pulse indicator */}
        <div 
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6",
            "rounded-full bg-teal/30 transition-all duration-700",
            active ? "opacity-100 animate-gentle-pulse" : "opacity-0"
          )}
        />
        
        {/* Invisible file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="*/*"
        />
        
        {/* Content */}
        <div className="text-center">
          {!file ? (
            <div className="py-10">
              {/* Whisper text */}
              <div 
                className={cn(
                  "text-moonlight/60 font-montserrat font-light mb-6",
                  "transition-all duration-700",
                  active ? "opacity-70" : "opacity-30"
                )}
              >
                {isDragging 
                  ? "we'll receive whatever you bring" 
                  : active 
                    ? "place your data here" 
                    : "a field for your experience"}
              </div>
              
              {/* Visual element */}
              <div 
                className={cn(
                  "w-16 h-16 mx-auto rounded-full border",
                  "flex items-center justify-center",
                  "transition-all duration-700",
                  active ? "border-teal/40" : "border-teal/20",
                  isDragging && "border-bronze/40 scale-110"
                )}
              >
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full",
                    "transition-all duration-700",
                    active ? "bg-teal/30" : "bg-teal/10",
                    isDragging && "bg-bronze/30"
                  )}
                />
              </div>
              
              {/* Guiding whispers */}
              <div 
                className={cn(
                  "text-moonlight/40 font-montserrat font-light text-sm italic mt-6",
                  "transition-opacity duration-700",
                  active ? "opacity-100" : "opacity-0"
                )}
              >
                we'll figure it out together
              </div>
            </div>
          ) : (
            <div className="py-6">
              {/* File received state */}
              <div 
                className={cn(
                  "text-moonlight/70 font-montserrat mb-4",
                  "transition-all duration-700"
                )}
              >
                your offering is received
              </div>
              
              {/* File name */}
              <div 
                className={cn(
                  "text-bronze/80 font-montserrat text-lg",
                  "transition-all duration-700"
                )}
              >
                {file.name}
              </div>
              
              {/* Reset option */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className={cn(
                  "text-moonlight/40 font-montserrat font-light text-sm italic mt-4",
                  "hover:text-moonlight/60 transition-colors duration-300",
                  "border-none bg-transparent cursor-pointer"
                )}
              >
                release and begin again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataOffering;
