/** 원가율 계산기 UI 문자열 */
export interface CostRatioCopy {
  priceLabel: string;
  priceUnit: string;
  priceHint: string;
  pricePlaceholder: string;

  costLabel: string;
  costHint: string;
  costPlaceholder: string;

  targetLabel: string;
  targetHint: string;

  costRateLabel: string;
  grossMarginLabel: string;
  grossProfitLabel: string;
  targetCostLabel: string;
  targetPriceLabel: string;

  /** %{rate} */
  noteRate: string;
  /** %{profit} */
  noteProfit: string;
  /** %{cost}, %{price} */
  noteTarget: string;
  noteHighRate: string;
  noteBasis: string;

  issuePrice: string;
  issueCost: string;
  issueTarget: string;
}
