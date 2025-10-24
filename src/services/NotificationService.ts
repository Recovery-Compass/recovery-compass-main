/**
 * Notification Service
 * Multi-channel notification system for compliance alerts and critical events
 * Supports Email, Slack, Telegram, and Webhooks
 * Inspired by power user patterns for real-time alerting
 */

export type NotificationChannel = 'email' | 'slack' | 'telegram' | 'webhook' | 'push';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';
export type NotificationType = 'compliance' | 'performance' | 'security' | 'engagement' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  data?: Record<string, any>;
  channels: NotificationChannel[];
  timestamp: number;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: number;
}

export interface NotificationConfig {
  enabled: boolean;
  channels: {
    email?: {
      enabled: boolean;
      recipients: string[];
      smtpConfig?: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
          user: string;
          pass: string;
        };
      };
    };
    slack?: {
      enabled: boolean;
      webhookUrl: string;
      channel?: string;
      username?: string;
      iconEmoji?: string;
    };
    telegram?: {
      enabled: boolean;
      botToken: string;
      chatIds: string[];
    };
    webhook?: {
      enabled: boolean;
      urls: string[];
      headers?: Record<string, string>;
    };
    push?: {
      enabled: boolean;
      vapidPublicKey?: string;
      vapidPrivateKey?: string;
    };
  };
  rules: NotificationRule[];
}

export interface NotificationRule {
  id: string;
  name: string;
  enabled: boolean;
  conditions: {
    types?: NotificationType[];
    priorities?: NotificationPriority[];
    customConditions?: Array<{
      field: string;
      operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
      value: any;
    }>;
  };
  actions: {
    channels: NotificationChannel[];
    throttle?: {
      count: number;
      windowMs: number;
    };
    escalation?: {
      delayMs: number;
      escalateTo: NotificationChannel[];
    };
  };
}

class NotificationService {
  private static instance: NotificationService;
  private config: NotificationConfig;
  private notifications: Map<string, Notification> = new Map();
  private notificationHistory: Notification[] = [];
  private throttleTracking: Map<string, { count: number; firstSent: number }> = new Map();
  private maxHistorySize = 1000;

