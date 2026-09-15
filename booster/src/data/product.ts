/**
 * 제품·이용권·기능·체험·판매·가이드·FAQ 데이터 — 운영자가 수정하는 단일 계층.
 *
 * 규칙
 * - 확정되지 않은 값은 null 로 두고, 화면에는 표시 규칙(priceLabel 등)이 정상 안내 문구를 만든다.
 *   '0원', '무료', 가짜 정가/할인가, TODO 를 공개 화면에 내지 않는다.
 * - verification: 'confirmed' 는 작업지시서(2026-09-15)에서 확정된 내용,
 *   'unverified' 는 제품 자료로 아직 확인하지 못한 세부 사항이다. 인계 문서와 함께 관리한다.
 * - 메인 요약·상세 가격표·FAQ 는 모두 이 파일에서 생성된다. 같은 사실을 두 곳에 적지 않는다.
 */

export type Verification = 'confirmed' | 'unverified';
export type TierId = 'STANDARD' | 'DELUXE' | 'PREMIUM';
export type PlanId = 'lifetime' | 'ai';

export interface Price {
  /** 확정 금액(원). 미확정이면 null → '이용 요금 문의' */
  amount: number | null;
  currency: 'KRW';
  billing: 'once' | 'subscription';
  /** 구독 주기 표기. 미확인이면 null */
  period: string | null;
}

export interface Tier {
  id: TierId;
  name: string;
  price: Price;
  /** AI 일일 사용량 한도. 영구 이용권은 해당 없음(null), AI 이용권은 확인 전 null */
  aiDailyLimit: number | null;
}

export interface Plan {
  id: PlanId;
  name: string;
  billingLabel: string;
  summary: string;
  /** 문구 생성 방식 — 두 이용 방식의 핵심 차이 */
  phraseMethod: string;
  aiUsage: string;
  fitFor: readonly string[];
  tiers: readonly Tier[];
}

export interface Feature {
  id: string;
  name: string;
  summary: string;
  situation: string;
  verification: Verification;
}

export interface GuideMeta {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  status: 'published' | 'draft';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** 메인 페이지 대표 FAQ 로 노출 */
  featured?: boolean;
}

/** 이 데이터의 기준일. 화면에 '정보 기준일'로 표시한다. */
export const dataAsOf = '2026-09-15';

/* ---------------------------------------------------------------------------
 * 이용권 (확정: 두 방식 × 3등급, 같은 등급은 기능 범위 동일)
 * ------------------------------------------------------------------------- */

const tierNames: Record<TierId, string> = {
  STANDARD: 'STANDARD',
  DELUXE: 'DELUXE',
  PREMIUM: 'PREMIUM',
};

function tiers(billing: Price['billing'], aiLimits: Record<TierId, number | null>): Tier[] {
  return (['STANDARD', 'DELUXE', 'PREMIUM'] as const).map((id) => ({
    id,
    name: tierNames[id],
    // 금액은 최신 승인 자료 확인 전까지 null 로 둔다.
    price: { amount: null, currency: 'KRW', billing, period: null },
    aiDailyLimit: aiLimits[id],
  }));
}

export const plans: Record<PlanId, Plan> = {
  lifetime: {
    id: 'lifetime',
    name: '영구 이용권',
    billingLabel: '한 번 구매, 기간 제한 없이 사용',
    summary:
      '한 번 구매하면 기간 제한 없이 사용하는 이용 방식입니다. AI를 쓰지 않고, 직접 등록한 문구와 팜플렛을 바탕으로 자동작업합니다.',
    phraseMethod: '직접 등록한 문구·팜플렛 기반',
    aiUsage: 'AI를 사용하지 않아 AI 사용량 한도가 적용되지 않습니다.',
    fitFor: [
      '정해진 인사말·안내 문구로 꾸준히 운영하는 분',
      '구독보다 한 번 구매를 선호하는 분',
      '문구를 직접 관리하고 싶은 분',
    ],
    tiers: tiers('once', { STANDARD: null, DELUXE: null, PREMIUM: null }),
  },
  ai: {
    id: 'ai',
    name: 'AI 이용권',
    billingLabel: '구독형',
    summary:
      '구독형 이용 방식입니다. 게시글 내용에 맞춘 문구를 AI가 생성하며, 등급별로 일일 AI 사용량 제한이 있습니다.',
    phraseMethod: '게시글 내용에 맞춘 AI 문구 생성',
    aiUsage: '등급별 일일 AI 사용량 제한이 있습니다. 구체적인 횟수는 문의 시 안내드립니다.',
    fitFor: [
      '게시글마다 다른 내용의 문구를 남기고 싶은 분',
      '문구 작성에 드는 시간을 줄이고 싶은 분',
      '구독형 이용을 선호하는 분',
    ],
    // 등급별 한도 수치는 최신 운영 자료 확인 전까지 null 로 둔다.
    tiers: tiers('subscription', { STANDARD: null, DELUXE: null, PREMIUM: null }),
  },
};

