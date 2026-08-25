/**
 * 한국 급여 관련 기준값 (4대보험 요율 · 소득세 계산 기준).
 *
 * ⚠ 제도 종속 데이터
 * - 요율과 공제 기준은 매년 바뀐다. 반드시 basisDate와 출처를 화면에 표시한다.
 * - 관리자 화면(/admin/basis)에서 수정하면 재생성 시 계산기에 반영된다.
 * - 소득세는 국세청 근로소득 간이세액표를 그대로 사용하지 않고,
 *   공제 구조를 반영한 '근사 계산'이다. 실제 원천징수액과는 차이가 있을 수 있으며
 *   최종 세액은 연말정산으로 정산된다.
 *
 * 최종 확인: 2026-08-25
 * - 국민연금 보험료율 9%→9.5% (2026년, 연금개혁에 따라 2033년 13%까지 매년 0.5%p 인상)
 * - 건강보험료율 7.09%→7.19%, 장기요양보험료율 0.9182%→0.9448% (건강보험료 대비 13.14%)
 * - 국민연금 기준소득월액 상한 659만원 / 하한 41만원 (2026-07-01 ~ 2027-06-30)
 * - 최저임금 시간급 10,320원 (2026년)
 * - 자녀세액공제 인상 및 대상 연령 상향(2026년 귀속: 9세 이상 20세 이하)
 */

export const PAYROLL_BASIS = {
  /** 기준값을 최종 확인한 날짜 */
  basisDate: '2026-08-25',
  /** 4대보험 요율이 적용된 연도 */
  rateYear: 2026,
  /** 국민연금 기준소득월액 적용 기간 */
  pensionLimitPeriod: '2026-07-01 ~ 2027-06-30',
  sourceLabel:
    '국민연금공단·국민건강보험공단 고시 요율(2026), 보건복지부 보도자료(건강보험료율 7.19%·장기요양보험료율 0.9448%), 소득세법 기본세율',
} as const;

/** 근로자 부담분 4대보험 요율 (2026년) */
export const INSURANCE_RATES = {
  /** 국민연금 (총 9.5% 중 근로자 4.75%) */
  nationalPension: 0.0475,
  /** 건강보험 (총 7.19% 중 근로자 3.595%) */
  health: 0.03595,
  /** 장기요양보험 = 건강보험료 × 13.14% */
  longTermCare: 0.1314,
  /** 고용보험 실업급여 (총 1.8% 중 근로자 0.9%) */
  employment: 0.009,
} as const;

/** 국민연금 기준소득월액 상·하한 (2026-07-01 ~ 2027-06-30) */
export const PENSION_INCOME_LIMIT = {
  min: 410_000,
  max: 6_590_000,
} as const;

/** 소득세 기본세율 (과세표준 구간, 누진공제 방식) — 2023년 귀속분부터 유지 */
export interface TaxBracket {
  /** 과세표준 상한 (null이면 무제한) */
  upTo: number | null;
  rate: number;
  /** 누진공제액 */
  deduction: number;
}

export const INCOME_TAX_BRACKETS: readonly TaxBracket[] = [
  { upTo: 14_000_000, rate: 0.06, deduction: 0 },
  { upTo: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { upTo: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { upTo: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { upTo: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { upTo: 500_000_000, rate: 0.4, deduction: 25_940_000 },
  { upTo: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
  { upTo: null, rate: 0.45, deduction: 65_940_000 },
];

/** 기본공제 (본인·부양가족 1인당) */
export const BASIC_DEDUCTION_PER_PERSON = 1_500_000;

/** 지방소득세율 (소득세의 10%) */
export const LOCAL_TAX_RATE = 0.1;

/** 식대 등 월 비과세 한도 (참고용 기본값) */
export const DEFAULT_NON_TAXABLE_MONTHLY = 200_000;

/**
 * 자녀세액공제 (2026년 귀속 기준)
 * - 1명 25만원 / 2명 55만원 / 3명 이상 55만원 + (초과 인원 × 40만원)
 * - 대상 연령은 매년 1세씩 올라간다 (2026년: 9세 이상, 2027년: 10세 이상 …)
 */
export const CHILD_TAX_CREDIT = {
  first: 250_000,
  twoChildren: 550_000,
  perAdditional: 400_000,
  /** 공제 대상 최소 연령 (2026년 귀속) */
  minAge: 9,
  maxAge: 20,
} as const;

/** 최저임금 (시간급) */
export const MINIMUM_WAGE = {
  hourly: 10_320,
  basisDate: '2026-01-01',
  sourceLabel: '고용노동부 2026년 적용 최저임금 고시 (시간급 10,320원)',
} as const;

/** 주 소정근로시간 기준 (주휴수당 포함 월 환산 시간) */
export const MONTHLY_WORK_HOURS_209 = 209;
