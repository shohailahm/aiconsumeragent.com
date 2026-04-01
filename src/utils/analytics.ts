/**
 * Cloudflare Analytics Utility
 * 
 * Provides methods to track user interactions and performance metrics.
 * Events are sent to the /api/track endpoint and recorded in Cloudflare Analytics Engine.
 */

export interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export const trackEvent = async (event: AnalyticsEvent) => {
  try {
    // In production, this sends to our Cloudflare Pages Function
    // In development, we log to console
    if ((import.meta as any).env?.DEV) {
      console.log('[Analytics]', event);
    }

    const response = await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
        timestamp: Date.now(),
        url: window.location.href,
        referrer: document.referrer,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send tracking data');
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
};

/**
 * Higher-order function to wrap event handlers with tracking
 */
export const withTracking = <T extends (...args: any[]) => any>(
  handler: T,
  event: AnalyticsEvent
) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    trackEvent(event);
    return handler(...args);
  };
};
