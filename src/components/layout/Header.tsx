import Link from 'next/link';
import { brandName } from '@/config/site';
import { localePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/types';
import { categoryPath } from '@/lib/tools/categories';
import { categoriesForLocale } from '@/lib/tools/definitions';
import { Container } from '@/components/ui/Container';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

/**
 * 상단 헤더. 모바일 메뉴는 <details>로 구현해 JS 없이 동작한다.
 */
export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const mainLinks = [
    { href: localePath(locale, '/tools'), label: dict.nav.tools },
    { href: localePath(locale, '/guide'), label: dict.nav.guides },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            href={localePath(locale, '/')}
            className="flex items-center gap-2 text-lg font-bold text-ink-900"
          >
            <span aria-hidden="true" className="text-xl">
              🧮
            </span>
            <span>{brandName(locale)}</span>
          </Link>

          <nav aria-label={dict.nav.categories} className="hidden items-center gap-1 md:flex">
            {categoriesForLocale(locale).map((category) => (
              <Link
                key={category.id}
                href={localePath(locale, categoryPath(category))}
                className="rounded-md px-2.5 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900"
              >
                {category.label[locale]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 lg:flex">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-2.5 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <LanguageSwitcher currentLocale={locale} label={dict.nav.changeLanguage} />
            <details className="relative md:hidden">
              <summary
                className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md text-ink-700 hover:bg-ink-100"
                aria-label={dict.nav.openMenu}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <div className="absolute right-0 top-12 w-64 rounded-xl border border-ink-200 bg-white p-2 shadow-lg">
                <ul className="flex flex-col">
                  {categoriesForLocale(locale).map((category) => (
                    <li key={category.id}>
                      <Link
                        href={localePath(locale, categoryPath(category))}
                        className="flex items-center gap-2 rounded-md px-3 py-3 text-base text-ink-700 hover:bg-ink-100"
                      >
                        <span aria-hidden="true">{category.emoji}</span>
                        {category.label[locale]}
                      </Link>
                    </li>
                  ))}
                  <li className="my-1 border-t border-ink-200" />
                  {mainLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block rounded-md px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </div>
      </Container>
    </header>
  );
}
