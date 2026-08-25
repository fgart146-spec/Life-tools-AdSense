import type { ToolContent } from '@/lib/tools/types';
import type { BundlePriceCopy } from './copy';

export const contentKo: ToolContent<BundlePriceCopy> = {
  title: '묶음상품 단가 계산기',
  seoTitle: '묶음상품 단가 계산기 — 낱개보다 정말 싼지 확인',
  seoDescription:
    '묶음 가격과 개수를 넣으면 개당 가격이 나옵니다. 낱개 가격까지 넣으면 묶음이 몇 % 저렴한지, 총 얼마를 아끼는지 계산합니다.',
  lead: '묶음으로 살 때의 개당 가격을 계산하고, 낱개 가격과 비교해 실제로 얼마나 이득인지 알려드립니다.',
  summary: '묶음 개당 가격과 낱개 대비 절약률을 계산합니다.',
  keywords: {
    primaryKeyword: '묶음상품 단가',
    secondaryKeywords: [
      '묶음 개당 가격',
      '박스 구매 단가',
      '낱개 vs 묶음 가격',
      '멀티팩 단가 계산',
      '대량 구매 절약',
    ],
    searchIntent:
      '묶음(멀티팩·박스)으로 살 때 개당 가격이 얼마인지, 낱개로 살 때보다 얼마나 저렴한지 알고 싶다.',
  },
  howItWorks: [
    '묶음 가격을 묶음 개수로 나눠 개당 가격을 계산합니다.',
    '1개 용량과 단위를 넣으면 100g당·100ml당 가격까지 함께 계산합니다.',
    '낱개 가격을 넣으면 (낱개 가격 - 묶음 개당 가격) ÷ 낱개 가격으로 절약률을 구하고, 묶음 개수를 곱해 총 절약 금액을 보여줍니다.',
    '묶음이 오히려 비싸면 절약률이 음수로 표시됩니다. 실제로 자주 있는 일입니다.',
    '입력값은 브라우저 안에서만 계산됩니다.',
  ],
  formula: [
    { label: '묶음 개당 가격', expression: '개당 가격 = 묶음 가격 ÷ 묶음 개수' },
    {
      label: '낱개 대비 절약률',
      expression: '절약률 = (낱개 가격 - 묶음 개당 가격) ÷ 낱개 가격 × 100',
    },
    { label: '총 절약 금액', expression: '총 절약 = (낱개 가격 - 묶음 개당 가격) × 묶음 개수' },
  ],
  example: {
    scenario: '라면 20개 묶음이 15,000원, 같은 라면 낱개는 950원입니다.',
    steps: [
      '묶음 개당: 15,000 ÷ 20 = 750원',
      '절약률: (950 - 750) ÷ 950 = 약 21.1%',
      '총 절약: (950 - 750) × 20 = 4,000원',
    ],
    conclusion:
      '묶음이 개당 200원, 전체로는 4,000원 저렴합니다. 20개를 소비할 수 있다면 확실히 유리합니다.',
  },
  notes: [
    '묶음 상품은 낱개보다 비싼 경우도 있습니다. 특히 낱개가 행사 중일 때 자주 역전됩니다.',
    '묶음 안의 개별 용량이 낱개 제품과 다른 경우가 있습니다(예: 낱개 200ml, 멀티팩 180ml). 용량까지 확인하세요.',
    '유통기한 안에 다 쓸 수 있는 수량인지 확인하세요. 남으면 절약이 아닙니다.',
    '온라인 묶음 구매는 배송비를 포함한 금액으로 계산해야 정확합니다.',
  ],
  faq: [
    {
      question: '묶음이 항상 더 싼가요?',
      answer:
        '아닙니다. 낱개 상품이 할인 행사 중이면 묶음보다 저렴한 경우가 자주 있습니다. 묶음 개당 가격과 낱개 가격을 직접 비교해 보는 것이 유일하게 확실한 방법입니다.',
    },
    {
      question: '용량이 다른 묶음은 어떻게 비교하나요?',
      answer:
        '1개 용량과 단위를 입력하면 100g당·100ml당 가격이 함께 계산됩니다. 낱개 제품과 용량이 다르면 개당 가격이 아니라 이 단위 가격으로 비교해야 정확합니다.',
    },
    {
      question: '박스 구매 시 배송비는 어떻게 넣나요?',
      answer:
        '묶음 가격에 배송비를 더한 금액을 넣으세요. 무료배송이라면 그대로 넣으면 됩니다.',
    },
    {
      question: '절약률이 음수로 나왔습니다.',
      answer:
        '묶음 개당 가격이 낱개 가격보다 비싸다는 뜻입니다. 이 경우 낱개로 필요한 만큼만 사는 편이 유리합니다.',
    },
  ],
  relatedGuides: ['unit-price-basics', 'bulk-not-always-cheaper'],
  ui: {
    bundlePriceLabel: '묶음 가격',
    bundlePriceUnit: '원',
    bundlePriceHint: '배송비를 포함한 실제 지출액',
    bundlePricePlaceholder: '예: 15,000',
    countLabel: '묶음 개수',
    countUnit: '개',
    countHint: '묶음에 들어 있는 개수',
    amountLabel: '1개 용량 (선택)',
    amountHint: '단위를 함께 선택하세요.',
    unitLabel: '용량 단위',
    unitOptionG: '그램(g)',
    unitOptionMl: '밀리리터(ml)',
    unitOptionEa: '개수만',
    singlePriceLabel: '낱개 가격 (선택)',
    singlePriceHint: '낱개로 살 때의 1개 가격',
    perItemLabel: '묶음 개당 가격',
    per100Label: '당 가격',
    savingRateLabel: '낱개 대비 절약률',
    savingAmountLabel: '총 절약 금액',
    totalAmountLabel: '총 용량',
    noteMain: '묶음으로 사면 개당 %{perItem}입니다.',
    notePer100: '100%{unit}당 가격은 %{per100}입니다.',
    noteSaving: '낱개보다 약 %{rate} 저렴하고, 묶음 전체로는 %{amount}을 아낍니다.',
    noteNoSaving: '이 묶음은 낱개보다 저렴하지 않습니다. 필요한 만큼 낱개로 사는 편이 낫습니다.',
    noteCaution: '유통기한 안에 다 쓸 수 있는 수량인지 함께 확인하세요.',
    issueBundlePrice: '묶음 가격은 0원 이상으로 입력해 주세요.',
    issueCount: '묶음 개수는 1개 이상이어야 합니다.',
    issueAmount: '용량은 0보다 크게 입력해 주세요.',
    issueSinglePrice: '낱개 가격은 0원 이상으로 입력해 주세요.',
  },
};
