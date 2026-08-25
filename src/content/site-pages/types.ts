import type { Locale } from '@/lib/i18n/config';

export interface SitePageSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface SitePageContent {
  title: string;
  seoTitle: string;
  seoDescription: string;
  lead: string;
  sections: SitePageSection[];
  /** 문서 기준일 (YYYY-MM-DD) */
  updatedAt: string;
}

export type SitePageContentMap = Record<Locale, SitePageContent>;

export const SITE_PAGE_UPDATED_AT = '2026-08-25';
