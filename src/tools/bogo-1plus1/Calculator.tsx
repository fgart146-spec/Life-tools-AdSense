'use client';

import { BogoCalculator } from '@/components/tool/calculators/BogoCalculator';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import type { BogoToolCopy } from '@/lib/tools/shared/bogo-copy';

/** 1+1 기본값으로 시작하는 증정 행사 계산기 */
export function Calculator(props: CalculatorProps<BogoToolCopy>) {
  return <BogoCalculator {...props} defaultBuy={1} defaultFree={1} />;
}
