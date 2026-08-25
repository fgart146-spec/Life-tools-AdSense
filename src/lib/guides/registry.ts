import type { Locale } from '@/lib/i18n/config';
import { guideIndex } from '@/lib/guides';
import type { GuideContent, GuideMeta, GuideModule } from '@/lib/guides/types';
import { guideModules } from '@/guides';

export type { GuideContent, GuideMeta, GuideModule, GuideSection } from '@/lib/guides/types';

/**
 * 서버 전용 가이드 레지스트리.
 * 본문은 저장소 안의 TS 모듈이므로 DB 조회 없이 정적 생성된다.
 */
export const guides: readonly GuideModule[] = guideModules;

export function getGuide(slug: string): GuideModule | undefined {
  return guideModules.find((guide) => guide.meta.slug === slug);
}

export function getGuideContent(slug: string, locale: Locale): GuideContent | undefined {
  return getGuide(slug)?.content[locale];
}

export interface GuideLink {
  slug: string;
  title: string;
}

/** 관련 가이드 링크. 해당 로케일에 없는 가이드는 제외된다(깨진 링크 방지). */
export function listGuideLinks(locale: Locale, slugs?: readonly string[]): GuideLink[] {
  const source = slugs
    ? slugs.map((slug) => getGuide(slug)).filter((guide): guide is GuideModule => Boolean(guide))
    : guideModules;

  return source
    .filter(
      (guide) =>
        guide.meta.status === 'published' &&
        guide.meta.locales.includes(locale) &&
        guide.content[locale] !== undefined,
    )
    .map((guide) => ({
      slug: guide.meta.slug,
      title: guide.content[locale]?.title ?? guide.meta.slug,
    }));
}

/** 가이드 목록 페이지용 요약 데이터 */
export interface GuideListItem extends GuideLink {
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: GuideMeta['category'];
}

export function listGuides(locale: Locale, limit?: number): GuideListItem[] {
  const items = guideModules
    .filter(
      (guide) =>
        guide.meta.status === 'published' &&
        guide.meta.locales.includes(locale) &&
        guide.content[locale] !== undefined,
    )
    .sort((a, b) => (a.meta.publishedAt < b.meta.publishedAt ? 1 : -1))
    .map((guide) => {
      const content = guide.content[locale];
      if (!content) throw new Error(`missing guide content: ${guide.meta.slug}/${locale}`);
      return {
        slug: guide.meta.slug,
        title: content.title,
        description: content.seoDescription,
        publishedAt: guide.meta.publishedAt,
        updatedAt: guide.meta.updatedAt,
        category: guide.meta.category,
      };
    });

  return limit ? items.slice(0, limit) : items;
}

/** 가이드 라우트 파라미터 (본문이 있는 로케일만) */
export function guideRouteParams(): { locale: Locale; slug: string }[] {
  const params: { locale: Locale; slug: string }[] = [];
  for (const guide of guideModules) {
    if (guide.meta.status !== 'published') continue;
    for (const locale of guide.meta.locales) {
      if (guide.content[locale]) params.push({ locale, slug: guide.meta.slug });
    }
  }
  return params;
}

/** 대략적인 읽는 시간(분). 한국어/일본어는 글자 수, 영어는 단어 수 기준. */
export function readingMinutes(content: GuideContent, locale: Locale): number {
  const text = [
    content.lead,
    ...content.takeaways,
    ...content.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    ...(content.faq ?? []).flatMap((item) => [item.question, item.answer]),
  ].join(' ');

  if (locale === 'en') {
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  }
  return Math.max(1, Math.round(text.replace(/\s/g, '').length / 500));
}

/** guideIndex(가벼운 메타)와 실제 본문 모듈이 어긋나지 않는지 검사 */
export function validateGuides(): string[] {
  const issues: string[] = [];
  const moduleSlugs = new Set(guideModules.map((guide) => guide.meta.slug));

  for (const meta of guideIndex) {
    if (!moduleSlugs.has(meta.slug)) issues.push(`본문이 없는 가이드: ${meta.slug}`);
  }
  for (const guide of guideModules) {
    if (!guideIndex.some((meta) => meta.slug === guide.meta.slug)) {
      issues.push(`guideIndex에 없는 가이드 모듈: ${guide.meta.slug}`);
    }
    for (const locale of guide.meta.locales) {
      if (!guide.content[locale]) {
        issues.push(`선언된 로케일 본문 누락: ${guide.meta.slug}/${locale}`);
      }
    }
  }

  return issues;
}

const guideIssues = validateGuides();
if (guideIssues.length > 0) {
  throw new Error(`가이드 레지스트리 오류:\n- ${guideIssues.join('\n- ')}`);
}
