import { locales, type Locale } from '@/lib/i18n/config';
import { findToolBySlug } from '@/lib/tools/definitions';
import { findGuideBySlug } from '@/lib/guides';

/**
 * 로케일 접두사를 제외한 경로에 대해 "실제로 존재하는" 로케일 목록을 돌려준다.
 * 언어 전환 UI가 존재하지 않는 페이지로 보내 404를 만드는 것을 막고,
 * hreflang을 실제 페이지에만 출력하기 위해 사용한다.
 */
export function availableLocalesForPath(path: string): readonly Locale[] {
  const segments = path.split('/').filter(Boolean);

  // 사이트 공통 페이지: 모든 로케일에 존재한다.
  if (segments.length === 0) return locales;

  const [first, second] = segments;

  if (first === 'guide') {
    if (!second) return locales;
    return findGuideBySlug(second)?.locales ?? locales;
  }

  // /tools, /category/..., /about 등 정적 페이지
  if (
    first === 'tools' ||
    first === 'category' ||
    first === 'about' ||
    first === 'contact' ||
    first === 'privacy' ||
    first === 'terms' ||
    first === 'disclaimer'
  ) {
    return locales;
  }

  // 나머지 1단 경로는 도구 상세로 간주한다.
  if (segments.length === 1 && first) {
    return findToolBySlug(first)?.locales ?? locales;
  }

  return locales;
}

/** '/ko/unit-price' → '/unit-price' */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const [first] = segments;
  if (first && (locales as readonly string[]).includes(first)) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return pathname === '' ? '/' : pathname;
}
