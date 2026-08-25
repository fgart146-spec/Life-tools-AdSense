import {
  BASIC_DEDUCTION_PER_PERSON,
  CHILD_TAX_CREDIT,
  INCOME_TAX_BRACKETS,
  INSURANCE_RATES,
  LOCAL_TAX_RATE,
  PENSION_INCOME_LIMIT,
} from '@/lib/data/kr-payroll';
import { roundMoney } from '@/lib/math/decimal';

/**
 * 급여 실수령액 계산 (근사).
 *
 * 순서
 *   1) 월 급여에서 비과세액을 빼 과세 대상 보수월액을 구한다.
 *   2) 4대보험 근로자 부담분을 계산한다(국민연금은 기준소득월액 상·하한 적용).
 *   3) 연간 기준으로 근로소득공제 → 인적공제 → 보험료공제를 적용해 과세표준을 구한다.
 *   4) 기본세율로 산출세액을 구한 뒤 근로소득세액공제·자녀세액공제를 뺀다.
 *   5) 결정세액을 12로 나눠 월 소득세, 그 10%를 지방소득세로 본다.
 *
 * ⚠ 국세청 근로소득 간이세액표를 그대로 적용한 값이 아니라 공제 구조를 반영한 근사치다.
 *    회사 원천징수액·연말정산 결과와는 차이가 있을 수 있다.
 */
export interface SalaryInput {
  /** 연봉 (세전, 비과세 포함) */
  annualSalary: number | null;
  /** 월 비과세액 (식대 등) */
  nonTaxableMonthly: number | null;
  /** 공제대상 가족 수 (본인 포함) */
  dependents: number | null;
  /** 자녀세액공제 대상 자녀 수 (2026년 귀속 기준 9~20세) */
  children: number | null;
}

export interface SalaryResult {
  monthlyGross: number;
  /** 과세 대상 보수월액 */
  taxableMonthly: number;
  nationalPension: number;
  health: number;
  longTermCare: number;
  employment: number;
  incomeTax: number;
  localTax: number;
  /** 월 공제 합계 */
  totalDeduction: number;
  /** 월 실수령액 */
  netMonthly: number;
  /** 연 실수령액 */
  netAnnual: number;
  /** 공제율 (%) */
  deductionRate: number;
}

export type SalaryIssue = 'salary' | 'nonTaxable' | 'dependents' | 'children';

export function findSalaryIssues(input: SalaryInput): SalaryIssue[] {
  const issues: SalaryIssue[] = [];
  if (input.annualSalary !== null && input.annualSalary < 0) issues.push('salary');
  if (input.nonTaxableMonthly !== null && input.nonTaxableMonthly < 0) issues.push('nonTaxable');
  if (input.dependents !== null && (input.dependents < 1 || input.dependents > 20)) {
    issues.push('dependents');
  }
  if (input.children !== null && (input.children < 0 || input.children > 20)) {
    issues.push('children');
  }
  return issues;
}

/** 근로소득공제 (총급여 구간별) */
export function earnedIncomeDeduction(grossAnnual: number): number {
  if (grossAnnual <= 0) return 0;
  let deduction: number;
  if (grossAnnual <= 5_000_000) {
    deduction = grossAnnual * 0.7;
  } else if (grossAnnual <= 15_000_000) {
    deduction = 3_500_000 + (grossAnnual - 5_000_000) * 0.4;
  } else if (grossAnnual <= 45_000_000) {
    deduction = 7_500_000 + (grossAnnual - 15_000_000) * 0.15;
  } else if (grossAnnual <= 100_000_000) {
    deduction = 12_000_000 + (grossAnnual - 45_000_000) * 0.05;
  } else {
    deduction = 14_750_000 + (grossAnnual - 100_000_000) * 0.02;
  }
  // 공제 한도 2,000만원
  return Math.min(deduction, 20_000_000);
}

/** 기본세율 적용 산출세액 */
export function calcIncomeTaxByBracket(taxBase: number): number {
  if (taxBase <= 0) return 0;
  for (const bracket of INCOME_TAX_BRACKETS) {
    if (bracket.upTo === null || taxBase <= bracket.upTo) {
      return taxBase * bracket.rate - bracket.deduction;
    }
  }
  return 0;
}

