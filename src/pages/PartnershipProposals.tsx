
import React from 'react';
import PartnershipHero from '@/components/partnership/PartnershipHero';
import PartnershipOverview from '@/components/partnership/PartnershipOverview';
import SCLMethodology from '@/components/partnership/SCLMethodology';
import ImplementationTimeline from '@/components/partnership/ImplementationTimeline';
import PartnershipBenefits from '@/components/partnership/PartnershipBenefits';
import TermsInvestment from '@/components/partnership/TermsInvestment';
import ContactCTA from '@/components/partnership/ContactCTA';

const PartnershipProposals = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#101534] to-[#045295] text-white">
      <PartnershipHero />
      <PartnershipOverview />
      <SCLMethodology />
      <ImplementationTimeline />
      <PartnershipBenefits />
      <TermsInvestment />
      <ContactCTA />
    </div>
  );
};

export default PartnershipProposals;
