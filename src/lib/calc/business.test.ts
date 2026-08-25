import { describe, expect, it } from 'vitest';
import {
  calcBreakEven,
  calcMargin,
  calcRoas,
  calcTargetPrice,
  findBreakEvenIssues,
  findMarginIssues,
  findRoasIssues,
  findTargetPriceIssues,
} from './business';

const marginBase = {
  sellingPrice: null,
  cost: null,
  feePercent: null,
  shipping: null,
  otherCost: null,
  quantity: null,
};

describe('calcMargin', () => {
  it('수수료가 없으면 판매가에서 원가만 뺀다', () => {
    const result = calcMargin({ ...marginBase, sellingPrice: 20000, cost: 12000 });
    expect(result?.profit).toBe(8000);
    expect(result?.marginRate).toBeCloseTo(40);
    expect(result?.costRate).toBeCloseTo(60);
  });

  it('수수료·배송비·기타비용을 반영한다', () => {
    const result = calcMargin({
      ...marginBase,
      sellingPrice: 20000,
      cost: 10000,
      feePercent: 10,
      shipping: 3000,
      otherCost: 500,
    });
    // 매출 20,000 / 수수료 2,000 / 비용 13,500 + 2,000 = 15,500
    expect(result?.feeAmount).toBe(2000);
    expect(result?.totalCost).toBe(15500);
    expect(result?.profit).toBe(4500);
    expect(result?.marginRate).toBeCloseTo(22.5);
  });

  it('수량을 곱해 총액을 계산한다', () => {
    const result = calcMargin({
      ...marginBase,
      sellingPrice: 10000,
      cost: 6000,
      quantity: 50,
    });
    expect(result?.revenue).toBe(500000);
    expect(result?.profit).toBe(200000);
    expect(result?.profitPerUnit).toBe(4000);
  });

  it('손익분기 판매가를 계산한다', () => {
    const result = calcMargin({
      ...marginBase,
      sellingPrice: 20000,
      cost: 10000,
      feePercent: 20,
    });
    // 10,000 / 0.8 = 12,500
    expect(result?.breakEvenPrice).toBeCloseTo(12500);
  });

  it('원가가 판매가보다 크면 손실이 난다', () => {
    const result = calcMargin({ ...marginBase, sellingPrice: 10000, cost: 12000 });
    expect(result?.profit).toBe(-2000);
    expect(result?.marginRate).toBeCloseTo(-20);
  });

  it('입력이 부족하면 결과 없음', () => {
    expect(calcMargin({ ...marginBase, sellingPrice: 10000 })).toBeNull();
  });

  it('잘못된 입력을 잡아낸다', () => {
    expect(findMarginIssues({ ...marginBase, feePercent: 120 })).toContain('fee');
    expect(findMarginIssues({ ...marginBase, quantity: 0 })).toContain('quantity');
  });
});

const targetBase = {
  cost: null,
  targetMarginPercent: null,
  feePercent: null,
  shipping: null,
  otherCost: null,
};

describe('calcTargetPrice', () => {
  it('목표 마진율을 남기는 판매가를 계산한다', () => {
    const result = calcTargetPrice({ ...targetBase, cost: 10000, targetMarginPercent: 30 });
    // 10,000 / 0.7 = 14,285.7
    expect(result?.price).toBeCloseTo(14285.71, 1);
    expect(result?.profit).toBeCloseTo(4285.71, 1);
  });

  it('수수료를 함께 반영한다', () => {
    const result = calcTargetPrice({
      ...targetBase,
      cost: 10000,
      targetMarginPercent: 30,
      feePercent: 10,
    });
    // 10,000 / (1 - 0.3 - 0.1) = 16,666.7
    expect(result?.price).toBeCloseTo(16666.67, 1);
    expect(result?.feeAmount).toBeCloseTo(1666.67, 1);
  });

  it('부가세 포함가를 함께 보여준다', () => {
    const result = calcTargetPrice({ ...targetBase, cost: 10000, targetMarginPercent: 0 });
    expect(result?.price).toBe(10000);
    expect(result?.priceWithVat).toBeCloseTo(11000);
  });

  it('마진율 + 수수료율이 100%를 넘으면 계산할 수 없다', () => {
    expect(
      calcTargetPrice({
        ...targetBase,
        cost: 10000,
        targetMarginPercent: 70,
        feePercent: 40,
      }),
    ).toBeNull();
  });

  it('잘못된 입력을 잡아낸다', () => {
    expect(findTargetPriceIssues({ ...targetBase, targetMarginPercent: 100 })).toContain('margin');
  });
});

