import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, localePath, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  serializeJsonLd,
} from '@/lib/seo/jsonld';
import {
  LIFE_BASE_PATH,
  lifeArticlePath,
  lifeCategories,
  lifeCategoryPath,
} from '@/lib/life/categories';
import {
  getLifeArticle,
  getLifeContent,
  lifeArticleRouteParams,
  relatedLifeArticles,
  relatedToolIdsFor,
} from '@/lib/life/registry';
import { listTools } from '@/lib/tools/registry';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { LifeCardGrid } from '@/components/life/LifeCard';
import { ToolCardGrid } from '@/components/tool/ToolCard';
import {
  CautionsSection,
  LifeFaqSection,
  LifeSourceInfo,
  LifeSummary,
  ProseListSection,
  QuickAnswerCard,
  SituationTipsSection,
  StepsSection,
  SuppliesSection,
} from '@/components/life/sections';

/** 본문이 있는 로케일의 문서만 라우트를 만든다. */
export function generateStaticParams() {
  return lifeArticleRouteParams();
}

export const dynamicParams = false;

interface PageParams {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

function resolve(locale: Locale, categorySlug: string, slug: string) {
  const article = getLifeArticle(slug);
  if (!article) return undefined;
  const category = lifeCategories[article.meta.category];
  // URL의 카테고리와 문서의 카테고리가 다르면 중복 URL이 되므로 허용하지 않는다.
  if (category.slug !== categorySlug) return undefined;
  const content = getLifeContent(slug, locale);
  if (!content) return undefined;
  return { article, category, content };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, category: categorySlug, slug } = await params;
  if (!isLocale(locale)) return {};
  const resolved = resolve(locale, categorySlug, slug);
  if (!resolved) return {};

  return buildMetadata({
    locale,
    title: resolved.content.seoTitle,
    description: resolved.content.seoDescription,
    path: lifeArticlePath(resolved.category.slug, slug),
    availableLocales: resolved.article.meta.locales,
    type: 'article',
    publishedTime: resolved.article.meta.publishedAt,
    modifiedTime: resolved.article.meta.updatedAt,
  });
}

export default async function LifeArticlePage({ params }: PageParams) {
  const { locale: rawLocale, category: categorySlug, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const resolved = resolve(locale, categorySlug, slug);
  if (!resolved) notFound();
  const { article, category, content } = resolved;

  const dict = getDictionary(locale);
  const path = lifeArticlePath(category.slug, slug);
  const related = relatedLifeArticles(slug, locale, 4);
  const toolIds = relatedToolIdsFor(slug, locale);
  const relatedTools = toolIds.length > 0 ? listTools(locale, { ids: toolIds, limit: 4 }) : [];

  const breadcrumbItems = [
    { name: dict.common.home, path: '/' },
    { name: dict.life.indexHeading, path: LIFE_BASE_PATH },
    { name: category.label[locale], path: lifeCategoryPath(category) },
    { name: content.title },
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
              { name: content.title, path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            articleJsonLd({
              locale,
              headline: content.title,
              description: content.seoDescription,
              path,
              publishedAt: article.meta.publishedAt,
              updatedAt: article.meta.updatedAt,
            }),
          ),
        }}
      />
      {content.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd([...content.faq])) }}
        />
      )}

      <Container className="py-6 sm:py-8">
        <Breadcrumbs locale={locale} items={breadcrumbItems} label={dict.breadcrumb.label} />

        <article className="mx-auto mt-4 max-w-3xl">
          <header>
            <h1 className="text-[1.625rem] font-bold leading-tight sm:text-[2rem]">
              {content.title}
            </h1>
            <LifeSummary text={content.summary} />
          </header>

          <QuickAnswerCard title={dict.life.quickAnswer} items={content.quickAnswer} />

          <SuppliesSection title={dict.life.supplies} items={content.supplies} />
          <StepsSection title={dict.life.steps} steps={content.steps} />

          {/* 광고는 해결 방법을 다 읽은 뒤에만 배치한다 (다음 단계처럼 보이지 않게) */}
          <AdSlot name="toolTop" />

          <CautionsSection
            title={dict.life.cautions}
            items={content.cautions}
            safetyNote={dict.life.safetyNote}
          />
          <SituationTipsSection title={dict.life.situationTips} tips={content.situationTips} />
          <ProseListSection id="cause" title={dict.life.cause} items={content.cause} />
          <ProseListSection
            id="prevention"
            title={dict.life.prevention}
            items={content.prevention}
            tone="brand"
          />

          <AdSlot name="toolMiddle" />

          <LifeFaqSection title={dict.life.faq} items={content.faq} />

          <LifeSourceInfo
            locale={locale}
            dict={dict}
            updatedAt={article.meta.updatedAt}
            sources={content.sources}
          />
        </article>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold sm:text-[1.5rem]">{dict.life.relatedArticles}</h2>
            <div className="mt-3.5">
              <LifeCardGrid locale={locale} articles={related} columns={4} />
            </div>
          </section>
        )}

        {relatedTools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold sm:text-[1.5rem]">{dict.life.relatedTools}</h2>
            <div className="mt-3.5">
              <ToolCardGrid locale={locale} tools={relatedTools} columns={4} />
            </div>
          </section>
        )}

        <p className="mt-10">
          <Link
            href={localePath(locale, lifeCategoryPath(category))}
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            {category.label[locale]} {dict.life.categoryMetaTitleSuffix}
          </Link>
        </p>

        <AdSlot name="toolBottom" />
      </Container>
    </>
  );
}
