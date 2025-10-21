import React from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Home, Clock, TrendingUp, Activity } from 'lucide-react';

export function OverviewMetrics() {
  const overviewMetrics = useComplianceStore(state => state.overviewMetrics);

  if (!overviewMetrics) {
    return (
      <div className="text-center py-12 text-gray-500">
        Upload a data file to view metrics
      </div>
    );
  }

  const metrics = [
    {
      title: 'Total Clients Served',
      value: overviewMetrics.totalClients,
      icon: Users,
      color: 'text-rc-primary',
      bgColor: 'bg-rc-primary/10',
    },
    {
      title: 'Active Enrollments',
      value: overviewMetrics.activeEnrollments,
      icon: Activity,
      color: 'text-rc-accent',
      bgColor: 'bg-rc-accent/10',
    },
    {
      title: 'Housing Placements',
      value: overviewMetrics.housingPlacements,
      icon: Home,
      color: 'text-rc-success',
      bgColor: 'bg-rc-success/10',
    },
    {
      title: 'Average Length of Stay',
      value: overviewMetrics.avgLengthOfStay !== null
        ? `${Math.round(overviewMetrics.avgLengthOfStay)} days`
        : 'N/A',
      icon: Clock,
      color: 'text-wfd-gold',
      bgColor: 'bg-wfd-gold/10',
    },
    {
      title: 'Housing Placement Rate',
      value: `${overviewMetrics.placementRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-rc-success',
      bgColor: 'bg-rc-success/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <div className={`${metric.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
