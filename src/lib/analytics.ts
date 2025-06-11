
// Basic analytics tracking utility
export const trackPageView = (title: string) => {
  // Log page views to console for now
  console.log('Page view tracked:', title, window.location.pathname);
  
  // In a real implementation, you would send this data to your analytics service
  // Example: Google Analytics, Mixpanel, etc.
  
  // Update document title if provided
  if (title && title !== document.title) {
    document.title = title;
  }
};

// Additional analytics functions can be added here
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  console.log('Event tracked:', eventName, properties);
  // Send to analytics service
};