export const planOrder: readonly PlanId[] = ['lifetime', 'ai'];

/** 두 방식에 공통으로 적용되는 확정 사실 */
export const planFacts = {
  sameTierSameFeatures:
    '같은 등급이면 사용할 수 있는 관리 기능 범위가 동일합니다. 두 방식의 차이는 문구 생성 방식과 AI 사용량 제한입니다.',
  threeTiers: '두 이용 방식 모두 STANDARD · DELUXE · PREMIUM 3개 등급으로 제공됩니다.',
  lifetimeIsAutomated:
    '영구 이용권도 자동작업을 합니다. AI를 쓰지 않을 뿐, 수동 작업 전용이 아닙니다.',
  lifetimeNoAiLimit:
    '영구 이용권에는 AI 사용량 한도가 없습니다. 다만 이것이 플랫폼 제한까지 없는 무제한 작업을 뜻하지는 않습니다.',
} as const;

/** 확인되지 않아 화면에서 약속하지 않는 항목. 인계 문서와 FAQ 답변에서 같은 표현을 쓴다. */
export const unconfirmed = {
  prices: '이용 요금은 문의 시 안내드립니다.',
  aiLimits: '등급별 AI 일일 사용량은 문의 시 안내드립니다.',
  subscriptionPeriod: 'AI 이용권의 구독 기간과 만료 후 처리는 문의 시 안내드립니다.',
  refund: '환불 조건은 문의 시 안내드립니다.',
  updates: '영구 이용권의 업데이트·지원 기간은 문의 시 안내드립니다.',
  devices: '지원 기기 수는 문의 시 안내드립니다.',
  trialScope: '체험 등급과 제공 범위는 문의 시 안내드립니다.',
  support: '지원 운영체제와 버전은 문의 시 안내드립니다.',
} as const;

/* ---------------------------------------------------------------------------
 * 기능 (제품 개요 수준. 세부 동작·버튼명·화면은 제품 자료로 확인 전이라 적지 않는다)
 * ------------------------------------------------------------------------- */

export const features: readonly Feature[] = [
  {
    id: 'discover',
    name: '서로이웃 대상 탐색·신청',
    summary: '서로이웃을 맺을 만한 블로그를 찾고 신청하는 과정을 돕습니다.',
    situation:
      '비슷한 주제의 블로그를 하나씩 찾아다니며 신청 버튼을 누르는 데 시간을 쓰고 있다면.',
    verification: 'unverified',
  },
  {
    id: 'react',
    name: '공감·댓글 관리',
    summary: '이웃 게시글에 공감과 댓글을 남기는 작업을 정리해 처리합니다.',
    situation: '새 글이 올라올 때마다 들어가서 공감을 누르고 댓글을 남기는 일이 매일 반복된다면.',
    verification: 'unverified',
  },
  {
    id: 'return',
    name: '답방',
    summary: '내 블로그를 찾아온 이웃에게 답방하는 흐름을 돕습니다.',
    situation: '누가 다녀갔는지 확인하고 일일이 방문해 인사하는 일을 놓치기 쉽다면.',
    verification: 'unverified',
  },
  {
    id: 'manage',
    name: '이웃관리',
    summary: '이웃 목록을 정리하고 관리 상태를 한눈에 봅니다.',
    situation: '이웃이 늘어날수록 누구와 어떤 관계인지 파악하기 어려워졌다면.',
    verification: 'unverified',
  },
  {
    id: 'log',
    name: '작업기록 관리',
    summary: '어떤 작업을 언제 했는지 내역으로 남겨 확인합니다.',
    situation: '어제 어디까지 했는지 기억에 의존하고 있다면.',
    verification: 'unverified',
  },
];

