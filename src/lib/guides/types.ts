import type { Locale } from '@/lib/i18n/config';
import type { CategoryId } from '@/lib/tools/categories';
import type { FaqItem } from '@/lib/tools/types';

/** 가이드의 가벼운 메타데이터 (클라이언트에서도 안전). 본문은 별도 모듈에 있다. */
export interface GuideMeta {
  slug: string;
  category: CategoryId;
  status: 'published' | 'draft';
  locales: readonly Locale[];
  publishedAt: string;
  updatedAt: string;
  /** 관련 도구 id */
  relatedTools: readonly string[];
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideContent {
  title: string;
  seoTitle: string;
  seoDescription: string;
  lead: string;
  /** 핵심 요약 */
  takeaways: string[];
  sections: GuideSection[];
  faq?: FaqItem[];
}

export interface GuideModule {
  meta: GuideMeta;
  content: Partial<Record<Locale, GuideContent>>;
}
