import { describe, expect, it } from 'vitest';
import { clamp, isPositive, percentDiff, roundMoney, roundTo, safeDivide } from './decimal';

describe('roundTo', () => {
  it('부동소수점 표현 오차를 보정한다', () => {
    expect(roundTo(1.005, 2)).toBe(1.01);
    expect(roundTo(2.675, 2)).toBe(2.68);
    expect(roundTo(0.1 + 0.2, 2)).toBe(0.3);
  });

  it('음수는 절댓값 기준으로 반올림한다', () => {
    expect(roundTo(-1.005, 2)).toBe(-1.01);
    expect(roundTo(-2.5, 0)).toBe(-3);
  });

  it('자릿수를 생략하면 정수로 반올림한다', () => {
    expect(roundTo(1234.5)).toBe(1235);
    expect(roundMoney(1234.49)).toBe(1234);
  });

  it('유한하지 않은 값은 NaN', () => {
    expect(Number.isNaN(roundTo(Number.POSITIVE_INFINITY))).toBe(true);
  });
});

describe('safeDivide', () => {
  it('0으로 나누면 null', () => {
    expect(safeDivide(10, 0)).toBeNull();
  });

  it('정상 나눗셈', () => {
    expect(safeDivide(10, 4)).toBe(2.5);
  });
});

describe('percentDiff', () => {
  it('기준 대비 증감률을 계산한다', () => {
    expect(percentDiff(120, 100)).toBeCloseTo(20);
    expect(percentDiff(80, 100)).toBeCloseTo(-20);
  });

  it('기준이 0이면 null', () => {
    expect(percentDiff(10, 0)).toBeNull();
  });
});

describe('clamp / isPositive', () => {
  it('범위를 자른다', () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(-1, 0, 10)).toBe(0);
  });

  it('양수 판정', () => {
    expect(isPositive(1)).toBe(true);
    expect(isPositive(0)).toBe(false);
    expect(isPositive(null)).toBe(false);
    expect(isPositive(Number.NaN)).toBe(false);
  });
});
