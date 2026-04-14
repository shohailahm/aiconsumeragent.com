export type ZarazScope = 'page' | 'session' | 'persist'

export interface ZarazClient {
  track: (eventName: string, eventProperties?: Record<string, unknown>) => Promise<void> | void
  set: (key: string, value: unknown, options?: { scope?: ZarazScope }) => void
  debug?: (debugKey?: string) => void
}

declare global {
  interface Window {
    zaraz?: ZarazClient
  }
}

const RESERVED_EVENT_KEYS = new Set(['action', 'category', 'label', 'value', 'metadata'])

const normalizeValue = (value: unknown) => {
  if (value === null || value === undefined) return value
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value
  }

  return JSON.stringify(value)
}

export const getZaraz = () => {
  if (typeof window === 'undefined') return undefined
  return window.zaraz
}

export const buildZarazTrackProperties = (event: {
  category?: string
  label?: string
  value?: number
  metadata?: Record<string, unknown>
}) => {
  const hasWindow = typeof window !== 'undefined'
  const hasDocument = typeof document !== 'undefined'

  const properties: Record<string, unknown> = {
    page_path: hasWindow ? window.location.pathname : '',
    page_url: hasWindow ? window.location.href : '',
    page_referrer: hasDocument ? document.referrer : '',
    page_title: hasDocument ? document.title : '',
  }

  if (event.category) properties.category = event.category
  if (event.label) properties.label = event.label
  if (typeof event.value === 'number') properties.value = event.value

  for (const [key, rawValue] of Object.entries(event.metadata ?? {})) {
    const propertyName = RESERVED_EVENT_KEYS.has(key) ? `metadata_${key}` : key
    properties[propertyName] = normalizeValue(rawValue)
  }

  return properties
}

export const syncZarazContext = () => {
  if (typeof window === 'undefined') return false

  const zaraz = getZaraz()
  if (!zaraz) return false

  zaraz.set('site_name', 'AIConsumerAgent', { scope: 'page' })
  zaraz.set('page_path', window.location.pathname, { scope: 'page' })
  zaraz.set('page_url', window.location.href, { scope: 'page' })
  zaraz.set('page_referrer', document.referrer, { scope: 'page' })
  zaraz.set('page_title', document.title, { scope: 'page' })

  return true
}

export const trackWithZaraz = (eventName: string, properties: Record<string, unknown>) => {
  const zaraz = getZaraz()
  if (!zaraz?.track) return false

  void zaraz.track(eventName, properties)
  return true
}
