import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { EffectiveBasis } from '@/lib/admin/basis';
import type { CategoryId } from '@/lib/tools/categories';

/**
 * 도구 정의(가벼운 메타데이터).
 * 클라이언트 컴포넌트에서도 import될 수 있으므로 무거운 본문/계산 코드를 넣지 않는다.
 */
export interface ToolDefinition {
  /** 불변 식별자. URL slug와 별개로 관리한다. */
  id: string;
  /** URL: /[locale]/[slug] — 모든 로케일에서 동일한 slug를 사용한다. */
  slug: string;
  category: CategoryId;
  emoji: string;
  /** draft는 라우트/사이트맵/목록에 노출되지 않는다. */
  status: 'published' | 'draft';
  /** 실제 본문(content)이 존재하는 로케일. 여기 없는 로케일은 라우트를 만들지 않는다. */
  locales: readonly Locale[];
  /** 관련 도구 id 목록. 내부 링크와 hreflang 없는 추천에 사용한다. */
  related: readonly string[];
  /** 마지막 검토일 (YYYY-MM-DD). 페이지에 표시된다. */
  updatedAt: string;
  /** 메인 '많이 쓰는 도구' 정렬 가중치. 클수록 먼저 노출된다. */
  weight?: number;
}

/** 검색 의도 맵. SEO title/description/H1 작성의 근거가 된다. */
export interface KeywordMap {
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** 이 페이지가 해결해야 하는 검색 의도(한 문장) */
  searchIntent: string;
}

export interface FormulaLine {
  label: string;
  /** 사람이 읽는 수식 표현 */
  expression: string;
  note?: string;
}

export interface WorkedExample {
  /** 상황 설명 */
  scenario: string;
  /** 계산 과정 (사용자가 손으로 따라갈 수 있는 수준) */
  steps: string[];
  conclusion: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SourceRef {
  label: string;
  url?: string;
}

/**
 * 로케일별 도구 본문.
 * TCopy는 각 계산기 UI의 라벨 타입(도구마다 다름).
 */
export interface ToolContent<TCopy = unknown> {
  /** H1 */
  title: string;
  /** <title> (브랜드명 제외) */
  seoTitle: string;
  seoDescription: string;
  /** H1 바로 아래 한두 문장 설명 */
  lead: string;
  /** 목록/카드에 쓰는 한 줄 요약 (60자 내외) */
  summary: string;
  keywords: KeywordMap;
  /** 계산 기준 */
  howItWorks: string[];
  formula: FormulaLine[];
  example: WorkedExample;
  /** 주의사항 */
  notes: string[];
  faq: FaqItem[];
  /** 제도/요율 기준일 (YYYY-MM-DD). 제도 종속 계산기는 필수. */
  basisDate?: string;
  sources?: SourceRef[];
  /** 관련 가이드 slug */
  relatedGuides?: string[];
  /** 계산기 UI 문자열 */
  ui: TCopy;
}

/**
 * 도구 모듈: 정의 + 로케일 본문 + 계산기 렌더러.
 * 서버 전용(registry.ts)에서만 import한다.
 */
/**
 * 계산기 렌더링 컨텍스트.
 * 관리자 기준값처럼 '정적 생성 시점에 결정되는 값'을 계산기로 내려보낸다.
 */
export interface ToolRenderContext {
  basis?: EffectiveBasis;
}

export interface ToolModule {
  definition: ToolDefinition;
  content: Partial<Record<Locale, ToolContent>>;
  /** 계산기 렌더링. 도구별 copy 타입을 이 함수 안에서 고정한다. */
  render: (locale: Locale, context?: ToolRenderContext) => ReactNode;
}

/** 계산기 계산 결과의 공통 형태. 입력 오류는 예외 대신 issues로 전달한다. */
export interface CalcIssue {
  /** 문제가 있는 입력 필드 키 */
  field: string;
  /** 사용자에게 보여줄 메시지 키 (도구 copy에서 문구를 찾는다) */
  code: string;
}
