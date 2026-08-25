/**
 * 한국 주택용 전기요금 기준값 (저압/고압).
 *
 * ⚠ 제도 종속 데이터
 * - 요금은 개정될 수 있으므로 반드시 basisDate와 출처를 화면에 표시한다.
 * - PHASE 8에서 관리자 화면으로 이 값을 수정할 수 있게 확장했다(수정 → 재생성 → 정적 페이지 반영).
 * - 실제 청구서에는 복지할인, 대가족 할인, TV수신료, 미납/조정 항목 등이 추가로 반영될 수 있다.
 *
 * 최종 확인: 2026-08-25
 * - 주택용 요금표는 2023-11-16 인상분이 계속 적용 중이다(민수용 요금 연속 동결).
 * - 전력산업기반기금 부담금은 2025-07-01부터 2.7%로 인하되었다(이전 3.7% → 3.2% → 2.7%).
 */

export interface ProgressiveTier {
  /** 이 구간의 상한 사용량(kWh). null이면 상한 없음 */
  upTo: number | null;
  /** 전력량요금 (원/kWh) */
  rate: number;
}

export interface ElectricityTariff {
  /** 기본요금 구간: [상한 kWh, 기본요금(원)] */
  baseCharges: { upTo: number | null; charge: number }[];
  /** 전력량요금 누진 구간 (하계·동계 외 기간) */
  tiers: ProgressiveTier[];
  /** 하계(7~8월) 누진 구간 — 구간 폭이 확대되고 슈퍼유저 구간이 적용된다 */
  summerTiers: ProgressiveTier[];
  /** 동계(12~2월) 누진 구간 — 구간은 평시와 같고 슈퍼유저 구간이 적용된다 */
  winterTiers: ProgressiveTier[];
  /** 기후환경요금 (원/kWh) */
  climateRate: number;
  /** 연료비조정요금 (원/kWh) */
  fuelAdjustRate: number;
  /** 부가가치세율 */
  vatRate: number;
  /** 전력산업기반기금 부담률 */
  powerFundRate: number;
}

/** 주택용 저압 (단독주택 등 대부분의 가정) */
export const RESIDENTIAL_LOW_VOLTAGE: ElectricityTariff = {
  baseCharges: [
    { upTo: 200, charge: 910 },
    { upTo: 400, charge: 1600 },
    { upTo: null, charge: 7300 },
  ],
  tiers: [
    { upTo: 200, rate: 120.0 },
    { upTo: 400, rate: 214.6 },
    { upTo: null, rate: 307.3 },
  ],
  summerTiers: [
    { upTo: 300, rate: 120.0 },
    { upTo: 450, rate: 214.6 },
    { upTo: 1000, rate: 307.3 },
    // 슈퍼유저 요금 (하계·동계 1,000kWh 초과)
    { upTo: null, rate: 736.2 },
  ],
  winterTiers: [
    { upTo: 200, rate: 120.0 },
    { upTo: 400, rate: 214.6 },
    { upTo: 1000, rate: 307.3 },
    { upTo: null, rate: 736.2 },
  ],
  climateRate: 9.0,
  fuelAdjustRate: 5.0,
  vatRate: 0.1,
  powerFundRate: 0.027,
};

/** 주택용 고압 (대부분의 아파트) */
export const RESIDENTIAL_HIGH_VOLTAGE: ElectricityTariff = {
  baseCharges: [
    { upTo: 200, charge: 730 },
    { upTo: 400, charge: 1260 },
    { upTo: null, charge: 6060 },
  ],
  tiers: [
    { upTo: 200, rate: 105.0 },
    { upTo: 400, rate: 174.0 },
    { upTo: null, rate: 242.3 },
  ],
  summerTiers: [
    { upTo: 300, rate: 105.0 },
    { upTo: 450, rate: 174.0 },
    { upTo: 1000, rate: 242.3 },
    { upTo: null, rate: 601.3 },
  ],
  winterTiers: [
    { upTo: 200, rate: 105.0 },
    { upTo: 400, rate: 174.0 },
    { upTo: 1000, rate: 242.3 },
    { upTo: null, rate: 601.3 },
  ],
  climateRate: 9.0,
  fuelAdjustRate: 5.0,
  vatRate: 0.1,
  powerFundRate: 0.027,
};

export type ElectricityContractType = 'low' | 'high';

export function tariffOf(type: ElectricityContractType): ElectricityTariff {
  return type === 'high' ? RESIDENTIAL_HIGH_VOLTAGE : RESIDENTIAL_LOW_VOLTAGE;
}

/** 화면에 표시할 기준일과 출처 */
export const ELECTRICITY_BASIS = {
  /** 기준값을 최종 확인한 날짜 */
  basisDate: '2026-08-25',
  /** 요금표 자체가 마지막으로 바뀐 날 */
  tariffEffectiveDate: '2023-11-16',
  /** 전력산업기반기금 부담률이 마지막으로 바뀐 날 */
  fundRateEffectiveDate: '2025-07-01',
  sourceLabel: '한국전력공사 주택용 전기요금표, 전기사업법 시행령(전력산업기반기금 부담금 2.7%)',
  sourceUrl: 'https://home.kepco.co.kr/kepco/front/html/CY/E/E/CYEEHP00101.html',
} as const;

/** 하계(누진 완화) 적용 월 */
export const SUMMER_MONTHS = [7, 8];
/** 동계(슈퍼유저 구간 적용) 월 */
export const WINTER_MONTHS = [12, 1, 2];

export function isSummerMonth(month: number): boolean {
  return SUMMER_MONTHS.includes(month);
}

export function isWinterMonth(month: number): boolean {
  return WINTER_MONTHS.includes(month);
}
