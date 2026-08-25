import {
  isSummerMonth,
  isWinterMonth,
  tariffOf,
  type ElectricityContractType,
  type ElectricityTariff,
  type ProgressiveTier,
} from '@/lib/data/kr-electricity';

/**
 * 주택용 전기요금 계산 (누진제).
 *
 * 계산 순서 (한국전력 요금 산정 방식):
 *   1) 기본요금: 사용량 구간에 해당하는 정액
 *   2) 전력량요금: 누진 구간별 사용량 × 단가의 합
 *   3) 기후환경요금 = 사용량 × 단가
 *   4) 연료비조정요금 = 사용량 × 단가
 *   5) 전기요금계 = 1+2+3+4
 *   6) 부가가치세 = 전기요금계 × 10% (원 단위 반올림)
 *   7) 전력산업기반기금 = 전기요금계 × 3.7% (10원 미만 절사)
 *   8) 청구금액 = 전기요금계 + 부가세 + 기금 (10원 미만 절사)
 */
export interface ElectricityInput {
  /** 월 사용량 (kWh) */
  usageKwh: number;
  contract: ElectricityContractType;
  /** 1~12. 7·8월은 누진 구간이 완화된다 */
  month: number;
}

/**
 * 요율 주입용 타입.
 * 관리자가 수정한 기준값을 정적 생성 시점에 내려받아 사용할 수 있게 한다.
 * 넘기지 않으면 코드 기본값(kr-electricity.ts)을 쓴다.
 */
export interface ElectricityTariffSet {
  low: ElectricityTariff;
  high: ElectricityTariff;
}

function resolveTariff(
  contract: ElectricityContractType,
  tariffs?: ElectricityTariffSet,
): ElectricityTariff {
  if (!tariffs) return tariffOf(contract);
  return contract === 'high' ? tariffs.high : tariffs.low;
}

export interface TierUsage {
  /** 구간 표시용 라벨 근거: 시작/끝 사용량 */
  from: number;
  to: number | null;
  usage: number;
  rate: number;
  amount: number;
}

export interface ElectricityResult {
  usageKwh: number;
  isSummer: boolean;
  /** 동계(12~2월) 여부 — 슈퍼유저 구간이 적용된다 */
  isWinter: boolean;
  baseCharge: number;
  energyCharge: number;
  tierBreakdown: TierUsage[];
  climateCharge: number;
  fuelAdjustCharge: number;
  /** 부가세·기금 전 전기요금계 */
  subtotal: number;
  vat: number;
  powerFund: number;
  /** 최종 청구금액 (10원 미만 절사) */
  total: number;
  /** 1kWh당 실질 단가 */
  effectiveUnitPrice: number;
}

function pickBaseCharge(tariff: ElectricityTariff, usage: number): number {
  for (const entry of tariff.baseCharges) {
    if (entry.upTo === null || usage <= entry.upTo) return entry.charge;
  }
  return tariff.baseCharges[tariff.baseCharges.length - 1]?.charge ?? 0;
}

function splitTiers(tiers: ProgressiveTier[], usage: number): TierUsage[] {
  const breakdown: TierUsage[] = [];
  let remaining = usage;
  let from = 0;

  for (const tier of tiers) {
    if (remaining <= 0) break;
    const capacity = tier.upTo === null ? remaining : Math.max(0, tier.upTo - from);
    const used = Math.min(remaining, capacity);
    if (used > 0) {
      breakdown.push({
        from,
        to: tier.upTo,
        usage: used,
        rate: tier.rate,
        amount: used * tier.rate,
      });
      remaining -= used;
    }
    from = tier.upTo ?? from + used;
  }

  return breakdown;
}

/** 10원 미만 절사 */
function floorTo10(value: number): number {
  return Math.floor(value / 10) * 10;
}

export function calcElectricity(
  input: ElectricityInput,
  tariffs?: ElectricityTariffSet,
): ElectricityResult | null {
  if (!Number.isFinite(input.usageKwh) || input.usageKwh < 0) return null;

  const tariff = resolveTariff(input.contract, tariffs);
  const summer = isSummerMonth(input.month);
  const winter = isWinterMonth(input.month);
  // 하계는 누진 구간이 확대되고, 하계·동계에는 1,000kWh 초과 슈퍼유저 구간이 적용된다.
  const tiers = summer
    ? tariff.summerTiers
    : winter
      ? (tariff.winterTiers ?? tariff.tiers)
      : tariff.tiers;

  const usage = input.usageKwh;
  const baseCharge = pickBaseCharge(tariff, usage);
  const tierBreakdown = splitTiers(tiers, usage);
  const energyCharge = tierBreakdown.reduce((sum, tier) => sum + tier.amount, 0);
  const climateCharge = usage * tariff.climateRate;
  const fuelAdjustCharge = usage * tariff.fuelAdjustRate;

  const subtotal = baseCharge + energyCharge + climateCharge + fuelAdjustCharge;
  const vat = Math.round(subtotal * tariff.vatRate);
  const powerFund = floorTo10(subtotal * tariff.powerFundRate);
  const total = floorTo10(subtotal + vat + powerFund);

  return {
    usageKwh: usage,
    isSummer: summer,
    isWinter: winter,
    baseCharge,
    energyCharge,
    tierBreakdown,
    climateCharge,
    fuelAdjustCharge,
    subtotal,
    vat,
    powerFund,
    total,
    effectiveUnitPrice: usage > 0 ? total / usage : 0,
  };
}

/**
 * 가전제품 사용 시 추가되는 전기요금.
 * 누진제 때문에 "추가 사용량의 요금"은 기존 사용량에 따라 달라지므로,
 * (기존 + 추가) 요금에서 기존 요금을 빼는 방식으로 계산한다.
 */
export function calcAdditionalCost(
  baseUsage: number,
  additionalUsage: number,
  contract: ElectricityContractType,
  month: number,
  tariffs?: ElectricityTariffSet,
): number | null {
  if (additionalUsage < 0 || baseUsage < 0) return null;
  const before = calcElectricity({ usageKwh: baseUsage, contract, month }, tariffs);
  const after = calcElectricity(
    { usageKwh: baseUsage + additionalUsage, contract, month },
    tariffs,
  );
  if (!before || !after) return null;
  return after.total - before.total;
}

/** 소비전력(W) × 하루 사용시간 × 일수 → kWh */
export function usageFromWatt(watt: number, hoursPerDay: number, days: number): number {
  if (watt < 0 || hoursPerDay < 0 || days < 0) return 0;
  return (watt * hoursPerDay * days) / 1000;
}
