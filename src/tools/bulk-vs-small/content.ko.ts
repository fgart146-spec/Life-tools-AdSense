import type { ToolContent } from '@/lib/tools/types';
import type { BulkVsSmallCopy } from './copy';

export const contentKo: ToolContent<BulkVsSmallCopy> = {
  title: '대용량 vs 소용량 가격 비교',
  seoTitle: '대용량 vs 소용량 비교 — 다 못 쓰면 대용량이 손해',
  seoDescription:
    '대용량과 소용량의 단가를 비교하고, 다 쓰지 못할 가능성까지 반영한 실질 단가를 계산합니다. 대용량이 이득이 되는 최소 사용률도 알려드립니다.',
  lead: '대용량이 정말 이득인지 확인합니다. 예상 사용률을 넣으면 버리는 양까지 반영한 실질 단가와, 대용량이 이득이 되는 최소 사용률을 계산합니다.',
  summary: '사용률까지 반영해 대용량과 소용량 중 유리한 쪽을 찾습니다.',
  keywords: {
    primaryKeyword: '대용량 소용량 비교',
    secondaryKeywords: [
      '대용량 가격 비교',
      '대용량이 더 싼가',
      '용량별 단가 비교',
      '대용량 손해',
      '실질 단가 계산',
    ],
    searchIntent:
      '대용량 제품이 소용량보다 실제로 이득인지, 다 쓰지 못할 경우까지 고려하면 어느 쪽이 나은지 알고 싶다.',
  },
  howItWorks: [
    '두 제품의 가격을 각각의 총 용량으로 나눠 명목 단가를 계산합니다.',
    '예상 사용률을 넣으면 대용량의 실질 단가를 다시 계산합니다. 실제로 쓰는 양만 값어치가 있다고 보는 방식입니다.',
    '실질 단가 = 대용량 가격 ÷ (대용량 용량 × 사용률). 사용률이 낮을수록 실질 단가가 올라갑니다.',
    '손익분기 사용률은 "대용량을 최소 몇 % 이상 써야 소용량보다 이득인지"를 알려줍니다.',
    '입력값은 브라우저 안에서만 계산됩니다.',
  ],
  formula: [
    { label: '명목 단가', expression: '명목 단가 = 가격 ÷ 총 용량' },
    {
      label: '대용량 실질 단가',
      expression: '실질 단가 = 대용량 가격 ÷ (대용량 용량 × 사용률 ÷ 100)',
    },
    {
      label: '손익분기 사용률',
      expression: '손익분기 사용률 = 대용량 가격 ÷ (대용량 용량 × 소용량 단가) × 100',
    },
  ],
  example: {
    scenario: '소스 대용량 3,000ml가 15,900원, 소용량 2,200ml가 12,900원입니다.',
    steps: [
      '대용량 명목 단가: 15,900 ÷ 3,000 = 1ml당 5.3원',
      '소용량 명목 단가: 12,900 ÷ 2,200 = 1ml당 약 5.86원',
      '손익분기 사용률: 15,900 ÷ (3,000 × 5.86) = 약 90%',
    ],
    conclusion:
      '대용량은 명목상 약 9.6% 저렴하지만, 90% 이상 사용해야 실제로 이득입니다. 80%만 쓰고 버린다면 실질 단가가 1ml당 6.6원이 되어 소용량보다 비싸집니다.',
  },
  notes: [
    '사용률은 "실제로 소비하는 비율"입니다. 유통기한 초과, 변질, 취향 변화로 남기는 양을 솔직하게 잡는 편이 좋습니다.',
    '개봉 후 보관 기간이 짧은 식품(소스, 우유, 생크림 등)은 사용률을 낮게 잡는 것이 현실적입니다.',
    '보관 공간과 무게도 비용입니다. 대용량이 냉장고를 차지하면 다른 식재료 관리가 어려워질 수 있습니다.',
    '세제·휴지처럼 상하지 않는 생활용품은 사용률 100%로 두고 명목 단가로만 비교해도 됩니다.',
  ],
  faq: [
    {
      question: '사용률은 어떻게 정하나요?',
      answer:
        '과거 경험을 기준으로 잡으면 됩니다. 지난번 같은 제품을 샀을 때 다 쓰셨다면 100%, 3분의 1쯤 남겼다면 약 70%로 넣어보세요. 감이 없다면 80%와 100% 두 번 계산해 결과가 뒤집히는지 확인하는 방법도 좋습니다.',
    },
    {
      question: '손익분기 사용률이 100%를 넘으면 무슨 뜻인가요?',
      answer:
        '대용량을 전부 사용해도 소용량보다 비싸다는 뜻입니다. 이 경우 대용량을 살 이유가 가격 측면에서는 없습니다.',
    },
    {
      question: '상하지 않는 제품도 사용률을 넣어야 하나요?',
      answer:
        '아닙니다. 세제, 휴지, 생수처럼 오래 두어도 되는 제품은 100%로 두고 단가만 비교하면 충분합니다.',
    },
    {
      question: '단순 단가 비교만 하고 싶습니다.',
      answer:
        '사용률을 100%로 두면 명목 단가 비교와 같습니다. 쿠폰이나 배송비까지 포함한 비교가 필요하면 뭐가 더 싼지 비교 계산기를 사용하세요.',
    },
  ],
  relatedGuides: ['bulk-not-always-cheaper', 'unit-price-basics'],
  ui: {
    bulkTitle: '대용량',
    smallTitle: '소용량',
    priceLabel: '가격',
    priceUnit: '원',
    amountLabel: '총 용량',
    bulkPricePlaceholder: '예: 15,900',
    bulkAmountPlaceholder: '예: 3,000',
    smallPricePlaceholder: '예: 12,900',
    smallAmountPlaceholder: '예: 2,200',
    unitLabel: '단위',
    unitOptionG: '그램(g)',
    unitOptionMl: '밀리리터(ml)',
    unitOptionEa: '개',
    usageLabel: '대용량 예상 사용률',
    usageHint: '다 쓰지 못할 것 같다면 낮춰 보세요. 기본 100%',
    verdictLabel: '유리한 선택',
    betterBulk: '대용량이 유리',
    betterSmall: '소용량이 유리',
    tie: '두 제품이 같음',
    bulkUnitLabel: '대용량 단가',
    smallUnitLabel: '소용량 단가',
    bulkEffectiveLabel: '대용량 실질 단가',
    breakEvenLabel: '손익분기 사용률',
    noteVerdict: '%{better}합니다. 단가 기준 약 %{diff} 차이입니다.',
    noteUsage: '사용률을 %{usage}로 보면 대용량의 실질 단가는 %{effective}가 됩니다.',
    noteBreakEven: '대용량은 %{breakEven} 이상 사용해야 소용량보다 이득입니다.',
    noteTie: '두 제품의 단가가 같습니다. 보관 공간과 사용 기간으로 판단하세요.',
    noteCaution: '남겨서 버리는 양이 있다면 대용량의 실제 이득은 계산보다 작아집니다.',
    issueBulkPrice: '대용량 가격은 0원 이상으로 입력해 주세요.',
    issueBulkAmount: '대용량 용량은 0보다 크게 입력해 주세요.',
    issueSmallPrice: '소용량 가격은 0원 이상으로 입력해 주세요.',
    issueSmallAmount: '소용량 용량은 0보다 크게 입력해 주세요.',
    issueUsage: '사용률은 1~100 사이로 입력해 주세요.',
  },
};
