import { computePurchase, effectiveDiscountRate } from '@/lib/calc/purchase';

/**
 * 쿠폰 + 카드할인(한도 포함) + 배송비 + 적립을 모두 반영한 실구매가.
 */
export interface CardCouponInput {
  price: number | null;
  quantity: number | null;
  couponPercent: number | null;
  couponAmount: number | null;
  cardPercent: number | null;
  /** 카드 할인 최대 금액 */
  cardCap: number | null;
  shipping: number | null;
  pointPercent: number | null;
}

export interface CardCouponResult {
  listTotal: number;
  couponDiscount: number;
  cardDiscount: number;
  shipping: number;
  /** 실제 결제금액 (배송비 포함, 적립 미반영) */
  payment: number;
  points: number;
  /** 적립까지 반영한 체감 실구매가 */
  effectiveCost: number;
  /** 정가 대비 실질 할인율(%) */
  effectiveRate: number;
  /** 1개당 체감 가격 */
  perItem: number;
  /** 카드 할인이 한도에 걸렸는지 */
  cardCapped: boolean;
}

export type CardCouponIssue = 'price' | 'quantity' | 'percent' | 'amount';

export function findIssues(input: CardCouponInput): CardCouponIssue[] {
  const issues: CardCouponIssue[] = [];
  if (input.price !== null && input.price < 0) issues.push('price');
  if (input.quantity !== null && input.quantity <= 0) issues.push('quantity');

  const percents = [input.couponPercent, input.cardPercent, input.pointPercent];
  if (percents.some((value) => value !== null && (value < 0 || value > 100))) {
    issues.push('percent');
  }

  const amounts = [input.couponAmount, input.cardCap, input.shipping];
  if (amounts.some((value) => value !== null && value < 0)) issues.push('amount');

  return issues;
}

export function calcCardCoupon(input: CardCouponInput): CardCouponResult | null {
  if (input.price === null || input.price < 0) return null;
  const quantity = input.quantity ?? 1;
  if (quantity <= 0) return null;

  const breakdown = computePurchase({
    unitPrice: input.price,
    quantity,
    couponPercent: input.couponPercent ?? 0,
    couponAmount: input.couponAmount ?? 0,
    cardPercent: input.cardPercent ?? 0,
    cardCap: input.cardCap ?? 0,
    shipping: input.shipping ?? 0,
    pointPercent: input.pointPercent ?? 0,
  });

  // 한도가 없었다면 적용됐을 카드 할인과 비교해 한도 적용 여부를 판단한다.
  const uncapped = computePurchase({
    unitPrice: input.price,
    quantity,
    couponPercent: input.couponPercent ?? 0,
    couponAmount: input.couponAmount ?? 0,
    cardPercent: input.cardPercent ?? 0,
  });

  return {
    listTotal: breakdown.listTotal,
    couponDiscount: breakdown.couponDiscount,
    cardDiscount: breakdown.cardDiscount,
    shipping: breakdown.shipping,
    payment: breakdown.payment,
    points: breakdown.points,
    effectiveCost: breakdown.effectiveCost,
    effectiveRate: effectiveDiscountRate(breakdown) ?? 0,
    perItem: breakdown.effectiveCost / quantity,
    cardCapped: uncapped.cardDiscount > breakdown.cardDiscount,
  };
}
