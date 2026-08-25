'use client';

import { SalaryCalculator } from '@/components/tool/calculators/SalaryCalculator';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import type { SalaryToolCopy } from '@/lib/tools/shared/salary-copy';

/** 연봉을 입력받는 실수령액 계산기 */
export function Calculator(props: CalculatorProps<SalaryToolCopy>) {
  return <SalaryCalculator {...props} mode="annual" />;
}
