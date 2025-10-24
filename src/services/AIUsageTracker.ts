/**
 * AI Usage Tracker Service
 * Monitors AI API usage, token consumption, and costs
 * Inspired by ccusage - power user pattern #11
 */

export interface AIUsageRecord {
  id: string;
  timestamp: number;
  model: string;
  promptType: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cost: number;
  latency: number;
  success: boolean;
  error?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface UsageStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  totalCost: number;
  averageLatency: number;
  averageCost: number;
  byModel: Record<string, {
    requests: number;
    tokens: number;
    cost: number;
  }>;
  byPromptType: Record<string, {
    requests: number;
    tokens: number;
    cost: number;
  }>;
}

export interface CostLimit {
  type: 'hourly' | 'daily' | 'weekly' | 'monthly';
  limit: number;
  current: number;
  alert_threshold: number;
}

class AIUsageTracker {
  private static instance: AIUsageTracker;
  private records: AIUsageRecord[] = [];
  private maxRecords = 10000;
  private costLimits: Map<string, CostLimit> = new Map();

  // Pricing per 1M tokens (as of 2025)
  private readonly PRICING = {
    'claude-3-5-sonnet-20241022': { input: 3.0, output: 15.0 },
    'claude-3-5-haiku-20241022': { input: 0.8, output: 4.0 },
    'claude-3-opus-20240229': { input: 15.0, output: 75.0 },
    'gpt-4-turbo': { input: 10.0, output: 30.0 },
    'gpt-4': { input: 30.0, output: 60.0 },
    'gpt-3.5-turbo': { input: 0.5, output: 1.5 },
  };

  private constructor() {
    this.loadData();
    this.setupDefaultLimits();
    this.setupPeriodicSave();
  }

  public static getInstance(): AIUsageTracker {
    if (!AIUsageTracker.instance) {
      AIUsageTracker.instance = new AIUsageTracker();
    }
    return AIUsageTracker.instance;
  }

  private loadData(): void {
    try {
      const stored = localStorage.getItem('ai_usage_records');
      if (stored) {
        this.records = JSON.parse(stored);
      }

      const limitsStored = localStorage.getItem('ai_cost_limits');
      if (limitsStored) {
        const limitsArray = JSON.parse(limitsStored);
        this.costLimits = new Map(limitsArray);
      }
    } catch (error) {
      console.warn('Failed to load AI usage data:', error);
    }
  }

  private saveData(): void {
    try {
      // Keep only recent records
      const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 days
      this.records = this.records
        .filter(r => r.timestamp > cutoff)
        .slice(-this.maxRecords);

      localStorage.setItem('ai_usage_records', JSON.stringify(this.records));

      const limitsArray = Array.from(this.costLimits.entries());
      localStorage.setItem('ai_cost_limits', JSON.stringify(limitsArray));
    } catch (error) {
      console.warn('Failed to save AI usage data:', error);
    }
  }

  private setupPeriodicSave(): void {
    setInterval(() => {
      this.saveData();
    }, 60000); // Save every minute
  }

  private setupDefaultLimits(): void {
    if (this.costLimits.size === 0) {
      this.costLimits.set('hourly', {
        type: 'hourly',
        limit: 10,
        current: 0,
        alert_threshold: 0.8,
      });

      this.costLimits.set('daily', {
        type: 'daily',
        limit: 50,
        current: 0,
        alert_threshold: 0.8,
      });

      this.costLimits.set('monthly', {
        type: 'monthly',
        limit: 500,
        current: 0,
        alert_threshold: 0.8,
      });
    }
  }

  public trackUsage(
    model: string,
    promptType: string,
    inputTokens: number,
    outputTokens: number,
    latency: number,
    success: boolean,
    error?: string,
    userId?: string,
    metadata?: Record<string, any>
  ): AIUsageRecord {
    const totalTokens = inputTokens + outputTokens;
    const cost = this.calculateCost(model, inputTokens, outputTokens);

    const record: AIUsageRecord = {
      id: this.generateId(),
      timestamp: Date.now(),
      model,
      promptType,
      inputTokens,
      outputTokens,
      totalTokens,
      cost,
      latency,
      success,
      error,
      userId,
      metadata,
    };

    this.records.push(record);
    this.updateLimits(cost);
    this.checkLimits();

    return record;
  }

