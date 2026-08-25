'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname() ?? '/';
  const first = pathname.split('/').filter(Boolean)[0] ?? '';
  const locale: Locale = isLocale(first) ? first : defaultLocale;
  const dict = getDictionary(locale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">{dict.error.title}</h1>
      <p className="mt-3 text-ink-600">{dict.error.description}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-lg bg-brand-600 px-5 py-3 text-base font-semibold text-white hover:bg-brand-700"
      >
        {dict.error.retry}
      </button>
    </div>
  );
}
