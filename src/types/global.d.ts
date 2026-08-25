export {};

declare global {
  interface Window {
    /** Google AdSense 큐 */
    adsbygoogle?: Record<string, unknown>[];
    dataLayer?: unknown[];
  }
}
