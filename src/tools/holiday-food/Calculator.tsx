'use client';

import { FoodListCalculator } from '@/components/tool/calculators/FoodListCalculator';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import type { FoodListCopy } from '@/lib/tools/shared/food-list-copy';
import { HOLIDAY_RULES } from './rules';

export function Calculator(props: CalculatorProps<FoodListCopy>) {
  return (
    <FoodListCalculator
      {...props}
      rules={HOLIDAY_RULES}
      primaryKey="galbi"
      useMultiplier={false}
      defaultAdults="6"
    />
  );
}
