import { computePurchase, effectiveDiscountRate } from '@/lib/calc/purchase';

/**
 * 할인율 + 정액 쿠폰을 적용한 최종 결제금액.
 * 적용 순서는 사이트 공통 기준(정률 → 정액)을 따른다.
 */
export interface DiscountPriceInput {
  price: number | null;
  quantity: number | null;
  discountPercent: number | null;
  couponAmount: number | null;
}

export interface DiscountPriceResult {
  /** 할인 전 총액 */
  listTotal: number;
  /** 총 할인 금액 */
  discountAmount: number;
  /** 최종 결제금액 */
  finalPrice: number;
  /** 정가 대비 실질 할인율(%) */
  effectiveRate: number;
  /** 1개당 최종 가격 */
  perItem: number;
}

export type DiscountPriceIssue = 'price' | 'quantity' | 'discount' | 'coupon';

export function findIssues(input: DiscountPriceInput): DiscountPriceIssue[] {
  const issues: DiscountPriceIssue[] = [];
  if (input.price !== null && input.price < 0) issues.push('price');
  if (input.quantity !== null && input.quantity <= 0) issues.push('quantity');
  if (input.discountPercent !== null && (input.discountPercent < 0 || input.discountPercent > 100)) {
    issues.push('discount');
  }
  if (input.couponAmount !== null && input.couponAmount < 0) issues.push('coupon');
  return issues;
}

export function calcDiscountPrice(input: DiscountPriceInput): DiscountPriceResult | null {
  if (input.price === null || input.price < 0) return null;
  const quantity = input.quantity ?? 1;
  if (quantity <= 0) return null;

  const breakdown = computePurchase({
    unitPrice: input.price,
    quantity,
    couponPercent: input.discountPercent ?? 0,
    couponAmount: input.couponAmount ?? 0,
  });

  return {
    listTotal: breakdown.listTotal,
    discountAmount: breakdown.couponDiscount,
    finalPrice: breakdown.payment,
    effectiveRate: effectiveDiscountRate(breakdown) ?? 0,
    perItem: breakdown.payment / quantity,
  };
}
