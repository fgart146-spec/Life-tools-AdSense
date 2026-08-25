/**
 * 인원수 기반 음식량 계산 공통 로직.
 *
 * 기준값은 공식 표준이 아니라 일반 가정에서 통용되는 준비량이다.
 * 각 도구의 '계산 기준' 섹션에 근거를 명시하고, 사용자가 조정할 수 있게 한다.
 */

export type Appetite = 'light' | 'normal' | 'heavy';

/** 식사량 계수 */
export const APPETITE_FACTOR: Record<Appetite, number> = {
  light: 0.8,
  normal: 1,
  heavy: 1.25,
};

/** 어린이 1명을 성인 몇 명분으로 볼지 */
export const CHILD_RATIO = 0.5;

export interface PeopleInput {
  adults: number | null;
  children: number | null;
  appetite: Appetite;
}

/** 성인 환산 인원 (어린이는 0.5명분) */
export function personEquivalent(input: PeopleInput): number {
  const adults = input.adults !== null && input.adults > 0 ? input.adults : 0;
  const children = input.children !== null && input.children > 0 ? input.children : 0;
  return adults + children * CHILD_RATIO;
}

/** 식사량을 반영한 환산 인원 */
export function adjustedPersons(input: PeopleInput): number {
  return personEquivalent(input) * APPETITE_FACTOR[input.appetite];
}

export type PeopleIssue = 'people' | 'amount';

export function findPeopleIssues(input: PeopleInput): PeopleIssue[] {
  const issues: PeopleIssue[] = [];
  const adults = input.adults ?? 0;
  const children = input.children ?? 0;
  if (adults < 0 || children < 0 || adults + children > 100) issues.push('people');
  return issues;
}

/** g을 보기 좋은 문자열 단위로 나눌 때 쓰는 값 */
export function toKilograms(grams: number): number {
  return grams / 1000;
}
