
import React, { useState } from 'react';
import WFDSuiteHeader from './wfd-suite/WFDSuiteHeader';
import WFDSuiteNavigation from './wfd-suite/WFDSuiteNavigation';
import DashboardView from './wfd-suite/DashboardView';
import ImpactTranslatorView from './wfd-suite/ImpactTranslatorView';
import WorkflowMapView from './wfd-suite/WorkflowMapView';
import WFDSuiteFooter from './wfd-suite/WFDSuiteFooter';

const WFDAttachmentSuite = () => {
  const [activeAttachment, setActiveAttachment] = useState('dashboard');

  const renderActiveView = () => {
    switch (activeAttachment) {
      case 'dashboard':
        return <DashboardView />;
      case 'translator':
        return <ImpactTranslatorView />;
      case 'workflow':
        return <WorkflowMapView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WFDSuiteHeader />

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <WFDSuiteNavigation 
            activeAttachment={activeAttachment}
            onAttachmentChange={setActiveAttachment}
          />

          <div className="mb-8">
            {renderActiveView()}
          </div>

          <WFDSuiteFooter />
        </div>
      </div>
    </div>
  );
};

export default WFDAttachmentSuite;
