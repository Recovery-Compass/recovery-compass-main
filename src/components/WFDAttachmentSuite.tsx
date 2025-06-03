
import React, { useState } from 'react';
import { Download, Users, TrendingUp, BarChart3, FileText, Workflow, ArrowRight, Database, Settings } from 'lucide-react';

const WFDAttachmentSuite = () => {
  const [activeAttachment, setActiveAttachment] = useState('dashboard');

  const DashboardVisual = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">WFD Executive Dashboard</h2>
            <p className="text-gray-600">Role-customizable metrics for board, funder, and frontline use</p>
          </div>
          <div className="text-sm text-green-600 font-medium">
            Last Updated: June 2, 2025, 8:17 AM PST
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
          <div className="text-2xl font-bold text-purple-600">249</div>
          <div className="text-sm font-medium text-gray-700">Active Clients</div>
          <div className="text-xs text-green-600">+12% from last quarter</div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
          <div className="text-2xl font-bold text-blue-600">51.1%</div>
          <div className="text-sm font-medium text-gray-700">Housing Success Rate</div>
          <div className="text-xs text-gray-500">91 permanent placements</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
          <div className="text-2xl font-bold text-green-600">35.1</div>
          <div className="text-sm font-medium text-gray-700">Avg Engagement (days)</div>
          <div className="text-xs text-gray-500">Depth-over-speed model</div>
        </div>
        
        <div className="bg-teal-50 rounded-lg p-4 border-l-4 border-teal-600">
          <div className="text-2xl font-bold text-teal-600">196</div>
          <div className="text-sm font-medium text-gray-700">Clinical Contacts</div>
          <div className="text-xs text-gray-500">Integrated care model</div>
        </div>
      </div>

      {/* View Customization Demo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customizable Views</h3>
        <div className="flex space-x-4 mb-4">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
            BOARD VIEW
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
            FUNDER VIEW
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
            PROGRAM STAFF
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-700 italic">
            "Every number represents a life stabilized—evidence of reach, trust, and sustainable change through our depth-over-speed methodology."
          </div>
        </div>
      </div>

      {/* Multi-Site Preview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="font-semibold text-gray-900">Whittier First Day</div>
          <div className="text-sm text-gray-500 mb-2">(Main Campus)</div>
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            OPERATIONAL
          </span>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="font-semibold text-gray-900">Cora (Oscar)</div>
          <div className="text-sm text-gray-500 mb-2">Harm reduction focused</div>
          <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
            INTEGRATING
          </span>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="font-semibold text-gray-900">Ted's Place</div>
          <div className="text-sm text-gray-500 mb-2">Q4 2025 expansion</div>
          <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
            PLANNING
          </span>
        </div>
      </div>
    </div>
  );

  const ImpactTranslatorPreview = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Impact Translator</h2>
        <p className="text-gray-600">"You keep caring. We'll make sure your story gets funded."</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Input Side */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentic Story Input</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-700">
              "Last month, Marcus came to us after three failed shelter placements. Traditional programs rushed him into housing before addressing his PTSD and substance use. We gave him 42 days to rebuild trust, work through trauma, and develop sustainable coping strategies. Today, Marcus has his own apartment and volunteers here weekly—not because he has to, but because he wants to give back."
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Who do you serve?</label>
              <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">Adults experiencing homelessness with trauma histories</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What's your approach?</label>
              <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">Trauma-informed, depth-over-speed engagement model</div>
            </div>
          </div>
        </div>

        {/* Output Side */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grant-Ready Output</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-700">
              "Through a trauma-informed, relationship-based engagement model (average 35-day therapeutic intervention), WFD achieved a 51% permanent housing placement rate, exceeding national benchmarks for emergency intervention models. Marcus's case illustrates the effectiveness of sustained, individualized support—addressing root causes rather than symptoms—aligning with HUD's evidence-based practice requirements and SAMHSA's trauma-informed care standards."
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Evidence Integration:</span>
              <span className="text-sm text-green-600">✓ HUD Benchmarks</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Compliance Language:</span>
              <span className="text-sm text-green-600">✓ SAMHSA Standards</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Measurable Outcomes:</span>
              <span className="text-sm text-green-600">✓ Quantified Results</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">
          <FileText className="w-4 h-4 mr-2" />
          Transform to Grant Language
        </div>
      </div>
    </div>
  );

  const WorkflowMap = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Integration Workflow</h2>
        <p className="text-gray-600">All your data, all in one place—automated, integrated, and ready for action</p>
      </div>

      {/* Data Sources */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Data Sources</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">Apricot CRM</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">HMIS</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FileText className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">Excel/Sheets</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Settings className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">Financial Systems</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">Documents/Notes</div>
          </div>
        </div>
      </div>

      {/* Integration Flow */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <ArrowRight className="w-8 h-8 text-gray-400" />
        </div>
        
        <div className="text-center mb-4">
          <div className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold text-lg">
            Recovery Compass Platform
          </div>
          <div className="text-sm text-gray-600 mt-2">Automated data integration via Coupler.io</div>
        </div>
        
        <div className="flex items-center justify-center mb-4">
          <ArrowRight className="w-8 h-8 text-gray-400" />
        </div>
      </div>

      {/* Output Applications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Intelligent Outputs</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">Executive Dashboard</div>
            <div className="text-xs text-gray-500">Board/Funder/Staff views</div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">Impact Translator</div>
            <div className="text-xs text-gray-500">Grant narratives</div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">Compliance Reports</div>
            <div className="text-xs text-gray-500">Automated tracking</div>
          </div>
          
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-teal-600" />
            </div>
            <div className="text-sm font-medium text-gray-700">Program Analytics</div>
            <div className="text-xs text-gray-500">Optimization insights</div>
          </div>
        </div>
      </div>

      {/* Benefits Callout */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <div className="text-center text-sm text-gray-700">
          <strong>Result:</strong> 75% reduction in manual data entry • 98%+ compliance rate • Real-time decision-making capability
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
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

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Attachment Selector */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveAttachment('dashboard')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeAttachment === 'dashboard'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Executive Dashboard Visuals
            </button>
            <button
              onClick={() => setActiveAttachment('translator')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeAttachment === 'translator'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Impact Translator Preview
            </button>
            <button
              onClick={() => setActiveAttachment('workflow')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeAttachment === 'workflow'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Workflow Map
            </button>
          </div>

          {/* Active Attachment Display */}
          <div className="mb-8">
            {activeAttachment === 'dashboard' && <DashboardVisual />}
            {activeAttachment === 'translator' && <ImpactTranslatorPreview />}
            {activeAttachment === 'workflow' && <WorkflowMap />}
          </div>

          {/* Download Instructions */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
            <div className="flex items-start">
              <Download className="w-6 h-6 text-teal-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-teal-900 mb-2">Export Instructions</h3>
                <p className="text-teal-700 mb-3">
                  To capture these visuals for presentations or documentation:
                </p>
                <ol className="list-decimal list-inside text-sm text-teal-700 space-y-1">
                  <li>Screenshot each view at full resolution</li>
                  <li>Save as PNG files with descriptive names</li>
                  <li>Include in presentations, reports, or grant applications</li>
                  <li>Reference metrics as evidence of organizational effectiveness</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Recovery Compass Branding */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg">
              <span className="font-bold mr-2">RC</span>
              <span>Recovery Compass Strategic Intelligence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WFDAttachmentSuite;
