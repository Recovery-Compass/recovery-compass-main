
// Enhanced analytics service with privacy compliance and launch-ready features
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
  userId?: string;
  sessionId?: string;
}

interface PageViewData {
  title: string;
  path: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

class AnalyticsService {
  private isEnabled: boolean;
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private userId: string | null = null;

  constructor() {
    this.isEnabled = this.shouldEnableAnalytics();
    this.sessionId = this.generateSessionId();
    this.initializeAnalytics();
  }

  private shouldEnableAnalytics(): boolean {
    // Check for Do Not Track header
    if (navigator.doNotTrack === '1') {
      return false;
    }

    // Check for consent (you can extend this with a proper consent management system)
    const consent = localStorage.getItem('analytics_consent');
    if (consent === 'false') {
      return false;
    }

    // Enable in production, disable in development unless explicitly enabled
    if (import.meta.env.DEV && !import.meta.env.VITE_ENABLE_DEV_ANALYTICS) {
      return false;
    }

    return true;
  }

  private generateSessionId(): string {
    // Use cryptographically secure random values for session ID
    const array = new Uint8Array(12);
    window.crypto.getRandomValues(array);
    const randomHex = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    return `session_${Date.now()}_${randomHex}`;
  }

  private initializeAnalytics(): void {
    if (!this.isEnabled) return;

    // Extract UTM parameters for campaign tracking
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_content: urlParams.get('utm_content'),
      utm_term: urlParams.get('utm_term'),
    };

    // Store UTM data for session
    if (Object.values(utmData).some(val => val !== null)) {
      sessionStorage.setItem('utm_data', JSON.stringify(utmData));
    }
  }

  private getUTMData(): Record<string, string | null> {
    try {
      const stored = sessionStorage.getItem('utm_data');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  trackPageView(title: string, path?: string): void {
    const currentPath = path || window.location.pathname;
    
    if (!this.isEnabled) {
      if (import.meta.env.DEV) {
        console.log('📊 Analytics disabled - Page view:', title, currentPath);
      }
      return;
    }

    try {
      const utmData = this.getUTMData();
      const pageViewData: PageViewData = {
        title,
        path: currentPath,
        referrer: document.referrer,
        ...utmData,
      };

      const event: AnalyticsEvent = {
        name: 'page_view',
        properties: {
          ...pageViewData,
          screen_resolution: `${screen.width}x${screen.height}`,
          viewport_size: `${window.innerWidth}x${window.innerHeight}`,
          user_agent: navigator.userAgent,
          language: navigator.language,
        },
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
        userId: this.userId,
      };

      this.events.push(event);
      
      // Update document title
      if (title && title !== document.title) {
        document.title = title;
      }

      // Special tracking for Devansh campaign
      if (utmData.utm_source === 'devansh') {
        this.trackEvent('devansh_referral', {
          medium: utmData.utm_medium,
          campaign: utmData.utm_campaign,
        });
      }

      if (import.meta.env.DEV) {
        console.log('📊 Page view tracked:', event);
      }
      
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  trackEvent(eventName: string, properties?: Record<string, any>): void {
    if (!this.isEnabled) {
      if (import.meta.env.DEV) {
        console.log('📊 Analytics disabled - Event:', eventName, properties);
      }
      return;
    }

    try {
      const event: AnalyticsEvent = {
        name: eventName,
        properties: {
          ...properties,
          path: window.location.pathname,
          ...this.getUTMData(),
        },
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
        userId: this.userId,
      };

      this.events.push(event);
      
      if (import.meta.env.DEV) {
        console.log('📊 Event tracked:', event);
      }
      
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  // Track business-critical events for Recovery Compass
  trackBusinessEvent(eventType: 'journey_started' | 'investor_page_view' | 'partnership_inquiry' | 'demo_request', data?: Record<string, any>): void {
    this.trackEvent(`business_${eventType}`, {
      ...data,
      business_critical: true,
    });
  }

  // Set user ID for tracking (privacy-compliant)
  setUserId(userId: string): void {
    this.userId = userId;
  }

  // Get analytics data for debugging
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  // Clear stored events
  clearEvents(): void {
    this.events = [];
  }

  // Get session analytics summary
  getSessionSummary(): { sessionId: string; eventCount: number; pageViews: number } {
    const pageViews = this.events.filter(e => e.name === 'page_view').length;
    return {
      sessionId: this.sessionId,
      eventCount: this.events.length,
      pageViews,
    };
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

export const trackBusinessEvent = (eventType: 'journey_started' | 'investor_page_view' | 'partnership_inquiry' | 'demo_request', data?: Record<string, any>) => {
  analytics.trackBusinessEvent(eventType, data);
};

export const setUserId = (userId: string) => {
  analytics.setUserId(userId);
};

export default analytics;
