import { adjustedPersons, type Appetite, type PeopleInput } from '@/lib/calc/portion';

/**
 * 인원수에 맞는 고기 준비량.
 *
 * 1인 기준량은 일반 가정의 통상적인 준비량이다(공식 표준 아님).
 * - 구이(삼겹살·목살): 1인 200~250g. 밥·반찬을 곁들이면 200g, 고기 위주면 250~300g.
 * - 수육/보쌈: 1인 200g
 * - 소고기 구이: 1인 200g
 * - 샤브샤브: 1인 150g (채소·칼국수 등을 함께 먹기 때문)
 * - 스테이크: 1인 200g
 */
export type MeatType = 'pork-belly' | 'pork-neck' | 'beef-grill' | 'shabu' | 'boiled' | 'steak';

export const MEAT_BASE_GRAM: Record<MeatType, number> = {
  'pork-belly': 220,
  'pork-neck': 220,
  'beef-grill': 200,
  shabu: 150,
  boiled: 200,
  steak: 200,
};

export interface MeatInput extends PeopleInput {
  meatType: MeatType;
  /** 1인 기준량을 직접 지정 (선택) */
  customGram: number | null;
  /** 100g당 가격 (선택) — 예상 비용 계산용 */
  pricePer100g: number | null;
}

export interface MeatResult {
  /** 성인 환산 인원 (식사량 반영) */
  persons: number;
  /** 1인 기준량 (g) */
  perPersonGram: number;
  /** 총 필요량 (g) */
  totalGram: number;
  /** 총 필요량 (kg) */
  totalKg: number;
  /** 예상 비용 (가격 입력 시) */
  estimatedCost: number | null;
  /** 1인당 예상 비용 */
  costPerPerson: number | null;
}

export type MeatIssue = 'people' | 'customGram' | 'price';

export function findIssues(input: MeatInput): MeatIssue[] {
  const issues: MeatIssue[] = [];
  const adults = input.adults ?? 0;
  const children = input.children ?? 0;
  if (adults < 0 || children < 0 || adults + children > 100) issues.push('people');
  if (input.customGram !== null && (input.customGram <= 0 || input.customGram > 1000)) {
    issues.push('customGram');
  }
  if (input.pricePer100g !== null && input.pricePer100g < 0) issues.push('price');
  return issues;
}

export function calcMeat(input: MeatInput): MeatResult | null {
  const persons = adjustedPersons(input);
  if (persons <= 0) return null;

  const perPersonGram =
    input.customGram !== null && input.customGram > 0
      ? input.customGram
      : MEAT_BASE_GRAM[input.meatType];

  const totalGram = persons * perPersonGram;
  const price = input.pricePer100g !== null && input.pricePer100g > 0 ? input.pricePer100g : null;
  const estimatedCost = price === null ? null : (totalGram / 100) * price;

  return {
    persons,
    perPersonGram,
    totalGram,
    totalKg: totalGram / 1000,
    estimatedCost,
    costPerPerson: estimatedCost === null ? null : estimatedCost / persons,
  };
}

/** 식사량 선택지 (UI 순서 고정용) */
export const APPETITE_OPTIONS: Appetite[] = ['light', 'normal', 'heavy'];
