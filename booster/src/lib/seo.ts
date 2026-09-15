import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/config/site';

/**
 * 페이지 메타데이터를 한 곳에서 만든다.
 * - canonical / og:url 은 항상 정식 주소(productionUrl)다.
 * - 운영 환경이 아니면 noindex 를 건다 (헤더·robots.txt 와 함께 3중으로).
 */
export function buildMetadata({
  title,
  description,
  path,
  type = 'website',
}: {
  title: string;
  description: string;
  /** 후행 슬래시 포함 ('/features/'). 홈은 '/' */
  path: string;
  type?: 'website' | 'article';
}): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: siteConfig.isIndexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: 'ko_KR',
      images: [
        {
          url: absoluteUrl('/opengraph-image/'),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl('/opengraph-image/')],
    },
  };
}

/* ---------------------------------------------------------------------------
 * 구조화 데이터. 화면에 실제로 있는 것만 만든다 (별점·후기·가격·Offer 없음).
 * ------------------------------------------------------------------------- */

export function serializeJsonLd(data: unknown): string {
  // </script> 로 스크립트가 닫히는 것을 막는다.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: `${siteConfig.productionUrl}/`,
    inLanguage: 'ko',
    description: siteConfig.description,
  };
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(entries: BreadcrumbEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
