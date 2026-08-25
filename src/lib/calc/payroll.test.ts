import { describe, expect, it } from 'vitest';
import {
  calcIncomeTaxByBracket,
  calcSalary,
  childTaxCredit,
  earnedIncomeDeduction,
  earnedIncomeTaxCredit,
  findSalaryIssues,
} from './payroll';

describe('earnedIncomeDeduction', () => {
  it('구간별 근로소득공제를 계산한다', () => {
    expect(earnedIncomeDeduction(4_000_000)).toBe(2_800_000);
    expect(earnedIncomeDeduction(10_000_000)).toBe(3_500_000 + 5_000_000 * 0.4);
    expect(earnedIncomeDeduction(30_000_000)).toBe(7_500_000 + 15_000_000 * 0.15);
    expect(earnedIncomeDeduction(60_000_000)).toBe(12_000_000 + 15_000_000 * 0.05);
  });

  it('공제 한도는 2,000만원', () => {
    expect(earnedIncomeDeduction(1_000_000_000)).toBe(20_000_000);
  });

  it('0 이하는 0', () => {
    expect(earnedIncomeDeduction(0)).toBe(0);
  });
});

describe('calcIncomeTaxByBracket', () => {
  it('누진공제 방식으로 산출세액을 구한다', () => {
    expect(calcIncomeTaxByBracket(10_000_000)).toBeCloseTo(600_000);
    expect(calcIncomeTaxByBracket(30_000_000)).toBeCloseTo(30_000_000 * 0.15 - 1_260_000);
    expect(calcIncomeTaxByBracket(60_000_000)).toBeCloseTo(60_000_000 * 0.24 - 5_760_000);
  });

  it('과세표준이 0 이하이면 세금 없음', () => {
    expect(calcIncomeTaxByBracket(0)).toBe(0);
    expect(calcIncomeTaxByBracket(-100)).toBe(0);
  });
});

describe('earnedIncomeTaxCredit', () => {
  it('산출세액 130만원 이하는 55% 공제', () => {
    expect(earnedIncomeTaxCredit(1_000_000, 30_000_000)).toBeCloseTo(550_000);
  });

  it('총급여가 낮으면 한도 74만원', () => {
    expect(earnedIncomeTaxCredit(5_000_000, 30_000_000)).toBe(740_000);
  });

  it('총급여가 높을수록 한도가 줄어든다', () => {
    const mid = earnedIncomeTaxCredit(5_000_000, 60_000_000);
    const high = earnedIncomeTaxCredit(5_000_000, 100_000_000);
    expect(mid).toBeGreaterThan(high);
  });
});

describe('childTaxCredit', () => {
  it('자녀 수에 따른 세액공제 (2026년 귀속)', () => {
    expect(childTaxCredit(0)).toBe(0);
    expect(childTaxCredit(1)).toBe(250_000);
    expect(childTaxCredit(2)).toBe(550_000);
    expect(childTaxCredit(3)).toBe(950_000);
    expect(childTaxCredit(4)).toBe(1_350_000);
  });
});

describe('calcSalary', () => {
  it('연봉 4,000만원의 월 실수령액을 계산한다', () => {
    const result = calcSalary({
      annualSalary: 40_000_000,
      nonTaxableMonthly: 200_000,
      dependents: 1,
      children: 0,
    });
    expect(result).not.toBeNull();
    if (!result) return;

    expect(result.monthlyGross).toBeCloseTo(3_333_333, 0);
    // 과세 대상 = 월급 - 비과세
    expect(result.taxableMonthly).toBeCloseTo(3_133_333, 0);
    // 실수령액은 세전보다 작고, 공제율은 10~20% 사이
    expect(result.netMonthly).toBeLessThan(result.monthlyGross);
    expect(result.deductionRate).toBeGreaterThan(8);
    expect(result.deductionRate).toBeLessThan(25);
  });

  it('4대보험이 요율대로 계산된다', () => {
    const result = calcSalary({
      annualSalary: 36_000_000,
      nonTaxableMonthly: 0,
      dependents: 1,
      children: 0,
    });
    if (!result) throw new Error('no result');
    // 2026년 근로자 부담 요율
    expect(result.nationalPension).toBe(Math.round(3_000_000 * 0.0475));
    expect(result.health).toBe(Math.round(3_000_000 * 0.03595));
    expect(result.longTermCare).toBe(Math.round(result.health * 0.1314));
    expect(result.employment).toBe(Math.round(3_000_000 * 0.009));
  });

  it('국민연금은 기준소득월액 상한을 넘지 않는다', () => {
    const result = calcSalary({
      annualSalary: 200_000_000,
      nonTaxableMonthly: 0,
      dependents: 1,
      children: 0,
    });
    expect(result?.nationalPension).toBe(Math.round(6_590_000 * 0.0475));
  });

  it('부양가족이 많으면 소득세가 줄어든다', () => {
    const single = calcSalary({
      annualSalary: 50_000_000,
      nonTaxableMonthly: 200_000,
      dependents: 1,
      children: 0,
    });
    const family = calcSalary({
      annualSalary: 50_000_000,
      nonTaxableMonthly: 200_000,
      dependents: 4,
      children: 2,
    });
    expect((family?.incomeTax ?? 0) < (single?.incomeTax ?? 0)).toBe(true);
    expect((family?.netMonthly ?? 0) > (single?.netMonthly ?? 0)).toBe(true);
  });

  it('비과세액이 클수록 실수령액이 늘어난다', () => {
    const noMeal = calcSalary({
      annualSalary: 40_000_000,
      nonTaxableMonthly: 0,
      dependents: 1,
      children: 0,
    });
    const withMeal = calcSalary({
      annualSalary: 40_000_000,
      nonTaxableMonthly: 200_000,
      dependents: 1,
      children: 0,
    });
    expect((withMeal?.netMonthly ?? 0) > (noMeal?.netMonthly ?? 0)).toBe(true);
  });

  it('저소득 구간은 소득세 부담이 매우 작다', () => {
    const result = calcSalary({
      annualSalary: 18_000_000,
      nonTaxableMonthly: 200_000,
      dependents: 1,
      children: 0,
    });
    // 월 소득세가 2만원 미만이고, 지방소득세는 그 10%
    expect(result?.incomeTax ?? 0).toBeLessThan(20_000);
    expect(result?.localTax).toBe(Math.round((result?.incomeTax ?? 0) * 0.1));
  });

  it('부양가족 공제가 크면 소득세가 0이 된다', () => {
    const result = calcSalary({
      annualSalary: 18_000_000,
      nonTaxableMonthly: 200_000,
      dependents: 4,
      children: 2,
    });
    expect(result?.incomeTax).toBe(0);
    expect(result?.localTax).toBe(0);
  });

  it('연봉이 없으면 결과 없음', () => {
    expect(
      calcSalary({ annualSalary: null, nonTaxableMonthly: null, dependents: 1, children: 0 }),
    ).toBeNull();
  });
});

describe('findSalaryIssues', () => {
  it('잘못된 입력을 잡아낸다', () => {
    expect(
      findSalaryIssues({
        annualSalary: -1,
        nonTaxableMonthly: null,
        dependents: 1,
        children: 0,
      }),
    ).toContain('salary');
    expect(
      findSalaryIssues({
        annualSalary: 100,
        nonTaxableMonthly: null,
        dependents: 0,
        children: 0,
      }),
    ).toContain('dependents');
  });
});
