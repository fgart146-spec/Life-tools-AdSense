import { describe, expect, it } from 'vitest';
import { calcFoodList, prettyAmount, type FoodRule } from './food-list';

const rules: FoodRule[] = [
  { key: 'meat', perPerson: 300, unit: 'g', step: 50 },
  { key: 'egg', perPerson: 2, unit: 'ea', step: 1 },
  { key: 'charcoal', perPerson: 0, unit: 'kg', fixed: 1, step: 0.5 },
];

describe('calcFoodList', () => {
  it('인원수에 비례해 재료량을 계산한다', () => {
    const items = calcFoodList(rules, 4);
    expect(items[0]).toEqual({ key: 'meat', amount: 1200, unit: 'g' });
    expect(items[1]).toEqual({ key: 'egg', amount: 8, unit: 'ea' });
  });

  it('고정량 재료는 인원과 무관하다', () => {
    const items = calcFoodList(rules, 4);
    expect(items[2]?.amount).toBe(1);
  });

  it('배수(박수·끼니 수)를 곱한다', () => {
    const items = calcFoodList(rules, 2, 2);
    expect(items[0]?.amount).toBe(1200);
    expect(items[2]?.amount).toBe(2);
  });

  it('step 단위로 올림한다', () => {
    const items = calcFoodList([{ key: 'egg', perPerson: 1.2, unit: 'ea', step: 1 }], 3);
    expect(items[0]?.amount).toBe(4);
  });

  it('인원이 0이면 빈 목록', () => {
    expect(calcFoodList(rules, 0)).toEqual([]);
  });
});

describe('prettyAmount', () => {
  it('1,000g 이상은 kg으로 바꾼다', () => {
    expect(prettyAmount({ key: 'meat', amount: 1500, unit: 'g' })).toEqual({
      amount: 1.5,
      unit: 'kg',
    });
  });

  it('1,000ml 이상은 L로 바꾼다', () => {
    expect(prettyAmount({ key: 'water', amount: 2000, unit: 'ml' })).toEqual({
      amount: 2,
      unit: 'l',
    });
  });

  it('작은 값은 그대로 둔다', () => {
    expect(prettyAmount({ key: 'meat', amount: 800, unit: 'g' })).toEqual({
      amount: 800,
      unit: 'g',
    });
  });
});
