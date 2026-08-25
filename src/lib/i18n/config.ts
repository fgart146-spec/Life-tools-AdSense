/** 지원 로케일 정의. 로케일을 추가하려면 여기부터 수정한다. */
export const locales = ['ko', 'en', 'ja'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export const localeMeta: Record<
  Locale,
  {
    /** <html lang> 및 hreflang 값 */
    htmlLang: string;
    /** Open Graph locale */
    ogLocale: string;
    /** 언어 전환 UI에 표시할 원어 표기 */
    nativeName: string;
    /** 숫자/통화 포맷용 BCP47 */
    numberLocale: string;
    /** 기본 통화 (표시용) */
    currency: string;
  }
> = {
  ko: {
    htmlLang: 'ko',
    ogLocale: 'ko_KR',
    nativeName: '한국어',
    numberLocale: 'ko-KR',
    currency: 'KRW',
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    nativeName: 'English',
    numberLocale: 'en-US',
    currency: 'USD',
  },
  ja: {
    htmlLang: 'ja',
    ogLocale: 'ja_JP',
    nativeName: '日本語',
    numberLocale: 'ja-JP',
    currency: 'JPY',
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** 로케일 접두사를 붙인 내부 경로를 만든다. path는 '/' 또는 '/foo' 형태. */
export function localePath(locale: Locale, path = '/'): string {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized}`;
}
