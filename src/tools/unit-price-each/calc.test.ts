import { describe, expect, it } from 'vitest';
import { calcUnitPriceEach, findIssues } from './calc';

describe('calcUnitPriceEach', () => {
  it('총 가격을 개수로 나눠 개당 가격을 구한다', () => {
    const result = calcUnitPriceEach({ price: 24000, count: 30, subAmount: null });
    expect(result?.perItem).toBe(800);
    expect(result?.perSub).toBeNull();
    expect(result?.totalSub).toBeNull();
  });

  it('하위 단위를 넣으면 하위 단위당 가격도 계산한다 (휴지 30롤 × 25m)', () => {
    const result = calcUnitPriceEach({ price: 24000, count: 30, subAmount: 25 });
    expect(result?.perItem).toBe(800);
    expect(result?.totalSub).toBe(750);
    expect(result?.perSub).toBeCloseTo(32);
  });

  it('개수가 0 이하이면 계산하지 않는다', () => {
    expect(calcUnitPriceEach({ price: 1000, count: 0, subAmount: null })).toBeNull();
    expect(calcUnitPriceEach({ price: 1000, count: -3, subAmount: null })).toBeNull();
  });

  it('가격이 비어 있으면 결과 없음', () => {
    expect(calcUnitPriceEach({ price: null, count: 10, subAmount: null })).toBeNull();
  });

  it('음수 가격은 계산하지 않는다', () => {
    expect(calcUnitPriceEach({ price: -100, count: 10, subAmount: null })).toBeNull();
  });

  it('하위 수량이 0이면 하위 단가는 null', () => {
    const result = calcUnitPriceEach({ price: 1000, count: 10, subAmount: 0 });
    expect(result?.perItem).toBe(100);
    expect(result?.perSub).toBeNull();
  });
});

describe('findIssues', () => {
  it('잘못된 입력을 코드로 돌려준다', () => {
    expect(findIssues({ price: -1, count: 1, subAmount: null })).toEqual(['price']);
    expect(findIssues({ price: 1, count: 0, subAmount: null })).toEqual(['count']);
    expect(findIssues({ price: 1, count: 1, subAmount: -2 })).toEqual(['subAmount']);
    expect(findIssues({ price: null, count: null, subAmount: null })).toEqual([]);
  });
});
