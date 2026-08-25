/** 1+1 / 2+1 등 증정 행사 계산기가 공유하는 UI 문자열 */
export interface BogoToolCopy {
  priceLabel: string;
  priceUnit: string;
  priceHint: string;
  pricePlaceholder: string;

  buyLabel: string;
  buyUnit: string;
  buyHint: string;

  freeLabel: string;
  freeUnit: string;
  freeHint: string;

  compareLabel: string;
  compareHint: string;

  discountRateLabel: string;
  effectiveUnitLabel: string;
  totalItemsLabel: string;
  paidLabel: string;
  comparePriceLabel: string;

  /** %{rate} */
  noteRate: string;
  /** %{unitPrice}, %{items} */
  noteUnit: string;
  /** %{better}, %{diff} */
  noteCompare: string;
  noteCompareTie: string;
  betterBogo: string;
  betterDiscount: string;
  noteCaution: string;

  issuePrice: string;
  issueBuy: string;
  issueFree: string;
  issueCompare: string;
}
