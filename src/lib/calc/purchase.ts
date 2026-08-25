import { isNonNegative } from '@/lib/math/decimal';

/**
 * 실구매가 계산 (쿠폰 · 카드할인 · 배송비 · 적립).
 *
 * 적용 순서(사이트 전체 공통 기준. 각 도구의 '계산 기준' 섹션에 동일하게 표시한다):
 *   1) 상품금액 = 표시가 × 수량
 *   2) 정률 쿠폰 적용
 *   3) 정액 쿠폰 차감 (0 미만으로 내려가지 않음)
 *   4) 카드 할인 적용 (쿠폰 적용 후 금액 기준, 한도가 있으면 한도까지만)
 *   5) 배송비 가산 (할인 대상 아님)
 *   6) 적립금은 결제금액에서 배송비를 제외한 상품금액 기준으로 계산
 *
 * 반환값의 payment는 실제 결제금액, effectiveCost는 적립까지 반영한 체감 실구매가다.
 */
export interface PurchaseInput {
  /** 1개 표시가 */
  unitPrice: number;
  /** 구매 수량 */
  quantity: number;
  /** 정률 쿠폰 (%) */
  couponPercent?: number;
  /** 정액 쿠폰 */
  couponAmount?: number;
  /** 카드 할인 (%) */
  cardPercent?: number;
  /** 카드 할인 최대 금액 (예: 최대 1만원). 0 또는 미입력이면 한도 없음 */
  cardCap?: number;
  /** 배송비 */
  shipping?: number;
  /** 적립률 (%) */
  pointPercent?: number;
  /** 정액 적립 */
  pointAmount?: number;
}

export interface PurchaseBreakdown {
  /** 할인 전 상품금액 */
  listTotal: number;
  /** 쿠폰으로 줄어든 금액 */
  couponDiscount: number;
  /** 카드 할인 금액 */
  cardDiscount: number;
  /** 배송비 */
  shipping: number;
  /** 적립 예정 금액 */
  points: number;
  /** 실제 결제금액 (배송비 포함, 적립 미반영) */
  payment: number;
  /** 적립까지 반영한 체감 실구매가 */
  effectiveCost: number;
}

function normalize(value: number | undefined, fallback = 0): number {
  return isNonNegative(value) ? value : fallback;
}

export function computePurchase(input: PurchaseInput): PurchaseBreakdown {
  const unitPrice = normalize(input.unitPrice);
  const quantity = normalize(input.quantity);
  const couponPercent = Math.min(normalize(input.couponPercent), 100);
  const couponAmount = normalize(input.couponAmount);
  const cardPercent = Math.min(normalize(input.cardPercent), 100);
  const shipping = normalize(input.shipping);
  const pointPercent = Math.min(normalize(input.pointPercent), 100);
  const pointAmount = normalize(input.pointAmount);

  const listTotal = unitPrice * quantity;
  const afterCouponPercent = listTotal * (1 - couponPercent / 100);
  const afterCoupon = Math.max(0, afterCouponPercent - couponAmount);
  const couponDiscount = listTotal - afterCoupon;

  const rawCardDiscount = afterCoupon * (cardPercent / 100);
  const cardCap = normalize(input.cardCap);
  const cardDiscount = cardCap > 0 ? Math.min(rawCardDiscount, cardCap) : rawCardDiscount;
  const afterCard = afterCoupon - cardDiscount;

  const payment = afterCard + shipping;
  const points = Math.min(afterCard * (pointPercent / 100) + pointAmount, payment);
  const effectiveCost = Math.max(0, payment - points);

  return {
    listTotal,
    couponDiscount,
    cardDiscount,
    shipping,
    points,
    payment,
    effectiveCost,
  };
}

/** 정가 대비 실구매가의 실질 할인율(%) */
export function effectiveDiscountRate(breakdown: PurchaseBreakdown): number | null {
  if (breakdown.listTotal <= 0) return null;
  return ((breakdown.listTotal - breakdown.effectiveCost) / breakdown.listTotal) * 100;
}
