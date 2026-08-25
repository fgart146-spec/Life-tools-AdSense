import type { ToolContent } from '@/lib/tools/types';
import { MINIMUM_WAGE } from '@/lib/data/kr-payroll';
import type { HolidayPayCopy } from './copy';

export const contentKo: ToolContent<HolidayPayCopy> = {
  title: '주휴수당 계산기',
  seoTitle: '주휴수당 계산기 — 주 15시간 이상이면 얼마 받을까',
  seoDescription:
    '시급과 주 근로시간을 넣으면 주휴수당과 주휴 포함 주급을 계산합니다. 주 15시간 미만이면 발생하지 않는 이유도 안내합니다.',
  lead: '시급과 주 근로시간만 넣으면 주휴수당이 얼마인지, 주급이 얼마가 되는지 바로 계산합니다.',
  summary: '시급과 주 근로시간으로 주휴수당과 주급을 계산합니다.',
  keywords: {
    primaryKeyword: '주휴수당 계산기',
    secondaryKeywords: [
      '주휴수당 조건',
      '알바 주휴수당',
      '주 15시간 주휴수당',
      '주휴수당 얼마',
      '주휴수당 포함 주급',
    ],
    searchIntent:
      '주휴수당을 받을 수 있는지, 받는다면 얼마인지 시급과 근로시간으로 확인하고 싶다.',
  },
  howItWorks: [
    '주휴수당은 1주 소정근로시간이 15시간 이상이고 약속한 근로일을 모두 개근했을 때 발생합니다.',
    '주휴시간 = (주 소정근로시간 ÷ 40) × 8시간으로 계산하며, 최대 8시간입니다.',
    '주휴수당 = 주휴시간 × 시급입니다.',
    '주급(주휴 포함) = 주 근로시간 × 시급 + 주휴수당입니다.',
    '월 환산은 한 달 평균 4.345주를 곱해 계산합니다.',
  ],
  formula: [
    { label: '주휴시간', expression: '주휴시간 = min(8, 주 소정근로시간 ÷ 40 × 8)' },
    { label: '주휴수당', expression: '주휴수당 = 주휴시간 × 시급' },
    { label: '주급(주휴 포함)', expression: '주급 = 주 근로시간 × 시급 + 주휴수당' },
    { label: '월 환산', expression: '월 주휴수당 = 주휴수당 × 4.345' },
  ],
  example: {
    scenario: `시급 ${MINIMUM_WAGE.hourly.toLocaleString('ko-KR')}원, 주 20시간(주 5일 × 4시간) 근무하는 경우입니다.`,
    steps: [
      '주휴시간: 20 ÷ 40 × 8 = 4시간',
      `주휴수당: 4시간 × ${MINIMUM_WAGE.hourly.toLocaleString('ko-KR')}원 = ${(MINIMUM_WAGE.hourly * 4).toLocaleString('ko-KR')}원`,
      '주급: 20시간분 임금 + 주휴수당',
    ],
    conclusion:
      '주 20시간 근무자는 매주 4시간분의 주휴수당을 추가로 받습니다. 월로 환산하면 약 4.3주분이 됩니다.',
  },
  notes: [
    '주휴수당은 "개근"이 조건입니다. 약속한 근로일에 결근하면 그 주의 주휴수당은 발생하지 않습니다(지각·조퇴는 결근으로 보지 않는 것이 일반적입니다).',
    '주 15시간 미만인 초단시간 근로자는 주휴수당 대상이 아닙니다.',
    '월급제 근로자의 월급에는 주휴수당이 이미 포함된 것으로 보는 경우가 많습니다(월 209시간 기준). 별도로 더 받는 것이 아닙니다.',
    '퇴사 주에 근로관계가 종료되면 그 주의 주휴수당이 발생하지 않을 수 있습니다.',
    '구체적인 사안은 고용노동부 상담(1350)이나 관할 고용노동청에 확인하세요.',
  ],
  faq: [
    {
      question: '주휴수당은 누가 받을 수 있나요?',
      answer:
        '1주 소정근로시간이 15시간 이상이고, 약속한 근로일을 모두 개근한 근로자입니다. 아르바이트·단시간 근로자도 조건을 충족하면 받을 수 있습니다.',
    },
    {
      question: '주 15시간 미만이면 정말 못 받나요?',
      answer:
        '근로기준법상 초단시간 근로자(주 15시간 미만)는 주휴수당과 연차휴가 규정이 적용되지 않습니다. 다만 여러 주의 근로시간이 들쭉날쭉하다면 평균으로 판단하므로, 실제 근무 패턴을 기준으로 확인이 필요합니다.',
    },
    {
      question: '월급을 받는데 주휴수당을 따로 받아야 하나요?',
      answer:
        '월급제라면 통상 월 209시간(주휴 8시간 포함) 기준으로 임금이 정해져 있어 주휴수당이 포함된 것으로 봅니다. 급여명세서에 주휴수당 항목이 별도로 있는지 확인해 보세요.',
    },
    {
      question: '주 40시간을 넘게 일하면 주휴수당도 늘어나나요?',
      answer:
        '아닙니다. 주휴시간은 최대 8시간으로 제한됩니다. 40시간을 초과하는 근로는 연장근로로 보아 가산수당(통상임금의 50% 추가)이 적용됩니다.',
    },
  ],
  basisDate: MINIMUM_WAGE.basisDate,
  sources: [{ label: '근로기준법 제55조(휴일), 고용노동부 행정해석' }],
  relatedGuides: ['weekly-holiday-pay-guide'],
  ui: {
    hourlyLabel: '시급',
    hourlyUnit: '원',
    hourlyHint: '세전 시급',
    hourlyPlaceholder: '예: 10,320',
    weeklyHoursLabel: '주 소정근로시간',
    weeklyHoursUnit: '시간',
    weeklyHoursHint: '계약상 1주 근로시간',
    weeklyAmountLabel: '주휴수당 (1주)',
    holidayHoursLabel: '주휴시간',
    weeklyWorkPayLabel: '주 근로수당',
    weeklyTotalLabel: '주급 (주휴 포함)',
    monthlyAmountLabel: '월 환산 주휴수당',
    noteAmount: '매주 %{amount}의 주휴수당이 발생합니다.',
    noteHours: '주휴시간은 %{hours}시간으로 계산했습니다.',
    noteMonthly: '월로 환산하면 약 %{monthly}입니다.',
    noteNotEligible: '주 15시간 미만이면 주휴수당이 발생하지 않습니다.',
    noteCondition: '약속한 근로일을 모두 개근한 주에만 발생합니다.',
    issueHourly: '시급은 0원 이상으로 입력해 주세요.',
    issueHours: '주 근로시간은 0보다 크고 68시간 이하로 입력해 주세요.',
  },
};
