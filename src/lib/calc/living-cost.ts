/**
 * 가구 생활비 합산.
 * 항목별 금액을 더해 총액·1인당·일평균·연간 지출과 항목 비중을 계산한다.
 */
export const LIVING_COST_KEYS = [
  'housing',
  'food',
  'utilities',
  'communication',
  'transport',
  'insurance',
  'education',
  'health',
  'leisure',
  'other',
] as const;

export type LivingCostKey = (typeof LIVING_COST_KEYS)[number];

export type LivingCostAmounts = Partial<Record<LivingCostKey, number | null>>;

export interface LivingCostInput {
  /** 가구원 수 */
  members: number | null;
  amounts: LivingCostAmounts;
  /** 월 실수령 소득 (선택) */
  income: number | null;
}

export interface LivingCostShare {
  key: LivingCostKey;
  amount: number;
  /** 총 지출 대비 비중 (%) */
  share: number;
}

export interface LivingCostResult {
  total: number;
  perPerson: number;
  perDay: number;
  annual: number;
  shares: LivingCostShare[];
  /** 소득 대비 지출 비율 (%) — 소득 입력 시 */
  incomeRatio: number | null;
  /** 월 잉여(저축 가능액) — 소득 입력 시 */
  surplus: number | null;
}

export type LivingCostIssue = 'members' | 'amount' | 'income';

export function findIssues(input: LivingCostInput): LivingCostIssue[] {
  const issues: LivingCostIssue[] = [];
  if (input.members !== null && (input.members <= 0 || input.members > 20)) {
    issues.push('members');
  }
  if (Object.values(input.amounts).some((value) => value !== null && value !== undefined && value < 0)) {
    issues.push('amount');
  }
  if (input.income !== null && input.income < 0) issues.push('income');
  return issues;
}

export function calcLivingCost(input: LivingCostInput): LivingCostResult | null {
  const entries = LIVING_COST_KEYS.map((key) => {
    const value = input.amounts[key];
    return { key, amount: value !== null && value !== undefined && value > 0 ? value : 0 };
  });

  const total = entries.reduce((sum, entry) => sum + entry.amount, 0);
  if (total <= 0) return null;

  const members = input.members !== null && input.members > 0 ? input.members : 1;

  const shares = entries
    .filter((entry) => entry.amount > 0)
    .map((entry) => ({
      key: entry.key,
      amount: entry.amount,
      share: (entry.amount / total) * 100,
    }))
    .sort((a, b) => b.amount - a.amount);

  const income = input.income !== null && input.income > 0 ? input.income : null;

  return {
    total,
    perPerson: total / members,
    perDay: total / 30,
    annual: total * 12,
    shares,
    incomeRatio: income ? (total / income) * 100 : null,
    surplus: income ? income - total : null,
  };
}
