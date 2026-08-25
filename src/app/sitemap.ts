import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { localeMeta, localePath, locales, defaultLocale, type Locale } from '@/lib/i18n/config';
import { categoryPath, orderedCategories } from '@/lib/tools/categories';
import { toolDefinitions } from '@/lib/tools/definitions';
import { guideIndex, guidePath } from '@/lib/guides';
import { staticPages } from '@/lib/nav';

interface SitemapPage {
  /** 로케일 접두사를 제외한 경로 */
  path: string;
  /** 실제로 존재하는 로케일 */
  pageLocales: readonly Locale[];
  lastModified?: string;
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority?: number;
}

/**
 * 사이트맵은 레지스트리에서 자동 생성한다.
 * 존재하지 않는 페이지가 들어가지 않도록 '실제 라우트가 생성되는 조건'과 동일하게 필터링한다.
 */
function collectPages(): SitemapPage[] {
  const pages: SitemapPage[] = [
    { path: '/', pageLocales: locales, changeFrequency: 'weekly', priority: 1 },
  ];

  const publishedTools = toolDefinitions.filter((tool) => tool.status === 'published');
  if (publishedTools.length > 0) {
    pages.push({
      path: '/tools',
      pageLocales: locales,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
    for (const category of orderedCategories) {
      pages.push({
        path: categoryPath(category),
        pageLocales: locales,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
    for (const tool of publishedTools) {
      pages.push({
        path: `/${tool.slug}`,
        pageLocales: tool.locales,
        lastModified: tool.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    }
  }

  const publishedGuideList = guideIndex.filter((guide) => guide.status === 'published');
  if (publishedGuideList.length > 0) {
    pages.push({
      path: '/guide',
      pageLocales: locales,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
    for (const guide of publishedGuideList) {
      pages.push({
        path: guidePath(guide.slug),
        pageLocales: guide.locales,
        lastModified: guide.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  for (const page of staticPages) {
    pages.push({
      path: page.path,
      pageLocales: locales,
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  }

  return pages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of collectPages()) {
    const languages: Record<string, string> = {};
    for (const locale of page.pageLocales) {
      languages[localeMeta[locale].htmlLang] = absoluteUrl(localePath(locale, page.path));
    }
    const fallback = page.pageLocales.includes(defaultLocale)
      ? defaultLocale
      : page.pageLocales[0];
    if (fallback) {
      languages['x-default'] = absoluteUrl(localePath(fallback, page.path));
    }

    for (const locale of page.pageLocales) {
      entries.push({
        url: absoluteUrl(localePath(locale, page.path)),
        lastModified: page.lastModified ? new Date(page.lastModified) : undefined,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
