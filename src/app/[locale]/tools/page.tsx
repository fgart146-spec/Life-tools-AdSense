import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, localePath, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import { categoryPath, orderedCategories } from '@/lib/tools/categories';
import { listTools } from '@/lib/tools/registry';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ToolCardGrid } from '@/components/tool/ToolCard';

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
    title: dict.toolsIndex.metaTitle,
    description: dict.toolsIndex.metaDescription,
    path: '/tools',
  });
}

export default async function ToolsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const groups = orderedCategories
    .map((category) => ({
      category,
      tools: listTools(locale, { category: category.id }),
    }))
    .filter((group) => group.tools.length > 0);

  const total = groups.reduce((sum, group) => sum + group.tools.length, 0);

  const breadcrumbItems = [
    { name: dict.common.home, path: '/' },
    { name: dict.toolsIndex.heading },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbJsonLd(locale, [
              { name: dict.common.home, path: '/' },
              { name: dict.toolsIndex.heading, path: '/tools' },
            ]),
          ),
        }}
      />

      <Container className="py-6 sm:py-8">
        <Breadcrumbs locale={locale} items={breadcrumbItems} label={dict.breadcrumb.label} />

        <header className="mt-4">
          <h1 className="text-2xl font-bold sm:text-3xl">{dict.toolsIndex.heading}</h1>
          <p className="mt-2 max-w-2xl text-base text-ink-600">{dict.toolsIndex.lead}</p>
          {total > 0 && (
            <p className="mt-1 text-sm text-ink-400">
              {total} {dict.toolsIndex.countLabel}
            </p>
          )}
        </header>

        <nav aria-label={dict.nav.categories} className="mt-6 flex flex-wrap gap-2">
          {groups.map((group) => (
            <a
              key={group.category.id}
              href={`#${group.category.slug}`}
              className="rounded-full border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700"
            >
              <span aria-hidden="true" className="mr-1">
                {group.category.emoji}
              </span>
              {group.category.label[locale]}
            </a>
          ))}
        </nav>

        {groups.map((group) => (
          <section key={group.category.id} id={group.category.slug} className="mt-10 scroll-mt-20">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  <span aria-hidden="true" className="mr-2">
                    {group.category.emoji}
                  </span>
                  {group.category.label[locale]}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-ink-500">
                  {group.category.description[locale]}
                </p>
              </div>
              <Link
                href={localePath(locale, categoryPath(group.category))}
                className="shrink-0 text-sm font-medium text-brand-700 hover:underline"
              >
                {dict.common.viewAll}
              </Link>
            </div>
            <ToolCardGrid locale={locale} tools={group.tools} columns={3} />
          </section>
        ))}
      </Container>
    </>
  );
}
