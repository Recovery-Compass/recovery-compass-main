
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, Users, Home, Calendar, Activity, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardData {
  id: string;
  name: string;
  value: string;
  unit: string;
  insightTag: string;
  status: 'green' | 'yellow' | 'red';
  icon: any;
}

const StrategicDashboardView = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample metrics data - in production, this would come from Google Sheets
  const [metricsData, setMetricsData] = useState<MetricCardData[]>([
    {
      id: 'bed-utilization',
      name: 'Bed Utilization Rate',
      value: '35.1',
      unit: 'avg nights per resident',
      insightTag: 'Strategic Proof Point',
      status: 'green',
      icon: TrendingUp
    },
    {
      id: 'meals-served',
      name: 'Meals Served',
      value: '24,387',
      unit: 'total',
      insightTag: 'Community Impact',
      status: 'green',
      icon: Users
    },
    {
      id: 'non-resident-services',
      name: 'Non-Resident Services',
      value: '48',
      unit: 'services provided',
      insightTag: 'Outreach Depth',
      status: 'yellow',
      icon: Heart
    },
    {
      id: 'housing-placements',
      name: 'Housing Placements',
      value: '91',
      unit: '(51.1% success rate)',
      insightTag: 'Depth-over-Speed',
      status: 'green',
      icon: Home
    },
    {
      id: 'avg-days-housing',
      name: 'Avg Days to Housing',
      value: '82',
      unit: 'days',
      insightTag: 'Process Efficiency',
      status: 'yellow',
      icon: Calendar
    },
    {
      id: 'clinical-integration',
      name: 'Clinical Integration',
      value: '196',
      unit: 'contacts (101 MH + 95 CNA)',
      insightTag: 'Holistic Care',
      status: 'green',
      icon: Activity
    }
  ]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
      console.log('Dashboard refreshed from Google Sheets');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-moonlight px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-semibold text-5xl text-teal mb-4">
            Whittier First Day Executive Dashboard
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-600">
            <span className="text-sm">
              Last Updated: {lastUpdated.toLocaleString()}
            </span>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {metricsData.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card
                key={metric.id}
                className={cn(
                  'hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white border-gray-200',
                  'animate-fade-in'
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="font-montserrat font-semibold text-2xl text-gray-800 mb-2">
                        {metric.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className={cn('w-3 h-3 rounded-full', getStatusColor(metric.status))}></div>
                        <span className="text-sm font-medium text-bronze bg-bronze/10 px-2 py-1 rounded-full">
                          {metric.insightTag}
                        </span>
                      </div>
                    </div>
                    <IconComponent className="h-8 w-8 text-teal" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="font-montserrat text-4xl font-regular text-gray-800 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-base text-gray-600">
                      {metric.unit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Google Sheets Integration Section */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="font-montserrat font-semibold text-xl text-gray-800 flex items-center gap-2">
              <Activity className="h-5 w-5 text-teal" />
              Live Data Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-600">
              <p className="mb-2">Google Sheets Integration Ready</p>
              <p className="text-sm">Data Source: "Donna's Dashboard" tab via Coupler.io</p>
              {/* Placeholder for iframe when Google Sheets URL is available */}
              <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-sm text-gray-500">
                  Replace this section with iframe when Google Sheets URL is configured
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrategicDashboardView;
