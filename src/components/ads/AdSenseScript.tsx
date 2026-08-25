import Script from 'next/script';
import { siteConfig } from '@/config/site';

/** AdSense 로더. 게시자 ID가 없으면 스크립트를 로드하지 않는다. */
export function AdSenseScript() {
  const client = siteConfig.ads.client;
  if (!client) return null;

  return (
    <Script
      id="adsbygoogle-init"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
