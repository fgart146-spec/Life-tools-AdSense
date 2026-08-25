/**
 * 금액 계산용 유틸.
 * 부동소수점 누적 오차를 줄이기 위해 정수 스케일링으로 반올림한다.
 * 중간 계산에서는 반올림하지 않고, 표시 직전에 한 번만 반올림하는 것을 원칙으로 한다.
 */

/** 지정한 소수 자릿수로 반올림 (0.5는 올림, -0.5는 내림: 절댓값 기준 반올림) */
export function roundTo(value: number, digits = 0): number {
  if (!Number.isFinite(value)) return Number.NaN;
  const factor = 10 ** digits;
  // 1e-9: (0.1+0.2)*10 = 3.0000000000000004 같은 표현 오차 보정
  const scaled = value * factor;
  const corrected = scaled + (scaled >= 0 ? 1e-9 : -1e-9);
  return Math.sign(corrected) * Math.round(Math.abs(corrected)) / factor;
}

/** 원/엔처럼 소수점을 쓰지 않는 통화 금액 반올림 */
export function roundMoney(value: number): number {
  return roundTo(value, 0);
}

/** 0으로 나누기를 null로 돌려주는 안전한 나눗셈 */
export function safeDivide(numerator: number, denominator: number): number | null {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator)) return null;
  if (denominator === 0) return null;
  return numerator / denominator;
}

/** 백분율 차이: (a - b) / b * 100 */
export function percentDiff(a: number, b: number): number | null {
  const ratio = safeDivide(a - b, b);
  return ratio === null ? null : ratio * 100;
}

/** 값을 [min, max] 범위로 자른다 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** 유한한 양수인지 (0 제외) */
export function isPositive(value: number | null | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

/** 유한한 0 이상 값인지 */
export function isNonNegative(value: number | null | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}
