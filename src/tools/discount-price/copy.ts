/** 할인·쿠폰 적용 최종가격 계산기 UI 문자열 */
export interface DiscountPriceCopy {
  priceLabel: string;
  priceUnit: string;
  priceHint: string;
  pricePlaceholder: string;

  quantityLabel: string;
  quantityUnit: string;

  discountLabel: string;
  discountHint: string;

  couponLabel: string;
  couponHint: string;

  finalLabel: string;
  listTotalLabel: string;
  discountAmountLabel: string;
  effectiveRateLabel: string;
  perItemLabel: string;

  /** %{final} */
  noteFinal: string;
  /** %{amount}, %{rate} */
  noteDiscount: string;
  /** %{perItem} */
  notePerItem: string;
  noteOrder: string;

  issuePrice: string;
  issueQuantity: string;
  issueDiscount: string;
  issueCoupon: string;
}
