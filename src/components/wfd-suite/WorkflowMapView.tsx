
import React from 'react';
import { ArrowRight, Database, BarChart3, FileText, Settings, TrendingUp } from 'lucide-react';

const WorkflowMapView = () => (
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

export default WorkflowMapView;
