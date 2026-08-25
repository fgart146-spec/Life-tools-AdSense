/**
 * 사이트 브랜드/도메인 단일 소스.
 * 브랜드명·도메인·연락처·광고 슬롯을 바꿀 때 이 파일(또는 환경변수)만 수정한다.
 * 다른 파일에서 도메인이나 사이트명을 하드코딩하지 않는다.
 */
import type { Locale } from '@/lib/i18n/config';

// 환경변수에 공백/개행이 섞여 들어와도 URL이 오염되지 않게 정리한다.
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000';

export const siteConfig = {
  /** 로케일별 표시 브랜드명 */
  brand: {
    ko: process.env.NEXT_PUBLIC_SITE_NAME ?? '생활계산소',
    en: 'LifeCalc',
    ja: '生活計算所',
  } satisfies Record<Locale, string>,
  /** 마지막 슬래시를 제거한 절대 URL */
  url: rawUrl.replace(/\/+$/, ''),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@example.com',
  /** 운영 주체 표기 (About/Privacy/Terms에 사용) */
  publisher: 'LifeCalc',
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
    naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ?? '',
  },
  ads: {
    client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? '',
    slots: {
      toolTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_TOP ?? '',
      toolMiddle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_MIDDLE ?? '',
      toolBottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM ?? '',
      content: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT ?? '',
    },
  },
} as const;

export type AdSlotName = keyof typeof siteConfig.ads.slots;

export function brandName(locale: Locale): string {
  return siteConfig.brand[locale];
}

/** 절대 URL 생성. path는 항상 앞에 슬래시를 포함한다. */
export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}
