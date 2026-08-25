import Script from 'next/script';
import { siteConfig } from '@/config/site';

/**
 * GA4. 측정 ID가 없으면 스크립트를 아예 로드하지 않는다.
 * (개발/프리뷰 환경에서 불필요한 third-party 요청과 CWV 저하를 막는다.)
 */
export function GoogleAnalytics() {
  const gaId = siteConfig.analytics.gaId;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
