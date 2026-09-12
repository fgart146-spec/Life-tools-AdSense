/**
 * GA4 이벤트 전송 헬퍼.
 *
 * - 새 분석 도구를 도입하지 않는다. 이미 붙어 있는 GA4(gtag)만 사용한다.
 * - NEXT_PUBLIC_GA_ID가 없으면 스크립트 자체가 로드되지 않으므로 window.gtag는 undefined다.
 *   그 경우 조용히 아무것도 하지 않는다 (기능이 깨지면 안 된다).
 * - 개인정보나 사용자가 입력한 계산값은 절대 넘기지 않는다.
 */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', name, params);
  } catch {
    // 분석 실패가 화면 동작을 막지 않도록 삼킨다.
  }
}
