import { toBaseAmount, type AmountUnit } from '@/lib/calc/unit-price';

/**
 * 대용량 vs 소용량 비교.
 * 단순 단가뿐 아니라 "다 쓰지 못하고 버리는 양"을 반영한 실질 단가까지 계산한다.
 */
export interface BulkVsSmallInput {
  bulkPrice: number | null;
  bulkAmount: number | null;
  smallPrice: number | null;
  smallAmount: number | null;
  unit: AmountUnit;
  /** 대용량 예상 사용률(%) — 100이면 전부 사용 */
  usagePercent: number | null;
}

export interface BulkVsSmallResult {
  /** 대용량 명목 단가 (기준 단위 1당) */
  bulkUnitPrice: number;
  /** 소용량 명목 단가 */
  smallUnitPrice: number;
  /** 사용률을 반영한 대용량 실질 단가 */
  bulkEffectiveUnitPrice: number;
  /** 실질 기준으로 유리한 쪽 */
  better: 'bulk' | 'small' | 'tie';
  /** 유리한 쪽이 몇 % 저렴한지 */
  diffPercent: number;
  /**
   * 손익분기 사용률(%): 대용량을 이만큼 이상 써야 소용량보다 이득이다.
   * 소용량 단가가 0이거나 계산 불가면 null.
   */
  breakEvenUsage: number | null;
}

export type BulkVsSmallIssue =
  | 'bulkPrice'
  | 'bulkAmount'
  | 'smallPrice'
  | 'smallAmount'
  | 'usage';

export function findIssues(input: BulkVsSmallInput): BulkVsSmallIssue[] {
  const issues: BulkVsSmallIssue[] = [];
  if (input.bulkPrice !== null && input.bulkPrice < 0) issues.push('bulkPrice');
  if (input.bulkAmount !== null && input.bulkAmount <= 0) issues.push('bulkAmount');
  if (input.smallPrice !== null && input.smallPrice < 0) issues.push('smallPrice');
  if (input.smallAmount !== null && input.smallAmount <= 0) issues.push('smallAmount');
  if (input.usagePercent !== null && (input.usagePercent <= 0 || input.usagePercent > 100)) {
    issues.push('usage');
  }
  return issues;
}

export function calcBulkVsSmall(input: BulkVsSmallInput): BulkVsSmallResult | null {
  if (
    input.bulkPrice === null ||
    input.bulkAmount === null ||
    input.smallPrice === null ||
    input.smallAmount === null
  ) {
    return null;
  }
  if (input.bulkPrice < 0 || input.smallPrice < 0) return null;
  if (input.bulkAmount <= 0 || input.smallAmount <= 0) return null;

  const usage = input.usagePercent === null ? 100 : input.usagePercent;
  if (usage <= 0 || usage > 100) return null;

  const bulkBase = toBaseAmount(input.bulkAmount, input.unit);
  const smallBase = toBaseAmount(input.smallAmount, input.unit);
  if (bulkBase <= 0 || smallBase <= 0) return null;

  const bulkUnitPrice = input.bulkPrice / bulkBase;
  const smallUnitPrice = input.smallPrice / smallBase;
  const bulkEffectiveUnitPrice = input.bulkPrice / (bulkBase * (usage / 100));

  const high = Math.max(bulkEffectiveUnitPrice, smallUnitPrice);
  const low = Math.min(bulkEffectiveUnitPrice, smallUnitPrice);
  const better =
    bulkEffectiveUnitPrice === smallUnitPrice
      ? 'tie'
      : bulkEffectiveUnitPrice < smallUnitPrice
        ? 'bulk'
        : 'small';

  // 대용량을 r 비율만큼 쓸 때 실질 단가 = 소용량 단가가 되는 지점
  const breakEven =
    smallUnitPrice > 0 && bulkBase > 0
      ? (input.bulkPrice / (bulkBase * smallUnitPrice)) * 100
      : null;

  return {
    bulkUnitPrice,
    smallUnitPrice,
    bulkEffectiveUnitPrice,
    better,
    diffPercent: high > 0 ? ((high - low) / high) * 100 : 0,
    breakEvenUsage: breakEven,
  };
}
