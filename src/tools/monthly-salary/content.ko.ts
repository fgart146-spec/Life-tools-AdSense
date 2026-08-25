import type { ToolContent } from '@/lib/tools/types';
import { PAYROLL_BASIS } from '@/lib/data/kr-payroll';
import type { SalaryToolCopy } from '@/lib/tools/shared/salary-copy';

export const contentKo: ToolContent<SalaryToolCopy> = {
  title: '월급 실수령액 계산기',
  seoTitle: '월급 실수령액 계산기 — 세전 월급에서 얼마가 빠질까',
  seoDescription:
    '세전 월급을 넣으면 4대보험과 세금을 뺀 실수령액을 계산합니다. 공제 항목별 금액과 공제율을 함께 확인하세요.',
  lead: '세전 월급을 넣으면 국민연금·건강보험·고용보험과 세금을 뺀 실수령액이 바로 나옵니다.',
  summary: '세전 월급에서 4대보험과 세금을 뺀 실수령액을 계산합니다.',
  keywords: {
    primaryKeyword: '월급 실수령액',
    secondaryKeywords: [
      '월급 실수령액 계산기',
      '세전 세후 월급',
      '월급 300 실수령액',
      '4대보험 얼마',
      '급여 공제액 계산',
    ],
    searchIntent:
      '세전 월급에서 4대보험과 세금을 빼면 실제로 얼마를 받는지 알고 싶다.',
  },
  howItWorks: [
    '입력한 월급을 12배해 연봉으로 환산한 뒤 동일한 기준으로 세금을 계산합니다.',
    '월급에서 식대 등 비과세액을 빼서 과세 대상 보수월액을 구합니다.',
    '4대보험은 국민연금 4.75%, 건강보험 3.595%, 장기요양보험(건강보험료의 13.14%), 고용보험 0.9%를 적용합니다. (2026년 요율)',
    '소득세는 근로소득공제·인적공제·보험료공제를 반영한 과세표준에 기본세율을 적용한 뒤 세액공제를 뺍니다.',
    '상여금이 별도로 지급되는 경우 이 계산에는 포함되지 않습니다.',
  ],
  formula: [
    { label: '과세 대상', expression: '보수월액 = 월급 - 월 비과세액' },
    { label: '연 환산', expression: '연 과세급여 = 보수월액 × 12' },
    { label: '실수령액', expression: '월급 - 4대보험 - 소득세 - 지방소득세' },
  ],
  example: {
    scenario: '세전 월급 300만원, 식대 비과세 20만원, 부양가족 본인 1명입니다.',
    steps: [
      '과세 대상: 3,000,000 - 200,000 = 2,800,000원',
      '4대보험: 국민연금 133,000원 + 건강보험 100,660원 + 장기요양 13,227원 + 고용보험 25,200원',
      '소득세 65,545원 + 지방소득세 6,555원 → 공제 합계 약 344,187원',
    ],
    conclusion:
      '실수령액은 약 2,655,813원(공제율 11.5%)입니다. 부양가족이 늘면 소득세가 줄어 실수령액이 올라갑니다.',
  },
  notes: [
    '회사마다 노조비, 사우회비, 식대 공제 등 추가 공제 항목이 있을 수 있습니다.',
    '상여금이 지급되는 달은 건강보험료와 소득세가 함께 올라갑니다.',
    '수습기간에 급여의 90%를 지급하는 경우, 그 금액을 넣어 계산하세요.',
    '이 계산은 근사치이며, 회사가 원천징수하는 실제 금액과 다를 수 있습니다.',
    `${PAYROLL_BASIS.rateYear}년 요율 기준이며 최종 확인일은 ${PAYROLL_BASIS.basisDate}입니다.`,
  ],
  faq: [
    {
      question: '월급 300만원이면 실수령액은 얼마인가요?',
      answer:
        '부양가족 1명(본인), 식대 비과세 20만원 기준으로 약 265만원입니다. 부양가족 수와 비과세 항목에 따라 달라지므로 실제 급여명세서와 비교해 보세요.',
    },
    {
      question: '4대보험은 왜 이렇게 많이 빠지나요?',
      answer:
        '국민연금(4.75%), 건강보험(3.595%), 장기요양보험, 고용보험(0.9%)을 합치면 과세 대상 급여의 약 9.8% 정도가 됩니다. 여기에 소득세와 지방소득세가 더해집니다. 참고로 회사도 같은 규모(또는 그 이상)를 부담합니다. 국민연금은 2026년부터 매년 0.5%p씩 올라 2033년 13%가 됩니다.',
    },
    {
      question: '연봉으로 계산하고 싶습니다.',
      answer:
        '연봉 실수령액 계산기를 사용하세요. 연봉을 12로 나눈 뒤 동일한 방식으로 계산합니다.',
    },
    {
      question: '시급으로 환산하면 얼마인가요?',
      answer:
        '시급 계산기에서 월급과 주 근로시간을 넣으면 시급을 환산할 수 있습니다. 주 40시간 기준 월 소정근로시간은 209시간입니다.',
    },
  ],
  basisDate: PAYROLL_BASIS.basisDate,
  sources: [{ label: PAYROLL_BASIS.sourceLabel }],
  relatedGuides: ['salary-net-guide'],
  ui: {
    amountLabel: '월급 (세전)',
    amountUnit: '원',
    amountHint: '비과세 항목을 포함한 세전 월급',
    amountPlaceholder: '예: 3,000,000',
    nonTaxableLabel: '월 비과세액',
    nonTaxableHint: '식대 등. 기본 20만원',
    dependentsLabel: '부양가족 수',
    dependentsUnit: '명',
    dependentsHint: '본인 포함',
    childrenLabel: '자녀 수 (9~20세)',
    childrenUnit: '명',
    childrenHint: '자녀세액공제 대상',
    netMonthlyLabel: '월 실수령액',
    netAnnualLabel: '연 실수령액',
    grossMonthlyLabel: '월 급여 (세전)',
    pensionLabel: '국민연금',
    healthLabel: '건강보험',
    careLabel: '장기요양보험',
    employmentLabel: '고용보험',
    incomeTaxLabel: '소득세',
    localTaxLabel: '지방소득세',
    totalDeductionLabel: '공제 합계',
    deductionRateLabel: '공제율',
    noteNet: '실수령액은 약 %{net}입니다.',
    noteDeduction: '공제 합계는 약 %{deduction}으로, 세전 급여의 약 %{rate}입니다.',
    noteAnnual: '연 환산 실수령액은 약 %{annual}입니다.',
    noteApprox: '이 결과는 근사치이며 회사 원천징수액과 차이가 있을 수 있습니다.',
    noteYearEnd: '최종 세액은 연말정산에서 정산됩니다.',
    issueSalary: '월급은 0원 이상으로 입력해 주세요.',
    issueNonTaxable: '비과세액은 0원 이상으로 입력해 주세요.',
    issueDependents: '부양가족 수는 1~20명 사이로 입력해 주세요.',
    issueChildren: '자녀 수는 0~20명 사이로 입력해 주세요.',
  },
};
