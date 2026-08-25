import type { ToolContent } from '@/lib/tools/types';
import type { GroceryBudgetCopy } from './copy';

export const contentKo: ToolContent<GroceryBudgetCopy> = {
  title: '월 장보기 예산 계산기',
  seoTitle: '월 식비 예산 계산기 — 장보기·외식·배달 합쳐 얼마?',
  seoDescription:
    '주 장보기 횟수와 금액, 외식·배달 습관을 넣으면 한 달 식비와 1인당 하루 식비를 계산합니다. 목표 예산과의 차이도 확인하세요.',
  lead: '평소 장보기·외식·배달 습관을 넣으면 한 달 식비가 얼마나 되는지, 1인당 하루로는 얼마인지 계산합니다.',
  summary: '장보기·외식·배달 습관으로 한 달 식비를 계산합니다.',
  keywords: {
    primaryKeyword: '월 장보기 예산',
    secondaryKeywords: [
      '4인가족 식비',
      '한달 식비 계산',
      '1인당 식비',
      '외식비 계산',
      '식비 예산 세우기',
    ],
    searchIntent:
      '한 달 식비가 얼마나 나가는지, 목표 예산에 맞추려면 어디를 줄여야 하는지 알고 싶다.',
  },
  howItWorks: [
    '주 단위 습관을 월 단위로 환산합니다. 한 달은 52주 ÷ 12개월 = 약 4.33주로 계산합니다.',
    '장보기·외식·배달을 각각 (주 횟수 × 1회 금액 × 4.33)으로 계산해 더합니다.',
    '가구원 수로 나눠 1인당 식비를, 30일로 나눠 하루 식비를 구합니다.',
    '외식과 배달이 전체 식비에서 차지하는 비중을 함께 보여줍니다. 줄일 여지를 찾는 데 도움이 됩니다.',
    '목표 예산을 넣으면 초과·여유 금액을 계산합니다.',
  ],
  formula: [
    { label: '월 장보기 비용', expression: '주 횟수 × 1회 금액 × 4.33' },
    { label: '월 식비', expression: '장보기 + 외식 + 배달' },
    { label: '1인당 하루 식비', expression: '월 식비 ÷ 가구원 수 ÷ 30' },
    { label: '외식·배달 비중', expression: '(외식 + 배달) ÷ 월 식비 × 100' },
  ],
  example: {
    scenario:
      '4인 가족이 주 2회 장을 보고 회당 8만원, 주 1회 외식에 6만원, 주 1회 배달 3만원을 씁니다.',
    steps: [
      '장보기: 2 × 80,000 × 4.33 = 약 693,000원',
      '외식: 1 × 60,000 × 4.33 = 약 260,000원',
      '배달: 1 × 30,000 × 4.33 = 약 130,000원',
    ],
    conclusion:
      '한 달 식비는 약 108만원, 1인당 약 27만원, 1인 하루 약 9,000원입니다. 외식·배달이 전체의 약 36%를 차지하므로 여기를 줄이면 효과가 큽니다.',
  },
  notes: [
    '장보기 금액에는 생필품(휴지·세제 등)이 섞이기 쉽습니다. 식비만 보고 싶다면 영수증에서 분리해 넣으세요.',
    '주별 편차가 큰 가구는 최근 4주 평균을 넣으면 현실적인 값이 나옵니다.',
    '명절·생일 같은 특별 지출은 별도로 관리하는 편이 예산 관리에 유리합니다.',
    '외식 금액은 가구 전체 금액을 넣어야 합니다(1인 금액이 아닙니다).',
  ],
  faq: [
    {
      question: '한 달을 4주로 계산하면 안 되나요?',
      answer:
        '4주로 계산하면 1년에 4주(약 한 달치)가 누락됩니다. 실제로는 한 달이 평균 4.33주이므로 이 계산기는 52 ÷ 12를 사용합니다. 그래서 단순 4주 계산보다 약 8% 높게 나옵니다.',
    },
    {
      question: '식비를 줄이려면 무엇부터 봐야 하나요?',
      answer:
        '보통 외식·배달 비중이 가장 큰 변수입니다. 결과에 표시되는 외식·배달 비중이 40%를 넘는다면 주 1회만 줄여도 월 10만원 이상 차이가 납니다. 장보기 자체를 줄이기보다 단가가 싼 상품으로 바꾸는 편이 스트레스가 적습니다.',
    },
    {
      question: '1인 가구도 쓸 수 있나요?',
      answer:
        '가능합니다. 가구원 수를 1로 두면 됩니다. 1인 가구는 대용량 구매로 남기는 손실이 크므로, 대용량 vs 소용량 비교 계산기를 함께 사용해 보세요.',
    },
    {
      question: '적정 식비 비중은 얼마인가요?',
      answer:
        '가구 상황에 따라 다르지만, 식비가 생활비의 30%를 넘으면 다른 지출을 압박하기 쉽습니다. 생활비 계산기에서 전체 비중을 함께 확인해 보세요.',
    },
  ],
  relatedGuides: ['family-budget-basics', 'unit-price-basics'],
  ui: {
    membersLabel: '가구원 수',
    membersUnit: '명',
    groceryTitle: '장보기',
    groceryTimesLabel: '주 횟수',
    groceryTimesUnit: '회/주',
    groceryAmountLabel: '1회 평균 금액',
    groceryAmountHint: '식품 위주 금액',
    diningTitle: '외식',
    diningTimesLabel: '주 횟수',
    diningAmountLabel: '1회 평균 금액',
    diningAmountHint: '가구 전체 기준',
    deliveryTitle: '배달',
    deliveryTimesLabel: '주 횟수',
    deliveryAmountLabel: '1회 평균 금액',
    targetLabel: '목표 월 식비 (선택)',
    targetHint: '넣으면 초과·여유 금액을 계산합니다.',
    totalLabel: '한 달 식비',
    groceryMonthlyLabel: '월 장보기',
    diningMonthlyLabel: '월 외식',
    deliveryMonthlyLabel: '월 배달',
    perPersonLabel: '1인당 월 식비',
    perDayLabel: '하루 식비',
    perPersonPerDayLabel: '1인 하루 식비',
    eatingOutShareLabel: '외식·배달 비중',
    targetDiffLabel: '목표 대비',
    noteTotal: '한 달 식비는 약 %{total}입니다.',
    notePerPerson: '1인당 월 %{perPerson}, 하루 %{perPersonPerDay} 수준입니다.',
    noteEatingOut: '외식·배달이 전체 식비의 약 %{share}를 차지합니다.',
    noteOverBudget: '목표 예산보다 약 %{over} 많습니다. 외식·배달 횟수를 조정해 보세요.',
    noteUnderBudget: '목표 예산보다 약 %{under} 여유가 있습니다.',
    noteTip: '장보기 단가를 낮추려면 100g당 가격이나 뭐가 더 싼지 비교 계산기를 함께 써보세요.',
    issueMembers: '가구원 수는 1~20명 사이로 입력해 주세요.',
    issueTimes: '주 횟수는 0~21회 사이로 입력해 주세요.',
    issueAmount: '금액은 0원 이상으로 입력해 주세요.',
    issueTarget: '목표 예산은 0원 이상으로 입력해 주세요.',
  },
};
