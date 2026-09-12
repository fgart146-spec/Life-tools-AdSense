export {};

declare global {
  interface Window {
    /** Google AdSense 큐 */
    adsbygoogle?: Record<string, unknown>[];
    dataLayer?: unknown[];
    /** GA4. NEXT_PUBLIC_GA_ID가 없으면 스크립트가 로드되지 않아 undefined다. */
    gtag?: (
      command: 'event',
      eventName: string,
      params?: Record<string, string | number | boolean>,
    ) => void;
  }
}