  private calculateCost(model: string, inputTokens: number, outputTokens: number): number {
    const pricing = this.PRICING[model as keyof typeof this.PRICING] || { input: 1.0, output: 2.0 };

    const inputCost = (inputTokens / 1000000) * pricing.input;
    const outputCost = (outputTokens / 1000000) * pricing.output;

    return inputCost + outputCost;
  }

  private updateLimits(cost: number): void {
    const now = Date.now();

    // Update hourly
    const hourly = this.costLimits.get('hourly');
    if (hourly) {
      hourly.current += cost;
    }

    // Update daily
    const daily = this.costLimits.get('daily');
    if (daily) {
      daily.current += cost;
    }

    // Update monthly
    const monthly = this.costLimits.get('monthly');
    if (monthly) {
      monthly.current += cost;
    }
  }

  private checkLimits(): void {
    this.costLimits.forEach((limit, type) => {
      const usage = limit.current / limit.limit;

      if (usage >= 1.0) {
        console.error(`AI cost limit exceeded for ${type}: $${limit.current.toFixed(2)} / $${limit.limit}`);
        this.triggerLimitAlert(type, 'exceeded', limit);
      } else if (usage >= limit.alert_threshold) {
        console.warn(`AI cost limit threshold reached for ${type}: ${(usage * 100).toFixed(1)}%`);
        this.triggerLimitAlert(type, 'threshold', limit);
      }
    });
  }

  private triggerLimitAlert(type: string, level: 'threshold' | 'exceeded', limit: CostLimit): void {
    // Integration point with NotificationService
    const event = new CustomEvent('ai_cost_alert', {
      detail: { type, level, limit },
    });
    window.dispatchEvent(event);
  }

  public resetLimit(type: string): void {
    const limit = this.costLimits.get(type);
    if (limit) {
      limit.current = 0;
      this.saveData();
    }
  }

  public updateLimit(type: string, newLimit: number, alertThreshold?: number): void {
    const limit = this.costLimits.get(type);
    if (limit) {
      limit.limit = newLimit;
      if (alertThreshold !== undefined) {
        limit.alert_threshold = alertThreshold;
      }
      this.saveData();
    }
  }

  public getStats(options?: {
    since?: number;
    model?: string;
    promptType?: string;
    userId?: string;
  }): UsageStats {
    let filteredRecords = this.records;

    if (options) {
      if (options.since) {
        filteredRecords = filteredRecords.filter(r => r.timestamp >= options.since!);
      }
      if (options.model) {
        filteredRecords = filteredRecords.filter(r => r.model === options.model);
      }
      if (options.promptType) {
        filteredRecords = filteredRecords.filter(r => r.promptType === options.promptType);
      }
      if (options.userId) {
        filteredRecords = filteredRecords.filter(r => r.userId === options.userId);
      }
    }

    const totalRequests = filteredRecords.length;
    const successfulRequests = filteredRecords.filter(r => r.success).length;
    const failedRequests = totalRequests - successfulRequests;

    const totalTokens = filteredRecords.reduce((sum, r) => sum + r.totalTokens, 0);
    const inputTokens = filteredRecords.reduce((sum, r) => sum + r.inputTokens, 0);
    const outputTokens = filteredRecords.reduce((sum, r) => sum + r.outputTokens, 0);
    const totalCost = filteredRecords.reduce((sum, r) => sum + r.cost, 0);

    const averageLatency = totalRequests > 0
      ? filteredRecords.reduce((sum, r) => sum + r.latency, 0) / totalRequests
      : 0;

    const averageCost = totalRequests > 0 ? totalCost / totalRequests : 0;

    // Group by model
    const byModel: Record<string, { requests: number; tokens: number; cost: number }> = {};
    filteredRecords.forEach(r => {
      if (!byModel[r.model]) {
        byModel[r.model] = { requests: 0, tokens: 0, cost: 0 };
      }
      byModel[r.model].requests++;
      byModel[r.model].tokens += r.totalTokens;
      byModel[r.model].cost += r.cost;
    });

    // Group by prompt type
    const byPromptType: Record<string, { requests: number; tokens: number; cost: number }> = {};
    filteredRecords.forEach(r => {
      if (!byPromptType[r.promptType]) {
        byPromptType[r.promptType] = { requests: 0, tokens: 0, cost: 0 };
      }
      byPromptType[r.promptType].requests++;
      byPromptType[r.promptType].tokens += r.totalTokens;
      byPromptType[r.promptType].cost += r.cost;
    });

    return {
      totalRequests,
      successfulRequests,
      failedRequests,
      totalTokens,
      inputTokens,
      outputTokens,
      totalCost,
      averageLatency,
      averageCost,
      byModel,
      byPromptType,
    };
  }

