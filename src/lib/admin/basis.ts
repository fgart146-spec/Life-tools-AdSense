import { unstable_cache } from 'next/cache';
import {
  RESIDENTIAL_HIGH_VOLTAGE,
  RESIDENTIAL_LOW_VOLTAGE,
  ELECTRICITY_BASIS,
  type ElectricityTariff,
} from '@/lib/data/kr-electricity';
import { INSURANCE_RATES, PAYROLL_BASIS } from '@/lib/data/kr-payroll';
import { createSupabaseReadOnlyClient } from '@/lib/supabase/read-only';

/**
 * 관리자가 수정할 수 있는 기준값.
 *
 * 흐름: 관리자 저장 → DB → (빌드 또는 revalidate) → 정적 페이지에 반영
 * 사용자 요청마다 조회하지 않는다.
 *
 * ⚠ 캐시 규칙
 *   캐시에는 **DB에서 읽은 값만** 담는다. 코드 기본값은 캐시 밖에서 매번 합친다.
 *   (합쳐진 결과를 캐시하면, 코드의 요율 상수를 고쳐도 캐시가 만료될 때까지
 *    옛 요율이 계속 주입되는 문제가 생긴다.)
 */
export interface EffectiveBasis {
  electricity: {
    low: ElectricityTariff;
    high: ElectricityTariff;
    basisDate: string;
    sourceLabel: string;
    sourceUrl?: string;
  };
  payroll: {
    rates: typeof INSURANCE_RATES;
    basisDate: string;
    sourceLabel: string;
  };
  /** DB 값이 실제로 적용됐는지 (관리자 화면 표시용) */
  fromDatabase: boolean;
}

export const DEFAULT_BASIS: EffectiveBasis = {
  electricity: {
    low: RESIDENTIAL_LOW_VOLTAGE,
    high: RESIDENTIAL_HIGH_VOLTAGE,
    basisDate: ELECTRICITY_BASIS.basisDate,
    sourceLabel: ELECTRICITY_BASIS.sourceLabel,
    sourceUrl: ELECTRICITY_BASIS.sourceUrl,
  },
  payroll: {
    rates: INSURANCE_RATES,
    basisDate: PAYROLL_BASIS.basisDate,
    sourceLabel: PAYROLL_BASIS.sourceLabel,
  },
  fromDatabase: false,
};

/** 기준값 키 (DB의 basis_values.key) */
export const BASIS_KEYS = {
  electricityLow: 'electricity.residential.low',
  electricityHigh: 'electricity.residential.high',
  payrollRates: 'payroll.insurance.rates',
} as const;

interface BasisRow {
  key: string;
  value: unknown;
  basis_date: string | null;
  source_label: string | null;
  source_url: string | null;
}

/** DB 원본만 캐시한다. 코드 기본값은 여기에 섞지 않는다. */
const fetchBasisRows = unstable_cache(
  async (): Promise<BasisRow[]> => {
    const supabase = createSupabaseReadOnlyClient();
    if (!supabase) return [];

    try {
      const { data, error } = await supabase
        .from('basis_values')
        .select('key, value, basis_date, source_label, source_url');

      if (error || !data) return [];
      return data as BasisRow[];
    } catch {
      // DB가 없거나 실패해도 사이트는 코드 기본값으로 정상 동작해야 한다.
      return [];
    }
  },
  ['basis-values-rows'],
  { revalidate: 86400, tags: ['basis-values'] },
);

/**
 * 코드 기본값 위에 DB 값을 덮어쓴 최종 기준값.
 * 정적 생성 시점에만 호출된다.
 */
export async function getEffectiveBasis(): Promise<EffectiveBasis> {
  const rows = await fetchBasisRows();
  if (rows.length === 0) return DEFAULT_BASIS;

  const byKey = new Map(rows.map((row) => [row.key, row]));
  const low = byKey.get(BASIS_KEYS.electricityLow);
  const high = byKey.get(BASIS_KEYS.electricityHigh);
  const payroll = byKey.get(BASIS_KEYS.payrollRates);

  return {
    electricity: {
      low: (low?.value as ElectricityTariff | undefined) ?? RESIDENTIAL_LOW_VOLTAGE,
      high: (high?.value as ElectricityTariff | undefined) ?? RESIDENTIAL_HIGH_VOLTAGE,
      basisDate: low?.basis_date ?? ELECTRICITY_BASIS.basisDate,
      sourceLabel: low?.source_label ?? ELECTRICITY_BASIS.sourceLabel,
      sourceUrl: low?.source_url ?? ELECTRICITY_BASIS.sourceUrl,
    },
    payroll: {
      rates: (payroll?.value as typeof INSURANCE_RATES | undefined) ?? INSURANCE_RATES,
      basisDate: payroll?.basis_date ?? PAYROLL_BASIS.basisDate,
      sourceLabel: payroll?.source_label ?? PAYROLL_BASIS.sourceLabel,
    },
    fromDatabase: true,
  };
}
