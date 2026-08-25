import type { LivingCostKey } from '@/lib/calc/living-cost';

/** 가족 생활비 계산기 UI 문자열 */
export interface LivingCostCopy {
  membersLabel: string;
  membersUnit: string;
  membersHint: string;

  incomeLabel: string;
  incomeUnit: string;
  incomeHint: string;

  categoryTitle: string;
  categoryLabels: Record<LivingCostKey, string>;
  categoryHints: Partial<Record<LivingCostKey, string>>;

  totalLabel: string;
  perPersonLabel: string;
  perDayLabel: string;
  annualLabel: string;
  incomeRatioLabel: string;
  surplusLabel: string;
  shareTitle: string;

  /** %{total}, %{perPerson} */
  noteTotal: string;
  /** %{perDay} */
  notePerDay: string;
  /** %{top}, %{share} */
  noteTop: string;
  /** %{ratio}, %{surplus} */
  noteIncome: string;
  noteDeficit: string;
  noteAnnual: string;

  issueMembers: string;
  issueAmount: string;
  issueIncome: string;
}
