import { absoluteUrl, brandName } from '@/config/site';
import { localePath, type Locale } from '@/lib/i18n/config';

/** JSON-LD 직렬화. XSS 방지를 위해 '<'를 이스케이프한다. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\u003c');
}

export interface BreadcrumbEntry {
  name: string;
  /** 로케일 접두사를 제외한 경로 */
  path: string;
}

export function breadcrumbJsonLd(locale: Locale, entries: BreadcrumbEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(localePath(locale, entry.path)),
    })),
  };
}

export function webSiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brandName(locale),
    url: absoluteUrl(localePath(locale, '/')),
    inLanguage: locale,
  };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/** 페이지에 실제로 표시되는 FAQ만 넘긴다(리치리절트용 가짜 FAQ 금지). */
export function faqJsonLd(entries: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}

export function toolJsonLd(options: {
  locale: Locale;
  name: string;
  description: string;
  path: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: options.name,
    description: options.description,
    url: absoluteUrl(localePath(options.locale, options.path)),
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: options.category,
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    inLanguage: options.locale,
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}

export function articleJsonLd(options: {
  locale: Locale;
  headline: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    mainEntityOfPage: absoluteUrl(localePath(options.locale, options.path)),
    datePublished: options.publishedAt,
    dateModified: options.updatedAt,
    inLanguage: options.locale,
    publisher: {
      '@type': 'Organization',
      name: brandName(options.locale),
      url: absoluteUrl(localePath(options.locale, '/')),
    },
    author: {
      '@type': 'Organization',
      name: brandName(options.locale),
    },
  };
}
