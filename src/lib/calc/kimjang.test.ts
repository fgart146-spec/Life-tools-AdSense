import { describe, expect, it } from 'vitest';
import {
  calcKimjangCabbage,
  calcKimjangSauce,
  findCabbageIssues,
  KIMJANG_SAUCE_RULES,
} from './kimjang';

describe('calcKimjangCabbage', () => {
  it('4인 가족 6개월치 김치량을 계산한다', () => {
    const result = calcKimjangCabbage({
      members: 4,
      months: 6,
      gramPerDay: 60,
      cabbageWeightKg: 3,
    });
    // 4명 × 180일 × 60g = 43.2kg 김치
    expect(result?.totalKimchiKg).toBeCloseTo(43.2);
    expect(result?.saltedCabbageKg).toBeCloseTo(33.23, 1);
    expect(result?.freshCabbageKg).toBeCloseTo(47.47, 1);
    expect(result?.cabbageCount).toBe(16);
  });

  it('소금과 절임물 양을 계산한다', () => {
    const result = calcKimjangCabbage({
      members: 4,
      months: 6,
      gramPerDay: 60,
      cabbageWeightKg: 3,
    });
    expect(result?.saltKg).toBeCloseTo(4.75, 1);
    expect(result?.brineL).toBeCloseTo(47.47, 1);
  });

  it('섭취량을 늘리면 필요량이 늘어난다', () => {
    const low = calcKimjangCabbage({ members: 2, months: 3, gramPerDay: 40, cabbageWeightKg: 3 });
    const high = calcKimjangCabbage({ members: 2, months: 3, gramPerDay: 80, cabbageWeightKg: 3 });
    expect((high?.cabbageCount ?? 0) > (low?.cabbageCount ?? 0)).toBe(true);
  });

  it('인원이나 기간이 없으면 결과 없음', () => {
    expect(
      calcKimjangCabbage({ members: null, months: 6, gramPerDay: null, cabbageWeightKg: null }),
    ).toBeNull();
  });

  it('잘못된 입력을 잡아낸다', () => {
    expect(
      findCabbageIssues({ members: 0, months: 6, gramPerDay: null, cabbageWeightKg: null }),
    ).toContain('members');
    expect(
      findCabbageIssues({ members: 4, months: 30, gramPerDay: null, cabbageWeightKg: null }),
    ).toContain('months');
  });
});

describe('calcKimjangSauce', () => {
  it('절임배추 20kg이면 10kg 기준의 2배', () => {
    const result = calcKimjangSauce({
      saltedCabbageKg: 20,
      cabbageCount: null,
      cabbageWeightKg: null,
      strength: 1,
    });
    const chili = result?.items.find((item) => item.key === 'chili');
    expect(chili?.amount).toBeCloseTo(1800);
    expect(result?.items).toHaveLength(KIMJANG_SAUCE_RULES.length);
  });

  it('포기 수로 입력하면 절임 수율을 반영한다', () => {
    const result = calcKimjangSauce({
      saltedCabbageKg: null,
      cabbageCount: 10,
      cabbageWeightKg: 3,
      strength: 1,
    });
    // 10포기 × 3kg × 0.7 = 21kg
    expect(result?.saltedCabbageKg).toBeCloseTo(21);
  });

  it('양념 세기를 반영한다', () => {
    const mild = calcKimjangSauce({
      saltedCabbageKg: 10,
      cabbageCount: null,
      cabbageWeightKg: null,
      strength: 0.8,
    });
    const strong = calcKimjangSauce({
      saltedCabbageKg: 10,
      cabbageCount: null,
      cabbageWeightKg: null,
      strength: 1.2,
    });
    const mildChili = mild?.items.find((item) => item.key === 'chili')?.amount ?? 0;
    const strongChili = strong?.items.find((item) => item.key === 'chili')?.amount ?? 0;
    expect(strongChili).toBeCloseTo(mildChili * 1.5);
  });

  it('입력이 없으면 결과 없음', () => {
    expect(
      calcKimjangSauce({
        saltedCabbageKg: null,
        cabbageCount: null,
        cabbageWeightKg: null,
        strength: 1,
      }),
    ).toBeNull();
  });
});
