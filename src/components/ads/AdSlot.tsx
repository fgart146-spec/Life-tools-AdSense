'use client';

import { useEffect, useRef } from 'react';
import { siteConfig, type AdSlotName } from '@/config/site';

/**
 * AdSense 광고 슬롯.
 *
 * 원칙(MASTER_SPEC 19장):
 * - 클라이언트 ID나 슬롯 ID가 없으면 아무것도 렌더하지 않는다.
 *   (빈 박스나 '광고 자리' 표시는 심사에 불리하고 사용자에게도 방해가 된다.)
 * - 계산 버튼/결과 카드 바로 옆에 배치하지 않는다. 배치 위치는 ToolPage 템플릿이 통제한다.
 */
export function AdSlot({ name, className = '' }: { name: AdSlotName; className?: string }) {
  const client = siteConfig.ads.client;
  const slotId = siteConfig.ads.slots[name];
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || !slotId || pushed.current) return;
    pushed.current = true;
    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // 광고 로드 실패가 페이지 동작에 영향을 주지 않도록 무시한다.
    }
  }, [client, slotId]);

  if (!client || !slotId) return null;

  return (
    <div className={`my-10 border-y border-ink-200 py-4 ${className}`}>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
