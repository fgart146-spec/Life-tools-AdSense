import { describe, expect, it } from 'vitest';
import { calcGroceryBudget, findIssues, WEEKS_PER_MONTH } from './grocery-budget';

const base = {
  members: 4,
  groceryTimesPerWeek: null,
  groceryPerVisit: null,
  diningTimesPerWeek: null,
  diningPerVisit: null,
  deliveryTimesPerWeek: null,
  deliveryPerOrder: null,
  targetBudget: null,
};

describe('calcGroceryBudget', () => {
  it('주 단위 습관을 월 금액으로 환산한다', () => {
    const result = calcGroceryBudget({
      ...base,
      groceryTimesPerWeek: 2,
      groceryPerVisit: 80000,
    });
    expect(result?.groceryMonthly).toBeCloseTo(2 * 80000 * WEEKS_PER_MONTH);
    expect(result?.total).toBeCloseTo(693333.33, 1);
  });

  it('장보기·외식·배달을 합산한다', () => {
    const result = calcGroceryBudget({
      ...base,
      groceryTimesPerWeek: 1,
      groceryPerVisit: 100000,
      diningTimesPerWeek: 1,
      diningPerVisit: 60000,
      deliveryTimesPerWeek: 1,
      deliveryPerOrder: 30000,
    });
    expect(result?.total).toBeCloseTo(190000 * WEEKS_PER_MONTH);
    expect(result?.eatingOutShare).toBeCloseTo((90000 / 190000) * 100);
  });

  it('1인당·하루당 금액을 계산한다', () => {
    const result = calcGroceryBudget({
      ...base,
      members: 4,
      groceryTimesPerWeek: 2,
      groceryPerVisit: 60000,
    });
    expect(result?.perPerson).toBeCloseTo((2 * 60000 * WEEKS_PER_MONTH) / 4);
    expect(result?.perPersonPerDay).toBeCloseTo((2 * 60000 * WEEKS_PER_MONTH) / 4 / 30);
  });

  it('목표 예산과의 차이를 계산한다 (초과)', () => {
    const result = calcGroceryBudget({
      ...base,
      groceryTimesPerWeek: 2,
      groceryPerVisit: 100000,
      targetBudget: 700000,
    });
    expect(result?.targetDiff).toBeCloseTo(2 * 100000 * WEEKS_PER_MONTH - 700000);
  });

  it('목표 예산 이내면 차이가 음수', () => {
    const result = calcGroceryBudget({
      ...base,
      groceryTimesPerWeek: 1,
      groceryPerVisit: 50000,
      targetBudget: 500000,
    });
    expect(result?.targetDiff ?? 0).toBeLessThan(0);
  });

  it('입력이 없으면 결과 없음', () => {
    expect(calcGroceryBudget({ ...base })).toBeNull();
  });

  it('음수 입력은 0으로 취급한다', () => {
    const result = calcGroceryBudget({
      ...base,
      groceryTimesPerWeek: 2,
      groceryPerVisit: 50000,
      diningTimesPerWeek: -1,
      diningPerVisit: 30000,
    });
    expect(result?.diningMonthly).toBe(0);
  });
});

describe('findIssues', () => {
  it('범위를 벗어난 값을 잡아낸다', () => {
    expect(findIssues({ ...base, members: 0 })).toContain('members');
    expect(findIssues({ ...base, groceryTimesPerWeek: 30 })).toContain('times');
    expect(findIssues({ ...base, groceryPerVisit: -1 })).toContain('amount');
    expect(findIssues({ ...base, targetBudget: -1 })).toContain('target');
  });
});
