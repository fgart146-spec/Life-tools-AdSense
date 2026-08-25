import type { Metadata } from 'next';
import { absoluteUrl, brandName, siteConfig } from '@/config/site';
import { defaultLocale, localeMeta, localePath, locales, type Locale } from '@/lib/i18n/config';

export interface PageMetadataInput {
  locale: Locale;
  /** <title>에 들어갈 문구. 브랜드명은 템플릿이 붙인다. */
  title: string;
  description: string;
  /** 로케일 접두사를 제외한 경로. 예: '/unit-price', '/' */
  path: string;
  /** 이 페이지가 실제로 존재하는 로케일 목록. hreflang은 여기에만 출력한다. */
  availableLocales?: readonly Locale[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  /** 브랜드 접미사를 붙이지 않을 때 (예: 홈) */
  absoluteTitle?: boolean;
}

/**
 * 모든 공개 페이지의 metadata는 이 함수를 통해 만든다.
 * canonical / hreflang / OG / Twitter를 한 곳에서 일관되게 생성하기 위함이다.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path,
  availableLocales = locales,
  type = 'website',
  publishedTime,
  modifiedTime,
  noIndex = false,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(localePath(locale, path));
  const brand = brandName(locale);

  const languages: Record<string, string> = {};
  for (const candidate of availableLocales) {
    languages[localeMeta[candidate].htmlLang] = absoluteUrl(localePath(candidate, path));
  }
  // x-default는 기본 로케일(ko) 페이지. 해당 로케일이 없으면 첫 번째 가용 로케일.
  const fallbackLocale = availableLocales.includes(defaultLocale)
    ? defaultLocale
    : availableLocales[0];
  if (fallbackLocale) {
    languages['x-default'] = absoluteUrl(localePath(fallbackLocale, path));
  }

  return {
    title: absoluteTitle ? { absolute: `${title} | ${brand}` } : title,
    description,
    alternates: { canonical, languages },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      title: `${title} | ${brand}`,
      description,
      url: canonical,
      siteName: brand,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: availableLocales
        .filter((item) => item !== locale)
        .map((item) => localeMeta[item].ogLocale),
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${brand}`,
      description,
    },
  };
}

/** 루트(로케일) 레이아웃에서 쓰는 기본 metadata */
export function buildRootMetadata(locale: Locale): Metadata {
  const brand = brandName(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: brand,
      template: `%s | ${brand}`,
    },
    applicationName: brand,
    referrer: 'strict-origin-when-cross-origin',
    formatDetection: { telephone: false, address: false, email: false },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    verification: {
      ...(siteConfig.verification.google ? { google: siteConfig.verification.google } : {}),
      ...(siteConfig.verification.naver
        ? { other: { 'naver-site-verification': siteConfig.verification.naver } }
        : {}),
    },
  };
}
