/**
 * Analytics Dashboard Component
 * Real-time metrics visualization inspired by power user monitoring patterns
 */

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AnalyticsDashboardService, { DashboardMetrics } from '@/services/AnalyticsDashboardService';
import {
  Activity,
  Users,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Zap,
  Download,
  RefreshCw,
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
  status?: 'good' | 'warning' | 'critical';
}

function MetricCard({ title, value, subtitle, icon, trend, status }: MetricCardProps) {
  const statusColors = {
    good: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    critical: 'text-red-600 dark:text-red-400',
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={status ? statusColors[status] : 'text-muted-foreground'}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend !== undefined && (
          <div className={`flex items-center mt-2 text-xs ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}% from last period
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface TimeSeriesChartProps {
  data: Array<{ timestamp: number; value: number }>;
  label: string;
}

function SimpleTimeSeriesChart({ data, label }: TimeSeriesChartProps) {
  if (data.length === 0) {
    return <div className="text-sm text-muted-foreground">No data available</div>;
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{label}</div>
      <div className="flex items-end h-32 gap-1">
        {data.map((point, i) => {
          const height = ((point.value - minValue) / range) * 100;
          return (
            <div
              key={i}
              className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors relative group"
              style={{ height: `${Math.max(height, 5)}%` }}
            >
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-popover text-popover-foreground text-xs p-2 rounded shadow-lg whitespace-nowrap z-10">
                <div>{new Date(point.timestamp).toLocaleString()}</div>
                <div className="font-semibold">{point.value.toFixed(2)}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Min: {minValue.toFixed(2)}</span>
        <span>Max: {maxValue.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [healthScore, setHealthScore] = useState<{ score: number; issues: string[]; recommendations: string[] } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  const dashboardService = AnalyticsDashboardService.getInstance();

  const loadMetrics = () => {
    setIsRefreshing(true);
    const data = dashboardService.getDashboardMetrics();
    const health = dashboardService.getHealthScore();
    setMetrics(data);
    setHealthScore(health);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const exportMetrics = (format: 'json' | 'csv') => {
    const data = dashboardService.exportMetrics(format);
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recovery-compass-metrics-${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!metrics || !healthScore) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Real-time platform monitoring and insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportMetrics('json')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportMetrics('csv')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={loadMetrics}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Platform Health Score
            <Badge variant={healthScore.score >= 80 ? 'default' : healthScore.score >= 60 ? 'secondary' : 'destructive'}>
              {healthScore.score}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-secondary rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full transition-all ${
                healthScore.score >= 80 ? 'bg-green-600' :
                healthScore.score >= 60 ? 'bg-yellow-600' :
                'bg-red-600'
              }`}
              style={{ width: `${healthScore.score}%` }}
            />
          </div>
          {healthScore.issues.length > 0 && (
            <div className="space-y-2">
              <div className="font-medium text-sm">Issues Detected:</div>
              {healthScore.issues.map((issue, i) => (
                <Alert key={i} variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{issue}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
          {healthScore.recommendations.length > 0 && (
            <div className="space-y-2 mt-4">
              <div className="font-medium text-sm">Recommendations:</div>
              {healthScore.recommendations.map((rec, i) => (
                <Alert key={i}>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{rec}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="realtime">Real-Time</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="ai">AI Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Active Users"
              value={metrics.realTime.activeUsers}
              subtitle="Currently active"
              icon={<Users className="w-4 h-4" />}
              status="good"
            />
            <MetricCard
              title="Total Journeys"
              value={metrics.userEngagement.totalJourneys}
              subtitle={`${metrics.userEngagement.completionRate.toFixed(1)}% completion rate`}
              icon={<Activity className="w-4 h-4" />}
            />
            <MetricCard
              title="AI Usage Cost"
              value={`$${metrics.aiUsage.estimatedCost.toFixed(2)}`}
              subtitle={`${metrics.aiUsage.promptsGenerated} prompts`}
              icon={<DollarSign className="w-4 h-4" />}
            />
            <MetricCard
              title="Compliance"
              value={metrics.compliance.completedAnalyses}
              subtitle={`${metrics.compliance.processingQueue} in queue`}
              icon={<CheckCircle className="w-4 h-4" />}
              status={metrics.compliance.pendingAlerts > 5 ? 'warning' : 'good'}
            />
          </div>
        </TabsContent>

        {/* Real-Time Tab */}
        <TabsContent value="realtime" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Active Users"
              value={metrics.realTime.activeUsers}
              icon={<Users className="w-4 h-4" />}
            />
            <MetricCard
              title="Current Sessions"
              value={metrics.realTime.currentSessions}
              icon={<Activity className="w-4 h-4" />}
            />
            <MetricCard
              title="Events/Min"
              value={metrics.realTime.eventsPerMinute}
              icon={<Zap className="w-4 h-4" />}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Top Pages (Last Minute)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {metrics.realTime.topPages.length > 0 ? (
                  metrics.realTime.topPages.map((page, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-mono">{page.path}</span>
                      <Badge variant="secondary">{page.views} views</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">No recent page views</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Uploads"
              value={metrics.compliance.totalUploads}
              icon={<Activity className="w-4 h-4" />}
            />
            <MetricCard
              title="Processing Queue"
              value={metrics.compliance.processingQueue}
              icon={<Clock className="w-4 h-4" />}
              status={metrics.compliance.processingQueue > 10 ? 'warning' : 'good'}
            />
            <MetricCard
              title="Completed"
              value={metrics.compliance.completedAnalyses}
              icon={<CheckCircle className="w-4 h-4" />}
              status="good"
            />
            <MetricCard
              title="Pending Alerts"
              value={metrics.compliance.pendingAlerts}
              icon={<AlertTriangle className="w-4 h-4" />}
              status={metrics.compliance.pendingAlerts > 5 ? 'critical' : 'good'}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Average Processing Time</CardTitle>
              <CardDescription>
                {(metrics.compliance.averageProcessingTime / 1000).toFixed(2)} seconds
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Journeys"
              value={metrics.userEngagement.totalJourneys}
              icon={<Activity className="w-4 h-4" />}
            />
            <MetricCard
              title="Active Journeys"
              value={metrics.userEngagement.activeJourneys}
              icon={<Users className="w-4 h-4" />}
            />
            <MetricCard
              title="Completion Rate"
              value={`${metrics.userEngagement.completionRate.toFixed(1)}%`}
              icon={<CheckCircle className="w-4 h-4" />}
              status={metrics.userEngagement.completionRate >= 50 ? 'good' : 'warning'}
            />
            <MetricCard
              title="Avg Session"
              value={`${(metrics.userEngagement.averageSessionDuration / 60).toFixed(1)}m`}
              icon={<Clock className="w-4 h-4" />}
            />
          </div>
        </TabsContent>

        {/* AI Usage Tab */}
        <TabsContent value="ai" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Prompts Generated"
              value={metrics.aiUsage.promptsGenerated}
              icon={<Zap className="w-4 h-4" />}
            />
            <MetricCard
              title="Total Tokens"
              value={metrics.aiUsage.totalTokens.toLocaleString()}
              icon={<Activity className="w-4 h-4" />}
            />
            <MetricCard
              title="Estimated Cost"
              value={`$${metrics.aiUsage.estimatedCost.toFixed(2)}`}
              icon={<DollarSign className="w-4 h-4" />}
              status={metrics.aiUsage.estimatedCost > 10 ? 'warning' : 'good'}
            />
            <MetricCard
              title="Avg Response Time"
              value={`${metrics.aiUsage.averageResponseTime.toFixed(0)}ms`}
              icon={<Clock className="w-4 h-4" />}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Top Prompt Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {metrics.aiUsage.topPromptTypes.length > 0 ? (
                  metrics.aiUsage.topPromptTypes.map((prompt, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{prompt.type}</span>
                      <Badge variant="secondary">{prompt.count} uses</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">No prompt data available</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Page Load Time"
              value={`${(metrics.performance.pageLoadTime / 1000).toFixed(2)}s`}
              icon={<Clock className="w-4 h-4" />}
              status={metrics.performance.pageLoadTime > 3000 ? 'warning' : 'good'}
            />
            <MetricCard
              title="API Response"
              value={`${metrics.performance.apiResponseTime.toFixed(0)}ms`}
              icon={<Zap className="w-4 h-4" />}
              status={metrics.performance.apiResponseTime > 1000 ? 'warning' : 'good'}
            />
            <MetricCard
              title="Error Rate"
              value={`${metrics.performance.errorRate.toFixed(2)}%`}
              icon={<AlertTriangle className="w-4 h-4" />}
              status={metrics.performance.errorRate > 1 ? 'critical' : 'good'}
            />
            <MetricCard
              title="Uptime"
              value={`${metrics.performance.uptime.toFixed(2)}%`}
              icon={<CheckCircle className="w-4 h-4" />}
              status={metrics.performance.uptime >= 99.5 ? 'good' : 'warning'}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
