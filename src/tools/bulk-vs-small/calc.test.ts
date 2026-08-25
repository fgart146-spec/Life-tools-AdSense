import { describe, expect, it } from 'vitest';
import { calcBulkVsSmall, findIssues } from './calc';

const base = {
  bulkPrice: null,
  bulkAmount: null,
  smallPrice: null,
  smallAmount: null,
  unit: 'ml' as const,
  usagePercent: null,
};

describe('calcBulkVsSmall', () => {
  it('명목 단가를 비교한다', () => {
    const result = calcBulkVsSmall({
      ...base,
      bulkPrice: 15900,
      bulkAmount: 3000,
      smallPrice: 12900,
      smallAmount: 2200,
    });
    expect(result?.bulkUnitPrice).toBeCloseTo(5.3);
    expect(result?.smallUnitPrice).toBeCloseTo(5.8636, 3);
    expect(result?.better).toBe('bulk');
  });

  it('사용률을 반영하면 대용량이 불리해질 수 있다', () => {
    const result = calcBulkVsSmall({
      ...base,
      bulkPrice: 15900,
      bulkAmount: 3000,
      smallPrice: 12900,
      smallAmount: 2200,
      usagePercent: 80,
    });
    // 3000 × 0.8 = 2400ml만 사용 → 6.625/ml
    expect(result?.bulkEffectiveUnitPrice).toBeCloseTo(6.625);
    expect(result?.better).toBe('small');
  });

  it('손익분기 사용률을 계산한다', () => {
    const result = calcBulkVsSmall({
      ...base,
      bulkPrice: 15900,
      bulkAmount: 3000,
      smallPrice: 12900,
      smallAmount: 2200,
    });
    // 15900 / (3000 × 5.8636) = 약 90.4%
    expect(result?.breakEvenUsage).toBeCloseTo(90.39, 1);
  });

  it('kg/L 단위도 환산해서 비교한다', () => {
    const result = calcBulkVsSmall({
      ...base,
      unit: 'l',
      bulkPrice: 15900,
      bulkAmount: 3,
      smallPrice: 12900,
      smallAmount: 2.2,
    });
    expect(result?.bulkUnitPrice).toBeCloseTo(5.3);
  });

  it('단가가 같으면 tie', () => {
    const result = calcBulkVsSmall({
      ...base,
      bulkPrice: 10000,
      bulkAmount: 1000,
      smallPrice: 5000,
      smallAmount: 500,
    });
    expect(result?.better).toBe('tie');
    expect(result?.diffPercent).toBe(0);
  });

  it('사용률이 0 이하이거나 100 초과면 계산하지 않는다', () => {
    expect(
      calcBulkVsSmall({
        ...base,
        bulkPrice: 1000,
        bulkAmount: 100,
        smallPrice: 500,
        smallAmount: 50,
        usagePercent: 0,
      }),
    ).toBeNull();
  });

  it('입력이 부족하면 null', () => {
    expect(calcBulkVsSmall({ ...base, bulkPrice: 1000, bulkAmount: 100 })).toBeNull();
  });
});

describe('findIssues', () => {
  it('잘못된 입력을 잡아낸다', () => {
    expect(findIssues({ ...base, bulkAmount: 0 })).toContain('bulkAmount');
    expect(findIssues({ ...base, usagePercent: 120 })).toContain('usage');
    expect(findIssues({ ...base, smallPrice: -1 })).toContain('smallPrice');
  });
});
