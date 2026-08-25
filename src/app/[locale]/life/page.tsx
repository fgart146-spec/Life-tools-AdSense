import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, localePath, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary, interpolate } from '@/lib/i18n/dictionary';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import { LIFE_BASE_PATH, lifeCategoryPath } from '@/lib/life/categories';
import {
  hasLifeContent,
  lifeArticlesByCategory,
  lifeCategoriesForLocale,
  lifeLocales,
} from '@/lib/life';
import { buildLifeSearchIndex, listLifeArticles } from '@/lib/life/registry';
import { lifePlaceLabels, lifeProblemLabels } from '@/lib/life/types';
import { listTools } from '@/lib/tools/registry';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LifeCardGrid } from '@/components/life/LifeCard';
import { LifeFinder } from '@/components/life/LifeFinder';
import { ToolCardGrid } from '@/components/tool/ToolCard';
import { seasonalLifeSlugs } from '@/lib/life/seasonal';

/** 시즌 추천이 달마다 바뀌므로 하루 한 번 재생성한다(요청당 서버 연산 없음). */
export const revalidate = 86400;

/** 생활백과 콘텐츠가 있는 로케일에만 라우트를 만든다. */
export function generateStaticParams() {
  return lifeLocales().map((locale) => ({ locale }));
}

export const dynamicParams = false;

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
    title: dict.life.indexMetaTitle,
    description: dict.life.indexMetaDescription,
    path: LIFE_BASE_PATH,
    availableLocales: locales.filter((item) => hasLifeContent(item)),
    absoluteTitle: true,
  });
}

export default async function LifeHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  if (!hasLifeContent(locale)) notFound();

  const dict = getDictionary(locale);
  const categories = lifeCategoriesForLocale(locale);
  const all = listLifeArticles(locale);
  const popular = listLifeArticles(locale, { limit: 6 });
  const seasonal = listLifeArticles(locale, {
    slugs: seasonalLifeSlugs(new Date().getMonth() + 1),
    limit: 3,
  });
  const searchIndex = buildLifeSearchIndex(locale);

  const placeOptions = (['clothes', 'kitchen', 'bathroom', 'appliance', 'etc'] as const)
    .filter((place) => searchIndex.some((entry) => entry.places.includes(place)))
    .map((place) => ({ id: place, label: lifePlaceLabels[place][locale] }));
  const problemOptions = (['stain', 'smell', 'mold', 'grease', 'wash', 'store'] as const)
    .filter((problem) => searchIndex.some((entry) => entry.problems.includes(problem)))
    .map((problem) => ({ id: problem, label: lifeProblemLabels[problem][locale] }));

  // 계산기 축으로 넘어가는 연결 (얼마지? ↔ 어떻게 하지?)
  const bridgeTools = listTools(locale, {
    ids: ['appliance-electricity', 'electricity-cost', 'living-cost', 'moving-cost'],
    limit: 4,
  });

  const breadcrumbItems = [
    { name: dict.common.home, path: '/' },
    { name: dict.life.indexHeading },
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
            ]),
          ),
        }}
      />

      <div className="border-b border-ink-200 bg-white">
        <Container className="py-8 sm:py-12">
          <Breadcrumbs locale={locale} items={breadcrumbItems} label={dict.breadcrumb.label} />
          <h1 className="mt-4 text-[1.75rem] font-bold leading-tight sm:text-[2.25rem]">
            {dict.life.indexHeading}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
            {dict.life.indexLead}
          </p>

          <nav aria-label={dict.life.categoriesHeading} className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={localePath(locale, lifeCategoryPath(category))}
                    className="flex min-h-11 items-center gap-2 rounded-full border border-ink-200 bg-white px-4 text-[0.9375rem] font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    <span aria-hidden="true">{category.emoji}</span>
                    {category.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      <Container className="pb-6">
        <div className="mt-8">
          <LifeFinder
            locale={locale}
            dict={dict}
            entries={searchIndex}
            placeOptions={placeOptions}
            problemOptions={problemOptions}
          />
        </div>

        {seasonal.length > 0 && (
          <Section title={dict.life.seasonalHeading} description={dict.life.seasonalNote}>
            <LifeCardGrid locale={locale} articles={seasonal} columns={3} />
          </Section>
        )}

        <Section title={dict.life.popularHeading}>
          <LifeCardGrid locale={locale} articles={popular} columns={3} />
        </Section>

        <Section title={dict.life.categoriesHeading}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const count = lifeArticlesByCategory(category.id, locale).length;
              return (
                <li key={category.id}>
                  <Link
                    href={localePath(locale, lifeCategoryPath(category))}
                    className="flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/30"
                  >
                    <span className="flex items-center gap-2 text-[1.0625rem] font-bold text-ink-900">
                      <span aria-hidden="true">{category.emoji}</span>
                      <span className="min-w-0">{category.label[locale]}</span>
                      <span className="shrink-0 text-sm font-normal text-ink-500">{count}</span>
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-ink-500">
                      {category.description[locale]}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>

        {bridgeTools.length > 0 && (
          <Section
            title={dict.life.relatedTools}
            action={
              <Link
                href={localePath(locale, '/tools')}
                className="-mr-2 flex min-h-11 shrink-0 items-center rounded-lg px-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              >
                {dict.common.viewAll}
              </Link>
            }
          >
            <ToolCardGrid locale={locale} tools={bridgeTools} columns={4} />
          </Section>
        )}

        <p className="mt-10 text-sm text-ink-500">
          {interpolate(dict.life.articleCount, { count: all.length })}
        </p>
      </Container>
    </>
  );
}
