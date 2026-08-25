/**
 * 판매·사업 계산 (마진 · 목표 판매가 · 원가율 · 손익분기점 · ROAS).
 * 국가 제도와 무관한 일반 계산이라 모든 로케일에서 같은 로직을 사용한다.
 */

/* -------------------------------------------------------------------------- */
/* 마진                                                                         */
/* -------------------------------------------------------------------------- */

export interface MarginInput {
  /** 판매가 (1개) */
  sellingPrice: number | null;
  /** 매입 원가 (1개) */
  cost: number | null;
  /** 플랫폼·PG 수수료율 (%) */
  feePercent: number | null;
  /** 건당 배송비 부담액 */
  shipping: number | null;
  /** 기타 비용 (포장비 등) */
  otherCost: number | null;
  /** 판매 수량 */
  quantity: number | null;
}

export interface MarginResult {
  /** 매출 (판매가 × 수량) */
  revenue: number;
  /** 수수료 금액 */
  feeAmount: number;
  /** 총 비용 (원가 + 수수료 + 배송 + 기타) */
  totalCost: number;
  /** 순이익 */
  profit: number;
  /** 1개당 순이익 */
  profitPerUnit: number;
  /** 마진율 = 이익 ÷ 매출 (%) */
  marginRate: number;
  /** 원가율 = 원가 ÷ 매출 (%) */
  costRate: number;
  /** 마크업 = 이익 ÷ 총비용 (%) */
  markupRate: number;
  /** 손익분기 판매가 (이익 0이 되는 가격) */
  breakEvenPrice: number;
}

export type MarginIssue = 'price' | 'cost' | 'fee' | 'quantity' | 'amount';

export function findMarginIssues(input: MarginInput): MarginIssue[] {
  const issues: MarginIssue[] = [];
  if (input.sellingPrice !== null && input.sellingPrice < 0) issues.push('price');
  if (input.cost !== null && input.cost < 0) issues.push('cost');
  if (input.feePercent !== null && (input.feePercent < 0 || input.feePercent >= 100)) {
    issues.push('fee');
  }
  if (input.quantity !== null && input.quantity <= 0) issues.push('quantity');
  if (
    (input.shipping !== null && input.shipping < 0) ||
    (input.otherCost !== null && input.otherCost < 0)
  ) {
    issues.push('amount');
  }
  return issues;
}

export function calcMargin(input: MarginInput): MarginResult | null {
  if (input.sellingPrice === null || input.cost === null) return null;
  if (input.sellingPrice < 0 || input.cost < 0) return null;

  const quantity = input.quantity !== null && input.quantity > 0 ? input.quantity : 1;
  const feePercent =
    input.feePercent !== null && input.feePercent >= 0 && input.feePercent < 100
      ? input.feePercent
      : 0;
  const shipping = input.shipping !== null && input.shipping > 0 ? input.shipping : 0;
  const otherCost = input.otherCost !== null && input.otherCost > 0 ? input.otherCost : 0;

  const revenue = input.sellingPrice * quantity;
  const feeAmount = revenue * (feePercent / 100);
  const totalCost = (input.cost + shipping + otherCost) * quantity + feeAmount;
  const profit = revenue - totalCost;

  // 손익분기 판매가: price × (1 - fee) = cost + shipping + other
  const breakEvenPrice = (input.cost + shipping + otherCost) / (1 - feePercent / 100);

  return {
    revenue,
    feeAmount,
    totalCost,
    profit,
    profitPerUnit: profit / quantity,
    marginRate: revenue > 0 ? (profit / revenue) * 100 : 0,
    costRate: revenue > 0 ? ((input.cost * quantity) / revenue) * 100 : 0,
    markupRate: totalCost > 0 ? (profit / totalCost) * 100 : 0,
    breakEvenPrice,
  };
}

/* -------------------------------------------------------------------------- */
/* 목표 판매가                                                                  */
/* -------------------------------------------------------------------------- */

export interface TargetPriceInput {
  cost: number | null;
  /** 목표 마진율 (%) — 매출 대비 */
  targetMarginPercent: number | null;
  feePercent: number | null;
  shipping: number | null;
  otherCost: number | null;
}

export interface TargetPriceResult {
  /** 목표 마진을 남기는 판매가 */
  price: number;
  /** 그때의 수수료 금액 */
  feeAmount: number;
  /** 순이익 */
  profit: number;
  /** 총 비용 */
  totalCost: number;
  /** 부가세 포함 표시가 (10%) */
  priceWithVat: number;
}

export type TargetPriceIssue = 'cost' | 'margin' | 'fee' | 'amount';

export function findTargetPriceIssues(input: TargetPriceInput): TargetPriceIssue[] {
  const issues: TargetPriceIssue[] = [];
  if (input.cost !== null && input.cost < 0) issues.push('cost');
  if (
    input.targetMarginPercent !== null &&
    (input.targetMarginPercent < 0 || input.targetMarginPercent >= 100)
  ) {
    issues.push('margin');
  }
  if (input.feePercent !== null && (input.feePercent < 0 || input.feePercent >= 100)) {
    issues.push('fee');
  }
  if (
    (input.shipping !== null && input.shipping < 0) ||
    (input.otherCost !== null && input.otherCost < 0)
  ) {
    issues.push('amount');
  }
  return issues;
}

