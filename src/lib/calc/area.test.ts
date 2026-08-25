import { describe, expect, it } from 'vitest';
import { convertArea, exclusiveArea, findIssues, PYEONG_TO_SQM } from './area';

describe('convertArea', () => {
  it('1평은 약 3.3058㎡', () => {
    const result = convertArea({ value: 1, unit: 'pyeong' });
    expect(result?.sqm).toBeCloseTo(3.305785, 5);
  });

  it('84㎡는 약 25.4평', () => {
    const result = convertArea({ value: 84, unit: 'sqm' });
    expect(result?.pyeong).toBeCloseTo(25.41, 2);
  });

  it('32평은 약 105.8㎡', () => {
    const result = convertArea({ value: 32, unit: 'pyeong' });
    expect(result?.sqm).toBeCloseTo(32 * PYEONG_TO_SQM, 5);
    expect(result?.sqm).toBeCloseTo(105.79, 1);
  });

  it('제곱피트 변환', () => {
    const result = convertArea({ value: 1000, unit: 'sqft' });
    expect(result?.sqm).toBeCloseTo(92.9, 1);
  });

  it('정사각형 한 변 길이를 계산한다', () => {
    const result = convertArea({ value: 100, unit: 'sqm' });
    expect(result?.squareSide).toBeCloseTo(10);
  });

  it('0은 0으로 변환된다', () => {
    const result = convertArea({ value: 0, unit: 'sqm' });
    expect(result?.pyeong).toBe(0);
  });

  it('음수는 계산하지 않는다', () => {
    expect(convertArea({ value: -5, unit: 'sqm' })).toBeNull();
    expect(findIssues({ value: -5, unit: 'sqm' })).toContain('value');
  });
});

describe('exclusiveArea', () => {
  it('전용률을 적용해 전용면적을 계산한다', () => {
    expect(exclusiveArea(112, 75)).toBeCloseTo(84);
  });

  it('잘못된 값은 null', () => {
    expect(exclusiveArea(0, 75)).toBeNull();
    expect(exclusiveArea(100, 120)).toBeNull();
  });
});
