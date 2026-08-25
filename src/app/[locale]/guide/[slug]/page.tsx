import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary, interpolate } from '@/lib/i18n/dictionary';
import { formatDate } from '@/lib/format/number';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  serializeJsonLd,
} from '@/lib/seo/jsonld';
import { categories } from '@/lib/tools/categories';
import { listTools } from '@/lib/tools/registry';
import { findGuideBySlug } from '@/lib/guides';
import { getGuide, guideRouteParams, readingMinutes } from '@/lib/guides/registry';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { ToolCardGrid } from '@/components/tool/ToolCard';
import { FaqSection } from '@/components/tool/sections';

export function generateStaticParams() {
  return guideRouteParams();
}

export const dynamicParams = false;

interface PageParams {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const guide = getGuide(slug);
  const content = guide?.content[locale];
  if (!guide || !content) return {};

  return buildMetadata({
    locale,
    title: content.seoTitle,
    description: content.seoDescription,
    path: `/guide/${slug}`,
    availableLocales: guide.meta.locales,
    type: 'article',
    publishedTime: guide.meta.publishedAt,
    modifiedTime: guide.meta.updatedAt,
  });
}

export default async function GuidePage({ params }: PageParams) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const guide = getGuide(slug);
  const meta = findGuideBySlug(slug);
  const content = guide?.content[locale];
  if (!guide || !meta || !content) notFound();

  const dict = getDictionary(locale);
  const category = categories[meta.category];
  const relatedTools = listTools(locale, { ids: meta.relatedTools, limit: 6 });
  const minutes = readingMinutes(content, locale);

  const breadcrumbItems = [
    { name: dict.common.home, path: '/' },
    { name: dict.guide.indexHeading, path: '/guide' },
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
              { name: dict.guide.indexHeading, path: '/guide' },
              { name: content.title, path: `/guide/${slug}` },
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
              path: `/guide/${slug}`,
              publishedAt: meta.publishedAt,
              updatedAt: meta.updatedAt,
            }),
          ),
        }}
      />
      {content.faq && content.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(content.faq)) }}
        />
      )}

      <Container size="narrow" className="py-6 sm:py-8">
        <Breadcrumbs locale={locale} items={breadcrumbItems} label={dict.breadcrumb.label} />

        <article className="mt-4">
          <header>
            <p className="text-sm font-medium text-brand-700">{category.label[locale]}</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{content.title}</h1>
            <p className="mt-3 text-base leading-relaxed text-ink-600">{content.lead}</p>
            <p className="mt-3 text-sm text-ink-500">
              {dict.guide.updatedAt} {formatDate(meta.updatedAt, locale)} ·{' '}
              {interpolate(dict.guide.readingTime, { minutes })}
            </p>
          </header>

          {content.takeaways.length > 0 && (
            <div className="mt-6 rounded-[var(--radius-card)] border border-brand-200 bg-brand-50/60 p-4 sm:p-5">
              <h2 className="text-sm font-semibold text-brand-800">
                {dict.guide.tableOfContents}
              </h2>
              <ul className="mt-2 grid gap-2">
                {content.takeaways.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                    <span aria-hidden="true" className="text-brand-500">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <AdSlot name="content" />

          <div className="mt-8 grid gap-8">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold sm:text-2xl">{section.heading}</h2>
                <div className="mt-3 grid gap-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed text-ink-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-3 grid gap-2 rounded-[var(--radius-card)] border border-ink-200 bg-white p-4">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-ink-700">
                        <span aria-hidden="true" className="mt-1 text-brand-500">
                          ✓
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {content.faq && content.faq.length > 0 && (
            <FaqSection title={dict.tool.sectionFaq} items={content.faq} />
          )}
        </article>

        <AdSlot name="content" />

        {relatedTools.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold sm:text-2xl">{dict.guide.relatedTools}</h2>
            <div className="mt-3">
              <ToolCardGrid locale={locale} tools={relatedTools} columns={2} />
            </div>
          </section>
        )}

        <p className="mt-10 rounded-[var(--radius-card)] border border-ink-200 bg-ink-100/60 p-4 text-sm leading-relaxed text-ink-600">
          {dict.tool.disclaimer}
        </p>
      </Container>
    </>
  );
}
