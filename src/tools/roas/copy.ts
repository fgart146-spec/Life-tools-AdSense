/** ROAS 계산기 UI 문자열 */
export interface RoasCopy {
  adCostLabel: string;
  adCostUnit: string;
  adCostHint: string;
  adCostPlaceholder: string;

  revenueLabel: string;
  revenueHint: string;
  revenuePlaceholder: string;

  contributionLabel: string;
  contributionHint: string;

  conversionsLabel: string;
  conversionsUnit: string;
  conversionsHint: string;

  roasLabel: string;
  adCostRateLabel: string;
  breakEvenRoasLabel: string;
  profitLabel: string;
  cpaLabel: string;
  aovLabel: string;

  /** %{roas} */
  noteRoas: string;
  /** %{rate} */
  noteAdRate: string;
  /** %{breakEven} */
  noteBreakEven: string;
  /** %{profit} */
  noteProfit: string;
  noteLoss: string;
  /** %{cpa}, %{aov} */
  noteCpa: string;
  noteBasis: string;

  issueAdCost: string;
  issueRevenue: string;
  issueRate: string;
  issueConversions: string;
}
