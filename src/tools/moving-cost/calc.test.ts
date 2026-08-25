import { describe, expect, it } from 'vitest';
import { calcMovingCost, findIssues, MOVING_RATES } from './calc';

const base = {
  type: 'full' as const,
  pyeong: 25,
  distanceKm: null,
  needLadder: false,
  airconCount: null,
  cleaning: false,
  premiumDay: false,
};

describe('calcMovingCost', () => {
  it('평수 × 유형별 단가로 기본 이사비를 계산한다', () => {
    const result = calcMovingCost(base);
    expect(result?.baseCost).toBe(25 * MOVING_RATES.full.perPyeong);
    expect(result?.total).toBe(1_250_000);
  });

  it('작은 평수는 최소 금액이 적용된다', () => {
    const result = calcMovingCost({ ...base, pyeong: 5 });
    expect(result?.baseCost).toBe(MOVING_RATES.full.minimum);
  });

  it('반포장·일반이사는 단가가 낮다', () => {
    const full = calcMovingCost({ ...base, type: 'full' });
    const semi = calcMovingCost({ ...base, type: 'semi' });
    const basic = calcMovingCost({ ...base, type: 'basic' });
    expect((semi?.total ?? 0) < (full?.total ?? 0)).toBe(true);
    expect((basic?.total ?? 0) < (semi?.total ?? 0)).toBe(true);
  });

  it('기본 포함 거리를 넘으면 거리 비용이 붙는다', () => {
    const near = calcMovingCost({ ...base, distanceKm: 20 });
    const far = calcMovingCost({ ...base, distanceKm: 130 });
    expect(near?.distanceCost).toBe(0);
    expect(far?.distanceCost).toBe(100 * 3000);
  });

  it('사다리차·에어컨·청소 비용을 더한다', () => {
    const result = calcMovingCost({
      ...base,
      needLadder: true,
      airconCount: 2,
      cleaning: true,
    });
    expect(result?.ladderCost).toBe(200_000);
    expect(result?.airconCost).toBe(300_000);
    expect(result?.cleaningCost).toBe(25 * 12_000);
  });

  it('주말·손없는날은 20% 할증된다', () => {
    const normal = calcMovingCost(base);
    const premium = calcMovingCost({ ...base, premiumDay: true });
    expect(premium?.total).toBeCloseTo((normal?.total ?? 0) * 1.2);
  });

  it('예상 범위는 ±25%', () => {
    const result = calcMovingCost(base);
    expect(result?.min).toBeCloseTo((result?.total ?? 0) * 0.75);
    expect(result?.max).toBeCloseTo((result?.total ?? 0) * 1.25);
  });

  it('평수가 없으면 결과 없음', () => {
    expect(calcMovingCost({ ...base, pyeong: null })).toBeNull();
  });

  it('잘못된 입력을 잡아낸다', () => {
    expect(findIssues({ ...base, pyeong: 0 })).toContain('pyeong');
    expect(findIssues({ ...base, distanceKm: -1 })).toContain('distance');
    expect(findIssues({ ...base, airconCount: 30 })).toContain('aircon');
  });
});
