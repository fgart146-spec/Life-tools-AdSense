import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/config/site';

/**
 * 이 호스트 전용 robots.txt. 생활계산소의 robots.txt 와 무관하다.
 * - 운영: 전체 허용 + 사이트맵 주소.
 * - 미리보기/개발: 전체 차단. (색인 방지는 메타 noindex 와 X-Robots-Tag 헤더가 함께 담당한다.)
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.isIndexable) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.productionUrl,
  };
}
