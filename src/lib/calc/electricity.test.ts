import { describe, expect, it } from 'vitest';
import { calcAdditionalCost, calcElectricity, usageFromWatt } from './electricity';

describe('calcElectricity (주택용 저압)', () => {
  it('200kWh 사용 시 1단계 요금만 적용된다', () => {
    const result = calcElectricity({ usageKwh: 200, contract: 'low', month: 5 });
    expect(result?.baseCharge).toBe(910);
    expect(result?.energyCharge).toBeCloseTo(24000); // 200 × 120
    expect(result?.tierBreakdown).toHaveLength(1);
  });

  it('350kWh는 2단계까지 누진 적용된다', () => {
    const result = calcElectricity({ usageKwh: 350, contract: 'low', month: 5 });
    expect(result?.baseCharge).toBe(1600);
    // 200×120 + 150×214.6 = 24,000 + 32,190
    expect(result?.energyCharge).toBeCloseTo(56190);
    expect(result?.tierBreakdown).toHaveLength(2);
  });

  it('500kWh는 3단계까지 적용된다', () => {
    const result = calcElectricity({ usageKwh: 500, contract: 'low', month: 5 });
    expect(result?.baseCharge).toBe(7300);
    // 200×120 + 200×214.6 + 100×307.3
    expect(result?.energyCharge).toBeCloseTo(24000 + 42920 + 30730);
    expect(result?.tierBreakdown).toHaveLength(3);
  });

  it('여름철(7~8월)은 누진 구간이 완화된다', () => {
    const summer = calcElectricity({ usageKwh: 300, contract: 'low', month: 8 });
    const normal = calcElectricity({ usageKwh: 300, contract: 'low', month: 5 });
    expect(summer?.isSummer).toBe(true);
    expect(summer?.energyCharge).toBeLessThan(normal?.energyCharge ?? 0);
    // 여름 300kWh는 전부 1단계
    expect(summer?.energyCharge).toBeCloseTo(36000);
  });

  it('부가세와 기금이 더해지고 10원 미만은 절사된다', () => {
    const result = calcElectricity({ usageKwh: 300, contract: 'low', month: 5 });
    expect(result).not.toBeNull();
    if (!result) return;
    expect(result.vat).toBe(Math.round(result.subtotal * 0.1));
    expect(result.total % 10).toBe(0);
    expect(result.total).toBeGreaterThan(result.subtotal);
  });

  it('사용량 0이면 기본요금과 세금만 남는다', () => {
    const result = calcElectricity({ usageKwh: 0, contract: 'low', month: 5 });
    expect(result?.energyCharge).toBe(0);
    expect(result?.baseCharge).toBe(910);
    expect(result?.effectiveUnitPrice).toBe(0);
  });

  it('고압(아파트)이 저압보다 저렴하다', () => {
    const low = calcElectricity({ usageKwh: 350, contract: 'low', month: 5 });
    const high = calcElectricity({ usageKwh: 350, contract: 'high', month: 5 });
    expect(high?.total).toBeLessThan(low?.total ?? 0);
  });

  it('음수 사용량은 계산하지 않는다', () => {
    expect(calcElectricity({ usageKwh: -10, contract: 'low', month: 5 })).toBeNull();
  });

  it('하계 1,000kWh 초과분에는 슈퍼유저 단가가 적용된다', () => {
    const result = calcElectricity({ usageKwh: 1100, contract: 'low', month: 8 });
    expect(result?.isSummer).toBe(true);
    expect(result?.tierBreakdown).toHaveLength(4);
    expect(result?.tierBreakdown[3]?.rate).toBe(736.2);
    expect(result?.tierBreakdown[3]?.usage).toBe(100);
  });

  it('동계에도 슈퍼유저 구간이 적용되고 누진 구간은 평시와 같다', () => {
    const result = calcElectricity({ usageKwh: 1100, contract: 'low', month: 1 });
    expect(result?.isWinter).toBe(true);
    expect(result?.isSummer).toBe(false);
    // 200 / 200 / 600 / 100
    expect(result?.tierBreakdown.map((tier) => tier.usage)).toEqual([200, 200, 600, 100]);
    expect(result?.tierBreakdown[3]?.rate).toBe(736.2);
  });

  it('봄·가을에는 슈퍼유저 구간이 없다', () => {
    const result = calcElectricity({ usageKwh: 1100, contract: 'low', month: 5 });
    expect(result?.tierBreakdown).toHaveLength(3);
    expect(result?.tierBreakdown[2]?.rate).toBe(307.3);
  });

  it('전력산업기반기금은 2.7%로 계산된다', () => {
    const result = calcElectricity({ usageKwh: 300, contract: 'low', month: 5 });
    expect(result).not.toBeNull();
    if (!result) return;
    expect(result.powerFund).toBe(Math.floor((result.subtotal * 0.027) / 10) * 10);
  });
});

describe('calcAdditionalCost', () => {
  it('누진 구간이 높을수록 추가 요금이 커진다', () => {
    const atLowUsage = calcAdditionalCost(100, 50, 'low', 5);
    const atHighUsage = calcAdditionalCost(450, 50, 'low', 5);
    expect(atLowUsage).not.toBeNull();
    expect(atHighUsage).not.toBeNull();
    expect(atHighUsage ?? 0).toBeGreaterThan(atLowUsage ?? 0);
  });

  it('추가 사용량이 0이면 0원', () => {
    expect(calcAdditionalCost(300, 0, 'low', 5)).toBe(0);
  });
});

describe('usageFromWatt', () => {
  it('소비전력과 사용시간으로 kWh를 구한다', () => {
    expect(usageFromWatt(1000, 5, 30)).toBe(150);
    expect(usageFromWatt(50, 24, 30)).toBe(36);
  });

  it('음수 입력은 0', () => {
    expect(usageFromWatt(-100, 5, 30)).toBe(0);
  });
});
