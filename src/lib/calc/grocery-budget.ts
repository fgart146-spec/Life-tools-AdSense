/**
 * 월 식비(장보기 + 외식 + 배달) 예산 계산.
 * 주 단위 습관을 월 단위로 환산한다. 한 달 = 52주 ÷ 12개월 = 약 4.333주.
 */
export const WEEKS_PER_MONTH = 52 / 12;

export interface GroceryBudgetInput {
  members: number | null;
  /** 주 장보기 횟수 */
  groceryTimesPerWeek: number | null;
  /** 장보기 1회 평균 금액 */
  groceryPerVisit: number | null;
  /** 주 외식 횟수 */
  diningTimesPerWeek: number | null;
  /** 외식 1회 평균 금액 (가구 전체) */
  diningPerVisit: number | null;
  /** 주 배달 주문 횟수 */
  deliveryTimesPerWeek: number | null;
  /** 배달 1회 평균 금액 */
  deliveryPerOrder: number | null;
  /** 목표 월 식비 (선택) */
  targetBudget: number | null;
}

export interface GroceryBudgetResult {
  groceryMonthly: number;
  diningMonthly: number;
  deliveryMonthly: number;
  total: number;
  perPerson: number;
  perDay: number;
  perPersonPerDay: number;
  /** 목표 예산과의 차이 (양수면 초과) */
  targetDiff: number | null;
  /** 외식·배달이 식비에서 차지하는 비중(%) */
  eatingOutShare: number;
}

export type GroceryBudgetIssue = 'members' | 'times' | 'amount' | 'target';

function positive(value: number | null): number {
  return value !== null && value > 0 ? value : 0;
}

export function findIssues(input: GroceryBudgetInput): GroceryBudgetIssue[] {
  const issues: GroceryBudgetIssue[] = [];
  if (input.members !== null && (input.members <= 0 || input.members > 20)) {
    issues.push('members');
  }
  const times = [
    input.groceryTimesPerWeek,
    input.diningTimesPerWeek,
    input.deliveryTimesPerWeek,
  ];
  if (times.some((value) => value !== null && (value < 0 || value > 21))) issues.push('times');

  const amounts = [input.groceryPerVisit, input.diningPerVisit, input.deliveryPerOrder];
  if (amounts.some((value) => value !== null && value < 0)) issues.push('amount');

  if (input.targetBudget !== null && input.targetBudget < 0) issues.push('target');
  return issues;
}

export function calcGroceryBudget(input: GroceryBudgetInput): GroceryBudgetResult | null {
  const groceryMonthly =
    positive(input.groceryTimesPerWeek) * positive(input.groceryPerVisit) * WEEKS_PER_MONTH;
  const diningMonthly =
    positive(input.diningTimesPerWeek) * positive(input.diningPerVisit) * WEEKS_PER_MONTH;
  const deliveryMonthly =
    positive(input.deliveryTimesPerWeek) * positive(input.deliveryPerOrder) * WEEKS_PER_MONTH;

  const total = groceryMonthly + diningMonthly + deliveryMonthly;
  if (total <= 0) return null;

  const members = input.members !== null && input.members > 0 ? input.members : 1;
  const target = input.targetBudget !== null && input.targetBudget > 0 ? input.targetBudget : null;

  return {
    groceryMonthly,
    diningMonthly,
    deliveryMonthly,
    total,
    perPerson: total / members,
    perDay: total / 30,
    perPersonPerDay: total / members / 30,
    targetDiff: target === null ? null : total - target,
    eatingOutShare: ((diningMonthly + deliveryMonthly) / total) * 100,
  };
}
