import { describe, expect, it } from 'vitest';
import { comparePrice, findIssues, repeatSavings, totalAmountOf } from './calc';
import type { CompareProductInput } from './calc';

const base: CompareProductInput = {
  price: null,
  amount: null,
  unit: 'g',
  quantity: 1,
  couponPercent: null,
  couponAmount: null,
  cardPercent: null,
  shipping: null,
  pointPercent: null,
};

describe('comparePrice', () => {
  it('단가가 낮은 쪽을 찾아낸다', () => {
    const result = comparePrice(
      { ...base, price: 16800, amount: 600 },
      { ...base, price: 30000, amount: 1200 },
    );
    expect(result?.cheaper).toBe('b');
    expect(result?.a.pricePer100).toBeCloseTo(2800);
    expect(result?.b.pricePer100).toBeCloseTo(2500);
    expect(result?.percentCheaper).toBeCloseTo(10.714, 2);
  });

  it('기준량(A 총량)만큼 살 때의 차액을 계산한다', () => {
    const result = comparePrice(
      { ...base, price: 16800, amount: 600 },
      { ...base, price: 30000, amount: 1200 },
    );
    // 단가 차이 3원/g × 기준량 600g = 1,800원
    expect(result?.referenceAmount).toBe(600);
    expect(result?.savingPerPurchase).toBeCloseTo(1800);
  });

  it('쿠폰과 카드 할인을 반영한 실구매가로 비교한다', () => {
    const result = comparePrice(
      { ...base, price: 20000, amount: 1000, couponPercent: 20 },
      { ...base, price: 17000, amount: 1000 },
    );
    // A: 16,000원 → 100g당 1,600원 / B: 17,000원 → 1,700원
    expect(result?.cheaper).toBe('a');
    expect(result?.a.purchase.effectiveCost).toBe(16000);
  });

  it('배송비를 포함해 비교한다', () => {
    const result = comparePrice(
      { ...base, price: 10000, amount: 500, shipping: 3000 },
      { ...base, price: 12000, amount: 500 },
    );
    expect(result?.cheaper).toBe('b');
  });

  it('적립금은 체감 실구매가에 반영된다', () => {
    const result = comparePrice(
      { ...base, price: 10000, amount: 500, pointPercent: 10 },
      { ...base, price: 9500, amount: 500 },
    );
    // A 체감 9,000원 < B 9,500원
    expect(result?.cheaper).toBe('a');
  });

  it('단가가 같으면 tie', () => {
    const result = comparePrice(
      { ...base, price: 10000, amount: 500 },
      { ...base, price: 20000, amount: 1000 },
    );
    expect(result?.cheaper).toBe('tie');
    expect(result?.savingPerPurchase).toBe(0);
  });

  it('무게와 부피는 비교 대상이 아니라고 표시한다', () => {
    const result = comparePrice(
      { ...base, price: 10000, amount: 500, unit: 'g' },
      { ...base, price: 10000, amount: 500, unit: 'ml' },
    );
    expect(result?.comparable).toBe(false);
    expect(findIssues(
      { ...base, price: 10000, amount: 500, unit: 'g' },
      { ...base, price: 10000, amount: 500, unit: 'ml' },
    )).toContain('unitMismatch');
  });

  it('입력이 부족하면 null', () => {
    expect(comparePrice({ ...base, price: 1000 }, { ...base, price: 2000, amount: 100 })).toBeNull();
  });

  it('kg과 g을 섞어도 같은 기준으로 환산한다', () => {
    const result = comparePrice(
      { ...base, price: 30000, amount: 1.2, unit: 'kg' },
      { ...base, price: 16800, amount: 600, unit: 'g' },
    );
    expect(result?.comparable).toBe(true);
    expect(result?.cheaper).toBe('a');
  });
});

describe('repeatSavings', () => {
  it('월/연 절약액을 계산한다', () => {
    expect(repeatSavings(1800, 2)).toEqual({ monthly: 3600, yearly: 43200 });
  });

  it('음수 횟수는 0으로 본다', () => {
    expect(repeatSavings(1000, -1)).toEqual({ monthly: 0, yearly: 0 });
  });
});

describe('totalAmountOf', () => {
  it('총 용량을 기준 단위로 환산한다', () => {
    expect(totalAmountOf({ ...base, amount: 1.5, unit: 'kg', quantity: 2 })).toBe(3000);
    expect(totalAmountOf({ ...base, amount: null })).toBeNull();
  });
});
