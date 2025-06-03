
import React from 'react';

const DashboardView = () => (
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
        <div className="font-semibold text-gray-500 mb-2">Q4 2025 expansion</div>
        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
          PLANNING
        </span>
      </div>
    </div>
  </div>
);

export default DashboardView;
