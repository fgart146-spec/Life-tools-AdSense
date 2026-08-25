import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n/config';
import { LIFE_BASE_PATH } from '@/lib/life/categories';
import type { LifeListItem } from '@/lib/life/registry';

/** 생활백과 문서 카드. 제목과 한 줄 답을 함께 보여줘 목록에서도 답의 방향이 보이게 한다. */
export function LifeCard({
  locale,
  article,
  showCategory = true,
}: {
  locale: Locale;
  article: LifeListItem;
  showCategory?: boolean;
}) {
  return (
    <Link
      href={localePath(locale, `${LIFE_BASE_PATH}/${article.categorySlug}/${article.slug}`)}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/30"
    >
      {showCategory && (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
          <span aria-hidden="true">{article.categoryEmoji}</span>
          {article.categoryLabel}
        </span>
      )}
      <span className="mt-2 text-[1.0625rem] font-bold leading-snug text-ink-900 group-hover:text-brand-700">
        {article.title}
      </span>
      <span className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-ink-500">
        {article.summary}
      </span>
    </Link>
  );
}

export function LifeCardGrid({
  locale,
  articles,
  columns = 3,
  showCategory = true,
}: {
  locale: Locale;
  articles: readonly LifeListItem[];
  columns?: 2 | 3 | 4;
  showCategory?: boolean;
}) {
  if (articles.length === 0) return null;
  const columnClass =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <ul className={`grid gap-3 sm:gap-4 ${columnClass}`}>
      {articles.map((article) => (
        <li key={article.slug} className="h-full">
          <LifeCard locale={locale} article={article} showCategory={showCategory} />
        </li>
      ))}
    </ul>
  );
}
