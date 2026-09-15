'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { analyticsEnabled, trackEvent, type AnalyticsEvent } from '@/lib/analytics';

/**
 * GA4 로더. NEXT_PUBLIC_GA_ID 가 없으면 아무것도 렌더하지 않는다.
 * (생활계산소의 ID 를 복제하지 않는다 — 이 사이트 전용 속성이 확인될 때만 값을 넣는다.)
 */
export function Analytics() {
  const id = siteConfig.analytics.gaId;
  if (!id) return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`,
        }}
      />
    </>
  );
}

/** 페이지 조회 이벤트(pricing_view 등). 측정이 꺼져 있으면 아무 일도 하지 않는다. */
export function ViewPing({ event }: { event: AnalyticsEvent }) {
  useEffect(() => {
    if (analyticsEnabled) trackEvent(event);
  }, [event]);
  return null;
}
