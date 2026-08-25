import type { Locale } from '@/lib/i18n/config';
import type { LifeCategoryId } from '@/lib/life/categories';
import type { FaqItem, SourceRef } from '@/lib/tools/types';

/**
 * 문제 선택형 도우미(어디에? 무슨 문제?)용 태그.
 * AI가 답을 만드는 것이 아니라 기존 문서로 좁혀 보내기 위한 분류다.
 */
export const lifePlaceIds = ['clothes', 'kitchen', 'bathroom', 'appliance', 'etc'] as const;
export type LifePlaceId = (typeof lifePlaceIds)[number];

export const lifeProblemIds = ['stain', 'smell', 'mold', 'grease', 'wash', 'store'] as const;
export type LifeProblemId = (typeof lifeProblemIds)[number];

export const lifePlaceLabels: Record<LifePlaceId, Record<Locale, string>> = {
  clothes: { ko: '옷·섬유', en: 'Clothes', ja: '衣類' },
  kitchen: { ko: '주방', en: 'Kitchen', ja: 'キッチン' },
  bathroom: { ko: '욕실', en: 'Bathroom', ja: '浴室' },
  appliance: { ko: '가전', en: 'Appliances', ja: '家電' },
  etc: { ko: '기타', en: 'Other', ja: 'その他' },
};

export const lifeProblemLabels: Record<LifeProblemId, Record<Locale, string>> = {
  stain: { ko: '얼룩', en: 'Stains', ja: 'シミ' },
  smell: { ko: '냄새', en: 'Odor', ja: 'ニオイ' },
  mold: { ko: '곰팡이', en: 'Mold', ja: 'カビ' },
  grease: { ko: '기름때', en: 'Grease', ja: '油汚れ' },
  wash: { ko: '세탁', en: 'Washing', ja: '洗濯' },
  store: { ko: '보관', en: 'Storage', ja: '保管' },
};

/** 생활백과 문서의 가벼운 메타데이터 (클라이언트에서도 안전). 본문은 별도 모듈에 있다. */
export interface LifeArticleMeta {
  slug: string;
  category: LifeCategoryId;
  status: 'published' | 'draft';
  locales: readonly Locale[];
  publishedAt: string;
  updatedAt: string;
  /** 목록 노출 우선순위 (클수록 먼저) */
  weight?: number;
  /** 직접 지정한 관련 문서 slug (우선순위 1) */
  relatedArticles: readonly string[];
  /** 실제로 관련된 도구 id만. SEO 목적의 억지 연결 금지. */
  relatedTools: readonly string[];
  /** 문제 선택형 도우미 분류 */
  places: readonly LifePlaceId[];
  problems: readonly LifeProblemId[];
}

export interface LifeStep {
  title: string;
  description: string;
}

export interface LifeSituationTip {
  title: string;
  description: string;
}

/**
 * 문서 본문. 명세 13장의 필수 구조를 타입으로 강제한다.
 * 장황한 도입부 없이 summary → quickAnswer 순으로 상단에서 답이 끝나야 한다.
 */
export interface LifeContent {
  title: string;
  seoTitle: string;
  seoDescription: string;
  /** 검색 의도 설계 (Keyword Map) */
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  searchIntent: string;
  /** 한 줄 핵심 답변 — H1 바로 아래 */
  summary: string;
  /** 빠른 해결 방법 (3~5줄). 이것만 읽고 나가도 문제가 해결돼야 한다. */
  quickAnswer: readonly string[];
  supplies?: readonly string[];
  steps: readonly LifeStep[];
  cautions?: readonly string[];
  situationTips?: readonly LifeSituationTip[];
  /** 왜 이런 문제가 생기는지 */
  cause?: readonly string[];
  /** 재발 방지 */
  prevention?: readonly string[];
  faq: readonly FaqItem[];
  sources?: readonly SourceRef[];
  /** 검색에 쓰이는 추가 표현 (오타·구어체 등). 본문에 노출되지 않는다. */
  searchTerms?: readonly string[];
}

export interface LifeArticleModule {
  meta: LifeArticleMeta;
  content: Partial<Record<Locale, LifeContent>>;
}
