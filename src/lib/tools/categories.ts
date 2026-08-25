import type { Locale } from '@/lib/i18n/config';

/** 초기 공개 카테고리 6개. 추가 시 여기와 사전(카테고리 라벨)을 함께 수정한다. */
export const categoryIds = [
  'shopping',
  'utilities',
  'food',
  'work',
  'business',
  'home',
] as const;

export type CategoryId = (typeof categoryIds)[number];

export interface CategoryDefinition {
  id: CategoryId;
  /** URL: /[locale]/category/[slug] */
  slug: string;
  emoji: string;
  /** 메인/목록에서의 노출 순서 */
  order: number;
  label: Record<Locale, string>;
  /** 카테고리 허브 상단 리드 문장 (검색 스니펫으로도 쓰인다) */
  description: Record<Locale, string>;
}

export const categories: Record<CategoryId, CategoryDefinition> = {
  shopping: {
    id: 'shopping',
    slug: 'shopping',
    emoji: '🛒',
    order: 1,
    label: {
      ko: '장보기·쇼핑',
      en: 'Shopping & unit price',
      ja: '買い物・単価',
    },
    description: {
      ko: '용량과 할인 조건이 다른 상품 중에서 실제로 어느 쪽이 싼지 계산합니다. 단가, 쿠폰, 1+1, 묶음상품을 같은 기준으로 비교하세요.',
      en: 'Work out which product is actually cheaper once size, coupons and multi-buy offers are taken into account.',
      ja: '容量や割引条件が違う商品を、同じ基準に揃えて比較します。単価・クーポン・まとめ買いをまとめて計算できます。',
    },
  },
  utilities: {
    id: 'utilities',
    slug: 'utilities',
    emoji: '⚡',
    order: 2,
    label: {
      ko: '생활비·공과금',
      en: 'Household bills',
      ja: '光熱費・生活費',
    },
    description: {
      ko: '전기요금, 냉난방비, 한 달 생활비처럼 매달 반복되는 지출을 미리 계산해 예산을 잡습니다.',
      en: 'Estimate recurring household costs such as electricity, heating and monthly living expenses.',
      ja: '電気代や冷暖房費、毎月の生活費など、繰り返し発生する支出を事前に見積もります。',
    },
  },
  food: {
    id: 'food',
    slug: 'food',
    emoji: '🍚',
    order: 3,
    label: {
      ko: '가족·음식',
      en: 'Family & food',
      ja: '家族・食事',
    },
    description: {
      ko: '인원수에 맞는 고기·쌀·김장 재료 양을 계산합니다. 모자라지도 남지도 않게 준비하세요.',
      en: 'Portion planning for gatherings: how much to buy for the number of people you are feeding.',
      ja: '人数に合わせた食材の量を計算します。足りない・余りすぎるを防ぎます。',
    },
  },
  work: {
    id: 'work',
    slug: 'work',
    emoji: '💰',
    order: 4,
    label: {
      ko: '직장·급여',
      en: 'Pay & work',
      ja: '給与・仕事',
    },
    description: {
      ko: '연봉과 월급에서 세금·4대보험을 뺀 실수령액, 시급, 주휴수당, 퇴직금을 계산합니다.',
      en: 'Take-home pay, hourly rates and related work calculations.',
      ja: '手取り額や時給など、働き方に関する計算をまとめています。',
    },
  },
  business: {
    id: 'business',
    slug: 'business',
    emoji: '📦',
    order: 5,
    label: {
      ko: '사업·판매',
      en: 'Selling & pricing',
      ja: '販売・価格設定',
    },
    description: {
      ko: '원가, 수수료, 배송비를 넣고 실제로 남는 이익과 적정 판매가를 계산합니다.',
      en: 'Price your products with cost, fees and shipping included, and see what actually remains as profit.',
      ja: '原価・手数料・送料を含めて、実際に残る利益と適正な販売価格を計算します。',
    },
  },
  home: {
    id: 'home',
    slug: 'home',
    emoji: '🏠',
    order: 6,
    label: {
      ko: '집·이사',
      en: 'Home & moving',
      ja: '住まい・引っ越し',
    },
    description: {
      ko: '평수 환산, 이사 예산, 벽지·장판 필요량처럼 집과 관련된 계산을 모았습니다.',
      en: 'Floor area conversion, moving budgets and material quantities for your home.',
      ja: '面積の換算や引っ越し予算など、住まいに関する計算をまとめました。',
    },
  },
};

export const orderedCategories: CategoryDefinition[] = Object.values(categories).sort(
  (a, b) => a.order - b.order,
);

export function getCategory(id: CategoryId): CategoryDefinition {
  return categories[id];
}

export function categoryPath(category: CategoryDefinition): string {
  return `/category/${category.slug}`;
}

export function findCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return orderedCategories.find((category) => category.slug === slug);
}
