import type { FoodRule } from '@/lib/calc/food-list';

/**
 * 명절·가족모임 한 상차림 기준 1인 준비량 (일반 가정 기준).
 * 전·나물·갈비를 함께 차리는 전통적인 구성을 가정한다.
 */
export const HOLIDAY_RULES: readonly FoodRule[] = [
  { key: 'galbi', perPerson: 250, unit: 'g', step: 50 },
  { key: 'jeonFlour', perPerson: 100, unit: 'g', step: 50 },
  { key: 'egg', perPerson: 2, unit: 'ea', step: 1 },
  { key: 'fish', perPerson: 100, unit: 'g', step: 50 },
  { key: 'namul', perPerson: 200, unit: 'g', step: 50 },
  { key: 'japchae', perPerson: 60, unit: 'g', step: 10 },
  { key: 'soupMeat', perPerson: 80, unit: 'g', step: 50 },
  { key: 'tteok', perPerson: 150, unit: 'g', step: 50 },
  { key: 'fruit', perPerson: 250, unit: 'g', step: 100 },
  { key: 'oil', perPerson: 60, unit: 'ml', step: 50 },
];
