'use client';

import { UnitPriceCalculator } from '@/components/tool/calculators/UnitPriceCalculator';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import type { UnitPriceToolCopy } from '@/lib/tools/shared/unit-price-copy';

/** 무게(g/kg) 기준 단가 계산기 */
export function Calculator(props: CalculatorProps<UnitPriceToolCopy>) {
  return <UnitPriceCalculator {...props} variant="mass" />;
}
