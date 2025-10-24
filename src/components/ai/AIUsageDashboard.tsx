/**
 * AI Usage Dashboard Component
 * Monitor AI API usage, token consumption, and costs
 * Inspired by ccusage pattern
 */

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AIUsageTracker, { UsageStats, CostLimit } from '@/services/AIUsageTracker';
import {
  DollarSign,
  Activity,
  Zap,
  Clock,
  TrendingUp,
  Download,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
}

function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend !== undefined && (
          <div className={`flex items-center mt-2 text-xs ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface CostLimitCardProps {
  limit: CostLimit;
  onUpdate: (limit: number) => void;
  onReset: () => void;
}

function CostLimitCard({ limit, onUpdate, onReset }: CostLimitCardProps) {
  const usage = (limit.current / limit.limit) * 100;
  const status = usage >= 100 ? 'exceeded' : usage >= limit.alert_threshold * 100 ? 'warning' : 'good';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="capitalize">{limit.type} Limit</span>
          <Badge variant={
            status === 'exceeded' ? 'destructive' :
            status === 'warning' ? 'secondary' :
            'default'
          }>
            {usage.toFixed(1)}%
          </Badge>
        </CardTitle>
        <CardDescription>
          ${limit.current.toFixed(2)} / ${limit.limit.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={Math.min(usage, 100)} />
        {status === 'exceeded' && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>Limit exceeded!</AlertDescription>
          </Alert>
        )}
        {status === 'warning' && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>Approaching limit ({usage.toFixed(1)}%)</AlertDescription>
          </Alert>
        )}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AIUsageDashboard() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [limits, setLimits] = useState<Map<string, CostLimit>>(new Map());
  const [projection, setProjection] = useState<{ projectedCost: number; currentRate: number; confidence: string } | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  const tracker = AIUsageTracker.getInstance();

  const loadData = () => {
    const periodMap = {
      '1h': 3600000,
      '24h': 86400000,
      '7d': 604800000,
      '30d': 2592000000,
    };

    const since = Date.now() - periodMap[selectedPeriod];
    const currentStats = tracker.getStats({ since });
    const currentLimits = tracker.getLimits();
    const proj = tracker.getCostProjection(30);

    setStats(currentStats);
    setLimits(currentLimits);
    setProjection(proj);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [selectedPeriod]);

  const handleExport = (format: 'json' | 'csv') => {
    const data = tracker.exportData(format);
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-usage-${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!stats || !projection) {
    return <div>Loading...</div>;
  }

  const successRate = stats.totalRequests > 0
    ? (stats.successfulRequests / stats.totalRequests) * 100
    : 0;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Usage Monitor</h1>
          <p className="text-muted-foreground mt-1">
            Track token usage, costs, and performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport('json')}>
            <Download className="w-4 h-4 mr-2" />
            JSON
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        <Button
          variant={selectedPeriod === '1h' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('1h')}
        >
          Last Hour
        </Button>
        <Button
          variant={selectedPeriod === '24h' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('24h')}
        >
          24 Hours
        </Button>
        <Button
          variant={selectedPeriod === '7d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('7d')}
        >
          7 Days
        </Button>
        <Button
          variant={selectedPeriod === '30d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('30d')}
        >
          30 Days
        </Button>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Cost"
          value={`$${stats.totalCost.toFixed(4)}`}
          subtitle={`Avg: $${stats.averageCost.toFixed(6)} per request`}
          icon={<DollarSign className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Total Requests"
          value={stats.totalRequests.toLocaleString()}
          subtitle={`${stats.successfulRequests} successful, ${stats.failedRequests} failed`}
          icon={<Activity className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Total Tokens"
          value={stats.totalTokens.toLocaleString()}
          subtitle={`${stats.inputTokens.toLocaleString()} in, ${stats.outputTokens.toLocaleString()} out`}
          icon={<Zap className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Avg Latency"
          value={`${stats.averageLatency.toFixed(0)}ms`}
          subtitle={`Success rate: ${successRate.toFixed(1)}%`}
          icon={<Clock className="w-4 h-4 text-muted-foreground" />}
        />
      </div>

      {/* Cost Limits */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from(limits.entries()).map(([type, limit]) => (
          <CostLimitCard
            key={type}
            limit={limit}
            onUpdate={(newLimit) => tracker.updateLimit(type, newLimit)}
            onReset={() => tracker.resetLimit(type)}
          />
        ))}
      </div>

      {/* Projection */}
      <Card>
        <CardHeader>
          <CardTitle>30-Day Cost Projection</CardTitle>
          <CardDescription>
            Based on current usage trends
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                ${projection.projectedCost.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Current rate: ${projection.currentRate.toFixed(4)}/day
              </div>
            </div>
            <Badge variant={
              projection.confidence === 'high' ? 'default' :
              projection.confidence === 'medium' ? 'secondary' :
              'outline'
            }>
              {projection.confidence} confidence
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Usage by Model */}
      <Card>
        <CardHeader>
          <CardTitle>Usage by Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.byModel).map(([model, data]) => (
              <div key={model} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{model}</span>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{data.requests} requests</span>
                    <span>{data.tokens.toLocaleString()} tokens</span>
                    <span className="font-semibold">${data.cost.toFixed(4)}</span>
                  </div>
                </div>
                <Progress value={(data.cost / stats.totalCost) * 100} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage by Prompt Type */}
      <Card>
        <CardHeader>
          <CardTitle>Usage by Prompt Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.byPromptType).map(([type, data]) => (
              <div key={type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{type}</span>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{data.requests} requests</span>
                    <span>{data.tokens.toLocaleString()} tokens</span>
                    <span className="font-semibold">${data.cost.toFixed(4)}</span>
                  </div>
                </div>
                <Progress value={(data.requests / stats.totalRequests) * 100} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
