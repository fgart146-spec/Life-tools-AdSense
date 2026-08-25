'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { defaultLocale, isLocale, localePath, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';

/**
 * 404 본문. not-found.tsx는 params를 받을 수 없어 경로에서 로케일을 읽는다.
 * 이 컴포넌트는 404 전용 청크로만 로드되므로 사전 import 비용이 일반 페이지에 영향을 주지 않는다.
 */
export function NotFoundContent() {
  const pathname = usePathname() ?? '/';
  const first = pathname.split('/').filter(Boolean)[0] ?? '';
  const locale: Locale = isLocale(first) ? first : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{dict.notFound.title}</h1>
      <p className="mt-3 text-ink-600">{dict.notFound.description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={localePath(locale, '/tools')}
          className="rounded-lg bg-brand-600 px-5 py-3 text-base font-semibold text-white hover:bg-brand-700"
        >
          {dict.notFound.cta}
        </Link>
        <Link
          href={localePath(locale, '/')}
          className="rounded-lg border border-ink-300 bg-white px-5 py-3 text-base font-semibold text-ink-700 hover:bg-ink-100"
        >
          {dict.notFound.homeCta}
        </Link>
      </div>
    </div>
  );
}
