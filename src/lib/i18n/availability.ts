import { locales, type Locale } from '@/lib/i18n/config';
import { findToolBySlug, toolsByCategory } from '@/lib/tools/definitions';
import { findCategoryBySlug } from '@/lib/tools/categories';
import { findGuideBySlug } from '@/lib/guides';
import { findLifeArticleBySlug, hasLifeContent, lifeArticlesByCategory } from '@/lib/life';
import { findLifeCategoryBySlug } from '@/lib/life/categories';

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

  // 생활백과: 허브 / 카테고리 / 문서 각각 존재하는 로케일이 다르다.
  if (first === 'life') {
    if (!second) return locales.filter((locale) => hasLifeContent(locale));

    const third = segments[2];
    if (third) {
      return findLifeArticleBySlug(third)?.locales ?? locales;
    }

    const category = findLifeCategoryBySlug(second);
    if (!category) return locales;
    return locales.filter((locale) => lifeArticlesByCategory(category.id, locale).length > 0);
  }

  if (first === 'guide') {
    if (!second) return locales;
    return findGuideBySlug(second)?.locales ?? locales;
  }

  // 카테고리 허브: 그 로케일에 도구가 있는 언어에만 존재한다.
  if (first === 'category') {
    if (!second) return locales;
    const category = findCategoryBySlug(second);
    if (!category) return locales;
    return locales.filter((locale) => toolsByCategory(category.id, locale).length > 0);
  }

  // /tools, /about 등 모든 로케일에 존재하는 정적 페이지
  if (
    first === 'tools' ||
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
