import type { NextConfig } from 'next';

/**
 * 사이트 절대 URL 결정 순서
 *   1. NEXT_PUBLIC_SITE_URL      — 직접 지정한 도메인 (최우선)
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel이 주는 운영 도메인(배포마다 바뀌지 않음)
 *   3. localhost                 — 로컬 개발
 *
 * next.config의 env로 넘겨 서버·클라이언트 번들에 같은 값이 박히게 한다.
 * (서버에서만 읽으면 클라이언트에서 undefined가 되어 하이드레이션이 어긋난다.)
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // 후행 슬래시 없음 = canonical/sitemap과 URL 형태를 하나로 고정한다.
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl.replace(/\/+$/, ''),
  },
  experimental: {
    // 로케일 세그먼트 밖(예: /존재하지않는경로)의 404를 자체 문서로 렌더한다.
    globalNotFound: true,
  },
  async redirects() {
    return [
      // 루트 진입은 기본 로케일로 보낸다.
      // 미들웨어를 쓰지 않기 위해 라우팅 레이어 리다이렉트를 사용한다(함수 실행 비용 0).
      { source: '/', destination: '/ko', permanent: false },
      // slug 변경 시 여기에 301을 누적한다.
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
