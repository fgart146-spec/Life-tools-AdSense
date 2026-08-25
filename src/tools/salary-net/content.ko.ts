import type { ToolContent } from '@/lib/tools/types';
import { PAYROLL_BASIS } from '@/lib/data/kr-payroll';
import type { SalaryToolCopy } from '@/lib/tools/shared/salary-copy';

export const contentKo: ToolContent<SalaryToolCopy> = {
  title: '연봉 실수령액 계산기',
  seoTitle: '연봉 실수령액 계산기 — 4대보험·세금 빼고 얼마?',
  seoDescription:
    '연봉을 넣으면 국민연금·건강보험·고용보험과 소득세를 뺀 월 실수령액을 계산합니다. 부양가족과 비과세액까지 반영합니다.',
  lead: '연봉을 넣으면 4대보험과 세금을 뺀 월 실수령액을 계산합니다. 공제 항목별 금액도 함께 보여드립니다.',
  summary: '연봉에서 4대보험과 세금을 뺀 월 실수령액을 계산합니다.',
  keywords: {
    primaryKeyword: '연봉 실수령액',
    secondaryKeywords: [
      '연봉 실수령액 계산기',
      '연봉 3000 실수령액',
      '연봉 5000 월급',
      '세후 월급 계산',
      '4대보험 공제액',
    ],
    searchIntent:
      '연봉에서 세금과 4대보험을 빼면 매달 통장에 얼마가 들어오는지 알고 싶다.',
  },
  howItWorks: [
    '연봉을 12로 나눠 월 급여를 구하고, 식대 등 비과세액을 빼서 과세 대상 보수월액을 계산합니다.',
    '국민연금 4.75%, 건강보험 3.595%, 장기요양보험(건강보험료의 13.14%), 고용보험 0.9%를 근로자 부담분으로 계산합니다. (2026년 요율)',
    '국민연금은 기준소득월액 상한(659만원)과 하한(41만원)이 적용됩니다. (2026.7~2027.6)',
    '소득세는 근로소득공제 → 인적공제 → 보험료공제를 반영한 과세표준에 기본세율을 적용하고, 근로소득세액공제와 자녀세액공제를 뺀 뒤 12로 나눕니다.',
    '지방소득세는 소득세의 10%입니다.',
    '이 계산은 국세청 간이세액표를 그대로 적용한 값이 아니라 공제 구조를 반영한 근사치입니다.',
  ],
  formula: [
    { label: '과세 대상', expression: '보수월액 = 연봉 ÷ 12 - 월 비과세액' },
    {
      label: '4대보험',
      expression: '국민연금 4.75% + 건강보험 3.595% + 장기요양(건강보험료×13.14%) + 고용보험 0.9%',
    },
    {
      label: '과세표준',
      expression: '연 과세급여 - 근로소득공제 - 인적공제(150만×가족수) - 보험료공제',
    },
    { label: '결정세액', expression: '산출세액 - 근로소득세액공제 - 자녀세액공제' },
    { label: '실수령액', expression: '월 급여 - 4대보험 - 소득세 - 지방소득세' },
  ],
  example: {
    scenario: '연봉 4,000만원, 식대 비과세 20만원, 부양가족 본인 1명인 경우입니다.',
    steps: [
      '월 급여: 40,000,000 ÷ 12 = 약 3,333,333원, 과세 대상 3,133,333원',
      '4대보험: 국민연금 148,833원 + 건강보험 112,643원 + 장기요양 14,801원 + 고용보험 28,200원',
      '소득세 105,853원 + 지방소득세 10,585원 → 공제 합계 약 420,915원',
    ],
    conclusion:
      '월 실수령액은 약 2,912,418원(공제율 12.6%)입니다. 부양가족이 늘거나 비과세 항목이 많으면 실수령액이 올라갑니다.',
  },
  notes: [
    '회사가 원천징수하는 금액은 국세청 간이세액표를 따르며, 이 계산과 몇 천원~몇 만원 차이가 날 수 있습니다.',
    '연말정산에서 의료비·교육비·기부금·연금저축 등 추가 공제가 반영되면 최종 세액이 달라집니다.',
    '상여금·성과급이 있는 달은 공제액이 크게 달라집니다. 이 계산은 연봉을 12등분한 균등 지급을 가정합니다.',
    '비과세 항목(식대, 자가운전보조금, 육아수당 등)은 회사 규정에 따라 다릅니다. 급여명세서를 확인하세요.',
    `${PAYROLL_BASIS.rateYear}년 요율 기준이며 최종 확인일은 ${PAYROLL_BASIS.basisDate}입니다. 국민연금은 2026년부터 2033년까지 매년 0.5%p씩 오를 예정이라 해마다 확인이 필요합니다.`,
  ],
  faq: [
    {
      question: '실수령액이 회사에서 받는 금액과 다릅니다.',
      answer:
        '회사는 국세청 간이세액표를 사용해 원천징수하고, 이 계산기는 공제 구조를 반영한 근사 계산을 합니다. 또한 노조비·사우회비·중식대 공제 등 회사별 항목은 포함되지 않습니다. 차이는 연말정산에서 정산됩니다.',
    },
    {
      question: '부양가족 수는 어떻게 세나요?',
      answer:
        '본인을 포함해 기본공제 대상이 되는 가족 수를 넣습니다. 배우자(소득 요건 충족), 만 20세 이하 또는 만 60세 이상 부모 등이 해당합니다. 자녀는 부양가족 수에도 포함하고, 9~20세라면 자녀 수에도 따로 넣어 자녀세액공제를 반영하세요. (자녀세액공제 대상 연령은 2026년 귀속 기준 9세 이상이며 매년 1세씩 올라갑니다.)',
    },
    {
      question: '비과세액은 무엇을 넣나요?',
      answer:
        '식대는 월 20만원까지 비과세입니다. 자가운전보조금(월 20만원), 육아수당(월 20만원) 등도 조건을 충족하면 비과세입니다. 급여명세서의 비과세 항목 합계를 넣으면 됩니다.',
    },
    {
      question: '연봉에 퇴직금이 포함되나요?',
      answer:
        '일반적으로 퇴직금은 연봉과 별도입니다. 다만 "퇴직금 포함 연봉" 계약이라면 연봉의 13분의 12만 실제 급여이므로, 그 금액을 넣어 계산하세요.',
    },
    {
      question: '월급으로 계산하고 싶습니다.',
      answer:
        '월급 실수령액 계산기를 사용하면 월급을 그대로 넣어 계산할 수 있습니다.',
    },
  ],
  basisDate: PAYROLL_BASIS.basisDate,
  sources: [{ label: PAYROLL_BASIS.sourceLabel }],
  relatedGuides: ['salary-net-guide'],
  ui: {
    amountLabel: '연봉 (세전)',
    amountUnit: '원',
    amountHint: '비과세 항목을 포함한 계약 연봉',
    amountPlaceholder: '예: 40,000,000',
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
    noteNet: '매달 통장에 들어오는 금액은 약 %{net}입니다.',
    noteDeduction: '공제 합계는 약 %{deduction}으로, 세전 급여의 약 %{rate}입니다.',
    noteAnnual: '연 실수령액은 약 %{annual}입니다.',
    noteApprox: '이 결과는 근사치이며 회사 원천징수액과 차이가 있을 수 있습니다.',
    noteYearEnd: '최종 세액은 연말정산에서 정산됩니다.',
    issueSalary: '연봉은 0원 이상으로 입력해 주세요.',
    issueNonTaxable: '비과세액은 0원 이상으로 입력해 주세요.',
    issueDependents: '부양가족 수는 1~20명 사이로 입력해 주세요.',
    issueChildren: '자녀 수는 0~20명 사이로 입력해 주세요.',
  },
};
