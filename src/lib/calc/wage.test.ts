import { describe, expect, it } from 'vitest';
import {
  calcHolidayPay,
  calcSeverance,
  daysBetween,
  findSeveranceIssues,
  findWageIssues,
  hourlyToMonthly,
  monthlyToHourly,
  monthlyWorkHours,
  weeklyHolidayHours,
} from './wage';

const MIN_WAGE = 10_030;

describe('weeklyHolidayHours', () => {
  it('주 40시간이면 주휴 8시간', () => {
    expect(weeklyHolidayHours(40)).toBe(8);
  });

  it('주 20시간이면 주휴 4시간', () => {
    expect(weeklyHolidayHours(20)).toBe(4);
  });

  it('주 15시간 미만이면 주휴수당이 없다', () => {
    expect(weeklyHolidayHours(14)).toBe(0);
  });

  it('주 48시간이어도 주휴는 8시간을 넘지 않는다', () => {
    expect(weeklyHolidayHours(48)).toBe(8);
  });
});

describe('monthlyWorkHours', () => {
  it('주 40시간 + 주휴 포함이면 약 209시간', () => {
    expect(monthlyWorkHours(40, true)).toBeCloseTo(208.56, 1);
  });

  it('주휴를 빼면 약 174시간', () => {
    expect(monthlyWorkHours(40, false)).toBeCloseTo(173.8, 1);
  });
});

describe('monthlyToHourly', () => {
  it('월급 209만원 주 40시간이면 시급 1만원', () => {
    const result = monthlyToHourly(
      { amount: 2_085_600, weeklyHours: 40, includeHolidayPay: true },
      MIN_WAGE,
    );
    expect(result?.hourly).toBeCloseTo(10_000, 0);
    expect(result?.daily8h).toBeCloseTo(80_000, 0);
  });

  it('최저임금 대비 비율을 계산한다', () => {
    const result = monthlyToHourly(
      { amount: 2_085_600, weeklyHours: 40, includeHolidayPay: true },
      MIN_WAGE,
    );
    expect(result?.minimumWageRatio).toBeCloseTo((10_000 / MIN_WAGE) * 100, 0);
  });

  it('주 근로시간이 없으면 계산하지 않는다', () => {
    expect(
      monthlyToHourly({ amount: 2_000_000, weeklyHours: null, includeHolidayPay: true }, MIN_WAGE),
    ).toBeNull();
  });
});

describe('hourlyToMonthly', () => {
  it('시급 1만원 주 40시간이면 월급 약 209만원', () => {
    const result = hourlyToMonthly(
      { amount: 10_000, weeklyHours: 40, includeHolidayPay: true },
      MIN_WAGE,
    );
    expect(result?.monthly).toBeCloseTo(2_085_600, 0);
    expect(result?.annual).toBeCloseTo(2_085_600 * 12, 0);
  });

  it('주휴를 빼면 월급이 줄어든다', () => {
    const withHoliday = hourlyToMonthly(
      { amount: 10_000, weeklyHours: 40, includeHolidayPay: true },
      MIN_WAGE,
    );
    const without = hourlyToMonthly(
      { amount: 10_000, weeklyHours: 40, includeHolidayPay: false },
      MIN_WAGE,
    );
    expect((without?.monthly ?? 0) < (withHoliday?.monthly ?? 0)).toBe(true);
  });
});

describe('calcHolidayPay', () => {
  it('시급 1만원 주 40시간이면 주휴수당 8만원', () => {
    const result = calcHolidayPay({ hourlyWage: 10_000, weeklyHours: 40 });
    expect(result?.eligible).toBe(true);
    expect(result?.weeklyAmount).toBe(80_000);
    expect(result?.weeklyTotal).toBe(480_000);
  });

  it('주 20시간이면 주휴수당 4시간분', () => {
    const result = calcHolidayPay({ hourlyWage: 10_000, weeklyHours: 20 });
    expect(result?.weeklyAmount).toBe(40_000);
  });

  it('주 15시간 미만이면 주휴수당이 없다', () => {
    const result = calcHolidayPay({ hourlyWage: 10_000, weeklyHours: 12 });
    expect(result?.eligible).toBe(false);
    expect(result?.weeklyAmount).toBe(0);
  });

  it('월 환산 금액을 계산한다', () => {
    const result = calcHolidayPay({ hourlyWage: 10_000, weeklyHours: 40 });
    expect(result?.monthlyAmount).toBeCloseTo(80_000 * 4.345);
  });

  it('입력이 없으면 결과 없음', () => {
    expect(calcHolidayPay({ hourlyWage: null, weeklyHours: 40 })).toBeNull();
  });
});

describe('calcSeverance', () => {
  it('3년 근무, 3개월 급여 900만원이면 퇴직금을 계산한다', () => {
    const result = calcSeverance({
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      recentPay: 9_000_000,
      annualBonus: null,
      annualLeavePay: null,
    });
    expect(result).not.toBeNull();
    if (!result) return;
    expect(result.workedDays).toBe(1095);
    expect(result.eligible).toBe(true);
    // 1일 평균임금 ≈ 900만 ÷ 92일
    expect(result.dailyAverageWage).toBeCloseTo(9_000_000 / result.averageDays, 3);
    expect(result.severance).toBeCloseTo(
      result.dailyAverageWage * 30 * (1095 / 365),
      0,
    );
  });

  it('상여금과 연차수당은 3/12만 반영된다', () => {
    const withBonus = calcSeverance({
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      recentPay: 9_000_000,
      annualBonus: 4_000_000,
      annualLeavePay: null,
    });
    const withoutBonus = calcSeverance({
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      recentPay: 9_000_000,
      annualBonus: null,
      annualLeavePay: null,
    });
    expect((withBonus?.severance ?? 0) > (withoutBonus?.severance ?? 0)).toBe(true);
  });

  it('1년 미만 근무는 법정 퇴직금 대상이 아니다', () => {
    const result = calcSeverance({
      startDate: '2023-06-01',
      endDate: '2024-01-01',
      recentPay: 9_000_000,
      annualBonus: null,
      annualLeavePay: null,
    });
    expect(result?.eligible).toBe(false);
  });

  it('날짜가 잘못되면 결과 없음', () => {
    expect(
      calcSeverance({
        startDate: '',
        endDate: '2024-01-01',
        recentPay: 1_000_000,
        annualBonus: null,
        annualLeavePay: null,
      }),
    ).toBeNull();
  });

  it('퇴사일이 입사일보다 빠르면 문제로 표시한다', () => {
    expect(
      findSeveranceIssues({
        startDate: '2024-01-01',
        endDate: '2023-01-01',
        recentPay: 1_000_000,
        annualBonus: null,
        annualLeavePay: null,
      }),
    ).toContain('period');
  });
});

describe('보조 함수', () => {
  it('daysBetween은 일수 차이를 반환한다', () => {
    expect(
      daysBetween(new Date('2024-01-01T00:00:00Z'), new Date('2024-01-31T00:00:00Z')),
    ).toBe(30);
  });

  it('findWageIssues는 잘못된 입력을 잡아낸다', () => {
    expect(findWageIssues({ amount: -1, weeklyHours: 40, includeHolidayPay: true })).toContain(
      'amount',
    );
    expect(findWageIssues({ amount: 100, weeklyHours: 80, includeHolidayPay: true })).toContain(
      'hours',
    );
  });
});
