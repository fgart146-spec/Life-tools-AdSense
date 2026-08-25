/** 카드할인 + 쿠폰 실구매가 계산기 UI 문자열 */
export interface CardCouponCopy {
  priceLabel: string;
  priceUnit: string;
  pricePlaceholder: string;
  quantityLabel: string;
  quantityUnit: string;

  couponPercentLabel: string;
  couponAmountLabel: string;
  cardPercentLabel: string;
  cardCapLabel: string;
  cardCapHint: string;
  shippingLabel: string;
  pointPercentLabel: string;
  pointHint: string;

  paymentLabel: string;
  listTotalLabel: string;
  couponDiscountLabel: string;
  cardDiscountLabel: string;
  shippingRowLabel: string;
  pointLabel: string;
  effectiveLabel: string;
  effectiveRateLabel: string;
  perItemLabel: string;

  /** %{payment} */
  notePayment: string;
  /** %{effective}, %{rate} */
  noteEffective: string;
  /** %{cap} */
  noteCap: string;
  noteOrder: string;

  issuePrice: string;
  issueQuantity: string;
  issuePercent: string;
  issueAmount: string;
}
