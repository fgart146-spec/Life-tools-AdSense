import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import type { SitePageContentMap } from '@/content/site-pages/types';
import { SitePageView } from '@/components/layout/SitePageView';

/**
 * 소개·문의·약관 등 정적 페이지의 라우트 구현을 한 곳에서 만든다.
 * 각 라우트 파일은 콘텐츠와 경로만 지정하면 된다.
 */
export function createSitePage(content: SitePageContentMap, path: string) {
  function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
  }

  async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    const page = content[locale];
    return buildMetadata({
      locale,
      title: page.seoTitle,
      description: page.seoDescription,
      path,
    });
  }

  async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;
    if (!isLocale(rawLocale)) notFound();
    const locale: Locale = rawLocale;
    const dict = getDictionary(locale);
    const page = content[locale];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              breadcrumbJsonLd(locale, [
                { name: dict.common.home, path: '/' },
                { name: page.title, path },
              ]),
            ),
          }}
        />
        <SitePageView locale={locale} dict={dict} content={page} />
      </>
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
