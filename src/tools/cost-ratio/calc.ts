/**
 * 원가율 계산.
 * 원가율 = 원가 ÷ 판매가 × 100. 외식업·소매업에서 가장 자주 쓰는 지표다.
 */
export interface CostRatioInput {
  price: number | null;
  cost: number | null;
  /** 목표 원가율 (%) */
  targetRatio: number | null;
}

export interface CostRatioResult {
  /** 현재 원가율 (%) */
  costRate: number;
  /** 매출총이익률 (%) = 100 - 원가율 */
  grossMarginRate: number;
  /** 개당 매출총이익 */
  grossProfit: number;
  /** 목표 원가율을 맞추려면 원가를 얼마로 낮춰야 하는지 */
  targetCost: number | null;
  /** 현재 원가로 목표 원가율을 맞추려면 판매가를 얼마로 올려야 하는지 */
  targetPrice: number | null;
}

export type CostRatioIssue = 'price' | 'cost' | 'target';

export function findIssues(input: CostRatioInput): CostRatioIssue[] {
  const issues: CostRatioIssue[] = [];
  if (input.price !== null && input.price <= 0) issues.push('price');
  if (input.cost !== null && input.cost < 0) issues.push('cost');
  if (input.targetRatio !== null && (input.targetRatio <= 0 || input.targetRatio >= 100)) {
    issues.push('target');
  }
  return issues;
}

export function calcCostRatio(input: CostRatioInput): CostRatioResult | null {
  if (input.price === null || input.cost === null) return null;
  if (input.price <= 0 || input.cost < 0) return null;

  const costRate = (input.cost / input.price) * 100;
  const target =
    input.targetRatio !== null && input.targetRatio > 0 && input.targetRatio < 100
      ? input.targetRatio
      : null;

  return {
    costRate,
    grossMarginRate: 100 - costRate,
    grossProfit: input.price - input.cost,
    targetCost: target === null ? null : input.price * (target / 100),
    targetPrice: target === null ? null : input.cost / (target / 100),
  };
}
