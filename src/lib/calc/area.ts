/**
 * 면적 단위 변환.
 * 1평(坪) = 400/121 ㎡ ≈ 3.305785 ㎡ (한국·일본에서 사용하는 전통 단위)
 * 1 sq ft = 0.09290304 ㎡
 */
export const PYEONG_TO_SQM = 400 / 121;
export const SQFT_TO_SQM = 0.09290304;

export type AreaUnit = 'pyeong' | 'sqm' | 'sqft';

const TO_SQM: Record<AreaUnit, number> = {
  pyeong: PYEONG_TO_SQM,
  sqm: 1,
  sqft: SQFT_TO_SQM,
};

export interface AreaInput {
  value: number | null;
  unit: AreaUnit;
}

export interface AreaResult {
  sqm: number;
  pyeong: number;
  sqft: number;
  /** 정사각형으로 봤을 때 한 변의 길이 (m) */
  squareSide: number;
}

export function findIssues(input: AreaInput): 'value'[] {
  return input.value !== null && input.value < 0 ? ['value'] : [];
}

export function convertArea(input: AreaInput): AreaResult | null {
  if (input.value === null || input.value < 0) return null;

  const sqm = input.value * TO_SQM[input.unit];
  return {
    sqm,
    pyeong: sqm / PYEONG_TO_SQM,
    sqft: sqm / SQFT_TO_SQM,
    squareSide: Math.sqrt(sqm),
  };
}

/**
 * 아파트 공급면적 → 전용면적 추정.
 * 전용률(전용면적 ÷ 공급면적)은 보통 70~80% 수준이다.
 */
export function exclusiveArea(supplySqm: number, ratioPercent: number): number | null {
  if (supplySqm <= 0 || ratioPercent <= 0 || ratioPercent > 100) return null;
  return supplySqm * (ratioPercent / 100);
}
