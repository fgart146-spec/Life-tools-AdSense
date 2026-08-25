import { describe, expect, it } from 'vitest';
import { calcCostRatio, findIssues } from './calc';

describe('calcCostRatio', () => {
  it('원가 ÷ 판매가로 원가율을 계산한다', () => {
    const result = calcCostRatio({ price: 10000, cost: 3500, targetRatio: null });
    expect(result?.costRate).toBeCloseTo(35);
    expect(result?.grossMarginRate).toBeCloseTo(65);
    expect(result?.grossProfit).toBe(6500);
  });

  it('목표 원가율을 넣으면 목표 원가와 목표 판매가를 계산한다', () => {
    const result = calcCostRatio({ price: 10000, cost: 3500, targetRatio: 30 });
    expect(result?.targetCost).toBe(3000);
    expect(result?.targetPrice).toBeCloseTo(11666.67, 1);
  });

  it('원가가 판매가보다 크면 원가율이 100%를 넘는다', () => {
    const result = calcCostRatio({ price: 5000, cost: 6000, targetRatio: null });
    expect(result?.costRate).toBeCloseTo(120);
    expect(result?.grossProfit).toBe(-1000);
  });

  it('판매가가 0 이하이면 계산하지 않는다', () => {
    expect(calcCostRatio({ price: 0, cost: 1000, targetRatio: null })).toBeNull();
  });

  it('입력이 부족하면 결과 없음', () => {
    expect(calcCostRatio({ price: 10000, cost: null, targetRatio: null })).toBeNull();
  });

  it('잘못된 입력을 잡아낸다', () => {
    expect(findIssues({ price: 0, cost: 100, targetRatio: null })).toContain('price');
    expect(findIssues({ price: 100, cost: 10, targetRatio: 120 })).toContain('target');
  });
});
