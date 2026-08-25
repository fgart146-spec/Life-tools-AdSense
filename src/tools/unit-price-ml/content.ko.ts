import type { ToolContent } from '@/lib/tools/types';
import type { UnitPriceToolCopy } from '@/lib/tools/shared/unit-price-copy';

export const contentKo: ToolContent<UnitPriceToolCopy> = {
  title: 'ml당 가격 계산기',
  seoTitle: 'ml당 가격 계산기 — 100ml당·1L당 단가 계산',
  seoDescription:
    '음료·세제·샴푸처럼 용량이 제각각인 상품의 100ml당 가격과 1L당 가격을 계산합니다. 대용량이 정말 싼지 바로 확인하세요.',
  lead: '가격과 용량을 넣으면 100ml당 가격과 1L당 가격을 바로 계산합니다. 세제, 샴푸, 음료처럼 용량이 다양한 상품을 같은 기준으로 비교할 때 쓰세요.',
  summary: '가격과 용량으로 100ml당·1L당 단가를 계산합니다.',
  keywords: {
    primaryKeyword: 'ml당 가격 계산기',
    secondaryKeywords: [
      '100ml당 가격',
      '1L당 가격 계산',
      '세제 단가 비교',
      '음료 용량 비교',
      '리터당 가격',
    ],
    searchIntent:
      '용량이 다른 액체 제품(세제·음료·샴푸 등)을 100ml 또는 1L 기준으로 환산해 어느 쪽이 싼지 비교하고 싶다.',
  },
  howItWorks: [
    '가격을 총 용량으로 나눠 1ml당 가격을 구한 뒤 100을 곱해 100ml당 가격을 계산합니다.',
    '단위를 L로 두면 1L = 1,000ml로 환산합니다.',
    '수량을 2개 이상 넣으면 총 용량(1개 용량 × 수량) 기준으로 계산합니다. 6개들이 묶음 음료도 그대로 넣으면 됩니다.',
    '리필 제품처럼 포장만 다른 경우에도 같은 100ml 기준으로 비교하면 차이가 분명하게 보입니다.',
    '입력값은 브라우저 안에서만 계산되며 서버로 전송되지 않습니다.',
  ],
  formula: [
    {
      label: '총 용량',
      expression: '총 용량(ml) = 1개 용량 × 수량 (L로 입력하면 × 1,000)',
    },
    {
      label: '100ml당 가격',
      expression: '100ml당 가격 = 가격 ÷ 총 용량(ml) × 100',
    },
    {
      label: '1L당 가격',
      expression: '1L당 가격 = 100ml당 가격 × 10',
    },
  ],
  example: {
    scenario: '세탁세제 2.2L 본품이 12,900원, 리필 3L가 15,900원입니다.',
    steps: [
      '본품: 12,900 ÷ 2,200ml = 1ml당 약 5.86원 → 100ml당 약 586원',
      '리필: 15,900 ÷ 3,000ml = 1ml당 5.3원 → 100ml당 530원',
      '차이: 100ml당 56원, 비율로는 약 9.6%',
    ],
    conclusion:
      '리필이 100ml당 약 9.6% 저렴합니다. 1L당으로 보면 5,860원과 5,300원의 차이입니다.',
  },
  notes: [
    '농축 제품은 같은 100ml라도 사용 횟수가 다릅니다. 세제라면 "1회 사용량"과 "총 사용 횟수"까지 봐야 실제 비용을 비교할 수 있습니다.',
    '음료의 경우 얼음이 포함된 컵 음료나 희석해서 마시는 원액은 단순 ml 비교가 맞지 않습니다.',
    '용량 표시가 ml인지 g인지 확인하세요. 제품에 따라 중량(g)으로 표기되는 경우가 있고, 이때는 100g당 가격 계산기를 쓰는 편이 맞습니다.',
    '대용량이 단가가 싸도 보관 공간과 사용 기간을 고려해야 실제로 이득입니다.',
  ],
  faq: [
    {
      question: '세제나 샴푸는 리필이 항상 더 쌀까요?',
      answer:
        '보통은 저렴하지만 항상 그런 것은 아닙니다. 본품이 할인 행사 중이면 리필보다 100ml당 가격이 낮아지는 경우가 있습니다. 그래서 표시가가 아니라 100ml당 가격으로 확인하는 것이 정확합니다.',
    },
    {
      question: '농축 세제와 일반 세제를 비교해도 되나요?',
      answer:
        '단순 100ml당 가격만으로는 비교가 어렵습니다. 농축 제품은 1회 사용량이 절반 이하인 경우가 많습니다. 제품 뒷면의 1회 권장 사용량으로 "총 사용 횟수"를 구한 뒤, 가격 ÷ 사용 횟수로 1회당 비용을 비교하는 편이 정확합니다.',
    },
    {
      question: '6개들이 묶음 음료는 어떻게 넣나요?',
      answer:
        '가격은 묶음 전체 가격, 1개 용량은 한 병 용량, 수량은 6을 넣으면 됩니다. 총 용량 기준으로 100ml당 가격이 계산됩니다.',
    },
    {
      question: '배송비는 어떻게 반영하나요?',
      answer:
        '온라인 구매라면 배송비를 더한 금액을 가격에 넣으세요. 무료배송 기준을 맞추려고 필요 없는 상품을 더 담는 경우도 있으니, 실제로 지출한 총액 기준으로 보는 편이 좋습니다.',
    },
  ],
  relatedGuides: ['unit-price-basics', 'bulk-not-always-cheaper'],
  ui: {
    priceLabel: '가격',
    priceUnit: '원',
    priceHint: '할인·배송비까지 반영한 실제 지출 금액을 넣으면 정확합니다.',
    pricePlaceholder: '예: 12,900',
    amountLabel: '1개 용량',
    amountHint: '라벨에 적힌 용량을 그대로 넣으세요.',
    amountPlaceholder: '예: 2.2',
    unitLabel: '용량 단위',
    unitSmall: '밀리리터(ml)',
    unitLarge: '리터(L)',
    quantityLabel: '수량',
    quantityUnit: '개',
    quantityHint: '묶음이면 총 개수를 넣으세요.',
    primaryLabel: '100ml당 가격',
    secondaryLabel: '1L당 가격',
    perItemLabel: '1개당 가격',
    totalLabel: '총 용량',
    noteMain: '이 상품은 100ml당 %{primary}입니다.',
    noteSecondary: '1L로 환산하면 %{secondary}입니다.',
    noteQuantity: '%{quantity}개 묶음이므로 1개당 %{perItem}입니다.',
    noteCompare: '다른 상품과 비교할 때는 100ml당 가격끼리 놓고 보면 됩니다.',
    issuePrice: '가격은 0원 이상으로 입력해 주세요.',
    issueAmount: '용량은 0보다 크게 입력해 주세요.',
    issueQuantity: '수량은 1개 이상으로 입력해 주세요.',
  },
};
