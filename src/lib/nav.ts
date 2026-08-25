import type { Dictionary } from '@/lib/i18n/types';

/** 푸터/사이트맵이 함께 사용하는 정적 페이지 목록 */
export type StaticPageKey = 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer';

export interface StaticPage {
  key: StaticPageKey;
  path: string;
}

export const staticPages: readonly StaticPage[] = [
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
  { key: 'privacy', path: '/privacy' },
  { key: 'terms', path: '/terms' },
  { key: 'disclaimer', path: '/disclaimer' },
];

export function staticPageLabel(dict: Dictionary, key: StaticPageKey): string {
  return dict.footer[key];
}
