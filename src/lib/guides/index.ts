import type { Locale } from '@/lib/i18n/config';
import type { GuideMeta } from '@/lib/guides/types';
import { guideMetas } from '@/guides/metas';

export type { GuideMeta } from '@/lib/guides/types';

/** 가이드의 가벼운 메타데이터 목록 (클라이언트에서도 안전) */
export const guideIndex: readonly GuideMeta[] = guideMetas;

export function publishedGuides(locale?: Locale): GuideMeta[] {
  return guideIndex.filter(
    (guide) =>
      guide.status === 'published' &&
      (locale === undefined || guide.locales.includes(locale)),
  );
}

export function findGuideBySlug(slug: string): GuideMeta | undefined {
  return guideIndex.find((guide) => guide.slug === slug);
}

export function guidePath(slug: string): string {
  return `/guide/${slug}`;
}
