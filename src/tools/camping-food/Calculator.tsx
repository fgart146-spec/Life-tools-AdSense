'use client';

import { FoodListCalculator } from '@/components/tool/calculators/FoodListCalculator';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import type { FoodListCopy } from '@/lib/tools/shared/food-list-copy';
import { CAMPING_RULES } from './rules';

export function Calculator(props: CalculatorProps<FoodListCopy>) {
  return (
    <FoodListCalculator
      {...props}
      rules={CAMPING_RULES}
      primaryKey="meat"
      useMultiplier
      defaultMultiplier="1"
    />
  );
}
