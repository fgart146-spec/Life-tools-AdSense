import { describe, expect, it } from 'vitest';
import { calcMeat, findIssues, MEAT_BASE_GRAM } from './calc';

const base = {
  adults: 4,
  children: 0,
  appetite: 'normal' as const,
  meatType: 'pork-belly' as const,
  customGram: null,
  pricePer100g: null,
};

describe('calcMeat', () => {
  it('성인 4명 삼겹살은 1인 220g 기준으로 880g', () => {
    const result = calcMeat(base);
    expect(result?.perPersonGram).toBe(MEAT_BASE_GRAM['pork-belly']);
    expect(result?.totalGram).toBe(880);
    expect(result?.totalKg).toBeCloseTo(0.88);
  });

  it('어린이는 0.5명분으로 계산한다', () => {
    const result = calcMeat({ ...base, adults: 2, children: 2 });
    expect(result?.persons).toBe(3);
    expect(result?.totalGram).toBe(660);
  });

  it('식사량이 많으면 25% 늘어난다', () => {
    const result = calcMeat({ ...base, appetite: 'heavy' });
    expect(result?.totalGram).toBe(1100);
  });

  it('고기 종류에 따라 기준량이 달라진다', () => {
    const shabu = calcMeat({ ...base, meatType: 'shabu' });
    expect(shabu?.perPersonGram).toBe(150);
    expect(shabu?.totalGram).toBe(600);
  });

  it('1인 기준량을 직접 지정할 수 있다', () => {
    const result = calcMeat({ ...base, customGram: 300 });
    expect(result?.totalGram).toBe(1200);
  });

  it('100g당 가격을 넣으면 예상 비용을 계산한다', () => {
    const result = calcMeat({ ...base, pricePer100g: 2800 });
    expect(result?.estimatedCost).toBeCloseTo(880 / 100 * 2800);
    expect(result?.costPerPerson).toBeCloseTo(6160);
  });

  it('인원이 없으면 결과 없음', () => {
    expect(calcMeat({ ...base, adults: 0, children: 0 })).toBeNull();
  });
});

describe('findIssues', () => {
  it('잘못된 입력을 잡아낸다', () => {
    expect(findIssues({ ...base, adults: -1 })).toContain('people');
    expect(findIssues({ ...base, customGram: 0 })).toContain('customGram');
    expect(findIssues({ ...base, pricePer100g: -1 })).toContain('price');
  });
});
