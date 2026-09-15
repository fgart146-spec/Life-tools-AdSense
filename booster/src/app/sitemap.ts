import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { dataAsOf, publishedGuides } from '@/data/product';

/**
 * 이 호스트 전용 사이트맵. 정식 호스트의 공개·색인 대상 URL 만 담는다.
 * 생활계산소 URL 이나 미공개 초안은 넣지 않는다. 수정일은 데이터 기준일·가이드 수정일이다.
 */
export const staticPaths = ['/', '/features/', '/pricing/', '/guide/', '/faq/', '/contact/'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const asOf = new Date(dataAsOf);
  const pages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: asOf,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
  const guidePages: MetadataRoute.Sitemap = publishedGuides().map((guide) => ({
    url: absoluteUrl(`/guide/${guide.slug}/`),
    lastModified: new Date(guide.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  return [...pages, ...guidePages];
}
