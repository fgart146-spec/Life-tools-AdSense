import { describe, expect, it } from 'vitest';
import { calcCardCoupon, findIssues } from './calc';

const base = {
  price: null,
  quantity: 1,
  couponPercent: null,
  couponAmount: null,
  cardPercent: null,
  cardCap: null,
  shipping: null,
  pointPercent: null,
};

describe('calcCardCoupon', () => {
  it('쿠폰 → 카드할인 순서로 적용한다', () => {
    const result = calcCardCoupon({
      ...base,
      price: 100000,
      couponPercent: 10,
      cardPercent: 5,
    });
    expect(result?.couponDiscount).toBe(10000);
    expect(result?.cardDiscount).toBe(4500);
    expect(result?.payment).toBe(85500);
  });

  it('카드 할인 한도를 적용한다', () => {
    const result = calcCardCoupon({
      ...base,
      price: 500000,
      cardPercent: 10,
      cardCap: 20000,
    });
    expect(result?.cardDiscount).toBe(20000);
    expect(result?.cardCapped).toBe(true);
  });

  it('한도에 걸리지 않으면 cardCapped는 false', () => {
    const result = calcCardCoupon({
      ...base,
      price: 100000,
      cardPercent: 5,
      cardCap: 20000,
    });
    expect(result?.cardDiscount).toBe(5000);
    expect(result?.cardCapped).toBe(false);
  });

  it('배송비는 할인 후 더해지고 적립은 상품금액 기준이다', () => {
    const result = calcCardCoupon({
      ...base,
      price: 50000,
      shipping: 3000,
      pointPercent: 10,
    });
    expect(result?.payment).toBe(53000);
    expect(result?.points).toBe(5000);
    expect(result?.effectiveCost).toBe(48000);
  });

  it('실질 할인율은 배송비까지 반영한다', () => {
    const result = calcCardCoupon({
      ...base,
      price: 10000,
      couponPercent: 10,
      shipping: 3000,
    });
    // 9,000 + 3,000 = 12,000 → 정가 10,000 대비 -20%
    expect(result?.effectiveRate).toBeCloseTo(-20);
  });

  it('수량이 여러 개면 개당 체감가를 계산한다', () => {
    const result = calcCardCoupon({ ...base, price: 10000, quantity: 4, couponPercent: 20 });
    expect(result?.effectiveCost).toBe(32000);
    expect(result?.perItem).toBe(8000);
  });

  it('가격이 없으면 결과 없음', () => {
    expect(calcCardCoupon({ ...base })).toBeNull();
  });
});

describe('findIssues', () => {
  it('범위를 벗어난 비율과 음수 금액을 잡아낸다', () => {
    expect(findIssues({ ...base, price: 1000, cardPercent: 150 })).toContain('percent');
    expect(findIssues({ ...base, price: 1000, shipping: -1 })).toContain('amount');
    expect(findIssues({ ...base, price: 1000, quantity: 0 })).toContain('quantity');
  });
});
