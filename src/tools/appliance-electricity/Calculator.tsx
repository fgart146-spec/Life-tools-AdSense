'use client';

import { ApplianceElectricityCalculator } from '@/components/tool/calculators/ApplianceElectricityCalculator';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import type { ApplianceElectricityCopy } from '@/lib/tools/shared/appliance-copy';

/** 일반 가전 기준 기본값(하루 2시간, 30일)으로 시작하는 전기료 계산기 */
export function Calculator(props: CalculatorProps<ApplianceElectricityCopy>) {
  return <ApplianceElectricityCalculator {...props} defaultHours="2" defaultDays="30" />;
}
