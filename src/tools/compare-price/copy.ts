/** 뭐가 더 싼지 비교 계산기 UI 문자열 */
export interface ComparePriceCopy {
  productA: string;
  productB: string;

  priceLabel: string;
  priceUnit: string;
  pricePlaceholder: string;
  amountLabel: string;
  amountPlaceholder: string;
  unitLabel: string;
  quantityLabel: string;
  quantityUnit: string;

  unitOptionG: string;
  unitOptionKg: string;
  unitOptionMl: string;
  unitOptionL: string;
  unitOptionEa: string;

  advancedToggle: string;
  couponPercentLabel: string;
  couponAmountLabel: string;
  cardPercentLabel: string;
  shippingLabel: string;
  pointPercentLabel: string;

  repeatLabel: string;
  repeatUnit: string;
  repeatHint: string;

  /** 결과 */
  verdictLabel: string;
  winnerA: string;
  winnerB: string;
  tie: string;
  perUnitLabel: string;
  finalPriceLabel: string;
  perItemLabel: string;
  totalAmountLabel: string;
  differenceLabel: string;
  savingTitle: string;
  savingPerPurchase: string;
  savingMonthly: string;
  savingYearly: string;

  /** %{winner}, %{percent} */
  noteWinner: string;
  /** %{amount}, %{saving} */
  noteSaving: string;
  /** %{monthly}, %{yearly} */
  noteRepeat: string;
  noteTie: string;
  noteEffective: string;

  issueAPrice: string;
  issueAAmount: string;
  issueAQuantity: string;
  issueBPrice: string;
  issueBAmount: string;
  issueBQuantity: string;
  issueUnitMismatch: string;
}
