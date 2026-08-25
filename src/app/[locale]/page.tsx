import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, localePath, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { buildMetadata } from '@/lib/seo/metadata';
import { serializeJsonLd, webSiteJsonLd } from '@/lib/seo/jsonld';
import { categoryPath, orderedCategories } from '@/lib/tools/categories';
import { listTools } from '@/lib/tools/registry';
import { listGuides } from '@/lib/guides/registry';
import { getSeasonalToolIds } from '@/lib/admin/seasonal';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ToolCardGrid } from '@/components/tool/ToolCard';

/** 시즌 추천이 달마다 바뀌므로 하루 한 번 재생성한다(요청당 서버 연산 없음). */
export const revalidate = 86400;

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
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
    path: '/',
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const allTools = listTools(locale);
  const popular = listTools(locale, { limit: 8 });
  // 시즌 구성은 관리자 설정이 있으면 그것을, 없으면 코드 기본값을 사용한다.
  // 조회는 정적 생성/재생성 시점에만 발생한다.
  const seasonalIds = await getSeasonalToolIds(new Date().getMonth() + 1);
  const seasonal = listTools(locale, { ids: seasonalIds, limit: 4 });
  const quickActions = dict.home.quickActions.filter((action) =>
    allTools.some((tool) => tool.id === action.toolId),
  );
  const guides = listGuides(locale, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(webSiteJsonLd(locale)) }}
      />

      <div className="border-b border-ink-200 bg-white">
        <Container className="py-10 sm:py-14">
          <h1 className="text-3xl font-bold sm:text-4xl">{dict.home.heading}</h1>
          <p className="mt-3 max-w-2xl text-base text-ink-600 sm:text-lg">
            {dict.home.subheading}
          </p>

          {quickActions.length > 0 && (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((action) => {
                const tool = allTools.find((item) => item.id === action.toolId);
                if (!tool) return null;
                return (
                  <li key={action.toolId}>
                    <Link
                      href={localePath(locale, `/${tool.slug}`)}
                      className="flex min-h-14 items-center gap-3 rounded-[var(--radius-card)] border border-ink-200 bg-white px-4 py-3 text-base font-semibold text-ink-800 transition-colors hover:border-brand-400 hover:bg-brand-50"
                    >
                      <span aria-hidden="true" className="text-xl">
                        {action.emoji}
                      </span>
                      {action.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </div>

      <Container className="pb-4">
        {seasonal.length > 0 && (
          <Section title={dict.home.seasonalTitle} description={dict.home.seasonalNote}>
            <ToolCardGrid locale={locale} tools={seasonal} columns={4} />
          </Section>
        )}

        {popular.length > 0 && (
          <Section
            title={dict.home.popularTitle}
            action={
              <Link
                href={localePath(locale, '/tools')}
                className="shrink-0 text-sm font-medium text-brand-700 hover:underline"
              >
                {dict.home.allToolsCta}
              </Link>
            }
          >
            <ToolCardGrid locale={locale} tools={popular} columns={4} />
          </Section>
        )}

        <Section title={dict.home.categoriesTitle}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {orderedCategories.map((category) => {
              const count = listTools(locale, { category: category.id }).length;
              return (
                <li key={category.id}>
                  <Link
                    href={localePath(locale, categoryPath(category))}
                    className="flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <span className="flex items-center gap-2 text-lg font-semibold text-ink-900">
                      <span aria-hidden="true">{category.emoji}</span>
                      {category.label[locale]}
                      {count > 0 && (
                        <span className="text-sm font-normal text-ink-400">
                          {count}
                          {locale === 'ko' ? '개' : ''}
                        </span>
                      )}
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

        {guides.length > 0 && (
          <Section
            title={dict.home.guidesTitle}
            action={
              <Link
                href={localePath(locale, '/guide')}
                className="shrink-0 text-sm font-medium text-brand-700 hover:underline"
              >
                {dict.common.viewAll}
              </Link>
            }
          >
            <ul className="grid gap-3 sm:grid-cols-2">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={localePath(locale, `/guide/${guide.slug}`)}
                    className="flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <span className="text-base font-semibold text-ink-900">{guide.title}</span>
                    <span className="mt-2 text-sm leading-relaxed text-ink-500">
                      {guide.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title={dict.home.trustTitle}>
          <ul className="grid gap-4 sm:grid-cols-3">
            {dict.home.trustPoints.map((point) => (
              <li
                key={point.title}
                className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-5"
              >
                <h3 className="text-base font-semibold text-ink-900">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{point.body}</p>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </>
  );
}
