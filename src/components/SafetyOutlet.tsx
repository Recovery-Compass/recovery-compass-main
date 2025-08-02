import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, MessageCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import type { SafetyResource } from '@/types/assessment';

interface SafetyOutletProps {
  onBack?: () => void;
  isFooterMode?: boolean;
}

// Crisis resources data (would eventually come from Supabase)
const SAFETY_RESOURCES: SafetyResource[] = [
  {
    type: 'crisis',
    title: 'National Crisis Text Line',
    description: 'Free, 24/7 support via text for any crisis',
    contactMethod: 'Text HOME to 741741',
    available24_7: true,
    anonymous: true
  },
  {
    type: 'crisis',
    title: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential support 24/7',
    contactMethod: 'Call or text 988',
    available24_7: true,
    anonymous: true
  },
  {
    type: 'support',
    title: 'SAMHSA National Helpline',
    description: 'Mental health and substance abuse referrals',
    contactMethod: '1-800-662-4357',
    available24_7: true,
    anonymous: true
  },
  {
    type: 'support',
    title: 'LGBTQ+ National Hotline',
    description: 'Peer support and local resource referrals',
    contactMethod: '1-888-843-4564',
    available24_7: false,
    anonymous: true
  }
];

export const SafetyOutlet = ({ onBack, isFooterMode = false }: SafetyOutletProps) => {
  const [isExpanded, setIsExpanded] = useState(!isFooterMode);

  if (isFooterMode && !isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="text-moonlight/40 text-sm hover:text-moonlight/60 transition-colors duration-200 underline font-body"
      >
        Need immediate help?
      </button>
    );
  }

  const ResourceCard = ({ resource }: { resource: SafetyResource }) => (
    <Card className="bg-navy/30 border border-bronze/20 p-4 hover:border-bronze/40 transition-colors duration-200">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-body font-bold text-bronze text-sm leading-tight">
            {resource.title}
          </h3>
          {resource.available24_7 && (
            <span className="text-xs bg-bronze/20 text-bronze px-2 py-1 rounded font-body font-bold">
              24/7
            </span>
          )}
        </div>
        
        <p className="text-moonlight/80 text-sm font-body leading-relaxed">
          {resource.description}
        </p>
        
        <div className="flex items-center gap-2">
          {resource.type === 'crisis' ? (
            <Phone className="w-4 h-4 text-bronze" />
          ) : (
            <MessageCircle className="w-4 h-4 text-bronze" />
          )}
          <span className="text-moonlight font-body font-bold text-sm">
            {resource.contactMethod}
          </span>
        </div>
        
        {resource.anonymous && (
          <div className="text-xs text-moonlight/60 font-body">
            ✓ Anonymous and confidential
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className={`${isFooterMode ? 'fixed inset-0 bg-navy/95 backdrop-blur-sm z-50 flex items-center justify-center p-6' : 'min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-20'}`}>
      <div className="max-w-2xl w-full">
        {onBack && (
          <div className="mb-6 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={isFooterMode ? () => setIsExpanded(false) : onBack}
              className="text-moonlight hover:text-bronze hover:bg-bronze/10 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {isFooterMode ? 'Close' : 'Back'}
            </Button>
          </div>
        )}

        <Card className="bg-navy/50 border border-bronze/30 p-8 rounded-lg">
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h1 className="font-heading text-2xl text-bronze leading-tight">
                Support Resources
              </h1>
              <p className="text-moonlight/80 font-body leading-relaxed">
                You don't have to navigate this alone. These resources provide immediate, confidential support.
              </p>
            </div>

            <div className="grid gap-4">
              {SAFETY_RESOURCES.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>

            <div className="border-t border-bronze/20 pt-6">
              <div className="text-center space-y-3">
                <p className="text-moonlight/60 text-sm font-body">
                  If you're experiencing thoughts of self-harm or are in immediate danger, 
                  please contact emergency services or go to your nearest emergency room.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4 text-bronze" />
                  <a 
                    href="https://findtreatment.samhsa.gov/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-bronze text-sm font-body font-bold hover:text-bronze/80 transition-colors duration-200"
                  >
                    Find Local Treatment Options
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};