  public getRecentRecords(limit: number = 100): AIUsageRecord[] {
    return this.records
      .slice(-limit)
      .reverse();
  }

  public getLimits(): Map<string, CostLimit> {
    return new Map(this.costLimits);
  }

  public exportData(format: 'json' | 'csv'): string {
    if (format === 'json') {
      return JSON.stringify(this.records, null, 2);
    } else {
      const headers = [
        'Timestamp',
        'Model',
        'Prompt Type',
        'Input Tokens',
        'Output Tokens',
        'Total Tokens',
        'Cost',
        'Latency',
        'Success',
      ];

      const rows = this.records.map(r => [
        new Date(r.timestamp).toISOString(),
        r.model,
        r.promptType,
        r.inputTokens,
        r.outputTokens,
        r.totalTokens,
        r.cost.toFixed(6),
        r.latency,
        r.success,
      ]);

      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
  }

  public getTimeSeriesData(metric: 'requests' | 'tokens' | 'cost', interval: 'hour' | 'day' | 'week'): Array<{ timestamp: number; value: number }> {
    const intervalMs = {
      hour: 3600000,
      day: 86400000,
      week: 604800000,
    }[interval];

    const grouped = this.records.reduce((acc, record) => {
      const bucket = Math.floor(record.timestamp / intervalMs) * intervalMs;

      if (!acc[bucket]) {
        acc[bucket] = { requests: 0, tokens: 0, cost: 0 };
      }

      acc[bucket].requests++;
      acc[bucket].tokens += record.totalTokens;
      acc[bucket].cost += record.cost;

      return acc;
    }, {} as Record<number, { requests: number; tokens: number; cost: number }>);

    return Object.entries(grouped)
      .map(([timestamp, data]) => ({
        timestamp: parseInt(timestamp),
        value: data[metric],
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  public getCostProjection(days: number): {
    projectedCost: number;
    currentRate: number;
    confidence: 'low' | 'medium' | 'high';
  } {
    // Use last 7 days of data for projection
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentRecords = this.records.filter(r => r.timestamp >= weekAgo);

    if (recentRecords.length < 10) {
      return {
        projectedCost: 0,
        currentRate: 0,
        confidence: 'low',
      };
    }

    const weekCost = recentRecords.reduce((sum, r) => sum + r.cost, 0);
    const dailyRate = weekCost / 7;
    const projectedCost = dailyRate * days;

    const confidence: 'low' | 'medium' | 'high' =
      recentRecords.length > 100 ? 'high' :
      recentRecords.length > 50 ? 'medium' :
      'low';

    return {
      projectedCost,
      currentRate: dailyRate,
      confidence,
    };
  }

  private generateId(): string {
    return `usage_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Convenience method for wrapping AI calls
  public async trackAICall<T>(
    model: string,
    promptType: string,
    aiCall: () => Promise<{ result: T; inputTokens: number; outputTokens: number }>,
    userId?: string,
    metadata?: Record<string, any>
  ): Promise<T> {
    const startTime = Date.now();

    try {
      const { result, inputTokens, outputTokens } = await aiCall();
      const latency = Date.now() - startTime;

      this.trackUsage(
        model,
        promptType,
        inputTokens,
        outputTokens,
        latency,
        true,
        undefined,
        userId,
        metadata
      );

      return result;
    } catch (error) {
      const latency = Date.now() - startTime;
      this.trackUsage(
        model,
        promptType,
        0,
        0,
        latency,
        false,
        error instanceof Error ? error.message : 'Unknown error',
        userId,
        metadata
      );
      throw error;
    }
  }
}

export default AIUsageTracker;
