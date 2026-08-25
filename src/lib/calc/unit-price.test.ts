import { describe, expect, it } from 'vitest';
import {
  baseUnitOf,
  compareUnitPrice,
  computeUnitPrice,
  findUnitPriceIssues,
  toBaseAmount,
} from './unit-price';

describe('단위 환산', () => {
  it('kg/L은 g/ml로 환산한다', () => {
    expect(toBaseAmount(1.5, 'kg')).toBe(1500);
    expect(toBaseAmount(2, 'l')).toBe(2000);
    expect(toBaseAmount(500, 'g')).toBe(500);
    expect(baseUnitOf('kg')).toBe('g');
    expect(baseUnitOf('ea')).toBe('ea');
  });
});

describe('computeUnitPrice', () => {
  it('100g당 / 1kg당 / 개당 가격을 계산한다', () => {
    const result = computeUnitPrice({ cost: 9000, amountPerItem: 500, unit: 'g', quantity: 2 });
    expect(result).not.toBeNull();
    expect(result?.totalBaseAmount).toBe(1000);
    expect(result?.pricePer100).toBeCloseTo(900);
    expect(result?.pricePer1000).toBeCloseTo(9000);
    expect(result?.pricePerItem).toBe(4500);
  });

  it('개수 단위는 100/1000 단가를 계산하지 않는다', () => {
    const result = computeUnitPrice({ cost: 12000, amountPerItem: 30, unit: 'ea', quantity: 1 });
    expect(result?.pricePer100).toBeNull();
    expect(result?.pricePerBase).toBeCloseTo(400);
  });

  it('용량이나 수량이 0이면 계산하지 않는다', () => {
    expect(computeUnitPrice({ cost: 1000, amountPerItem: 0, unit: 'g', quantity: 1 })).toBeNull();
    expect(computeUnitPrice({ cost: 1000, amountPerItem: 100, unit: 'g', quantity: 0 })).toBeNull();
  });

  it('가격이 0이어도(증정품) 계산은 가능하다', () => {
    const result = computeUnitPrice({ cost: 0, amountPerItem: 100, unit: 'g', quantity: 1 });
    expect(result?.pricePer100).toBe(0);
  });

  it('음수 금액은 계산하지 않는다', () => {
    expect(computeUnitPrice({ cost: -100, amountPerItem: 100, unit: 'g', quantity: 1 })).toBeNull();
  });
});

describe('compareUnitPrice', () => {
  it('더 싼 쪽과 절약률을 계산한다', () => {
    const result = compareUnitPrice(850, 1000);
    expect(result?.cheaper).toBe('a');
    expect(result?.perBaseDiff).toBe(150);
    expect(result?.percentCheaper).toBeCloseTo(15);
  });

  it('B가 싼 경우', () => {
    const result = compareUnitPrice(1200, 900);
    expect(result?.cheaper).toBe('b');
    expect(result?.percentCheaper).toBeCloseTo(25);
  });

  it('같으면 tie', () => {
    const result = compareUnitPrice(1000, 1000);
    expect(result?.cheaper).toBe('tie');
    expect(result?.percentCheaper).toBe(0);
  });

  it('음수는 비교하지 않는다', () => {
    expect(compareUnitPrice(-1, 100)).toBeNull();
  });
});

describe('findUnitPriceIssues', () => {
  it('음수 가격, 0 이하 용량/수량을 잡아낸다', () => {
    expect(findUnitPriceIssues({ price: -1, amount: 100, quantity: 1 })).toContain('price');
    expect(findUnitPriceIssues({ price: 100, amount: 0, quantity: 1 })).toContain('amount');
    expect(findUnitPriceIssues({ price: 100, amount: 100, quantity: 0 })).toContain('quantity');
  });

  it('비어 있는 입력은 문제로 보지 않는다(아직 입력 중)', () => {
    expect(findUnitPriceIssues({ price: null, amount: null, quantity: null })).toEqual([]);
  });
});
