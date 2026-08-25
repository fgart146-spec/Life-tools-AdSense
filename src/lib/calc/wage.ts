import { MONTHLY_WORK_HOURS_209 } from '@/lib/data/kr-payroll';

/**
 * 시급·주휴수당·퇴직금 계산.
 *
 * 기준 (근로기준법·고용노동부 행정해석 기준)
 * - 월 소정근로시간(주 40시간 기준) = (40시간 + 주휴 8시간) × 4.345주 ≈ 209시간
 * - 주휴수당: 주 소정근로시간이 15시간 이상일 때 발생.
 *   주휴시간 = (주 소정근로시간 ÷ 40) × 8 (최대 8시간)
 * - 퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365), 계속근로 1년 이상일 때 발생
 */
export const WEEKS_PER_MONTH = 4.345;
export const FULL_TIME_WEEKLY_HOURS = 40;
export const WEEKLY_HOLIDAY_HOURS = 8;
export const MIN_WEEKLY_HOURS_FOR_HOLIDAY_PAY = 15;

/** 주휴시간 (주 소정근로시간 기준) */
export function weeklyHolidayHours(weeklyHours: number): number {
  if (weeklyHours < MIN_WEEKLY_HOURS_FOR_HOLIDAY_PAY) return 0;
  const hours = (weeklyHours / FULL_TIME_WEEKLY_HOURS) * WEEKLY_HOLIDAY_HOURS;
  return Math.min(hours, WEEKLY_HOLIDAY_HOURS);
}

/** 월 소정근로시간 (주휴시간 포함 여부 선택) */
export function monthlyWorkHours(weeklyHours: number, includeHoliday: boolean): number {
  if (weeklyHours <= 0) return 0;
  const holiday = includeHoliday ? weeklyHolidayHours(weeklyHours) : 0;
  return (weeklyHours + holiday) * WEEKS_PER_MONTH;
}

/* -------------------------------------------------------------------------- */
/* 시급 ↔ 월급                                                                  */
/* -------------------------------------------------------------------------- */

export interface WageInput {
  /** 변환할 금액 */
  amount: number | null;
  /** 주 소정근로시간 */
  weeklyHours: number | null;
  /** 주휴수당 포함 기준으로 계산할지 */
  includeHolidayPay: boolean;
}

export interface WageResult {
  /** 월 소정근로시간 */
  monthlyHours: number;
  hourly: number;
  daily8h: number;
  weekly: number;
  monthly: number;
  annual: number;
  /** 최저임금 대비 비율(%) — 최저임금을 넘기면 100 초과 */
  minimumWageRatio: number | null;
}

export type WageIssue = 'amount' | 'hours';

export function findWageIssues(input: WageInput): WageIssue[] {
  const issues: WageIssue[] = [];
  if (input.amount !== null && input.amount < 0) issues.push('amount');
  if (input.weeklyHours !== null && (input.weeklyHours <= 0 || input.weeklyHours > 68)) {
    issues.push('hours');
  }
  return issues;
}

/** 월급 → 시급 */
export function monthlyToHourly(
  input: WageInput,
  minimumWage: number,
): WageResult | null {
  if (input.amount === null || input.amount < 0) return null;
  const weeklyHours = input.weeklyHours !== null && input.weeklyHours > 0 ? input.weeklyHours : 0;
  if (weeklyHours <= 0) return null;

  const monthlyHours = monthlyWorkHours(weeklyHours, input.includeHolidayPay);
  if (monthlyHours <= 0) return null;

  const hourly = input.amount / monthlyHours;
  return buildResult(hourly, weeklyHours, monthlyHours, input.amount, minimumWage);
}

/** 시급 → 월급 */
export function hourlyToMonthly(input: WageInput, minimumWage: number): WageResult | null {
  if (input.amount === null || input.amount < 0) return null;
  const weeklyHours = input.weeklyHours !== null && input.weeklyHours > 0 ? input.weeklyHours : 0;
  if (weeklyHours <= 0) return null;

  const monthlyHours = monthlyWorkHours(weeklyHours, input.includeHolidayPay);
  const monthly = input.amount * monthlyHours;
  return buildResult(input.amount, weeklyHours, monthlyHours, monthly, minimumWage);
}

function buildResult(
  hourly: number,
  weeklyHours: number,
  monthlyHours: number,
  monthly: number,
  minimumWage: number,
): WageResult {
  const holiday = weeklyHolidayHours(weeklyHours);
  return {
    monthlyHours,
    hourly,
    daily8h: hourly * 8,
    weekly: hourly * (weeklyHours + holiday),
    monthly,
    annual: monthly * 12,
    minimumWageRatio: minimumWage > 0 ? (hourly / minimumWage) * 100 : null,
  };
}

