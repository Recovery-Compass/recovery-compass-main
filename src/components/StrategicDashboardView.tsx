
import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Calendar, Home, BarChart3, Network, FileText, Settings } from 'lucide-react';

const StrategicDashboardView = () => {
  const [activeView, setActiveView] = useState('executive');

  const navigationItems = [
    { id: 'executive', icon: BarChart3, label: 'Executive Dashboard', active: true },
    { id: 'operational', icon: Settings, label: 'Operational Intelligence' },
    { id: 'impact', icon: FileText, label: 'Impact Translator' },
    { id: 'network', icon: Network, label: 'Partnership Network' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics & Reporting' }
  ];

  const sites = [
    {
      name: 'Whittier First Day',
      subtitle: '(Main)',
      status: 'OPERATIONAL',
      statusColor: 'bg-blue-500',
      capacity: '85%',
      clients: 249,
      detail: '~295 total beds'
    },
    {
      name: 'Cora (Oscar)',
      status: 'INTEGRATING',
      statusColor: 'bg-orange-500',
      capacity: 'Data integration in progress',
      clients: 'Integration pending',
      detail: 'Harm reduction focused'
    },
    {
      name: "Ted's Place",
      status: 'PLANNING',
      statusColor: 'bg-yellow-500',
      capacity: 'Development phase',
      clients: 178,
      detail: 'Q4 2025 expansion target'
    },
    {
      name: 'Pathway Homes',
      status: 'OPERATIONAL',
      statusColor: 'bg-blue-500',
      capacity: 'Data to be updated',
      clients: 2,
      detail: 'Transitional housing component'
    },
    {
      name: 'Midvale Tiny Homes',
      status: 'PLANNING',
      statusColor: 'bg-yellow-500',
      capacity: 'Data to be updated',
      clients: 2,
      detail: ''
    },
    {
      name: 'Hondo Center',
      status: 'OPERATIONAL',
      statusColor: 'bg-blue-500',
      capacity: 'Data to be updated',
      clients: 184,
      detail: ''
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="text-2xl font-bold text-purple-600 mb-1">WFD</div>
          <div className="text-sm text-gray-600 font-medium">Whittier First Day</div>
        </div>
        
        <nav className="mt-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors ${
                  item.active 
                    ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
              <p className="text-gray-600 mt-1">Real-time organizational intelligence and strategic oversight.</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Dr. Donna Gallup</div>
                <div className="text-xs text-gray-500">Executive Director</div>
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                DG
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-8">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-purple-600 mb-1">5</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Total Programs</div>
              <div className="text-xs text-green-600">+1 this quarter</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-purple-600 mb-1">249</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Active Clients</div>
              <div className="text-xs text-gray-500">Currently housed residents</div>
              <div className="text-xs text-green-600">+12% from last quarter</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-purple-600 mb-1">40-50</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Staff Count</div>
              <div className="text-xs text-gray-500">Full-time equivalent</div>
              <div className="text-xs text-green-600">Actively hiring</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-purple-600 mb-1">78%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Budget Utilization</div>
              <div className="text-xs text-green-600">On track</div>
            </div>
          </div>

          {/* Multi-Site Network Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Multi-Site Network Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites.map((site, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">{site.name}</h3>
                    {site.subtitle && <div className="text-sm text-gray-500">{site.subtitle}</div>}
                  </div>
                  
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${site.statusColor}`}>
                      {site.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Capacity:</span> 
                      <span className="ml-1 text-gray-600">{site.capacity}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Clients:</span> 
                      <span className="ml-1 text-gray-600">{site.clients}</span>
                    </div>
                    {site.detail && (
                      <div className="text-xs text-gray-500">{site.detail}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Supporting Metrics */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Verified Supporting Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">8,737</div>
                <div className="text-sm font-medium text-gray-700">Bed Nights Provided</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">35.1</div>
                <div className="text-sm font-medium text-gray-700">Average Stay (nights)</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">91</div>
                <div className="text-sm font-medium text-gray-700">Housing Placements</div>
                <div className="text-xs text-gray-500">51% success rate</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24,387</div>
                <div className="text-sm font-medium text-gray-700">Meals Served</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">196</div>
                <div className="text-sm font-medium text-gray-700">Clinical Contacts</div>
              </div>
            </div>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="px-6 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium">
              EXECUTIVE
            </button>
            <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
              PROGRAM STAFF
            </button>
            <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
              FUNDERS
            </button>
          </div>

          {/* Footer Note */}
          <div className="text-xs text-gray-500 mb-8">
            (* Metrics will be injected by JavaScript *)
          </div>

          {/* Recovery Compass CTA - Maintaining the teal branding */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-6 text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">RC</span>
                </div>
                <div>
                  <div className="font-semibold text-lg">Ready to transform your nonprofit operations?</div>
                  <div className="text-teal-100">Schedule a personalized demo with the Recovery Compass team.</div>
                </div>
              </div>
              <button className="bg-white text-teal-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicDashboardView;
