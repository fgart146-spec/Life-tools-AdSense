import { describe, expect, it } from 'vitest';
import { calcLivingCost, findIssues } from './living-cost';

describe('calcLivingCost', () => {
  it('항목을 더해 총액과 1인당 금액을 계산한다', () => {
    const result = calcLivingCost({
      members: 4,
      amounts: { housing: 800000, food: 900000, utilities: 250000 },
      income: null,
    });
    expect(result?.total).toBe(1950000);
    expect(result?.perPerson).toBe(487500);
    expect(result?.annual).toBe(23400000);
  });

  it('항목 비중을 큰 순서로 정렬한다', () => {
    const result = calcLivingCost({
      members: 2,
      amounts: { housing: 500000, food: 700000, transport: 100000 },
      income: null,
    });
    expect(result?.shares[0]?.key).toBe('food');
    expect(result?.shares[0]?.share).toBeCloseTo(53.85, 1);
    expect(result?.shares).toHaveLength(3);
  });

  it('소득을 넣으면 지출 비율과 잉여를 계산한다', () => {
    const result = calcLivingCost({
      members: 1,
      amounts: { housing: 600000, food: 400000 },
      income: 2500000,
    });
    expect(result?.incomeRatio).toBeCloseTo(40);
    expect(result?.surplus).toBe(1500000);
  });

  it('지출이 소득보다 크면 잉여가 음수', () => {
    const result = calcLivingCost({
      members: 1,
      amounts: { housing: 1500000, food: 800000 },
      income: 2000000,
    });
    expect(result?.surplus).toBe(-300000);
  });

  it('가구원 수가 없으면 1명으로 본다', () => {
    const result = calcLivingCost({ members: null, amounts: { food: 500000 }, income: null });
    expect(result?.perPerson).toBe(500000);
  });

  it('모든 항목이 비어 있으면 결과 없음', () => {
    expect(calcLivingCost({ members: 3, amounts: {}, income: null })).toBeNull();
  });

  it('음수 항목은 0으로 취급한다', () => {
    const result = calcLivingCost({
      members: 1,
      amounts: { food: 500000, housing: -100000 },
      income: null,
    });
    expect(result?.total).toBe(500000);
  });
});

describe('findIssues', () => {
  it('잘못된 입력을 잡아낸다', () => {
    expect(findIssues({ members: 0, amounts: {}, income: null })).toContain('members');
    expect(findIssues({ members: 2, amounts: { food: -1 }, income: null })).toContain('amount');
    expect(findIssues({ members: 2, amounts: {}, income: -5 })).toContain('income');
  });
});