  private constructor() {
    this.config = this.loadConfig();
    this.initializeService();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private loadConfig(): NotificationConfig {
    const defaultConfig: NotificationConfig = {
      enabled: true,
      channels: {
        email: {
          enabled: false,
          recipients: [],
        },
        slack: {
          enabled: false,
          webhookUrl: '',
        },
        telegram: {
          enabled: false,
          botToken: '',
          chatIds: [],
        },
        webhook: {
          enabled: false,
          urls: [],
        },
        push: {
          enabled: false,
        },
      },
      rules: [
        {
          id: 'critical-compliance',
          name: 'Critical Compliance Alerts',
          enabled: true,
          conditions: {
            types: ['compliance'],
            priorities: ['critical', 'high'],
          },
          actions: {
            channels: ['email', 'slack', 'telegram'],
            throttle: {
              count: 5,
              windowMs: 300000, // 5 minutes
            },
          },
        },
        {
          id: 'performance-degradation',
          name: 'Performance Issues',
          enabled: true,
          conditions: {
            types: ['performance'],
            priorities: ['high', 'critical'],
          },
          actions: {
            channels: ['slack', 'webhook'],
            throttle: {
              count: 3,
              windowMs: 600000, // 10 minutes
            },
          },
        },
        {
          id: 'security-alerts',
          name: 'Security Alerts',
          enabled: true,
          conditions: {
            types: ['security'],
          },
          actions: {
            channels: ['email', 'slack', 'telegram'],
            escalation: {
              delayMs: 300000, // 5 minutes
              escalateTo: ['email', 'telegram'],
            },
          },
        },
      ],
    };

    try {
      const stored = localStorage.getItem('notification_config');
      if (stored) {
        return { ...defaultConfig, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load notification config:', error);
    }

    return defaultConfig;
  }

  private saveConfig(): void {
    try {
      localStorage.setItem('notification_config', JSON.stringify(this.config));
    } catch (error) {
      console.warn('Failed to save notification config:', error);
    }
  }

  private initializeService(): void {
    // Load notification history from storage
    try {
      const stored = localStorage.getItem('notification_history');
      if (stored) {
        this.notificationHistory = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load notification history:', error);
    }

    // Set up periodic cleanup
    setInterval(() => {
      this.cleanupOldNotifications();
    }, 3600000); // Every hour
  }

  private cleanupOldNotifications(): void {
    const cutoff = Date.now() - 86400000 * 7; // 7 days ago

    // Clean up history
    this.notificationHistory = this.notificationHistory.filter(
      n => n.timestamp > cutoff
    );

    // Keep only most recent if exceeding max size
    if (this.notificationHistory.length > this.maxHistorySize) {
      this.notificationHistory = this.notificationHistory
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, this.maxHistorySize);
    }

    // Save cleaned history
    this.saveHistory();

    // Clean up throttle tracking
    this.throttleTracking.forEach((value, key) => {
      if (Date.now() - value.firstSent > 3600000) { // 1 hour
        this.throttleTracking.delete(key);
      }
    });
  }

  private saveHistory(): void {
    try {
      localStorage.setItem('notification_history', JSON.stringify(this.notificationHistory));
    } catch (error) {
      console.warn('Failed to save notification history:', error);
    }
  }

  public async send(
    type: NotificationType,
    priority: NotificationPriority,
    title: string,
    message: string,
    data?: Record<string, any>,
    channels?: NotificationChannel[]
  ): Promise<Notification> {
    const notification: Notification = {
      id: this.generateId(),
      type,
      priority,
      title,
      message,
      data,
      channels: channels || this.getDefaultChannels(type, priority),
      timestamp: Date.now(),
      acknowledged: false,
    };

    // Store notification
    this.notifications.set(notification.id, notification);
    this.notificationHistory.unshift(notification);
    this.saveHistory();

    // Apply rules and send
    if (this.config.enabled) {
      await this.processNotification(notification);
    }

    return notification;
  }

  private async processNotification(notification: Notification): Promise<void> {
    // Find matching rules
    const matchingRules = this.config.rules.filter(rule =>
      this.ruleMatches(rule, notification)
    );

    for (const rule of matchingRules) {
      if (!rule.enabled) continue;

      // Check throttle
      if (rule.actions.throttle && this.isThrottled(rule.id, rule.actions.throttle)) {
        console.log(`Notification throttled for rule: ${rule.name}`);
        continue;
      }

      // Send to channels
      const channels = rule.actions.channels.length > 0
        ? rule.actions.channels
        : notification.channels;

      await this.sendToChannels(notification, channels);

      // Track for throttling
      if (rule.actions.throttle) {
        this.trackThrottle(rule.id);
      }

      // Set up escalation if configured
      if (rule.actions.escalation) {
        this.scheduleEscalation(notification, rule.actions.escalation);
      }
    }
  }

  private ruleMatches(rule: NotificationRule, notification: Notification): boolean {
    const { conditions } = rule;

    // Check type
    if (conditions.types && !conditions.types.includes(notification.type)) {
      return false;
    }

    // Check priority
    if (conditions.priorities && !conditions.priorities.includes(notification.priority)) {
      return false;
    }

    // Check custom conditions
    if (conditions.customConditions && notification.data) {
      for (const condition of conditions.customConditions) {
        const value = notification.data[condition.field];
        if (!this.evaluateCondition(value, condition.operator, condition.value)) {
          return false;
        }
      }
    }

    return true;
  }

  private evaluateCondition(value: any, operator: string, expected: any): boolean {
    switch (operator) {
      case 'equals':
        return value === expected;
      case 'contains':
        return String(value).includes(String(expected));
      case 'greaterThan':
        return Number(value) > Number(expected);
      case 'lessThan':
        return Number(value) < Number(expected);
      default:
        return false;
    }
  }

  private isThrottled(ruleId: string, throttle: { count: number; windowMs: number }): boolean {
    const tracking = this.throttleTracking.get(ruleId);
    if (!tracking) return false;

    const now = Date.now();
    const windowExpired = now - tracking.firstSent > throttle.windowMs;

    if (windowExpired) {
      this.throttleTracking.delete(ruleId);
      return false;
    }

    return tracking.count >= throttle.count;
  }

  private trackThrottle(ruleId: string): void {
    const tracking = this.throttleTracking.get(ruleId);
    const now = Date.now();

    if (tracking) {
      tracking.count++;
    } else {
      this.throttleTracking.set(ruleId, { count: 1, firstSent: now });
    }
  }

  private scheduleEscalation(
    notification: Notification,
    escalation: { delayMs: number; escalateTo: NotificationChannel[] }
  ): void {
    setTimeout(async () => {
      // Check if notification was acknowledged
      const current = this.notifications.get(notification.id);
      if (current && !current.acknowledged) {
        console.log(`Escalating notification: ${notification.title}`);
        await this.sendToChannels(notification, escalation.escalateTo);
      }
    }, escalation.delayMs);
  }

  private async sendToChannels(
    notification: Notification,
    channels: NotificationChannel[]
  ): Promise<void> {
    const promises = channels.map(channel =>
      this.sendToChannel(notification, channel)
    );
    await Promise.allSettled(promises);
  }

  private async sendToChannel(
    notification: Notification,
    channel: NotificationChannel
  ): Promise<void> {
    try {
      switch (channel) {
        case 'email':
          await this.sendEmail(notification);
          break;
        case 'slack':
          await this.sendSlack(notification);
          break;
        case 'telegram':
          await this.sendTelegram(notification);
          break;
        case 'webhook':
          await this.sendWebhook(notification);
          break;
        case 'push':
          await this.sendPush(notification);
          break;
      }
    } catch (error) {
      console.error(`Failed to send notification via ${channel}:`, error);
    }
  }

  private async sendEmail(notification: Notification): Promise<void> {
    const emailConfig = this.config.channels.email;
    if (!emailConfig?.enabled || !emailConfig.recipients.length) {
      return;
    }

    console.log('[Email] Sending notification:', {
      to: emailConfig.recipients,
      subject: `[${notification.priority.toUpperCase()}] ${notification.title}`,
      body: notification.message,
    });

    // In production, integrate with email service (SendGrid, AWS SES, etc.)
    // For now, we'll use Make.com webhook if configured
    if (this.config.channels.webhook?.enabled) {
      await this.sendWebhook({
        ...notification,
        data: {
          ...notification.data,
          channel: 'email',
          recipients: emailConfig.recipients,
        },
      });
    }
  }

  private async sendSlack(notification: Notification): Promise<void> {
    const slackConfig = this.config.channels.slack;
    if (!slackConfig?.enabled || !slackConfig.webhookUrl) {
      return;
    }

    const color = {
      low: '#36a64f',
      medium: '#ffa500',
      high: '#ff6b6b',
      critical: '#dc3545',
    }[notification.priority];

    const payload = {
      channel: slackConfig.channel,
      username: slackConfig.username || 'Recovery Compass',
      icon_emoji: slackConfig.iconEmoji || ':compass:',
      attachments: [
        {
          color,
          title: notification.title,
          text: notification.message,
          fields: notification.data ? Object.entries(notification.data).map(([key, value]) => ({
            title: key,
            value: String(value),
            short: true,
          })) : [],
          footer: 'Recovery Compass',
          ts: Math.floor(notification.timestamp / 1000),
        },
      ],
    };

    const response = await fetch(slackConfig.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }
  }

  private async sendTelegram(notification: Notification): Promise<void> {
    const telegramConfig = this.config.channels.telegram;
    if (!telegramConfig?.enabled || !telegramConfig.botToken || !telegramConfig.chatIds.length) {
      return;
    }

    const priorityEmoji = {
      low: '\u2139\uFE0F',
      medium: '\u26A0\uFE0F',
      high: '\u{1F6A8}',
      critical: '\u{1F525}',
    }[notification.priority];

    const text = `${priorityEmoji} *${notification.title}*\n\n${notification.message}${
      notification.data ? '\n\n' + Object.entries(notification.data)
        .map(([key, value]) => `\u2022 ${key}: ${value}`)
        .join('\n') : ''
    }`;

    for (const chatId of telegramConfig.chatIds) {
      const response = await fetch(
        `https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'Markdown',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.statusText}`);
      }
    }
  }

  private async sendWebhook(notification: Notification): Promise<void> {
    const webhookConfig = this.config.channels.webhook;
    if (!webhookConfig?.enabled || !webhookConfig.urls.length) {
      return;
    }

    const payload = {
      id: notification.id,
      type: notification.type,
      priority: notification.priority,
      title: notification.title,
      message: notification.message,
      data: notification.data,
      timestamp: notification.timestamp,
    };

    for (const url of webhookConfig.urls) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...webhookConfig.headers,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.statusText}`);
      }
    }
  }

  private async sendPush(notification: Notification): Promise<void> {
    const pushConfig = this.config.channels.push;
    if (!pushConfig?.enabled || !('Notification' in window)) {
      return;
    }

    if (Notification.permission !== 'granted') {
      return;
    }

    const priorityIcon = {
      low: '/icons/info.png',
      medium: '/icons/warning.png',
      high: '/icons/alert.png',
      critical: '/icons/critical.png',
    }[notification.priority];

    new Notification(notification.title, {
      body: notification.message,
      icon: priorityIcon || '/logo.png',
      badge: '/badge.png',
      tag: notification.id,
      requireInteraction: notification.priority === 'critical',
    });
  }

  private getDefaultChannels(
    type: NotificationType,
    priority: NotificationPriority
  ): NotificationChannel[] {
    if (priority === 'critical') {
      return ['email', 'slack', 'telegram', 'push'];
    } else if (priority === 'high') {
      return ['slack', 'push'];
    } else if (priority === 'medium') {
      return ['push'];
    }
    return [];
  }

  private generateId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public API methods

  public acknowledge(notificationId: string, acknowledgedBy: string): void {
    const notification = this.notifications.get(notificationId);
    if (notification) {
      notification.acknowledged = true;
      notification.acknowledgedBy = acknowledgedBy;
      notification.acknowledgedAt = Date.now();
      this.saveHistory();
    }
  }

  public getNotifications(filter?: {
    types?: NotificationType[];
    priorities?: NotificationPriority[];
    acknowledged?: boolean;
    since?: number;
  }): Notification[] {
    let notifications = Array.from(this.notificationHistory);

    if (filter) {
      if (filter.types) {
        notifications = notifications.filter(n => filter.types!.includes(n.type));
      }
      if (filter.priorities) {
        notifications = notifications.filter(n => filter.priorities!.includes(n.priority));
      }
      if (filter.acknowledged !== undefined) {
        notifications = notifications.filter(n => n.acknowledged === filter.acknowledged);
      }
      if (filter.since) {
        notifications = notifications.filter(n => n.timestamp >= filter.since!);
      }
    }

    return notifications.sort((a, b) => b.timestamp - a.timestamp);
  }

  public getUnacknowledgedCount(): number {
    return this.notificationHistory.filter(n => !n.acknowledged).length;
  }

  public updateConfig(config: Partial<NotificationConfig>): void {
    this.config = { ...this.config, ...config };
    this.saveConfig();
  }

  public getConfig(): NotificationConfig {
    return { ...this.config };
  }

  public testNotification(channel: NotificationChannel): Promise<void> {
    return this.sendToChannel(
      {
        id: 'test',
        type: 'system',
        priority: 'low',
        title: 'Test Notification',
        message: 'This is a test notification from Recovery Compass',
        channels: [channel],
        timestamp: Date.now(),
        acknowledged: false,
      },
      channel
    );
  }

  public async requestPushPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('Push notifications not supported');
    }

    return await Notification.requestPermission();
  }

  // Convenience methods for common notifications

  public sendComplianceAlert(title: string, message: string, data?: Record<string, any>): Promise<Notification> {
    return this.send('compliance', 'high', title, message, data);
  }

  public sendPerformanceWarning(title: string, message: string, data?: Record<string, any>): Promise<Notification> {
    return this.send('performance', 'medium', title, message, data);
  }

  public sendSecurityAlert(title: string, message: string, data?: Record<string, any>): Promise<Notification> {
    return this.send('security', 'critical', title, message, data);
  }

  public sendEngagementNotification(title: string, message: string, data?: Record<string, any>): Promise<Notification> {
    return this.send('engagement', 'low', title, message, data);
  }
}

export default NotificationService;
