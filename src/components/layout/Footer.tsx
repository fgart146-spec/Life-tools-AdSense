import Link from 'next/link';
import { brandName, siteConfig } from '@/config/site';
import { localePath, type Locale } from '@/lib/i18n/config';
import { interpolate } from '@/lib/i18n/dictionary';
import type { Dictionary } from '@/lib/i18n/types';
import { categoryPath } from '@/lib/tools/categories';
import { categoriesForLocale } from '@/lib/tools/definitions';
import { staticPageLabel, staticPages } from '@/lib/nav';
import { Container } from '@/components/ui/Container';

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-ink-200 bg-white">
      <Container size="wide" className="py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 text-base font-bold text-ink-900">
              <span aria-hidden="true">🧮</span>
              {brandName(locale)}
            </p>
            <p className="mt-2 text-sm text-ink-500">{dict.footer.tagline}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-ink-900">{dict.footer.sections.tools}</h2>
            <ul className="mt-3 space-y-2">
              {categoriesForLocale(locale).map((category) => (
                <li key={category.id}>
                  <Link
                    href={localePath(locale, categoryPath(category))}
                    className="text-sm text-ink-600 hover:text-brand-700 hover:underline"
                  >
                    {category.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-ink-900">{dict.footer.sections.content}</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href={localePath(locale, '/tools')}
                  className="text-sm text-ink-600 hover:text-brand-700 hover:underline"
                >
                  {dict.nav.tools}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, '/guide')}
                  className="text-sm text-ink-600 hover:text-brand-700 hover:underline"
                >
                  {dict.nav.guides}
                </Link>
              </li>
            </ul>
          </div>

          {staticPages.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-ink-900">{dict.footer.sections.site}</h2>
              <ul className="mt-3 space-y-2">
                {staticPages.map((page) => (
                  <li key={page.key}>
                    <Link
                      href={localePath(locale, page.path)}
                      className="text-sm text-ink-600 hover:text-brand-700 hover:underline"
                    >
                      {staticPageLabel(dict, page.key)}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-sm text-ink-600 hover:text-brand-700 hover:underline"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <p className="mt-8 border-t border-ink-200 pt-6 text-xs leading-relaxed text-ink-500">
          {dict.footer.disclaimerShort}
        </p>
        <p className="mt-2 text-xs text-ink-400">
          {interpolate(dict.footer.copyright, { year, brand: brandName(locale) })}
        </p>
      </Container>
    </footer>
  );
}
