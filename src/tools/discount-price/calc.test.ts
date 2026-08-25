import { describe, expect, it } from 'vitest';
import { calcDiscountPrice, findIssues } from './calc';

describe('calcDiscountPrice', () => {
  it('할인율만 있을 때 최종가를 계산한다', () => {
    const result = calcDiscountPrice({
      price: 50000,
      quantity: 1,
      discountPercent: 30,
      couponAmount: null,
    });
    expect(result?.finalPrice).toBe(35000);
    expect(result?.discountAmount).toBe(15000);
    expect(result?.effectiveRate).toBeCloseTo(30);
  });

  it('할인율 뒤에 정액 쿠폰을 적용한다', () => {
    const result = calcDiscountPrice({
      price: 50000,
      quantity: 1,
      discountPercent: 30,
      couponAmount: 5000,
    });
    expect(result?.finalPrice).toBe(30000);
    expect(result?.effectiveRate).toBeCloseTo(40);
  });

  it('수량이 여러 개면 총액 기준으로 계산한다', () => {
    const result = calcDiscountPrice({
      price: 12000,
      quantity: 3,
      discountPercent: 10,
      couponAmount: null,
    });
    expect(result?.listTotal).toBe(36000);
    expect(result?.finalPrice).toBe(32400);
    expect(result?.perItem).toBe(10800);
  });

  it('쿠폰이 금액보다 크면 0원까지만 내려간다', () => {
    const result = calcDiscountPrice({
      price: 5000,
      quantity: 1,
      discountPercent: null,
      couponAmount: 8000,
    });
    expect(result?.finalPrice).toBe(0);
    expect(result?.effectiveRate).toBeCloseTo(100);
  });

  it('할인이 없으면 정가 그대로', () => {
    const result = calcDiscountPrice({
      price: 9900,
      quantity: null,
      discountPercent: null,
      couponAmount: null,
    });
    expect(result?.finalPrice).toBe(9900);
    expect(result?.effectiveRate).toBe(0);
  });

  it('가격이 없으면 결과 없음', () => {
    expect(
      calcDiscountPrice({ price: null, quantity: 1, discountPercent: 10, couponAmount: null }),
    ).toBeNull();
  });
});

describe('findIssues', () => {
  it('범위를 벗어난 입력을 잡아낸다', () => {
    expect(
      findIssues({ price: 1000, quantity: 1, discountPercent: 120, couponAmount: null }),
    ).toContain('discount');
    expect(
      findIssues({ price: -1, quantity: 1, discountPercent: null, couponAmount: null }),
    ).toContain('price');
    expect(
      findIssues({ price: 1000, quantity: 0, discountPercent: null, couponAmount: null }),
    ).toContain('quantity');
  });
});
