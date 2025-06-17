// Analytics tracking utility with error handling and privacy considerations
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

class AnalyticsService {
  private isEnabled: boolean;
  private events: AnalyticsEvent[] = [];

  constructor() {
    // Check if analytics should be enabled (respecting user privacy)
    this.isEnabled = this.shouldEnableAnalytics();
  }

  private shouldEnableAnalytics(): boolean {
    // Check for Do Not Track header
    if (navigator.doNotTrack === '1') {
      return false;
    }

    // Check if we're in development mode
    if (import.meta.env.DEV) {
      return false; // Disable in development
    }

    return true;
  }

  trackPageView(title: string, path?: string): void {
    if (!this.isEnabled) {
      console.log('Analytics disabled - Page view:', title, path || window.location.pathname);
      return;
    }

    try {
      const event: AnalyticsEvent = {
        name: 'page_view',
        properties: {
          title,
          path: path || window.location.pathname,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        },
        timestamp: new Date().toISOString(),
      };

      this.events.push(event);
      
      // Update document title if provided
      if (title && title !== document.title) {
        document.title = title;
      }

      // In production, you would send this to your analytics service
      console.log('Page view tracked:', event);
      
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  trackEvent(eventName: string, properties?: Record<string, any>): void {
    if (!this.isEnabled) {
      console.log('Analytics disabled - Event:', eventName, properties);
      return;
    }

    try {
      const event: AnalyticsEvent = {
        name: eventName,
        properties: {
          ...properties,
          path: window.location.pathname,
        },
        timestamp: new Date().toISOString(),
      };

      this.events.push(event);
      
      // In production, you would send this to your analytics service
      console.log('Event tracked:', event);
      
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  // Get stored events (useful for debugging or batch sending)
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  // Clear stored events
  clearEvents(): void {
    this.events = [];
  }
}

// Create singleton instance
const analytics = new AnalyticsService();

// Export convenience functions
export const trackPageView = (title: string, path?: string) => {
  analytics.trackPageView(title, path);
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  analytics.trackEvent(eventName, properties);
};

export default analytics;