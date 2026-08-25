/**
 * 이사비용 예산 계산.
 *
 * ⚠ 단가는 업체·지역·시기에 따라 편차가 매우 크다.
 *    여기서는 '예산 감을 잡기 위한 참고 기준'을 사용하고, 결과를 범위(±25%)로 보여준다.
 *    실제 계약 전에는 반드시 여러 업체의 방문 견적을 받아야 한다.
 */
export type MovingType = 'full' | 'semi' | 'basic';

/** 이사 유형별 평당 기본 단가와 최소 금액 */
export const MOVING_RATES: Record<MovingType, { perPyeong: number; minimum: number }> = {
  full: { perPyeong: 50_000, minimum: 400_000 },
  semi: { perPyeong: 35_000, minimum: 300_000 },
  basic: { perPyeong: 25_000, minimum: 250_000 },
};

/** 기본 포함 거리 (km) */
export const INCLUDED_DISTANCE_KM = 30;
export const PER_KM_COST = 3_000;
export const LADDER_COST = 200_000;
export const AIRCON_COST = 150_000;
export const CLEANING_PER_PYEONG = 12_000;
export const PREMIUM_DAY_RATE = 0.2;
/** 결과 범위 */
export const RANGE_RATIO = 0.25;

export interface MovingCostInput {
  type: MovingType;
  /** 이사할 집 평수 */
  pyeong: number | null;
  /** 이동 거리 (km) */
  distanceKm: number | null;
  /** 사다리차 사용 */
  needLadder: boolean;
  /** 에어컨 이전설치 대수 */
  airconCount: number | null;
  /** 입주청소 포함 */
  cleaning: boolean;
  /** 주말·손없는날 할증 */
  premiumDay: boolean;
}

export interface MovingCostResult {
  baseCost: number;
  distanceCost: number;
  ladderCost: number;
  airconCost: number;
  cleaningCost: number;
  premiumAmount: number;
  total: number;
  /** 예상 범위 */
  min: number;
  max: number;
}

export type MovingCostIssue = 'pyeong' | 'distance' | 'aircon';

export function findIssues(input: MovingCostInput): MovingCostIssue[] {
  const issues: MovingCostIssue[] = [];
  if (input.pyeong !== null && (input.pyeong <= 0 || input.pyeong > 200)) issues.push('pyeong');
  if (input.distanceKm !== null && (input.distanceKm < 0 || input.distanceKm > 1000)) {
    issues.push('distance');
  }
  if (input.airconCount !== null && (input.airconCount < 0 || input.airconCount > 20)) {
    issues.push('aircon');
  }
  return issues;
}

export function calcMovingCost(input: MovingCostInput): MovingCostResult | null {
  if (input.pyeong === null || input.pyeong <= 0) return null;

  const rate = MOVING_RATES[input.type];
  const baseCost = Math.max(rate.minimum, input.pyeong * rate.perPyeong);

  const distance = input.distanceKm !== null && input.distanceKm > 0 ? input.distanceKm : 0;
  const distanceCost = Math.max(0, distance - INCLUDED_DISTANCE_KM) * PER_KM_COST;

  const ladderCost = input.needLadder ? LADDER_COST : 0;
  const aircon = input.airconCount !== null && input.airconCount > 0 ? input.airconCount : 0;
  const airconCost = aircon * AIRCON_COST;
  const cleaningCost = input.cleaning ? input.pyeong * CLEANING_PER_PYEONG : 0;

  const subtotal = baseCost + distanceCost + ladderCost + airconCost + cleaningCost;
  const premiumAmount = input.premiumDay ? subtotal * PREMIUM_DAY_RATE : 0;
  const total = subtotal + premiumAmount;

  return {
    baseCost,
    distanceCost,
    ladderCost,
    airconCost,
    cleaningCost,
    premiumAmount,
    total,
    min: total * (1 - RANGE_RATIO),
    max: total * (1 + RANGE_RATIO),
  };
}