/** 사용 흐름 — 확정된 이용 구조에 근거한 개요. 실제 버튼명·설치 경로는 적지 않는다. */
export const usageFlow = [
  {
    step: '시작',
    title: '체험 문의 후 안내에 따라 준비',
    body: '3일 체험을 문의하면 이용 방법을 안내받습니다. 프로그램에서 이메일로 가입하고 인증 메일을 확인하면 로그인할 수 있습니다.',
  },
  {
    step: '설정',
    title: '문구 방식 정하기',
    body: '영구 이용권은 사용할 문구와 팜플렛을 등록하고, AI 이용권은 AI가 게시글에 맞춰 문구를 만들도록 설정합니다.',
  },
  {
    step: '작업',
    title: '이웃관리 작업 실행',
    body: '대상 탐색·신청, 공감·댓글, 답방, 이웃관리 작업을 등급에 맞는 범위에서 실행합니다.',
  },
  {
    step: '확인',
    title: '작업 내역 확인',
    body: '무엇을 언제 했는지 내역으로 확인하고 다음 작업을 이어갑니다.',
  },
] as const;

/* ---------------------------------------------------------------------------
 * 체험 · 판매 · 지원 환경
 * ------------------------------------------------------------------------- */

export const trial = {
  label: '3일 체험 문의',
  days: 3,
  /** 문의 채널을 통해 안내. 버튼을 누른다고 즉시 발급되지 않는다. */
  method: '카카오톡 오픈채팅으로 문의 후 안내',
  autoIssued: false,
  /** 체험 등급·횟수·범위·자동 결제 여부는 미확인 → null */
  conditions: null as string | null,
} as const;

export const sales = {
  /** 공식 판매 페이지(크몽 등)가 확인되면 'live' 로 바꾸고 url 을 넣는다. */
  status: 'unconfirmed' as 'unconfirmed' | 'live',
  url: null as string | null,
  /** 'inquiry' 면 구매 버튼이 문의 채널로 간다. 가짜 판매 링크를 만들지 않는다. */
  buttonMode: 'inquiry' as 'inquiry' | 'link',
  /** 실제 배포 파일 URL·배포 조건 확인 전에는 다운로드 버튼을 만들지 않는다. */
  downloadUrl: null as string | null,
} as const;

export const support = {
  /** 이웃부스터의 실제 배포 자료로 확인 전 → null. 다른 프로그램의 지원 환경을 가져오지 않는다. */
  os: null as string | null,
  versions: null as string | null,
  /** 홈페이지 열람(모바일 가능)과 프로그램 실행 환경(별도)을 구분해 안내한다. */
  note: '이 홈페이지는 모바일에서도 볼 수 있지만, 프로그램 실행 환경은 별도입니다.',
} as const;

/** 화면 자료 — 실제 캡처 없음. 설명용 예시 화면만 사용하며 반드시 그렇게 표기한다. */
export const assets = {
  hasRealScreenshots: false,
  illustrativeLabel: '기능 설명용 예시 화면 — 실제 프로그램 화면이 아닙니다',
} as const;

/* ---------------------------------------------------------------------------
 * 가이드
 * ------------------------------------------------------------------------- */

export const guides: readonly GuideMeta[] = [
  {
    slug: 'getting-started',
    title: '이웃부스터 처음 이용하는 방법',
    summary: '3일 체험 문의부터 가입·인증, 첫 설정과 작업, 주의사항까지 처음 이용하는 분을 위한 순서 안내입니다.',
    publishedAt: '2026-09-15',
    updatedAt: '2026-09-15',
    status: 'published',
  },
  {
    slug: 'lifetime-vs-ai',
    title: '영구 이용권과 AI 이용권, 어떤 차이가 있나요?',
    summary: '같은 등급의 기능 범위는 같습니다. 결제 방식·문구 생성 방식·AI 한도의 차이와 선택 기준을 정리했습니다.',
    publishedAt: '2026-09-15',
    updatedAt: '2026-09-15',
    status: 'published',
  },
];

export function publishedGuides(): readonly GuideMeta[] {
  return guides.filter((guide) => guide.status === 'published');
}

/* ---------------------------------------------------------------------------
 * FAQ (구매 전 질문 중심)
 * ------------------------------------------------------------------------- */

