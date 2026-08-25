import { describe, expect, it } from 'vitest';
import { computePurchase, effectiveDiscountRate } from './purchase';

describe('computePurchase', () => {
  it('할인이 없으면 상품금액 그대로', () => {
    const result = computePurchase({ unitPrice: 10000, quantity: 2 });
    expect(result.listTotal).toBe(20000);
    expect(result.payment).toBe(20000);
    expect(result.effectiveCost).toBe(20000);
    expect(result.couponDiscount).toBe(0);
  });

  it('정률 쿠폰 → 정액 쿠폰 → 카드할인 순서로 적용한다', () => {
    const result = computePurchase({
      unitPrice: 10000,
      quantity: 1,
      couponPercent: 10, // 10,000 → 9,000
      couponAmount: 1000, // 9,000 → 8,000
      cardPercent: 5, // 8,000 → 7,600
    });
    expect(result.couponDiscount).toBe(2000);
    expect(result.cardDiscount).toBe(400);
    expect(result.payment).toBe(7600);
  });

  it('배송비는 할인 대상이 아니며 결제금액에 더해진다', () => {
    const result = computePurchase({
      unitPrice: 10000,
      quantity: 1,
      cardPercent: 10,
      shipping: 3000,
    });
    expect(result.cardDiscount).toBe(1000);
    expect(result.payment).toBe(12000);
  });

  it('적립은 배송비를 제외한 금액 기준이며 체감가에서 차감된다', () => {
    const result = computePurchase({
      unitPrice: 10000,
      quantity: 1,
      shipping: 3000,
      pointPercent: 5, // 10,000의 5% = 500
      pointAmount: 200,
    });
    expect(result.points).toBe(700);
    expect(result.payment).toBe(13000);
    expect(result.effectiveCost).toBe(12300);
  });

  it('정액 쿠폰이 상품금액보다 크면 0원까지만 내려간다', () => {
    const result = computePurchase({ unitPrice: 5000, quantity: 1, couponAmount: 9000 });
    expect(result.couponDiscount).toBe(5000);
    expect(result.payment).toBe(0);
    expect(result.effectiveCost).toBe(0);
  });

  it('음수/비정상 입력은 0으로 취급한다', () => {
    const result = computePurchase({
      unitPrice: -100,
      quantity: 3,
      couponPercent: -5,
      cardPercent: 200,
    });
    expect(result.listTotal).toBe(0);
    expect(result.payment).toBe(0);
  });

  it('할인율은 100%를 넘지 않는다', () => {
    const result = computePurchase({ unitPrice: 10000, quantity: 1, couponPercent: 150 });
    expect(result.payment).toBe(0);
  });

  it('실질 할인율을 계산한다', () => {
    const result = computePurchase({ unitPrice: 10000, quantity: 1, couponPercent: 20 });
    expect(effectiveDiscountRate(result)).toBeCloseTo(20);
  });

  it('상품금액이 0이면 할인율은 null', () => {
    const result = computePurchase({ unitPrice: 0, quantity: 0 });
    expect(effectiveDiscountRate(result)).toBeNull();
  });
});

describe('카드 할인 한도', () => {
  it('한도를 넘는 카드 할인은 한도까지만 적용한다', () => {
    const result = computePurchase({
      unitPrice: 300000,
      quantity: 1,
      cardPercent: 10, // 30,000원이지만 한도 10,000원
      cardCap: 10000,
    });
    expect(result.cardDiscount).toBe(10000);
    expect(result.payment).toBe(290000);
  });

  it('한도가 0이면 한도 없음으로 본다', () => {
    const result = computePurchase({
      unitPrice: 300000,
      quantity: 1,
      cardPercent: 10,
      cardCap: 0,
    });
    expect(result.cardDiscount).toBe(30000);
  });

  it('한도가 할인액보다 크면 그대로 적용한다', () => {
    const result = computePurchase({
      unitPrice: 50000,
      quantity: 1,
      cardPercent: 10,
      cardCap: 10000,
    });
    expect(result.cardDiscount).toBe(5000);
  });
});
