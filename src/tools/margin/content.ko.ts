import type { ToolContent } from '@/lib/tools/types';
import type { MarginCopy } from './copy';

export const contentKo: ToolContent<MarginCopy> = {
  title: '판매 마진 계산기',
  seoTitle: '판매 마진 계산기 — 수수료·배송비 빼고 얼마 남을까',
  seoDescription:
    '판매가와 원가에 플랫폼 수수료·배송비·포장비까지 넣어 실제로 남는 순이익과 마진율을 계산합니다.',
  lead: '판매가와 원가만 넣어도 되고, 수수료·배송비까지 넣으면 실제로 손에 남는 금액이 나옵니다.',
  summary: '수수료와 배송비까지 반영한 실제 순이익과 마진율을 계산합니다.',
  keywords: {
    primaryKeyword: '마진 계산기',
    secondaryKeywords: [
      '마진율 계산',
      '순이익 계산',
      '판매 수수료 마진',
      '스마트스토어 마진',
      '원가율 마진율',
    ],
    searchIntent:
      '상품을 팔았을 때 수수료와 배송비를 빼고 실제로 얼마가 남는지, 마진율은 몇 %인지 알고 싶다.',
  },
  howItWorks: [
    '매출 = 판매가 × 수량으로 계산합니다.',
    '수수료는 매출 기준으로 계산합니다(플랫폼 수수료·PG 수수료는 보통 결제금액 기준입니다).',
    '총 비용 = (원가 + 배송비 + 기타비용) × 수량 + 수수료입니다.',
    '순이익 = 매출 - 총 비용이며, 마진율은 순이익 ÷ 매출로 계산합니다.',
    '마크업(원가 대비 이익률)은 순이익 ÷ 총비용으로 별도 표시합니다. 마진율과 혼동하기 쉬운 지표입니다.',
    '손익분기 판매가는 이익이 0이 되는 가격으로, (원가 + 배송비 + 기타) ÷ (1 - 수수료율)입니다.',
  ],
  formula: [
    { label: '매출', expression: '매출 = 판매가 × 수량' },
    { label: '수수료', expression: '수수료 = 매출 × 수수료율' },
    { label: '순이익', expression: '순이익 = 매출 - (원가 + 배송비 + 기타) × 수량 - 수수료' },
    { label: '마진율', expression: '마진율(%) = 순이익 ÷ 매출 × 100' },
    { label: '손익분기 판매가', expression: '(원가 + 배송비 + 기타) ÷ (1 - 수수료율)' },
  ],
  example: {
    scenario: '판매가 20,000원, 원가 10,000원, 플랫폼 수수료 10%, 배송비 3,000원, 포장비 500원입니다.',
    steps: [
      '매출 20,000원, 수수료 2,000원',
      '비용: 10,000 + 3,000 + 500 = 13,500원 + 수수료 2,000원 = 15,500원',
      '순이익: 20,000 - 15,500 = 4,500원',
    ],
    conclusion:
      '한 개를 팔면 4,500원이 남고 마진율은 22.5%입니다. 손익분기 판매가는 15,000원이므로 그 아래로 팔면 손해입니다.',
  },
  notes: [
    '부가세를 고려해야 합니다. 일반과세자라면 판매가에 포함된 부가세(1/11)를 납부해야 하므로 실제 마진은 계산값보다 낮습니다.',
    '반품·교환 배송비, 광고비, 쿠폰 부담금은 별도로 발생합니다. 평균 반품률이 높은 품목은 기타비용에 반영하세요.',
    '플랫폼 수수료는 카테고리마다 다르고, 결제수단별 PG 수수료가 추가되는 경우도 있습니다.',
    '마진율(매출 대비)과 마크업(원가 대비)은 다른 숫자입니다. 거래처와 이야기할 때 어떤 기준인지 먼저 맞추세요.',
  ],
  faq: [
    {
      question: '마진율과 마크업은 어떻게 다른가요?',
      answer:
        '마진율은 이익 ÷ 매출, 마크업은 이익 ÷ 원가입니다. 원가 1만원을 2만원에 팔면 마진율은 50%지만 마크업은 100%입니다. 같은 거래를 두고 숫자가 달라지므로 기준을 명확히 해야 합니다.',
    },
    {
      question: '부가세는 어떻게 반영하나요?',
      answer:
        '일반과세자라면 판매가에 부가세가 포함되어 있고, 매입세액을 뺀 차액을 납부합니다. 정확히 계산하려면 판매가와 원가를 모두 공급가액(부가세 제외) 기준으로 넣는 것이 좋습니다.',
    },
    {
      question: '광고비도 넣을 수 있나요?',
      answer:
        '건당 광고비를 기타비용에 넣으면 됩니다. 광고 효율 자체를 보고 싶다면 ROAS 계산기를 사용하세요.',
    },
    {
      question: '손익분기 판매가는 무엇인가요?',
      answer:
        '이익이 0이 되는 가격입니다. 이 가격 아래로 팔면 팔수록 손해입니다. 할인 행사를 기획할 때 하한선으로 활용하세요.',
    },
  ],
  relatedGuides: ['margin-basics', 'pricing-guide'],
  ui: {
    priceLabel: '판매가',
    priceUnit: '원',
    priceHint: '고객이 결제하는 금액',
    pricePlaceholder: '예: 20,000',
    costLabel: '매입 원가',
    costHint: '상품 1개 매입가',
    costPlaceholder: '예: 10,000',
    feeLabel: '수수료율',
    feeHint: '플랫폼·PG 수수료 합계',
    shippingLabel: '배송비 부담액',
    shippingHint: '판매자가 부담하는 금액',
    otherLabel: '기타 비용',
    otherHint: '포장비·광고비 등',
    quantityLabel: '판매 수량',
    quantityUnit: '개',
    profitLabel: '순이익',
    marginRateLabel: '마진율',
    costRateLabel: '원가율',
    markupRateLabel: '마크업 (원가 대비)',
    revenueLabel: '매출',
    feeAmountLabel: '수수료',
    totalCostLabel: '총 비용',
    profitPerUnitLabel: '개당 순이익',
    breakEvenPriceLabel: '손익분기 판매가',
    noteProfit: '순이익은 %{profit}, 마진율은 %{rate}입니다.',
    notePerUnit: '개당으로는 %{perUnit}이 남습니다.',
    noteBreakEven: '%{breakEven} 아래로 팔면 손해입니다.',
    noteLoss: '현재 조건에서는 손실이 발생합니다. 판매가나 원가를 다시 확인해 보세요.',
    noteVat: '부가세와 반품 비용은 포함되지 않았습니다. 실제 마진은 이보다 낮을 수 있습니다.',
    issuePrice: '판매가는 0원 이상으로 입력해 주세요.',
    issueCost: '원가는 0원 이상으로 입력해 주세요.',
    issueFee: '수수료율은 0~100 사이로 입력해 주세요.',
    issueQuantity: '수량은 1개 이상으로 입력해 주세요.',
    issueAmount: '금액은 0원 이상으로 입력해 주세요.',
  },
};
