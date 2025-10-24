/**
 * Enhanced Analytics Dashboard Service
 * Provides real-time metrics, user activity monitoring, and advanced insights
 * Inspired by power user patterns for comprehensive platform monitoring
 */

import { AnalyticsService } from './AnalyticsService';

export interface DashboardMetrics {
  realTime: {
    activeUsers: number;
    currentSessions: number;
    eventsPerMinute: number;
    topPages: Array<{ path: string; views: number }>;
  };
  compliance: {
    totalUploads: number;
    processingQueue: number;
    completedAnalyses: number;
    pendingAlerts: number;
    averageProcessingTime: number;
  };
  userEngagement: {
    totalJourneys: number;
    activeJourneys: number;
    completionRate: number;
    averageSessionDuration: number;
    returningUserRate: number;
  };
  aiUsage: {
    promptsGenerated: number;
    totalTokens: number;
    estimatedCost: number;
    averageResponseTime: number;
    topPromptTypes: Array<{ type: string; count: number }>;
  };
  performance: {
    pageLoadTime: number;
    apiResponseTime: number;
    errorRate: number;
    uptime: number;
  };
}

export interface AlertConfig {
  type: 'compliance' | 'performance' | 'usage' | 'error';
  threshold: number;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  notificationChannels: Array<'email' | 'slack' | 'telegram' | 'webhook'>;
}

export interface TimeSeriesData {
  timestamp: number;
  value: number;
  label?: string;
}

class AnalyticsDashboardService {
  private static instance: AnalyticsDashboardService;
  private metricsCache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 60000; // 1 minute cache
  private eventBuffer: Array<{ event: string; timestamp: number; data: any }> = [];
  private sessionTracking: Map<string, { startTime: number; events: number }> = new Map();
  private alerts: AlertConfig[] = [];

  private constructor() {
    this.initializeTracking();
    this.setupPeriodicMetricsCollection();
  }

  public static getInstance(): AnalyticsDashboardService {
    if (!AnalyticsDashboardService.instance) {
      AnalyticsDashboardService.instance = new AnalyticsDashboardService();
    }
    return AnalyticsDashboardService.instance;
  }

