import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, localePath, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { formatDate } from '@/lib/format/number';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import { categories } from '@/lib/tools/categories';
import { listGuides } from '@/lib/guides/registry';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.guide.indexMetaTitle,
    description: dict.guide.indexMetaDescription,
    path: '/guide',
  });
}

export default async function GuideIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const guides = listGuides(locale);

  const breadcrumbItems = [
    { name: dict.common.home, path: '/' },
    { name: dict.guide.indexHeading },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbJsonLd(locale, [
              { name: dict.common.home, path: '/' },
              { name: dict.guide.indexHeading, path: '/guide' },
            ]),
          ),
        }}
      />
      <Container className="py-6 sm:py-8">
        <Breadcrumbs locale={locale} items={breadcrumbItems} label={dict.breadcrumb.label} />

        <header className="mt-4">
          <h1 className="text-2xl font-bold sm:text-3xl">{dict.guide.indexHeading}</h1>
          <p className="mt-2 max-w-2xl text-base text-ink-600">{dict.guide.indexLead}</p>
        </header>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={localePath(locale, `/guide/${guide.slug}`)}
                className="flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
              >
                <span className="text-xs font-medium text-brand-700">
                  {categories[guide.category].label[locale]}
                </span>
                <span className="mt-1 text-lg font-semibold text-ink-900">{guide.title}</span>
                <span className="mt-2 text-sm leading-relaxed text-ink-600">
                  {guide.description}
                </span>
                <span className="mt-3 text-xs text-ink-400">
                  {dict.guide.updatedAt} {formatDate(guide.updatedAt, locale)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
