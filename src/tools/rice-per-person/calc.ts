import { adjustedPersons, type PeopleInput } from '@/lib/calc/portion';

/**
 * 인원수에 맞는 쌀·밥 양 계산.
 *
 * 기준 (일반 가정 기준, 공식 표준 아님)
 * - 밥 1공기 ≈ 210g, 이때 필요한 백미 ≈ 90g
 * - 밥솥 계량컵(180ml) 1컵 ≈ 쌀 150g
 * - 백미 밥물: 쌀 무게의 약 1.2배(ml)
 */
export const RICE_PER_BOWL_G = 90;
export const COOKED_RICE_PER_BOWL_G = 210;
export const RICE_CUP_G = 150;
export const WATER_RATIO = 1.2;

export interface RiceInput extends PeopleInput {
  /** 끼니 수 */
  meals: number | null;
  /** 1인 1끼 공기 수 */
  bowlsPerMeal: number | null;
}

export interface RiceResult {
  persons: number;
  /** 총 공기 수 */
  totalBowls: number;
  /** 필요한 쌀 (g) */
  riceGram: number;
  riceKg: number;
  /** 밥솥 계량컵 기준 컵 수 */
  riceCups: number;
  /** 밥물 (ml) */
  waterMl: number;
  /** 완성된 밥 무게 (g) */
  cookedGram: number;
}

export type RiceIssue = 'people' | 'meals' | 'bowls';

export function findIssues(input: RiceInput): RiceIssue[] {
  const issues: RiceIssue[] = [];
  const adults = input.adults ?? 0;
  const children = input.children ?? 0;
  if (adults < 0 || children < 0 || adults + children > 100) issues.push('people');
  if (input.meals !== null && (input.meals <= 0 || input.meals > 30)) issues.push('meals');
  if (input.bowlsPerMeal !== null && (input.bowlsPerMeal <= 0 || input.bowlsPerMeal > 5)) {
    issues.push('bowls');
  }
  return issues;
}

export function calcRice(input: RiceInput): RiceResult | null {
  const persons = adjustedPersons(input);
  if (persons <= 0) return null;

  const meals = input.meals !== null && input.meals > 0 ? input.meals : 1;
  const bowls = input.bowlsPerMeal !== null && input.bowlsPerMeal > 0 ? input.bowlsPerMeal : 1;

  const totalBowls = persons * meals * bowls;
  const riceGram = totalBowls * RICE_PER_BOWL_G;

  return {
    persons,
    totalBowls,
    riceGram,
    riceKg: riceGram / 1000,
    riceCups: riceGram / RICE_CUP_G,
    waterMl: riceGram * WATER_RATIO,
    cookedGram: totalBowls * COOKED_RICE_PER_BOWL_G,
  };
}
