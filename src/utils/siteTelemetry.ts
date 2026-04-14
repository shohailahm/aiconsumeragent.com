import { trackEvent } from './analytics'
import { syncZarazContext } from './zaraz'

let telemetryBootstrapped = false
let monitoringInstalled = false
let historyPatched = false

const hasWindow = typeof window !== 'undefined'

const reportMonitoringEvent = (action: string, metadata: Record<string, unknown>) => {
  void trackEvent({
    action,
    category: 'monitoring',
    metadata,
  })
}

const bootstrapZarazContext = () => {
  if (!hasWindow) return

  if (syncZarazContext()) {
    return
  }

  let attempts = 0
  const maxAttempts = 40
  const intervalId = window.setInterval(() => {
    attempts += 1
    if (syncZarazContext() || attempts >= maxAttempts) {
      window.clearInterval(intervalId)
    }
  }, 250)

  window.addEventListener(
    'beforeunload',
    () => {
      window.clearInterval(intervalId)
    },
    { once: true }
  )
}

const patchHistoryListeners = () => {
  if (!hasWindow || historyPatched) return
  historyPatched = true

  const originalPushState = window.history.pushState.bind(window.history)
  const originalReplaceState = window.history.replaceState.bind(window.history)

  const syncAfterNavigation = () => {
    queueMicrotask(bootstrapZarazContext)
  }

  window.history.pushState = function pushState(...args) {
    const result = originalPushState(...args)
    syncAfterNavigation()
    return result
  }

  window.history.replaceState = function replaceState(...args) {
    const result = originalReplaceState(...args)
    syncAfterNavigation()
    return result
  }

  window.addEventListener('popstate', syncAfterNavigation)
}

const installRuntimeMonitoring = () => {
  if (!hasWindow || monitoringInstalled) return
  monitoringInstalled = true

  const reportLoadMetrics = () => {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (navigationEntry) {
      reportMonitoringEvent('page_load_timing', {
        domContentLoadedMs: Math.round(navigationEntry.domContentLoadedEventEnd),
        loadEventMs: Math.round(navigationEntry.loadEventEnd),
        responseStartMs: Math.round(navigationEntry.responseStart),
        transferSize: navigationEntry.transferSize,
      })
    }

    const paintEntries = performance.getEntriesByType('paint')
    const firstContentfulPaint = paintEntries.find((entry) => entry.name === 'first-contentful-paint')
    if (firstContentfulPaint) {
      reportMonitoringEvent('first_contentful_paint', {
        startTimeMs: Math.round(firstContentfulPaint.startTime),
      })
    }
  }

  if (document.readyState === 'complete') {
    queueMicrotask(reportLoadMetrics)
  } else {
    window.addEventListener('load', reportLoadMetrics, { once: true })
  }

  window.addEventListener('pageshow', bootstrapZarazContext)
  window.addEventListener('hashchange', bootstrapZarazContext)

  window.addEventListener('error', (event) => {
    reportMonitoringEvent('js_error', {
      column: event.colno,
      line: event.lineno,
      message: event.message,
      source: event.filename,
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason instanceof Error ? event.reason.message : String(event.reason ?? 'unknown')
    reportMonitoringEvent('unhandled_rejection', {
      message: reason,
    })
  })
}

export const bootstrapTelemetry = () => {
  if (!hasWindow || telemetryBootstrapped) return

  telemetryBootstrapped = true

  bootstrapZarazContext()
  patchHistoryListeners()

  if ((import.meta.env.VITE_ENABLE_RUNTIME_MONITORING ?? 'true') !== 'false') {
    installRuntimeMonitoring()
  }
}
