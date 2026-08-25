/**
 * 김장 계산 (배추 수량 · 양념 재료).
 *
 * 기준 (일반 가정 기준, 공식 표준 아님)
 * - 1인 하루 김치 섭취량: 약 60g
 * - 김치 = 절임배추 × 1.3 (양념 무게가 더해진다)
 * - 절임 수율: 생배추 100kg → 절임배추 약 70kg (수분이 빠진다)
 * - 배추 1포기: 약 3kg
 * - 절임용 천일염: 생배추 무게의 약 10%
 */
export const KIMCHI_PER_PERSON_DAY_G = 60;
export const KIMCHI_FROM_SALTED_RATIO = 1.3;
export const SALTING_YIELD = 0.7;
export const CABBAGE_WEIGHT_KG = 3;
export const SALT_RATIO = 0.1;

export interface KimjangCabbageInput {
  members: number | null;
  /** 먹을 기간 (개월) */
  months: number | null;
  /** 1인 하루 김치 섭취량 (g) */
  gramPerDay: number | null;
  /** 배추 1포기 무게 (kg) */
  cabbageWeightKg: number | null;
}

export interface KimjangCabbageResult {
  /** 필요한 김치 총량 (kg) */
  totalKimchiKg: number;
  /** 필요한 절임배추 (kg) */
  saltedCabbageKg: number;
  /** 필요한 생배추 (kg) */
  freshCabbageKg: number;
  /** 배추 포기 수 */
  cabbageCount: number;
  /** 절임용 소금 (kg) */
  saltKg: number;
  /** 절임물 (L) */
  brineL: number;
}

export type KimjangCabbageIssue = 'members' | 'months' | 'gram' | 'weight';

export function findCabbageIssues(input: KimjangCabbageInput): KimjangCabbageIssue[] {
  const issues: KimjangCabbageIssue[] = [];
  if (input.members !== null && (input.members <= 0 || input.members > 30)) issues.push('members');
  if (input.months !== null && (input.months <= 0 || input.months > 24)) issues.push('months');
  if (input.gramPerDay !== null && (input.gramPerDay <= 0 || input.gramPerDay > 500)) {
    issues.push('gram');
  }
  if (
    input.cabbageWeightKg !== null &&
    (input.cabbageWeightKg <= 0 || input.cabbageWeightKg > 10)
  ) {
    issues.push('weight');
  }
  return issues;
}

export function calcKimjangCabbage(input: KimjangCabbageInput): KimjangCabbageResult | null {
  const members = input.members !== null && input.members > 0 ? input.members : null;
  const months = input.months !== null && input.months > 0 ? input.months : null;
  if (members === null || months === null) return null;

  const gramPerDay =
    input.gramPerDay !== null && input.gramPerDay > 0 ? input.gramPerDay : KIMCHI_PER_PERSON_DAY_G;
  const cabbageWeight =
    input.cabbageWeightKg !== null && input.cabbageWeightKg > 0
      ? input.cabbageWeightKg
      : CABBAGE_WEIGHT_KG;

  const days = months * 30;
  const totalKimchiKg = (members * days * gramPerDay) / 1000;
  const saltedCabbageKg = totalKimchiKg / KIMCHI_FROM_SALTED_RATIO;
  const freshCabbageKg = saltedCabbageKg / SALTING_YIELD;

  return {
    totalKimchiKg,
    saltedCabbageKg,
    freshCabbageKg,
    cabbageCount: Math.ceil(freshCabbageKg / cabbageWeight),
    saltKg: freshCabbageKg * SALT_RATIO,
    brineL: freshCabbageKg,
  };
}

/**
 * 김장 양념 재료 (절임배추 10kg 기준).
 * 집안마다 비율이 다르므로 참고 기준으로 표시한다.
 */
export interface SauceRule {
  key: string;
  /** 절임배추 10kg당 사용량 */
  per10kg: number;
  unit: 'g' | 'ml' | 'ea';
}

export const KIMJANG_SAUCE_RULES: readonly SauceRule[] = [
  { key: 'chili', per10kg: 900, unit: 'g' },
  { key: 'radish', per10kg: 2000, unit: 'g' },
  { key: 'garlic', per10kg: 300, unit: 'g' },
  { key: 'ginger', per10kg: 60, unit: 'g' },
  { key: 'saeujeot', per10kg: 300, unit: 'g' },
  { key: 'fishSauce', per10kg: 400, unit: 'ml' },
  { key: 'glutinousFlour', per10kg: 100, unit: 'g' },
  { key: 'sugar', per10kg: 100, unit: 'g' },
  { key: 'greenOnion', per10kg: 400, unit: 'g' },
  { key: 'mustardLeaf', per10kg: 300, unit: 'g' },
  { key: 'waterParsley', per10kg: 200, unit: 'g' },
];

export interface KimjangSauceInput {
  /** 절임배추 무게 (kg) */
  saltedCabbageKg: number | null;
  /** 포기 수로 입력하는 경우 (생배추 기준) */
  cabbageCount: number | null;
  /** 배추 1포기 무게 (kg) */
  cabbageWeightKg: number | null;
  /** 양념 세기 (0.8 ~ 1.2) */
  strength: number;
}

export interface KimjangSauceResult {
  saltedCabbageKg: number;
  items: { key: string; amount: number; unit: 'g' | 'ml' | 'ea' }[];
}

export function calcKimjangSauce(input: KimjangSauceInput): KimjangSauceResult | null {
  let saltedKg: number | null = null;

  if (input.saltedCabbageKg !== null && input.saltedCabbageKg > 0) {
    saltedKg = input.saltedCabbageKg;
  } else if (input.cabbageCount !== null && input.cabbageCount > 0) {
    const weight =
      input.cabbageWeightKg !== null && input.cabbageWeightKg > 0
        ? input.cabbageWeightKg
        : CABBAGE_WEIGHT_KG;
    saltedKg = input.cabbageCount * weight * SALTING_YIELD;
  }

  if (saltedKg === null || saltedKg <= 0) return null;

  const factor = (saltedKg / 10) * input.strength;

  return {
    saltedCabbageKg: saltedKg,
    items: KIMJANG_SAUCE_RULES.map((rule) => ({
      key: rule.key,
      amount: rule.per10kg * factor,
      unit: rule.unit,
    })),
  };
}
