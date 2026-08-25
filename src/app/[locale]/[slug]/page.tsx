import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  breadcrumbJsonLd,
  faqJsonLd,
  serializeJsonLd,
  toolJsonLd,
} from '@/lib/seo/jsonld';
import { categories, categoryPath } from '@/lib/tools/categories';
import { findToolBySlug } from '@/lib/tools/definitions';
import { getToolModule, listTools, toolRouteParams } from '@/lib/tools/registry';
import { listGuideLinks } from '@/lib/guides/registry';
import { getEffectiveBasis } from '@/lib/admin/basis';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { ToolCardGrid } from '@/components/tool/ToolCard';
import { LifeCardGrid } from '@/components/life/LifeCard';
import { lifeArticlesForTool } from '@/lib/life/registry';
import {
  ExampleSection,
  FaqSection,
  FormulaSection,
  HowItWorksSection,
  NotesSection,
  RelatedGuides,
  SourceInfo,
} from '@/components/tool/sections';

/** 공개된 도구 × 본문이 있는 로케일만 정적 생성한다. */
export function generateStaticParams() {
  return toolRouteParams();
}

/** 목록에 없는 slug는 404 (준비중 페이지를 만들지 않는다). */
export const dynamicParams = false;

interface PageParams {
  params: Promise<{ locale: string; slug: string }>;
}

function resolve(locale: Locale, slug: string) {
  const definition = findToolBySlug(slug);
  if (!definition || definition.status !== 'published') return null;
  if (!definition.locales.includes(locale)) return null;

  const toolModule = getToolModule(definition.id);
  const content = toolModule?.content[locale];
  if (!toolModule || !content) return null;

  return { definition, module: toolModule, content };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const resolved = resolve(locale, slug);
  if (!resolved) return {};

  return buildMetadata({
    locale,
    title: resolved.content.seoTitle,
    description: resolved.content.seoDescription,
    path: `/${slug}`,
    availableLocales: resolved.definition.locales,
  });
}

export default async function ToolPage({ params }: PageParams) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const resolved = resolve(locale, slug);
  if (!resolved) notFound();

  const { definition, module: toolModule, content } = resolved;
  const dict = getDictionary(locale);
  const category = categories[definition.category];
  const relatedTools = listTools(locale, { ids: definition.related, limit: 6 });
  const relatedGuides = listGuideLinks(locale, content.relatedGuides);
  // 이 도구를 relatedTools로 선언한 생활백과 문서 (억지 연결 없음)
  const relatedLife = lifeArticlesForTool(definition.id, locale, 3);
  // 관리자 기준값은 정적 생성 시점에만 조회한다(사용자 요청마다 조회하지 않는다).
  const basis = await getEffectiveBasis();

  const breadcrumbItems = [
    { name: dict.common.home, path: '/' },
    { name: category.label[locale], path: categoryPath(category) },
    { name: content.title },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbJsonLd(
              locale,
              breadcrumbItems.map((item) => ({
                name: item.name,
                path: item.path ?? `/${slug}`,
              })),
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            toolJsonLd({
              locale,
              name: content.title,
              description: content.seoDescription,
              path: `/${slug}`,
              category: category.label[locale],
            }),
          ),
        }}
      />
      {content.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(content.faq)) }}
        />
      )}

      <Container className="py-6 sm:py-8">
        <Breadcrumbs locale={locale} items={breadcrumbItems} label={dict.breadcrumb.label} />

        <header className="mt-4">
          <h1 className="flex items-start gap-2.5 text-[1.625rem] font-bold leading-tight sm:text-[2rem]">
            <span aria-hidden="true" className="shrink-0 leading-none">
              {definition.emoji}
            </span>
            <span className="min-w-0">{content.title}</span>
          </h1>
          <p className="mt-2.5 max-w-2xl text-base leading-relaxed text-ink-600">{content.lead}</p>
        </header>

        {/* 계산기: 이 페이지에서 가장 먼저 눈에 들어와야 한다. */}
        <div className="mt-6">{toolModule.render(locale, { basis })}</div>

        {/* 광고는 계산기/결과 다음에만 배치한다 (계산 흐름을 방해하지 않는다) */}
        <AdSlot name="toolTop" />

        {/*
          설명 영역은 읽기 좋은 폭으로 좁힌다.
          계산기는 넓게, 본문은 좁게 두어 '도구 → 읽을거리'의 전환이 시각적으로 드러난다.
        */}
        <div className="mx-auto max-w-3xl">
          <HowItWorksSection title={dict.tool.sectionHowItWorks} items={content.howItWorks} />
          <FormulaSection title={dict.tool.sectionFormula} lines={content.formula} />
          <ExampleSection title={dict.tool.sectionExample} example={content.example} />

          <AdSlot name="toolMiddle" />

          <NotesSection title={dict.tool.sectionNotes} items={content.notes} />
          <FaqSection title={dict.tool.sectionFaq} items={content.faq} />
        </div>

        {relatedTools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold sm:text-[1.5rem]">{dict.tool.sectionRelatedTools}</h2>
            <div className="mt-3.5">
              <ToolCardGrid locale={locale} tools={relatedTools} columns={3} />
            </div>
          </section>
        )}

        {relatedLife.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold sm:text-[1.5rem]">{dict.life.homeSectionTitle}</h2>
            <p className="mt-1.5 text-sm text-ink-500">{dict.life.homeSectionNote}</p>
            <div className="mt-3.5">
              <LifeCardGrid locale={locale} articles={relatedLife} columns={3} />
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl">
          <RelatedGuides
            locale={locale}
            title={dict.tool.sectionRelatedGuides}
            guides={relatedGuides}
          />

          <SourceInfo
            locale={locale}
            dict={dict}
            updatedAt={definition.updatedAt}
            basisDate={content.basisDate}
            sources={content.sources}
          />
        </div>

        <AdSlot name="toolBottom" />
      </Container>
    </>
  );
}
