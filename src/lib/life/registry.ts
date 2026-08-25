import type { Locale } from '@/lib/i18n/config';
import { lifeIndex } from '@/lib/life';
import type { LifeArticleModule, LifeContent } from '@/lib/life/types';
import { findLifeCategoryBySlug, lifeCategories } from '@/lib/life/categories';
import { toolDefinitions } from '@/lib/tools/definitions';
import { lifeArticleModules } from '@/life';

export type { LifeArticleMeta, LifeArticleModule, LifeContent } from '@/lib/life/types';

/**
 * 서버 전용 생활백과 레지스트리.
 * 본문은 저장소 안의 TS 모듈이므로 DB 조회 없이 정적 생성된다.
 * (페이지뷰당 Supabase/API 호출이 발생하지 않는다.)
 */
export const lifeArticles: readonly LifeArticleModule[] = lifeArticleModules;

export function getLifeArticle(slug: string): LifeArticleModule | undefined {
  return lifeArticleModules.find((article) => article.meta.slug === slug);
}

export function getLifeContent(slug: string, locale: Locale): LifeContent | undefined {
  return getLifeArticle(slug)?.content[locale];
}

function isAvailable(article: LifeArticleModule, locale: Locale): boolean {
  return (
    article.meta.status === 'published' &&
    article.meta.locales.includes(locale) &&
    article.content[locale] !== undefined
  );
}

export interface LifeListItem {
  slug: string;
  title: string;
  summary: string;
  categorySlug: string;
  categoryLabel: string;
  categoryEmoji: string;
  updatedAt: string;
  weight: number;
}

function toListItem(article: LifeArticleModule, locale: Locale): LifeListItem {
  const content = article.content[locale];
  if (!content) throw new Error(`missing life content: ${article.meta.slug}/${locale}`);
  const category = lifeCategories[article.meta.category];
  return {
    slug: article.meta.slug,
    title: content.title,
    summary: content.summary,
    categorySlug: category.slug,
    categoryLabel: category.label[locale],
    categoryEmoji: category.emoji,
    updatedAt: article.meta.updatedAt,
    weight: article.meta.weight ?? 0,
  };
}

/** 목록/추천용 문서 요약. 해당 로케일에 본문이 없는 문서는 제외된다(깨진 링크 방지). */
export function listLifeArticles(
  locale: Locale,
  options: { category?: string; slugs?: readonly string[]; limit?: number } = {},
): LifeListItem[] {
  const wanted = options.slugs ? new Set(options.slugs) : undefined;

  const items = lifeArticleModules
    .filter((article) => {
      if (!isAvailable(article, locale)) return false;
      if (options.category && lifeCategories[article.meta.category].slug !== options.category) {
        return false;
      }
      if (wanted && !wanted.has(article.meta.slug)) return false;
      return true;
    })
    .sort((a, b) => (b.meta.weight ?? 0) - (a.meta.weight ?? 0))
    .map((article) => toListItem(article, locale));

  // slugs가 주어지면 요청한 순서를 유지한다 (관련 문서 노출 순서 제어)
  const ordered = options.slugs
    ? options.slugs
        .map((slug) => items.find((item) => item.slug === slug))
        .filter((item): item is LifeListItem => item !== undefined)
    : items;

  return options.limit ? ordered.slice(0, options.limit) : ordered;
}

/**
 * 관련 문서 목록.
 * 우선순위: 직접 지정 → 같은 카테고리 → 부족하면 다른 카테고리의 인기 문서.
 * 같은 글이 모든 페이지에 반복 노출되지 않도록 현재 문서는 항상 제외한다.
 */
export function relatedLifeArticles(
  slug: string,
  locale: Locale,
  limit = 4,
): LifeListItem[] {
  const article = getLifeArticle(slug);
  if (!article) return [];

  const picked: LifeListItem[] = [];
  const seen = new Set<string>([slug]);

  const push = (items: LifeListItem[]) => {
    for (const item of items) {
      if (picked.length >= limit) return;
      if (seen.has(item.slug)) continue;
      seen.add(item.slug);
      picked.push(item);
    }
  };

  push(listLifeArticles(locale, { slugs: article.meta.relatedArticles }));
  if (picked.length < limit) {
    const category = lifeCategories[article.meta.category];
    push(listLifeArticles(locale, { category: category.slug }));
  }
  if (picked.length < limit) push(listLifeArticles(locale));

  return picked;
}

/** 문서에 연결된 도구 id 중 실제로 존재하고 해당 로케일에 공개된 것만 */
export function relatedToolIdsFor(slug: string, locale: Locale): string[] {
  const article = getLifeArticle(slug);
  if (!article) return [];
  return article.meta.relatedTools.filter((toolId) =>
    toolDefinitions.some(
      (tool) =>
        tool.id === toolId && tool.status === 'published' && tool.locales.includes(locale),
    ),
  );
}

