import type { ToolContent } from '@/lib/tools/types';
import type { LivingCostCopy } from './copy';

export const contentKo: ToolContent<LivingCostCopy> = {
  title: '가족 생활비 계산기',
  seoTitle: '가족 생활비 계산기 — 한 달 지출과 1인당 생활비',
  seoDescription:
    '주거비·식비·공과금 등 항목별 지출을 넣으면 한 달 총 생활비, 1인당 생활비, 항목별 비중, 소득 대비 지출 비율을 계산합니다.',
  lead: '항목별 지출을 넣으면 한 달 생활비 총액과 1인당 금액, 어디에 가장 많이 쓰는지를 한눈에 보여드립니다.',
  summary: '항목별 지출로 한 달 생활비와 1인당 비용, 지출 비중을 계산합니다.',
  keywords: {
    primaryKeyword: '생활비 계산기',
    secondaryKeywords: [
      '4인가족 생활비',
      '한달 생활비 평균',
      '1인당 생활비',
      '가계부 지출 비중',
      '월 고정지출 계산',
    ],
    searchIntent:
      '우리 집 한 달 생활비가 얼마인지, 어느 항목에 얼마나 쓰는지, 소득 대비 적정한지 확인하고 싶다.',
  },
  howItWorks: [
    '입력한 항목 금액을 모두 더해 한 달 총 생활비를 계산합니다.',
    '가구원 수로 나눠 1인당 생활비를, 30일로 나눠 하루 평균 지출을 구합니다.',
    '항목별 비중은 각 항목 금액 ÷ 총 지출로 계산하며, 금액이 큰 순서로 정렬해 보여줍니다.',
    '월 실수령 소득을 넣으면 소득 대비 지출 비율과 남는 금액(저축 가능액)을 함께 계산합니다.',
    '비워 둔 항목은 0으로 처리하므로, 해당되는 항목만 입력해도 됩니다.',
  ],
  formula: [
    { label: '총 생활비', expression: '총 생활비 = 모든 항목 금액의 합' },
    { label: '1인당 생활비', expression: '1인당 = 총 생활비 ÷ 가구원 수' },
    { label: '항목 비중', expression: '비중(%) = 항목 금액 ÷ 총 생활비 × 100' },
    { label: '소득 대비 지출', expression: '지출 비율(%) = 총 생활비 ÷ 월 실수령액 × 100' },
  ],
  example: {
    scenario:
      '4인 가족, 주거비 80만원, 식비 90만원, 공과금 25만원, 통신비 15만원, 교통비 20만원, 교육비 60만원, 월 실수령 450만원입니다.',
    steps: [
      '총 생활비: 80 + 90 + 25 + 15 + 20 + 60 = 290만원',
      '1인당: 290 ÷ 4 = 72.5만원, 하루 평균 약 9.7만원',
      '소득 대비: 290 ÷ 450 = 약 64.4%, 남는 금액 160만원',
    ],
    conclusion:
      '가장 비중이 큰 항목은 식비(약 31%)입니다. 소득의 약 64%를 쓰고 있어 월 160만원을 저축할 여력이 있습니다.',
  },
  notes: [
    '연 단위로 나가는 지출(자동차 보험, 명절비, 여행비 등)은 12로 나눠 월 금액으로 환산해 넣으면 실제와 가까워집니다.',
    '카드 결제는 청구 시점과 사용 시점이 달라 월별 편차가 큽니다. 최근 3개월 평균을 쓰면 안정적입니다.',
    '주거비에 전세대출 이자나 관리비가 포함되는지 기준을 정해두고 매달 같은 방식으로 기록하세요.',
    '이 계산은 참고용입니다. 가구 상황(자녀 연령, 지역, 주거 형태)에 따라 적정 수준은 크게 다릅니다.',
  ],
  faq: [
    {
      question: '4인 가족 평균 생활비는 얼마인가요?',
      answer:
        '가구 상황과 지역에 따라 편차가 매우 큽니다. 평균값을 목표로 삼기보다, 우리 집의 항목별 비중을 확인하고 줄일 수 있는 항목을 찾는 편이 실질적입니다. 통계청 가계동향조사 같은 공식 통계를 참고하면 대략적인 위치를 가늠할 수 있습니다.',
    },
    {
      question: '저축은 지출에 넣어야 하나요?',
      answer:
        '넣지 않는 편이 좋습니다. 저축은 지출이 아니라 남는 금액입니다. 월 소득을 입력하면 총 지출을 뺀 잉여 금액이 자동으로 계산됩니다.',
    },
    {
      question: '식비는 어디까지 포함하나요?',
      answer:
        '기준을 정하는 것이 중요합니다. 보통 장보기 + 외식 + 배달을 식비로 봅니다. 식비를 더 자세히 나누고 싶다면 월 장보기 예산 계산기를 함께 사용하세요.',
    },
    {
      question: '소득 대비 지출 비율은 몇 %가 적당한가요?',
      answer:
        '정답은 없지만, 고정지출(주거·통신·보험 등)이 소득의 50%를 넘으면 변동 상황에 대응하기 어려워집니다. 비중이 가장 큰 항목부터 점검해 보세요.',
    },
  ],
  relatedGuides: ['family-budget-basics'],
  ui: {
    membersLabel: '가구원 수',
    membersUnit: '명',
    membersHint: '함께 생활비를 쓰는 인원',
    incomeLabel: '월 실수령액 (선택)',
    incomeUnit: '원',
    incomeHint: '넣으면 소득 대비 비율을 계산합니다.',
    categoryTitle: '항목별 월 지출',
    categoryLabels: {
      housing: '주거비',
      food: '식비',
      utilities: '공과금',
      communication: '통신비',
      transport: '교통·차량',
      insurance: '보험료',
      education: '교육비',
      health: '의료·건강',
      leisure: '여가·문화',
      other: '기타',
    },
    categoryHints: {
      housing: '월세·관리비·주담대 상환 등',
      utilities: '전기·가스·수도',
      transport: '대중교통·주유·주차',
      other: '경조사·구독료 등',
    },
    totalLabel: '한 달 총 생활비',
    perPersonLabel: '1인당 생활비',
    perDayLabel: '하루 평균',
    annualLabel: '연간 지출',
    incomeRatioLabel: '소득 대비 지출',
    surplusLabel: '남는 금액',
    shareTitle: '항목별 비중',
    noteTotal: '한 달 생활비는 %{total}, 1인당 %{perPerson}입니다.',
    notePerDay: '하루 평균 %{perDay}을 쓰는 셈입니다.',
    noteTop: '가장 비중이 큰 항목은 %{top}으로 전체의 약 %{share}입니다.',
    noteIncome: '소득의 약 %{ratio}를 지출하고 있으며, 매달 %{surplus}이 남습니다.',
    noteDeficit: '지출이 소득보다 많습니다. 비중이 큰 항목부터 점검해 보세요.',
    noteAnnual: '이 지출이 1년 이어지면 연간 %{annual}입니다.',
    issueMembers: '가구원 수는 1~20명 사이로 입력해 주세요.',
    issueAmount: '지출 금액은 0원 이상으로 입력해 주세요.',
    issueIncome: '소득은 0원 이상으로 입력해 주세요.',
  },
};
