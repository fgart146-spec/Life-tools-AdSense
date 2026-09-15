import { siteConfig } from '@/config/site';

/**
 * 측정 이벤트. NEXT_PUBLIC_GA_ID 가 없으면 전부 무시된다 (스크립트도 로드하지 않는다).
 *
 * 이벤트 이름은 작업지시서 8장 그대로:
 *   trial_click     3일 체험 문의
 *   purchase_click  확인된 판매 페이지 이동
 *   contact_click   일반 문의
 *   pricing_view    요금 안내 조회
 *
 * 개인 식별정보·네이버 ID·문의 내용은 절대 담지 않는다. 버튼 클릭은 클릭일 뿐,
 * 체험 발급이나 구매 완료로 기록하지 않는다.
 */
export type AnalyticsEvent = 'trial_click' | 'purchase_click' | 'contact_click' | 'pricing_view';

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: Record<string, string>) => void;
  }
}

export const analyticsEnabled = Boolean(siteConfig.analytics.gaId);

export function trackEvent(name: AnalyticsEvent, params?: Record<string, string>): void {
  if (!analyticsEnabled || typeof window === 'undefined') return;
  try {
    window.gtag?.('event', name, params);
  } catch {
    // 측정 실패가 화면 동작을 막지 않게 한다.
  }
}
