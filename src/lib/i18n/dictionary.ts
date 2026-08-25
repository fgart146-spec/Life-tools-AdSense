import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/types';
import { ko } from '@/lib/i18n/dictionaries/ko';
import { en } from '@/lib/i18n/dictionaries/en';
import { ja } from '@/lib/i18n/dictionaries/ja';

const dictionaries: Record<Locale, Dictionary> = { ko, en, ja };

/**
 * 서버 컴포넌트에서만 사용한다.
 * 사전 전체를 클라이언트 컴포넌트로 내려보내지 말고 필요한 문자열만 props로 전달한다.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** '%{key}' 자리표시자를 치환한다. */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/%\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}
