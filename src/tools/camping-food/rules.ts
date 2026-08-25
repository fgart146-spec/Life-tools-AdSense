import type { FoodRule } from '@/lib/calc/food-list';

/**
 * 캠핑 1박 기준 1인 준비량 (일반 가정 기준).
 * 캠핑은 고기 위주 식사가 많아 평소보다 넉넉히 잡는다.
 */
export const CAMPING_RULES: readonly FoodRule[] = [
  { key: 'meat', perPerson: 350, unit: 'g', step: 50 },
  { key: 'rice', perPerson: 180, unit: 'g', step: 10 },
  { key: 'ramen', perPerson: 0.7, unit: 'ea', step: 1 },
  { key: 'water', perPerson: 2000, unit: 'ml', step: 500 },
  { key: 'drink', perPerson: 700, unit: 'ml', step: 100 },
  { key: 'vegetable', perPerson: 150, unit: 'g', step: 50 },
  { key: 'egg', perPerson: 2, unit: 'ea', step: 1 },
  { key: 'kimchi', perPerson: 100, unit: 'g', step: 50 },
  { key: 'snack', perPerson: 100, unit: 'g', step: 50 },
  { key: 'charcoal', perPerson: 0.4, unit: 'kg', step: 0.5 },
];
