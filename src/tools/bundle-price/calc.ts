import { computeUnitPrice, type AmountUnit } from '@/lib/calc/unit-price';

/**
 * 묶음상품 단가 계산.
 * 낱개 가격을 함께 넣으면 묶음이 낱개 대비 얼마나 저렴한지 비교한다.
 */
export interface BundlePriceInput {
  /** 묶음 전체 가격 */
  bundlePrice: number | null;
  /** 묶음에 든 개수 */
  count: number | null;
  /** 1개 용량 (선택) */
  amountPerItem: number | null;
  unit: AmountUnit;
  /** 낱개로 살 때의 1개 가격 (선택) */
  singlePrice: number | null;
}

export interface BundlePriceResult {
  /** 묶음 기준 1개당 가격 */
  perItem: number;
  /** 100g / 100ml 당 가격 (용량 입력 시) */
  per100: number | null;
  /** 총 용량 (기준 단위) */
  totalAmount: number | null;
  /** 낱개 대비 절약률(%) — 낱개 가격 입력 시 */
  savingRate: number | null;
  /** 묶음 구매 시 총 절약 금액 */
  savingAmount: number | null;
}

export type BundlePriceIssue = 'bundlePrice' | 'count' | 'amount' | 'singlePrice';

export function findIssues(input: BundlePriceInput): BundlePriceIssue[] {
  const issues: BundlePriceIssue[] = [];
  if (input.bundlePrice !== null && input.bundlePrice < 0) issues.push('bundlePrice');
  if (input.count !== null && input.count <= 0) issues.push('count');
  if (input.amountPerItem !== null && input.amountPerItem <= 0) issues.push('amount');
  if (input.singlePrice !== null && input.singlePrice < 0) issues.push('singlePrice');
  return issues;
}

export function calcBundlePrice(input: BundlePriceInput): BundlePriceResult | null {
  if (input.bundlePrice === null || input.count === null) return null;
  if (input.bundlePrice < 0 || input.count <= 0) return null;

  const perItem = input.bundlePrice / input.count;

  let per100: number | null = null;
  let totalAmount: number | null = null;
  if (input.amountPerItem !== null && input.amountPerItem > 0) {
    const unitPrice = computeUnitPrice({
      cost: input.bundlePrice,
      amountPerItem: input.amountPerItem,
      unit: input.unit,
      quantity: input.count,
    });
    if (unitPrice) {
      per100 = unitPrice.pricePer100;
      totalAmount = unitPrice.totalBaseAmount;
    }
  }

  let savingRate: number | null = null;
  let savingAmount: number | null = null;
  if (input.singlePrice !== null && input.singlePrice > 0) {
    savingRate = ((input.singlePrice - perItem) / input.singlePrice) * 100;
    savingAmount = (input.singlePrice - perItem) * input.count;
  }

  return { perItem, per100, totalAmount, savingRate, savingAmount };
}
