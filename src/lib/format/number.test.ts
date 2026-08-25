import { describe, expect, it } from 'vitest';
import { formatMoney, formatNumber, formatPercent, groupDigits, parseNumber } from './number';

describe('parseNumber', () => {
  it('천단위 구분자와 공백을 허용한다', () => {
    expect(parseNumber('12,345')).toBe(12345);
    expect(parseNumber(' 1 200 ')).toBe(1200);
  });

  it('전각 숫자를 반각으로 변환한다', () => {
    expect(parseNumber('１２３')).toBe(123);
  });

  it('빈 값과 잘못된 문자열은 null', () => {
    expect(parseNumber('')).toBeNull();
    expect(parseNumber('abc')).toBeNull();
    expect(parseNumber('1.2.3')).toBeNull();
    expect(parseNumber('-')).toBeNull();
  });

  it('소수와 음수를 처리한다', () => {
    expect(parseNumber('0.5')).toBe(0.5);
    expect(parseNumber('-3')).toBe(-3);
  });
});

describe('groupDigits', () => {
  it('세 자리마다 쉼표를 넣는다', () => {
    expect(groupDigits('1234567')).toBe('1,234,567');
    expect(groupDigits('123')).toBe('123');
    expect(groupDigits('1234.56')).toBe('1,234.56');
    expect(groupDigits('-1234')).toBe('-1,234');
    expect(groupDigits('')).toBe('');
  });
});

describe('formatNumber / formatMoney / formatPercent', () => {
  it('로케일별 금액 표기', () => {
    expect(formatMoney(12345, 'ko')).toBe('12,345원');
    expect(formatMoney(12345, 'ja')).toBe('12,345円');
    expect(formatMoney(12345, 'en')).toBe('12,345');
  });

  it('소수 자릿수 옵션', () => {
    expect(formatNumber(1234.567, 'ko', { max: 2 })).toBe('1,234.57');
    expect(formatPercent(14.678, 'ko')).toBe('14.7%');
  });

  it('유한하지 않은 값은 하이픈', () => {
    expect(formatMoney(Number.NaN, 'ko')).toBe('-');
    expect(formatNumber(Number.POSITIVE_INFINITY, 'ko')).toBe('-');
  });
});
