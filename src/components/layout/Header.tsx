import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/types';
import { categoryPath } from '@/lib/tools/categories';
import { categoriesForLocale } from '@/lib/tools/definitions';
import { Container } from '@/components/ui/Container';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

/**
 * 상단 헤더. 모바일 메뉴는 <details>로 구현해 JS 없이 동작한다.
 *
 * 디자인 원칙: 헤더는 도구를 찾아가는 통로일 뿐이다.
 * 높이를 낮게 유지하고 장식을 두지 않아 본문이 먼저 보이게 한다.
 */
export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const mainLinks = [
    { href: localePath(locale, '/tools'), label: dict.nav.tools },
    { href: localePath(locale, '/guide'), label: dict.nav.guides },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/80 bg-white/90 backdrop-blur-md">
      <Container size="wide">
        <div className="flex h-14 items-center justify-between gap-2 sm:h-16">
          <Link
            href={localePath(locale, '/')}
            className="wordmark shrink-0 rounded-md text-[1.375rem] text-ink-900 transition-colors hover:text-brand-700 sm:text-2xl"
          >
            eolmaji
          </Link>

          <nav
            aria-label={dict.nav.categories}
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex"
          >
            {categoriesForLocale(locale).map((category) => (
              <Link
                key={category.id}
                href={localePath(locale, categoryPath(category))}
                className="truncate rounded-lg px-2.5 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900"
              >
                {category.label[locale]}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-0.5">
            <div className="hidden items-center gap-0.5 lg:flex">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-2.5 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <LanguageSwitcher currentLocale={locale} label={dict.nav.changeLanguage} />
            <details className="relative md:hidden">
              <summary
                className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-ink-100"
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
              <div className="absolute right-0 top-12 z-50 w-64 rounded-[var(--radius-card)] border border-ink-200 bg-white p-2 shadow-[var(--shadow-raised)]">
                <ul className="flex flex-col">
                  {categoriesForLocale(locale).map((category) => (
                    <li key={category.id}>
                      <Link
                        href={localePath(locale, categoryPath(category))}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-base text-ink-700 transition-colors hover:bg-ink-100"
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
                        className="block rounded-lg px-3 py-3 text-base font-medium text-ink-800 transition-colors hover:bg-ink-100"
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
