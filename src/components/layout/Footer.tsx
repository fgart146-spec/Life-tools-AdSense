import Link from 'next/link';
import { brandName, siteConfig } from '@/config/site';
import { localePath, type Locale } from '@/lib/i18n/config';
import { interpolate } from '@/lib/i18n/dictionary';
import type { Dictionary } from '@/lib/i18n/types';
import { categoryPath } from '@/lib/tools/categories';
import { categoriesForLocale } from '@/lib/tools/definitions';
import { hasLifeContent } from '@/lib/life';
import { LIFE_BASE_PATH } from '@/lib/life/categories';
import { staticPageLabel, staticPages } from '@/lib/nav';
import { Container } from '@/components/ui/Container';

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-ink-200 bg-white">
      <Container size="wide" className="py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="wordmark text-xl text-ink-900">eolmaji</p>
            <p className="mt-0.5 text-sm font-medium text-ink-600">{brandName(locale)}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{dict.footer.tagline}</p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-500">{dict.footer.sections.tools}</h2>
            <ul className="mt-3 space-y-1.5">
              {categoriesForLocale(locale).map((category) => (
                <li key={category.id}>
                  <Link
                    href={localePath(locale, categoryPath(category))}
                    className="inline-block py-0.5 text-sm text-ink-600 transition-colors hover:text-brand-700"
                  >
                    {category.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-500">{dict.footer.sections.content}</h2>
            <ul className="mt-3 space-y-1.5">
              <li>
                <Link
                  href={localePath(locale, '/tools')}
                  className="inline-block py-0.5 text-sm text-ink-600 transition-colors hover:text-brand-700"
                >
                  {dict.nav.tools}
                </Link>
              </li>
              {hasLifeContent(locale) && (
                <li>
                  <Link
                    href={localePath(locale, LIFE_BASE_PATH)}
                    className="inline-block py-0.5 text-sm text-ink-600 transition-colors hover:text-brand-700"
                  >
                    {dict.nav.life}
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href={localePath(locale, '/guide')}
                  className="inline-block py-0.5 text-sm text-ink-600 transition-colors hover:text-brand-700"
                >
                  {dict.nav.guides}
                </Link>
              </li>
            </ul>
          </div>

          {staticPages.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-500">{dict.footer.sections.site}</h2>
              <ul className="mt-3 space-y-1.5">
                {staticPages.map((page) => (
                  <li key={page.key}>
                    <Link
                      href={localePath(locale, page.path)}
                      className="inline-block py-0.5 text-sm text-ink-600 transition-colors hover:text-brand-700"
                    >
                      {staticPageLabel(dict, page.key)}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="inline-block py-0.5 text-sm text-ink-600 transition-colors hover:text-brand-700"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <p className="mt-10 border-t border-ink-200 pt-6 text-xs leading-relaxed text-ink-500">
          {dict.footer.disclaimerShort}
        </p>
        <p className="mt-2 text-xs text-ink-500">
          {interpolate(dict.footer.copyright, { year, brand: brandName(locale) })}
        </p>
      </Container>
    </footer>
  );
}
