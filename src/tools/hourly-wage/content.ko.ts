import type { ToolContent } from '@/lib/tools/types';
import { MINIMUM_WAGE } from '@/lib/data/kr-payroll';
import type { HourlyWageCopy } from './copy';

export const contentKo: ToolContent<HourlyWageCopy> = {
  title: '시급 계산기',
  seoTitle: '시급 계산기 — 월급을 시급으로, 시급을 월급으로',
  seoDescription:
    '월급과 주 근로시간을 넣으면 시급이 나옵니다. 주휴수당을 포함한 월 소정근로시간(209시간) 기준으로 계산하고 최저임금과 비교합니다.',
  lead: '월급을 시급으로, 시급을 월급으로 환산합니다. 주휴수당 포함 여부를 선택할 수 있고 최저임금과도 비교해 드립니다.',
  summary: '월급과 시급을 서로 환산하고 최저임금과 비교합니다.',
  keywords: {
    primaryKeyword: '시급 계산기',
    secondaryKeywords: [
      '월급 시급 환산',
      '시급 월급 계산',
      '209시간 계산',
      '최저임금 월급',
      '주휴수당 포함 시급',
    ],
    searchIntent:
      '월급을 시급으로(또는 시급을 월급으로) 환산하고, 최저임금 기준을 넘는지 확인하고 싶다.',
  },
  howItWorks: [
    '월 소정근로시간 = (주 소정근로시간 + 주휴시간) × 4.345주로 계산합니다. 주 40시간이면 (40 + 8) × 4.345 ≈ 209시간입니다.',
    '주휴시간은 주 소정근로시간이 15시간 이상일 때 발생하며, (주 근로시간 ÷ 40) × 8시간입니다(최대 8시간).',
    '월급 → 시급은 월급 ÷ 월 소정근로시간, 시급 → 월급은 시급 × 월 소정근로시간으로 계산합니다.',
    '주휴수당 포함을 해제하면 실제 근로시간(주 40시간 기준 약 174시간)으로만 나눕니다.',
    `최저임금(시간급 ${MINIMUM_WAGE.hourly.toLocaleString('ko-KR')}원) 대비 비율을 함께 표시합니다.`,
  ],
  formula: [
    { label: '주휴시간', expression: '주휴시간 = (주 소정근로시간 ÷ 40) × 8 (주 15시간 이상일 때)' },
    { label: '월 소정근로시간', expression: '(주 소정근로시간 + 주휴시간) × 4.345' },
    { label: '시급', expression: '시급 = 월급 ÷ 월 소정근로시간' },
    { label: '월급', expression: '월급 = 시급 × 월 소정근로시간' },
  ],
  example: {
    scenario: '주 40시간 근무하고 월급 209만원을 받는 경우입니다.',
    steps: [
      '월 소정근로시간: (40 + 8) × 4.345 ≈ 208.6시간',
      '시급: 2,090,000 ÷ 208.6 ≈ 10,020원',
      '최저임금과 비교: 약 100% 수준',
    ],
    conclusion:
      '시급으로 환산하면 약 10,020원입니다. 주휴수당을 빼고 실근로시간(약 174시간)으로 나누면 약 12,020원이 됩니다.',
  },
  notes: [
    '월 209시간은 주 40시간 근로자의 관행적인 기준입니다. 실제 계약 시간이 다르면 주 근로시간을 정확히 입력하세요.',
    '연장·야간·휴일근로 수당은 이 계산에 포함되지 않습니다. 가산수당은 통상임금의 50%가 추가됩니다.',
    '최저임금 위반 여부는 "최저임금 산입범위"에 포함되는 임금만으로 판단합니다. 복리후생비·상여금 일부는 산입 비율이 정해져 있어 실제 판단은 더 복잡합니다.',
    `최저임금 기준일은 ${MINIMUM_WAGE.basisDate}입니다. 매년 바뀌므로 최신 고시를 확인하세요.`,
  ],
  faq: [
    {
      question: '왜 209시간으로 나누나요?',
      answer:
        '주 40시간 근로자는 유급 주휴 8시간을 포함해 주 48시간분의 임금을 받습니다. 여기에 한 달 평균 주수(4.345주)를 곱하면 약 209시간이 되고, 이것이 월급을 시급으로 환산할 때의 관행적 기준입니다.',
    },
    {
      question: '주휴수당 포함을 해제하면 왜 시급이 올라가나요?',
      answer:
        '같은 월급을 더 적은 시간(주휴시간 제외)으로 나누기 때문입니다. 다만 최저임금 위반 판단은 주휴시간을 포함한 209시간 기준으로 하는 것이 일반적입니다.',
    },
    {
      question: '아르바이트도 주휴수당을 받나요?',
      answer:
        '주 소정근로시간이 15시간 이상이고 약정한 근로일을 모두 출근했다면 받을 수 있습니다. 주휴수당 계산기에서 정확한 금액을 확인해 보세요.',
    },
    {
      question: '실수령액도 알 수 있나요?',
      answer:
        '이 계산기는 세전 기준입니다. 4대보험과 세금을 뺀 금액은 월급 실수령액 계산기에서 확인하세요.',
    },
  ],
  basisDate: MINIMUM_WAGE.basisDate,
  sources: [{ label: MINIMUM_WAGE.sourceLabel }],
  relatedGuides: ['weekly-holiday-pay-guide', 'salary-net-guide'],
  ui: {
    modeLabel: '변환 방향',
    modeToHourly: '월급 → 시급',
    modeToMonthly: '시급 → 월급',
    amountLabelMonthly: '월급 (세전)',
    amountLabelHourly: '시급',
    amountUnit: '원',
    amountHint: '세전 금액을 넣으세요.',
    weeklyHoursLabel: '주 소정근로시간',
    weeklyHoursUnit: '시간',
    weeklyHoursHint: '주 5일 8시간이면 40',
    includeHolidayLabel: '주휴시간 포함 (209시간 기준)',
    includeHolidayHint: '해제하면 실근로시간만으로 계산합니다.',
    hourlyLabel: '시급',
    monthlyLabel: '월급',
    dailyLabel: '일급 (8시간)',
    weeklyLabel: '주급',
    annualLabel: '연봉 환산',
    monthlyHoursLabel: '월 소정근로시간',
    minimumRatioLabel: '최저임금 대비',
    noteHourly: '시급은 약 %{hourly}입니다.',
    noteMonthly: '월급으로 환산하면 약 %{monthly}입니다.',
    noteHours: '월 소정근로시간은 약 %{hours}시간으로 계산했습니다.',
    noteMinimum: '최저임금(%{minimum}) 대비 약 %{ratio} 수준입니다.',
    noteBelowMinimum: '최저임금보다 낮게 계산되었습니다. 계약 조건과 산입 범위를 확인해 보세요.',
    noteBasis: '연장·야간·휴일 가산수당은 포함되지 않은 기본 환산 금액입니다.',
    issueAmount: '금액은 0원 이상으로 입력해 주세요.',
    issueHours: '주 근로시간은 0보다 크고 68시간 이하로 입력해 주세요.',
  },
};
