import { formatDate } from '@/lib/format/number';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/types';
import type { SitePageContent } from '@/content/site-pages/types';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

/** 소개·문의·약관 등 정적 페이지 공통 렌더러 */
export function SitePageView({
  locale,
  dict,
  content,
}: {
  locale: Locale;
  dict: Dictionary;
  content: SitePageContent;
}) {
  return (
    <Container size="narrow" className="py-6 sm:py-8">
      <Breadcrumbs
        locale={locale}
        items={[{ name: dict.common.home, path: '/' }, { name: content.title }]}
        label={dict.breadcrumb.label}
      />

      <article className="mt-4">
        <h1 className="text-2xl font-bold sm:text-3xl">{content.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-ink-600">{content.lead}</p>
        <p className="mt-2 text-sm text-ink-400">
          {dict.common.updatedAt} {formatDate(content.updatedAt, locale)}
        </p>

        <div className="mt-8 grid gap-8">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold">{section.heading}</h2>
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
                        •
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
