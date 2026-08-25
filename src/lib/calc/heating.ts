/**
 * 난방비 계산.
 *
 * 난방 방식마다 검침 단위와 단가 체계가 다르므로, 단가를 사용자가 직접 입력할 수 있게 한다.
 * (지역·공급사·시기에 따라 단가가 다르기 때문에 고정값을 강요하지 않는다.)
 *   - 도시가스: 사용량(㎥) × 열량(MJ/㎥) × 단가(원/MJ)
 *   - 지역난방: 사용량(Mcal) × 단가(원/Mcal)
 *   - 전기난방: 사용량(kWh) × 단가(원/kWh)
 */
export type HeatingType = 'gas' | 'district' | 'electric';

export interface HeatingInput {
  type: HeatingType;
  /** 검침 사용량 (방식별 단위) */
  usage: number | null;
  /** 단가 (방식별 단위당 원) */
  unitRate: number | null;
  /** 도시가스 열량계수 (MJ/㎥) */
  heatValue: number | null;
  /** 기본요금 (원) */
  baseCharge: number | null;
  /** 입력 단가에 부가세가 이미 포함돼 있는지 */
  vatIncluded: boolean;
  /** 사용 일수 (하루당 계산용) */
  days: number | null;
}

export interface HeatingResult {
  /** 사용량 요금 */
  energyCharge: number;
  baseCharge: number;
  vat: number;
  total: number;
  perDay: number;
  /** 환산된 열량 (도시가스만, MJ) */
  totalMj: number | null;
}

export type HeatingIssue = 'usage' | 'unitRate' | 'heatValue' | 'baseCharge' | 'days';

export const HEATING_DEFAULTS: Record<
  HeatingType,
  { unitRate: number; heatValue: number | null; baseCharge: number }
> = {
  // 서울 주택용(취사·난방) 소매요금 근사치. 지역·시기별로 다르므로 고지서 값으로 수정해 사용한다.
  gas: { unitRate: 22.4, heatValue: 43.1, baseCharge: 1250 },
  // 한국지역난방공사 주택용 단일요금 근사치
  district: { unitRate: 105, heatValue: null, baseCharge: 0 },
  // 전기난방: 누진 구간에 따라 크게 달라지므로 평균 단가를 가정한다
  electric: { unitRate: 200, heatValue: null, baseCharge: 0 },
};

export function findIssues(input: HeatingInput): HeatingIssue[] {
  const issues: HeatingIssue[] = [];
  if (input.usage !== null && input.usage < 0) issues.push('usage');
  if (input.unitRate !== null && input.unitRate < 0) issues.push('unitRate');
  if (input.type === 'gas' && input.heatValue !== null && input.heatValue <= 0) {
    issues.push('heatValue');
  }
  if (input.baseCharge !== null && input.baseCharge < 0) issues.push('baseCharge');
  if (input.days !== null && (input.days <= 0 || input.days > 31)) issues.push('days');
  return issues;
}

export function calcHeating(input: HeatingInput): HeatingResult | null {
  if (input.usage === null || input.unitRate === null) return null;
  if (input.usage < 0 || input.unitRate < 0) return null;

  let energyCharge: number;
  let totalMj: number | null = null;

  if (input.type === 'gas') {
    const heatValue = input.heatValue ?? HEATING_DEFAULTS.gas.heatValue ?? 43.1;
    if (heatValue <= 0) return null;
    totalMj = input.usage * heatValue;
    energyCharge = totalMj * input.unitRate;
  } else {
    energyCharge = input.usage * input.unitRate;
  }

  const baseCharge = input.baseCharge !== null && input.baseCharge > 0 ? input.baseCharge : 0;
  const beforeVat = energyCharge + baseCharge;
  const vat = input.vatIncluded ? 0 : beforeVat * 0.1;
  const total = beforeVat + vat;
  const days = input.days !== null && input.days > 0 ? input.days : 30;

  return {
    energyCharge,
    baseCharge,
    vat,
    total,
    perDay: total / days,
    totalMj,
  };
}
