/**
 * Cloudflare Zaraz + Analytics Engine Utility
 *
 * Events are sent to Zaraz when available and mirrored to the
 * existing /api/track endpoint for Cloudflare Analytics Engine.
 */

import { buildZarazTrackProperties, trackWithZaraz } from './zaraz'

export interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

export const trackPageView = (label: string, metadata?: Record<string, unknown>) =>
  trackEvent({
    action: 'page_view',
    category: 'engagement',
    label,
    metadata,
  })

export const trackCtaClick = (label: string, category = 'cta', metadata?: Record<string, unknown>) =>
  trackEvent({
    action: 'cta_click',
    category,
    label,
    metadata,
  })

export const trackEvent = async (event: AnalyticsEvent) => {
  try {
    const isDev = Boolean(import.meta.env?.DEV)

    // In development, keep the signal visible in the console and skip the network hop.
    if (isDev) {
      console.log('[Analytics]', event);
      return;
    }

    const zarazTracked = trackWithZaraz(event.action, buildZarazTrackProperties(event))

    const payload = JSON.stringify({
      ...event,
      timestamp: Date.now(),
      url: window.location.href,
      referrer: document.referrer,
    })

    if (!zarazTracked && !navigator.sendBeacon) {
      console.warn('[Analytics] Zaraz is not available yet; falling back to fetch only.')
    }

    if (navigator.sendBeacon) {
      const delivered = navigator.sendBeacon(
        '/api/track',
        new Blob([payload], { type: 'application/json' })
      )

      if (delivered) {
        return
      }
    }

    const response = await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      keepalive: true,
      body: payload,
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
