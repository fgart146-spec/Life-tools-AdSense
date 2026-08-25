import type { ToolContent } from '@/lib/tools/types';
import type { BreakEvenCopy } from './copy';

export const contentKo: ToolContent<BreakEvenCopy> = {
  title: '손익분기점 계산기',
  seoTitle: '손익분기점 계산기 — 몇 개 팔아야 본전일까',
  seoDescription:
    '고정비와 판매가, 변동비를 넣으면 손익분기 판매량과 매출액을 계산합니다. 하루 평균 몇 개를 팔아야 하는지도 알려드립니다.',
  lead: '한 달 고정비와 상품 하나의 판매가·변동비만 넣으면 몇 개를 팔아야 본전인지 계산합니다.',
  summary: '고정비와 공헌이익으로 손익분기 판매량과 매출액을 계산합니다.',
  keywords: {
    primaryKeyword: '손익분기점 계산기',
    secondaryKeywords: [
      '손익분기점 계산 방법',
      'BEP 계산',
      '공헌이익 계산',
      '몇 개 팔아야 본전',
      '창업 손익분기',
    ],
    searchIntent:
      '고정비를 감당하려면 한 달에 몇 개를 팔아야 하는지, 매출은 얼마가 필요한지 알고 싶다.',
  },
  howItWorks: [
    '공헌이익 = 판매가 - 변동비입니다. 한 개를 팔 때마다 고정비를 갚는 데 쓰이는 금액입니다.',
    '손익분기 판매량 = 고정비 ÷ 공헌이익입니다.',
    '손익분기 매출액 = 손익분기 판매량 × 판매가입니다.',
    '공헌이익률 = 공헌이익 ÷ 판매가로, 매출 100원 중 몇 원이 고정비 회수에 쓰이는지를 뜻합니다.',
    '판매가가 변동비보다 낮으면 아무리 팔아도 손익분기점에 도달할 수 없습니다.',
  ],
  formula: [
    { label: '공헌이익', expression: '공헌이익 = 판매가 - 변동비' },
    { label: '손익분기 판매량', expression: '손익분기 수량 = 고정비 ÷ 공헌이익' },
    { label: '손익분기 매출액', expression: '손익분기 매출 = 손익분기 수량 × 판매가' },
    { label: '공헌이익률', expression: '공헌이익률(%) = 공헌이익 ÷ 판매가 × 100' },
  ],
  example: {
    scenario: '월 고정비 300만원(임대료·인건비), 상품 판매가 15,000원, 변동비 9,000원입니다.',
    steps: [
      '공헌이익: 15,000 - 9,000 = 6,000원',
      '손익분기 판매량: 3,000,000 ÷ 6,000 = 500개',
      '손익분기 매출: 500 × 15,000 = 750만원',
    ],
    conclusion:
      '한 달에 500개(하루 평균 약 17개)를 팔아야 본전입니다. 그 이상부터는 한 개당 6,000원씩 이익이 쌓입니다.',
  },
  notes: [
    '고정비에는 임대료, 정규직 인건비, 보험료, 감가상각처럼 매출과 무관하게 나가는 비용을 넣습니다.',
    '변동비에는 원가, 포장비, 결제 수수료, 배송비처럼 판매량에 비례하는 비용을 넣습니다.',
    '아르바이트 인건비처럼 매출에 따라 조정되는 비용은 고정비와 변동비 어느 쪽으로 볼지 기준을 정해두세요.',
    '여러 상품을 파는 경우 평균 판매가와 평균 변동비를 넣으면 대략적인 규모를 파악할 수 있습니다.',
    '세금(부가세·소득세)은 포함되지 않았습니다.',
  ],
  faq: [
    {
      question: '고정비와 변동비를 어떻게 구분하나요?',
      answer:
        '한 개도 팔지 않아도 나가는 돈이면 고정비, 하나 팔 때마다 늘어나는 돈이면 변동비입니다. 임대료·정규직 급여는 고정비, 재료비·수수료·포장비는 변동비입니다.',
    },
    {
      question: '공헌이익이 왜 중요한가요?',
      answer:
        '공헌이익은 한 개를 팔 때마다 고정비를 갚아 나가는 금액입니다. 고정비를 모두 갚은 뒤부터는 공헌이익이 그대로 이익이 되므로, 손익분기점을 넘긴 이후의 수익성을 좌우합니다.',
    },
    {
      question: '여러 상품을 파는데 어떻게 계산하나요?',
      answer:
        '가중평균을 사용하세요. 매출 비중이 큰 상품 위주로 평균 판매가와 평균 변동비를 계산해 넣으면 대략적인 손익분기점을 알 수 있습니다.',
    },
    {
      question: '손익분기점을 낮추려면?',
      answer:
        '고정비를 줄이거나 공헌이익을 키워야 합니다. 공헌이익을 키우려면 판매가를 올리거나 변동비를 낮춰야 하는데, 목표 판매가 계산기와 원가율 계산기가 도움이 됩니다.',
    },
  ],
  relatedGuides: ['break-even-guide', 'margin-basics'],
  ui: {
    fixedCostLabel: '월 고정비',
    fixedCostUnit: '원',
    fixedCostHint: '임대료·인건비·보험 등',
    fixedCostPlaceholder: '예: 3,000,000',
    priceLabel: '1개 판매가',
    priceHint: '고객이 지불하는 금액',
    pricePlaceholder: '예: 15,000',
    variableCostLabel: '1개 변동비',
    variableCostHint: '원가·수수료·포장비 등',
    variableCostPlaceholder: '예: 9,000',
    unitsLabel: '손익분기 판매량',
    unitsUnit: '개',
    revenueLabel: '손익분기 매출액',
    contributionLabel: '개당 공헌이익',
    contributionRateLabel: '공헌이익률',
    perDayLabel: '하루 평균 필요 판매량',
    noteMain: '한 달에 %{units}개(매출 %{revenue})를 팔면 본전입니다.',
    noteContribution: '한 개를 팔 때마다 %{contribution}(공헌이익률 %{rate})이 고정비 회수에 쓰입니다.',
    notePerDay: '30일 기준 하루 평균 %{perDay}개를 팔아야 합니다.',
    noteFixed: '손익분기점을 넘기면 그 이후 판매분의 공헌이익이 그대로 이익이 됩니다.',
    noteBasis: '세금은 포함되지 않은 계산입니다.',
    issueFixed: '고정비는 0원 이상으로 입력해 주세요.',
    issuePrice: '판매가는 0보다 크게 입력해 주세요.',
    issueVariable: '변동비는 0원 이상으로 입력해 주세요.',
    issueMargin: '판매가가 변동비보다 커야 손익분기점을 계산할 수 있습니다.',
  },
};