/** 근로소득세액공제 (산출세액·총급여 기준 한도 적용) */
export function earnedIncomeTaxCredit(calculatedTax: number, grossAnnual: number): number {
  if (calculatedTax <= 0) return 0;

  const credit =
    calculatedTax <= 1_300_000
      ? calculatedTax * 0.55
      : 715_000 + (calculatedTax - 1_300_000) * 0.3;

  let limit: number;
  if (grossAnnual <= 33_000_000) {
    limit = 740_000;
  } else if (grossAnnual <= 70_000_000) {
    limit = Math.max(660_000, 740_000 - (grossAnnual - 33_000_000) * 0.008);
  } else if (grossAnnual <= 120_000_000) {
    limit = Math.max(500_000, 660_000 - (grossAnnual - 70_000_000) * 0.5);
  } else {
    limit = Math.max(200_000, 500_000 - (grossAnnual - 120_000_000) * 0.5);
  }

  return Math.min(credit, limit);
}

/**
 * 자녀세액공제.
 * 2026년 귀속 기준: 1명 25만원, 2명 55만원, 3명부터 1명당 40만원 추가.
 * 금액은 kr-payroll.ts 의 CHILD_TAX_CREDIT 에서 관리한다.
 */
export function childTaxCredit(children: number): number {
  if (children <= 0) return 0;
  if (children === 1) return CHILD_TAX_CREDIT.first;
  if (children === 2) return CHILD_TAX_CREDIT.twoChildren;
  return CHILD_TAX_CREDIT.twoChildren + (children - 2) * CHILD_TAX_CREDIT.perAdditional;
}

export type InsuranceRateSet = typeof INSURANCE_RATES;

export function calcSalary(
  input: SalaryInput,
  rates: InsuranceRateSet = INSURANCE_RATES,
): SalaryResult | null {
  if (input.annualSalary === null || input.annualSalary <= 0) return null;

  const monthlyGross = input.annualSalary / 12;
  const nonTaxable =
    input.nonTaxableMonthly !== null && input.nonTaxableMonthly > 0
      ? Math.min(input.nonTaxableMonthly, monthlyGross)
      : 0;
  const taxableMonthly = Math.max(0, monthlyGross - nonTaxable);

  // 국민연금: 기준소득월액 상·하한 적용
  const pensionBase = Math.min(
    Math.max(taxableMonthly, PENSION_INCOME_LIMIT.min),
    PENSION_INCOME_LIMIT.max,
  );
  const nationalPension = roundMoney(pensionBase * rates.nationalPension);
  const health = roundMoney(taxableMonthly * rates.health);
  const longTermCare = roundMoney(health * rates.longTermCare);
  const employment = roundMoney(taxableMonthly * rates.employment);

  // 소득세 (연간 기준 근사)
  const grossAnnualTaxable = taxableMonthly * 12;
  const incomeDeduction = earnedIncomeDeduction(grossAnnualTaxable);
  const dependents = input.dependents !== null && input.dependents >= 1 ? input.dependents : 1;
  const personalDeduction = BASIC_DEDUCTION_PER_PERSON * dependents;
  const insuranceDeduction = (nationalPension + health + longTermCare + employment) * 12;

  const taxBase = Math.max(
    0,
    grossAnnualTaxable - incomeDeduction - personalDeduction - insuranceDeduction,
  );
  const calculatedTax = calcIncomeTaxByBracket(taxBase);
  const credit = earnedIncomeTaxCredit(calculatedTax, grossAnnualTaxable);
  const children = input.children !== null && input.children > 0 ? input.children : 0;
  const finalAnnualTax = Math.max(0, calculatedTax - credit - childTaxCredit(children));

  const incomeTax = roundMoney(finalAnnualTax / 12);
  const localTax = roundMoney(incomeTax * LOCAL_TAX_RATE);

  const totalDeduction =
    nationalPension + health + longTermCare + employment + incomeTax + localTax;
  const netMonthly = monthlyGross - totalDeduction;

  return {
    monthlyGross,
    taxableMonthly,
    nationalPension,
    health,
    longTermCare,
    employment,
    incomeTax,
    localTax,
    totalDeduction,
    netMonthly,
    netAnnual: netMonthly * 12,
    deductionRate: monthlyGross > 0 ? (totalDeduction / monthlyGross) * 100 : 0,
  };
}
