/** 대용량 vs 소용량 비교 계산기 UI 문자열 */
export interface BulkVsSmallCopy {
  bulkTitle: string;
  smallTitle: string;

  priceLabel: string;
  priceUnit: string;
  amountLabel: string;
  bulkPricePlaceholder: string;
  bulkAmountPlaceholder: string;
  smallPricePlaceholder: string;
  smallAmountPlaceholder: string;

  unitLabel: string;
  unitOptionG: string;
  unitOptionMl: string;
  unitOptionEa: string;

  usageLabel: string;
  usageHint: string;

  verdictLabel: string;
  betterBulk: string;
  betterSmall: string;
  tie: string;
  bulkUnitLabel: string;
  smallUnitLabel: string;
  bulkEffectiveLabel: string;
  breakEvenLabel: string;

  /** %{better}, %{diff} */
  noteVerdict: string;
  /** %{usage}, %{effective} */
  noteUsage: string;
  /** %{breakEven} */
  noteBreakEven: string;
  noteTie: string;
  noteCaution: string;

  issueBulkPrice: string;
  issueBulkAmount: string;
  issueSmallPrice: string;
  issueSmallAmount: string;
  issueUsage: string;
}
