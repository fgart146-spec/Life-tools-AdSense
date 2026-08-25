/**
 * 인원수 기반 '재료 목록' 계산 공통 로직.
 * 캠핑·명절·김장처럼 여러 재료를 한 번에 계산하는 도구가 공유한다.
 */
export type FoodUnit = 'g' | 'kg' | 'ml' | 'l' | 'ea' | 'cup';

export interface FoodRule {
  /** 재료 식별자 (copy에서 라벨을 찾는다) */
  key: string;
  /** 1인 기준량 */
  perPerson: number;
  unit: FoodUnit;
  /** 반올림 단위 (예: 0.5개 단위로 올림). 기본 소수 1자리 */
  step?: number;
  /** 인원과 무관한 고정량 (그룹 단위 재료) */
  fixed?: number;
}

export interface FoodItem {
  key: string;
  amount: number;
  unit: FoodUnit;
}

/** step 단위로 올림 (재료는 모자라는 것보다 조금 남는 편이 낫다) */
function roundUpTo(value: number, step: number): number {
  if (step <= 0) return value;
  return Math.ceil(value / step) * step;
}

/**
 * @param rules 재료 규칙
 * @param persons 환산 인원
 * @param multiplier 끼니 수·박수 등 배수 (기본 1)
 */
export function calcFoodList(
  rules: readonly FoodRule[],
  persons: number,
  multiplier = 1,
): FoodItem[] {
  if (persons <= 0 || multiplier <= 0) return [];

  return rules.map((rule) => {
    const base = rule.perPerson * persons * multiplier + (rule.fixed ?? 0) * multiplier;
    const step = rule.step ?? 0.1;
    return {
      key: rule.key,
      amount: roundUpTo(base, step),
      unit: rule.unit,
    };
  });
}

/** g 단위가 1,000을 넘으면 kg으로 보기 좋게 바꾼다 */
export function prettyAmount(item: FoodItem): { amount: number; unit: FoodUnit } {
  if (item.unit === 'g' && item.amount >= 1000) {
    return { amount: item.amount / 1000, unit: 'kg' };
  }
  if (item.unit === 'ml' && item.amount >= 1000) {
    return { amount: item.amount / 1000, unit: 'l' };
  }
  return { amount: item.amount, unit: item.unit };
}
