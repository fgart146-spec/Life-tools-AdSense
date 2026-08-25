import { localeMeta, type Locale } from '@/lib/i18n/config';
import { roundTo } from '@/lib/math/decimal';

/**
 * 표시용 포맷터.
 * 계산 로직에서는 사용하지 않는다(반올림은 표시 직전 한 번만).
 */

export interface NumberFormatOptions {
  /** 최소 소수 자릿수 */
  min?: number;
  /** 최대 소수 자릿수 */
  max?: number;
}

export function formatNumber(
  value: number,
  locale: Locale,
  { min = 0, max = 0 }: NumberFormatOptions = {},
): string {
  if (!Number.isFinite(value)) return '-';
  return new Intl.NumberFormat(localeMeta[locale].numberLocale, {
    minimumFractionDigits: min,
    maximumFractionDigits: Math.max(min, max),
  }).format(value);
}

/**
 * 금액 표시.
 * 도구 대부분은 사용자의 통화를 그대로 사용하므로 로케일별 접미/기호만 붙인다.
 * (환율 변환은 하지 않는다.)
 */
export function formatMoney(value: number, locale: Locale, digits = 0): string {
  if (!Number.isFinite(value)) return '-';
  const formatted = formatNumber(roundTo(value, digits), locale, { max: digits });
  switch (locale) {
    case 'ko':
      return `${formatted}원`;
    case 'ja':
      return `${formatted}円`;
    default:
      return formatted;
  }
}

export function formatPercent(value: number, locale: Locale, digits = 1): string {
  if (!Number.isFinite(value)) return '-';
  return `${formatNumber(roundTo(value, digits), locale, { max: digits })}%`;
}

/** 단위를 붙인 값. 예: 1,200 g */
export function formatWithUnit(
  value: number,
  unit: string,
  locale: Locale,
  options?: NumberFormatOptions,
): string {
  if (!Number.isFinite(value)) return '-';
  return `${formatNumber(value, locale, options)} ${unit}`.trim();
}

/**
 * 입력 문자열 → 숫자.
 * 천단위 구분자, 공백, 전각 숫자를 허용한다. 비어 있거나 숫자가 아니면 null.
 */
export function parseNumber(input: string): number | null {
  if (typeof input !== 'string') return null;
  const normalized = input
    .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/[,\s\u00a0]/g, '')
    .replace(/[．]/g, '.')
    .trim();
  if (normalized === '' || normalized === '-' || normalized === '.') return null;
  if (!/^-?\d*\.?\d*$/.test(normalized)) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

/** 숫자 입력용 천단위 구분 표시 (입력 중에도 사용) */
export function groupDigits(raw: string): string {
  const negative = raw.startsWith('-');
  const body = negative ? raw.slice(1) : raw;
  const [intPart = '', decimalPart] = body.split('.');
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const result = decimalPart === undefined ? grouped : `${grouped}.${decimalPart}`;
  return negative ? `-${result}` : result;
}

/** ISO 날짜(YYYY-MM-DD)를 로케일 표기로 */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(localeMeta[locale].numberLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
