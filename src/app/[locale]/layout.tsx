import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import { isLocale, localeMeta, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { buildRootMetadata } from '@/lib/seo/metadata';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { AdSenseScript } from '@/components/ads/AdSenseScript';

/** 로케일 세그먼트를 루트 레이아웃으로 사용한다 → <html lang>을 로케일별로 정확히 출력. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** 정의된 로케일 외에는 정적 생성/렌더하지 않는다. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildRootMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <html lang={localeMeta[locale].htmlLang}>
      <body className="flex min-h-screen flex-col bg-ink-50 text-ink-800">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
        >
          {dict.common.skipToContent}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
        <GoogleAnalytics />
        <AdSenseScript />
      </body>
    </html>
  );
}
