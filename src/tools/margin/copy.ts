/** 판매 마진 계산기 UI 문자열 */
export interface MarginCopy {
  priceLabel: string;
  priceUnit: string;
  priceHint: string;
  pricePlaceholder: string;

  costLabel: string;
  costHint: string;
  costPlaceholder: string;

  feeLabel: string;
  feeHint: string;

  shippingLabel: string;
  shippingHint: string;

  otherLabel: string;
  otherHint: string;

  quantityLabel: string;
  quantityUnit: string;

  profitLabel: string;
  marginRateLabel: string;
  costRateLabel: string;
  markupRateLabel: string;
  revenueLabel: string;
  feeAmountLabel: string;
  totalCostLabel: string;
  profitPerUnitLabel: string;
  breakEvenPriceLabel: string;

  /** %{profit}, %{rate} */
  noteProfit: string;
  /** %{perUnit} */
  notePerUnit: string;
  /** %{breakEven} */
  noteBreakEven: string;
  noteLoss: string;
  noteVat: string;

  issuePrice: string;
  issueCost: string;
  issueFee: string;
  issueQuantity: string;
  issueAmount: string;
}
