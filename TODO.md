# Cloudflare Zaraz Tracking TODO

## Scope

Implement Zaraz-based tracking and lightweight browser monitoring for `aiconsumeragent.com`, while keeping the existing Cloudflare Analytics Engine mirror as a fallback and internal data source.

## Assumptions

- Zaraz is enabled in the Cloudflare dashboard for this zone.
- Cloudflare auto-injects the Zaraz client script, so the app only needs to send events through the Web API.
- The existing `/api/track` endpoint stays in place to preserve the Analytics Engine pipeline.

## Research Notes

- Cloudflare Zaraz Web API exposes `zaraz.track(...)` for browser events.
- Cloudflare recommends using Zaraz’s debug mode when troubleshooting tracking.
- Because the app is a SPA, the app should also set page context from the client so events carry the current route information.

## Configuration

- `VITE_ENABLE_RUNTIME_MONITORING` disables browser error and timing collection when set to `false`.

## Progress

- [x] Inspect the current codebase and identify the existing tracking surface.
- [x] Research the Cloudflare Zaraz Web API and debugging guidance.
- [x] Replace the previous generic bootstrap with a Zaraz-first telemetry bridge.
- [x] Wire the telemetry bootstrap into the app so it runs once at startup.
- [x] Route product events through Zaraz when available and mirror them to `/api/track`.
- [x] Improve runtime monitoring coverage for page timing and browser errors.
- [x] Track page views centrally for route changes.
- [x] Track all primary CTA clicks across navigation, footer, hero, pricing, downloads, and the demo modal.
- [x] Remove the tag-manager assumption from the HTML shell and comments.
- [x] Validate the build after the Zaraz changes.

## Implementation Log

- 2026-04-14: Started audit, confirmed the code already had a Cloudflare tracking pipeline, and initially explored a generic tag-manager approach.
- 2026-04-14: Reworked the implementation around Cloudflare Zaraz Web API tracking, added a Zaraz event bridge, and kept the existing Analytics Engine mirror.
- 2026-04-14: Added centralized route page views and CTA click tracking across the main site interactions.
- 2026-04-14: Verified the production build after the Zaraz rewrite.
- 2026-04-14: Fixed page view overcounting by ignoring hash-only navigation changes in route telemetry.
