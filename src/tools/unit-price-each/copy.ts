/** 개당 가격 계산기 UI 문자열 */
export interface UnitPriceEachCopy {
  priceLabel: string;
  priceUnit: string;
  priceHint: string;
  pricePlaceholder: string;

  countLabel: string;
  countUnit: string;
  countHint: string;
  countPlaceholder: string;

  subAmountLabel: string;
  subAmountHint: string;
  subAmountPlaceholder: string;
  subUnitLabel: string;
  subUnitPlaceholder: string;

  perItemLabel: string;
  perSubLabel: string;
  totalSubLabel: string;

  /** %{perItem} */
  noteMain: string;
  /** %{perSub}, %{unit} */
  noteSub: string;
  noteCompare: string;

  issuePrice: string;
  issueCount: string;
  issueSubAmount: string;
}
