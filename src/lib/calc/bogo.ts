/**
 * 1+1, 2+1 같은 증정 행사의 실제 할인율 계산.
 *
 * 핵심: "N개 값을 내고 M개를 더 받는다"는 것은
 * 총 (N+M)개를 N개 값에 사는 것과 같으므로,
 * 실질 할인율 = M ÷ (N+M) 이다. (1+1 = 50%, 2+1 = 33.3%)
 */
export interface BogoInput {
  /** 1개 정가 */
  unitPrice: number | null;
  /** 값을 내는 개수 */
  buy: number | null;
  /** 무료로 받는 개수 */
  free: number | null;
  /** 비교용: 같은 상품이 단순 할인 중일 때의 할인율(%) */
  compareDiscountPercent?: number | null;
}

export interface BogoComparison {
  /** 단순 할인 적용 시 1개당 가격 */
  discountedUnitPrice: number;
  /** 어느 쪽이 유리한지 */
  better: 'bogo' | 'discount' | 'tie';
  /** 유리한 쪽이 몇 % 더 저렴한지 */
  diffPercent: number;
}

export interface BogoResult {
  /** 실제로 받는 총 개수 */
  totalItems: number;
  /** 실제로 내는 금액 */
  paid: number;
  /** 실질 개당 가격 */
  effectiveUnitPrice: number;
  /** 실질 할인율(%) */
  discountRate: number;
  comparison: BogoComparison | null;
}

export type BogoIssue = 'price' | 'buy' | 'free' | 'compare';

export function findIssues(input: BogoInput): BogoIssue[] {
  const issues: BogoIssue[] = [];
  if (input.unitPrice !== null && input.unitPrice < 0) issues.push('price');
  if (input.buy !== null && input.buy <= 0) issues.push('buy');
  if (input.free !== null && input.free < 0) issues.push('free');
  const compare = input.compareDiscountPercent;
  if (compare !== null && compare !== undefined && (compare < 0 || compare > 100)) {
    issues.push('compare');
  }
  return issues;
}

export function calcBogo(input: BogoInput): BogoResult | null {
  if (input.unitPrice === null || input.unitPrice < 0) return null;
  const buy = input.buy ?? 1;
  const free = input.free ?? 0;
  if (buy <= 0 || free < 0) return null;

  const totalItems = buy + free;
  const paid = input.unitPrice * buy;
  const effectiveUnitPrice = paid / totalItems;
  const discountRate = (free / totalItems) * 100;

  const compareRate = input.compareDiscountPercent;
  let comparison: BogoComparison | null = null;

  if (compareRate !== null && compareRate !== undefined && compareRate >= 0 && compareRate <= 100) {
    const discountedUnitPrice = input.unitPrice * (1 - compareRate / 100);
    const high = Math.max(effectiveUnitPrice, discountedUnitPrice);
    const low = Math.min(effectiveUnitPrice, discountedUnitPrice);
    const better =
      effectiveUnitPrice === discountedUnitPrice
        ? 'tie'
        : effectiveUnitPrice < discountedUnitPrice
          ? 'bogo'
          : 'discount';
    comparison = {
      discountedUnitPrice,
      better,
      diffPercent: high > 0 ? ((high - low) / high) * 100 : 0,
    };
  }

  return { totalItems, paid, effectiveUnitPrice, discountRate, comparison };
}
