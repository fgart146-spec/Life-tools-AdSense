import type { ToolContent } from '@/lib/tools/types';
import type { RoasCopy } from './copy';

export const contentKo: ToolContent<RoasCopy> = {
  title: 'ROAS 계산기',
  seoTitle: 'ROAS 계산기 — 광고비 대비 매출, 손익분기 ROAS까지',
  seoDescription:
    '광고비와 광고 매출을 넣으면 ROAS를 계산하고, 공헌이익률을 넣으면 손익분기 ROAS와 실제 광고 이익까지 알려드립니다.',
  lead: '광고비와 매출을 넣으면 ROAS가 나옵니다. 공헌이익률까지 넣으면 "이 광고가 실제로 남는 광고인지"를 판단할 수 있습니다.',
  summary: 'ROAS와 손익분기 ROAS, 광고 이익을 계산합니다.',
  keywords: {
    primaryKeyword: 'ROAS 계산기',
    secondaryKeywords: [
      'ROAS 계산 방법',
      '손익분기 ROAS',
      '광고비 대비 매출',
      'ROAS 몇 퍼센트',
      'CPA 계산',
    ],
    searchIntent:
      '광고비 대비 매출(ROAS)이 얼마인지, 이익이 남는 수준인지 판단하고 싶다.',
  },
  howItWorks: [
    'ROAS(%) = 광고 매출 ÷ 광고비 × 100입니다. 500%면 광고비 1원당 5원의 매출이 발생했다는 뜻입니다.',
    '광고비 비율 = 광고비 ÷ 매출 × 100으로, ROAS의 역수입니다.',
    '공헌이익률을 넣으면 손익분기 ROAS를 계산합니다. 손익분기 ROAS = 1 ÷ 공헌이익률 × 100입니다.',
    '광고 이익 = 매출 × 공헌이익률 - 광고비입니다. 이 값이 0보다 커야 광고를 유지할 이유가 있습니다.',
    '전환 수를 넣으면 CPA(전환당 광고비)와 객단가도 함께 계산합니다.',
  ],
  formula: [
    { label: 'ROAS', expression: 'ROAS(%) = 광고 매출 ÷ 광고비 × 100' },
    { label: '손익분기 ROAS', expression: '손익분기 ROAS(%) = 1 ÷ 공헌이익률 × 100' },
    { label: '광고 이익', expression: '광고 이익 = 매출 × 공헌이익률 - 광고비' },
    { label: 'CPA', expression: 'CPA = 광고비 ÷ 전환 수' },
  ],
  example: {
    scenario: '광고비 100만원으로 매출 500만원이 발생했고, 공헌이익률은 30%입니다.',
    steps: [
      'ROAS: 5,000,000 ÷ 1,000,000 = 500%',
      '손익분기 ROAS: 1 ÷ 0.3 = 약 333%',
      '광고 이익: 5,000,000 × 30% - 1,000,000 = 50만원',
    ],
    conclusion:
      'ROAS 500%는 손익분기 ROAS 333%를 넘으므로 이익이 남는 광고입니다. 다만 공헌이익률이 20%로 떨어지면 손익분기 ROAS가 500%가 되어 본전이 됩니다.',
  },
  notes: [
    'ROAS만 보면 판단할 수 없습니다. 마진이 낮은 상품은 ROAS 500%여도 손해일 수 있습니다.',
    '공헌이익률은 (판매가 - 변동비) ÷ 판매가입니다. 원가·수수료·배송비를 뺀 비율을 넣으세요.',
    '광고 매출은 광고를 통해 발생한 매출만 넣어야 합니다. 자연 유입 매출까지 포함하면 ROAS가 과대평가됩니다.',
    '기여 기간(어트리뷰션 윈도)에 따라 매출 집계가 달라집니다. 7일·30일 등 기준을 통일해서 비교하세요.',
    '반품·취소가 많은 품목은 반품률을 반영한 순매출로 계산하는 편이 정확합니다.',
  ],
  faq: [
    {
      question: 'ROAS가 몇 % 이상이면 좋은 건가요?',
      answer:
        '정해진 기준은 없습니다. 공헌이익률에 따라 달라지기 때문입니다. 공헌이익률 30%라면 333% 이상, 20%라면 500% 이상이어야 본전입니다. 이 계산기에서 손익분기 ROAS를 먼저 확인하세요.',
    },
    {
      question: 'ROAS와 ROI는 무엇이 다른가요?',
      answer:
        'ROAS는 광고비 대비 "매출"이고, ROI는 투자 대비 "이익"입니다. ROAS가 높아도 마진이 얇으면 ROI는 마이너스일 수 있습니다.',
    },
    {
      question: '공헌이익률은 어떻게 구하나요?',
      answer:
        '(판매가 - 변동비) ÷ 판매가입니다. 변동비에는 원가, 결제 수수료, 배송비, 포장비가 들어갑니다. 마진 계산기에서 구한 값을 넣으면 편합니다.',
    },
    {
      question: 'CPA는 어떻게 활용하나요?',
      answer:
        '전환 1건을 만드는 데 드는 광고비입니다. 객단가 × 공헌이익률보다 CPA가 낮아야 이익이 남습니다. 두 값을 함께 보면 판단이 빨라집니다.',
    },
  ],
  relatedGuides: ['roas-guide', 'margin-basics'],
  ui: {
    adCostLabel: '광고비',
    adCostUnit: '원',
    adCostHint: '집행한 광고 비용',
    adCostPlaceholder: '예: 1,000,000',
    revenueLabel: '광고 매출',
    revenueHint: '광고로 발생한 매출',
    revenuePlaceholder: '예: 5,000,000',
    contributionLabel: '공헌이익률 (선택)',
    contributionHint: '(판매가-변동비) ÷ 판매가',
    conversionsLabel: '전환 수 (선택)',
    conversionsUnit: '건',
    conversionsHint: '주문 건수 등',
    roasLabel: 'ROAS',
    adCostRateLabel: '광고비 비율',
    breakEvenRoasLabel: '손익분기 ROAS',
    profitLabel: '광고 이익',
    cpaLabel: 'CPA (전환당 광고비)',
    aovLabel: '객단가',
    noteRoas: 'ROAS는 %{roas}입니다.',
    noteAdRate: '매출에서 광고비가 차지하는 비율은 %{rate}입니다.',
    noteBreakEven: '손익분기 ROAS는 %{breakEven}입니다. 이 값을 넘겨야 이익이 납니다.',
    noteProfit: '광고를 통해 남는 이익은 약 %{profit}입니다.',
    noteLoss: '현재 조건에서는 광고비가 공헌이익보다 커서 손실입니다.',
    noteCpa: '전환당 광고비는 %{cpa}, 객단가는 %{aov}입니다.',
    noteBasis: '광고로 발생한 매출만 넣어야 정확합니다. 반품·취소가 많으면 순매출로 계산하세요.',
    issueAdCost: '광고비는 0보다 크게 입력해 주세요.',
    issueRevenue: '매출은 0원 이상으로 입력해 주세요.',
    issueRate: '공헌이익률은 0~100 사이로 입력해 주세요.',
    issueConversions: '전환 수는 0 이상으로 입력해 주세요.',
  },
};
