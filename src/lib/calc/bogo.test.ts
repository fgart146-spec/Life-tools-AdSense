import { describe, expect, it } from 'vitest';
import { calcBogo, findIssues } from './bogo';

describe('calcBogo', () => {
  it('1+1은 실질 50% 할인이다', () => {
    const result = calcBogo({ unitPrice: 4000, buy: 1, free: 1 });
    expect(result?.totalItems).toBe(2);
    expect(result?.paid).toBe(4000);
    expect(result?.effectiveUnitPrice).toBe(2000);
    expect(result?.discountRate).toBeCloseTo(50);
  });

  it('2+1은 실질 33.3% 할인이다', () => {
    const result = calcBogo({ unitPrice: 3000, buy: 2, free: 1 });
    expect(result?.totalItems).toBe(3);
    expect(result?.paid).toBe(6000);
    expect(result?.effectiveUnitPrice).toBe(2000);
    expect(result?.discountRate).toBeCloseTo(33.333, 2);
  });

  it('3+2는 40% 할인이다', () => {
    const result = calcBogo({ unitPrice: 1000, buy: 3, free: 2 });
    expect(result?.discountRate).toBeCloseTo(40);
  });

  it('증정이 없으면 할인율 0', () => {
    const result = calcBogo({ unitPrice: 5000, buy: 1, free: 0 });
    expect(result?.discountRate).toBe(0);
    expect(result?.effectiveUnitPrice).toBe(5000);
  });

  it('단순 할인과 비교해 유리한 쪽을 알려준다 (1+1 vs 40% 할인)', () => {
    const result = calcBogo({ unitPrice: 4000, buy: 1, free: 1, compareDiscountPercent: 40 });
    expect(result?.comparison?.discountedUnitPrice).toBe(2400);
    expect(result?.comparison?.better).toBe('bogo');
    expect(result?.comparison?.diffPercent).toBeCloseTo(16.667, 2);
  });

  it('2+1보다 40% 할인이 유리하다', () => {
    const result = calcBogo({ unitPrice: 3000, buy: 2, free: 1, compareDiscountPercent: 40 });
    expect(result?.comparison?.better).toBe('discount');
  });

  it('같으면 tie', () => {
    const result = calcBogo({ unitPrice: 4000, buy: 1, free: 1, compareDiscountPercent: 50 });
    expect(result?.comparison?.better).toBe('tie');
    expect(result?.comparison?.diffPercent).toBe(0);
  });

  it('가격이 없으면 결과 없음', () => {
    expect(calcBogo({ unitPrice: null, buy: 1, free: 1 })).toBeNull();
  });

  it('구매 개수가 0 이하이면 계산하지 않는다', () => {
    expect(calcBogo({ unitPrice: 1000, buy: 0, free: 1 })).toBeNull();
  });
});

describe('findIssues', () => {
  it('잘못된 입력을 잡아낸다', () => {
    expect(findIssues({ unitPrice: -1, buy: 1, free: 1 })).toContain('price');
    expect(findIssues({ unitPrice: 1, buy: 0, free: 1 })).toContain('buy');
    expect(findIssues({ unitPrice: 1, buy: 1, free: -1 })).toContain('free');
    expect(findIssues({ unitPrice: 1, buy: 1, free: 1, compareDiscountPercent: 130 })).toContain(
      'compare',
    );
  });
});
