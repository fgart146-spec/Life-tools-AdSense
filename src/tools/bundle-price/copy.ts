/** 묶음상품 단가 계산기 UI 문자열 */
export interface BundlePriceCopy {
  bundlePriceLabel: string;
  bundlePriceUnit: string;
  bundlePriceHint: string;
  bundlePricePlaceholder: string;

  countLabel: string;
  countUnit: string;
  countHint: string;

  amountLabel: string;
  amountHint: string;
  unitLabel: string;
  unitOptionG: string;
  unitOptionMl: string;
  unitOptionEa: string;

  singlePriceLabel: string;
  singlePriceHint: string;

  perItemLabel: string;
  per100Label: string;
  savingRateLabel: string;
  savingAmountLabel: string;
  totalAmountLabel: string;

  /** %{perItem} */
  noteMain: string;
  /** %{per100}, %{unit} */
  notePer100: string;
  /** %{rate}, %{amount} */
  noteSaving: string;
  noteNoSaving: string;
  noteCaution: string;

  issueBundlePrice: string;
  issueCount: string;
  issueAmount: string;
  issueSinglePrice: string;
}
