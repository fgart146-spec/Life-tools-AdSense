import { siteConfig } from '@/config/site';

/**
 * AdSense 로더. 게시자 ID가 없으면 스크립트를 로드하지 않는다.
 *
 * ⚠ next/script(afterInteractive)를 쓰지 않는다.
 *   afterInteractive는 하이드레이션 후 클라이언트에서 태그를 꽂기 때문에
 *   서버가 내려주는 HTML에는 preload 힌트만 남고 <script> 태그가 없다.
 *   AdSense 사이트 확인 크롤러는 HTML의 <head> 안에서 이 스크립트를 찾으므로
 *   그 상태로는 "사이트를 확인할 수 없습니다"로 실패한다.
 *
 *   React 19는 async 속성이 붙은 <script src>를 <head>로 자동 호이스팅하고
 *   중복 제거까지 해주므로, 평범한 <script> 엘리먼트로 렌더한다.
 *   async라서 렌더를 막지 않는다.
 */
export function AdSenseScript() {
  const client = siteConfig.ads.client;
  if (!client) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