describe('calcBreakEven', () => {
  it('고정비를 공헌이익으로 나눠 손익분기 판매량을 구한다', () => {
    const result = calcBreakEven({
      fixedCost: 3_000_000,
      unitPrice: 15000,
      unitVariableCost: 9000,
    });
    expect(result?.contributionMargin).toBe(6000);
    expect(result?.breakEvenUnits).toBe(500);
    expect(result?.breakEvenRevenue).toBe(7_500_000);
    expect(result?.contributionRate).toBeCloseTo(40);
  });

  it('하루 평균 필요 판매량을 계산한다', () => {
    const result = calcBreakEven({
      fixedCost: 3_000_000,
      unitPrice: 15000,
      unitVariableCost: 9000,
    });
    expect(result?.unitsPerDay).toBeCloseTo(16.67, 1);
  });

  it('판매가가 변동비보다 낮으면 계산할 수 없다', () => {
    expect(
      calcBreakEven({ fixedCost: 1_000_000, unitPrice: 5000, unitVariableCost: 6000 }),
    ).toBeNull();
    expect(
      findBreakEvenIssues({ fixedCost: 1_000_000, unitPrice: 5000, unitVariableCost: 6000 }),
    ).toContain('margin');
  });

  it('고정비가 0이면 손익분기 판매량도 0', () => {
    const result = calcBreakEven({ fixedCost: 0, unitPrice: 10000, unitVariableCost: 5000 });
    expect(result?.breakEvenUnits).toBe(0);
  });
});

const roasBase = {
  adCost: null,
  revenue: null,
  contributionRate: null,
  conversions: null,
};

describe('calcRoas', () => {
  it('매출 ÷ 광고비로 ROAS를 계산한다', () => {
    const result = calcRoas({ ...roasBase, adCost: 1_000_000, revenue: 5_000_000 });
    expect(result?.roas).toBe(500);
    expect(result?.adCostRate).toBe(20);
  });

  it('공헌이익률을 넣으면 손익분기 ROAS와 이익을 계산한다', () => {
    const result = calcRoas({
      ...roasBase,
      adCost: 1_000_000,
      revenue: 5_000_000,
      contributionRate: 30,
    });
    // 손익분기 ROAS = 1 / 0.3 = 333%
    expect(result?.breakEvenRoas).toBeCloseTo(333.33, 1);
    expect(result?.profit).toBe(500_000);
  });

  it('손익분기 ROAS를 밑돌면 이익이 음수', () => {
    const result = calcRoas({
      ...roasBase,
      adCost: 2_000_000,
      revenue: 5_000_000,
      contributionRate: 30,
    });
    expect(result?.profit).toBe(-500_000);
  });

  it('전환 수를 넣으면 CPA와 객단가를 계산한다', () => {
    const result = calcRoas({
      ...roasBase,
      adCost: 1_000_000,
      revenue: 5_000_000,
      conversions: 100,
    });
    expect(result?.cpa).toBe(10_000);
    expect(result?.revenuePerConversion).toBe(50_000);
  });

  it('광고비가 0이면 계산할 수 없다', () => {
    expect(calcRoas({ ...roasBase, adCost: 0, revenue: 100 })).toBeNull();
    expect(findRoasIssues({ ...roasBase, adCost: 0 })).toContain('adCost');
  });
});
