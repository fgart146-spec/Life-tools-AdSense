/** 연봉/월급 실수령액 계산기가 공유하는 UI 문자열 */
export interface SalaryToolCopy {
  amountLabel: string;
  amountUnit: string;
  amountHint: string;
  amountPlaceholder: string;

  nonTaxableLabel: string;
  nonTaxableHint: string;

  dependentsLabel: string;
  dependentsUnit: string;
  dependentsHint: string;

  childrenLabel: string;
  childrenUnit: string;
  childrenHint: string;

  netMonthlyLabel: string;
  netAnnualLabel: string;
  grossMonthlyLabel: string;
  pensionLabel: string;
  healthLabel: string;
  careLabel: string;
  employmentLabel: string;
  incomeTaxLabel: string;
  localTaxLabel: string;
  totalDeductionLabel: string;
  deductionRateLabel: string;

  /** %{net} */
  noteNet: string;
  /** %{deduction}, %{rate} */
  noteDeduction: string;
  /** %{annual} */
  noteAnnual: string;
  noteApprox: string;
  noteYearEnd: string;

  issueSalary: string;
  issueNonTaxable: string;
  issueDependents: string;
  issueChildren: string;
}
