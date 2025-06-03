
import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, DollarSign, Calendar, Home, BarChart3, Network, FileText, Settings, RefreshCw } from 'lucide-react';

const StrategicDashboardView = () => {
  const [activeView, setActiveView] = useState('executive');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      subtitle: '(Main Campus)',
      status: 'OPERATIONAL',
      statusColor: 'bg-teal-500',
      capacity: '85% Capacity',
      clients: 249,
      detail: '~295 total beds',
      performance: 'excellent'
    },
    {
      name: 'Cora (Oscar)',
      status: 'INTEGRATING',
      statusColor: 'bg-amber-500',
      capacity: 'Data integration phase',
      clients: 'Pending integration',
      detail: 'Harm reduction focused',
      performance: 'good'
    },
    {
      name: "Ted's Place",
      status: 'EXPANSION READY',
      statusColor: 'bg-emerald-500',
      capacity: 'Q4 2025 target',
      clients: 178,
      detail: 'Strategic development phase',
      performance: 'excellent'
    },
    {
      name: 'Pathway Homes',
      status: 'OPERATIONAL',
      statusColor: 'bg-teal-500',
      capacity: 'Full capacity',
      clients: 42,
      detail: 'Transitional housing',
      performance: 'good'
    },
    {
      name: 'Midvale Tiny Homes',
      status: 'DEVELOPMENT',
      statusColor: 'bg-blue-500',
      capacity: 'Planning phase',
      clients: 'Q1 2026',
      detail: 'Innovation pilot',
      performance: 'neutral'
    },
    {
      name: 'Hondo Center',
      status: 'OPERATIONAL',
      statusColor: 'bg-teal-500',
      capacity: 'Stable operations',
      clients: 184,
      detail: 'Regional hub',
      performance: 'excellent'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
      // Save refresh timestamp to localStorage
      localStorage.setItem('dashboard_last_refresh', new Date().toISOString());
    }, 1500);
  };

  useEffect(() => {
    // Load last refresh from localStorage
    const lastRefresh = localStorage.getItem('dashboard_last_refresh');
    if (lastRefresh) {
      setLastUpdated(new Date(lastRefresh));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Enhanced Sidebar */}
      <div className="w-full lg:w-64 bg-white shadow-xl border-r border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-600 to-teal-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <span className="text-xl font-bold text-white">RC</span>
            </div>
            <div>
              <div className="text-xl font-bold text-white">Recovery Compass</div>
              <div className="text-sm text-teal-100 font-medium">Strategic Intelligence</div>
            </div>
          </div>
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
                    ? 'bg-teal-50 text-teal-700 border-r-4 border-teal-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
        
        {/* Demo Mode Indicator */}
        <div className="mt-8 mx-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="text-xs font-medium text-amber-800">Demo Mode Active</div>
          <div className="text-xs text-amber-600 mt-1">Stakeholder Presentation Ready</div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Enhanced Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
              <p className="text-gray-600 mt-2 text-lg">Real-time organizational intelligence and strategic oversight</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 disabled:opacity-70 transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
              </button>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Strategic Overview</div>
                <div className="text-xs text-gray-500">
                  Updated: {lastUpdated.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Dashboard Content */}
        <div className="p-4 lg:p-8">
          {/* Enhanced Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Network className="w-6 h-6 text-teal-600" />
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-medium">Strategic Growth</span>
              </div>
              <div className="text-3xl font-bold text-teal-600 mb-1">6</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Active Programs</div>
              <div className="text-xs text-emerald-600">+2 in development pipeline</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">Primary Outcome</span>
              </div>
              <div className="text-3xl font-bold text-amber-600 mb-1">653</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Total Active Clients</div>
              <div className="text-xs text-emerald-600">+18% quarterly growth</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full font-medium">Performance Excellence</span>
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">78%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Housing Success Rate</div>
              <div className="text-xs text-emerald-600">Above HUD benchmarks</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full font-medium">Operational Efficiency</span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">94%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Program Utilization</div>
              <div className="text-xs text-emerald-600">Optimal capacity management</div>
            </div>
          </div>

          {/* Enhanced Multi-Site Network Overview */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Multi-Site Network Overview</h2>
              <div className="text-sm text-gray-500">6 Locations • Regional Coverage</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites.map((site, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{site.name}</h3>
                      {site.subtitle && <div className="text-sm text-gray-500">{site.subtitle}</div>}
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${site.statusColor}`}>
                      {site.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Status:</span> 
                      <span className="text-gray-600">{site.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Clients:</span> 
                      <span className="text-gray-600 font-semibold">{site.clients}</span>
                    </div>
                    {site.detail && (
                      <div className="text-xs text-gray-500 italic border-t pt-2">{site.detail}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Supporting Metrics */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Performance Metrics</h2>
              <div className="text-sm text-gray-500">Evidence-Based Outcomes</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-teal-600 mb-2">12,847</div>
                <div className="text-sm font-medium text-gray-700">Bed Nights Provided</div>
                <div className="text-xs text-gray-500 mt-1">Quarterly total</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-amber-600 mb-2">42.3</div>
                <div className="text-sm font-medium text-gray-700">Avg Engagement (days)</div>
                <div className="text-xs text-gray-500 mt-1">Depth-over-speed model</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-emerald-600 mb-2">127</div>
                <div className="text-sm font-medium text-gray-700">Housing Placements</div>
                <div className="text-xs text-gray-500 mt-1">78% success rate</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-blue-600 mb-2">38,642</div>
                <div className="text-sm font-medium text-gray-700">Meals Served</div>
                <div className="text-xs text-gray-500 mt-1">Nutritional support</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-purple-600 mb-2">284</div>
                <div className="text-sm font-medium text-gray-700">Clinical Contacts</div>
                <div className="text-xs text-gray-500 mt-1">Integrated care</div>
              </div>
            </div>
          </div>

          {/* Enhanced View Toggle */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="px-6 py-3 bg-teal-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-teal-700 transition-colors">
              EXECUTIVE VIEW
            </button>
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              PROGRAM STAFF
            </button>
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              FUNDER PERSPECTIVE
            </button>
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              BOARD OVERVIEW
            </button>
          </div>

          {/* Enhanced Recovery Compass CTA */}
          <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-amber-600 rounded-xl p-8 text-white shadow-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-6">
                  <span className="text-2xl font-bold">RC</span>
                </div>
                <div>
                  <div className="font-bold text-2xl mb-2">Ready for Empire Foundation Week?</div>
                  <div className="text-teal-100 text-lg">Strategic intelligence platform built for Anthony & Donna presentations.</div>
                </div>
              </div>
              <button className="bg-white text-teal-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors whitespace-nowrap text-lg shadow-lg">
                Deploy Platform
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicDashboardView;
