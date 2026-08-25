import type { Locale } from '@/lib/i18n/config';

/**
 * 생활백과 카테고리.
 * URL: /[locale]/life/[slug]
 *
 * 도구 카테고리(@/lib/tools/categories)와는 별개 축이다.
 * 도구는 '얼마지?', 생활백과는 '어떻게 하지?'를 담당한다.
 */
export const lifeCategoryIds = [
  'stains',
  'laundry',
  'cleaning',
  'odor',
  'kitchen',
  'storage',
  'home-care',
] as const;

export type LifeCategoryId = (typeof lifeCategoryIds)[number];

export interface LifeCategoryDefinition {
  id: LifeCategoryId;
  /** URL 세그먼트 */
  slug: string;
  emoji: string;
  order: number;
  label: Record<Locale, string>;
  /** 카테고리 허브 리드 문장 (검색 스니펫으로도 쓰인다) */
  description: Record<Locale, string>;
}

export const lifeCategories: Record<LifeCategoryId, LifeCategoryDefinition> = {
  stains: {
    id: 'stains',
    slug: 'stains',
    emoji: '🧺',
    order: 1,
    label: { ko: '얼룩 제거', en: 'Stain removal', ja: 'シミ抜き' },
    description: {
      ko: '김치국물, 기름, 커피, 볼펜처럼 옷에 묻은 얼룩을 종류별로 지우는 방법입니다. 묻은 직후와 이미 마른 뒤의 대처가 다릅니다.',
      en: 'How to remove common clothing stains by type, both when fresh and after they have dried.',
      ja: '衣類についたシミを種類別に落とす方法です。付いた直後と乾いた後で対処が変わります。',
    },
  },
  laundry: {
    id: 'laundry',
    slug: 'laundry',
    emoji: '👕',
    order: 2,
    label: { ko: '세탁', en: 'Laundry', ja: '洗濯' },
    description: {
      ko: '수건 쉰내, 운동화, 패딩처럼 소재와 상황에 따라 달라지는 세탁 방법을 정리했습니다.',
      en: 'Washing methods that change with fabric and situation — towels, sneakers, padded jackets.',
      ja: '素材や状況で変わる洗濯方法をまとめました。',
    },
  },
  cleaning: {
    id: 'cleaning',
    slug: 'cleaning',
    emoji: '🧽',
    order: 3,
    label: { ko: '청소', en: 'Cleaning', ja: '掃除' },
    description: {
      ko: '세탁기, 에어프라이어, 가스레인지처럼 주기적으로 관리해야 하는 곳을 안전하게 청소하는 방법입니다.',
      en: 'Safe cleaning routines for appliances and spots that need regular care.',
      ja: '定期的な手入れが必要な場所を安全に掃除する方法です。',
    },
  },
  odor: {
    id: 'odor',
    slug: 'odor',
    emoji: '💨',
    order: 4,
    label: { ko: '냄새 제거', en: 'Odor removal', ja: 'ニオイ対策' },
    description: {
      ko: '냄새는 덮는 것이 아니라 원인을 없애야 사라집니다. 하수구, 세탁기, 신발 냄새의 실제 원인과 해결법입니다.',
      en: 'Odors go away when the source is removed, not masked. Causes and fixes for common household smells.',
      ja: 'ニオイは隠すのではなく原因を断つと消えます。原因別の対処法です。',
    },
  },
  kitchen: {
    id: 'kitchen',
    slug: 'kitchen',
    emoji: '🍳',
    order: 5,
    label: { ko: '주방 관리', en: 'Kitchen care', ja: 'キッチンの手入れ' },
    description: {
      ko: '탄 냄비, 프라이팬 기름때, 스테인리스 얼룩처럼 주방에서 자주 생기는 문제를 소재를 상하지 않게 해결합니다.',
      en: 'Fixing burnt pots, greasy pans and stainless marks without damaging the surface.',
      ja: '焦げた鍋や油汚れを、素材を傷めずに落とす方法です。',
    },
  },
  storage: {
    id: 'storage',
    slug: 'storage',
    emoji: '📦',
    order: 6,
    label: { ko: '보관', en: 'Storage', ja: '収納・保管' },
    description: {
      ko: '계절옷과 이불을 다음 시즌에 냄새·곰팡이 없이 꺼내 쓰기 위한 보관 방법입니다.',
      en: 'Storing seasonal clothes and bedding so they come out fresh next season.',
      ja: '季節物を次のシーズンに気持ちよく使うための保管方法です。',
    },
  },
  'home-care': {
    id: 'home-care',
    slug: 'home-care',
    emoji: '🏠',
    order: 7,
    label: { ko: '집 관리', en: 'Home care', ja: '住まいの管理' },
    description: {
      ko: '욕실 곰팡이, 결로, 습기처럼 집 자체를 관리하는 방법입니다. 생기기 전에 막는 쪽이 훨씬 쉽습니다.',
      en: 'Dealing with mold, condensation and damp — prevention is far easier than removal.',
      ja: 'カビや結露など住まい自体の管理方法です。',
    },
  },
};

export const orderedLifeCategories: LifeCategoryDefinition[] = Object.values(lifeCategories).sort(
  (a, b) => a.order - b.order,
);

export function getLifeCategory(id: LifeCategoryId): LifeCategoryDefinition {
  return lifeCategories[id];
}

export function findLifeCategoryBySlug(slug: string): LifeCategoryDefinition | undefined {
  return orderedLifeCategories.find((category) => category.slug === slug);
}

/** 생활백과 루트 경로 (로케일 접두사 제외) */
export const LIFE_BASE_PATH = '/life';

export function lifeCategoryPath(category: LifeCategoryDefinition): string {
  return `${LIFE_BASE_PATH}/${category.slug}`;
}

export function lifeArticlePath(categorySlug: string, articleSlug: string): string {
  return `${LIFE_BASE_PATH}/${categorySlug}/${articleSlug}`;
}