/* -------------------------------------------------------------------------- */
/* 주휴수당                                                                     */
/* -------------------------------------------------------------------------- */

export interface HolidayPayInput {
  hourlyWage: number | null;
  weeklyHours: number | null;
}

export interface HolidayPayResult {
  /** 주휴수당 발생 여부 */
  eligible: boolean;
  holidayHours: number;
  /** 1주 주휴수당 */
  weeklyAmount: number;
  /** 1주 근로수당 (주휴 제외) */
  weeklyWorkPay: number;
  /** 주휴 포함 주급 */
  weeklyTotal: number;
  /** 월 환산 주휴수당 */
  monthlyAmount: number;
}

export function calcHolidayPay(input: HolidayPayInput): HolidayPayResult | null {
  if (input.hourlyWage === null || input.hourlyWage < 0) return null;
  if (input.weeklyHours === null || input.weeklyHours <= 0) return null;

  const holidayHours = weeklyHolidayHours(input.weeklyHours);
  const weeklyAmount = holidayHours * input.hourlyWage;
  const weeklyWorkPay = input.weeklyHours * input.hourlyWage;

  return {
    eligible: holidayHours > 0,
    holidayHours,
    weeklyAmount,
    weeklyWorkPay,
    weeklyTotal: weeklyWorkPay + weeklyAmount,
    monthlyAmount: weeklyAmount * WEEKS_PER_MONTH,
  };
}

/* -------------------------------------------------------------------------- */
/* 퇴직금                                                                       */
/* -------------------------------------------------------------------------- */

export interface SeveranceInput {
  /** 입사일 (YYYY-MM-DD) */
  startDate: string;
  /** 퇴사일 (YYYY-MM-DD) */
  endDate: string;
  /** 최근 3개월 임금 총액 */
  recentPay: number | null;
  /** 연간 상여금 총액 */
  annualBonus: number | null;
  /** 연차수당 (연간) */
  annualLeavePay: number | null;
}

export interface SeveranceResult {
  /** 재직일수 */
  workedDays: number;
  /** 재직 연수 (소수) */
  workedYears: number;
  /** 평균임금 산정 기간 일수 */
  averageDays: number;
  /** 1일 평균임금 */
  dailyAverageWage: number;
  /** 퇴직금 */
  severance: number;
  /** 1년 미만이면 법정 퇴직금 대상이 아니다 */
  eligible: boolean;
}

export type SeveranceIssue = 'dates' | 'period' | 'pay';

function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function daysBetween(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

export function findSeveranceIssues(input: SeveranceInput): SeveranceIssue[] {
  const issues: SeveranceIssue[] = [];
  const start = parseDate(input.startDate);
  const end = parseDate(input.endDate);

  if (input.startDate && input.endDate && (!start || !end)) issues.push('dates');
  if (start && end && daysBetween(start, end) <= 0) issues.push('period');
  if (input.recentPay !== null && input.recentPay < 0) issues.push('pay');
  return issues;
}

export function calcSeverance(input: SeveranceInput): SeveranceResult | null {
  const start = parseDate(input.startDate);
  const end = parseDate(input.endDate);
  if (!start || !end) return null;
  if (input.recentPay === null || input.recentPay <= 0) return null;

  const workedDays = daysBetween(start, end);
  if (workedDays <= 0) return null;

  // 평균임금 산정 기간: 퇴사일 직전 3개월
  const periodStart = new Date(end);
  periodStart.setUTCMonth(periodStart.getUTCMonth() - 3);
  const averageDays = Math.max(1, daysBetween(periodStart, end));

  const bonus = input.annualBonus !== null && input.annualBonus > 0 ? input.annualBonus : 0;
  const leavePay =
    input.annualLeavePay !== null && input.annualLeavePay > 0 ? input.annualLeavePay : 0;

  const base = input.recentPay + (bonus * 3) / 12 + (leavePay * 3) / 12;
  const dailyAverageWage = base / averageDays;
  const severance = dailyAverageWage * 30 * (workedDays / 365);

  return {
    workedDays,
    workedYears: workedDays / 365,
    averageDays,
    dailyAverageWage,
    severance,
    eligible: workedDays >= 365,
  };
}

export { MONTHLY_WORK_HOURS_209 };
