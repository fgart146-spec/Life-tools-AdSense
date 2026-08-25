'use client';

import { useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/types';
import { interpolate } from '@/lib/i18n/dictionary';
import { LIFE_BASE_PATH } from '@/lib/life/categories';
import type { LifeSearchEntry } from '@/lib/life/registry';

/**
 * 생활 문제 찾기 (검색 + 선택형 도우미).
 *
 * - 검색 인덱스는 빌드 시점에 만들어 props로 받는다. 입력마다 API를 호출하지 않는다.
 * - AI가 새 답을 만드는 것이 아니라 기존 문서로 좁혀 보내는 역할만 한다.
 * - JS가 없어도 아래 카테고리 목록으로 탐색할 수 있으므로 핵심 콘텐츠를 막지 않는다.
 */
export function LifeFinder({
  locale,
  dict,
  entries,
  placeOptions,
  problemOptions,
}: {
  locale: Locale;
  dict: Dictionary;
  entries: readonly LifeSearchEntry[];
  placeOptions: readonly { id: string; label: string }[];
  problemOptions: readonly { id: string; label: string }[];
}) {
  const [query, setQuery] = useState('');
  const [place, setPlace] = useState<string | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const inputId = useId();

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (place && !entry.places.includes(place)) return false;
      if (problem && !entry.problems.includes(problem)) return false;
      if (!needle) return true;
      // 공백으로 나눈 모든 조각이 포함돼야 한다 ("수건 냄새" → 수건 AND 냄새)
      return needle.split(/\s+/).every((token) => entry.haystack.includes(token));
    });
  }, [entries, query, place, problem]);

  const isFiltering = query.trim().length > 0 || place !== null || problem !== null;
  const shown = isFiltering ? filtered : filtered.slice(0, 6);

  const reset = () => {
    setQuery('');
    setPlace(null);
    setProblem(null);
  };

  const chip = (selected: boolean) =>
    `min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
      selected
        ? 'border-brand-500 bg-brand-600 text-white'
        : 'border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:text-brand-700'
    }`;

  return (
    <section className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
      <h2 className="text-lg font-bold text-ink-900">{dict.life.searchHeading}</h2>

      <div className="mt-3">
        <label htmlFor={inputId} className="sr-only">
          {dict.life.searchLabel}
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={dict.life.searchPlaceholder}
          autoComplete="off"
          className="h-14 w-full rounded-[var(--radius-field)] border border-ink-300 bg-white px-4 text-lg text-ink-900 transition-colors placeholder:text-base placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
        />
      </div>

      <div className="mt-5 grid gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-ink-700">{dict.life.pickerPlace}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setPlace(null)} className={chip(place === null)}>
              {dict.life.pickerAll}
            </button>
            {placeOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={place === option.id}
                onClick={() => setPlace(place === option.id ? null : option.id)}
                className={chip(place === option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-ink-700">{dict.life.pickerProblem}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setProblem(null)}
              className={chip(problem === null)}
            >
              {dict.life.pickerAll}
            </button>
            {problemOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={problem === option.id}
                onClick={() => setProblem(problem === option.id ? null : option.id)}
                className={chip(problem === option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-ink-100 pt-4" aria-live="polite">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink-600">
            {isFiltering
              ? interpolate(dict.life.searchResultCount, { count: filtered.length })
              : dict.life.popularHeading}
          </p>
          {isFiltering && (
            <button
              type="button"
              onClick={reset}
              className="-mr-2 min-h-11 rounded-lg px-3 text-sm font-semibold text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800"
            >
              {dict.life.pickerReset}
            </button>
          )}
        </div>

        {shown.length === 0 ? (
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-500">
            {dict.life.searchNoResult}
          </p>
        ) : (
          <ul className="mt-3 grid gap-2">
            {shown.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={localePath(
                    locale,
                    `${LIFE_BASE_PATH}/${entry.categorySlug}/${entry.slug}`,
                  )}
                  className="flex min-h-14 items-center gap-3 rounded-[var(--radius-field)] border border-ink-200 bg-white px-4 py-3 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                >
                  <span aria-hidden="true" className="shrink-0 text-lg leading-none">
                    {entry.categoryEmoji}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] font-semibold leading-snug text-ink-900">
                      {entry.title}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-ink-500">
                      {entry.categoryLabel}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
