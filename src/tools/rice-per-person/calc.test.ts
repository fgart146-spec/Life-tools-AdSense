import { describe, expect, it } from 'vitest';
import { calcRice, findIssues, RICE_PER_BOWL_G } from './calc';

const base = {
  adults: 4,
  children: 0,
  appetite: 'normal' as const,
  meals: 1,
  bowlsPerMeal: 1,
};

describe('calcRice', () => {
  it('성인 4명 한 끼는 쌀 360g', () => {
    const result = calcRice(base);
    expect(result?.totalBowls).toBe(4);
    expect(result?.riceGram).toBe(4 * RICE_PER_BOWL_G);
    expect(result?.riceKg).toBeCloseTo(0.36);
  });

  it('끼니 수와 공기 수를 곱한다', () => {
    const result = calcRice({ ...base, meals: 3, bowlsPerMeal: 1.5 });
    expect(result?.totalBowls).toBe(18);
    expect(result?.riceGram).toBe(1620);
  });

  it('어린이는 0.5명분', () => {
    const result = calcRice({ ...base, adults: 2, children: 2 });
    expect(result?.persons).toBe(3);
    expect(result?.totalBowls).toBe(3);
  });

  it('밥물과 계량컵 수를 계산한다', () => {
    const result = calcRice({ ...base, adults: 5 });
    expect(result?.riceGram).toBe(450);
    expect(result?.riceCups).toBeCloseTo(3);
    expect(result?.waterMl).toBeCloseTo(540);
  });

  it('완성된 밥 무게도 알려준다', () => {
    const result = calcRice(base);
    expect(result?.cookedGram).toBe(840);
  });

  it('인원이 없으면 결과 없음', () => {
    expect(calcRice({ ...base, adults: 0, children: 0 })).toBeNull();
  });
});

describe('findIssues', () => {
  it('범위를 벗어난 값을 잡아낸다', () => {
    expect(findIssues({ ...base, meals: 0 })).toContain('meals');
    expect(findIssues({ ...base, bowlsPerMeal: 10 })).toContain('bowls');
    expect(findIssues({ ...base, adults: -1 })).toContain('people');
  });
});
