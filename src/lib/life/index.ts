import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import type { LifeArticleMeta } from '@/lib/life/types';
import {
  orderedLifeCategories,
  type LifeCategoryDefinition,
  type LifeCategoryId,
} from '@/lib/life/categories';
import { lifeArticleMetas } from '@/life/metas';

export type { LifeArticleMeta } from '@/lib/life/types';

/** 생활백과 문서의 가벼운 메타데이터 목록 (클라이언트에서도 안전) */
export const lifeIndex: readonly LifeArticleMeta[] = lifeArticleMetas;

export function publishedLifeArticles(locale?: Locale): LifeArticleMeta[] {
  return lifeIndex
    .filter(
      (article) =>
        article.status === 'published' &&
        (locale === undefined || article.locales.includes(locale)),
    )
    .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
}

export function findLifeArticleBySlug(slug: string): LifeArticleMeta | undefined {
  return lifeIndex.find((article) => article.slug === slug);
}

export function lifeArticlesByCategory(
  category: LifeCategoryId,
  locale: Locale,
): LifeArticleMeta[] {
  return publishedLifeArticles(locale).filter((article) => article.category === category);
}

/**
 * 해당 로케일에 공개 문서가 1개 이상 있는 카테고리만 반환한다.
 * 도구 카테고리와 같은 규칙 — 빈 카테고리는 라우트를 만들지 않는다.
 */
export function lifeCategoriesForLocale(locale: Locale): LifeCategoryDefinition[] {
  return orderedLifeCategories.filter(
    (category) => lifeArticlesByCategory(category.id, locale).length > 0,
  );
}

/** 생활백과 자체가 존재하는 로케일 (허브/네비게이션 노출 조건) */
export function lifeLocales(): Locale[] {
  return locales.filter((locale) => publishedLifeArticles(locale).length > 0);
}

export function hasLifeContent(locale: Locale): boolean {
  return publishedLifeArticles(locale).length > 0;
}
