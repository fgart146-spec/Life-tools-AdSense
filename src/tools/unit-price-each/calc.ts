/**
 * 개당 가격 계산.
 * 하위 단위(1롤당 길이, 1팩당 매수 등)를 입력하면 하위 단위당 가격도 함께 구한다.
 */
export interface UnitPriceEachInput {
  /** 실제 지출 금액 */
  price: number | null;
  /** 총 개수 */
  count: number | null;
  /** 1개당 하위 수량 (예: 1롤당 25m, 1팩당 30매). 없으면 null */
  subAmount: number | null;
}

export interface UnitPriceEachResult {
  /** 1개당 가격 */
  perItem: number;
  /** 하위 단위 1당 가격 (subAmount가 없으면 null) */
  perSub: number | null;
  /** 하위 단위 총량 (subAmount가 없으면 null) */
  totalSub: number | null;
}

export type UnitPriceEachIssue = 'price' | 'count' | 'subAmount';

export function findIssues(input: UnitPriceEachInput): UnitPriceEachIssue[] {
  const issues: UnitPriceEachIssue[] = [];
  if (input.price !== null && input.price < 0) issues.push('price');
  if (input.count !== null && input.count <= 0) issues.push('count');
  if (input.subAmount !== null && input.subAmount <= 0) issues.push('subAmount');
  return issues;
}

export function calcUnitPriceEach(input: UnitPriceEachInput): UnitPriceEachResult | null {
  if (input.price === null || input.count === null) return null;
  if (input.price < 0 || input.count <= 0) return null;

  const perItem = input.price / input.count;
  const hasSub = input.subAmount !== null && input.subAmount > 0;
  const totalSub = hasSub ? (input.subAmount as number) * input.count : null;
  const perSub = totalSub && totalSub > 0 ? input.price / totalSub : null;

  return { perItem, perSub, totalSub };
}
