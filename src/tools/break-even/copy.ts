/** 손익분기점 계산기 UI 문자열 */
export interface BreakEvenCopy {
  fixedCostLabel: string;
  fixedCostUnit: string;
  fixedCostHint: string;
  fixedCostPlaceholder: string;

  priceLabel: string;
  priceHint: string;
  pricePlaceholder: string;

  variableCostLabel: string;
  variableCostHint: string;
  variableCostPlaceholder: string;

  unitsLabel: string;
  unitsUnit: string;
  revenueLabel: string;
  contributionLabel: string;
  contributionRateLabel: string;
  perDayLabel: string;

  /** %{units}, %{revenue} */
  noteMain: string;
  /** %{contribution}, %{rate} */
  noteContribution: string;
  /** %{perDay} */
  notePerDay: string;
  noteFixed: string;
  noteBasis: string;

  issueFixed: string;
  issuePrice: string;
  issueVariable: string;
  issueMargin: string;
}