export const faq: readonly FaqItem[] = [
  {
    id: 'what',
    question: '이웃부스터는 어떤 프로그램인가요?',
    answer:
      '네이버 블로그를 운영하면서 반복되는 이웃관리 작업 — 서로이웃 대상 탐색·신청, 공감·댓글, 답방, 이웃관리, 작업기록 관리 — 를 돕는 프로그램입니다. 네이버와 무관한 독립 개발 제품입니다.',
    featured: true,
  },
  {
    id: 'official',
    question: '네이버 공식 서비스인가요?',
    answer:
      '아닙니다. 이웃부스터는 네이버가 만들거나 인증한 서비스가 아니라 독립적으로 개발된 소프트웨어입니다. 이용 시 네이버의 정책과 다른 이용자의 의사를 존중해야 합니다.',
  },
  {
    id: 'plans',
    question: '영구 이용권과 AI 이용권은 무엇이 다른가요?',
    answer:
      `영구 이용권은 한 번 구매해 기간 제한 없이 쓰는 방식이고, 직접 등록한 문구·팜플렛을 바탕으로 자동작업합니다. AI 이용권은 구독형이며 게시글 내용에 맞춘 문구를 AI가 생성하고 등급별 일일 AI 사용량 제한이 있습니다. ${planFacts.sameTierSameFeatures}`,
    featured: true,
  },
  {
    id: 'same-tier',
    question: '같은 등급이면 기능이 똑같나요?',
    answer:
      '네. STANDARD·DELUXE·PREMIUM 각 등급의 관리 기능 범위는 영구 이용권과 AI 이용권에서 동일합니다. 차이는 문구를 어떻게 만드느냐(직접 등록 vs AI 생성)와 AI 사용량 제한 여부뿐입니다.',
  },
  {
    id: 'lifetime-auto',
    question: '영구 이용권은 자동작업이 안 되나요?',
    answer:
      '됩니다. 영구 이용권은 AI를 쓰지 않을 뿐, 등록한 문구와 팜플렛을 바탕으로 자동작업합니다. 수동 작업 전용이 아닙니다.',
  },
  {
    id: 'ai-limit',
    question: 'AI 이용권의 AI 사용량 한도는 얼마인가요?',
    answer: `등급별로 일일 사용량 제한이 다릅니다. ${unconfirmed.aiLimits}`,
  },
  {
    id: 'price',
    question: '가격은 얼마인가요?',
    answer: `${unconfirmed.prices} 영구 이용권은 일회 구매, AI 이용권은 구독형이며 각각 3개 등급이 있습니다.`,
    featured: true,
  },
  {
    id: 'trial',
    question: '3일 체험은 어떻게 신청하나요?',
    answer: `카카오톡 오픈채팅으로 3일 체험을 문의하면 안내에 따라 진행됩니다. 버튼을 누른다고 즉시 발급되는 방식은 아닙니다. ${unconfirmed.trialScope}`,
  },
  {
    id: 'purchase',
    question: '구매는 어디서 하나요?',
    answer:
      '현재는 구매 문의를 통해 안내드립니다. 공식 판매 페이지가 준비되면 홈페이지의 구매 버튼이 해당 페이지로 연결됩니다.',
  },
  {
    id: 'support',
    question: '어떤 환경에서 사용할 수 있나요?',
    answer: `${unconfirmed.support} ${support.note}`,
  },
  {
    id: 'credentials',
    question: '홈페이지에서 네이버 계정 정보를 입력해야 하나요?',
    answer:
      '아니요. 이 홈페이지는 네이버 아이디나 비밀번호, 인증정보를 요구하거나 수집하지 않습니다. 회원가입·결제·파일 업로드 기능도 없습니다.',
  },
  {
    id: 'safety',
    question: '사용하면 블로그에 문제가 생기지 않나요?',
    answer:
      '어떤 도구도 플랫폼의 정책이나 조치를 대신 보장할 수 없습니다. 이웃부스터는 네이버의 정책과 다른 이용자의 의사를 존중하는 범위에서 사용해야 하며, 보호조치 우회나 탐지 회피를 목적으로 하는 기능이나 안내를 제공하지 않습니다.',
  },
  {
    id: 'refund',
    question: '환불이나 이용권 만료 후 처리는 어떻게 되나요?',
    answer: `${unconfirmed.refund} ${unconfirmed.subscriptionPeriod} ${unconfirmed.updates}`,
  },
];

export function featuredFaq(): readonly FaqItem[] {
  return faq.filter((item) => item.featured);
}

/* ---------------------------------------------------------------------------
 * 표시 규칙
 * ------------------------------------------------------------------------- */

const krw = new Intl.NumberFormat('ko-KR');

/** 금액 표시. null 이면 정상적인 문의 안내 문구를 돌려준다. '0원'을 만들지 않는다. */
export function priceLabel(price: Price): string {
  if (price.amount === null || price.amount <= 0) return '이용 요금 문의';
  const base = `${krw.format(price.amount)}원`;
  if (price.billing === 'subscription') return `${base} / ${price.period ?? '구독'}`;
  return base;
}

/** AI 한도 표시 */
export function aiLimitLabel(plan: Plan, tier: Tier): string {
  if (plan.id === 'lifetime') return 'AI 미사용 (한도 해당 없음)';
  if (tier.aiDailyLimit === null) return '등급별 일일 한도 (문의 시 안내)';
  return `하루 ${krw.format(tier.aiDailyLimit)}회`;
}
