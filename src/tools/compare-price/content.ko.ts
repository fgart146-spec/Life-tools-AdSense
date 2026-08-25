import type { ToolContent } from '@/lib/tools/types';
import type { ComparePriceCopy } from './copy';

export const contentKo: ToolContent<ComparePriceCopy> = {
  title: '뭐가 더 싼지 비교 계산기',
  seoTitle: '뭐가 더 싼지 비교 — 쿠폰·배송비까지 넣은 실구매가 비교',
  seoDescription:
    '용량과 할인 조건이 다른 두 상품을 같은 기준으로 비교합니다. 쿠폰·카드할인·배송비·적립까지 넣어 단가와 절약액을 계산하세요.',
  lead: '두 상품의 가격·용량·할인 조건을 넣으면 실구매가와 단가를 같은 기준으로 비교합니다. 얼마나, 어떻게 차이 나는지까지 문장으로 알려드립니다.',
  summary: '쿠폰·배송비까지 반영해 두 상품 중 실제로 싼 쪽을 찾습니다.',
  keywords: {
    primaryKeyword: '뭐가 더 싼지 비교',
    secondaryKeywords: [
      '가격 비교 계산기',
      '실구매가 비교',
      '단가 비교',
      '쿠폰 배송비 포함 가격',
      '용량 다른 상품 비교',
      '어느 게 더 싼가',
    ],
    searchIntent:
      '용량·수량·할인 조건이 서로 다른 두 상품 중 실제로 어느 쪽이 싼지, 얼마나 차이 나는지 알고 싶다.',
  },
  howItWorks: [
    '상품별로 실구매가를 먼저 계산합니다. 상품금액 → 정률 쿠폰 → 정액 쿠폰 → 카드 할인 → 배송비 가산 → 적립 차감 순서입니다.',
    '적립금은 결제금액에서 배송비를 제외한 금액을 기준으로 계산하며, 체감 실구매가에서 빼줍니다.',
    '실구매가를 총 용량(1개 용량 × 수량)으로 나눠 단위당 가격을 구합니다. kg·L은 g·ml로 환산합니다.',
    '두 상품의 단위당 가격을 비교해 더 싼 쪽과 퍼센트 차이를 계산합니다.',
    '절약액은 "A 상품의 총량만큼 살 때"를 기준으로 계산하고, 월 구매 횟수를 넣으면 월·연 절약액까지 보여줍니다.',
    '무게(g·kg)와 부피(ml·L)는 서로 비교할 수 없으므로 안내 메시지가 표시됩니다.',
  ],
  formula: [
    {
      label: '실구매가',
      expression:
        '실구매가 = ((상품금액 × (1 - 쿠폰율)) - 쿠폰정액) × (1 - 카드할인율) + 배송비 - 적립',
    },
    {
      label: '단위당 가격',
      expression: '단위당 가격 = 실구매가 ÷ (1개 용량 × 수량)',
    },
    {
      label: '퍼센트 차이',
      expression: '퍼센트 차이 = (비싼 단가 - 싼 단가) ÷ 비싼 단가 × 100',
    },
    {
      label: '절약액',
      expression: '1회 절약액 = 단가 차이 × 기준량 / 연간 절약액 = 1회 절약액 × 월 구매 횟수 × 12',
    },
  ],
  example: {
    scenario:
      'A: 세제 1.2L 12,900원에 10% 쿠폰, 배송비 3,000원. B: 세제 2L 19,900원, 무료배송, 적립 5%.',
    steps: [
      'A 실구매가: 12,900 × 0.9 = 11,610 + 배송비 3,000 = 14,610원 → 1,200ml 기준 100ml당 약 1,218원',
      'B 실구매가: 19,900 - 적립 995 = 18,905원 → 2,000ml 기준 100ml당 약 945원',
      '차이: 100ml당 약 273원, 비율로는 약 22.4%',
    ],
    conclusion:
      'B가 100ml당 약 22% 저렴합니다. A의 총량(1,200ml)만큼 산다고 보면 한 번에 약 3,275원 차이가 나고, 매달 한 번씩 사면 연간 약 39,000원 차이가 납니다.',
  },
  notes: [
    '배송비 무료 조건을 맞추려고 필요 없는 물건을 더 담으면 실제 지출은 늘어납니다. 계산에는 이번에 실제로 쓴 금액만 넣으세요.',
    '적립금은 현금이 아니라 다음 구매에만 쓸 수 있는 경우가 많습니다. 적립을 100% 할인처럼 보고 싶지 않다면 적립률을 비워두세요.',
    '무게(g)와 부피(ml)는 직접 비교할 수 없습니다. 표시 단위가 다르면 같은 종류로 맞춘 뒤 비교하세요.',
    '유통기한과 보관 공간을 넘어서는 대용량은 단가가 낮아도 결과적으로 손해일 수 있습니다.',
    '카드 할인은 한도(예: 최대 1만원)가 있는 경우가 많습니다. 한도를 넘는 할인율을 그대로 넣으면 실제보다 싸게 계산됩니다.',
  ],
  faq: [
    {
      question: '쿠폰과 카드 할인이 겹치면 어떤 순서로 계산되나요?',
      answer:
        '이 계산기는 정률 쿠폰 → 정액 쿠폰 → 카드 할인 순으로 적용합니다. 대부분의 국내 쇼핑몰이 쿠폰을 먼저 적용한 결제금액에 카드 할인을 적용하기 때문입니다. 쇼핑몰에 따라 순서가 다를 수 있으니 결제 직전 금액과 비교해 보세요.',
    },
    {
      question: '적립금도 할인으로 봐야 하나요?',
      answer:
        '판단은 사용자에게 달려 있습니다. 다음 구매에 확실히 쓸 예정이라면 할인으로 보는 것이 합리적이고, 쓰지 않고 소멸될 가능성이 있다면 적립률을 비워 두는 편이 보수적입니다.',
    },
    {
      question: '배송비는 왜 할인 대상에서 빠지나요?',
      answer:
        '대부분의 쿠폰·카드 할인은 상품금액에만 적용되고 배송비에는 적용되지 않기 때문입니다. 그래서 배송비는 할인 계산이 끝난 뒤에 더합니다.',
    },
    {
      question: '개수 단위 상품도 비교할 수 있나요?',
      answer:
        '가능합니다. 단위를 "개"로 두면 개당 가격 기준으로 비교합니다. 다만 낱개 크기가 다르면(예: 롤 길이) 개당 비교는 정확하지 않을 수 있으니 개당 가격 계산기의 하위 단위 기능을 활용하세요.',
    },
    {
      question: '절약액의 기준량은 무엇인가요?',
      answer:
        'A 상품의 총량입니다. 예를 들어 A가 600g이면 "600g을 살 때 두 상품의 차액"을 보여줍니다. 실제로 필요한 양이 다르면 A의 용량·수량을 필요한 양에 맞춰 입력하면 됩니다.',
    },
  ],
  relatedGuides: ['unit-price-basics', 'coupon-and-card-discount', 'bulk-not-always-cheaper'],
  ui: {
    productA: 'A 상품',
    productB: 'B 상품',
    priceLabel: '가격',
    priceUnit: '원',
    pricePlaceholder: '예: 12,900',
    amountLabel: '1개 용량',
    amountPlaceholder: '예: 1.2',
    unitLabel: '단위',
    quantityLabel: '수량',
    quantityUnit: '개',
    unitOptionG: '그램(g)',
    unitOptionKg: '킬로그램(kg)',
    unitOptionMl: '밀리리터(ml)',
    unitOptionL: '리터(L)',
    unitOptionEa: '개',
    advancedToggle: '쿠폰·카드할인·배송비 입력',
    couponPercentLabel: '쿠폰 할인율',
    couponAmountLabel: '쿠폰 정액 할인',
    cardPercentLabel: '카드 할인율',
    shippingLabel: '배송비',
    pointPercentLabel: '적립률',
    repeatLabel: '월 구매 횟수',
    repeatUnit: '회',
    repeatHint: '매달 반복 구매한다면 몇 번 사는지 넣으세요.',
    verdictLabel: '비교 결과',
    winnerA: 'A 상품이 더 저렴',
    winnerB: 'B 상품이 더 저렴',
    tie: '두 상품이 같음',
    perUnitLabel: '단가',
    finalPriceLabel: '실구매가',
    perItemLabel: '개당',
    totalAmountLabel: '총 용량',
    differenceLabel: '단가 차이',
    savingTitle: '절약 효과',
    savingPerPurchase: '1회 구매',
    savingMonthly: '월 예상',
    savingYearly: '연간 예상',
    noteWinner: '%{winner}합니다. 단가 기준 약 %{percent} 차이입니다.',
    noteSaving: '기준량 %{amount}을 살 때 약 %{saving} 차이가 납니다.',
    noteRepeat: '같은 구매를 반복하면 월 약 %{monthly}, 연간 약 %{yearly} 차이입니다.',
    noteTie: '두 상품의 단가가 같습니다. 배송 기간, 보관, 선호도로 선택하세요.',
    noteEffective: '실구매가는 쿠폰·카드할인·배송비·적립을 모두 반영한 금액입니다.',
    issueAPrice: 'A 상품 가격은 0원 이상으로 입력해 주세요.',
    issueAAmount: 'A 상품 용량은 0보다 크게 입력해 주세요.',
    issueAQuantity: 'A 상품 수량은 1개 이상이어야 합니다.',
    issueBPrice: 'B 상품 가격은 0원 이상으로 입력해 주세요.',
    issueBAmount: 'B 상품 용량은 0보다 크게 입력해 주세요.',
    issueBQuantity: 'B 상품 수량은 1개 이상이어야 합니다.',
    issueUnitMismatch: '무게(g·kg)와 부피(ml·L)는 서로 비교할 수 없습니다. 같은 종류의 단위로 맞춰 주세요.',
  },
};
