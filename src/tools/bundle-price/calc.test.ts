import { describe, expect, it } from 'vitest';
import { calcBundlePrice, findIssues } from './calc';

const base = {
  bundlePrice: null,
  count: null,
  amountPerItem: null,
  unit: 'ea' as const,
  singlePrice: null,
};

describe('calcBundlePrice', () => {
  it('묶음 가격을 개수로 나눠 개당 가격을 구한다', () => {
    const result = calcBundlePrice({ ...base, bundlePrice: 15000, count: 12 });
    expect(result?.perItem).toBe(1250);
    expect(result?.per100).toBeNull();
  });

  it('용량을 넣으면 100단위당 가격도 계산한다', () => {
    const result = calcBundlePrice({
      ...base,
      bundlePrice: 15000,
      count: 12,
      amountPerItem: 200,
      unit: 'ml',
    });
    expect(result?.totalAmount).toBe(2400);
    expect(result?.per100).toBeCloseTo(625);
  });

  it('낱개 가격과 비교해 절약률과 절약액을 계산한다', () => {
    const result = calcBundlePrice({
      ...base,
      bundlePrice: 15000,
      count: 12,
      singlePrice: 1500,
    });
    expect(result?.savingRate).toBeCloseTo(16.667, 2);
    expect(result?.savingAmount).toBe(3000);
  });

  it('묶음이 오히려 비싸면 절약률이 음수로 나온다', () => {
    const result = calcBundlePrice({
      ...base,
      bundlePrice: 20000,
      count: 10,
      singlePrice: 1800,
    });
    expect(result?.savingRate).toBeCloseTo(-11.111, 2);
    expect(result?.savingAmount).toBeCloseTo(-2000);
  });

  it('개수가 0 이하이면 계산하지 않는다', () => {
    expect(calcBundlePrice({ ...base, bundlePrice: 10000, count: 0 })).toBeNull();
  });

  it('가격이 비어 있으면 결과 없음', () => {
    expect(calcBundlePrice({ ...base, count: 5 })).toBeNull();
  });
});

describe('findIssues', () => {
  it('잘못된 입력을 잡아낸다', () => {
    expect(findIssues({ ...base, bundlePrice: -1, count: 1 })).toContain('bundlePrice');
    expect(findIssues({ ...base, bundlePrice: 1, count: 0 })).toContain('count');
    expect(findIssues({ ...base, amountPerItem: 0 })).toContain('amount');
  });
});