export function calcTargetPrice(input: TargetPriceInput): TargetPriceResult | null {
  if (input.cost === null || input.cost < 0) return null;
  const margin =
    input.targetMarginPercent !== null &&
    input.targetMarginPercent >= 0 &&
    input.targetMarginPercent < 100
      ? input.targetMarginPercent
      : 0;
  const fee =
    input.feePercent !== null && input.feePercent >= 0 && input.feePercent < 100
      ? input.feePercent
      : 0;
  const shipping = input.shipping !== null && input.shipping > 0 ? input.shipping : 0;
  const otherCost = input.otherCost !== null && input.otherCost > 0 ? input.otherCost : 0;

  const denominator = 1 - margin / 100 - fee / 100;
  if (denominator <= 0) return null;

  const baseCost = input.cost + shipping + otherCost;
  const price = baseCost / denominator;
  const feeAmount = price * (fee / 100);

  return {
    price,
    feeAmount,
    profit: price - baseCost - feeAmount,
    totalCost: baseCost + feeAmount,
    priceWithVat: price * 1.1,
  };
}

/* -------------------------------------------------------------------------- */
/* 손익분기점                                                                   */
/* -------------------------------------------------------------------------- */

export interface BreakEvenInput {
  /** 월 고정비 (임대료·인건비 등) */
  fixedCost: number | null;
  /** 1개 판매가 */
  unitPrice: number | null;
  /** 1개 변동비 (원가 + 수수료 등) */
  unitVariableCost: number | null;
}

export interface BreakEvenResult {
  /** 1개당 공헌이익 */
  contributionMargin: number;
  /** 공헌이익률 (%) */
  contributionRate: number;
  /** 손익분기 판매량 */
  breakEvenUnits: number;
  /** 손익분기 매출액 */
  breakEvenRevenue: number;
  /** 하루 평균 필요 판매량 (30일 기준) */
  unitsPerDay: number;
}

export type BreakEvenIssue = 'fixed' | 'price' | 'variable' | 'margin';

export function findBreakEvenIssues(input: BreakEvenInput): BreakEvenIssue[] {
  const issues: BreakEvenIssue[] = [];
  if (input.fixedCost !== null && input.fixedCost < 0) issues.push('fixed');
  if (input.unitPrice !== null && input.unitPrice <= 0) issues.push('price');
  if (input.unitVariableCost !== null && input.unitVariableCost < 0) issues.push('variable');
  if (
    input.unitPrice !== null &&
    input.unitVariableCost !== null &&
    input.unitPrice <= input.unitVariableCost
  ) {
    issues.push('margin');
  }
  return issues;
}

export function calcBreakEven(input: BreakEvenInput): BreakEvenResult | null {
  if (input.fixedCost === null || input.unitPrice === null || input.unitVariableCost === null) {
    return null;
  }
  if (input.unitPrice <= 0 || input.unitVariableCost < 0 || input.fixedCost < 0) return null;

  const contributionMargin = input.unitPrice - input.unitVariableCost;
  if (contributionMargin <= 0) return null;

  const breakEvenUnits = input.fixedCost / contributionMargin;

  return {
    contributionMargin,
    contributionRate: (contributionMargin / input.unitPrice) * 100,
    breakEvenUnits,
    breakEvenRevenue: breakEvenUnits * input.unitPrice,
    unitsPerDay: breakEvenUnits / 30,
  };
}

/* -------------------------------------------------------------------------- */
/* ROAS                                                                        */
/* -------------------------------------------------------------------------- */

export interface RoasInput {
  /** 광고비 */
  adCost: number | null;
  /** 광고를 통한 매출 */
  revenue: number | null;
  /** 공헌이익률 (%) — 손익분기 ROAS 계산용 */
  contributionRate: number | null;
  /** 전환 수 (선택) */
  conversions: number | null;
}

export interface RoasResult {
  /** ROAS (%) */
  roas: number;
  /** 광고 매출 대비 광고비 비율 (%) */
  adCostRate: number;
  /** 손익분기 ROAS (%) — 이 값을 넘겨야 이익 */
  breakEvenRoas: number | null;
  /** 광고 이익 (공헌이익 - 광고비) */
  profit: number | null;
  /** 전환당 광고비 */
  cpa: number | null;
  /** 전환당 매출 (객단가) */
  revenuePerConversion: number | null;
}

export type RoasIssue = 'adCost' | 'revenue' | 'rate' | 'conversions';

export function findRoasIssues(input: RoasInput): RoasIssue[] {
  const issues: RoasIssue[] = [];
  if (input.adCost !== null && input.adCost <= 0) issues.push('adCost');
  if (input.revenue !== null && input.revenue < 0) issues.push('revenue');
  if (
    input.contributionRate !== null &&
    (input.contributionRate <= 0 || input.contributionRate > 100)
  ) {
    issues.push('rate');
  }
  if (input.conversions !== null && input.conversions < 0) issues.push('conversions');
  return issues;
}

export function calcRoas(input: RoasInput): RoasResult | null {
  if (input.adCost === null || input.revenue === null) return null;
  if (input.adCost <= 0 || input.revenue < 0) return null;

  const roas = (input.revenue / input.adCost) * 100;
  const rate =
    input.contributionRate !== null &&
    input.contributionRate > 0 &&
    input.contributionRate <= 100
      ? input.contributionRate
      : null;

  const conversions =
    input.conversions !== null && input.conversions > 0 ? input.conversions : null;

  return {
    roas,
    adCostRate: (input.adCost / input.revenue) * 100,
    breakEvenRoas: rate === null ? null : (1 / (rate / 100)) * 100,
    profit: rate === null ? null : input.revenue * (rate / 100) - input.adCost,
    cpa: conversions === null ? null : input.adCost / conversions,
    revenuePerConversion: conversions === null ? null : input.revenue / conversions,
  };
}
