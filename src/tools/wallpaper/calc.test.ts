import { describe, expect, it } from 'vitest';
import { calcWallpaper, findIssues, ROLL_COVERAGE } from './calc';

const base = {
  widthM: 3.5,
  lengthM: 4,
  heightM: 2.3,
  doors: 1,
  windows: 1,
  type: 'wide' as const,
  includeCeiling: false,
  pricePerRoll: null,
  flooringPricePerM: null,
};

describe('calcWallpaper', () => {
  it('둘레 × 높이에서 개구부를 뺀 벽 면적을 계산한다', () => {
    const result = calcWallpaper(base);
    // 둘레 15m × 2.3 = 34.5 - (1.8 + 1.5) = 31.2
    expect(result?.wallArea).toBeCloseTo(31.2);
  });

  it('천장 포함을 선택하면 바닥 면적만큼 더해진다', () => {
    const result = calcWallpaper({ ...base, includeCeiling: true });
    expect(result?.ceilingArea).toBeCloseTo(14);
    expect(result?.totalArea).toBeCloseTo(45.2);
  });

  it('로스 10%를 더해 롤 수를 올림 계산한다', () => {
    const result = calcWallpaper(base);
    expect(result?.areaWithLoss).toBeCloseTo(31.2 * 1.1);
    expect(result?.rolls).toBe(Math.ceil((31.2 * 1.1) / ROLL_COVERAGE.wide));
  });

  it('소폭합지는 롤 수가 더 많이 필요하다', () => {
    const wide = calcWallpaper({ ...base, type: 'wide' });
    const narrow = calcWallpaper({ ...base, type: 'narrow' });
    expect((narrow?.rolls ?? 0) > (wide?.rolls ?? 0)).toBe(true);
  });

  it('바닥 면적과 장판 길이를 계산한다', () => {
    const result = calcWallpaper(base);
    expect(result?.floorArea).toBeCloseTo(14);
    expect(result?.floorPyeong).toBeCloseTo(4.235, 2);
    expect(result?.flooringLength).toBeCloseTo((14 / 1.8) * 1.1, 3);
  });

  it('단가를 넣으면 예상 비용을 계산한다', () => {
    const result = calcWallpaper({ ...base, pricePerRoll: 30000, flooringPricePerM: 15000 });
    expect(result?.wallpaperCost).toBe((result?.rolls ?? 0) * 30000);
    expect(result?.flooringCost).toBeCloseTo((result?.flooringLength ?? 0) * 15000);
  });

  it('개구부가 많아도 벽 면적은 0 아래로 내려가지 않는다', () => {
    const result = calcWallpaper({ ...base, doors: 15, windows: 15 });
    expect(result?.wallArea).toBe(0);
  });

  it('크기가 없으면 결과 없음', () => {
    expect(calcWallpaper({ ...base, widthM: null })).toBeNull();
  });

  it('잘못된 입력을 잡아낸다', () => {
    expect(findIssues({ ...base, widthM: 0 })).toContain('size');
    expect(findIssues({ ...base, heightM: 20 })).toContain('height');
    expect(findIssues({ ...base, doors: 30 })).toContain('openings');
  });
});