  private initializeTracking(): void {
    // Track page visibility changes for accurate active user counting
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        this.trackVisibilityChange();
      });

      // Track performance metrics
      if ('PerformanceObserver' in window) {
        this.initializePerformanceObserver();
      }
    }
  }

  private initializePerformanceObserver(): void {
    try {
      // Navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackNavigationTiming(entry as PerformanceNavigationTiming);
        }
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });

      // Resource timing
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackResourceTiming(entry);
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });

      // Long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackLongTask(entry);
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.warn('Performance observer not fully supported:', error);
    }
  }

  private trackNavigationTiming(entry: PerformanceNavigationTiming): void {
    const metrics = {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      request: entry.responseStart - entry.requestStart,
      response: entry.responseEnd - entry.responseStart,
      dom: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      load: entry.loadEventEnd - entry.loadEventStart,
      total: entry.loadEventEnd - entry.fetchStart,
    };

    this.bufferEvent('navigation_timing', metrics);
    AnalyticsService.trackEvent('page_performance', {
      page_load_time: metrics.total,
      dom_ready_time: metrics.dom,
    });
  }

  private trackResourceTiming(entry: PerformanceEntry): void {
    const resource = entry as PerformanceResourceTiming;
    if (resource.initiatorType === 'fetch' || resource.initiatorType === 'xmlhttprequest') {
      const duration = resource.responseEnd - resource.requestStart;
      this.bufferEvent('api_timing', {
        url: resource.name,
        duration,
        size: resource.transferSize,
      });
    }
  }

  private trackLongTask(entry: PerformanceEntry): void {
    this.bufferEvent('long_task', {
      duration: entry.duration,
      startTime: entry.startTime,
    });

    if (entry.duration > 100) {
      AnalyticsService.trackEvent('performance_issue', {
        issue_type: 'long_task',
        duration: entry.duration,
      });
    }
  }

  private trackVisibilityChange(): void {
    const isVisible = document.visibilityState === 'visible';
    AnalyticsService.trackEvent('visibility_change', {
      visible: isVisible,
      timestamp: Date.now(),
    });
  }

  private setupPeriodicMetricsCollection(): void {
    // Collect metrics every minute
    setInterval(() => {
      this.collectPeriodicMetrics();
      this.processEventBuffer();
      this.checkAlerts();
    }, 60000);
  }

  private collectPeriodicMetrics(): void {
    const metrics = this.getCurrentMetrics();
    this.metricsCache.set('periodic', {
      data: metrics,
      timestamp: Date.now(),
    });
  }

  private processEventBuffer(): void {
    if (this.eventBuffer.length === 0) return;

    const now = Date.now();
    const recentEvents = this.eventBuffer.filter(e => now - e.timestamp < 60000);

    // Calculate events per minute
    const eventsPerMinute = recentEvents.length;

    // Clean up old events
    this.eventBuffer = recentEvents;

    this.metricsCache.set('events_per_minute', {
      data: eventsPerMinute,
      timestamp: now,
    });
  }

  private bufferEvent(event: string, data: any): void {
    this.eventBuffer.push({
      event,
      timestamp: Date.now(),
      data,
    });

    // Keep only last 1000 events
    if (this.eventBuffer.length > 1000) {
      this.eventBuffer.shift();
    }
  }

  private checkAlerts(): void {
    const metrics = this.getCurrentMetrics();

    this.alerts.forEach(alert => {
      let currentValue = 0;

      switch (alert.type) {
        case 'compliance':
          currentValue = metrics.compliance.pendingAlerts;
          break;
        case 'performance':
          currentValue = metrics.performance.errorRate;
          break;
        case 'usage':
          currentValue = metrics.aiUsage.estimatedCost;
          break;
        case 'error':
          currentValue = metrics.performance.errorRate;
          break;
      }

      if (currentValue >= alert.threshold) {
        this.triggerAlert(alert, currentValue);
      }
    });
  }

  private triggerAlert(alert: AlertConfig, value: number): void {
    AnalyticsService.trackEvent('alert_triggered', {
      alert_type: alert.type,
      priority: alert.priority,
      threshold: alert.threshold,
      current_value: value,
    });

    // Send notifications through configured channels
    alert.notificationChannels.forEach(channel => {
      this.sendNotification(channel, alert, value);
    });
  }

  private sendNotification(channel: string, alert: AlertConfig, value: number): void {
    // This would integrate with actual notification services
    console.warn(`[${alert.priority.toUpperCase()}] ${alert.message}`, {
      channel,
      value,
      threshold: alert.threshold,
    });
  }

  // Public API Methods

  public getDashboardMetrics(): DashboardMetrics {
    return this.getCurrentMetrics();
  }

  private getCurrentMetrics(): DashboardMetrics {
    const now = Date.now();
    const recentEvents = this.eventBuffer.filter(e => now - e.timestamp < 60000);

    // Calculate active sessions
    const activeSessions = Array.from(this.sessionTracking.values())
      .filter(session => now - session.startTime < 1800000).length; // 30 min

    // Calculate events per minute
    const eventsPerMinute = recentEvents.length;

    // Performance metrics
    const navigationEvents = recentEvents.filter(e => e.event === 'navigation_timing');
    const avgPageLoadTime = navigationEvents.length > 0
      ? navigationEvents.reduce((sum, e) => sum + e.data.total, 0) / navigationEvents.length
      : 0;

    const apiEvents = recentEvents.filter(e => e.event === 'api_timing');
    const avgApiResponseTime = apiEvents.length > 0
      ? apiEvents.reduce((sum, e) => sum + e.data.duration, 0) / apiEvents.length
      : 0;

    return {
      realTime: {
        activeUsers: this.getActiveUserCount(),
        currentSessions: activeSessions,
        eventsPerMinute,
        topPages: this.getTopPages(),
      },
      compliance: {
        totalUploads: this.getMetricFromStorage('compliance_uploads', 0),
        processingQueue: this.getMetricFromStorage('compliance_processing', 0),
        completedAnalyses: this.getMetricFromStorage('compliance_completed', 0),
        pendingAlerts: this.getMetricFromStorage('compliance_alerts', 0),
        averageProcessingTime: this.getMetricFromStorage('avg_processing_time', 0),
      },
      userEngagement: {
        totalJourneys: this.getMetricFromStorage('total_journeys', 0),
        activeJourneys: this.getMetricFromStorage('active_journeys', 0),
        completionRate: this.getMetricFromStorage('completion_rate', 0),
        averageSessionDuration: this.calculateAverageSessionDuration(),
        returningUserRate: this.getMetricFromStorage('returning_user_rate', 0),
      },
      aiUsage: {
        promptsGenerated: this.getMetricFromStorage('ai_prompts', 0),
        totalTokens: this.getMetricFromStorage('ai_tokens', 0),
        estimatedCost: this.calculateAICost(),
        averageResponseTime: this.getMetricFromStorage('ai_response_time', 0),
        topPromptTypes: this.getTopPromptTypes(),
      },
      performance: {
        pageLoadTime: avgPageLoadTime,
        apiResponseTime: avgApiResponseTime,
        errorRate: this.calculateErrorRate(),
        uptime: this.getMetricFromStorage('uptime', 99.9),
      },
    };
  }

  private getActiveUserCount(): number {
    // In a real implementation, this would connect to your analytics backend
    const cached = this.metricsCache.get('active_users');
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    return 0;
  }

  private getTopPages(): Array<{ path: string; views: number }> {
    const now = Date.now();
    const pageViews = this.eventBuffer
      .filter(e => e.event === 'page_view' && now - e.timestamp < 60000)
      .reduce((acc, e) => {
        const path = e.data.page_path || '/';
        acc[path] = (acc[path] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(pageViews)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }

  private calculateAverageSessionDuration(): number {
    const now = Date.now();
    const sessions = Array.from(this.sessionTracking.values());
    if (sessions.length === 0) return 0;

    const totalDuration = sessions.reduce((sum, session) => {
      return sum + (now - session.startTime);
    }, 0);

    return totalDuration / sessions.length / 1000; // Return in seconds
  }

  private calculateAICost(): number {
    const tokens = this.getMetricFromStorage('ai_tokens', 0);
    // Estimate based on typical Claude pricing: ~$0.015 per 1k tokens (mixed input/output)
    return (tokens / 1000) * 0.015;
  }

  private getTopPromptTypes(): Array<{ type: string; count: number }> {
    const promptTypes = this.eventBuffer
      .filter(e => e.event === 'ai_prompt_generated')
      .reduce((acc, e) => {
        const type = e.data.prompt_type || 'general';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(promptTypes)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private calculateErrorRate(): number {
    const now = Date.now();
    const recentEvents = this.eventBuffer.filter(e => now - e.timestamp < 300000); // 5 min
    if (recentEvents.length === 0) return 0;

    const errors = recentEvents.filter(e => e.event === 'error').length;
    return (errors / recentEvents.length) * 100;
  }

  private getMetricFromStorage(key: string, defaultValue: number): number {
    try {
      const stored = localStorage.getItem(`metric_${key}`);
      return stored ? parseFloat(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setMetricInStorage(key: string, value: number): void {
    try {
      localStorage.setItem(`metric_${key}`, value.toString());
    } catch (error) {
      console.warn('Failed to store metric:', error);
    }
  }

  // Public tracking methods

  public trackComplianceUpload(): void {
    const current = this.getMetricFromStorage('compliance_uploads', 0);
    this.setMetricInStorage('compliance_uploads', current + 1);
    this.bufferEvent('compliance_upload', { timestamp: Date.now() });
    AnalyticsService.trackEvent('compliance_upload', {});
  }

  public trackComplianceProcessing(status: 'start' | 'complete', duration?: number): void {
    if (status === 'start') {
      const current = this.getMetricFromStorage('compliance_processing', 0);
      this.setMetricInStorage('compliance_processing', current + 1);
    } else {
      const processing = this.getMetricFromStorage('compliance_processing', 0);
      this.setMetricInStorage('compliance_processing', Math.max(0, processing - 1));

      const completed = this.getMetricFromStorage('compliance_completed', 0);
      this.setMetricInStorage('compliance_completed', completed + 1);

      if (duration) {
        const avgTime = this.getMetricFromStorage('avg_processing_time', 0);
        const completed = this.getMetricFromStorage('compliance_completed', 1);
        const newAvg = ((avgTime * (completed - 1)) + duration) / completed;
        this.setMetricInStorage('avg_processing_time', newAvg);
      }
    }
    this.bufferEvent('compliance_processing', { status, duration });
  }

  public trackJourneyEvent(type: 'start' | 'progress' | 'complete'): void {
    if (type === 'start') {
      const total = this.getMetricFromStorage('total_journeys', 0);
      this.setMetricInStorage('total_journeys', total + 1);
      const active = this.getMetricFromStorage('active_journeys', 0);
      this.setMetricInStorage('active_journeys', active + 1);
    } else if (type === 'complete') {
      const active = this.getMetricFromStorage('active_journeys', 0);
      this.setMetricInStorage('active_journeys', Math.max(0, active - 1));

      const total = this.getMetricFromStorage('total_journeys', 1);
      const completed = this.getMetricFromStorage('journeys_completed', 0) + 1;
      this.setMetricInStorage('journeys_completed', completed);
      this.setMetricInStorage('completion_rate', (completed / total) * 100);
    }
    this.bufferEvent('journey_event', { type });
    AnalyticsService.trackEvent(`journey_${type}`, {});
  }

  public trackAIPrompt(promptType: string, tokens: number, responseTime: number): void {
    const totalPrompts = this.getMetricFromStorage('ai_prompts', 0);
    this.setMetricInStorage('ai_prompts', totalPrompts + 1);

    const totalTokens = this.getMetricFromStorage('ai_tokens', 0);
    this.setMetricInStorage('ai_tokens', totalTokens + tokens);

    const avgResponseTime = this.getMetricFromStorage('ai_response_time', 0);
    const newAvg = ((avgResponseTime * totalPrompts) + responseTime) / (totalPrompts + 1);
    this.setMetricInStorage('ai_response_time', newAvg);

    this.bufferEvent('ai_prompt_generated', { prompt_type: promptType, tokens, responseTime });
    AnalyticsService.trackEvent('ai_prompt_generated', { prompt_type: promptType, tokens });
  }

  public trackPageView(path: string): void {
    this.bufferEvent('page_view', { page_path: path });
  }

  public trackError(error: Error, context?: Record<string, any>): void {
    this.bufferEvent('error', { message: error.message, stack: error.stack, context });
    AnalyticsService.trackEvent('error', {
      error_message: error.message,
      ...context,
    });
  }

  public startSession(sessionId: string): void {
    this.sessionTracking.set(sessionId, {
      startTime: Date.now(),
      events: 0,
    });
  }

  public endSession(sessionId: string): void {
    this.sessionTracking.delete(sessionId);
  }

  public addAlert(alert: AlertConfig): void {
    this.alerts.push(alert);
  }

  public removeAlert(index: number): void {
    this.alerts.splice(index, 1);
  }

  public getTimeSeriesData(metric: string, period: '1h' | '24h' | '7d' | '30d'): TimeSeriesData[] {
    // In a real implementation, this would query historical data from your backend
    const periodMs = {
      '1h': 3600000,
      '24h': 86400000,
      '7d': 604800000,
      '30d': 2592000000,
    }[period];

    const now = Date.now();
    const relevantEvents = this.eventBuffer.filter(e =>
      now - e.timestamp < periodMs && e.event === metric
    );

    // Group by time intervals
    const interval = period === '1h' ? 60000 : period === '24h' ? 3600000 : 86400000;
    const grouped = relevantEvents.reduce((acc, event) => {
      const bucket = Math.floor(event.timestamp / interval) * interval;
      if (!acc[bucket]) {
        acc[bucket] = { count: 0, values: [] };
      }
      acc[bucket].count++;
      if (event.data?.value) {
        acc[bucket].values.push(event.data.value);
      }
      return acc;
    }, {} as Record<number, { count: number; values: number[] }>);

    return Object.entries(grouped).map(([timestamp, data]) => ({
      timestamp: parseInt(timestamp),
      value: data.values.length > 0
        ? data.values.reduce((sum, v) => sum + v, 0) / data.values.length
        : data.count,
    })).sort((a, b) => a.timestamp - b.timestamp);
  }

  public exportMetrics(format: 'json' | 'csv'): string {
    const metrics = this.getDashboardMetrics();

    if (format === 'json') {
      return JSON.stringify(metrics, null, 2);
    } else {
      // CSV format
      const rows = [
        ['Metric Category', 'Metric Name', 'Value'],
        ...Object.entries(metrics).flatMap(([category, categoryMetrics]) =>
          Object.entries(categoryMetrics as Record<string, any>).map(([metric, value]) => [
            category,
            metric,
            typeof value === 'object' ? JSON.stringify(value) : value.toString()
          ])
        )
      ];
      return rows.map(row => row.join(',')).join('\n');
    }
  }

  public getHealthScore(): { score: number; issues: string[]; recommendations: string[] } {
    const metrics = this.getDashboardMetrics();
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check performance
    if (metrics.performance.pageLoadTime > 3000) {
      score -= 10;
      issues.push('Slow page load times');
      recommendations.push('Optimize bundle size and lazy load components');
    }

    if (metrics.performance.errorRate > 1) {
      score -= 15;
      issues.push('High error rate');
      recommendations.push('Review error logs and implement better error handling');
    }

    // Check engagement
    if (metrics.userEngagement.completionRate < 50) {
      score -= 10;
      issues.push('Low journey completion rate');
      recommendations.push('Improve UX and add progress indicators');
    }

    // Check compliance
    if (metrics.compliance.pendingAlerts > 10) {
      score -= 10;
      issues.push('High number of pending compliance alerts');
      recommendations.push('Address compliance issues or increase processing capacity');
    }

    if (metrics.compliance.averageProcessingTime > 60000) {
      score -= 5;
      issues.push('Slow compliance processing');
      recommendations.push('Optimize processing algorithms or scale infrastructure');
    }

    return {
      score: Math.max(0, score),
      issues,
      recommendations,
    };
  }
}

export default AnalyticsDashboardService;
