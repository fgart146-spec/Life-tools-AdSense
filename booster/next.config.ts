import type { NextConfig } from 'next';

/**
 * 이웃부스터 홈페이지 — 생활계산소(루트 앱)와 별개로 빌드·배포되는 독립 Next.js 앱.
 *
 * 배포 환경 판정
 *   SITE_ENV 를 직접 주면 그 값(검증 스크립트가 production/preview 빌드를 각각 만들 때 사용).
 *   없으면 Vercel이 넣어주는 VERCEL_ENV 로 판정한다.
 *   production 이 아니면 X-Robots-Tag: noindex 헤더 + 메타 noindex + robots.txt Disallow 를 건다.
 *   (robots.txt 차단만으로는 색인 방지가 보장되지 않으므로 세 가지를 같이 쓴다.)
 *
 * canonical·OG·사이트맵 주소는 여기 env 가 아니라 src/config/site.ts 의 productionUrl 상수에서만
 * 만든다. 미리보기 주소나 요청 Host 가 정식 주소로 새어 나가지 않게 하기 위함이다.
 */
const vercelEnv = process.env.VERCEL_ENV?.trim();
const siteEnv =
  process.env.SITE_ENV?.trim() ||
  (vercelEnv === 'production' ? 'production' : vercelEnv ? 'preview' : 'development');

const isProduction = siteEnv === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // 같은 저장소 루트에 생활계산소의 package-lock.json 이 있어 Turbopack 이 워크스페이스 루트를
  // 저장소 최상위로 잡고 루트 앱의 src/middleware.ts 까지 컴파일하려 든다. 루트를 이 앱으로 고정한다.
  turbopack: {
    root: typeof __dirname === 'string' ? __dirname : process.cwd(),
  },
  // 프롬프트의 정식 주소 표기(/features/ 등)에 맞춰 후행 슬래시를 정식 형태로 고정한다.
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_SITE_ENV: siteEnv,
  },
  async headers() {
    const common = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    ];
    const robots = isProduction ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
    return [{ source: '/:path*', headers: [...common, ...robots] }];
  },
};

export default nextConfig;
