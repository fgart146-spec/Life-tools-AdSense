import { describe, expect, it } from 'vitest';
import { calcHeating, findIssues, HEATING_DEFAULTS } from './heating';

const base = {
  type: 'gas' as const,
  usage: null,
  unitRate: null,
  heatValue: null,
  baseCharge: null,
  vatIncluded: false,
  days: 30,
};

describe('calcHeating (도시가스)', () => {
  it('사용량 × 열량 × 단가로 계산한다', () => {
    const result = calcHeating({
      ...base,
      usage: 100,
      unitRate: 22.4,
      heatValue: 43.1,
      baseCharge: 1250,
    });
    // 100 × 43.1 = 4,310MJ × 22.4 = 96,544원 + 기본 1,250 = 97,794 + VAT
    expect(result?.totalMj).toBeCloseTo(4310);
    expect(result?.energyCharge).toBeCloseTo(96544);
    expect(result?.vat).toBeCloseTo(9779.4);
    expect(result?.total).toBeCloseTo(107573.4);
  });

  it('열량계수를 비우면 기본값을 사용한다', () => {
    const result = calcHeating({ ...base, usage: 10, unitRate: 20 });
    expect(result?.totalMj).toBeCloseTo(10 * (HEATING_DEFAULTS.gas.heatValue ?? 43.1));
  });

  it('부가세 포함 단가면 VAT를 더하지 않는다', () => {
    const result = calcHeating({
      ...base,
      usage: 100,
      unitRate: 22.4,
      heatValue: 43.1,
      vatIncluded: true,
    });
    expect(result?.vat).toBe(0);
    expect(result?.total).toBeCloseTo(96544);
  });
});

describe('calcHeating (지역난방·전기)', () => {
  it('지역난방은 사용량 × 단가', () => {
    const result = calcHeating({ ...base, type: 'district', usage: 500, unitRate: 105 });
    expect(result?.energyCharge).toBe(52500);
    expect(result?.totalMj).toBeNull();
  });

  it('전기난방도 사용량 × 단가', () => {
    const result = calcHeating({ ...base, type: 'electric', usage: 300, unitRate: 200 });
    expect(result?.energyCharge).toBe(60000);
  });

  it('하루당 요금을 계산한다', () => {
    const result = calcHeating({
      ...base,
      type: 'district',
      usage: 300,
      unitRate: 100,
      vatIncluded: true,
      days: 30,
    });
    expect(result?.perDay).toBe(1000);
  });
});

describe('입력 검증', () => {
  it('사용량이 없으면 결과 없음', () => {
    expect(calcHeating({ ...base, unitRate: 20 })).toBeNull();
  });

  it('음수 입력을 잡아낸다', () => {
    expect(findIssues({ ...base, usage: -1 })).toContain('usage');
    expect(findIssues({ ...base, unitRate: -1 })).toContain('unitRate');
    expect(findIssues({ ...base, heatValue: 0 })).toContain('heatValue');
    expect(findIssues({ ...base, days: 40 })).toContain('days');
  });

  it('사용량 0이면 기본요금과 부가세만 남는다', () => {
    const result = calcHeating({ ...base, usage: 0, unitRate: 22.4, baseCharge: 1250 });
    expect(result?.energyCharge).toBe(0);
    expect(result?.total).toBeCloseTo(1375);
  });
});
