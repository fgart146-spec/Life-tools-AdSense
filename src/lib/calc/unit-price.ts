/**
 * 단가 계산 (용량/개수 기준).
 * 무게(g/kg), 부피(ml/L), 개수(개) 중 하나의 기준 단위로 환산해 비교한다.
 */

export type AmountUnit = 'g' | 'kg' | 'ml' | 'l' | 'ea';
export type BaseUnit = 'g' | 'ml' | 'ea';

const UNIT_TO_BASE: Record<AmountUnit, { base: BaseUnit; factor: number }> = {
  g: { base: 'g', factor: 1 },
  kg: { base: 'g', factor: 1000 },
  ml: { base: 'ml', factor: 1 },
  l: { base: 'ml', factor: 1000 },
  ea: { base: 'ea', factor: 1 },
};

export function baseUnitOf(unit: AmountUnit): BaseUnit {
  return UNIT_TO_BASE[unit].base;
}

/** 입력 용량을 기준 단위(g/ml/개) 값으로 환산 */
export function toBaseAmount(amount: number, unit: AmountUnit): number {
  return amount * UNIT_TO_BASE[unit].factor;
}

export interface UnitPriceInput {
  /** 비교에 사용할 금액(실구매가 권장) */
  cost: number;
  /** 1개당 용량 */
  amountPerItem: number;
  unit: AmountUnit;
  /** 개수 */
  quantity: number;
}

export interface UnitPriceResult {
  base: BaseUnit;
  /** 총 용량 (기준 단위) */
  totalBaseAmount: number;
  /** 기준 단위 1당 가격 */
  pricePerBase: number;
  /** 100g / 100ml 당 가격 (개수 단위면 null) */
  pricePer100: number | null;
  /** 1kg / 1L 당 가격 (개수 단위면 null) */
  pricePer1000: number | null;
  /** 개당 가격 */
  pricePerItem: number;
}

/** 유효한 입력인지 (0 이하 용량/수량은 계산 불가) */
export function canComputeUnitPrice(input: UnitPriceInput): boolean {
  return (
    Number.isFinite(input.cost) &&
    input.cost >= 0 &&
    Number.isFinite(input.amountPerItem) &&
    input.amountPerItem > 0 &&
    Number.isFinite(input.quantity) &&
    input.quantity > 0
  );
}

export function computeUnitPrice(input: UnitPriceInput): UnitPriceResult | null {
  if (!canComputeUnitPrice(input)) return null;

  const base = baseUnitOf(input.unit);
  const totalBaseAmount = toBaseAmount(input.amountPerItem, input.unit) * input.quantity;
  if (totalBaseAmount <= 0) return null;

  const pricePerBase = input.cost / totalBaseAmount;

  return {
    base,
    totalBaseAmount,
    pricePerBase,
    pricePer100: base === 'ea' ? null : pricePerBase * 100,
    pricePer1000: base === 'ea' ? null : pricePerBase * 1000,
    pricePerItem: input.cost / input.quantity,
  };
}

export interface ComparisonResult {
  /** 더 저렴한 쪽 ('a' | 'b' | 'tie') */
  cheaper: 'a' | 'b' | 'tie';
  /** 단가 차이 (비싼 쪽 - 싼 쪽), 기준 단위 1당 */
  perBaseDiff: number;
  /** 싼 쪽 기준 절약률 (%) — 비싼 쪽 대비 몇 % 저렴한지 */
  percentCheaper: number;
}

/** 두 상품의 기준 단가를 비교 */
export function compareUnitPrice(a: number, b: number): ComparisonResult | null {
  if (!Number.isFinite(a) || !Number.isFinite(b) || a < 0 || b < 0) return null;
  if (a === b) return { cheaper: 'tie', perBaseDiff: 0, percentCheaper: 0 };

  const cheaper = a < b ? 'a' : 'b';
  const low = Math.min(a, b);
  const high = Math.max(a, b);
  const perBaseDiff = high - low;
  const percentCheaper = high === 0 ? 0 : (perBaseDiff / high) * 100;

  return { cheaper, perBaseDiff, percentCheaper };
}

/* -------------------------------------------------------------------------- */
/* 입력 검증                                                                    */
/* -------------------------------------------------------------------------- */

export type UnitPriceIssue = 'price' | 'amount' | 'quantity';

export interface UnitPriceRawInput {
  price: number | null;
  amount: number | null;
  quantity: number | null;
}

/**
 * 입력 문제를 코드로 돌려준다(예외를 던지지 않는다).
 * 아직 비어 있는 값(null)은 '입력 중'으로 보고 문제로 취급하지 않는다.
 */
export function findUnitPriceIssues(input: UnitPriceRawInput): UnitPriceIssue[] {
  const issues: UnitPriceIssue[] = [];
  if (input.price !== null && input.price < 0) issues.push('price');
  if (input.amount !== null && input.amount <= 0) issues.push('amount');
  if (input.quantity !== null && input.quantity <= 0) issues.push('quantity');
  return issues;
}
