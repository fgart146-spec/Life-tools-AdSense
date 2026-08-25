import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, localePath, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import { categoryPath, findCategoryBySlug } from '@/lib/tools/categories';
import { categoriesForLocale, toolsByCategory } from '@/lib/tools/definitions';
import { listTools } from '@/lib/tools/registry';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ToolCardGrid } from '@/components/tool/ToolCard';

export function generateStaticParams() {
  // 도구가 없는 로케일/카테고리 조합은 라우트를 만들지 않는다(빈 페이지 방지).
  return locales.flatMap((locale) =>
    categoriesForLocale(locale).map((category) => ({ locale, category: category.slug })),
  );
}

export const dynamicParams = false;

interface PageParams {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;
  if (!isLocale(locale)) return {};
  const category = findCategoryBySlug(categorySlug);
  if (!category) return {};
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    title: `${category.label[locale]} ${dict.category.metaTitleSuffix}`,
    description: category.description[locale],
    path: categoryPath(category),
    // 도구가 없는 로케일에는 라우트가 없으므로 hreflang에서도 뺀다.
    availableLocales: locales.filter((item) => toolsByCategory(category.id, item).length > 0),
  });
}

export default async function CategoryPage({ params }: PageParams) {
  const { locale: rawLocale, category: categorySlug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const category = findCategoryBySlug(categorySlug);
  if (!category) notFound();

  const dict = getDictionary(locale);
  const tools = listTools(locale, { category: category.id });
  const others = categoriesForLocale(locale).filter((item) => item.id !== category.id);

  const breadcrumbItems = [
    { name: dict.common.home, path: '/' },
    { name: category.label[locale] },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbJsonLd(locale, [
              { name: dict.common.home, path: '/' },
              { name: category.label[locale], path: categoryPath(category) },
            ]),
          ),
        }}
      />

      <Container className="py-6 sm:py-8">
        <Breadcrumbs locale={locale} items={breadcrumbItems} label={dict.breadcrumb.label} />

        <header className="mt-4">
          <h1 className="text-2xl font-bold sm:text-3xl">
            <span aria-hidden="true" className="mr-2">
              {category.emoji}
            </span>
            {category.label[locale]} {dict.category.metaTitleSuffix}
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-600">
            {category.description[locale]}
          </p>
        </header>

        {tools.length > 0 && (
          <section className="mt-8">
            <h2 className="sr-only">{dict.category.toolsInCategory}</h2>
            <ToolCardGrid locale={locale} tools={tools} columns={3} />
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-lg font-bold">{dict.category.otherCategories}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((item) => (
              <li key={item.id}>
                <Link
                  href={localePath(locale, categoryPath(item))}
                  className="flex min-h-11 items-center gap-2 rounded-full border border-ink-200 bg-white px-4 text-sm font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700"
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  {item.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
