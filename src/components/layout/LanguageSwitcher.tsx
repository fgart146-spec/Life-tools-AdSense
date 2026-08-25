'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeMeta, locales, localePath, type Locale } from '@/lib/i18n/config';
import { availableLocalesForPath, stripLocale } from '@/lib/i18n/availability';

/**
 * 언어 전환. 현재 페이지가 해당 언어에 없으면 그 언어의 홈으로 보낸다(404 방지).
 * 사전 전체가 아니라 필요한 라벨만 props로 받는다.
 */
export function LanguageSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? '/';
  const basePath = stripLocale(pathname);
  const available = availableLocalesForPath(basePath);

  return (
    <nav aria-label={label} className="flex items-center gap-1">
      {locales.map((locale) => {
        const isCurrent = locale === currentLocale;
        const target = available.includes(locale)
          ? localePath(locale, basePath)
          : localePath(locale, '/');
        return (
          <Link
            key={locale}
            href={target}
            hrefLang={localeMeta[locale].htmlLang}
            aria-current={isCurrent ? 'true' : undefined}
            className={`flex min-h-11 min-w-11 items-center justify-center rounded-lg px-1.5 text-sm font-semibold transition-colors ${
              isCurrent
                ? 'bg-brand-50 text-brand-700'
                : 'text-ink-500 hover:bg-ink-100 hover:text-ink-800'
            }`}
          >
            {localeMeta[locale].htmlLang.toUpperCase()}
            <span className="sr-only"> — {localeMeta[locale].nativeName}</span>
          </Link>
        );
      })}
    </nav>
  );
}
