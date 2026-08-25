/** 목표 판매가 계산기 UI 문자열 */
export interface TargetPriceCopy {
  costLabel: string;
  costUnit: string;
  costHint: string;
  costPlaceholder: string;

  marginLabel: string;
  marginHint: string;

  feeLabel: string;
  feeHint: string;

  shippingLabel: string;
  shippingHint: string;

  otherLabel: string;
  otherHint: string;

  priceLabel: string;
  priceWithVatLabel: string;
  profitLabel: string;
  feeAmountLabel: string;
  totalCostLabel: string;

  /** %{price}, %{margin} */
  notePrice: string;
  /** %{profit} */
  noteProfit: string;
  /** %{vat} */
  noteVat: string;
  noteFee: string;
  noteRound: string;

  issueCost: string;
  issueMargin: string;
  issueFee: string;
  issueAmount: string;
  issueImpossible: string;
}
