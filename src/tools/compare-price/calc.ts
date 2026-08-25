import { computePurchase, type PurchaseBreakdown } from '@/lib/calc/purchase';
import {
  baseUnitOf,
  computeUnitPrice,
  toBaseAmount,
  type AmountUnit,
  type BaseUnit,
} from '@/lib/calc/unit-price';

/**
 * 두 상품 비교.
 * 실구매가(쿠폰·카드할인·배송비·적립 반영) → 기준 단위 환산 → 단가 비교 순서로 계산한다.
 */
export interface CompareProductInput {
  price: number | null;
  /** 1개 용량 */
  amount: number | null;
  unit: AmountUnit;
  /** 개수 */
  quantity: number | null;
  couponPercent: number | null;
  couponAmount: number | null;
  cardPercent: number | null;
  shipping: number | null;
  pointPercent: number | null;
}

export interface CompareProductResult {
  purchase: PurchaseBreakdown;
  base: BaseUnit;
  /** 총 용량(기준 단위) */
  totalBaseAmount: number;
  /** 기준 단위 1당 가격 (실구매가 기준) */
  pricePerBase: number;
  /** 100g / 100ml 당 가격 (개수 단위면 null) */
  pricePer100: number | null;
  /** 1kg / 1L 당 가격 */
  pricePer1000: number | null;
  /** 1개당 가격 */
  pricePerItem: number;
}

export interface CompareResult {
  a: CompareProductResult;
  b: CompareProductResult;
  /** 같은 종류의 단위(무게끼리/부피끼리)인지 */
  comparable: boolean;
  cheaper: 'a' | 'b' | 'tie';
  /** 기준 단위 1당 가격 차이 */
  perBaseDiff: number;
  /** 비싼 쪽 대비 몇 % 저렴한지 */
  percentCheaper: number;
  /** 비교 기준량 (A 상품의 총량, A가 없으면 B) */
  referenceAmount: number;
  /** 기준량만큼 살 때의 차액 */
  savingPerPurchase: number;
}

export type CompareIssue =
  | 'aPrice'
  | 'aAmount'
  | 'aQuantity'
  | 'bPrice'
  | 'bAmount'
  | 'bQuantity'
  | 'unitMismatch';

function toResult(input: CompareProductInput): CompareProductResult | null {
  if (input.price === null || input.amount === null) return null;
  const quantity = input.quantity ?? 1;
  if (input.price < 0 || input.amount <= 0 || quantity <= 0) return null;

  const purchase = computePurchase({
    unitPrice: input.price,
    quantity,
    couponPercent: input.couponPercent ?? 0,
    couponAmount: input.couponAmount ?? 0,
    cardPercent: input.cardPercent ?? 0,
    shipping: input.shipping ?? 0,
    pointPercent: input.pointPercent ?? 0,
  });

  const unitPrice = computeUnitPrice({
    cost: purchase.effectiveCost,
    amountPerItem: input.amount,
    unit: input.unit,
    quantity,
  });
  if (!unitPrice) return null;

  return {
    purchase,
    base: unitPrice.base,
    totalBaseAmount: unitPrice.totalBaseAmount,
    pricePerBase: unitPrice.pricePerBase,
    pricePer100: unitPrice.pricePer100,
    pricePer1000: unitPrice.pricePer1000,
    pricePerItem: unitPrice.pricePerItem,
  };
}

export function findIssues(a: CompareProductInput, b: CompareProductInput): CompareIssue[] {
  const issues: CompareIssue[] = [];
  if (a.price !== null && a.price < 0) issues.push('aPrice');
  if (a.amount !== null && a.amount <= 0) issues.push('aAmount');
  if (a.quantity !== null && a.quantity <= 0) issues.push('aQuantity');
  if (b.price !== null && b.price < 0) issues.push('bPrice');
  if (b.amount !== null && b.amount <= 0) issues.push('bAmount');
  if (b.quantity !== null && b.quantity <= 0) issues.push('bQuantity');
  if (baseUnitOf(a.unit) !== baseUnitOf(b.unit)) issues.push('unitMismatch');
  return issues;
}

export function comparePrice(
  a: CompareProductInput,
  b: CompareProductInput,
): CompareResult | null {
  const resultA = toResult(a);
  const resultB = toResult(b);
  if (!resultA || !resultB) return null;

  const comparable = resultA.base === resultB.base;
  const diff = Math.abs(resultA.pricePerBase - resultB.pricePerBase);
  const high = Math.max(resultA.pricePerBase, resultB.pricePerBase);
  const cheaper =
    resultA.pricePerBase === resultB.pricePerBase
      ? 'tie'
      : resultA.pricePerBase < resultB.pricePerBase
        ? 'a'
        : 'b';

  const referenceAmount =
    resultA.totalBaseAmount > 0 ? resultA.totalBaseAmount : resultB.totalBaseAmount;

  return {
    a: resultA,
    b: resultB,
    comparable,
    cheaper,
    perBaseDiff: diff,
    percentCheaper: high > 0 ? (diff / high) * 100 : 0,
    referenceAmount,
    savingPerPurchase: diff * referenceAmount,
  };
}

/** 반복 구매 시 절약액 */
export function repeatSavings(
  savingPerPurchase: number,
  purchasesPerMonth: number,
): { monthly: number; yearly: number } {
  const monthly = savingPerPurchase * Math.max(0, purchasesPerMonth);
  return { monthly, yearly: monthly * 12 };
}

/** 단위 라벨 표시용: 기준 단위 문자열 */
export function baseUnitSymbol(unit: AmountUnit): string {
  const base = baseUnitOf(unit);
  return base === 'g' ? 'g' : base === 'ml' ? 'ml' : '';
}

/** 총 용량 (기준 단위) */
export function totalAmountOf(input: CompareProductInput): number | null {
  if (input.amount === null) return null;
  const quantity = input.quantity ?? 1;
  if (input.amount <= 0 || quantity <= 0) return null;
  return toBaseAmount(input.amount, input.unit) * quantity;
}
