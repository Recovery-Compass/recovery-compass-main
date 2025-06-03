
import React from 'react';

const WFDSuiteHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <img 
            src="/lovable-uploads/79be2f59-3fd4-403b-a86b-f6cf9a29d1e9.png" 
            alt="Whittier First Day Logo" 
            className="h-16 w-auto object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Strategic Intelligence Suite</h1>
            <p className="text-gray-600 text-sm">Data-driven insights for organizational excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WFDSuiteHeader;
