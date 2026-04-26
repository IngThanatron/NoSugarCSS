// Thin wrapper around Plausible's `window.plausible` custom event API.
// No-ops silently when Plausible is not loaded (dev, localhost, script removed).

type PlausibleEvent =
  | 'theme_view'        // user navigates to /themes/:id
  | 'buy_click'         // user clicks a Ko-fi buy button
  | 'customizer_open'   // user navigates to /customize
  | 'css_copied'        // user copies generated CSS
  | 'license_verified'  // user activates a valid license key

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string | number> }) => void
  }
}

export function track(event: PlausibleEvent, props?: Record<string, string | number>) {
  window.plausible?.(event, props ? { props } : undefined)
}
