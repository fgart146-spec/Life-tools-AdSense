import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          // Next.js App Router 프리페치 페이로드(text/x-component, 페이지당 ~49KB).
          // Googlebot이 JS 렌더링 중 링크마다 이걸 가져가 크롤 요청의 85%를 여기에 썼다
          // (Search Console 크롤링 통계, 2026-09). 색인에는 HTML만 필요하므로 차단한다.
          '/*?_rsc=',
          '/*&_rsc=',
        ],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  };
}
