
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import EnvironmentalAssessment from '@/components/EnvironmentalAssessment';
import { trackEvent } from '@/lib/analytics';

const Assessment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Track assessment page visit
    trackEvent('assessment_started', {
      entry_point: 'direct',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div className="min-h-screen bg-navy">
      <Navigation />
      <div className="pt-20">
        <EnvironmentalAssessment />
      </div>
    </div>
  );
};

export default Assessment;
