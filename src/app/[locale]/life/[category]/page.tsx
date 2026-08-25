import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, localePath, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import {
  LIFE_BASE_PATH,
  findLifeCategoryBySlug,
  lifeCategoryPath,
} from '@/lib/life/categories';
import { lifeArticlesByCategory, lifeCategoriesForLocale, lifeLocales } from '@/lib/life';
import { listLifeArticles } from '@/lib/life/registry';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LifeCardGrid } from '@/components/life/LifeCard';

/** 문서가 있는 로케일 × 카테고리 조합만 생성한다 (빈 페이지 방지). */
export function generateStaticParams() {
  return lifeLocales().flatMap((locale) =>
    lifeCategoriesForLocale(locale).map((category) => ({ locale, category: category.slug })),
  );
}

export const dynamicParams = false;

interface PageParams {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;
  if (!isLocale(locale)) return {};
  const category = findLifeCategoryBySlug(categorySlug);
  if (!category) return {};
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    title: `${category.label[locale]} ${dict.life.categoryMetaTitleSuffix}`,
    description: category.description[locale],
    path: lifeCategoryPath(category),
    // 문서가 있는 로케일에만 hreflang을 출력한다.
    availableLocales: locales.filter(
      (item) => lifeArticlesByCategory(category.id, item).length > 0,
    ),
  });
}

export default async function LifeCategoryPage({ params }: PageParams) {
  const { locale: rawLocale, category: categorySlug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const category = findLifeCategoryBySlug(categorySlug);
  if (!category) notFound();

  const articles = listLifeArticles(locale, { category: category.slug });
  if (articles.length === 0) notFound();

  const dict = getDictionary(locale);
  const others = lifeCategoriesForLocale(locale).filter((item) => item.id !== category.id);

  const breadcrumbItems = [
    { name: dict.common.home, path: '/' },
    { name: dict.life.indexHeading, path: LIFE_BASE_PATH },
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
              { name: dict.life.indexHeading, path: LIFE_BASE_PATH },
              { name: category.label[locale], path: lifeCategoryPath(category) },
            ]),
          ),
        }}
      />

      <Container className="py-6 sm:py-8">
        <Breadcrumbs locale={locale} items={breadcrumbItems} label={dict.breadcrumb.label} />

        <header className="mt-4">
          <h1 className="flex items-start gap-2.5 text-[1.625rem] font-bold leading-tight sm:text-[2rem]">
            <span aria-hidden="true" className="shrink-0 leading-none">
              {category.emoji}
            </span>
            <span className="min-w-0">
              {category.label[locale]} {dict.life.categoryMetaTitleSuffix}
            </span>
          </h1>
          <p className="mt-2.5 max-w-2xl text-base leading-relaxed text-ink-600">
            {category.description[locale]}
          </p>
        </header>

        <section className="mt-8">
          <h2 className="sr-only">{dict.life.articlesInCategory}</h2>
          <LifeCardGrid locale={locale} articles={articles} columns={3} showCategory={false} />
        </section>

        {others.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-bold">{dict.life.otherCategories}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {others.map((item) => (
                <li key={item.id}>
                  <Link
                    href={localePath(locale, lifeCategoryPath(item))}
                    className="flex min-h-11 items-center gap-2 rounded-full border border-ink-200 bg-white px-4 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    <span aria-hidden="true">{item.emoji}</span>
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10">
          <Link
            href={localePath(locale, LIFE_BASE_PATH)}
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            {dict.life.backToLife}
          </Link>
        </p>
      </Container>
    </>
  );
}