/**
 * 특정 도구와 연결된 생활백과 문서 (역방향 조회).
 *
 * 문서가 relatedTools에 직접 선언한 관계만 사용한다.
 * 도구와 문서를 억지로 이어 붙이지 않기 위해 추측하지 않는다.
 */
export function lifeArticlesForTool(toolId: string, locale: Locale, limit = 3): LifeListItem[] {
  return lifeArticleModules
    .filter((article) => isAvailable(article, locale) && article.meta.relatedTools.includes(toolId))
    .sort((a, b) => (b.meta.weight ?? 0) - (a.meta.weight ?? 0))
    .slice(0, limit)
    .map((article) => toListItem(article, locale));
}

/** 라우트 파라미터 (본문이 있는 로케일만) */
export function lifeArticleRouteParams(): { locale: Locale; category: string; slug: string }[] {
  const params: { locale: Locale; category: string; slug: string }[] = [];
  for (const article of lifeArticleModules) {
    if (article.meta.status !== 'published') continue;
    const category = lifeCategories[article.meta.category];
    for (const locale of article.meta.locales) {
      if (article.content[locale]) {
        params.push({ locale, category: category.slug, slug: article.meta.slug });
      }
    }
  }
  return params;
}

/** 클라이언트 검색 UI로 넘길 정적 인덱스 (빌드 시점에 만들어 props로 전달) */
export interface LifeSearchEntry {
  slug: string;
  title: string;
  summary: string;
  categorySlug: string;
  categoryLabel: string;
  categoryEmoji: string;
  places: readonly string[];
  problems: readonly string[];
  /** 검색 매칭용 소문자 텍스트 */
  haystack: string;
}

export function buildLifeSearchIndex(locale: Locale): LifeSearchEntry[] {
  return lifeArticleModules
    .filter((article) => isAvailable(article, locale))
    .sort((a, b) => (b.meta.weight ?? 0) - (a.meta.weight ?? 0))
    .map((article) => {
      const content = article.content[locale];
      if (!content) throw new Error(`missing life content: ${article.meta.slug}/${locale}`);
      const category = lifeCategories[article.meta.category];
      const haystack = [
        content.title,
        content.summary,
        content.primaryKeyword,
        ...content.secondaryKeywords,
        ...(content.searchTerms ?? []),
        category.label[locale],
      ]
        .join(' ')
        .toLowerCase();

      return {
        slug: article.meta.slug,
        title: content.title,
        summary: content.summary,
        categorySlug: category.slug,
        categoryLabel: category.label[locale],
        categoryEmoji: category.emoji,
        places: article.meta.places,
        problems: article.meta.problems,
        haystack,
      };
    });
}

/** lifeIndex(가벼운 메타)와 실제 본문 모듈이 어긋나지 않는지 검사 */
export function validateLifeRegistry(): string[] {
  const issues: string[] = [];
  const moduleSlugs = new Set(lifeArticleModules.map((article) => article.meta.slug));
  const seen = new Set<string>();

  for (const meta of lifeIndex) {
    if (!moduleSlugs.has(meta.slug)) issues.push(`본문이 없는 생활백과 문서: ${meta.slug}`);
  }

  for (const article of lifeArticleModules) {
    const { meta } = article;
    if (seen.has(meta.slug)) issues.push(`중복 slug: ${meta.slug}`);
    seen.add(meta.slug);

    if (!lifeIndex.some((item) => item.slug === meta.slug)) {
      issues.push(`metas.ts에 없는 문서 모듈: ${meta.slug}`);
    }
    if (!findLifeCategoryBySlug(lifeCategories[meta.category].slug)) {
      issues.push(`알 수 없는 카테고리: ${meta.slug} → ${meta.category}`);
    }
    for (const locale of meta.locales) {
      if (!article.content[locale]) {
        issues.push(`선언된 로케일 본문 누락: ${meta.slug}/${locale}`);
      }
    }
    for (const related of meta.relatedArticles) {
      if (!moduleSlugs.has(related)) {
        issues.push(`존재하지 않는 관련 문서 참조: ${meta.slug} → ${related}`);
      }
      if (related === meta.slug) {
        issues.push(`자기 자신을 관련 문서로 지정: ${meta.slug}`);
      }
    }
    for (const toolId of meta.relatedTools) {
      if (!toolDefinitions.some((tool) => tool.id === toolId)) {
        issues.push(`존재하지 않는 관련 도구 참조: ${meta.slug} → ${toolId}`);
      }
    }
  }

  return issues;
}

const lifeIssues = validateLifeRegistry();
if (lifeIssues.length > 0) {
  throw new Error(`생활백과 레지스트리 오류:\n- ${lifeIssues.join('\n- ')}`);
}
